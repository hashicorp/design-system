/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import path from 'node:path';
import { isMap, isScalar, parseDocument, Scalar } from 'yaml';

import { readValidCatalog } from './catalog.mjs';

// a zero line width keeps long strings on one line, matching the source files
const STRINGIFY_OPTIONS = { lineWidth: 0 };

// replaces template values in place and drops untranslated keys and empty mappings
function translateMap(map, segments, flat, used) {
  map.items = map.items.filter((pair) => {
    const childSegments = [...segments, pair.key.value];

    if (isMap(pair.value)) {
      translateMap(pair.value, childSegments, flat, used);

      return pair.value.items.length > 0;
    }

    const key = childSegments.join('.');

    if (!Object.hasOwn(flat, key)) {
      return false;
    }

    used.add(key);

    if (isScalar(pair.value)) {
      // keeping the node keeps its quote style; yaml still quotes values that need it
      pair.value.value = flat[key];
    } else {
      // aliases may point at untranslated anchors, so inline the value instead
      pair.value = new Scalar(flat[key]);
    }

    return true;
  });
}

function translateFile({ file, source }, flat, locale, used) {
  const directory = path.posix.dirname(file);
  const namespace = directory === '.' ? [] : directory.split('/');
  const document = parseDocument(source);

  translateMap(document.contents, namespace, flat, used);

  return {
    file: path.posix.join(directory, `${locale}${path.posix.extname(file)}`),
    source:
      document.contents.items.length > 0
        ? document.toString(STRINGIFY_OPTIONS)
        : null,
  };
}

function assertMatchesFlat(files, flat) {
  const mismatched = readValidCatalog(files)
    .filter((record) => record.value !== flat[record.key])
    .map((record) => record.key);

  if (mismatched.length > 0) {
    throw new Error(
      `Generated translations do not round-trip: ${mismatched.join(', ')}`
    );
  }
}

/**
 * builds `locale` files beside each source file, using the source as the
 * structural template; `existingFiles` lists current `locale` files so that
 * ones without a source counterpart are deleted (returned with a null source)
 */
export function buildLocaleFiles({
  sourceFiles,
  flat,
  locale,
  existingFiles = [],
}) {
  readValidCatalog(sourceFiles);

  const used = new Set();
  const generated = sourceFiles.map((sourceFile) =>
    translateFile(sourceFile, flat, locale, used)
  );

  assertMatchesFlat(
    generated.filter(({ source }) => source !== null),
    flat
  );

  const targets = new Set(generated.map(({ file }) => file));
  const stale = existingFiles
    .filter((file) => !targets.has(file))
    .map((file) => ({ file, source: null }));

  return {
    files: [...generated, ...stale],
    unknownKeys: Object.keys(flat).filter((key) => !used.has(key)),
  };
}
