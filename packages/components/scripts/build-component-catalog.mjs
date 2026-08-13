#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';
import ts from 'typescript';

const PACKAGE_ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const DECLARATIONS_DIR = path.join(PACKAGE_ROOT, 'declarations');
const COMPONENTS_DIR = path.join(DECLARATIONS_DIR, 'components');
const REGISTRY_FILE = path.join(DECLARATIONS_DIR, 'template-registry.d.ts');
const DOCS_DIR = path.resolve(PACKAGE_ROOT, '../../website/docs');
const OUTPUT_FILE = path.join(PACKAGE_ROOT, 'component-catalog.json');

const REGISTRY_INTERFACE = 'HdsComponentsRegistry';
const INVOCATION_PREFIX = 'Hds::';
const MODULE_PREFIX = 'hds/';

const MAX_LITERAL_VALUES = 50;
// guards the walk against a cyclic type
const MAX_TYPE_DEPTH = 12;

const API_PARTIAL = 'partials/code/component-api.md';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;
const API_HEADING = /^#{2,6}\s+(\S.*?)\s*$/;
const GITHUB_SOURCE_LINK =
  /https:\/\/github\.com\/hashicorp\/design-system\/tree\/main\/packages\/components\/src\/components\/([^\s'"]+)/;
const NON_NULLABLE_WRAPPER = /^NonNullable<(.+)>$/;

// TS2307: 'Cannot find module ... or its corresponding type declarations'
const UNRESOLVED_MODULE = 2307;

function fail(message) {
  console.error(`\n\x1b[31m⚠️  Error: ${message}\x1b[0m\n`);

  process.exit(1);
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function collectFiles(dir, suffix, found = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      collectFiles(full, suffix, found);
    } else if (entry.name.endsWith(suffix)) {
      found.push(full);
    }
  }

  return found;
}

function modulePathFromFile(fileName) {
  const relative = toPosix(path.relative(COMPONENTS_DIR, fileName));

  if (relative.startsWith('..')) {
    return undefined;
  }

  return relative.replace(/\.d\.ts$/, '').replace(/\/index$/, '');
}

function assertModulesResolve(program) {
  const unresolved = program
    .getSemanticDiagnostics()
    .filter(
      (diagnostic) =>
        diagnostic.code === UNRESOLVED_MODULE &&
        diagnostic.file?.fileName.startsWith(DECLARATIONS_DIR) === true
    );

  if (unresolved.length === 0) {
    return;
  }

  const [first] = unresolved;

  fail(
    `${unresolved.length} unresolved module(s) under ${DECLARATIONS_DIR}, e.g. ` +
      `'${ts.flattenDiagnosticMessageText(first.messageText, ' ')}' in ` +
      `${first.file.fileName} — every type reaching an unresolved module is emitted as \`any\``
  );
}

function createProgram() {
  const options = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    noEmit: true,
    types: ['ember-source/types'],
  };

  const host = ts.createCompilerHost(options, true);

  host.getCurrentDirectory = () => PACKAGE_ROOT;

  const program = ts.createProgram(
    collectFiles(DECLARATIONS_DIR, '.d.ts').sort(),
    options,
    host
  );

  assertModulesResolve(program);

  return program;
}

function findRegistryInterface(program) {
  const source = program.getSourceFile(REGISTRY_FILE);

  if (source === undefined) {
    return undefined;
  }

  let found;

  ts.forEachChild(source, (node) => {
    if (
      ts.isInterfaceDeclaration(node) &&
      node.name.text === REGISTRY_INTERFACE
    ) {
      found = node;
    }
  });

  return found;
}

