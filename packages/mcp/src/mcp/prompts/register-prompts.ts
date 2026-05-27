/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { registerComponentUsagePrompt } from './component-usage.js';
import { registerImplementFigmaFramePrompt } from './implement-figma-frame.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../../component-catalog/store.js';

export const registerPrompts = (
  server: McpServer,
  store: ComponentCatalogStore
): void => {
  registerComponentUsagePrompt(server, store);
  registerImplementFigmaFramePrompt(server, store);
};
