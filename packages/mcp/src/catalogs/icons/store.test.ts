/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { loadIconCatalog } from './store.js';

test('loadIconCatalog exposes meta and icon list', () => {
  const store = loadIconCatalog();
  const meta = store.getMeta();
  const icons = store.listIcons();

  assert.ok(meta.totalIconCount > 0);
  assert.ok(meta.totalAssetCount > 0);
  assert.equal(icons.length, meta.totalIconCount);
  assert.ok(meta.categories.length > 0);
});

test('getIconByName resolves iconName and fileName alias', () => {
  const store = loadIconCatalog();

  const byName = store.getIconByName('loading');
  const byFileName = store.getIconByName('loading-16');

  assert.ok(byName);
  assert.ok(byFileName);
  assert.equal(byName?.iconName, 'loading');
  assert.equal(byFileName?.iconName, 'loading');
});

test('searchIcons filters by query, category, size, hasMapping, and limit', () => {
  const store = loadIconCatalog();

  const queryOnly = store.searchIcons({
    query: 'apple',
    limit: 10,
  });
  const filtered = store.searchIcons({
    query: 'apple',
    limit: 10,
    category: 'Services',
    size: '16',
  });
  const mappingFiltered = store.searchIcons({
    query: 'accessibility',
    limit: 10,
    hasMapping: true,
  });
  const limited = store.searchIcons({
    query: 'color',
    limit: 1,
  });

  assert.ok(queryOnly.length > 0);
  assert.ok(filtered.length > 0);
  assert.ok(mappingFiltered.length > 0);
  assert.equal(limited.length, 1);
});
