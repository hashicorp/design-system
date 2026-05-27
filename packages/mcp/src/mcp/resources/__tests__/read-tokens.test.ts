/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildTokensResourcePayload,
  readTokensResource,
  TOKENS_URI,
} from '../read-tokens.js';

import type { TokenCatalogStore } from '../../../tokens/store.js';

const tokens = [
  {
    key: '{color.foreground.action}',
    name: 'token-color-foreground-action',
    type: 'color' as const,
    value: '#1060ff',
    cssVar: '--token-color-foreground-action',
    category: 'color',
    path: ['color', 'foreground', 'action'],
  },
];

const tokenStore: TokenCatalogStore = {
  getMeta: () => ({ totalTokenCount: tokens.length }),
  listTokens: () => tokens,
  getTokenByKey: () => null,
  searchTokens: () => tokens,
};

test('buildTokensResourcePayload returns token index payload', () => {
  const payload = buildTokensResourcePayload(tokenStore);

  assert.equal(payload.totalTokenCount, 1);
  assert.equal(payload.tokens.length, 1);
  assert.equal(payload.tokens[0]?.name, 'token-color-foreground-action');
});

test('readTokensResource wraps payload in resource contents', () => {
  const response = readTokensResource(tokenStore);
  const [content] = response.contents;

  assert.ok(content);
  assert.equal(content?.uri, TOKENS_URI);
  assert.equal(content?.mimeType, 'application/json');

  const payload = JSON.parse(content?.text ?? '{}') as {
    totalTokenCount: number;
    tokens: Array<{ key: string }>;
  };

  assert.equal(payload.totalTokenCount, 1);
  assert.equal(payload.tokens[0]?.key, '{color.foreground.action}');
});
