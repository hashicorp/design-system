/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildSearchTokensPayload,
  registerSearchTokensTool,
} from '../search-tokens.js';

import type { TokenCatalogStore } from '../../../tokens/store.js';

type RegisteredTool = {
  name: string;
  handler: (input: {
    query: string;
    limit: number;
    type?:
      | 'color'
      | 'dimension'
      | 'fontFamily'
      | 'fontWeight'
      | 'lineHeight'
      | 'letterSpacing'
      | 'duration'
      | 'cubicBezier'
      | 'number'
      | 'shadow'
      | 'other';
    category?: string;
  }) => Promise<{ content: Array<{ text: string }> }>;
};

class FakeServer {
  registeredTools: RegisteredTool[] = [];

  registerTool(
    name: string,
    _config: unknown,
    handler: RegisteredTool['handler']
  ): void {
    this.registeredTools.push({
      name,
      handler,
    });
  }
}

const allTokens = [
  {
    key: '{color.foreground.action}',
    name: 'token-color-foreground-action',
    type: 'color' as const,
    value: '#1060ff',
    cssVar: '--token-color-foreground-action',
    category: 'color',
    path: ['color', 'foreground', 'action'],
  },
  {
    key: '{border.radius.small}',
    name: 'token-border-radius-small',
    type: 'dimension' as const,
    value: '5px',
    cssVar: '--token-border-radius-small',
    category: 'border',
    path: ['border', 'radius', 'small'],
  },
];

const tokenStore: TokenCatalogStore = {
  getMeta: () => ({ totalTokenCount: allTokens.length }),
  listTokens: () => allTokens,
  getTokenByKey: () => null,
  searchTokens: ({ query, limit, type, category }) => {
    const normalizedQuery = query.toLowerCase();
    const normalizedCategory = category?.toLowerCase();

    return allTokens
      .filter((token) => {
        if (type !== undefined && token.type !== type) {
          return false;
        }

        if (
          normalizedCategory !== undefined &&
          (token.category ?? '').toLowerCase() !== normalizedCategory
        ) {
          return false;
        }

        return (
          token.key.toLowerCase().includes(normalizedQuery) ||
          token.name.toLowerCase().includes(normalizedQuery)
        );
      })
      .slice(0, limit);
  },
};

test('buildSearchTokensPayload filters tokens by query', () => {
  const payload = buildSearchTokensPayload(tokenStore, {
    query: 'action',
    limit: 10,
  });

  assert.equal(payload.query, 'action');
  assert.equal(payload.totalTokenCount, 2);
  assert.equal(payload.resultCount, 1);
  assert.equal(payload.results[0]?.name, 'token-color-foreground-action');
});

test('buildSearchTokensPayload filters by type and category', () => {
  const payload = buildSearchTokensPayload(tokenStore, {
    query: 'token',
    limit: 10,
    type: 'color',
    category: 'color',
  });

  assert.equal(payload.resultCount, 1);
  assert.equal(payload.results[0]?.type, 'color');
});

test('registerSearchTokensTool registers and returns payload envelope', async () => {
  const server = new FakeServer();

  registerSearchTokensTool(
    server as unknown as Parameters<typeof registerSearchTokensTool>[0],
    tokenStore
  );

  const tool = server.registeredTools[0];
  if (tool === undefined) {
    throw new Error('Expected hds_search_tokens to be registered');
  }

  const response = await tool.handler({
    query: 'radius',
    limit: 10,
  });
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    resultCount: number;
    results: Array<{ key: string }>;
  };

  assert.equal(tool.name, 'hds_search_tokens');
  assert.equal(payload.resultCount, 1);
  assert.equal(payload.results[0]?.key, '{border.radius.small}');
});
