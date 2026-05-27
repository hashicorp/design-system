/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';
import { TOKEN_TYPES } from '../../catalogs/tokens/schema.js';
import { toTextResponse } from './response-envelope.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { TokenCatalogStore } from '../../catalogs/tokens/store.js';

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

const tokenTypeSchema = z.enum(TOKEN_TYPES);

export const buildSearchTokensPayload = (
  store: TokenCatalogStore,
  input: {
    query: string;
    limit: number;
    type?: z.infer<typeof tokenTypeSchema>;
    category?: string;
  }
) => {
  const matchedTokens = store.searchTokens({
    query: input.query,
    limit: input.limit,
    ...(input.type === undefined ? {} : { type: input.type }),
    ...(input.category === undefined ? {} : { category: input.category }),
  });

  return {
    query: input.query,
    limit: input.limit,
    ...(input.type === undefined ? {} : { type: input.type }),
    ...(input.category === undefined ? {} : { category: input.category }),
    totalTokenCount: store.getMeta().totalTokenCount,
    resultCount: matchedTokens.length,
    results: matchedTokens,
  };
};

export const registerSearchTokensTool = (
  server: McpServer,
  store: TokenCatalogStore
): void => {
  server.registerTool(
    'hds_search_tokens',
    {
      title: 'Search HDS tokens',
      description:
        'Search HDS tokens by key, name, category, path, and value text.',
      inputSchema: {
        query: z.string().trim().min(1),
        limit: z.number().int().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT),
        type: tokenTypeSchema.optional(),
        category: z.string().trim().min(1).optional(),
      },
    },
    async ({ query, limit, type, category }) => {
      return toTextResponse(
        buildSearchTokensPayload(store, {
          query,
          limit,
          ...(type === undefined ? {} : { type }),
          ...(category === undefined ? {} : { category }),
        })
      );
    }
  );
};
