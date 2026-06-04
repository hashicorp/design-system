import { Node, Project, SyntaxKind } from 'ts-morph';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ENTRY_FILE_PATH = resolve(SCRIPT_DIR, '../src/components.ts');
const OUTPUT_FILE_PATH = resolve(SCRIPT_DIR, '../dist/manifest/component.json');

if (!existsSync(ENTRY_FILE_PATH)) {
  console.error(`❌ Central entry file not found at: ${ENTRY_FILE_PATH}`);

  process.exit(1);
}

const outputDir = dirname(OUTPUT_FILE_PATH);

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const TSCONFIG_PATH = resolve(SCRIPT_DIR, '../tsconfig.json');
const project = new Project({ tsConfigFilePath: TSCONFIG_PATH });
const entryFile = project.addSourceFileAtPath(ENTRY_FILE_PATH);
const allDocPayloads = {};
const missingTypesModules = [];
// Keep tracing bounded so a single highly-expanded type from local or external
// declarations cannot explode parse time or output size.
const TYPE_TRACE_LIMITS = {
  maxDepth: 24,
  maxUnionMembers: 80,
  maxTemplateExpansions: 120,
};
const stats = {
  exportsVisited: 0,
  componentsGenerated: 0,
  skippedWithoutModuleSpecifier: 0,
  skippedMissingTypesFile: 0,
  skippedDuplicateComponent: 0,
  skippedMissingArgDeclaration: 0,
  skippedMissingBlockDeclaration: 0,
  skippedMissingYieldDeclaration: 0,
  typeResolvedViaAst: 0,
  typeResolutionFallbacks: 0,
  typeResolutionCapped: 0,
};

function resolveTypesSourceFile(moduleSpecifier) {
  const candidates = [];

  if (moduleSpecifier.endsWith('.types.ts')) {
    candidates.push(moduleSpecifier);
  } else if (moduleSpecifier.endsWith('.gts')) {
    candidates.push(moduleSpecifier.replace(/\.gts$/, '.types.ts'));
  } else if (moduleSpecifier.endsWith('.ts')) {
    candidates.push(moduleSpecifier.replace(/\.ts$/, '.types.ts'));
  }

  const dedupedCandidates = [...new Set(candidates)];

  for (const candidate of dedupedCandidates) {
    const candidatePath = resolve(entryFile.getDirectoryPath(), candidate);
    const candidateFile = project.addSourceFileAtPathIfExists(candidatePath);

    if (candidateFile) {
      return candidateFile;
    }
  }

  return null;
}

