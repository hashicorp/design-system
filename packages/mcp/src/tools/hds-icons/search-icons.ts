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
  MAX_FILTER_LENGTH,
  clampFilterValue,
  clampSearchLimit,
  collectUnknownFilters,
  searchCountsOutputShape,
  searchLimitSchema,
} from "../shared/search.js";
import {
  DEFAULT_SEARCH_LIMIT,
  MAX_QUERY_LENGTH,
  MAX_SEARCH_LIMIT,
} from "../shared/constants.js";
import { SEARCH_ICONS_TOOL_NAME } from './constants.js'
import { getOrLoadIconStore } from "../../stores/hds-icons/index.js";

import type { ToolRegistration } from "../shared/define-tool.js";
import type { IconCatalogStore } from "../../stores/hds-icons/index.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

export const searchIconsInputShape = {
  query: z
    .string()
    .min(1)
    .describe(
      "Icon name or keyword, e.g. 'alert', 'triangle', 'arrow-right' or 'warning'. Matched as a case-insensitive substring against the icon name, its description keywords, its category, its Figma mapping and its variant file names.",
    ),
  limit: searchLimitSchema(MAX_SEARCH_LIMIT, DEFAULT_SEARCH_LIMIT),
  category: z
    .string()
    .min(1)
    .max(MAX_FILTER_LENGTH)
    .optional()
    .describe(
      "Restrict to one icon category, e.g. 'Status', 'Arrows', 'Interface' or 'Products'. A value the catalog does not use comes back in unknownFilters alongside the categories that exist.",
    ),
  hasMapping: z
    .boolean()
    .optional()
    .describe(
      "Restrict to icons that do (true) or do not (false) carry a Figma component mapping. Leave unset unless you are reconciling code against the Figma library.",
    ),
};

const searchIconsResultShape = z.object({
  // the name passed to <Hds::Icon @name= />, without a size suffix
  iconName: z.string(),
  description: z.string(),
  category: z.string(),
  sizes: z.array(z.string()),
  hasMapping: z.boolean(),
});

export const searchIconsOutputShape = {
  query: z.string(),
  ...searchCountsOutputShape,
  totalIconCount: z.number().int(),
  filters: z.object({
    category: z.string().optional(),
    hasMapping: z.boolean().optional(),
  }),
  unknownFilters: z.array(z.string()),
  availableCategories: z.array(z.string()).optional(),
  results: z.array(searchIconsResultShape),
  source: catalogSourceOutputSchema,
};

export const searchIconsOutputSchema = z.object(searchIconsOutputShape);

export interface SearchIconsInput {
  query: string;
  limit: number;
  category?: string;
  hasMapping?: boolean;
}

export type SearchIconsPayload = z.infer<typeof searchIconsOutputSchema>;

const DESCRIPTION = [
  "Find Flight icons — the icon set Helios ships — by name or keyword, from the catalog inside the installed @hashicorp/flight-icons package.",
  "Each icon's searchable text includes its description keywords, so 'warning' reaches alert-triangle even though the two share no characters.",
  "Use it to pick the @name value for <Hds::Icon> or <Hds::Button @icon=>, and to confirm an icon exists before writing a name that would render nothing.",
  "Every icon in the catalog is published at both 16 and 24, so pick the size at the call site rather than here.",
  "The catalog is read from disk and never fetched. Matching is an unranked substring test, so check `truncated`: if it is true, narrow the query or filter by category rather than assuming the window holds the best matches.",
].join(" ");

export const searchIcons = (
  store: IconCatalogStore,
  input: SearchIconsInput,
): SearchIconsPayload => {
  const meta = store.getMeta();
  const limit = clampSearchLimit(input.limit, MAX_SEARCH_LIMIT);
  const query = input.query.slice(0, MAX_QUERY_LENGTH);
  const category =
    input.category === undefined ? undefined : clampFilterValue(input.category);

  const { totalMatches, hits } = store.searchIcons({
    query,
    limit,
    ...(category === undefined ? {} : { category }),
    ...(input.hasMapping === undefined ? {} : { hasMapping: input.hasMapping }),
  });

  const unknownFilters = collectUnknownFilters([
    { name: "category", value: category, known: meta.categories },
  ]);

  return {
    query,
    totalMatches,
    returnedMatches: hits.length,
    truncated: totalMatches > hits.length,
    // so `totalMatches` can be read against the size of the catalog it came from
    totalIconCount: meta.totalIconCount,
    filters: {
      ...(category === undefined ? {} : { category }),
      ...(input.hasMapping === undefined
        ? {}
        : { hasMapping: input.hasMapping }),
    },
    unknownFilters,
    // only worth spending tokens on the valid values when the filter did not land
    ...(unknownFilters.length === 0
      ? {}
      : { availableCategories: meta.categories }),
    results: hits,
    source: meta.source,
  };
};

export const createSearchIconsTool = (
  getStore: () => IconCatalogStore,
): ToolRegistration => {
  const executeCallback: ToolCallback<typeof searchIconsInputShape> =
    withSafeToolHandler(SEARCH_ICONS_TOOL_NAME, (input) =>
      toJsonToolResponse(searchIcons(getStore(), input)),
    );

  return defineTool<
    typeof searchIconsInputShape,
    typeof searchIconsOutputShape
  >({
    name: SEARCH_ICONS_TOOL_NAME,
    config: {
      title: "Search Flight icons",
      description: DESCRIPTION,
      inputSchema: searchIconsInputShape,
      outputSchema: searchIconsOutputShape,
      annotations: CATALOG_TOOL_ANNOTATIONS,
    },
    executeCallback,
  });
};

const searchIconsTool = createSearchIconsTool(getOrLoadIconStore);

export default searchIconsTool;