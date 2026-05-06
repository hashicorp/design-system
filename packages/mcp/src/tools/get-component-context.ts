/**
 * Copyright HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import type { ComponentCatalogStore } from '../component-catalog.js';

export const registerGetComponentContextTool = (
  server: McpServer,
  store: ComponentCatalogStore
): void => {
  server.registerTool(
    'hds_get_component_context',
    {
      title: 'Get HDS component context',
      description:
        'Get context for a component by name or slug from the component catalog.',
      inputSchema: {
        nameOrSlug: z.string().min(1),
      },
    },
    async ({ nameOrSlug }) => {
      const component = store.getComponentContext(nameOrSlug);

      if (!component) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  found: false,
                  manifestVersion: store.catalog.version,
                  query: nameOrSlug,
                  message:
                    'Component not found. Use hds_list_components to discover valid names.',
                },
                null,
                2
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                found: true,
                manifestVersion: store.catalog.version,
                component,
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
