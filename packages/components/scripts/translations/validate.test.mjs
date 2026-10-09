/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { validateTranslations } from './validate.mjs';

const helperImport = "import hdsT from '../helpers/hds-t.ts';";

const source = (...keys) => ({
  file: 'src/components/example.gts',
  source: `${helperImport}\n<template>${keys
    .map((key) => `{{hdsT "${key}"}}`)
    .join('')}</template>\n`,
});

const catalog = (yaml, file = 'hds/en-us.yaml') => ({ file, source: yaml });

const summarize = (result) =>
  result.diagnostics.map(({ category, message }) => `${category}: ${message}`);

describe('validateTranslations', () => {
  test('passes when every reference has an en-us entry and every entry is used', () => {
    const result = validateTranslations({
      catalogs: [
        catalog('a: A\nb: B\n'),
        catalog('a: A\nb: B\n', 'hds/es-es.yaml'),
      ],
      sources: [source('hds.a', 'hds.b')],
    });

    assert.deepEqual(result.diagnostics, []);
    assert.equal(result.keyCount, 2);
    assert.equal(result.referenceCount, 2);
  });

  test('reports references without an en-us entry', () => {
    const result = validateTranslations({
      catalogs: [catalog('a: A\n')],
      sources: [source('hds.a', 'hds.missing')],
    });

    assert.deepEqual(summarize(result), ['missing-key: hds.missing']);
    assert.equal(result.diagnostics[0]?.file, 'src/components/example.gts');
  });

  test('does not let other locales satisfy a missing en-us entry', () => {
    const result = validateTranslations({
      catalogs: [catalog('a: A\n'), catalog('a: A\nb: B\n', 'hds/es-es.yaml')],
      sources: [source('hds.a', 'hds.b')],
    });

    assert.deepEqual(summarize(result), ['missing-key: hds.b']);
  });

  test('reports unused entries in every locale', () => {
    const result = validateTranslations({
      catalogs: [
        catalog('a: A\nstale: Stale\n'),
        catalog('a: A\nstale: Viejo\n', 'hds/es-es.yaml'),
      ],
      sources: [source('hds.a')],
    });

    assert.deepEqual(summarize(result), [
      'unused-key: hds.stale (en-us)',
      'unused-key: hds.stale (es-es)',
    ]);
  });

  test('skips unused-key checks when any source could not be fully read', () => {
    const result = validateTranslations({
      catalogs: [catalog('a: A\nb: B\n')],
      sources: [
        source('hds.a'),
        {
          file: 'src/components/dynamic.gts',
          source: `${helperImport}\n<template>{{hdsT this.key}}</template>\n`,
        },
      ],
    });

    // hds.b may be the dynamic key, so it cannot be reported as unused
    assert.deepEqual(summarize(result), [
      'uncheckable-call: Translation keys must be non-empty string literals',
    ]);
  });

  test('skips missing and unused checks when the catalog is invalid', () => {
    const result = validateTranslations({
      catalogs: [catalog('a: A\nbad: 1\n')],
      sources: [source('hds.a', 'hds.missing')],
    });

    assert.deepEqual(summarize(result), [
      'invalid-catalog: Translation hds.bad must have a string value',
    ]);
  });

  test('fails when no sources or en-us catalog are provided', () => {
    const empty = validateTranslations({ catalogs: [], sources: [] });
    const noSourceLocale = validateTranslations({
      catalogs: [catalog('a: A\n', 'hds/es-es.yaml')],
      sources: [source('hds.a')],
    });

    for (const result of [empty, noSourceLocale]) {
      assert.ok(
        result.diagnostics.some(
          (diagnostic) => diagnostic.category === 'invalid-input'
        )
      );
    }
  });

  test('sorts diagnostics by file and position', () => {
    const result = validateTranslations({
      catalogs: [catalog('a: A\n')],
      sources: [
        { ...source('hds.z2'), file: 'src/b.gts' },
        { ...source('hds.z1', 'hds.a'), file: 'src/a.gts' },
      ],
    });

    assert.deepEqual(
      result.diagnostics.map(({ file, message }) => `${file} ${message}`),
      ['src/a.gts hds.z1', 'src/b.gts hds.z2']
    );
  });
});
