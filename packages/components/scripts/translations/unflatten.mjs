/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import path from 'node:path';
import { parse } from '@formatjs/icu-messageformat-parser';
import { load } from 'js-yaml';
import { isMap, isScalar, parseDocument, Scalar, stringify } from 'yaml';

import { readValidCatalog } from './catalog.mjs';

// a zero line width keeps long strings on one line, matching the source files
const STRINGIFY_OPTIONS = { lineWidth: 0 };

const isPlain = (node) => node.type === undefined || node.type === Scalar.PLAIN;

// yaml writes yaml 1.2 but ember-intl loads with js-yaml, which reads some plain scalars (e.g. 2024-01-01, 1_000) as non-strings
const loadsAsString = (value) =>
  load(stringify(value, STRINGIFY_OPTIONS)) === value;

function setValue(pair, value) {
  if (isScalar(pair.value)) {
    // keeping the node keeps its quote style; yaml still quotes values that need it
    pair.value.value = value;
  } else {
    // aliases may point at untranslated anchors, so inline the value instead
    pair.value = new Scalar(value);
  }

  if (isPlain(pair.value) && !loadsAsString(value)) {
    pair.value.type = Scalar.QUOTE_DOUBLE;
  }
}

// replaces template values in place and drops untranslated keys and empty mappings
function translateMap(map, segments, flat) {
  map.items = map.items.filter((pair) => {
    const childSegments = [...segments, pair.key.value];

    if (isMap(pair.value)) {
      translateMap(pair.value, childSegments, flat);

      return pair.value.items.length > 0;
    }

    const key = childSegments.join('.');

    if (!Object.hasOwn(flat, key)) {
      return false;
    }

    setValue(pair, flat[key]);

    return true;
  });
}

function translateFile({ file, source }, flat, locale) {
  const directory = path.posix.dirname(file);
  const namespace = directory === '.' ? [] : directory.split('/');
  const document = parseDocument(source);

  translateMap(document.contents, namespace, flat);

  return {
    file: path.posix.join(directory, `${locale}${path.posix.extname(file)}`),
    source:
      document.contents.items.length > 0
        ? document.toString(STRINGIFY_OPTIONS)
        : null,
  };
}

function assertValidMessages(flat) {
  const invalid = Object.entries(flat).flatMap(([key, value]) => {
    try {
      parse(value);

      return [];
    } catch (error) {
      return [`${key} (${error.message})`];
    }
  });

  if (invalid.length > 0) {
    throw new Error(`Invalid ICU messages: ${invalid.join(', ')}`);
  }
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

const withoutBlanks = (flat) =>
  Object.fromEntries(
    Object.entries(flat).filter(([, value]) => value.trim().length > 0)
  );

/**
 * builds `locale` files beside each source file, using the source as the
 * structural template; `flat` values win over `previous` ones, which only
 * fill keys that `flat` omits; `existingFiles` lists current `locale` files
 * so that ones without a source counterpart are deleted (null source)
 */
export function buildLocaleFiles({
  sourceFiles,
  flat,
  locale,
  previous = {},
  existingFiles = [],
}) {
  const sourceKeys = new Set(
    readValidCatalog(sourceFiles).map((record) => record.key)
  );
  const incoming = withoutBlanks(flat);
  const known = Object.keys(incoming).filter((key) => sourceKeys.has(key));

  // an empty or mismatched input would otherwise erase every translation
  if (known.length === 0) {
    throw new Error('No input translations match the source catalog keys');
  }

  const merged = Object.fromEntries(
    Object.entries({ ...withoutBlanks(previous), ...incoming }).filter(
      ([key]) => sourceKeys.has(key)
    )
  );

  assertValidMessages(merged);

  const generated = sourceFiles.map((sourceFile) =>
    translateFile(sourceFile, merged, locale)
  );

  assertMatchesFlat(
    generated.filter(({ source }) => source !== null),
    merged
  );

  const targets = new Set(generated.map(({ file }) => file));
  const stale = existingFiles
    .filter((file) => !targets.has(file))
    .map((file) => ({ file, source: null }));

  return {
    files: [...generated, ...stale],
    unknownKeys: Object.keys(incoming).filter((key) => !sourceKeys.has(key)),
    blankKeys: Object.keys(flat).filter((key) => !Object.hasOwn(incoming, key)),
  };
}
