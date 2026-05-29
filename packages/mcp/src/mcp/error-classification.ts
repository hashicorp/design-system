/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { ZodError } from 'zod';

export const INVALID_PARAMS_ERROR_CODE = 'INVALID_PARAMS';
export const INTERNAL_ERROR_CODE = 'INTERNAL_ERROR';

type ClassifiedErrorCode =
  | typeof INVALID_PARAMS_ERROR_CODE
  | typeof INTERNAL_ERROR_CODE;

export class McpInvalidParamsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'McpInvalidParamsError';
  }
}

export const isInvalidParamsError = (error: unknown): boolean => {
  return error instanceof McpInvalidParamsError || error instanceof ZodError;
};

export const classifyErrorCode = (error: unknown): ClassifiedErrorCode => {
  return isInvalidParamsError(error)
    ? INVALID_PARAMS_ERROR_CODE
    : INTERNAL_ERROR_CODE;
};
