/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { toTextResponse } from './response-envelope.js';
import {
  classifyErrorCode,
  INTERNAL_ERROR_CODE,
} from '../error-classification.js';

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

      const code = classifyErrorCode(error);
      const message =
        code === INTERNAL_ERROR_CODE
          ? 'Tool execution failed due to an internal error.'
          : 'Tool execution failed due to invalid input parameters.';

      return toTextResponse({
        ok: false,
        error: {
          code,
          tool: toolName,
          message,
        },
      });
    }
  };
};
