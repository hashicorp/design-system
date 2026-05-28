/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { loadShowcaseSnippetsCatalog } from './store.js';

const files = [
  '/repo/showcase/app/components/page-components/button/code-fragments/with-loading-state.gts',
  '/repo/showcase/app/components/page-components/button/code-fragments/helpers/format.ts',
  '/repo/showcase/app/components/page-components/copy/button/code-fragments/with-modal.gts',
  '/repo/showcase/app/components/page-components/form/super-select/code-fragments/with-single-base-element.gts',
  '/repo/showcase/app/components/page-components/form/super-select/code-fragments/helpers/options.ts',
  '/repo/showcase/app/components/page-components/form/super-select/code-fragments/with-selected-component.gts',
].sort((a, b) => a.localeCompare(b));

const createStore = () => {
  return loadShowcaseSnippetsCatalog({
    listSnippetFiles: () => files,
    readSnippetSource: (filePath) => `source:${filePath}`,
    now: () => new Date('2026-05-01T00:00:00.000Z'),
  });
};

test('loadShowcaseSnippetsCatalog exposes meta', () => {
  const store = createStore();
  const meta = store.getMeta();

  assert.equal(meta.available, true);
  assert.equal(meta.totalSnippetCount, 6);
  assert.equal(meta.builtAt, '2026-05-01T00:00:00.000Z');
});

test('extractSnippets resolves nested slugs and classifies helper snippets', () => {
  const store = createStore();
  const payload = store.extractSnippets({
    components: ['copy/button', 'form/super-select'],
    limitPerComponent: 10,
    includeSource: true,
  });

  assert.equal(payload.resultCount, 4);

  const copyButton = payload.results[0];
  const superSelect = payload.results[1];

  assert.equal(copyButton?.resolvedSlug, 'copy/button');
  assert.equal(copyButton?.snippetCount, 1);
  assert.equal(copyButton?.snippets[0]?.kind, 'example');

  assert.equal(superSelect?.resolvedSlug, 'form/super-select');
  assert.equal(superSelect?.snippetCount, 3);
  assert.equal(superSelect?.snippets[0]?.kind, 'helper');
});

test('extractSnippets preserves input group order and path sort within group', () => {
  const store = createStore();
  const payload = store.extractSnippets({
    components: ['form/super-select', 'button'],
    limitPerComponent: 10,
    includeSource: false,
  });

  assert.equal(payload.results[0]?.component, 'form/super-select');
  assert.equal(payload.results[1]?.component, 'button');

  const superSelectPaths = payload.results[0]?.snippets.map((snippet) => snippet.path);
  const sortedSuperSelectPaths = [...(superSelectPaths ?? [])].sort((a, b) =>
    a.localeCompare(b)
  );

  assert.deepEqual(superSelectPaths, sortedSuperSelectPaths);
});

test('extractSnippets supports metadata-only mode', () => {
  const store = createStore();
  const payload = store.extractSnippets({
    components: ['button'],
    limitPerComponent: 10,
    includeSource: false,
  });

  const firstSnippet = payload.results[0]?.snippets[0];

  assert.ok(firstSnippet);
  assert.equal('source' in firstSnippet, false);
});

test('extractSnippets supports query filtering and per-component limit', () => {
  const store = createStore();
  const payload = store.extractSnippets({
    components: ['button', 'form/super-select'],
    query: 'selected',
    limitPerComponent: 1,
    includeSource: true,
  });

  assert.equal(payload.query, 'selected');
  assert.equal(payload.resultCount, 1);
  assert.equal(payload.results[0]?.snippetCount, 0);
  assert.equal(payload.results[1]?.snippetCount, 1);
  assert.match(payload.results[1]?.snippets[0]?.name ?? '', /selected/u);
});

test('extractSnippets returns non-fatal unresolved component misses', () => {
  const store = createStore();
  const payload = store.extractSnippets({
    components: ['does-not-exist'],
    limitPerComponent: 3,
    includeSource: true,
  });

  assert.equal(payload.resultCount, 0);
  assert.equal(payload.results[0]?.resolvedSlug, null);
  assert.equal(payload.results[0]?.snippetCount, 0);
  assert.match(payload.results[0]?.message ?? '', /No showcase code fragments found/u);
});
