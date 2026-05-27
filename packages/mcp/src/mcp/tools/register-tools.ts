/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { registerResolveFigmaFrameTool } from './resolve-figma-frame.js';
import { registerSearchComponentsTool } from './search-components.js';
import { registerSearchDocsTool } from './search-docs.js';
import { registerSearchTokensTool } from './search-tokens.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../../catalogs/components/store.js';
import type { DocsSearchClient } from '../../docs-search/client.js';
import type { TokenCatalogStore } from '../../catalogs/tokens/store.js';

export const registerTools = (
  server: McpServer,
  store: ComponentCatalogStore,
  docsSearchClient: DocsSearchClient,
  tokenStore: TokenCatalogStore
): void => {
  registerSearchComponentsTool(server, store);
  registerResolveFigmaFrameTool(server, store);
  registerSearchDocsTool(server, docsSearchClient);
  registerSearchTokensTool(server, tokenStore);
};
