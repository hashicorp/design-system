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

import { writeFiles } from './files.mjs';
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

  test('fail with a message when required arguments are missing', () => {
    const exportResult = run('export-translations.mjs', []);
    const importResult = run('import-translations.mjs', ['--lang', 'fr']);

    assert.equal(exportResult.status, 1);
    assert.match(exportResult.stderr, /Missing required --out/);
    assert.equal(importResult.status, 1);
    assert.match(importResult.stderr, /Missing required --in/);
  });
});
