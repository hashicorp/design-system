/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// descriptor factory for the detail resource every domain registers

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { toJsonResourceResponse } from "./responses.js";
import { decodeUriSegment } from "./uri.js";

import type { McpResource } from "./types.js";
import type { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

const JSON_MIME_TYPE = "application/json";

export interface DefineDetailResourceInput {
  name: string;
  uriTemplate: string;
  title: string;
  description: string;
  variableName: string;
  complete: (value: string) => string[];
  read: (value: string) => ReadResourceResult;
}

export const defineDetailResource = ({
  name,
  uriTemplate,
  title,
  description,
  variableName,
  complete,
  read,
}: DefineDetailResourceInput): McpResource => {
  return {
    name,
    template: new ResourceTemplate(uriTemplate, {
      list: undefined,
      complete: {
        [variableName]: (value) => complete(value),
      },
    }),
    config: {
      title,
      description,
      mimeType: JSON_MIME_TYPE,
    },
    readCallback: async (
      uri: URL,
      variables: Record<string, string | string[]>,
    ) => {
      const variable = variables[variableName];

      if (typeof variable !== "string" || variable.trim().length === 0) {
        return toJsonResourceResponse(uri.toString(), {
          found: false,
          message: `Missing ${variableName} variable.`,
        });
      }

      return read(decodeUriSegment(variable));
    },
  };
};
