/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { JsonObject } from "../types.js";
<<<<<<< HEAD
import type {
  ReadResourceCallback,
  ReadResourceTemplateCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

type SupportedReadHandlerArgs =
  | Parameters<ReadResourceCallback>
  | Parameters<ReadResourceTemplateCallback>;
=======

type ResourceResponse = {
  contents: {
    uri: string;
    mimeType: string;
    text: string;
  }[];
};
>>>>>>> fcd3ba4718 (finished adding infrastructure)

export const toJsonResourceResponse: (
  uri: string,
  payload: JsonObject,
<<<<<<< HEAD
) => ReadResourceResult = (uri: string, payload: JsonObject) => {
=======
) => ResourceResponse = (uri: string, payload: JsonObject) => {
>>>>>>> fcd3ba4718 (finished adding infrastructure)
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

export const withSafeResourceHandler = <TArgs extends SupportedReadHandlerArgs>(
  resourceName: string,
  handler: (...args: TArgs) => Promise<ReadResourceResult> | ReadResourceResult,
) => {
  return async (...args: TArgs): Promise<ReadResourceResult> => {
    const [uri] = args;

    try {
      return await handler(...args);
    } catch (error: unknown) {
      console.error(`Resource handler failed (${resourceName}):`, error);

      const errorPayload: JsonObject =
        error instanceof Error
          ? { name: error.name, message: error.message }
          : { message: String(error) };

      return toJsonResourceResponse(uri.toString(), {
        ok: false,
        resource: resourceName,
        error: errorPayload,
      });
    }
  };
};
