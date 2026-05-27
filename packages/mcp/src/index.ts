/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { loadEnvFile } from 'node:process';
import { fileURLToPath } from 'node:url';

import { loadComponentCatalog } from './component-catalog/store.js';
import { createDocsSearchClient } from './docs-search/client.js';
import { getDocsSearchConfig } from './docs-search/config.js';
import { registerPrompts } from './mcp/prompts/register-prompts.js';
import { registerResources } from './mcp/resources/register-resources.js';
import { registerTools } from './mcp/tools/register-tools.js';
import { loadTokenCatalog } from './tokens/store.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const localEnvPath = resolve(__dirname, '../.env');

if (existsSync(localEnvPath)) {
  loadEnvFile(localEnvPath);
}

const server = new McpServer({
  name: 'hds-mcp',
  version: '0.0.0',
});

const catalogStore = loadComponentCatalog();
const tokenStore = loadTokenCatalog();
const docsSearchClient = createDocsSearchClient(getDocsSearchConfig());

registerResources(server, catalogStore, tokenStore);
registerTools(server, catalogStore, docsSearchClient, tokenStore);
registerPrompts(server, catalogStore);

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
