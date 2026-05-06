/**
 * Copyright HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import type { ComponentCatalogStore } from '../component-catalog.js';

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
      const components = store.listComponents();

      const filteredComponents = query
        ? components.filter((component) => {
            const normalizedQuery = query.trim().toLowerCase();
            return (
              component.name.toLowerCase().includes(normalizedQuery) ||
              component.slug.toLowerCase().includes(normalizedQuery) ||
              component.summary.toLowerCase().includes(normalizedQuery)
            );
          })
        : components;

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                manifestVersion: store.catalog.version,
                componentCount: filteredComponents.length,
                components: filteredComponents,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
};
