/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
  AnySchema,
  ZodRawShapeCompat,
} from "@modelcontextprotocol/sdk/server/zod-compat.js";
import type { McpTool } from "../types.js";

export interface ToolRegistration {
  name: string;
  register: (server: McpServer) => void;
}

export const defineTool = <
  InputArgs extends ZodRawShapeCompat | undefined,
  OutputArgs extends ZodRawShapeCompat | AnySchema =
    | ZodRawShapeCompat
    | AnySchema,
>(
  tool: McpTool<InputArgs, OutputArgs>,
): ToolRegistration => {
  return {
    name: tool.name,
    register: (server: McpServer) => {
      server.registerTool(tool.name, tool.config, tool.executeCallback);
    },
  };
};
