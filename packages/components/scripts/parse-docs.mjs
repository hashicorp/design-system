import { Project } from 'ts-morph';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

import {
  ENTRY_FILE_PATH,
  OUTPUT_FILE_PATH,
  TSCONFIG_PATH,
  TYPE_TRACE_LIMITS,
} from './parse-docs/config.mjs';
import { createStats, printStatsSummary } from './parse-docs/stats.mjs';
import { createSourceFileResolver } from './parse-docs/source-files.mjs';
import { createTypeResolver } from './parse-docs/type-resolver.mjs';
import { extractDocData } from './parse-docs/doc-text.mjs';
import { parseComponentsFromEntry } from './parse-docs/component-parser.mjs';
import {
  printMissingTypesSample,
  printSuccess,
  sortDocPayloads,
  writeManifest,
} from './parse-docs/output.mjs';

if (!existsSync(ENTRY_FILE_PATH)) {
  console.error(`❌ Central entry file not found at: ${ENTRY_FILE_PATH}`);
  process.exit(1);
}

const outputDir = dirname(OUTPUT_FILE_PATH);
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const project = new Project({ tsConfigFilePath: TSCONFIG_PATH });
const entryFile = project.addSourceFileAtPath(ENTRY_FILE_PATH);
const stats = createStats();
const missingTypesModules = [];

const sourceFileResolver = createSourceFileResolver({ project, entryFile });
const typeResolver = createTypeResolver({
  limits: TYPE_TRACE_LIMITS,
  stats,
  resolveImportSourceFile: sourceFileResolver.resolveImportSourceFile,
});

console.log(`🔍 Crawling entry point via AST: ${ENTRY_FILE_PATH}\n`);

const allDocPayloads = parseComponentsFromEntry({
  entryFile,
  sourceFileResolver,
  typeResolver,
  extractDocData,
  stats,
  onMissingTypesModule: (moduleSpecifier) => {
    missingTypesModules.push(moduleSpecifier);
  },
});

const sortedDocPayloads = sortDocPayloads(allDocPayloads);
writeManifest(OUTPUT_FILE_PATH, sortedDocPayloads);

printSuccess(OUTPUT_FILE_PATH);
printStatsSummary(stats);
printMissingTypesSample(missingTypesModules);
