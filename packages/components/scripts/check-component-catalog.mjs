#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// fails when the committed `component-catalog.json` is not what the current sources produce

import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE_ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const CATALOG_FILE = 'component-catalog.json';
const GENERATOR = './scripts/build-component-catalog.mjs';
const MAX_DIFF_LINES = 100;

function fail(message) {
  console.error(`\n\x1b[31m⚠️  Error: ${message}\x1b[0m\n`);

  process.exit(1);
}

function git(args) {
  return execFileSync('git', args, { cwd: PACKAGE_ROOT, encoding: 'utf8' });
}

try {
  execFileSync(process.execPath, [GENERATOR], {
    cwd: PACKAGE_ROOT,
    stdio: 'inherit',
  });
} catch {
  process.exit(1);
}

const drift = git(['diff', '--stat', 'HEAD', '--', CATALOG_FILE]).trim();

if (drift.length > 0) {
  const lines = git(['diff', 'HEAD', '--', CATALOG_FILE]).split('\n');

  console.error(`\n${drift}\n`);
  console.error(lines.slice(0, MAX_DIFF_LINES).join('\n'));

  if (lines.length > MAX_DIFF_LINES) {
    console.error(`… ${lines.length - MAX_DIFF_LINES} more lines`);
  }

  fail(
    `\`${CATALOG_FILE}\` is out of date. It has been regenerated in place — ` +
      `commit the result.`
  );
}
