#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// usage: pnpm translations:report --before <file> --lang <code> --body-out <file> [--changeset-dir <dir>] [--translations <dir>]
// compares the committed translations exported to --before with the files on disk after an import

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { collect, isLocaleFile } from './translations/files.mjs';
import { flattenLocale } from './translations/flatten.mjs';
import {
  buildChangeset,
  buildPullRequestBody,
  CHANGESET_FILE,
  diffTranslations,
  hasChanges,
} from './translations/report.mjs';
import { parseFlat } from './translations/serialize.mjs';
import {
  SOURCE_LOCALE,
  toEmberLocale,
} from './translations/straker.config.mjs';

const defaultTranslations = fileURLToPath(
  new URL('../translations', import.meta.url)
);

const write = (file, source) => {
  mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  writeFileSync(file, source);
};

try {
  const { values } = parseArgs({
    options: {
      before: { type: 'string' },
      lang: { type: 'string' },
      'body-out': { type: 'string' },
      'changeset-dir': { type: 'string' },
      translations: { type: 'string', default: defaultTranslations },
    },
  });

  if (
    values.before === undefined ||
    values.lang === undefined ||
    values['body-out'] === undefined
  ) {
    throw new Error(
      'Missing required --before <file>, --lang <code>, and --body-out <file>'
    );
  }

  const locale = toEmberLocale(values.lang);
  const read = (target) =>
    flattenLocale(collect(values.translations, isLocaleFile(target)), target);
  const before = parseFlat(readFileSync(values.before, 'utf8'));
  const after = read(locale);
  const changed = hasChanges(diffTranslations({ before, after }));

  write(
    values['body-out'],
    buildPullRequestBody({ locale, source: read(SOURCE_LOCALE), before, after })
  );

  if (changed && values['changeset-dir'] !== undefined) {
    write(
      path.join(values['changeset-dir'], CHANGESET_FILE),
      buildChangeset(locale)
    );
  }

  console.log(
    changed ? `${locale} translations changed` : `No ${locale} changes`
  );
} catch (error) {
  console.error(`Translation report failed: ${error.message}`);

  process.exitCode = 1;
}
