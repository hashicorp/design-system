#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// usage: pnpm translations:import --in <file> --lang <code> [--translations <dir>]

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { collect, isLocaleFile, writeFiles } from './translations/files.mjs';
import { flattenLocale } from './translations/flatten.mjs';
import { parseFlat } from './translations/serialize.mjs';
import {
  SOURCE_LOCALE,
  toEmberLocale,
} from './translations/straker.config.mjs';
import { buildLocaleFiles } from './translations/unflatten.mjs';

const defaultTranslations = fileURLToPath(
  new URL('../translations', import.meta.url)
);

try {
  const { values } = parseArgs({
    options: {
      in: { type: 'string' },
      lang: { type: 'string' },
      translations: { type: 'string', default: defaultTranslations },
    },
  });

  if (values.in === undefined || values.lang === undefined) {
    throw new Error('Missing required --in <file> and --lang <code>');
  }

  const locale = toEmberLocale(values.lang);
  const existing = collect(values.translations, isLocaleFile(locale));
  const { files, unknownKeys, blankKeys } = buildLocaleFiles({
    sourceFiles: collect(values.translations, isLocaleFile(SOURCE_LOCALE)),
    flat: parseFlat(readFileSync(values.in, 'utf8')),
    locale,
    previous: flattenLocale(existing, locale),
    existingFiles: existing.map(({ file }) => file),
  });

  writeFiles(values.translations, files);

  // stale keys are expected while the pipeline catches up with english changes
  for (const key of unknownKeys) {
    console.warn(`Skipped ${key}: not present in ${SOURCE_LOCALE}`);
  }

  for (const key of blankKeys) {
    console.warn(`Skipped ${key}: blank translation`);
  }

  const written = files.filter(({ source }) => source !== null).length;

  console.log(
    `Imported ${locale}: wrote ${written} files, skipped ${files.length - written} without translations`
  );
} catch (error) {
  console.error(`Translation import failed: ${error.message}`);

  process.exitCode = 1;
}
