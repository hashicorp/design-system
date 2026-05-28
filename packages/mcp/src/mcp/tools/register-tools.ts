/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { registerResolveFigmaFrameTool } from './resolve-figma-frame.js';
import { registerReadDocTool } from './read-doc.js';
import { registerSearchComponentsTool } from './search-components.js';
import { registerSearchDocsTool } from './search-docs.js';
import { registerSearchIconsTool } from './search-icons.js';
import { registerSearchTokensTool } from './search-tokens.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../../catalogs/components/store.js';
import type { DocsCatalogStore } from '../../catalogs/docs/store.js';
import type { IconCatalogStore } from '../../catalogs/icons/store.js';
import type { TokenCatalogStore } from '../../catalogs/tokens/store.js';

export const registerTools = (
  server: McpServer,
  store: ComponentCatalogStore,
  docsStore: DocsCatalogStore,
  tokenStore: TokenCatalogStore,
  iconStore: IconCatalogStore
): void => {
  registerSearchComponentsTool(server, store);
  registerResolveFigmaFrameTool(server, store);
  registerReadDocTool(server, docsStore);
  registerSearchDocsTool(server, docsStore);
  registerSearchTokensTool(server, tokenStore);
  registerSearchIconsTool(server, iconStore);
};
