/** Copyright IBM Corp. 2021, 2026 SPDX-License-Identifier: MPL-2.0 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Node, Project, SyntaxKind, TypeFormatFlags } from 'ts-morph';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const COMPONENTS_ROOT = resolve(SCRIPT_DIR, '..');
const ENTRY_FILE_PATH = resolve(COMPONENTS_ROOT, 'src/components.ts');
const TSCONFIG_PATH = resolve(COMPONENTS_ROOT, 'tsconfig.json');
const OUTPUT_FILE_PATH = resolve(
  COMPONENTS_ROOT,
  '../mcp/src/catalogs/components/catalog.json'
);
const SUMMARY_PLACEHOLDER = 'TODO';

const TYPE_FORMAT_FLAGS =
  TypeFormatFlags.NoTruncation |
  TypeFormatFlags.UseSingleQuotesForStringLiteralType;

function isOptionalDeclaration(declaration) {
  if (
    Node.isPropertySignature(declaration) ||
    Node.isPropertyDeclaration(declaration) ||
    Node.isParameterDeclaration(declaration)
  ) {
    return declaration.hasQuestionToken();
  }

  return false;
}

function normalizeTypeText(typeText) {
  return typeText.replace(/\s+/g, ' ').trim();
}

function normalizeGroupSlug(groupName) {
  return `${groupName || ''}`.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function parseCliOptions(argv) {
  let group = null;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg.startsWith('--group=')) {
      group = arg.slice('--group='.length).trim();
      continue;
    }

    if (arg === '--group') {
      group = `${argv[index + 1] || ''}`.trim();
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (group === '') {
    throw new Error('The --group option requires a non-empty value.');
  }

  return {
    group,
  };
}

function getStringLiteralValuesFromEnumDeclaration(enumDeclaration) {
  const values = [];

  for (const member of enumDeclaration.getMembers()) {
    const initializer = member.getInitializer();

    if (!initializer || !Node.isStringLiteral(initializer)) {
      return undefined;
    }

    values.push(initializer.getLiteralText());
  }

  return values.length > 0 ? values : undefined;
}

function getStringLiteralValuesFromTypeNode(
  typeNode,
  sourceFile,
  resolveRelativeSourceFile,
  seen = new Set()
) {
  if (!typeNode) {
    return undefined;
  }

  const visitKey = createNodeVisitKey(sourceFile, typeNode);

  if (seen.has(visitKey)) {
    return undefined;
  }

  seen.add(visitKey);

  if (Node.isParenthesizedTypeNode(typeNode)) {
    return getStringLiteralValuesFromTypeNode(
      typeNode.getTypeNode(),
      sourceFile,
      resolveRelativeSourceFile,
      seen
    );
  }

  if (Node.isUnionTypeNode(typeNode)) {
    const values = [];

    for (const unionTypeNode of typeNode.getTypeNodes()) {
      if (!Node.isLiteralTypeNode(unionTypeNode)) {
        return undefined;
      }

      const literalNode = unionTypeNode.getLiteral();

      if (!Node.isStringLiteral(literalNode)) {
        return undefined;
      }

      values.push(literalNode.getLiteralText());
    }

    return values.length > 1 ? values : undefined;
  }

  if (Node.isTypeReference(typeNode)) {
    const typeName = typeNode.getTypeName().getText();

    if (typeName.includes('.')) {
      return undefined;
    }

    const declaration = resolveNamedTypeDeclaration(
      sourceFile,
      typeName,
      resolveRelativeSourceFile
    );

    if (!declaration) {
      return undefined;
    }

    if (Node.isTypeAliasDeclaration(declaration)) {
      return getStringLiteralValuesFromTypeNode(
        declaration.getTypeNode(),
        declaration.getSourceFile(),
        resolveRelativeSourceFile,
        seen
      );
    }

    if (Node.isEnumDeclaration(declaration)) {
      return getStringLiteralValuesFromEnumDeclaration(declaration);
    }

    return undefined;
  }

  if (Node.isTemplateLiteralTypeNode(typeNode)) {
    const fullText = typeNode.getText();
    const match = fullText.match(/^`\$\{([^}]+)\}`$/);

    if (!match) {
      return undefined;
    }

    const referenceName = match[1].trim();

    if (referenceName.includes('.') || referenceName.includes('<')) {
      return undefined;
    }

    const declaration = resolveNamedTypeDeclaration(
      sourceFile,
      referenceName,
      resolveRelativeSourceFile
    );

    if (!declaration) {
      return undefined;
    }

    if (Node.isEnumDeclaration(declaration)) {
      return getStringLiteralValuesFromEnumDeclaration(declaration);
    }

    if (Node.isTypeAliasDeclaration(declaration)) {
      return getStringLiteralValuesFromTypeNode(
        declaration.getTypeNode(),
        declaration.getSourceFile(),
        resolveRelativeSourceFile,
        seen
      );
    }

    return undefined;
  }

  return undefined;
}

function expandTypeText(typeNode, sourceFile, resolveRelativeSourceFile) {
  const values = getStringLiteralValuesFromTypeNode(
    typeNode,
    sourceFile,
    resolveRelativeSourceFile
  );

  if (!values) {
    return null;
  }

  return values.map((value) => `'${value}'`).join(' | ');
}

function findImportForLocalName(sourceFile, localName) {
  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    const defaultImport = importDecl.getDefaultImport();

    if (defaultImport && defaultImport.getText() === localName) {
      return {
        moduleSpecifier,
        importedName: 'default',
        isDefault: true,
      };
    }

    for (const namedImport of importDecl.getNamedImports()) {
      const candidateLocalName =
        namedImport.getAliasNode()?.getText() || namedImport.getName();

      if (candidateLocalName !== localName) {
        continue;
      }

      return {
        moduleSpecifier,
        importedName: namedImport.getName(),
        isDefault: false,
      };
    }
  }

  return null;
}

function getContextualComponentTypeQuery(typeNode) {
  if (!typeNode) {
    return null;
  }

  if (Node.isTypeQuery(typeNode)) {
    return typeNode;
  }

  if (
    Node.isTypeReference(typeNode) &&
    typeNode.getTypeName().getText() === 'WithBoundArgs'
  ) {
    const firstTypeArg = typeNode.getTypeArguments()[0];

    if (firstTypeArg && Node.isTypeQuery(firstTypeArg)) {
      return firstTypeArg;
    }
  }

  return null;
}

function parseBoundArgNamesFromTypeNode(typeNode) {
  if (!typeNode || !Node.isTypeReference(typeNode)) {
    return undefined;
  }

  if (typeNode.getTypeName().getText() !== 'WithBoundArgs') {
    return undefined;
  }

  const secondTypeArg = typeNode.getTypeArguments()[1];

  if (!secondTypeArg || secondTypeArg.getText() === 'never') {
    return undefined;
  }

  if (Node.isLiteralTypeNode(secondTypeArg)) {
    const literalNode = secondTypeArg.getLiteral();

    if (!Node.isStringLiteral(literalNode)) {
      return undefined;
    }

    return [literalNode.getLiteralText()];
  }

  if (!Node.isUnionTypeNode(secondTypeArg)) {
    return undefined;
  }

  const boundArgs = [];

  for (const unionTypeNode of secondTypeArg.getTypeNodes()) {
    if (!Node.isLiteralTypeNode(unionTypeNode)) {
      return undefined;
    }

    const literalNode = unionTypeNode.getLiteral();

    if (!Node.isStringLiteral(literalNode)) {
      return undefined;
    }

    boundArgs.push(literalNode.getLiteralText());
  }

  return boundArgs.length > 0 ? boundArgs : undefined;
}

function createSourceFileResolver(project) {
  function resolveRelativeSourceFile(fromSourceFile, moduleSpecifier) {
    const resolvedByTs = fromSourceFile
      .getImportDeclarations()
      .find(
        (importDecl) => importDecl.getModuleSpecifierValue() === moduleSpecifier
      )
      ?.getModuleSpecifierSourceFile();

    if (resolvedByTs) {
      return resolvedByTs;
    }

    if (!moduleSpecifier.startsWith('.')) {
      return null;
    }

    const fromDir = dirname(fromSourceFile.getFilePath());
    const basePath = resolve(fromDir, moduleSpecifier);
    const candidates = [
      basePath,
      `${basePath}.ts`,
      `${basePath}.gts`,
      `${basePath}.d.ts`,
      resolve(basePath, 'index.ts'),
      resolve(basePath, 'index.gts'),
      resolve(basePath, 'index.d.ts'),
    ];

    for (const candidatePath of candidates) {
      const sourceFile = project.addSourceFileAtPathIfExists(candidatePath);

      if (sourceFile) {
        return sourceFile;
      }
    }

    return null;
  }

  return {
    resolveRelativeSourceFile,
  };
}

function findLocalTypeDeclaration(sourceFile, typeName) {
  return (
    sourceFile.getInterface(typeName) ||
    sourceFile.getTypeAlias(typeName) ||
    sourceFile.getEnum(typeName)
  );
}

function resolveNamedTypeDeclaration(
  sourceFile,
  localTypeName,
  resolveRelativeSourceFile
) {
  const localDeclaration = findLocalTypeDeclaration(sourceFile, localTypeName);

  if (localDeclaration) {
    return localDeclaration;
  }

  const importMatch = findImportForLocalName(sourceFile, localTypeName);

  if (!importMatch) {
    return null;
  }

  const importedSourceFile = resolveRelativeSourceFile(
    sourceFile,
    importMatch.moduleSpecifier
  );

  if (!importedSourceFile) {
    return null;
  }

  if (importMatch.isDefault) {
    const defaultSymbol = importedSourceFile.getDefaultExportSymbol();

    return defaultSymbol?.getDeclarations()?.[0] ?? null;
  }

  return (
    findLocalTypeDeclaration(importedSourceFile, importMatch.importedName) ??
    null
  );
}

function resolveSignatureFromClass(sourceFile, resolveRelativeSourceFile) {
  const defaultClass = sourceFile
    .getClasses()
    .find((classDeclaration) => classDeclaration.isDefaultExport());

  if (!defaultClass) {
    return null;
  }

  const extendsClause = defaultClass.getHeritageClauseByKind(
    SyntaxKind.ExtendsKeyword
  );
  const extendsTypes = extendsClause?.getTypeNodes() ?? [];
  const firstExtendsType = extendsTypes[0];

  if (
    !firstExtendsType ||
    !Node.isExpressionWithTypeArguments(firstExtendsType)
  ) {
    return null;
  }

  const typeArguments = firstExtendsType.getTypeArguments();
  const signatureTypeArgument = typeArguments[0];

  if (!signatureTypeArgument || !Node.isTypeReference(signatureTypeArgument)) {
    return null;
  }

  const signatureTypeName = signatureTypeArgument.getTypeName().getText();

  if (signatureTypeName.includes('.')) {
    return null;
  }

  const declaration = resolveNamedTypeDeclaration(
    sourceFile,
    signatureTypeName,
    resolveRelativeSourceFile
  );

  if (!declaration) {
    return null;
  }

  if (Node.isInterfaceDeclaration(declaration)) {
    return declaration;
  }

  if (Node.isTypeAliasDeclaration(declaration)) {
    const typeNode = declaration.getTypeNode();

    if (!typeNode || !Node.isTypeReference(typeNode)) {
      return null;
    }

    const aliasName = typeNode.getTypeName().getText();

    if (aliasName.includes('.')) {
      return null;
    }

    const aliasDeclaration = resolveNamedTypeDeclaration(
      declaration.getSourceFile(),
      aliasName,
      resolveRelativeSourceFile
    );

    if (aliasDeclaration && Node.isInterfaceDeclaration(aliasDeclaration)) {
      return aliasDeclaration;
    }
  }

  return null;
}

function resolveSignatureInterface(
  sourceFile,
  exportedComponentName,
  resolveRelativeSourceFile
) {
  const exactSignature = sourceFile.getInterface(
    `${exportedComponentName}Signature`
  );

  if (exactSignature) {
    return exactSignature;
  }

  const classDerivedSignature = resolveSignatureFromClass(
    sourceFile,
    resolveRelativeSourceFile
  );

  if (classDerivedSignature) {
    return classDerivedSignature;
  }

  const allSignatures = sourceFile
    .getInterfaces()
    .filter((interfaceDeclaration) =>
      interfaceDeclaration.getName().endsWith('Signature')
    );

  if (allSignatures.length === 1) {
    return allSignatures[0];
  }

  return null;
}

function createNodeVisitKey(sourceFile, node) {
  return `${sourceFile.getFilePath()}:${node.getPos()}:${node.getKindName()}`;
}

function resolvePropertyTypeNodeByName(
  containerNode,
  containerSourceFile,
  propertyName,
  resolveRelativeSourceFile,
  seen = new Set()
) {
  const visitKey = createNodeVisitKey(containerSourceFile, containerNode);

  if (seen.has(visitKey)) {
    return null;
  }

  seen.add(visitKey);

  const resolveFrom = (nextNode, nextSourceFile = containerSourceFile) =>
    resolvePropertyTypeNodeByName(
      nextNode,
      nextSourceFile,
      propertyName,
      resolveRelativeSourceFile,
      seen
    );

  if (Node.isParenthesizedTypeNode(containerNode)) {
    return resolveFrom(containerNode.getTypeNode(), containerSourceFile);
  }

  if (Node.isTypeLiteral(containerNode)) {
    const property = containerNode.getProperty(propertyName);

    if (!property) {
      return null;
    }

    const typeNode = property.getTypeNode();

    return typeNode ? { typeNode, sourceFile: containerSourceFile } : null;
  }

  if (Node.isInterfaceDeclaration(containerNode)) {
    const property = containerNode.getProperty(propertyName);

    if (property) {
      const typeNode = property.getTypeNode();

      if (typeNode) {
        return { typeNode, sourceFile: containerNode.getSourceFile() };
      }
    }

    for (const extendsNode of containerNode.getExtends()) {
      const resolved = resolveFrom(extendsNode, containerNode.getSourceFile());

      if (resolved) {
        return resolved;
      }
    }

    return null;
  }

  if (Node.isTypeReference(containerNode)) {
    const typeName = containerNode.getTypeName().getText();

    if (typeName.includes('.')) {
      return null;
    }

    const declaration = resolveNamedTypeDeclaration(
      containerSourceFile,
      typeName,
      resolveRelativeSourceFile
    );

    if (!declaration) {
      return null;
    }

    if (Node.isInterfaceDeclaration(declaration)) {
      return resolveFrom(declaration, declaration.getSourceFile());
    }

    if (Node.isTypeAliasDeclaration(declaration)) {
      return resolveFrom(declaration.getTypeNode(), declaration.getSourceFile());
    }

    return null;
  }

  if (Node.isIntersectionTypeNode(containerNode)) {
    for (const nextTypeNode of containerNode.getTypeNodes()) {
      const resolved = resolveFrom(nextTypeNode, containerSourceFile);

      if (resolved) {
        return resolved;
      }
    }

    return null;
  }

  if (Node.isIndexedAccessTypeNode(containerNode)) {
    const indexTypeNode = containerNode.getIndexTypeNode();

    if (!Node.isLiteralTypeNode(indexTypeNode)) {
      return null;
    }

    const literalNode = indexTypeNode.getLiteral();

    if (!Node.isStringLiteral(literalNode)) {
      return null;
    }

    const intermediate = resolvePropertyTypeNodeByName(
      containerNode.getObjectTypeNode(),
      containerSourceFile,
      literalNode.getLiteralText(),
      resolveRelativeSourceFile,
      seen
    );

    if (!intermediate) {
      return null;
    }

    return resolvePropertyTypeNodeByName(
      intermediate.typeNode,
      intermediate.sourceFile,
      propertyName,
      resolveRelativeSourceFile,
      seen
    );
  }

  return null;
}

function collectPropertySignaturesFromTypeNode(
  typeNode,
  sourceFile,
  resolveRelativeSourceFile,
  seen = new Set()
) {
  if (!typeNode) {
    return [];
  }

  const visitKey = createNodeVisitKey(sourceFile, typeNode);

  if (seen.has(visitKey)) {
    return [];
  }

  seen.add(visitKey);

  const collect = (nextTypeNode, nextSourceFile = sourceFile) =>
    collectPropertySignaturesFromTypeNode(
      nextTypeNode,
      nextSourceFile,
      resolveRelativeSourceFile,
      seen
    );

  if (Node.isParenthesizedTypeNode(typeNode)) {
    return collect(typeNode.getTypeNode(), sourceFile);
  }

  if (Node.isTypeLiteral(typeNode)) {
    return typeNode
      .getMembers()
      .filter((member) => Node.isPropertySignature(member));
  }

  if (Node.isIntersectionTypeNode(typeNode)) {
    return typeNode
      .getTypeNodes()
      .flatMap((nextTypeNode) => collect(nextTypeNode, sourceFile));
  }

  if (Node.isTypeReference(typeNode)) {
    const typeName = typeNode.getTypeName().getText();

    if (typeName.includes('.')) {
      return [];
    }

    const declaration = resolveNamedTypeDeclaration(
      sourceFile,
      typeName,
      resolveRelativeSourceFile
    );

    if (!declaration) {
      return [];
    }

    if (Node.isInterfaceDeclaration(declaration)) {
      const ownProperties = declaration.getProperties();
      const inheritedProperties = declaration
        .getExtends()
        .flatMap((extendsNode) => collect(extendsNode, declaration.getSourceFile()));

      return [...ownProperties, ...inheritedProperties];
    }

    if (Node.isTypeAliasDeclaration(declaration)) {
      return collect(declaration.getTypeNode(), declaration.getSourceFile());
    }

    return [];
  }

  if (Node.isIndexedAccessTypeNode(typeNode)) {
    const indexTypeNode = typeNode.getIndexTypeNode();

    if (!Node.isLiteralTypeNode(indexTypeNode)) {
      return [];
    }

    const literalNode = indexTypeNode.getLiteral();

    if (!Node.isStringLiteral(literalNode)) {
      return [];
    }

    const resolvedProperty = resolvePropertyTypeNodeByName(
      typeNode.getObjectTypeNode(),
      sourceFile,
      literalNode.getLiteralText(),
      resolveRelativeSourceFile
    );

    if (!resolvedProperty) {
      return [];
    }

    return collect(resolvedProperty.typeNode, resolvedProperty.sourceFile);
  }

  return [];
}

function parseArgs(signatureInterface, resolveRelativeSourceFile) {
  const argsProperty = signatureInterface.getProperty('Args');

  if (!argsProperty) {
    return [];
  }

  const argsTypeNode = argsProperty.getTypeNode?.();
  const astPropertySignatures = collectPropertySignaturesFromTypeNode(
    argsTypeNode,
    signatureInterface.getSourceFile(),
    resolveRelativeSourceFile
  );

  const dedupedPropertyMap = new Map();

  astPropertySignatures.forEach((propertySignature) => {
    dedupedPropertyMap.set(propertySignature.getName(), propertySignature);
  });

  const dedupedPropertySignatures = [...dedupedPropertyMap.values()];

  if (dedupedPropertySignatures.length > 0) {
    const args = [];

    for (const propertySignature of dedupedPropertySignatures) {
      const typeNode = propertySignature.getTypeNode();
      const expandedTypeText = typeNode
        ? expandTypeText(
            typeNode,
            propertySignature.getSourceFile(),
            resolveRelativeSourceFile
          )
        : null;

      const parsedArg = {
        name: propertySignature.getName(),
        type: normalizeTypeText(
          expandedTypeText ||
            (typeNode
            ? typeNode.getText()
            : propertySignature
                .getType()
                .getText(propertySignature, TYPE_FORMAT_FLAGS))
        ),
        required: !isOptionalDeclaration(propertySignature),
      };

      args.push(parsedArg);
    }

    args.sort((a, b) => a.name.localeCompare(b.name));

    return args;
  }

  const argsType = argsProperty.getType().getApparentType();
  const args = [];

  for (const propertySymbol of argsType.getProperties()) {
    const declaration =
      propertySymbol.getValueDeclaration() ||
      propertySymbol.getDeclarations()[0];

    if (!declaration) {
      continue;
    }

    const type = propertySymbol.getTypeAtLocation(declaration);
    const parsedArg = {
      name: propertySymbol.getName(),
      type: normalizeTypeText(type.getText(declaration, TYPE_FORMAT_FLAGS)),
      required: !isOptionalDeclaration(declaration),
    };

    args.push(parsedArg);
  }

  args.sort((a, b) => a.name.localeCompare(b.name));

  return args;
}

function resolveTupleFirstElementTypeNode(
  typeNode,
  sourceFile,
  resolveRelativeSourceFile,
  seen = new Set()
) {
  if (!typeNode) {
    return null;
  }

  const visitKey = createNodeVisitKey(sourceFile, typeNode);

  if (seen.has(visitKey)) {
    return null;
  }

  seen.add(visitKey);

  if (Node.isParenthesizedTypeNode(typeNode)) {
    return resolveTupleFirstElementTypeNode(
      typeNode.getTypeNode(),
      sourceFile,
      resolveRelativeSourceFile,
      seen
    );
  }

  if (Node.isTupleTypeNode(typeNode)) {
    const tupleElements = typeNode.getElements();

    return tupleElements[0] ?? null;
  }

  if (Node.isTypeReference(typeNode)) {
    const typeName = typeNode.getTypeName().getText();

    if (typeName.includes('.')) {
      return null;
    }

    const declaration = resolveNamedTypeDeclaration(
      sourceFile,
      typeName,
      resolveRelativeSourceFile
    );

    if (!declaration || !Node.isTypeAliasDeclaration(declaration)) {
      return null;
    }

    return resolveTupleFirstElementTypeNode(
      declaration.getTypeNode(),
      declaration.getSourceFile(),
      resolveRelativeSourceFile,
      seen
    );
  }

  return null;
}

function parseBlockYieldsFromPropertySignature(
  blockPropertySignature,
  resolveRelativeSourceFile
) {
  const tupleFirstElementTypeNode = resolveTupleFirstElementTypeNode(
    blockPropertySignature.getTypeNode(),
    blockPropertySignature.getSourceFile(),
    resolveRelativeSourceFile
  );

  if (!tupleFirstElementTypeNode) {
    return [];
  }

  const yieldPropertySignatures = collectPropertySignaturesFromTypeNode(
    tupleFirstElementTypeNode,
    blockPropertySignature.getSourceFile(),
    resolveRelativeSourceFile
  );

  if (yieldPropertySignatures.length === 0) {
    return [];
  }

  const dedupedYieldMap = new Map();

  yieldPropertySignatures.forEach((yieldPropertySignature) => {
    dedupedYieldMap.set(yieldPropertySignature.getName(), yieldPropertySignature);
  });

  const yields = [...dedupedYieldMap.values()].map((yieldPropertySignature) => {
    const typeNode = yieldPropertySignature.getTypeNode();
    const expandedTypeText = typeNode
      ? expandTypeText(
          typeNode,
          yieldPropertySignature.getSourceFile(),
          resolveRelativeSourceFile
        )
      : null;
    const contextualTypeQuery = typeNode
      ? getContextualComponentTypeQuery(typeNode)
      : null;

    const parsedYield = {
      name: yieldPropertySignature.getName(),
      type: normalizeTypeText(
        expandedTypeText ||
          (typeNode
            ? typeNode.getText()
            : yieldPropertySignature
                .getType()
                .getText(yieldPropertySignature, TYPE_FORMAT_FLAGS))
      ),
    };

    if (contextualTypeQuery) {
      const componentName = contextualTypeQuery.getExprName().getText();
      const importMatch = findImportForLocalName(
        yieldPropertySignature.getSourceFile(),
        componentName
      );
      const boundArgs = typeNode
        ? parseBoundArgNamesFromTypeNode(typeNode)
        : undefined;

      parsedYield.kind = 'component';
      parsedYield.componentName = componentName;

      if (importMatch?.moduleSpecifier) {
        parsedYield.sourcePath = importMatch.moduleSpecifier;
      }

      if (boundArgs && boundArgs.length > 0) {
        parsedYield.boundArgs = boundArgs;
      }
    } else if (parsedYield.type.includes('=>')) {
      parsedYield.kind = 'function';
    } else {
      parsedYield.kind = 'value';
    }

    return parsedYield;
  });

  yields.sort((a, b) => a.name.localeCompare(b.name));

  return yields;
}

function parseBlocks(signatureInterface, resolveRelativeSourceFile) {
  const blocksProperty = signatureInterface.getProperty('Blocks');

  if (!blocksProperty) {
    return [];
  }

  const blocksTypeNode = blocksProperty.getTypeNode?.();
  const astPropertySignatures = collectPropertySignaturesFromTypeNode(
    blocksTypeNode,
    signatureInterface.getSourceFile(),
    resolveRelativeSourceFile
  );

  if (astPropertySignatures.length > 0) {
    const blocks = astPropertySignatures.map((propertySignature) => {
      const yields = parseBlockYieldsFromPropertySignature(
        propertySignature,
        resolveRelativeSourceFile
      );

      if (yields.length > 0) {
        return {
          name: propertySignature.getName(),
          yields,
        };
      }

      return {
        name: propertySignature.getName(),
      };
    });

    blocks.sort((a, b) => a.name.localeCompare(b.name));

    return blocks;
  }

  const blocksType = blocksProperty.getType().getApparentType();
  const blocks = [];

  for (const propertySymbol of blocksType.getProperties()) {
    const declaration =
      propertySymbol.getValueDeclaration() || propertySymbol.getDeclarations()[0];

    if (declaration && Node.isPropertySignature(declaration)) {
      const yields = parseBlockYieldsFromPropertySignature(
        declaration,
        resolveRelativeSourceFile
      );

      if (yields.length > 0) {
        blocks.push({
          name: propertySymbol.getName(),
          yields,
        });

        continue;
      }
    }

    blocks.push({ name: propertySymbol.getName() });
  }

  blocks.sort((a, b) => a.name.localeCompare(b.name));

  return blocks;
}

function isComponentGroupComment(commentText) {
  const text = commentText.trim();

  if (text.length === 0) {
    return false;
  }

  if (text.startsWith('###')) {
    return false;
  }

  if (text.includes('---')) {
    return false;
  }

  return true;
}

function collectBarrelExports(entryFile, { group = null } = {}) {
  const normalizedGroupFilter = group ? normalizeGroupSlug(group) : null;
  const commentRegex = /^\s*\/\/\s*(.+?)\s*$/;
  const exportRegex =
    /^\s*export\s+\{\s*default\s+as\s+([A-Za-z0-9_]+)\s*\}\s+from\s+['"]([^'"]+)['"];\s*$/;

  const exportedComponents = [];
  let currentGroup = null;

  for (const line of entryFile.getFullText().split(/\r?\n/u)) {
    const commentMatch = line.match(commentRegex);

    if (commentMatch) {
      const candidateGroup = commentMatch[1].trim();

      if (isComponentGroupComment(candidateGroup)) {
        currentGroup = candidateGroup;
      }

      continue;
    }

    const exportMatch = line.match(exportRegex);

    if (!exportMatch) {
      continue;
    }

    const exportedName = exportMatch[1];
    const moduleSpecifier = exportMatch[2];

    if (!exportedName.startsWith('Hds') || !moduleSpecifier.endsWith('.gts')) {
      continue;
    }

    if (
      normalizedGroupFilter &&
      normalizeGroupSlug(currentGroup) !== normalizedGroupFilter
    ) {
      continue;
    }

    exportedComponents.push({
      name: exportedName,
      moduleSpecifier,
      group: currentGroup,
    });
  }

  return exportedComponents;
}

function readExistingCatalog(filePath) {
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const parsed = JSON.parse(readFileSync(filePath, 'utf8'));

    if (!parsed || !Array.isArray(parsed.components)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function mergeComponents(existingComponents, nextComponents) {
  const merged = [];
  const nextByName = new Map(nextComponents.map((component) => [component.name, component]));
  const seen = new Set();

  for (const existingComponent of existingComponents) {
    if (!existingComponent || typeof existingComponent.name !== 'string') {
      continue;
    }

    if (seen.has(existingComponent.name)) {
      continue;
    }

    if (nextByName.has(existingComponent.name)) {
      merged.push(nextByName.get(existingComponent.name));
      seen.add(existingComponent.name);
      continue;
    }

    merged.push(existingComponent);
    seen.add(existingComponent.name);
  }

  for (const nextComponent of nextComponents) {
    if (seen.has(nextComponent.name)) {
      continue;
    }

    merged.push(nextComponent);
    seen.add(nextComponent.name);
  }

  merged.sort((a, b) => a.name.localeCompare(b.name));

  return merged;
}

function main() {
  const options = parseCliOptions(process.argv.slice(2));
  const project = new Project({ tsConfigFilePath: TSCONFIG_PATH });
  const entryFile = project.addSourceFileAtPath(ENTRY_FILE_PATH);
  const { resolveRelativeSourceFile } = createSourceFileResolver(project);

  const components = [];
  const unresolvedComponents = [];
  const exportedComponents = collectBarrelExports(entryFile, options);

  for (const exportedComponent of exportedComponents) {
    const componentSourceFile = resolveRelativeSourceFile(
      entryFile,
      exportedComponent.moduleSpecifier
    );

    if (!componentSourceFile) {
      unresolvedComponents.push({
        name: exportedComponent.name,
        reason: `missing source file for ${exportedComponent.moduleSpecifier}`,
      });

      continue;
    }

    const signatureInterface = resolveSignatureInterface(
      componentSourceFile,
      exportedComponent.name,
      resolveRelativeSourceFile
    );

    if (!signatureInterface) {
      unresolvedComponents.push({
        name: exportedComponent.name,
        reason: 'missing signature interface',
      });

      continue;
    }

    const args = parseArgs(signatureInterface, resolveRelativeSourceFile);
    const blocks = parseBlocks(signatureInterface, resolveRelativeSourceFile);

    const component = {
      name: exportedComponent.name,
      sourcePath: exportedComponent.moduleSpecifier,
      summary: SUMMARY_PLACEHOLDER,
    };

    if (args.length > 0) {
      component.args = args;
    }

    if (blocks.length > 0) {
      component.blocks = blocks;
    }

    components.push(component);
  }

  components.sort((a, b) => a.name.localeCompare(b.name));

  let finalComponents = components;

  if (options.group) {
    const existingCatalog = readExistingCatalog(OUTPUT_FILE_PATH);

    if (existingCatalog) {
      finalComponents = mergeComponents(existingCatalog.components, components);
    }
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    components: finalComponents,
  };

  mkdirSync(dirname(OUTPUT_FILE_PATH), { recursive: true });
  writeFileSync(`${OUTPUT_FILE_PATH}`, `${JSON.stringify(payload, null, 2)}\n`);

  if (options.group) {
    console.log(`Applied group filter: ${options.group}`);
  }

  console.log(
    `Generated ${components.length} components -> ${OUTPUT_FILE_PATH}`
  );

  if (unresolvedComponents.length > 0) {
    console.warn(`Skipped ${unresolvedComponents.length} components:`);

    unresolvedComponents.forEach((entry) => {
      console.warn(`- ${entry.name}: ${entry.reason}`);
    });
  }
}

main();
