/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';
import { DOCS_SEARCH_SCOPES } from '../docs-search/scopes.js';
import { toTextResponse } from './response-envelope.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { DocsSearchClient } from '../docs-search/client.js';
import type { DocsSearchScope } from '../docs-search/scopes.js';

const docsSearchScopeSchema = z.enum(DOCS_SEARCH_SCOPES);

export const buildSearchDocsUnavailablePayload = (
  query: string,
  scope: DocsSearchScope,
  limit: number,
  missingEnvVars: string[]
) => {
  return {
    available: false,
    query,
    scope,
    limit,
    resultCount: 0,
    results: [],
    message: `Docs search is unavailable. Missing environment variables: ${missingEnvVars.join(', ')}.`,
  };
};

export const registerSearchDocsTool = (
  server: McpServer,
  docsSearchClient: DocsSearchClient
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
      if (docsSearchClient.available === false) {
        return toTextResponse(
          buildSearchDocsUnavailablePayload(
            query,
            scope,
            limit,
            docsSearchClient.missingEnvVars ?? []
          )
        );
      }

      const output = await docsSearchClient.search({ query, scope, limit });

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