function resolveImportSourceFile(fromSourceFile, moduleSpecifier) {
  const resolvedByTs = fromSourceFile
    .getImportDeclarations()
    .find((importDecl) => importDecl.getModuleSpecifierValue() === moduleSpecifier)
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

function findDeclaredTypeByName(sourceFile, typeName) {
  return (
    sourceFile.getTypeAlias(typeName) ||
    sourceFile.getInterface(typeName) ||
    sourceFile.getEnum(typeName) ||
    sourceFile.getClass(typeName)
  );
}

function findImportedTypeDeclaration(sourceFile, localTypeName) {
  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    const importedFile = resolveImportSourceFile(sourceFile, moduleSpecifier);

    if (!importedFile) {
      continue;
    }

    for (const specifier of importDecl.getNamedImports()) {
      const localName = specifier.getAliasNode()?.getText() || specifier.getName();

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

function resolveTypeFromDeclaration(declaration, seen, depth) {
  if (!declaration || depth > TYPE_TRACE_LIMITS.maxDepth) {
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
    const members = declaration
      .getMembers()
      .map((member) => member.getInitializer()?.getText() || member.getName())
      .filter(Boolean);

    if (members.length > 0) {
      if (members.length > TYPE_TRACE_LIMITS.maxUnionMembers) {
        stats.typeResolutionCapped += 1;
        return declaration.getName();
      }

      return members.join(' | ');
    }

    return declaration.getName();
  }

  if (Node.isClassDeclaration(declaration) || Node.isInterfaceDeclaration(declaration)) {
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

  return null;
}

function splitUnionText(typeText) {
  return typeText.split('|').map((part) => part.trim()).filter(Boolean);
}

function isQuotedLiteralText(typeText) {
  return /^(['"]).*\1$/.test(typeText);
}

function expandTemplateLiteralTypeNode(typeNode, sourceFile, seen, depth) {
  const head = typeNode.getHead().getLiteralText();
  const spans = typeNode.getTemplateSpans();
  let combinations = [head];

  for (const span of spans) {
    const spanTypeNode = span.getFirstChildIfKind(SyntaxKind.TypeReference)
      || span.getFirstChildIfKind(SyntaxKind.TemplateLiteralType)
      || span.getFirstChildIfKind(SyntaxKind.UnionType)
      || span.getFirstChildIfKind(SyntaxKind.LiteralType)
      || span.getFirstChild();

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

        if (nextCombinations.length > TYPE_TRACE_LIMITS.maxTemplateExpansions) {
          stats.typeResolutionCapped += 1;
          return 'string';
        }
      }
    }

    combinations = nextCombinations;
  }

  const literalUnion = combinations.map((value) => `'${value}'`);

  if (literalUnion.length > TYPE_TRACE_LIMITS.maxUnionMembers) {
    stats.typeResolutionCapped += 1;
    return 'string';
  }

  return literalUnion.join(' | ');
}

function resolveIndexedAccessTypeNodeToText(typeNode, sourceFile, seen, depth) {
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

  if (Node.isTypeNode(container)) {
    return resolveTypeNodeToText(container, rootSourceFile, seen, depth + 1);
  }

  return typeNode.getText();
}

function resolveTypeNodeToText(typeNode, sourceFile, seen = new Set(), depth = 0) {
  if (!typeNode || depth > TYPE_TRACE_LIMITS.maxDepth) {
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

    if (nodes.length > TYPE_TRACE_LIMITS.maxUnionMembers) {
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

  if (Node.isFunctionTypeNode(typeNode)) {
    return 'function';
  }

  if (Node.isTemplateLiteralTypeNode(typeNode)) {
    return expandTemplateLiteralTypeNode(typeNode, sourceFile, seen, depth + 1);
  }

  if (Node.isTypeReference(typeNode)) {
    return resolveTypeReferenceNodeToText(typeNode, sourceFile, seen, depth + 1);
  }

  if (Node.isIndexedAccessTypeNode(typeNode)) {
    return resolveIndexedAccessTypeNodeToText(typeNode, sourceFile, seen, depth + 1);
  }

  return typeNode.getText();
}

function resolveDeclarationTypeText(declaration) {
  const typeNode = declaration.getTypeNode?.();
  if (typeNode) {
    const tracedText = resolveTypeNodeToText(typeNode, declaration.getSourceFile());

    if (tracedText && tracedText !== 'unknown') {
      stats.typeResolvedViaAst += 1;
      return tracedText;
    }
  }

  stats.typeResolutionFallbacks += 1;
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

  if (Node.isTypeReference(typeNode) && typeNode.getTypeName().getText() === 'WithBoundArgs') {
    const firstTypeArg = typeNode.getTypeArguments()[0];
    if (firstTypeArg && Node.isTypeQuery(firstTypeArg)) {
      return 'component';
    }
  }

  return resolveDeclarationTypeText(declaration);
}

console.log(`🔍 Crawling entry point via AST: ${ENTRY_FILE_PATH}\n`);

// extract tsdoc descriptions and custom blocks from nodes
function normalizeTagText(tag) {
  const tagName = tag.getTagName();
  const tagComment =
    typeof tag.getComment === 'function' ? tag.getComment() : undefined;

  if (typeof tagComment === 'string') {
    return tagComment
      .split('\n')
      .map((line) => line.trimEnd())
      .join('\n');
  }

  const rawText = tag.getText();
  const withoutTagName = rawText.replace(new RegExp(`^@${tagName}\\b`), '');

  return withoutTagName
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').trimEnd())
    .join('\n')
    .trim();
}

function toSingleLineText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/\r\n?/g, '\n')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function normalizeMarkdownText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  const lines = value
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd());

  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }

  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  const indents = lines
    .filter((line) => line.trim() !== '')
    .map((line) => {
      const match = line.match(/^\s*/);
      return match ? match[0].length : 0;
    });

  const commonIndent = indents.length > 0 ? Math.min(...indents) : 0;

  const deindentedLines = lines.map((line) => line.slice(commonIndent));
  const outputLines = [];
  let currentLine = '';
  let currentMode = null;

  function flushCurrentLine() {
    if (currentLine) {
      outputLines.push(currentLine.trim());
      currentLine = '';
      currentMode = null;
    }
  }

  function pushBlankLine() {
    if (outputLines.length === 0) {
      return;
    }

    if (outputLines[outputLines.length - 1] !== '') {
      outputLines.push('');
    }
  }

  for (const rawLine of deindentedLines) {
    const line = rawLine.trim();

    if (line === '') {
      flushCurrentLine();
      pushBlankLine();
      continue;
    }

    const listMatch = line.match(/^([-*+]|\d+[.)])\s+(.*)$/);

    if (listMatch) {
      flushCurrentLine();
      currentMode = 'list';
      currentLine = `${listMatch[1]} ${listMatch[2]}`;
      continue;
    }

    if (currentMode === 'list' || currentMode === 'paragraph') {
      currentLine = `${currentLine} ${line}`;
      continue;
    }

    currentMode = 'paragraph';
    currentLine = line;
  }

  flushCurrentLine();

  while (outputLines.length > 0 && outputLines[0] === '') {
    outputLines.shift();
  }

  while (outputLines.length > 0 && outputLines[outputLines.length - 1] === '') {
    outputLines.pop();
  }

  return outputLines.join('\n');
}

function extractDocData(declarationNode) {
  const result = {
    description: '',
    remarks: '',
    defaultValue: null,
    dependsOn: null,
    splattributes: null,
    hasSplattributesTag: false,
  };

  const jsDocs = declarationNode.getJsDocs();

  if (jsDocs.length === 0) {
    return result;
  }

  const doc = jsDocs[0];

  result.description = toSingleLineText(doc.getComment());

  doc.getTags().forEach((tag) => {
    const tagName = tag.getTagName();
    const tagText = normalizeTagText(tag);

    if (tagName === 'remarks') {
      result.remarks = normalizeMarkdownText(tagText);
    }
    if (tagName === 'defaultValue') {
      result.defaultValue = toSingleLineText(tagText) || null;
    }
    if (tagName === 'dependsOn') {
      result.dependsOn = toSingleLineText(tagText) || null;
    }
    if (tagName === 'splattributes') {
      result.hasSplattributesTag = true;
      result.splattributes = toSingleLineText(tagText) || null;
    }
  });

  return result;
}

const exportDeclarations = entryFile.getExportDeclarations();

for (const exportDecl of exportDeclarations) {
  stats.exportsVisited += 1;

  const moduleSpecifier = exportDecl.getModuleSpecifierValue();

  if (!moduleSpecifier) {
    stats.skippedWithoutModuleSpecifier += 1;
    continue;
  }

  const targetFile = resolveTypesSourceFile(moduleSpecifier);

  if (!targetFile) {
    stats.skippedMissingTypesFile += 1;
    missingTypesModules.push(moduleSpecifier);
    continue;
  }

  const signatures = targetFile
    .getInterfaces()
    .filter((i) => i.getName().endsWith('Signature'));

  signatures.forEach((signatureInterface) => {
    const interfaceName = signatureInterface.getName();
    const componentName = interfaceName.replace('Signature', '');

    // skip duplicate exports to prevent reprocessing files
    if (allDocPayloads[componentName]) {
      stats.skippedDuplicateComponent += 1;
      return;
    }

    console.log(`📦 Generating docs for: ${componentName}`);

    const componentDocs = {
      name: componentName,
      args: [],
      blocks: [],
      element: null,
      splattributes: false,
    };

    // extract component arguments
    const argsProperty = signatureInterface.getProperty('Args');

    if (argsProperty) {
      const argsType = argsProperty.getType().getApparentType();

      argsType.getProperties().forEach((prop) => {
        const declaration = prop.getValueDeclaration();

        if (!declaration) {
          stats.skippedMissingArgDeclaration += 1;
          return;
        }

        const docData = extractDocData(declaration);

        componentDocs.args.push({
          name: prop.getName(),
          type: resolveDeclarationTypeText(declaration),
          required: !declaration.hasQuestionToken(),
          description: docData.description,
          remarks: docData.remarks,
          defaultValue: docData.defaultValue,
          dependsOn: docData.dependsOn,
        });
      });
    }

    // extract template blocks and their yielded parameters
    const blocksProperty = signatureInterface.getProperty('Blocks');

    if (blocksProperty) {
      const blocksType = blocksProperty.getType().getApparentType();

      blocksType.getProperties().forEach((prop) => {
        const declaration = prop.getValueDeclaration();

        if (!declaration) {
          stats.skippedMissingBlockDeclaration += 1;
          return;
        }

        const docData = extractDocData(declaration);
        const yields = [];

        const tupleElements = declaration.getType().getTupleElements();

        if (tupleElements.length > 0) {
          tupleElements.forEach((tupleElement, index) => {
            const yieldedProps = tupleElement.getProperties();

            if (yieldedProps.length > 0) {
              yieldedProps.forEach((yieldedProp) => {
                const yieldDecl = yieldedProp.getValueDeclaration();
                const yieldDocData = yieldDecl
                  ? extractDocData(yieldDecl)
                  : { description: '' };

                if (!yieldDecl) {
                  stats.skippedMissingYieldDeclaration += 1;
                }

                yields.push({
                  name: yieldedProp.getName(),
                  type: yieldDecl ? resolveYieldTypeText(yieldDecl) : 'unknown',
                  description: yieldDocData.description,
                });
              });

              return;
            }

            yields.push({
              name: `item${index + 1}`,
              type: tupleElement.getText(declaration),
              description: '',
            });
          });
        }

        componentDocs.blocks.push({
          name: prop.getName(),
          description: docData.description,
          yields,
        });
      });
    }

    // extract element type and splattributes support
    const elementProperty = signatureInterface.getProperty('Element');

    if (elementProperty) {
      const docData = extractDocData(elementProperty);
      componentDocs.element = elementProperty.getType().getText();

      if (docData.hasSplattributesTag) {
        componentDocs.splattributes = true;
      }
    }

    componentDocs.args.sort((a, b) => a.name.localeCompare(b.name));
    componentDocs.blocks.forEach((block) => {
      block.yields.sort((a, b) => a.name.localeCompare(b.name));
    });
    componentDocs.blocks.sort((a, b) => a.name.localeCompare(b.name));

    allDocPayloads[componentName] = componentDocs;
    stats.componentsGenerated += 1;
  });
}

const sortedDocPayloads = Object.fromEntries(
  Object.entries(allDocPayloads).sort(([a], [b]) => a.localeCompare(b))
);

writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(sortedDocPayloads, null, 2));

