/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

import { toToolResponse } from "../utils.js";
import {
  DEFAULT_MAX_CHARS,
  DEFAULT_MAX_SECTIONS,
  READ_DOC_TOOL_NAME,
} from "./constants.js";
import { getOrLoadDocsStore } from "./store/index.js";
import { docsReadToolOutputSchema } from "./store/schema.js";

import type { McpTool } from "../types.js";
import type { DocsStore } from "./store/index.js";
import type { DocsReadOutput } from "./store/schema.js";

const inputSchema = {
  docId: z.string().trim().min(1).optional(),
  sectionId: z.string().trim().min(1).optional(),
  cursor: z.string().trim().min(1).optional(),
  maxSections: z.number().int().min(1).max(10).default(DEFAULT_MAX_SECTIONS),
  maxChars: z.number().int().min(200).max(10_000).default(DEFAULT_MAX_CHARS),
};

export const readDoc = (
  store: DocsStore,
  input: {
    docId?: string;
    sectionId?: string;
    cursor?: string;
    maxSections: number;
    maxChars: number;
  },
): DocsReadOutput => store.readDoc(input);

export const createReadDocTool = (
  getStore: () => DocsStore,
): McpTool<typeof inputSchema, typeof docsReadToolOutputSchema> => ({
  name: READ_DOC_TOOL_NAME,
  config: {
    title: "Read Helios documentation",
    description:
      "Read focused sections of a Helios documentation page found with hds_search_docs.",
    inputSchema,
    outputSchema: docsReadToolOutputSchema,
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
    },
  },
  executeCallback: async (input) =>
    toToolResponse({ ...readDoc(getStore(), input) }),
});

const readDocTool = createReadDocTool(getOrLoadDocsStore);

export default readDocTool;
