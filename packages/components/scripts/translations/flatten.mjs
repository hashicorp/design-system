/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readValidCatalog } from './catalog.mjs';

// ordinal comparison keeps output stable regardless of the host locale
const byKey = ([a], [b]) => (a < b ? -1 : a > b ? 1 : 0);

export function flattenLocale(files, locale) {
  const entries = readValidCatalog(files)
    .filter((record) => record.locale === locale)
    .map((record) => [record.key, record.value]);

  return Object.fromEntries(entries.sort(byKey));
}
