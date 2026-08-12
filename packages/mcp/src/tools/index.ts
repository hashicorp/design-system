/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import DOCS_TOOLS from "./docs/index.js";
import { withSafeToolHandler } from "./utils.js";

import type { RegisteredMcpTool } from "./types.js";

const TOOLS: RegisteredMcpTool[] = [...DOCS_TOOLS];

export function registerTools(server: McpServer): void {
  for (const tool of TOOLS) {
    server.registerTool(
      tool.name,
      tool.config,
      withSafeToolHandler(tool.name, tool.executeCallback),
    );
  }
}
