/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import docsTools from "./docs/index.js";

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolRegistration } from "./shared/define-tool.js";

const TOOLS: ToolRegistration[] = [...docsTools];

export function registerTools(server: McpServer) {
  for (const tool of TOOLS) {
    tool.register(server);
  }
}
