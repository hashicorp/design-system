/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { PromptCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZodRawShapeCompat } from "@modelcontextprotocol/sdk/server/zod-compat.js";

export interface McpPrompt<Args extends ZodRawShapeCompat = ZodRawShapeCompat> {
  name: string;
  config: {
    title?: string;
    description?: string;
    argsSchema: Args;
  };
  callback: PromptCallback<Args>;
}
