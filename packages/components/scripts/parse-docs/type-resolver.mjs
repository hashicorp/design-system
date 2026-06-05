import { Node, SyntaxKind } from 'ts-morph';

export function createTypeResolver({ limits, stats, resolveImportSourceFile }) {
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
    // resolve both aliased named imports and default imports before falling back to raw text
    for (const importDecl of sourceFile.getImportDeclarations()) {
      const moduleSpecifier = importDecl.getModuleSpecifierValue();
      const importedFile = resolveImportSourceFile(sourceFile, moduleSpecifier);

      if (!importedFile) {
        continue;
      }

      for (const specifier of importDecl.getNamedImports()) {
        const localName =
          specifier.getAliasNode()?.getText() || specifier.getName();

        if (localName !== localTypeName) {
          continue;
        }

        const importedName = specifier.getName();
        const declaration = findDeclaredTypeByName(importedFile, importedName);

        if (declaration) {
          return declaration;
        }
      }

      const defaultImport = importDecl.getDefaultImport();
      if (defaultImport && defaultImport.getText() === localTypeName) {
        const defaultExportSymbol = importedFile.getDefaultExportSymbol();
        const declaration = defaultExportSymbol?.getDeclarations()?.[0];

        if (declaration) {
          return declaration;
        }
      }
    }

    return null;
  }

  function splitUnionText(typeText) {
    return typeText
      .split('|')
      .map((part) => part.trim())
      .filter(Boolean);
  }

  function isQuotedLiteralText(typeText) {
    return /^(['"]).*\1$/.test(typeText);
  }

  function resolveTypeFromDeclaration(declaration, seen, depth) {
    if (!declaration || depth > limits.maxDepth) {
      stats.typeResolutionCapped += 1;

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
      // expand enum members to a literal union when possible for clearer docs output
      const members = declaration
        .getMembers()
        .map((member) => member.getInitializer()?.getText() || member.getName())
        .filter(Boolean);

      if (members.length > 0) {
        if (members.length > limits.maxUnionMembers) {
          stats.typeResolutionCapped += 1;

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

    const localDeclaration = findDeclaredTypeByName(sourceFile, typeNameText);
    const importDeclaration = localDeclaration
      ? null
      : findImportedTypeDeclaration(sourceFile, typeNameText);
    const declaration = localDeclaration || importDeclaration;

    if (!declaration) {
      if (resolvedTypeArgs.length === 0) {
        return typeNameText;
      }

      return `${typeNameText}<${resolvedTypeArgs.join(', ')}>`;
    }

    const declarationKey = `${declaration.getSourceFile().getFilePath()}:${typeNameText}`;

    if (seen.has(declarationKey)) {
      // break recursive type cycles instead of recursing indefinitely
      stats.typeResolutionCapped += 1;

      return typeNameText;
    }

    seen.add(declarationKey);

    const resolved = resolveTypeFromDeclaration(declaration, seen, depth + 1);

    seen.delete(declarationKey);

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

    // Semantic fallback for containers such as intersection/union/type-reference
    // where the property may not be represented as a direct AST child node.
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
        return 'string';
      }

      const spanTypeText = resolveTypeNodeToText(
        spanTypeNode,
        sourceFile,
        seen,
        depth + 1
      );

      const spanOptions = splitUnionText(spanTypeText)
        .filter((option) => isQuotedLiteralText(option))
        .map((option) => option.slice(1, -1));

      if (spanOptions.length === 0) {
        // if any segment is non-literal the cartesian expansion becomes open-ended
        return 'string';
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
            stats.typeResolutionCapped += 1;
            return 'string';
          }
        }
      }

      combinations = nextCombinations;
    }

    const literalUnion = combinations.map((value) => `'${value}'`);

    if (literalUnion.length > limits.maxUnionMembers) {
      stats.typeResolutionCapped += 1;
      return 'string';
    }

    return literalUnion.join(' | ');
  }

  function resolveIndexedAccessTypeNodeToText(
    typeNode,
    sourceFile,
    seen,
    depth
  ) {
    // unwind nested indexed access nodes so we can walk each key in order
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
      const declaration =
        findDeclaredTypeByName(sourceFile, rootName) ||
        findImportedTypeDeclaration(sourceFile, rootName);

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
        const declaration =
          findDeclaredTypeByName(rootSourceFile, referencedName) ||
          findImportedTypeDeclaration(rootSourceFile, referencedName);

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
      stats.typeResolutionCapped += 1;
      return 'unknown';
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
        stats.typeResolutionCapped += 1;
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
      return 'function';
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

  function resolveDeclarationTypeText(declaration) {
    const typeNode = declaration.getTypeNode?.();

    if (typeNode) {
      const tracedText = resolveTypeNodeToText(
        typeNode,
        declaration.getSourceFile()
      );

      if (tracedText && tracedText !== 'unknown') {
        stats.typeResolvedViaAst += 1;

        return tracedText;
      }
    }

    stats.typeResolutionFallbacks += 1;
    // semantic type text can be noisy so normalize function signatures for readability
    const fallbackTypeText = declaration.getType().getText(declaration);

    if (fallbackTypeText.includes('=>')) {
      return 'function';
    }

    return fallbackTypeText;
  }

  function resolveYieldTypeText(declaration) {
    const typeNode = declaration.getTypeNode?.();

    if (!typeNode) {
      return resolveDeclarationTypeText(declaration);
    }

    // In this codebase, yielded contextual components are authored as either
    // `typeof ComponentName` or `WithBoundArgs<typeof ComponentName, ...>`.
    // For docs readability, normalize both to `component`.
    if (Node.isTypeQuery(typeNode)) {
      return 'component';
    }

    if (
      Node.isTypeReference(typeNode) &&
      typeNode.getTypeName().getText() === 'WithBoundArgs'
    ) {
      const firstTypeArg = typeNode.getTypeArguments()[0];

      if (firstTypeArg && Node.isTypeQuery(firstTypeArg)) {
        return 'component';
      }
    }

    return resolveDeclarationTypeText(declaration);
  }

  return {
    resolveDeclarationTypeText,
    resolveYieldTypeText,
  };
}
