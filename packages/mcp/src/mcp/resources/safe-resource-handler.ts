/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from './response-resource.js';
import {
  classifyErrorCode,
  INTERNAL_ERROR_CODE,
} from '../error-classification.js';

type ResourceResponse = ReturnType<typeof toJsonResourceResponse>;

export const withSafeResourceHandler = <TArgs extends unknown[]>(
  resourceName: string,
  handler: (...args: TArgs) => Promise<ResourceResponse> | ResourceResponse,
  fallbackUri?: string
) => {
  return async (...args: TArgs): Promise<ResourceResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error(`Resource handler failed (${resourceName}):`, error);

      const code = classifyErrorCode(error);
      const message =
        code === INTERNAL_ERROR_CODE
          ? 'Resource read failed due to an internal error.'
          : 'Resource read failed due to invalid input parameters.';

      const uri =
        typeof args[0] === 'string' ? args[0] : (fallbackUri ?? 'hds://error');

      return toJsonResourceResponse(uri, {
        ok: false,
        error: {
          code,
          resource: resourceName,
          message,
        },
      });
    }
  };
};
