/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { toTextResponse } from './response-envelope.js';

type ToolResponse = ReturnType<typeof toTextResponse>;

export const withSafeToolHandler = <TInput extends Record<string, unknown>>(
  toolName: string,
  handler: (input: TInput) => Promise<ToolResponse> | ToolResponse
) => {
  return async (input: TInput): Promise<ToolResponse> => {
    try {
      return await handler(input);
    } catch (error) {
      console.error(`Tool handler failed (${toolName}):`, error);

      return toTextResponse({
        ok: false,
        error: {
          code: 'INTERNAL_ERROR',
          tool: toolName,
          message: 'Tool execution failed due to an internal error.',
        },
      });
    }
  };
};
