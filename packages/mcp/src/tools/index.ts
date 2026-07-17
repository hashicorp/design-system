/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { McpTool } from "./types.js";
import { lookupComponentMappingTool } from "./lookup-component-mapping.js";
import { listComponentMappingsTool } from "./list-component-mappings.js";
import { validateMigrationCandidateTool } from "./validate-migration-candidate.js";
import { listSkillsTool, readSkillTool } from "./skills.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TOOLS: McpTool<any>[] = [
  lookupComponentMappingTool,
  listComponentMappingsTool,
  validateMigrationCandidateTool,
  listSkillsTool,
  readSkillTool,
];

export function registerTools(server: McpServer) {
  for (const tool of TOOLS) {
    server.registerTool(tool.name, tool.config, tool.executeCallback);
  }
}
