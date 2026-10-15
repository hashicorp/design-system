/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';

import { collect, localeFilePattern } from './files.mjs';
import { flattenLocale } from './flatten.mjs';
import { buildLocaleFiles } from './unflatten.mjs';

const build = (sourceFiles, flat, existingFiles) =>
  buildLocaleFiles({ sourceFiles, flat, locale: 'fr-fr', existingFiles });

describe('buildLocaleFiles', () => {
  test('writes siblings that preserve the source key order', () => {
    const { files } = build(
      [
        {
          file: 'hds/components/tag/en-us.yaml',
          source: 'zeta: Z\nalpha:\n  inner: Inner\n  first: First\n',
        },
      ],
      {
        'hds.components.tag.alpha.first': 'Premier',
        'hds.components.tag.alpha.inner': 'Intérieur',
        'hds.components.tag.zeta': 'Zêta',
      }
    );

    assert.deepEqual(files, [
      {
        file: 'hds/components/tag/fr-fr.yaml',
        source: 'zeta: Zêta\nalpha:\n  inner: Intérieur\n  first: Premier\n',
      },
    ]);
  });

  test('omits untranslated keys and prunes empty mappings', () => {
    const { files } = build(
      [
        {
          file: 'hds/en-us.yaml',
          source:
            'kept: Kept\nempty:\n  nested:\n    gone: Gone\nother: Other\n',
        },
      ],
      { 'hds.kept': 'Gardé' }
    );

    assert.deepEqual(files, [
      { file: 'hds/fr-fr.yaml', source: 'kept: Gardé\n' },
    ]);
  });

  test('returns a null source for files with no translations', () => {
    const { files } = build(
      [
        { file: 'hds/a/en-us.yaml', source: 'a: A\n' },
        { file: 'hds/b/en-us.yaml', source: 'b: B\n' },
      ],
      { 'hds.a.a': 'A fr' }
    );

    assert.deepEqual(files, [
      { file: 'hds/a/fr-fr.yaml', source: 'a: A fr\n' },
      { file: 'hds/b/fr-fr.yaml', source: null },
    ]);
  });

  test('drops keys and files that were removed from the source', () => {
    const { files, unknownKeys } = build(
      [{ file: 'hds/a/en-us.yaml', source: 'kept: Kept\n' }],
      { 'hds.a.kept': 'Gardé', 'hds.a.removed': 'Supprimé' },
      ['hds/a/fr-fr.yaml', 'hds/deleted/fr-fr.yaml']
    );

    assert.deepEqual(files, [
      { file: 'hds/a/fr-fr.yaml', source: 'kept: Gardé\n' },
      { file: 'hds/deleted/fr-fr.yaml', source: null },
    ]);
    assert.deepEqual(unknownKeys, ['hds.a.removed']);
  });

  test('keeps the source quote style where the value allows it', () => {
    const { files } = build(
      [
        {
          file: 'hds/en-us.yaml',
          source:
            'quoted: "between {start} and {end}"\nplain: Dismiss {text}\n',
        },
      ],
      {
        'hds.quoted': 'entre {start} et {end}',
        'hds.plain': 'Fermer {text}',
      }
    );

    assert.equal(
      files[0]?.source,
      'quoted: "entre {start} et {end}"\nplain: Fermer {text}\n'
    );
  });

  test('quotes translated values that would otherwise be invalid yaml', () => {
    const flat = {
      'hds.colon': 'Ligne {line} : {message}',
      'hds.brace': '{count, plural, one {# caractère} other {# caractères}}',
      'hds.hash': 'Étape # {n}',
      'hds.quote': "L'élément « {name} »",
      'hds.leading': '- {value}',
      'hds.bool': 'yes',
    };

    const { files } = build(
      [
        {
          file: 'hds/en-us.yaml',
          source:
            'colon: plain\nbrace: plain\nhash: plain\nquote: plain\nleading: plain\nbool: plain\n',
        },
      ],
      flat
    );

    const source = files[0]?.source ?? '';

    assert.deepEqual(load(source), {
      colon: flat['hds.colon'],
      brace: flat['hds.brace'],
      hash: flat['hds.hash'],
      quote: flat['hds.quote'],
      leading: flat['hds.leading'],
      bool: flat['hds.bool'],
    });
  });

  test('escapes values inside single-quoted source scalars', () => {
    const { files } = build(
      [{ file: 'hds/en-us.yaml', source: "a: 'Close'\n" }],
      { 'hds.a': "Fermer l'alerte" }
    );

    assert.equal(files[0]?.source, "a: 'Fermer l''alerte'\n");
  });

  test('inlines aliased values', () => {
    const { files } = build(
      [{ file: 'hds/en-us.yaml', source: 'shared: &s Hello\ncopy: *s\n' }],
      { 'hds.copy': 'Bonjour' }
    );

    assert.equal(files[0]?.source, 'copy: Bonjour\n');
  });

  test('handles a translations root file with no namespace', () => {
    const { files } = build([{ file: 'en-us.yaml', source: 'a: A\n' }], {
      a: 'A fr',
    });

    assert.deepEqual(files, [{ file: 'fr-fr.yaml', source: 'a: A fr\n' }]);
  });

  test('throws when the source catalog is invalid', () => {
    assert.throws(
      () => build([{ file: 'hds/en-us.yaml', source: 'a: 1\n' }], {}),
      /Invalid translation catalog/
    );
  });

  test('round-trips the library catalog exactly with an identity map', () => {
    const translations = fileURLToPath(
      new URL('../../translations', import.meta.url)
    );
    const sourceFiles = collect(translations, localeFilePattern('en-us'));
    const flat = flattenLocale(sourceFiles, 'en-us');

    const { files, unknownKeys } = buildLocaleFiles({
      sourceFiles,
      flat,
      locale: 'en-us',
    });

    assert.ok(sourceFiles.length > 0);
    assert.deepEqual(unknownKeys, []);
    assert.deepEqual(files, sourceFiles);
  });
});
