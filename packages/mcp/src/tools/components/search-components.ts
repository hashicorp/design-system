/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";
import { CATALOG_TOOL_ANNOTATIONS, defineTool } from "../shared/define-tool.js";
import catalogSourceOutputSchema from "../shared/output-schema.js";
import {
  toJsonToolResponse,
  withSafeToolHandler,
} from "../shared/responses.js";
import {
  clampSearchLimit,
  searchCountsOutputShape,
  searchLimitSchema,
} from "../shared/search.js";
import {
  DEFAULT_SEARCH_LIMIT,
  MAX_QUERY_LENGTH,
  MAX_SEARCH_LIMIT,
} from "../shared/constants.js";
import { SEARCH_COMPONENTS_TOOL_NAME, GET_COMPONENT_TOOL_NAME } from "./constants.js";
import { SEARCH_DOCS_TOOL_NAME } from "../docs/constants.js";
import { getOrLoadComponentStore } from "../../stores/components/index.js";

import type { ToolRegistration } from "../shared/define-tool.js";
import type { ComponentCatalogStore } from "../../stores/components/index.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

export const searchComponentsInputShape = {
  query: z
    .string()
    .min(1)
    .describe(
      "Component name fragment, e.g. 'button', 'advanced table', 'Hds::Flyout' or 'HdsCopyButton'. Matched as a case-insensitive substring against the invocation name, the class name, the module path and the docs route.",
    ),
  limit: searchLimitSchema(MAX_SEARCH_LIMIT, DEFAULT_SEARCH_LIMIT),
};

const searchComponentsResultShape = z.object({
  // the invocation name, as it is written in a template: Hds::AdvancedTable::Th
  name: z.string(),
  modulePath: z.string(),
  docsPath: z.string().optional(),
});

export const searchComponentsOutputShape = {
  query: z.string(),
  ...searchCountsOutputShape,
  totalComponentCount: z.number().int(),
  results: z.array(searchComponentsResultShape),
  source: catalogSourceOutputSchema,
};

export const searchComponentsOutputSchema = z.object(
  searchComponentsOutputShape,
);

export interface SearchComponentsInput {
  query: string;
  limit: number;
}

export type SearchComponentsPayload = z.infer<
  typeof searchComponentsOutputSchema
>;

const DESCRIPTION = [
  "Find Helios Design System components by name, from the component catalog shipped inside the installed @hashicorp/design-system-components package.",
  "This is a name lookup, not a question answerer: it matches a substring against each component's invocation name, class name, module path and docs route. Pass 'advanced table' or 'Hds::Flyout', not 'how do I make a table sortable'.",
  "Use it to confirm a component exists and to recover its exact invocation name and spelling before writing a template.",
  `Results carry only the invocation name, module path and docs route — not the component's arguments. Follow up with ${GET_COMPONENT_TOOL_NAME} for the arguments, blocks and yielded contextual components, or pass a result's docsPath to ${SEARCH_DOCS_TOOL_NAME} for usage guidance. Every documented component carries a docsPath; Hds::Yield is the sole exception.`,
  "The catalog is read from disk and never fetched. Exact and prefix matches rank first, so a component you named by hand comes back at the top when it exists. Beyond those, ordering is weak: if `truncated` is true, narrow the query rather than assuming the window holds every relevant match.",
].join(" ");

export const searchComponents = (
  store: ComponentCatalogStore,
  input: SearchComponentsInput,
): SearchComponentsPayload => {
  const meta = store.getMeta();
  const limit = clampSearchLimit(input.limit, MAX_SEARCH_LIMIT);
  // the query is echoed back, so it is bounded before it is repeated rather than only at the
  // declared schema; truncating beats refusing a caller that pasted something long
  const query = input.query.slice(0, MAX_QUERY_LENGTH);
  const { totalMatches, hits } = store.searchComponents({ query, limit });

  return {
    query,
    totalMatches,
    returnedMatches: hits.length,
    truncated: totalMatches > hits.length,
    // so `totalMatches` can be read against the size of the catalog it came from
    totalComponentCount: meta.totalComponentCount,
    results: hits,
    source: meta.source,
  };
};

export const createSearchComponentsTool = (
  getStore: () => ComponentCatalogStore,
): ToolRegistration => {
  const executeCallback: ToolCallback<typeof searchComponentsInputShape> =
    withSafeToolHandler(SEARCH_COMPONENTS_TOOL_NAME, (input) =>
      toJsonToolResponse(searchComponents(getStore(), input)),
    );

  return defineTool<
    typeof searchComponentsInputShape,
    typeof searchComponentsOutputShape
  >({
    name: SEARCH_COMPONENTS_TOOL_NAME,
    config: {
      title: "Search HDS components",
      description: DESCRIPTION,
      inputSchema: searchComponentsInputShape,
      outputSchema: searchComponentsOutputShape,
      annotations: CATALOG_TOOL_ANNOTATIONS,
    },
    executeCallback,
  });
};

const searchComponentsTool = createSearchComponentsTool(
  getOrLoadComponentStore,
);

export default searchComponentsTool;
