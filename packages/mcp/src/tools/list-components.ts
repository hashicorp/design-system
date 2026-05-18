/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';
import { toTextResponse, withGeneratedAt } from './utils.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../component-catalog.js';

export const buildListComponentsPayload = (
  store: ComponentCatalogStore,
  query?: string
) => {
  const manifestMeta = store.getManifestMeta();
  const components = store.listComponents();

  let filteredComponents = components;

  if (query !== undefined) {
    const normalizedQuery = query.trim().toLowerCase();

    filteredComponents = components.filter((component) => {
      return (
        component.name.toLowerCase().includes(normalizedQuery) ||
        component.slug.toLowerCase().includes(normalizedQuery) ||
        component.summary.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  return withGeneratedAt(store, {
    query: query ?? null,
    totalComponentCount: manifestMeta.componentCount,
    componentCount: filteredComponents.length,
    components: filteredComponents,
  });
};

export const registerListComponentsTool = (
  server: McpServer,
  store: ComponentCatalogStore
): void => {
  server.registerTool(
    'hds_list_components',
    {
      title: 'List HDS components',
      description:
        'List design-system components available in the component context catalog.',
      inputSchema: {
        query: z.string().min(1).optional(),
      },
    },
    async ({ query }) => {
      return toTextResponse(buildListComponentsPayload(store, query));
    }
  );
};
