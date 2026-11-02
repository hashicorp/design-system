#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateTranslations } from './translations/validate.mjs';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));

function collect(directory, pattern, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    const file = `${prefix}${entry.name}`;

    if (entry.isDirectory()) {
      return collect(absolute, pattern, `${file}/`);
    }

    return pattern.test(file)
      ? [{ file, source: readFileSync(absolute, 'utf8') }]
      : [];
  });
}

try {
  const result = validateTranslations({
    catalogs: collect(path.join(packageRoot, 'translations'), /\.ya?ml$/),
    sources: collect(
      path.join(packageRoot, 'src'),
      /(?<!\.d)\.(?:ts|gts)$/,
      'src/'
    ),
  });

  for (const diagnostic of result.diagnostics) {
    console.error(
      `${diagnostic.file}:${diagnostic.line}:${diagnostic.col} [${diagnostic.category}] ${diagnostic.message}`
    );
  }

  console.log(
    `Translations: ${result.keyCount} keys, ${result.referenceCount} references, ${result.diagnostics.length} errors`
  );

  process.exitCode = result.diagnostics.length === 0 ? 0 : 1;
} catch (error) {
  console.error(`Translation check failed: ${error.message}`);

  process.exitCode = 1;
}
