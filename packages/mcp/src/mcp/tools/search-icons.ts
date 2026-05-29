/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';
import { toTextResponse } from './response-envelope.js';
import { withSafeToolHandler } from './safe-tool-handler.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { IconCatalogStore } from '../../catalogs/icons/store.js';

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export const buildSearchIconsPayload = (
  store: IconCatalogStore,
  input: {
    query: string;
    limit: number;
    category?: string;
    size?: '16' | '24';
    hasMapping?: boolean;
  }
) => {
  const matchedIcons = store.searchIcons({
    query: input.query,
    limit: input.limit,
    ...(input.category === undefined ? {} : { category: input.category }),
    ...(input.size === undefined ? {} : { size: input.size }),
    ...(input.hasMapping === undefined ? {} : { hasMapping: input.hasMapping }),
  });

  return {
    query: input.query,
    limit: input.limit,
    ...(input.category === undefined ? {} : { category: input.category }),
    ...(input.size === undefined ? {} : { size: input.size }),
    ...(input.hasMapping === undefined ? {} : { hasMapping: input.hasMapping }),
    totalIconCount: store.getMeta().totalIconCount,
    resultCount: matchedIcons.length,
    results: matchedIcons.map((icon) => ({
      iconName: icon.iconName,
      description: icon.description,
      category: icon.category,
      sizes: icon.sizes,
      hasMapping: icon.hasMapping,
    })),
  };
};

export const registerSearchIconsTool = (
  server: McpServer,
  store: IconCatalogStore
): void => {
  server.registerTool(
    'hds_search_icons',
    {
      title: 'Search HDS icons',
      description:
        'Search Flight icons by icon name, file name, category, description, and mapping.',
      inputSchema: {
        query: z.string().trim().min(1),
        limit: z.number().int().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT),
        category: z.string().trim().min(1).optional(),
        size: z.enum(['16', '24']).optional(),
        hasMapping: z.boolean().optional(),
      },
    },
    withSafeToolHandler(
      'hds_search_icons',
      async ({ query, limit, category, size, hasMapping }) => {
      return toTextResponse(
        buildSearchIconsPayload(store, {
          query,
          limit,
          ...(category === undefined ? {} : { category }),
          ...(size === undefined ? {} : { size }),
          ...(hasMapping === undefined ? {} : { hasMapping }),
        })
      );
      }
    )
  );
};
