/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { isLocaleFile, writeFiles } from './files.mjs';
import { parseFlat, serializeFlat } from './serialize.mjs';
import { toEmberLocale } from './straker.config.mjs';

const scripts = fileURLToPath(new URL('..', import.meta.url));

const run = (script, args) =>
  spawnSync(process.execPath, [path.join(scripts, script), ...args], {
    encoding: 'utf8',
  });

describe('straker config', () => {
  test('maps pipeline languages to ember-intl locales', () => {
    assert.equal(toEmberLocale('fr'), 'fr-fr');
  });

  test('rejects unsupported languages', () => {
    assert.throws(() => toEmberLocale('de'), /Unsupported language "de"/);
    assert.throws(() => toEmberLocale('toString'), /Unsupported language/);
  });
});

describe('locale files', () => {
  test('match locale filenames the same way as ember-intl', () => {
    const isEnglish = isLocaleFile('en-us');

    assert.deepEqual(
      [
        'hds/en-us.yaml',
        'hds/en_US.yml',
        'hds/EN-us.yaml',
        'hds/fr-fr.yaml',
        'hds/en-us.json',
      ].map(isEnglish),
      [true, true, true, false, false]
    );
  });
});

describe('flat serialization', () => {
  test('round-trips a flat map', () => {
    const flat = { 'hds.a': '{count} : élément', 'hds.b': 'B' };

    assert.deepEqual(parseFlat(serializeFlat(flat)), flat);
  });

  test('rejects non-object and non-string payloads', () => {
    assert.throws(() => parseFlat('[]'), /flat JSON object/);
    assert.throws(() => parseFlat('null'), /flat JSON object/);
    assert.throws(
      () => parseFlat('{"hds.a": 1, "hds.b": {"c": "d"}}'),
      /must be strings: hds\.a, hds\.b/
    );
  });
});