console.log(
  `\n🎉 Successfully compiled component documentation to: ${OUTPUT_FILE_PATH}`
);
console.log('\n📊 Docs parse summary:');
console.log(`  Exports visited: ${stats.exportsVisited}`);
console.log(`  Components generated: ${stats.componentsGenerated}`);
console.log(
  `  Skipped (no module specifier): ${stats.skippedWithoutModuleSpecifier}`
);
console.log(`  Skipped (missing types file): ${stats.skippedMissingTypesFile}`);
console.log(
  `  Skipped (duplicate component): ${stats.skippedDuplicateComponent}`
);
console.log(
  `  Skipped (missing arg declaration): ${stats.skippedMissingArgDeclaration}`
);
console.log(
  `  Skipped (missing block declaration): ${stats.skippedMissingBlockDeclaration}`
);
console.log(
  `  Skipped (missing yield declaration): ${stats.skippedMissingYieldDeclaration}`
);
console.log(`  Types resolved via AST tracing: ${stats.typeResolvedViaAst}`);
console.log(`  Type resolution fallbacks: ${stats.typeResolutionFallbacks}`);
console.log(`  Type resolution capped by limits: ${stats.typeResolutionCapped}`);

if (missingTypesModules.length > 0) {
  const sample = missingTypesModules.slice(0, 10);
  console.log('  Sample exports without a matching types file:');
  sample.forEach((modulePath) => {
    console.log(`    - ${modulePath}`);
  });
}
