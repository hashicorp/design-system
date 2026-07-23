/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

import { toToolResponse } from "../utils.js";
import {
  DEFAULT_SEARCH_LIMIT,
  MAX_SEARCH_LIMIT,
  SEARCH_CODE_EXAMPLES_TOOL_NAME,
} from "./constants.js";
import { getOrLoadCodeExamplesStore } from "./store/index.js";
import {
  codeExamplesSearchOutputSchema,
} from "./store/schema.js";

import type { McpTool } from "../types.js";
import type { CodeExamplesStore } from "./store/index.js";
import type { CodeExamplesSearchOutput } from "./store/schema.js";

const inputSchema = {
  query: z.string().trim().min(1),
  component: z.string().trim().min(1).optional(),
  limit: z
    .number()
    .int()
    .min(1)
    .max(MAX_SEARCH_LIMIT)
    .default(DEFAULT_SEARCH_LIMIT),
};

const outputSchema = codeExamplesSearchOutputSchema.shape;

export const searchCodeExamples = (
  store: CodeExamplesStore,
  input: {
    query: string;
    component?: string;
    limit: number;
  },
): CodeExamplesSearchOutput => {
  const results = store.searchCodeExamples(input);

  return {
    query: input.query,
    ...(input.component !== undefined ? { component: input.component } : {}),
    resultCount: results.length,
    results,
  };
};

export const createSearchCodeExamplesTool = (
  getStore: () => CodeExamplesStore,
): McpTool<typeof inputSchema, typeof outputSchema> => ({
  name: SEARCH_CODE_EXAMPLES_TOOL_NAME,
  config: {
    title: "Search Helios component code examples",
    description:
      "Search working Ember/GTS code examples from the Helios Showcase app. " +
      "Finds implementations by component name, example title, or imported Helios component. " +
      "Use hds_read_code_example to retrieve the full source of a result.",
    inputSchema,
    outputSchema,
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
    },
  },
  executeCallback: async (input) =>
    toToolResponse(searchCodeExamples(getStore(), input)),
});

const searchCodeExamplesTool = createSearchCodeExamplesTool(
  getOrLoadCodeExamplesStore,
);

export default searchCodeExamplesTool;
