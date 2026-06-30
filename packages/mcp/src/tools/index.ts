import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { McpTool } from "./types.js";

const TOOLS: McpTool[] = [];

export function registerTools(server: McpServer) {
  for (const tool of TOOLS) {
    server.registerTool(tool.name, tool.config, tool.executeCallback);
  }
}
