/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import componentsTools from "./components/index.js";
import docsTools from "./docs/index.js";
import hdsIconsTools from "./hds-icons/index.js";
import tokensTools from "./tokens/index.js";

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolRegistration } from "./shared/define-tool.js";

export const TOOLS: ToolRegistration[] = [
  ...componentsTools,
  ...docsTools,
  ...hdsIconsTools,
  ...tokensTools,
];

export function registerTools(server: McpServer) {
  for (const tool of TOOLS) {
    tool.register(server);
  }
}
