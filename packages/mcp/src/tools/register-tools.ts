/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { registerGetComponentContextTool } from './get-component-context.js';
import { registerGetManifestMetaTool } from './get-manifest-meta.js';
import { registerListComponentsTool } from './list-components.js';
import { registerSearchDocsTool } from './search-docs.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../component-catalog/store.js';
import type { DocsSearchClient } from '../docs-search/client.js';

export const registerTools = (
  server: McpServer,
  store: ComponentCatalogStore,
  docsSearchClient: DocsSearchClient
): void => {
  registerListComponentsTool(server, store);
  registerGetComponentContextTool(server, store);
  registerGetManifestMetaTool(server, store);
  registerSearchDocsTool(server, docsSearchClient);
};
