/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { JsonObject } from "../types.js";

type ResourceResponse = {
  contents: {
    uri: string;
    mimeType: string;
    text: string;
  }[];
};

export const toJsonResourceResponse: (
  uri: string,
  payload: JsonObject,
) => ResourceResponse = (uri: string, payload: JsonObject) => {
  return {
    contents: [
      {
        uri,
        mimeType: "application/json",
        text: JSON.stringify(payload, null, 2),
      },
    ],
  };
};

export const withSafeResourceHandler = <TArgs extends unknown[]>(
  resourceName: string,
  handler: (...args: TArgs) => Promise<ResourceResponse> | ResourceResponse,
  fallbackUri?: string,
) => {
  return async (...args: TArgs): Promise<ResourceResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error(`Resource handler failed (${resourceName}):`, error);

      const uri =
        typeof args[0] === "string" ? args[0] : (fallbackUri ?? "hds://error");

      return toJsonResourceResponse(uri, {
        ok: false,
        error,
      });
    }
  };
};
