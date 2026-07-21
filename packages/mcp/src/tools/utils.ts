/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZodRawShapeCompat } from "@modelcontextprotocol/sdk/server/zod-compat.js";

export const toToolResponse = <T extends Record<string, unknown>>(
  payload: T,
) => {
  return {
    content: [
      { type: "text" as const, text: JSON.stringify(payload, null, 2) },
    ],
    structuredContent: payload,
  };
};

export const withSafeToolHandler = <InputArgs extends ZodRawShapeCompat>(
  toolName: string,
  handler: ToolCallback<InputArgs>,
): ToolCallback<InputArgs> => {
  const safeHandler = async (
    input: Parameters<ToolCallback<InputArgs>>[0],
    extra: Parameters<ToolCallback<InputArgs>>[1],
  ) => {
    try {
      return await handler(input, extra);
    } catch (error: unknown) {
      console.error(`Tool handler failed (${toolName}):`, error);

      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Tool '${toolName}' failed: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    }
  };

  return safeHandler as ToolCallback<InputArgs>;
};
