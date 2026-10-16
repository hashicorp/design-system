#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { formatDiagnostic } from './translations/catalog.mjs';
import { collect, isYamlFile } from './translations/files.mjs';
import { validateTranslations } from './translations/validate.mjs';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));

try {
  const result = validateTranslations({
    catalogs: collect(path.join(packageRoot, 'translations'), isYamlFile),
    sources: collect(
      path.join(packageRoot, 'src'),
      (file) => /(?<!\.d)\.(?:ts|gts)$/.test(file),
      'src/'
    ),
  });

  for (const diagnostic of result.diagnostics) {
    console.error(formatDiagnostic(diagnostic));
  }

  console.log(
    `Translations: ${result.keyCount} keys, ${result.referenceCount} references, ${result.diagnostics.length} errors`
  );

  process.exitCode = result.diagnostics.length === 0 ? 0 : 1;
} catch (error) {
  console.error(`Translation check failed: ${error.message}`);

  process.exitCode = 1;
}
