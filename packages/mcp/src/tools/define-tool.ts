/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { NOOP_TELEMETRY, withToolTelemetry } from "../telemetry/index.js";

import type { McpServer, ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
  AnySchema,
  ZodRawShapeCompat,
} from "@modelcontextprotocol/sdk/server/zod-compat.js";
import type { Telemetry } from "../telemetry/index.js";
import type { McpTool } from "./types.js";

export interface ToolRegistration {
  name: string;
  register: (server: McpServer, telemetry?: Telemetry) => void;
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
    register: (server: McpServer, telemetry: Telemetry = NOOP_TELEMETRY) => {
      // the sdk's callback type is conditional on the input shape, which a generic wrapper
      // cannot resolve; the wrapper forwards its arguments untouched, so the shape holds
      const executeCallback = withToolTelemetry(
        tool.name,
        tool.executeCallback as Parameters<typeof withToolTelemetry>[1],
        telemetry,
        tool.toTelemetryProperties,
      ) as ToolCallback<InputArgs>;

      server.registerTool(tool.name, tool.config, executeCallback);
    },
  };
};

export const CATALOG_TOOL_ANNOTATIONS = {
  readOnlyHint: true,
  idempotentHint: true,
  openWorldHint: false,
} as const;