function collectRegistryEntries(checker, registry) {
  const bySymbol = new Map();

  for (const member of registry.members) {
    if (!ts.isPropertySignature(member)) {
      continue;
    }

    if (member.type === undefined || !ts.isTypeQueryNode(member.type)) {
      continue;
    }

    const key = ts.isStringLiteral(member.name)
      ? member.name.text
      : member.name.getText();

    let symbol = checker.getSymbolAtLocation(member.type.exprName);

    if (symbol === undefined) {
      continue;
    }

    if ((symbol.flags & ts.SymbolFlags.Alias) !== 0) {
      symbol = checker.getAliasedSymbol(symbol);
    }

    const keys = bySymbol.get(symbol) ?? [];

    keys.push(key);

    bySymbol.set(symbol, keys);
  }

  const entries = [];

  for (const [symbol, keys] of bySymbol) {
    const name = keys.find((key) => key.startsWith(INVOCATION_PREFIX));
    const modulePath = keys.find((key) => key.startsWith(MODULE_PREFIX));

    if (name === undefined || modulePath === undefined) {
      continue;
    }

    entries.push({ name, modulePath, symbol });
  }

  return entries;
}

function findSignatureType(checker, symbol) {
  for (const declaration of symbol.getDeclarations() ?? []) {
    if (ts.isClassDeclaration(declaration)) {
      const extended = declaration.heritageClauses?.find(
        (clause) => clause.token === ts.SyntaxKind.ExtendsKeyword
      );
      const typeArgument = extended?.types[0]?.typeArguments?.[0];

      if (typeArgument !== undefined) {
        return checker.getTypeAtLocation(typeArgument);
      }
    }

    if (
      ts.isVariableDeclaration(declaration) &&
      declaration.type !== undefined
    ) {
      const typeArgument = declaration.type.typeArguments?.[0];

      if (typeArgument !== undefined) {
        return checker.getTypeAtLocation(typeArgument);
      }
    }
  }

  return undefined;
}

function stripUndefined(checker, type) {
  const members = type.isUnion() ? type.types : [type];
  const defined = members.filter(
    (member) => (member.flags & ts.TypeFlags.Undefined) === 0
  );

  if (defined.length === members.length) {
    return type;
  }

  if (!defined.some((member) => (member.flags & ts.TypeFlags.Null) !== 0)) {
    return checker.getNonNullableType(type);
  }

  return checker.getUnionType(defined);
}

function renderTypeString(checker, type) {
  if ((type.flags & ts.TypeFlags.Unknown) !== 0) {
    return 'unknown';
  }

  const defined = stripUndefined(checker, type);
  const rendered = checker.typeToString(defined);

  if (defined.isIntersection()) {
    const unwrapped = NON_NULLABLE_WRAPPER.exec(rendered);

    if (unwrapped !== null) {
      return unwrapped[1];
    }
  }

  return rendered;
}

// literal values in the checker's own union order, or undefined if not a pure literal union
function literalValues(checker, type) {
  if ((type.flags & ts.TypeFlags.Unknown) !== 0) {
    return undefined;
  }

  const nonNullable = checker.getNonNullableType(type);

  // `boolean` is a union of `false | true`, which would otherwise read as values
  if ((nonNullable.flags & ts.TypeFlags.Boolean) !== 0) {
    return undefined;
  }

  const members = nonNullable.isUnion() ? nonNullable.types : [nonNullable];
  const values = [];

  for (const member of members) {
    if ((member.flags & ts.TypeFlags.BooleanLike) !== 0) {
      return undefined;
    }

    // `isLiteral` also covers enum members, which `isStringLiteral` misses
    if (!member.isLiteral()) {
      return undefined;
    }

    // coerce before de-duplicating: a string enum contributes both '500' and 500
    values.push(String(member.value));
  }

  return values;
}

