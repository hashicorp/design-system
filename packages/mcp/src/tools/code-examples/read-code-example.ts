/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

import { toToolResponse } from "../utils.js";
import { READ_CODE_EXAMPLE_TOOL_NAME } from "./constants.js";
import { getOrLoadCodeExamplesStore } from "./store/index.js";
import { codeExampleReadToolOutputSchema } from "./store/schema.js";

import type { McpTool } from "../types.js";
import type { CodeExamplesStore } from "./store/index.js";
import type { CodeExampleReadOutput } from "./store/schema.js";

const inputSchema = {
  exampleId: z.string().trim().min(1),
};

export const readCodeExample = (
  store: CodeExamplesStore,
  input: { exampleId: string },
): CodeExampleReadOutput => store.readCodeExample(input);

export const createReadCodeExampleTool = (
  getStore: () => CodeExamplesStore,
): McpTool<typeof inputSchema, typeof codeExampleReadToolOutputSchema> => ({
  name: READ_CODE_EXAMPLE_TOOL_NAME,
  config: {
    title: "Read a Helios component code example",
    description:
      "Retrieve the complete GTS source and dependency metadata for a Helios Showcase code example. " +
      "Use the exampleId returned by hds_search_code_examples.",
    inputSchema,
    outputSchema: codeExampleReadToolOutputSchema,
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
    },
  },
  executeCallback: async (input) =>
    toToolResponse({ ...readCodeExample(getStore(), input) }),
});

const readCodeExampleTool = createReadCodeExampleTool(
  getOrLoadCodeExamplesStore,
);

export default readCodeExampleTool;
