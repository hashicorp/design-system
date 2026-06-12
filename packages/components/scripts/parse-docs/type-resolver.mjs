/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { Node, SyntaxKind } from 'ts-morph';

import {
  TYPE_FUNCTION,
  TYPE_STRING,
  TYPE_UNKNOWN,
  TYPE_YIELDED_COMPONENT,
} from './constants.mjs';
import {
  findImportForLocalName,
  getContextualComponentTypeQuery,
} from './ast-helpers.mjs';
import {
  isQuotedLiteral,
  parseStringEnumValues,
  splitUnion,
  unquoteLiteral,
} from './literal.mjs';

export function createTypeResolver({ limits, resolveImportSourceFile }) {
  function isKeywordTypeNode(node) {
    return (
      Node.isAnyKeyword(node) ||
      Node.isBooleanKeyword(node) ||
      Node.isNumberKeyword(node) ||
      Node.isStringKeyword(node) ||
      Node.isSymbolKeyword(node) ||
      Node.isObjectKeyword(node) ||
      Node.isUndefinedKeyword(node) ||
      Node.isNeverKeyword(node)
    );
  }

  function findDeclaredTypeByName(sourceFile, typeName) {
    return (
      sourceFile.getTypeAlias(typeName) ||
      sourceFile.getInterface(typeName) ||
      sourceFile.getEnum(typeName) ||
      sourceFile.getClass(typeName)
    );
  }

  function findImportedTypeDeclaration(sourceFile, localTypeName) {
    const importMatch = findImportForLocalName(sourceFile, localTypeName);

    if (!importMatch) {
      return null;
    }

    const importedFile = resolveImportSourceFile(
      sourceFile,
      importMatch.moduleSpecifier
    );

    if (!importedFile) {
      return null;
    }

    if (importMatch.isDefault) {
      const defaultExportSymbol = importedFile.getDefaultExportSymbol();
      const declaration = defaultExportSymbol?.getDeclarations()?.[0];

      if (declaration) {
        return declaration;
      }

      return null;
    }

    const declaration = findDeclaredTypeByName(
      importedFile,
      importMatch.importedName
    );

    if (declaration) {
      return declaration;
    }

    return null;
  }

  function findTypeDeclarationFromReference(sourceFile, typeName) {
    return (
      findDeclaredTypeByName(sourceFile, typeName) ||
      findImportedTypeDeclaration(sourceFile, typeName)
    );
  }

  function createDeclarationKey(declaration, typeName) {
    return `${declaration.getSourceFile().getFilePath()}:${typeName}`;
  }

  function withDeclarationCycleGuard(seen, declaration, typeName, onResolve) {
    const declarationKey = createDeclarationKey(declaration, typeName);

    if (seen.has(declarationKey)) {
      return null;
    }

    seen.add(declarationKey);
    const resolved = onResolve();
    seen.delete(declarationKey);

    return resolved;
  }

  function resolveTypeFromDeclaration(declaration, seen, depth) {
    if (!declaration || depth > limits.maxDepth) {
      return null;
    }

    if (Node.isTypeAliasDeclaration(declaration)) {
      return resolveTypeNodeToText(
        declaration.getTypeNode(),
        declaration.getSourceFile(),
        seen,
        depth + 1
      );
    }

    if (Node.isEnumDeclaration(declaration)) {
      const members = declaration
        .getMembers()
        .map((member) => member.getInitializer()?.getText() || member.getName())
        .filter(Boolean);

      if (members.length > 0) {
        if (members.length > limits.maxUnionMembers) {
          return declaration.getName();
        }

        return members.join(' | ');
      }

      return declaration.getName();
    }

    if (
      Node.isClassDeclaration(declaration) ||
      Node.isInterfaceDeclaration(declaration)
    ) {
      return declaration.getName() || declaration.getText();
    }

    return declaration.getText();
  }

  function resolveTypeReferenceNodeToText(typeNode, sourceFile, seen, depth) {
    const typeNameNode = typeNode.getTypeName();
    const typeNameText = typeNameNode.getText();

    if (typeNameText.includes('.')) {
      return typeNode.getText();
    }

    const typeArgs = typeNode.getTypeArguments();
    const resolvedTypeArgs = typeArgs.map((arg) =>
      resolveTypeNodeToText(arg, sourceFile, seen, depth + 1)
    );

    const declaration = findTypeDeclarationFromReference(
      sourceFile,
      typeNameText
    );

    if (!declaration) {
      if (resolvedTypeArgs.length === 0) {
        return typeNameText;
      }

      return `${typeNameText}<${resolvedTypeArgs.join(', ')}>`;
    }

    const resolved = withDeclarationCycleGuard(
      seen,
      declaration,
      typeNameText,
      () => resolveTypeFromDeclaration(declaration, seen, depth + 1)
    );

    const baseType = resolved || typeNameText;

    if (resolvedTypeArgs.length === 0) {
      return baseType;
    }

    return `${baseType}<${resolvedTypeArgs.join(', ')}>`;
  }

  function findPropertyTypeNodeFromContainer(containerNode, propertyName) {
    if (!containerNode) {
      return null;
    }

    if (Node.isTypeLiteral(containerNode)) {
      const property = containerNode.getProperty(propertyName);

      return property?.getTypeNode() || null;
    }

    if (Node.isInterfaceDeclaration(containerNode)) {
      const property = containerNode.getProperty(propertyName);

      return property?.getTypeNode() || null;
    }

    if (typeof containerNode.getType === 'function') {
      const containerType = containerNode.getType();
      const propertySymbol = containerType.getProperty(propertyName);
      const propertyDeclaration =
        propertySymbol?.getValueDeclaration() ||
        propertySymbol?.getDeclarations()?.[0];

      if (
        propertyDeclaration &&
        typeof propertyDeclaration.getTypeNode === 'function'
      ) {
        return propertyDeclaration.getTypeNode() || null;
      }
    }

    return null;
  }

  function expandTemplateLiteralTypeNode(typeNode, sourceFile, seen, depth) {
    const head = typeNode.getHead().getLiteralText();
    const spans = typeNode.getTemplateSpans();
    let combinations = [head];

    for (const span of spans) {
      const spanTypeNode =
        span.getFirstChildIfKind(SyntaxKind.TypeReference) ||
        span.getFirstChildIfKind(SyntaxKind.TemplateLiteralType) ||
        span.getFirstChildIfKind(SyntaxKind.UnionType) ||
        span.getFirstChildIfKind(SyntaxKind.LiteralType) ||
        span.getFirstChild();

      if (!spanTypeNode || !Node.isTypeNode(spanTypeNode)) {
        return TYPE_STRING;
      }

      const spanTypeText = resolveTypeNodeToText(
        spanTypeNode,
        sourceFile,
        seen,
        depth + 1
      );

      const spanOptions = splitUnion(spanTypeText)
        .filter((option) => isQuotedLiteral(option))
        .map((option) => unquoteLiteral(option));

      if (spanOptions.length === 0) {
        return TYPE_STRING;
      }

      const tailNode = span.getLastChild();
      const tailText =
        tailNode && typeof tailNode.getLiteralText === 'function'
          ? tailNode.getLiteralText()
          : '';

      const nextCombinations = [];

      for (const prefix of combinations) {
        for (const option of spanOptions) {
          nextCombinations.push(`${prefix}${option}${tailText}`);

          if (nextCombinations.length > limits.maxTemplateExpansions) {
            return TYPE_STRING;
          }
        }
      }

      combinations = nextCombinations;
    }

    const literalUnion = combinations.map((value) => `'${value}'`);

    if (literalUnion.length > limits.maxUnionMembers) {
      return TYPE_STRING;
    }

    return literalUnion.join(' | ');
  }

  function resolveIndexedAccessTypeNodeToText(
    typeNode,
    sourceFile,
    seen,
    depth
  ) {
    const keys = [];
    let currentNode = typeNode;

    while (Node.isIndexedAccessTypeNode(currentNode)) {
      const indexTypeNode = currentNode.getIndexTypeNode();

      if (!Node.isLiteralTypeNode(indexTypeNode)) {
        return typeNode.getText();
      }

      const literalNode = indexTypeNode.getLiteral();
      if (!Node.isStringLiteral(literalNode)) {
        return typeNode.getText();
      }

      keys.unshift(literalNode.getLiteralText());
      currentNode = currentNode.getObjectTypeNode();
    }

    let rootTypeNode = currentNode;
    let rootSourceFile = sourceFile;

    if (Node.isTypeReference(rootTypeNode)) {
      const rootName = rootTypeNode.getTypeName().getText();
      const declaration = findTypeDeclarationFromReference(
        sourceFile,
        rootName
      );

      if (!declaration) {
        return typeNode.getText();
      }

      rootSourceFile = declaration.getSourceFile();

      if (Node.isTypeAliasDeclaration(declaration)) {
        rootTypeNode = declaration.getTypeNode();
      } else {
        rootTypeNode = declaration;
      }
    }

    let container = rootTypeNode;

    for (const key of keys) {
      let nextTypeNode = findPropertyTypeNodeFromContainer(container, key);

      if (!nextTypeNode && Node.isTypeReference(container)) {
        const referencedName = container.getTypeName().getText();
        const declaration = findTypeDeclarationFromReference(
          rootSourceFile,
          referencedName
        );

        if (!declaration) {
          return typeNode.getText();
        }

        rootSourceFile = declaration.getSourceFile();
        container = declaration;
        nextTypeNode = findPropertyTypeNodeFromContainer(container, key);
      }

      if (!nextTypeNode) {
        return typeNode.getText();
      }

      container = nextTypeNode;
    }

    if (Node.isTypeNode(container) || isKeywordTypeNode(container)) {
      return resolveTypeNodeToText(container, rootSourceFile, seen, depth + 1);
    }

    return typeNode.getText();
  }

  function resolveTypeNodeToText(
    typeNode,
    sourceFile,
    seen = new Set(),
    depth = 0
  ) {
    if (!typeNode || depth > limits.maxDepth) {
      return TYPE_UNKNOWN;
    }

    if (Node.isParenthesizedTypeNode(typeNode)) {
      return `(${resolveTypeNodeToText(
        typeNode.getTypeNode(),
        sourceFile,
        seen,
        depth + 1
      )})`;
    }

    if (Node.isUnionTypeNode(typeNode)) {
      const nodes = typeNode.getTypeNodes();

      if (nodes.length > limits.maxUnionMembers) {
        return typeNode.getText();
      }

      return nodes
        .map((node) => resolveTypeNodeToText(node, sourceFile, seen, depth + 1))
        .join(' | ');
    }

    if (Node.isIntersectionTypeNode(typeNode)) {
      return typeNode
        .getTypeNodes()
        .map((node) => resolveTypeNodeToText(node, sourceFile, seen, depth + 1))
        .join(' & ');
    }

    if (Node.isArrayTypeNode(typeNode)) {
      return `${resolveTypeNodeToText(
        typeNode.getElementTypeNode(),
        sourceFile,
        seen,
        depth + 1
      )}[]`;
    }

    if (Node.isTupleTypeNode(typeNode)) {
      return `[${typeNode
        .getElements()
        .map((node) => resolveTypeNodeToText(node, sourceFile, seen, depth + 1))
        .join(', ')}]`;
    }

    if (Node.isLiteralTypeNode(typeNode)) {
      return typeNode.getText();
    }

    if (isKeywordTypeNode(typeNode)) {
      return typeNode.getText();
    }

    if (Node.isFunctionTypeNode(typeNode)) {
      return TYPE_FUNCTION;
    }

    if (Node.isTemplateLiteralTypeNode(typeNode)) {
      return expandTemplateLiteralTypeNode(
        typeNode,
        sourceFile,
        seen,
        depth + 1
      );
    }

    if (Node.isTypeReference(typeNode)) {
      return resolveTypeReferenceNodeToText(
        typeNode,
        sourceFile,
        seen,
        depth + 1
      );
    }

    if (Node.isIndexedAccessTypeNode(typeNode)) {
      return resolveIndexedAccessTypeNodeToText(
        typeNode,
        sourceFile,
        seen,
        depth + 1
      );
    }

    return typeNode.getText();
  }

  function tryResolveEnumValues(typeNode, sourceFile, seen, depth) {
    if (!typeNode || depth > limits.maxDepth) {
      return undefined;
    }

    if (Node.isTypeReference(typeNode)) {
      const typeNameText = typeNode.getTypeName().getText();
      const declaration = findTypeDeclarationFromReference(
        sourceFile,
        typeNameText
      );

      if (!declaration) {
        return undefined;
      }

      const resolved = withDeclarationCycleGuard(
        seen,
        declaration,
        typeNameText,
        () => {
          if (!Node.isTypeAliasDeclaration(declaration)) {
            return undefined;
          }

          return tryResolveEnumValues(
            declaration.getTypeNode(),
            declaration.getSourceFile(),
            seen,
            depth + 1
          );
        }
      );

      return resolved === null ? undefined : resolved;
    }

    if (!Node.isUnionTypeNode(typeNode)) {
      return undefined;
    }

    const values = [];

    for (const node of typeNode.getTypeNodes()) {
      if (!Node.isLiteralTypeNode(node)) {
        return undefined;
      }

      const literalNode = node.getLiteral();

      if (!Node.isStringLiteral(literalNode)) {
        return undefined;
      }

      values.push(literalNode.getLiteralText());
    }

    if (values.length < 2) {
      return undefined;
    }

    return values;
  }

  function resolveDeclarationType(declaration) {
    const typeNode = declaration.getTypeNode?.();

    if (typeNode) {
      const tracedText = resolveTypeNodeToText(
        typeNode,
        declaration.getSourceFile()
      );

      if (tracedText && tracedText !== TYPE_UNKNOWN) {
        const enumValuesFromAst = tryResolveEnumValues(
          typeNode,
          declaration.getSourceFile(),
          new Set(),
          0
        );

        return {
          text: tracedText,
          enumValues:
            enumValuesFromAst === undefined
              ? parseStringEnumValues(tracedText)
              : enumValuesFromAst,
        };
      }
    }

    const fallbackTypeText = declaration.getType().getText(declaration);
    const normalizedText = fallbackTypeText.includes('=>')
      ? TYPE_FUNCTION
      : fallbackTypeText;

    return {
      text: normalizedText,
      enumValues: parseStringEnumValues(normalizedText),
    };
  }

  function resolveDeclarationTypeText(declaration) {
    return resolveDeclarationType(declaration).text;
  }

  function resolveYieldTypeText(declaration) {
    const typeNode = declaration.getTypeNode?.();

    if (!typeNode) {
      return resolveDeclarationTypeText(declaration);
    }

    if (getContextualComponentTypeQuery(typeNode)) {
      return TYPE_YIELDED_COMPONENT;
    }

    return resolveDeclarationTypeText(declaration);
  }

  return {
    resolveDeclarationType,
    resolveDeclarationTypeText,
    resolveYieldTypeText,
  };
}