function declaredValueOrder(checker, node, depth = 0) {
  if (node === undefined || depth > MAX_TYPE_DEPTH) {
    return undefined;
  }

  if (ts.isUnionTypeNode(node)) {
    const values = [];

    for (const child of node.types) {
      const part =
        declaredValueOrder(checker, child, depth + 1) ??
        literalValues(checker, checker.getTypeAtLocation(child));

      if (part === undefined) {
        return undefined;
      }

      values.push(...part);
    }
    return values;
  }

  if (ts.isLiteralTypeNode(node)) {
    const { literal } = node;

    if (ts.isStringLiteral(literal) || ts.isNumericLiteral(literal)) {
      return [literal.text];
    } else {
      return undefined;
    }
  }

  if (node.kind === ts.SyntaxKind.UndefinedKeyword) {
    return [];
  }

  if (ts.isTemplateLiteralTypeNode(node)) {
    if (node.head.text !== '' || node.templateSpans.length !== 1) {
      return undefined;
    }

    const [span] = node.templateSpans;

    if (span.literal.text !== '') {
      return undefined;
    } else {
      return declaredValueOrder(checker, span.type, depth + 1);
    }
  }

  if (ts.isTypeReferenceNode(node)) {
    let symbol = checker.getSymbolAtLocation(node.typeName);

    if (symbol === undefined) {
      return undefined;
    }

    if ((symbol.flags & ts.SymbolFlags.Alias) !== 0) {
      symbol = checker.getAliasedSymbol(symbol);
    }

    for (const declaration of symbol.getDeclarations() ?? []) {
      if (ts.isTypeAliasDeclaration(declaration)) {
        return declaredValueOrder(checker, declaration.type, depth + 1);
      }

      if (ts.isEnumDeclaration(declaration)) {
        const values = [];

        for (const member of declaration.members) {
          const value = checker.getConstantValue(member);

          if (value === undefined) {
            return undefined;
          }

          values.push(String(value));
        }

        return values;
      }
    }

    return undefined;
  }

  // e.g. HdsIconSignature['Args']['name']
  if (ts.isIndexedAccessTypeNode(node)) {
    const { indexType } = node;

    if (
      !ts.isLiteralTypeNode(indexType) ||
      !ts.isStringLiteral(indexType.literal)
    ) {
      return undefined;
    }

    const property = checker
      .getTypeAtLocation(node.objectType)
      .getProperty(indexType.literal.text);
    const declaration = property?.getDeclarations()?.[0];

    return declaredValueOrder(checker, declaration?.type, depth + 1);
  }

  return undefined;
}

function extractValues(checker, symbol, type) {
  const resolved = literalValues(checker, type);

  if (resolved === undefined) {
    return undefined;
  }

  const unique = [...new Set(resolved)];

  if (unique.length > MAX_LITERAL_VALUES) {
    return undefined;
  }

  for (const declaration of symbol.getDeclarations() ?? []) {
    const ordered = declaredValueOrder(checker, declaration.type);

    if (ordered === undefined) {
      continue;
    }

    const authored = [...new Set(ordered)];

    if (authored.length !== unique.length) {
      continue;
    }

    if (!authored.every((value) => unique.includes(value))) {
      continue;
    }

    return authored;
  }

  return unique;
}

function declaringModulePaths(symbol) {
  const paths = [];

  for (const declaration of symbol.getDeclarations() ?? []) {
    const modulePath = modulePathFromFile(declaration.getSourceFile().fileName);

    if (modulePath !== undefined) {
      paths.push(modulePath);
    }
  }

  return paths;
}

function extractArgs(checker, signature, modulePath) {
  const argsSymbol = signature.getProperty('Args');

  if (argsSymbol === undefined) {
    return [];
  }

  const args = [];

  for (const symbol of checker.getTypeOfSymbol(argsSymbol).getProperties()) {
    const type = checker.getTypeOfSymbol(symbol);
    const arg = {
      name: symbol.name,
      type: renderTypeString(checker, type),
      required: (symbol.flags & ts.SymbolFlags.Optional) === 0,
    };
    const values = extractValues(checker, symbol, type);

    if (values !== undefined) {
      arg.values = values;
    }

    const declaredIn = declaringModulePaths(symbol);

    if (declaredIn.length > 0 && !declaredIn.includes(modulePath)) {
      arg.inheritedFrom = declaredIn[0];
    }

    args.push(arg);
  }

  return args.sort((a, b) => a.name.localeCompare(b.name));
}

