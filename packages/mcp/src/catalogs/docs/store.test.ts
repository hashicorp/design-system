/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { loadDocsCatalog, rankSearchResults } from './store.js';

test('loadDocsCatalog exposes available meta and source counts', () => {
  const store = loadDocsCatalog();
  const meta = store.getMeta();

  assert.equal(meta.available, true);
  assert.ok(meta.totalRecordCount > 0);
  assert.ok(meta.sources.docs > 0);
  assert.notEqual(meta.builtAt, null);
});

test('search returns docs results for a basic query', () => {
  const store = loadDocsCatalog();

  const output = store.search({
    query: 'button',
    scope: 'all',
    limit: 10,
  });

  assert.ok(output.resultCount > 0);
  assert.equal(output.results.length, output.resultCount);

  for (const result of output.results) {
    assert.notEqual(result.title, null);
    assert.notEqual(result.url, null);

    if (result.snippet !== null) {
      assert.ok(result.snippet.length <= 200);
    }
  }
});

test('search scope filtering works for components, content, and componentApi', () => {
  const store = loadDocsCatalog();

  const components = store.search({
    query: 'button',
    scope: 'components',
    limit: 10,
  });
  const content = store.search({
    query: 'writing style',
    scope: 'content',
    limit: 10,
  });
  const componentApi = store.search({
    query: 'isFullWidth',
    scope: 'componentApi',
    limit: 10,
  });

  assert.ok(components.resultCount > 0);
  assert.ok(content.resultCount > 0);
  assert.ok(componentApi.resultCount > 0);

  assert.ok(
    components.results.every((result) => {
      return result.section === 'components';
    })
  );
  assert.ok(content.results.every((result) => result.kind === 'heading'));
  assert.ok(
    componentApi.results.every((result) => result.kind === 'component-api-property')
  );
});

test('rankSearchResults applies deterministic bucket ordering', () => {
  const ranked = rankSearchResults('button', [
    {
      id: 'z-other-high-score',
      score: 999,
      title: 'cta',
      section: 'misc',
      kind: 'page',
      snippet: 'not related',
    },
    {
      id: 'b-exact-low-score',
      score: 1,
      title: 'button',
      section: 'components',
      kind: 'page',
      snippet: 'exact title match',
    },
    {
      id: 'd-prefix-higher-score',
      score: 20,
      title: 'button anatomy',
      section: 'components',
      kind: 'heading',
      snippet: 'prefix match',
    },
    {
      id: 'c-prefix-lower-score',
      score: 10,
      title: 'button usage',
      section: 'components',
      kind: 'heading',
      snippet: 'prefix match',
    },
    {
      id: 'f-prefix-tie-a',
      score: 8,
      title: 'button states',
      section: 'components',
      kind: 'heading',
      snippet: 'prefix tie',
    },
    {
      id: 'g-prefix-tie-b',
      score: 8,
      title: 'button variants',
      section: 'components',
      kind: 'heading',
      snippet: 'prefix tie',
    },
    {
      id: 'e-substring-mid-score',
      score: 100,
      title: 'secondary button behavior',
      section: 'components',
      kind: 'paragraph',
      snippet: 'substring match',
    },
  ]);

  assert.deepEqual(
    ranked.map((entry) => entry.id),
    [
      'b-exact-low-score',
      'd-prefix-higher-score',
      'c-prefix-lower-score',
      'f-prefix-tie-a',
      'g-prefix-tie-b',
      'e-substring-mid-score',
      'z-other-high-score',
    ]
  );
});

test('loadDocsCatalog returns unavailable when docs records are absent', () => {
  const store = loadDocsCatalog({
    loadWebsiteDocsRecords: () => [],
  });

  const meta = store.getMeta();

  assert.equal(meta.available, false);
  assert.ok(meta.sources.docs === 0);
  assert.notEqual(meta.message, undefined);

  const output = store.search({
    query: 'loading',
    scope: 'all',
    limit: 10,
  });

  assert.equal(output.resultCount, 0);
  assert.deepEqual(output.results, []);
});
