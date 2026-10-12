/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// tool result envelopes and the error guard every tool call goes through

import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const toJsonToolResponse = <TPayload extends Record<string, unknown>>(
  payload: TPayload,
): CallToolResult => {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(payload, null, 2),
      },
    ],
    structuredContent: payload,
  };
};

export const toDocumentToolResponse = (
  metadata: Record<string, unknown>,
  document: string,
): CallToolResult => {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(metadata, null, 2),
      },
      {
        type: "text",
        text: document,
      },
    ],
    structuredContent: metadata,
  };
};

// this adds the stderr diagnostic and a message naming the tool, so an unreadable
// catalog degrades to one failed call rather than taking the server down
export const withSafeToolHandler = <TArgs extends unknown[]>(
  toolName: string,
  handler: (...args: TArgs) => Promise<CallToolResult> | CallToolResult,
): ((...args: TArgs) => Promise<CallToolResult>) => {
  return async (...args: TArgs): Promise<CallToolResult> => {
    try {
      return await handler(...args);
    } catch (error: unknown) {
      console.error(`Tool handler failed (${toolName}):`, error);

      const message = error instanceof Error ? error.message : String(error);

      return {
        content: [
          {
            type: "text",
            text: `${toolName} failed: ${message}`,
          },
        ],
        isError: true,
      };
    }
  };
};