function isYieldedHash(type) {
  return (
    (type.flags & ts.TypeFlags.Object) !== 0 &&
    type.symbol?.name === ts.InternalSymbolName.Type
  );
}

function renderYieldType(checker, type, typeNode) {
  return (checker.getNonNullableType(type).flags & ts.TypeFlags.Never) === 0
    ? renderTypeString(checker, type)
    : typeNode.getText().replace(/\s+/g, ' ');
}

function extractYields(checker, blockType) {
  const nonNullable = checker.getNonNullableType(blockType);

  if (!checker.isTupleType(nonNullable)) {
    return [];
  }

  const elements = checker.getTypeArguments(nonNullable);
  const labels = nonNullable.target?.labeledElementDeclarations;
  const yields = [];

  elements.forEach((element, index) => {
    const label = labels?.[index];

    if (label === undefined && isYieldedHash(element)) {
      for (const member of element.getProperties()) {
        const declaration = member.getDeclarations()?.[0];

        yields.push({
          name: member.name,
          type: renderYieldType(
            checker,
            checker.getTypeOfSymbol(member),
            declaration?.type
          ),
        });
      }

      return;
    }

    yields.push({
      name: label?.name?.getText() ?? String(index),
      type: renderYieldType(checker, element, label?.type),
    });
  });

  return yields;
}

function extractBlocks(checker, signature) {
  const blocksSymbol = signature.getProperty('Blocks');

  if (blocksSymbol === undefined) {
    return [];
  }

  const blocks = [];

  for (const symbol of checker.getTypeOfSymbol(blocksSymbol).getProperties()) {
    blocks.push({
      name: symbol.name,
      yields: extractYields(checker, checker.getTypeOfSymbol(symbol)),
    });
  }

  return blocks.sort((a, b) => a.name.localeCompare(b.name));
}

// 'Form::Error::Message' -> 'formerrormessage'
function flattenName(name) {
  return name.replace(/\W/g, '').toLowerCase();
}

function documentedNames(dir) {
  const file = path.join(dir, API_PARTIAL);

  if (!existsSync(file)) {
    return [];
  }

  const names = [];

  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const heading = API_HEADING.exec(line);

    if (heading !== null) {
      names.push(flattenName(heading[1]));
    }
  }

  return names;
}

function collectDocPages() {
  if (!existsSync(DOCS_DIR)) {
    return [];
  }

  const pages = [];

  for (const file of collectFiles(DOCS_DIR, 'index.md')) {
    const frontmatter = FRONTMATTER.exec(readFileSync(file, 'utf8'));

    if (frontmatter === null) {
      continue;
    }

    const link = GITHUB_SOURCE_LINK.exec(frontmatter[1]);

    const dir = path.dirname(file);

    pages.push({
      modulePath: link === null ? undefined : link[1],
      route: toPosix(path.relative(DOCS_DIR, dir)),
      documents: documentedNames(dir),
    });
  }

  return pages;
}

function documentedDepth(page, name) {
  const segments = name.slice(INVOCATION_PREFIX.length).split('::');

  for (let depth = segments.length; depth > 0; depth -= 1) {
    const documented = flattenName(segments.slice(0, depth).join(''));

    if (page.documents.includes(documented)) {
      return depth;
    }
  }

  return 0;
}

function routeOverlap(page, modulePath) {
  const segments = page.route.split('/');

  return modulePath
    .split('/')
    .slice(1)
    .filter((segment) => segments.includes(segment)).length;
}

function highestScoring(pages, score) {
  let best = [];
  let highest = -1;

  for (const page of pages) {
    const value = score(page);

    if (value > highest) {
      highest = value;
      best = [page];
    } else if (value === highest) {
      best.push(page);
    }
  }

  return best;
}

