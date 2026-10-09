/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { readCatalog } from './catalog.mjs';

const messages = (result) =>
  result.diagnostics.map((diagnostic) => diagnostic.message);

describe('readCatalog', () => {
  test('derives keys from directory namespaces and nested mappings', () => {
    const result = readCatalog([
      {
        file: 'hds/components/tag/en-us.yaml',
        source: 'dismiss: Dismiss\nlabels:\n  close: Close\n',
      },
    ]);

    assert.deepEqual(result.diagnostics, []);
    assert.deepEqual(
      result.records.map(({ key, locale, file, line }) => ({
        key,
        locale,
        file,
        line,
      })),
      [
        {
          key: 'hds.components.tag.dismiss',
          locale: 'en-us',
          file: 'translations/hds/components/tag/en-us.yaml',
          line: 1,
        },
        {
          key: 'hds.components.tag.labels.close',
          locale: 'en-us',
          file: 'translations/hds/components/tag/en-us.yaml',
          line: 3,
        },
      ]
    );
  });

  test('normalizes locale filenames the same way as ember-intl', () => {
    const result = readCatalog([{ file: 'hds/en_US.yml', source: 'a: A\n' }]);

    assert.equal(result.records[0]?.locale, 'en-us');
  });

  test('accepts aliases that resolve to strings', () => {
    const result = readCatalog([
      {
        file: 'hds/en-us.yaml',
        source: 'shared: &shared Hello\ncopy: *shared\n',
      },
    ]);

    assert.deepEqual(result.diagnostics, []);
    assert.deepEqual(
      result.records.map((record) => record.key),
      ['hds.shared', 'hds.copy']
    );
  });

  test('rejects values that do not load as strings', () => {
    const result = readCatalog([
      { file: 'hds/en-us.yaml', source: 'count: 1\nempty:\nflag: true\n' },
    ]);

    assert.deepEqual(messages(result), [
      'Translation hds.count must have a string value',
      'Translation hds.empty must have a string value',
      'Translation hds.flag must have a string value',
    ]);

    assert.deepEqual(result.records, []);
  });

  test('rejects aliases that resolve to non-strings', () => {
    const result = readCatalog([
      { file: 'hds/en-us.yaml', source: 'base: &base 1\ncopy: *base\n' },
    ]);

    assert.equal(result.diagnostics.length, 2);
    assert.ok(
      result.diagnostics.every(
        (diagnostic) => diagnostic.category === 'invalid-catalog'
      )
    );
  });

  test('rejects non-string and empty keys', () => {
    const result = readCatalog([
      { file: 'hds/en-us.yaml', source: '1: One\n"": Empty\n' },
    ]);

    assert.deepEqual(messages(result), [
      'Translation keys must be non-empty strings',
      'Translation keys must be non-empty strings',
    ]);
  });

  test('reports duplicate keys across files for the same locale', () => {
    const result = readCatalog([
      { file: 'hds/en-us.yaml', source: 'tag:\n  dismiss: Dismiss\n' },
      { file: 'hds/tag/en-us.yaml', source: 'dismiss: Remove\n' },
    ]);

    assert.deepEqual(messages(result), [
      'Duplicate translation key: hds.tag.dismiss (en-us)',
    ]);
  });

  test('allows the same key in different locales', () => {
    const result = readCatalog([
      { file: 'hds/en-us.yaml', source: 'dismiss: Dismiss\n' },
      { file: 'hds/es-es.yaml', source: 'dismiss: Descartar\n' },
    ]);

    assert.deepEqual(result.diagnostics, []);
    assert.equal(result.records.length, 2);
  });

  test('reports a path that is both a string and a namespace', () => {
    const result = readCatalog([
      { file: 'hds/en-us.yaml', source: 'tag: Tag\n' },
      { file: 'hds/tag/en-us.yaml', source: 'dismiss: Dismiss\n' },
    ]);

    assert.equal(result.diagnostics.length, 1);
    assert.match(
      result.diagnostics[0]?.message ?? '',
      /^Translation path hds\.tag is both a string and a namespace \(en-us\)/
    );
  });

  test('reports a dotted key that collides with a nested key', () => {
    const result = readCatalog([
      {
        file: 'hds/en-us.yaml',
        source: 'tag.dismiss: A\ntag:\n  dismiss: B\n',
      },
    ]);

    assert.deepEqual(messages(result), [
      'Duplicate translation key: hds.tag.dismiss (en-us)',
    ]);
  });

  test('reports malformed yaml with its location', () => {
    const result = readCatalog([
      { file: 'hds/en-us.yaml', source: 'ok: Fine\nbroken: [unclosed\n' },
    ]);

    assert.ok(result.diagnostics.length > 0);
    assert.equal(result.diagnostics[0]?.category, 'invalid-catalog');
    assert.equal(result.diagnostics[0]?.file, 'translations/hds/en-us.yaml');
    assert.deepEqual(result.records, []);
  });

  test('reports duplicate keys within a single mapping', () => {
    const result = readCatalog([
      { file: 'hds/en-us.yaml', source: 'a: One\na: Two\n' },
    ]);

    assert.ok(result.diagnostics.length > 0);
    assert.deepEqual(result.records, []);
  });

  test('rejects a document that is not a mapping', () => {
    const result = readCatalog([
      { file: 'hds/en-us.yaml', source: '- one\n- two\n' },
    ]);

    assert.deepEqual(messages(result), [
      'Expected a mapping of translation keys',
    ]);
  });

  test('rejects invalid namespace directory names', () => {
    const result = readCatalog([{ file: 'Hds/en-us.yaml', source: 'a: A\n' }]);

    assert.deepEqual(messages(result), [
      'Translation directories must use lowercase letters, digits, hyphens, or underscores',
    ]);

    assert.deepEqual(result.records, []);
  });
});
