/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * Parse component docs metadata from signature types.
 *
 * Input: src/components.ts central public exports. Output:
 * dist/manifest/components.json consumed by docs tooling. Invoked during `pnpm
 * build` in this package.
 */

import { Project } from 'ts-morph';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

import {
  ENTRY_FILE_PATH,
  OUTPUT_FILE_PATH,
  TSCONFIG_PATH,
} from './parse-docs/config.mjs';
import { createSourceFileResolver } from './parse-docs/source-files.mjs';
import { createTypeResolver } from './parse-docs/type-resolver.mjs';
import { extractDocData } from './parse-docs/doc-text.mjs';
import { parseComponentsFromEntry } from './parse-docs/component-parser.mjs';
import {
  printMissingTypesSummary,
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
const missingTypesModules = [];

const sourceFileResolver = createSourceFileResolver({ project, entryFile });
const typeResolver = createTypeResolver();

// walk only from the central components entrypoint so output order and coverage stay deterministic
console.log(`🔍 Crawling entry point via AST: ${ENTRY_FILE_PATH}\n`);

const allDocPayloads = parseComponentsFromEntry({
  entryFile,
  sourceFileResolver,
  typeResolver,
  extractDocData,
  onMissingTypesModule: (moduleSpecifier) => {
    missingTypesModules.push(moduleSpecifier);
  },
});

const sortedDocPayloads = sortDocPayloads(allDocPayloads);

writeManifest(OUTPUT_FILE_PATH, sortedDocPayloads);

printSuccess(OUTPUT_FILE_PATH);
printMissingTypesSummary(missingTypesModules);
