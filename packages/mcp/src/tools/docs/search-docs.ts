/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

import { toToolResponse } from "../utils.js";
import {
  DEFAULT_SEARCH_LIMIT,
  DOCS_SEARCH_SCOPES,
  SEARCH_DOCS_TOOL_NAME,
} from "./constants.js";
import { getOrLoadDocsStore } from "./store/index.js";
import {
  docsSearchOutputSchema,
  docsSearchScopeSchema,
} from "./store/schema.js";

import type { McpTool } from "../types.js";
import type { DocsStore } from "./store/index.js";
import type { DocsSearchOutput } from "./store/schema.js";

const inputSchema = {
  query: z.string().trim().min(1),
  scope: docsSearchScopeSchema.default("all"),
  limit: z.number().int().min(1).max(25).default(DEFAULT_SEARCH_LIMIT),
};

const outputSchema = docsSearchOutputSchema.shape;

export const searchDocs = (
  store: DocsStore,
  input: {
    query: string;
    scope: (typeof DOCS_SEARCH_SCOPES)[number];
    limit: number;
  },
): DocsSearchOutput => {
  const results = store.searchDocs(input);

  return {
    query: input.query,
    scope: input.scope,
    resultCount: results.length,
    results,
  };
};

export const createSearchDocsTool = (
  getStore: () => DocsStore,
): McpTool<typeof inputSchema, typeof outputSchema> => ({
  name: SEARCH_DOCS_TOOL_NAME,
  config: {
    title: "Search Helios documentation",
    description:
      "Search Helios documentation for components, foundations, patterns, content, and accessibility guidance.",
    inputSchema,
    outputSchema,
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
    },
  },
  executeCallback: async (input) =>
    toToolResponse(searchDocs(getStore(), input)),
});

const searchDocsTool = createSearchDocsTool(getOrLoadDocsStore);

export default searchDocsTool;
