#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// usage: pnpm translations:export --out <file> [--lang <code>] [--translations <dir>]
// without --lang the source locale is exported

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { collect, isLocaleFile } from './translations/files.mjs';
import { flattenLocale } from './translations/flatten.mjs';
import { serializeFlat } from './translations/serialize.mjs';
import {
  SOURCE_LOCALE,
  toEmberLocale,
} from './translations/straker.config.mjs';

const defaultTranslations = fileURLToPath(
  new URL('../translations', import.meta.url)
);

try {
  const { values } = parseArgs({
    options: {
      out: { type: 'string' },
      lang: { type: 'string' },
      translations: { type: 'string', default: defaultTranslations },
    },
  });

  if (values.out === undefined) {
    throw new Error('Missing required --out <file>');
  }

  const locale =
    values.lang === undefined ? SOURCE_LOCALE : toEmberLocale(values.lang);
  const flat = flattenLocale(
    collect(values.translations, isLocaleFile(locale)),
    locale
  );

  mkdirSync(path.dirname(path.resolve(values.out)), { recursive: true });
  writeFileSync(values.out, serializeFlat(flat));

  console.log(
    `Exported ${Object.keys(flat).length} ${locale} translations to ${values.out}`
  );
} catch (error) {
  console.error(`Translation export failed: ${error.message}`);

  process.exitCode = 1;
}
