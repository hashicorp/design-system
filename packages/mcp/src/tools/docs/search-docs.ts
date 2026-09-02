/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";
import { defineTool } from "../shared/define-tool.js";
import {
  toJsonToolResponse,
  withSafeToolHandler,
} from "../shared/responses.js";
import {
  DEFAULT_SEARCH_LIMIT,
  DOCS_TABS,
  MAX_FILTER_LENGTH,
  MAX_QUERY_LENGTH,
  MAX_SEARCH_LIMIT,
  SEARCH_DOCS_TOOL_NAME,
  VERSION_HISTORY_TAB,
} from "./constants.js";
import { getOrLoadDocsStore } from "./store/index.js";
import { clampFilterValue, toSerializableSearchResult } from "./utils.js";

import type { ToolRegistration } from "../shared/define-tool.js";
import type { DocsCatalogStore } from "./store/index.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

export const searchDocsInputShape = {
  query: z
    .string()
    .min(1)
    .describe(
      "Natural language or keyword query, e.g. 'how do I make a button full width' or 'sticky table header'.",
    ),
  limit: z
    .number()
    .int()
    .min(1)
    .max(MAX_SEARCH_LIMIT)
    .default(DEFAULT_SEARCH_LIMIT)
    .describe(
      `Maximum results to return (1-${MAX_SEARCH_LIMIT}). Defaults to ${DEFAULT_SEARCH_LIMIT}.`,
    ),
  section: z
    .string()
    .min(1)
    .max(MAX_FILTER_LENGTH)
    .optional()
    .describe(
      "Restrict to one top-level docs section: about, components, content, foundations, getting-started, icons, layouts, overrides, patterns, utilities, whats-new.",
    ),
  tab: z
    .string()
    .min(1)
    .max(MAX_FILTER_LENGTH)
    .optional()
    .describe(
      `Restrict to one page tab. The corpus uses exactly these: ${DOCS_TABS.join(", ")}. Version and changelog questions must pass tab: '${VERSION_HISTORY_TAB}', which is otherwise down-ranked.`,
    ),
  docsPath: z
    .string()
    .min(1)
    .max(MAX_FILTER_LENGTH)
    .optional()
    .describe(
      "Restrict to one docs route or route prefix, e.g. 'components/button' or 'components/form'. This is the same value the hds://components resource reports as a component's docsPath.",
    ),
};

const searchDocsResultShape = z.object({
  id: z.string(),
  score: z.number(),
  relScore: z.number(),
  title: z.string(),
  pageDescription: z.string().optional(),
  route: z.string(),
  docsPath: z.string(),
  section: z.string(),
  tab: z.string().optional(),
  headingPath: z.array(z.string()),
  url: z.string(),
  pageAnchored: z.boolean(),
  pageMatchedTerms: z.array(z.string()),
  snippet: z.string(),
});

export const searchDocsOutputShape = {
  query: z.string(),
  bundledAt: z.string(),
  siteBaseUrl: z.string(),
  totalMatches: z.number().int(),
  returnedMatches: z.number().int(),
  truncated: z.boolean(),
  matchedTerms: z.array(z.string()),
  unmatchedTerms: z.array(z.string()),
  filters: z.object({
    section: z.string().optional(),
    tab: z.string().optional(),
    docsPath: z.string().optional(),
  }),
  unknownFilters: z.array(z.string()),
  availableSections: z.array(z.string()).optional(),
  availableTabs: z.array(z.string()).optional(),
  results: z.array(searchDocsResultShape),
  provenance: z.string(),
};

export const searchDocsOutputSchema = z.object(searchDocsOutputShape);

export interface SearchDocsInput {
  query: string;
  limit: number;
  section?: string;
  tab?: string;
  docsPath?: string;
}

export type SearchDocsPayload = z.infer<typeof searchDocsOutputSchema>;

const DESCRIPTION = [
  "Search the bundled Helios Design System documentation (helios.hashicorp.design) and return ranked passages with snippets.",
  "The corpus is a snapshot committed into this server: search runs entirely locally and never makes a network request.",
  "Every result carries the canonical URL of the passage, and the response carries the bundledAt timestamp, so a client that needs the live page can fetch it itself.",
  "Follow up with read_hds_docs, passing a result's `id`, to read the full passage including its code examples.",
  "Results are ranked, not filtered for truth: a non-empty result set is not evidence that Helios has the thing you asked about. Check `pageAnchored` and `unmatchedTerms`, and read the snippets.",
].join(" ");

export const searchDocs = (
  store: DocsCatalogStore,
  input: SearchDocsInput,
): SearchDocsPayload => {
  const meta = store.getMeta();
  const limit = Math.min(Math.max(input.limit, 1), MAX_SEARCH_LIMIT);
  const query = input.query.slice(0, MAX_QUERY_LENGTH);
  const outcome = store.search({
    query,
    limit,
    ...(input.section === undefined
      ? {}
      : { section: clampFilterValue(input.section) }),
    ...(input.tab === undefined ? {} : { tab: clampFilterValue(input.tab) }),
    ...(input.docsPath === undefined
      ? {}
      : { docsPath: clampFilterValue(input.docsPath) }),
  });

  const filterHelp =
    outcome.unknownFilters.length === 0
      ? {}
      : {
          availableSections: store.listSections(),
          availableTabs: store.listTabs(),
        };

  return {
    query,
    bundledAt: meta.bundledAt,
    siteBaseUrl: meta.siteBaseUrl,
    totalMatches: outcome.totalMatches,
    returnedMatches: outcome.hits.length,
    truncated: outcome.totalMatches > outcome.hits.length,
    matchedTerms: outcome.matchedTerms,
    unmatchedTerms: outcome.unmatchedTerms,
    filters: outcome.filters,
    unknownFilters: outcome.unknownFilters,
    ...filterHelp,
    results: outcome.hits.map((hit) => toSerializableSearchResult(hit)),
    provenance: `Bundled snapshot of ${meta.siteBaseUrl} taken at ${meta.bundledAt}; ${meta.totalPageCount} pages, ${meta.totalChunkCount} passages. Fetch a result's url for the live page.`,
  };
};

export const createSearchDocsTool = (
  getStore: () => DocsCatalogStore,
): ToolRegistration => {
  const executeCallback: ToolCallback<typeof searchDocsInputShape> =
    withSafeToolHandler(SEARCH_DOCS_TOOL_NAME, (input) =>
      toJsonToolResponse(searchDocs(getStore(), input)),
    );

  return defineTool<typeof searchDocsInputShape, typeof searchDocsOutputShape>({
    name: SEARCH_DOCS_TOOL_NAME,
    config: {
      title: "Search HDS documentation",
      description: DESCRIPTION,
      inputSchema: searchDocsInputShape,
      outputSchema: searchDocsOutputShape,
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    executeCallback,
  });
};

const searchDocsTool = createSearchDocsTool(getOrLoadDocsStore);

export default searchDocsTool;