function resolveUnlinkedDocsPath(name, modulePath, docPages) {
  const slug = modulePath.slice(modulePath.lastIndexOf('/') + 1);
  const matches = docPages.filter(
    (page) =>
      page.modulePath === undefined &&
      (documentedDepth(page, name) > 0 ||
        page.route.slice(page.route.lastIndexOf('/') + 1) === slug)
  );

  if (matches.length > 1) {
    fail(
      `${name} ('${modulePath}') matches ${matches.length} unlinked docs pages: ` +
        matches.map((page) => page.route).join(', ')
    );
  } else {
    return matches[0]?.route;
  }
}

function resolveDocsPath(name, modulePath, docPages) {
  let candidates = [];
  let longest = -1;

  for (const page of docPages) {
    const isPrefix =
      modulePath === page.modulePath ||
      modulePath.startsWith(`${page.modulePath}/`);

    if (!isPrefix) {
      continue;
    }

    if (page.modulePath.length > longest) {
      longest = page.modulePath.length;
      candidates = [page];
    } else if (page.modulePath.length === longest) {
      candidates.push(page);
    }
  }

  if (candidates.length === 0) {
    return resolveUnlinkedDocsPath(name, modulePath, docPages);
  } else if (candidates.length === 1) {
    return candidates[0].route;
  } else {
    let best = highestScoring(candidates, (page) =>
      documentedDepth(page, name)
    );

    if (best.length > 1) {
      best = highestScoring(best, (page) => routeOverlap(page, modulePath));
    }

    if (best.length > 1) {
      fail(
        `${name} ('${modulePath}') matches ${best.length} docs pages that no tiebreak ` +
          `separates: ${best.map((page) => page.route).join(', ')}`
      );
    }

    return best[0].route;
  }
}

function buildComponent(checker, entry, docPages) {
  const signature = findSignatureType(checker, entry.symbol);

  if (signature === undefined) {
    return undefined;
  }

  const component = { name: entry.name, modulePath: entry.modulePath };

  const docsPath = resolveDocsPath(entry.name, entry.modulePath, docPages);

  if (docsPath !== undefined) {
    component.docsPath = docsPath;
  }

  const elementSymbol = signature.getProperty('Element');

  if (elementSymbol !== undefined) {
    component.element = checker.typeToString(
      checker.getTypeOfSymbol(elementSymbol)
    );
  }

  component.args = extractArgs(checker, signature, entry.modulePath);
  component.blocks = extractBlocks(checker, signature);

  return component;
}

function assertDocsPathsExist(components) {
  for (const component of components) {
    if (component.docsPath === undefined) {
      continue;
    } else if (existsSync(path.join(DOCS_DIR, component.docsPath))) {
      continue;
    } else {
      fail(
        `${component.name} resolved to docsPath '${component.docsPath}', ` +
          `but no such directory exists under ${DOCS_DIR}`
      );
    }
  }
}

async function writeCatalog(catalog) {
  const source = `${JSON.stringify(catalog, null, 2)}\n`;
  const config = await prettier.resolveConfig(OUTPUT_FILE);
  const formatted = await prettier.format(source, {
    ...config,
    filepath: OUTPUT_FILE,
  });

  writeFileSync(OUTPUT_FILE, formatted);
}

async function main() {
  if (!existsSync(DECLARATIONS_DIR)) {
    fail(
      `the \`declarations\` directory was not found — run \`pnpm build\` in ` +
        `packages/components before generating the component catalog`
    );
  }

  const program = createProgram();
  const checker = program.getTypeChecker();

  const registry = findRegistryInterface(program);

  if (registry === undefined) {
    fail(
      `could not find the \`${REGISTRY_INTERFACE}\` interface in ${REGISTRY_FILE}`
    );
  }

  const docPages = collectDocPages();
  const components = [];

  for (const entry of collectRegistryEntries(checker, registry)) {
    const component = buildComponent(checker, entry, docPages);

    if (component !== undefined) {
      components.push(component);
    }
  }

  components.sort((a, b) => a.name.localeCompare(b.name));

  assertDocsPathsExist(components);

  await writeCatalog({ components });

  console.log(`component-catalog.json: ${components.length} components`);
}

await main();