describe('translation CLIs', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'hds-translations-'));
  const translations = path.join(directory, 'translations');

  after(() => rmSync(directory, { recursive: true, force: true }));

  test('export then import writes locale siblings', () => {
    writeFiles(translations, [
      {
        file: 'hds/components/tag/en-us.yaml',
        source: 'dismiss-button:\n  aria-label: Dismiss {text}\n',
      },
      { file: 'hds/components/alert/en-us.yaml', source: 'close: Close\n' },
      { file: 'hds/components/gone/fr-fr.yaml', source: 'old: Ancien\n' },
    ]);

    const exported = path.join(directory, 'out', 'en.json');
    const exportResult = run('export-translations.mjs', [
      '--out',
      exported,
      '--translations',
      translations,
    ]);

    assert.equal(exportResult.status, 0, exportResult.stderr);
    assert.deepEqual(JSON.parse(readFileSync(exported, 'utf8')), {
      'hds.components.alert.close': 'Close',
      'hds.components.tag.dismiss-button.aria-label': 'Dismiss {text}',
    });

    const imported = path.join(directory, 'fr.json');

    writeFiles(directory, [
      {
        file: 'fr.json',
        source: serializeFlat({
          'hds.components.tag.dismiss-button.aria-label': 'Fermer {text}',
          'hds.components.removed': 'Supprimé',
        }),
      },
    ]);

    const importResult = run('import-translations.mjs', [
      '--in',
      imported,
      '--lang',
      'fr',
      '--translations',
      translations,
    ]);

    assert.equal(importResult.status, 0, importResult.stderr);
    assert.match(importResult.stderr, /Skipped hds\.components\.removed/);
    assert.equal(
      readFileSync(
        path.join(translations, 'hds/components/tag/fr-fr.yaml'),
        'utf8'
      ),
      'dismiss-button:\n  aria-label: Fermer {text}\n'
    );
    assert.equal(
      existsSync(path.join(translations, 'hds/components/alert/fr-fr.yaml')),
      false
    );
    assert.equal(
      existsSync(path.join(translations, 'hds/components/gone/fr-fr.yaml')),
      false
    );
  });

  test('import keeps existing translations that the input omits', () => {
    writeFiles(directory, [
      {
        file: 'fr.json',
        source: serializeFlat({ 'hds.components.alert.close': 'Fermer' }),
      },
    ]);

    const result = run('import-translations.mjs', [
      '--in',
      path.join(directory, 'fr.json'),
      '--lang',
      'fr',
      '--translations',
      translations,
    ]);

    assert.equal(result.status, 0, result.stderr);
    assert.equal(
      readFileSync(
        path.join(translations, 'hds/components/tag/fr-fr.yaml'),
        'utf8'
      ),
      'dismiss-button:\n  aria-label: Fermer {text}\n'
    );
    assert.equal(
      readFileSync(
        path.join(translations, 'hds/components/alert/fr-fr.yaml'),
        'utf8'
      ),
      'close: Fermer\n'
    );
  });

  test('import fails without touching files when the input is empty', () => {
    writeFiles(directory, [{ file: 'empty.json', source: '{}\n' }]);

    const result = run('import-translations.mjs', [
      '--in',
      path.join(directory, 'empty.json'),
      '--lang',
      'fr',
      '--translations',
      translations,
    ]);

    assert.equal(result.status, 1);
    assert.match(result.stderr, /No input translations match/);
    assert.equal(
      existsSync(path.join(translations, 'hds/components/tag/fr-fr.yaml')),
      true
    );
  });

  test('export with --lang flattens committed locale files for write-back', () => {
    writeFiles(translations, [
      {
        file: 'hds/components/tag/fr-fr.yaml',
        source: 'dismiss-button:\n  aria-label: Retirer {text}\n',
      },
    ]);

    const out = path.join(directory, 'out', 'fr.json');
    const result = run('export-translations.mjs', [
      '--out',
      out,
      '--lang',
      'fr',
      '--translations',
      translations,
    ]);

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Exported 2 fr-fr translations/);
    assert.deepEqual(JSON.parse(readFileSync(out, 'utf8')), {
      'hds.components.alert.close': 'Fermer',
      'hds.components.tag.dismiss-button.aria-label': 'Retirer {text}',
    });
  });

  test('a written-back correction survives the next sync', () => {
    // gp returns the definitions uploaded on merge
    const result = run('import-translations.mjs', [
      '--in',
      path.join(directory, 'out', 'fr.json'),
      '--lang',
      'fr',
      '--translations',
      translations,
    ]);

    assert.equal(result.status, 0, result.stderr);
    assert.equal(
      readFileSync(
        path.join(translations, 'hds/components/tag/fr-fr.yaml'),
        'utf8'
      ),
      'dismiss-button:\n  aria-label: Retirer {text}\n'
    );
  });

  test('a key removed by a reviewer is proposed again on the next sync', () => {
    writeFiles(translations, [
      { file: 'hds/components/alert/fr-fr.yaml', source: null },
    ]);
    writeFiles(directory, [
      {
        file: 'mt.json',
        source: serializeFlat({
          'hds.components.alert.close': 'Fermer',
          'hds.components.tag.dismiss-button.aria-label': 'Retirer {text}',
        }),
      },
    ]);

    const result = run('import-translations.mjs', [
      '--in',
      path.join(directory, 'mt.json'),
      '--lang',
      'fr',
      '--translations',
      translations,
    ]);

    assert.equal(result.status, 0, result.stderr);
    assert.equal(
      readFileSync(
        path.join(translations, 'hds/components/alert/fr-fr.yaml'),
        'utf8'
      ),
      'close: Fermer\n'
    );
  });

  test('report writes a body and a changeset only when translations changed', () => {
    const before = path.join(directory, 'report-before.json');
    const body = path.join(directory, 'report', 'body.md');
    const changesets = path.join(directory, 'changesets');
    const args = [
      '--before',
      before,
      '--lang',
      'fr',
      '--body-out',
      body,
      '--changeset-dir',
      changesets,
      '--translations',
      translations,
    ];

    writeFiles(directory, [
      {
        file: 'report-before.json',
        source: serializeFlat({
          'hds.components.alert.close': 'Fermer',
          'hds.components.tag.dismiss-button.aria-label': 'Retirer {text}',
        }),
      },
    ]);

    const unchanged = run('report-translations.mjs', args);

    assert.equal(unchanged.status, 0, unchanged.stderr);
    assert.match(unchanged.stdout, /No fr-fr changes/);
    assert.equal(
      existsSync(path.join(changesets, 'hds-translations-sync.md')),
      false
    );
    assert.match(
      readFileSync(body, 'utf8'),
      /2 of 2 English strings translated/
    );

    writeFiles(directory, [
      {
        file: 'report-before.json',
        source: serializeFlat({ 'hds.components.alert.close': 'Clore' }),
      },
    ]);

    const changed = run('report-translations.mjs', args);

    assert.equal(changed.status, 0, changed.stderr);
    assert.match(changed.stdout, /fr-fr translations changed/);
    assert.match(
      readFileSync(path.join(changesets, 'hds-translations-sync.md'), 'utf8'),
      /"@hashicorp\/design-system-components": patch/
    );
    assert.match(readFileSync(body, 'utf8'), /### :new: Added \(1\)/);
  });

  test('fail with a message when required arguments are missing', () => {
    const exportResult = run('export-translations.mjs', []);
    const importResult = run('import-translations.mjs', ['--lang', 'fr']);

    assert.equal(exportResult.status, 1);
    assert.match(exportResult.stderr, /Missing required --out/);
    assert.equal(importResult.status, 1);
    assert.match(importResult.stderr, /Missing required --in/);
  });

  test('export rejects unsupported languages', () => {
    const result = run('export-translations.mjs', [
      '--out',
      path.join(directory, 'out', 'de.json'),
      '--lang',
      'de',
      '--translations',
      translations,
    ]);

    assert.equal(result.status, 1);
    assert.match(result.stderr, /Unsupported language "de"/);
  });
});
