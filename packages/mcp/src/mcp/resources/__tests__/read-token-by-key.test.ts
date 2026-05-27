/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildTokenByKeyResourcePayload,
  getTokenByKeyUri,
  readTokenByKeyResource,
  TOKEN_BY_KEY_URI_TEMPLATE,
} from '../read-token-by-key.js';

import type { TokenCatalogStore } from '../../../catalogs/tokens/store.js';

const token = {
  key: '{color.foreground.action}',
  name: 'token-color-foreground-action',
  type: 'color' as const,
  value: '#1060ff',
  cssVar: '--token-color-foreground-action',
  category: 'color',
  path: ['color', 'foreground', 'action'],
  original: {
    $type: 'color',
    $value: '{color.palette.blue-200}',
    key: '{color.foreground.action}',
  },
};

const tokenStore: TokenCatalogStore = {
  getMeta: () => ({ totalTokenCount: 1 }),
  listTokens: () => [token],
  getTokenByKey: (tokenKey: string) => {
    if (
      tokenKey === '{color.foreground.action}' ||
      tokenKey === 'color.foreground.action'
    ) {
      return token;
    }

    return null;
  },
  searchTokens: () => [token],
};

test('buildTokenByKeyResourcePayload returns found payload', () => {
  const payload = buildTokenByKeyResourcePayload(
    tokenStore,
    '{color.foreground.action}'
  );

  assert.equal(payload.found, true);
  assert.equal(
    (payload.token as { name: string }).name,
    'token-color-foreground-action'
  );
});

test('buildTokenByKeyResourcePayload returns not-found payload', () => {
  const payload = buildTokenByKeyResourcePayload(tokenStore, 'missing.token');

  assert.equal(payload.found, false);
  assert.equal(payload.requestedTokenKey, 'missing.token');
  assert.equal(typeof payload.message, 'string');
});

test('readTokenByKeyResource wraps payload in resource contents', () => {
  const response = readTokenByKeyResource(
    tokenStore,
    '{color.foreground.action}'
  );
  const [content] = response.contents;

  assert.ok(content);
  assert.equal(content?.uri, getTokenByKeyUri('{color.foreground.action}'));
  assert.equal(content?.mimeType, 'application/json');
});

test('token by key resource template is stable', () => {
  assert.equal(TOKEN_BY_KEY_URI_TEMPLATE, 'hds://tokens/{tokenKey}');
});
