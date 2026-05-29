/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { loadTokenCatalog } from '../store.js';

test('loadTokenCatalog exposes meta and token list', () => {
  const store = loadTokenCatalog();
  const meta = store.getMeta();
  const tokens = store.listTokens();

  assert.ok(meta.totalTokenCount > 0);
  assert.equal(tokens.length, meta.totalTokenCount);
  assert.equal(tokens[0]?.cssVar.startsWith('--token-'), true);
});

test('getTokenByKey resolves token key, dot path, and token name', () => {
  const store = loadTokenCatalog();

  const byKey = store.getTokenByKey('{color.foreground.action}');
  const byPath = store.getTokenByKey('color.foreground.action');
  const byName = store.getTokenByKey('token-color-foreground-action');

  assert.ok(byKey);
  assert.ok(byPath);
  assert.ok(byName);
  assert.equal(byKey?.key, '{color.foreground.action}');
  assert.equal(byPath?.key, '{color.foreground.action}');
  assert.equal(byName?.key, '{color.foreground.action}');
});

test('searchTokens filters by query, type, category, and limit', () => {
  const store = loadTokenCatalog();

  const queryOnly = store.searchTokens({
    query: 'foreground action',
    limit: 10,
  });
  const filtered = store.searchTokens({
    query: 'foreground',
    limit: 10,
    type: 'color',
    category: 'color',
  });
  const limited = store.searchTokens({
    query: 'color',
    limit: 1,
  });

  assert.ok(queryOnly.length > 0);
  assert.ok(filtered.length > 0);
  assert.equal(limited.length, 1);
});
