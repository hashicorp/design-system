/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
  AnySchema,
  ZodRawShapeCompat,
} from "@modelcontextprotocol/sdk/server/zod-compat.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";

export interface McpTool<
  InputArgs extends ZodRawShapeCompat | undefined = undefined,
  OutputArgs extends ZodRawShapeCompat | AnySchema =
    | ZodRawShapeCompat
    | AnySchema,
> {
  name: string;
  config: {
    title?: string;
    description?: string;
    inputSchema?: InputArgs;
    outputSchema?: OutputArgs;
    annotations?: ToolAnnotations;
    _meta?: Record<string, unknown>;
  };
  executeCallback: ToolCallback<InputArgs>;
}
