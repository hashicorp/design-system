/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import path from 'node:path';
import { load } from 'js-yaml';
import { isMap, isScalar, LineCounter, parseDocument } from 'yaml';

export function readCatalog(files) {
  const records = [];
  const diagnostics = [];
  const seen = new Set();
  const structures = new Map();

  for (const { file, source } of files) {
    const lines = new LineCounter();
    const document = parseDocument(source, { lineCounter: lines });
    const locale = path.basename(file).replace(/\.ya?ml$/, '');
    const directory = path.posix.dirname(file);
    const namespace = directory === '.' ? [] : directory.split('/');
    const report = (offset, message) => {
      diagnostics.push({
        file: `translations/${file}`,
        ...lines.linePos(offset),
        category: 'invalid-catalog',
        message,
      });
    };

    if (document.errors.length > 0 || document.warnings.length > 0) {
      for (const error of [...document.errors, ...document.warnings]) {
        report(error.pos[0], error.message);
      }

      continue;
    }

    let values;

    try {
      // use the same YAML loader and default schema as ember-intl; the AST supplies locations
      values = load(source);
    } catch (error) {
      report(error.mark?.position ?? 0, error.message);

      continue;
    }

    if (namespace.some((segment) => !/^[a-z0-9_-]+$/.test(segment))) {
      report(
        0,
        'Translation directories must use lowercase letters, digits, hyphens, or underscores'
      );

      continue;
    }

    function register(segments, kind, offset) {
      const identity = JSON.stringify([locale, ...segments]);
      const previous = structures.get(identity);

      if (previous !== undefined && previous.kind !== kind) {
        report(
          offset,
          `Translation path ${segments.join('.')} is both a string and a namespace (${locale}); conflicts with ${previous.file}`
        );
      }

      structures.set(identity, { kind, file: `translations/${file}` });
    }

    for (let i = 1; i <= namespace.length; i++) {
      register(namespace.slice(0, i), 'mapping', 0);
    }

    function visit(node, segments, loaded) {
      if (!isMap(node)) {
        report(node?.range?.[0] ?? 0, 'Expected a mapping of translation keys');

        return;
      }

      for (const { key, value } of node.items) {
        const offset = key?.range?.[0] ?? 0;

        if (
          !isScalar(key) ||
          typeof key.value !== 'string' ||
          key.value.length === 0
        ) {
          report(offset, 'Translation keys must be non-empty strings');

          continue;
        }

        const childSegments = [...segments, key.value];
        const fullKey = childSegments.join('.');
        const loadedValue = loaded?.[key.value];

        if (isMap(value)) {
          register(childSegments, 'mapping', offset);
          visit(value, childSegments, loadedValue);
        } else if (isScalar(value) && typeof loadedValue === 'string') {
          register(childSegments, 'string', offset);

          const identity = `${locale}:${fullKey}`;

          if (seen.has(identity)) {
            report(offset, `Duplicate translation key: ${fullKey} (${locale})`);
          }

          seen.add(identity);

          records.push({
            key: fullKey,
            locale,
            file: `translations/${file}`,
            ...lines.linePos(offset),
          });
        } else {
          report(offset, `Translation ${fullKey} must have a string value`);
        }
      }
    }

    visit(document.contents, namespace, values);
  }

  return { records, diagnostics };
}
