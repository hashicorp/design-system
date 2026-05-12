/**
 * Copyright HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import type { ComponentCatalogStore } from '../component-catalog.js';
import { toTextResponse, withGeneratedAt } from './utils.js';

export const buildGetComponentContextPayload = (
  store: ComponentCatalogStore,
  nameOrSlug: string
) => {
  const component = store.getComponentContext(nameOrSlug);

  if (component === null) {
    return withGeneratedAt(store, {
      found: false,
      query: nameOrSlug,
      message:
        'Component not found. Use hds_list_components to discover valid names.',
    });
  }

  return withGeneratedAt(store, {
    found: true,
    query: nameOrSlug,
    component,
  });
};

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
      return toTextResponse(buildGetComponentContextPayload(store, nameOrSlug));
    }
  );
};
