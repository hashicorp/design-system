/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { loadComponentCatalog } from './component-catalog/store.js';
import { createDocsSearchClient } from './docs-search/client.js';
import { getDocsSearchConfig } from './docs-search/config.js';
import { registerTools } from './tools/register-tools.js';

const server = new McpServer({
  name: 'hds-mcp',
  version: '0.0.0',
});

const catalogStore = loadComponentCatalog();
const docsSearchClient = createDocsSearchClient(getDocsSearchConfig());

registerTools(server, catalogStore, docsSearchClient);

const main = async (): Promise<void> => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // STDIO servers must never write to stdout; use stderr for diagnostics.
  console.error('Helios Design System MCP server running on stdio');
};

main().catch((error: unknown) => {
  console.error('Fatal error starting MCP server:', error);
  process.exit(1);
});
