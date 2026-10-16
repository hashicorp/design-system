/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import {
  buildChangeset,
  buildPullRequestBody,
  diffTranslations,
  hasChanges,
  JIRA_URL,
  measureCoverage,
  REVIEW_GUIDE_URL,
} from './report.mjs';

const source = {
  'hds.a': 'Close',
  'hds.b': 'Dismiss {text}',
  'hds.c': 'Search',
};

describe('diffTranslations', () => {
  test('classifies added, changed, and removed keys in sorted order', () => {
    const diff = diffTranslations({
      before: { 'hds.b': 'Fermer', 'hds.gone': 'Ancien', 'hds.same': 'Pareil' },
      after: {
        'hds.c': 'Chercher',
        'hds.b': 'Retirer',
        'hds.a': 'Fermer',
        'hds.same': 'Pareil',
      },
    });

    assert.deepEqual(diff, {
      added: ['hds.a', 'hds.c'],
      changed: ['hds.b'],
      removed: ['hds.gone'],
    });
    assert.equal(hasChanges(diff), true);
  });

  test('reports no changes for identical maps', () => {
    const flat = { 'hds.a': 'Fermer' };

    assert.equal(
      hasChanges(diffTranslations({ before: flat, after: { ...flat } })),
      false
    );
  });
});

describe('measureCoverage', () => {
  test('counts translated source keys and lists missing ones', () => {
    assert.deepEqual(
      measureCoverage({
        source,
        after: { 'hds.a': 'Fermer', 'hds.extra': 'X' },
      }),
      { total: 3, translated: 1, missing: ['hds.b', 'hds.c'], percent: 33 }
    );
  });

  test('treats an empty source as fully covered', () => {
    assert.equal(measureCoverage({ source: {}, after: {} }).percent, 100);
  });
});

describe('buildPullRequestBody', () => {
  const body = buildPullRequestBody({
    locale: 'fr-fr',
    source,
    before: { 'hds.b': 'Fermer {text}', 'hds.gone': 'Ancien' },
    after: { 'hds.a': 'Fermer', 'hds.b': 'Retirer {text}' },
  });

  test('lists added keys with the english source next to the translation', () => {
    assert.match(
      body,
      /### :new: Added \(1\)\n\n\| Key \| English \| fr-fr \|\n\| --- \| --- \| --- \|\n\| `hds\.a` \| Close \| Fermer \|/
    );
  });

  test('lists changed keys with the previous translation', () => {
    assert.match(
      body,
      /\| `hds\.b` \| Dismiss \{text\} \| Fermer \{text\} \| Retirer \{text\} \|/
    );
  });

  test('lists removed keys', () => {
    assert.match(
      body,
      /### :wastebasket: Removed \(1\)\n\n\| Key \| Previous \|\n\| --- \| --- \|\n\| `hds\.gone` \| Ancien \|/
    );
  });

  test('includes coverage, untranslated keys, the review guide, and a jira link', () => {
    assert.match(body, /2 of 3 English strings translated \(66%\)/);
    assert.match(
      body,
      /<summary>Untranslated keys \(1\)<\/summary>\n\n- `hds\.c`/
    );
    assert.ok(body.includes(REVIEW_GUIDE_URL));
    assert.ok(body.includes(`Jira ticket: [FE-719](${JIRA_URL})`));
  });

  test('escapes table cells so translated text cannot break the markup', () => {
    const escaped = buildPullRequestBody({
      locale: 'fr-fr',
      source: { 'hds.a': 'A | B' },
      before: {},
      after: { 'hds.a': '<img src=x> & a\nb' },
    });

    assert.ok(
      escaped.includes('| `hds.a` | A \\| B | &lt;img src=x&gt; &amp; a<br>b |')
    );
  });

  test('marks empty sections and omits the untranslated list at full coverage', () => {
    const complete = buildPullRequestBody({
      locale: 'fr-fr',
      source: { 'hds.a': 'Close' },
      before: { 'hds.a': 'Fermer' },
      after: { 'hds.a': 'Fermer' },
    });

    assert.match(complete, /### :new: Added \(0\)\n\n_None_/);
    assert.equal(complete.includes('Untranslated keys'), false);
  });
});

describe('buildChangeset', () => {
  test('creates a patch changeset for the components package', () => {
    assert.equal(
      buildChangeset('fr-fr'),
      '---\n"@hashicorp/design-system-components": patch\n---\n\nUpdated `fr-fr` translations\n'
    );
  });
});
