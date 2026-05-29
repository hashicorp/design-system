/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';
import { toTextResponse, withGeneratedAt } from './response-envelope.js';
import { withSafeToolHandler } from './safe-tool-handler.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../../catalogs/components/store.js';

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export const buildSearchComponentsPayload = (
  store: ComponentCatalogStore,
  input: {
    query: string;
    limit: number;
  }
) => {
  const normalizedQuery = input.query.trim().toLowerCase();
  const components = store.listComponents();
  const matchedComponents = components
    .filter((component) => {
      return (
        component.name.toLowerCase().includes(normalizedQuery) ||
        component.slug.toLowerCase().includes(normalizedQuery) ||
        component.summary.toLowerCase().includes(normalizedQuery)
      );
    })
    .slice(0, input.limit);

  return withGeneratedAt(store, {
    query: input.query,
    limit: input.limit,
    totalComponentCount: components.length,
    resultCount: matchedComponents.length,
    results: matchedComponents,
  });
};

export const registerSearchComponentsTool = (
  server: McpServer,
  store: ComponentCatalogStore
): void => {
  server.registerTool(
    'hds_search_components',
    {
      title: 'Search HDS components',
      description:
        'Search design-system components by name, slug, or summary text.',
      inputSchema: {
        query: z.string().trim().min(1),
        limit: z.number().int().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT),
      },
    },
    withSafeToolHandler('hds_search_components', async ({ query, limit }) => {
      return toTextResponse(
        buildSearchComponentsPayload(store, {
          query,
          limit,
        })
      );
    })
  );
};
