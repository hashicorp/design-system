/** Copyright IBM Corp. 2021, 2026 SPDX-License-Identifier: MPL-2.0 */

import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const GENERATE_SCRIPT_PATH = resolve(SCRIPT_DIR, 'generate-component-catalog.mjs');
const ENRICH_SCRIPT_PATH = resolve(
  SCRIPT_DIR,
  'enrich-component-catalog-from-docs.mjs'
);

function runNodeScript(scriptPath, args) {
  execFileSync(process.execPath, [scriptPath, ...args], {
    stdio: 'inherit',
  });
}

function parseCliOptions(argv) {
  let component = null;
  let group = null;
  let provider = null;
  let yes = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--') {
      continue;
    }

    if (arg.startsWith('--component=')) {
      component = arg.slice('--component='.length).trim();
      continue;
    }

    if (arg === '--component') {
      component = `${argv[index + 1] || ''}`.trim();
      index += 1;
      continue;
    }

    if (arg.startsWith('--group=')) {
      group = arg.slice('--group='.length).trim();
      continue;
    }

    if (arg === '--group') {
      group = `${argv[index + 1] || ''}`.trim();
      index += 1;
      continue;
    }

    if (arg.startsWith('--provider=')) {
      provider = arg.slice('--provider='.length).trim();
      continue;
    }

    if (arg === '--provider') {
      provider = `${argv[index + 1] || ''}`.trim();
      index += 1;
      continue;
    }

    if (arg === '--yes') {
      yes = true;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    component,
    group,
    provider,
    yes,
  };
}

function main() {
  const options = parseCliOptions(process.argv.slice(2));
  const generateArgs = [];
  const enrichArgs = [];

  if (options.group) {
    generateArgs.push(`--group=${options.group}`);
    enrichArgs.push(`--group=${options.group}`);
  }

  if (options.component) {
    generateArgs.push(`--component=${options.component}`);
  }

  if (options.component) {
    enrichArgs.push(`--component=${options.component}`);
  }

  if (options.provider) {
    enrichArgs.push(`--provider=${options.provider}`);
  }

  enrichArgs.push('--yes');

  console.log('Step 1/2: Generating base component catalog');
  runNodeScript(GENERATE_SCRIPT_PATH, generateArgs);

  console.log('\nStep 2/2: Enriching catalog with component docs');
  runNodeScript(ENRICH_SCRIPT_PATH, enrichArgs);
}

main();
