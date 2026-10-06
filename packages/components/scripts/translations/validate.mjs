/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readCatalog } from './catalog.mjs';
import { readReferences } from './references.mjs';

export function validateTranslations({ catalogs, sources }) {
  const catalog = readCatalog(catalogs);
  const usages = sources.map(readReferences);
  const references = usages.flatMap((usage) => usage.references);
  const diagnostics = [
    ...catalog.diagnostics,
    ...usages.flatMap((usage) => usage.diagnostics),
  ];
  const keys = new Set(
    catalog.records
      .filter((record) => record.locale === 'en-us')
      .map((record) => record.key)
  );
  const used = new Set(references.map((reference) => reference.key));

  if (catalogs.length === 0 || sources.length === 0 || keys.size === 0) {
    diagnostics.push({
      file: '.',
      line: 1,
      col: 1,
      category: 'invalid-input',
      message: 'Expected library sources and an en-us translation catalog',
    });
  }

  if (catalog.diagnostics.length === 0) {
    for (const reference of references) {
      if (!keys.has(reference.key))
        diagnostics.push({
          ...reference,
          category: 'missing-key',
          message: reference.key,
        });
    }
  }

  if (
    usages.every((usage) => usage.diagnostics.length === 0) &&
    catalog.diagnostics.length === 0
  ) {
    for (const record of catalog.records) {
      if (!used.has(record.key))
        diagnostics.push({
          ...record,
          category: 'unused-key',
          message: `${record.key} (${record.locale})`,
        });
    }
  }

  diagnostics.sort(
    (a, b) =>
      a.file.localeCompare(b.file, 'en') ||
      a.line - b.line ||
      a.col - b.col ||
      a.category.localeCompare(b.category, 'en')
  );

  return {
    diagnostics,
    keyCount: keys.size,
    referenceCount: references.length,
  };
}
