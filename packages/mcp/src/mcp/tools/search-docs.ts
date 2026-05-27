/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';
import { DOCS_SEARCH_SCOPES } from '../../catalogs/docs/scopes.js';
import { toTextResponse } from './response-envelope.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { DocsSearchScope } from '../../catalogs/docs/scopes.js';
import type { DocsCatalogStore } from '../../catalogs/docs/store.js';

const docsSearchScopeSchema = z.enum(DOCS_SEARCH_SCOPES);

export const buildSearchDocsUnavailablePayload = (
  query: string,
  scope: DocsSearchScope,
  limit: number,
  message: string
) => {
  return {
    available: false,
    query,
    scope,
    limit,
    resultCount: 0,
    results: [],
    message,
  };
};

export const registerSearchDocsTool = (
  server: McpServer,
  docsStore: DocsCatalogStore
): void => {
  server.registerTool(
    'hds_search_docs',
    {
      title: 'Search Helios docs',
      description:
        'Search Helios docs for patterns, foundations, accessibility guidance, and content best practices.',
      inputSchema: {
        query: z.string().trim().min(1),
        scope: docsSearchScopeSchema.default('all'),
        limit: z.number().int().min(1).max(25).default(10),
      },
    },
    async ({ query, scope, limit }) => {
      const meta = docsStore.getMeta();

      if (meta.available === false) {
        return toTextResponse(
          buildSearchDocsUnavailablePayload(
            query,
            scope,
            limit,
            meta.message ?? 'Docs search is unavailable.'
          )
        );
      }

      const output = docsStore.search({ query, scope, limit });

      return toTextResponse({
        available: true,
        query,
        scope,
        limit,
        resultCount: output.resultCount,
        results: output.results,
      });
    }
  );
};
