/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";
import { SEARCH_TOKENS_TOOL_NAME } from './constants.js';
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
import { getOrLoadTokenStore } from "../../stores/tokens/index.js";
import { TOKEN_TYPES } from "../../stores/tokens/schema.js";

import type { JsonValue } from "../../types.js";
import type { ToolRegistration } from "../shared/define-tool.js";
import type { TokenCatalogStore } from "../../stores/tokens/index.js";
import type { TokenType } from "../../stores/tokens/schema.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

export const searchTokensInputShape = {
  query: z
    .string()
    .min(1)
    .describe(
      "Token name fragment or value, e.g. 'foreground-action', 'border radius', 'blue-200' or '#1060ff'. Matched as a case-insensitive substring against the token key, its CSS variable name, its dotted path and its value.",
    ),
  limit: searchLimitSchema(MAX_SEARCH_LIMIT, DEFAULT_SEARCH_LIMIT),
  type: z
    .enum(TOKEN_TYPES)
    .optional()
    .describe(
      "Restrict to one token type. 'color' and 'dimension' are the two that carry most of the catalog.",
    ),
  category: z
    .string()
    .min(1)
    .max(MAX_FILTER_LENGTH)
    .optional()
    .describe(
      "Restrict to one token category, e.g. 'color', 'border' or 'typography'. A value the catalog does not use comes back in unknownFilters alongside the categories that exist.",
    ),
};

const searchTokensResultShape = z.object({
  // the catalog key, in braces: {color.foreground.action}
  key: z.string(),
  name: z.string(),
  // the name to use in CSS: var(--token-color-foreground-action)
  cssVar: z.string(),
  type: z.enum(TOKEN_TYPES),
  // a string for most tokens, an array for the font-family ones
  value: z.json(),
  category: z.string(),
});

export const searchTokensOutputShape = {
  query: z.string(),
  ...searchCountsOutputShape,
  totalTokenCount: z.number().int(),
  filters: z.object({
    type: z.enum(TOKEN_TYPES).optional(),
    category: z.string().optional(),
  }),
  unknownFilters: z.array(z.string()),
  availableCategories: z.array(z.string()).optional(),
  results: z.array(searchTokensResultShape),
  source: catalogSourceOutputSchema,
};

// the payload type is derived from the declared schema, so a drift between the two is a
// compile error rather than a runtime output-validation failure
export const searchTokensOutputSchema = z.object(searchTokensOutputShape);

export interface SearchTokensInput {
  query: string;
  limit: number;
  type?: TokenType;
  category?: string;
}

export type SearchTokensPayload = z.infer<typeof searchTokensOutputSchema>;

const DESCRIPTION = [
  "Find Helios design tokens by name or value, from the token catalog inside the installed @hashicorp/design-system-tokens package.",
  "Every result carries the cssVar to write in a stylesheet — var(--token-color-foreground-action) — so use this to replace a hard-coded colour, spacing or radius with the token that holds it.",
  "The query matches the token value too, so searching a hex code finds which token already defines it.",
  "The catalog is read from disk and never fetched. Exact and prefix matches on the token key, name or CSS variable rank first, so a token you named by hand comes back at the top; value-only matches rank last. If `truncated` is true, narrow the query or filter by type.",
].join(" ");

export const searchTokens = (
  store: TokenCatalogStore,
  input: SearchTokensInput,
): SearchTokensPayload => {
  const meta = store.getMeta();
  const limit = clampSearchLimit(input.limit, MAX_SEARCH_LIMIT);
  // both the query and the category are echoed back, so they are bounded before they are
  // repeated rather than only at the declared schema; `type` is closed over TOKEN_TYPES
  const query = input.query.slice(0, MAX_QUERY_LENGTH);
  const category =
    input.category === undefined ? undefined : clampFilterValue(input.category);

  const { totalMatches, hits } = store.searchTokens({
    query,
    limit,
    ...(input.type === undefined ? {} : { type: input.type }),
    ...(category === undefined ? {} : { category }),
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
    totalTokenCount: meta.totalTokenCount,
    filters: {
      ...(input.type === undefined ? {} : { type: input.type }),
      ...(category === undefined ? {} : { category }),
    },
    unknownFilters,
    // only worth spending tokens on the valid values when the filter did not land
    ...(unknownFilters.length === 0
      ? {}
      : { availableCategories: meta.categories }),
    /**
     * Two fields of the store summary are dropped rather than forwarded. `attributes` is the
     * raw catalog record's own metadata and repeats `category` verbatim. `path` is `key` with
     * its braces stripped and split on dots, which cost 24% of the payload to say nothing the
     * key does not already say — and a bounded payload is the whole reason these tools exist.
     */
    results: hits.map((token) => ({
      key: token.key,
      name: token.name,
      cssVar: token.cssVar,
      type: token.type,
      value: toResultValue(token.value),
      category: token.category,
    })),
    source: meta.source,
  };
};

/**
 * Thirteen tokens carry an inlined SVG data url, up to 528 characters each, which is enough to
 * make a full result four times the size of the same search over any other category. The head of
 * one still identifies it; nobody reconstructs an icon from a search result.
 */
const MAX_VALUE_LENGTH = 120;

const toResultValue = (value: JsonValue): JsonValue => {
  if (typeof value !== "string" || value.length <= MAX_VALUE_LENGTH) return value;

  return `${value.slice(0, MAX_VALUE_LENGTH)}…`;
};

export const createSearchTokensTool = (
  getStore: () => TokenCatalogStore,
): ToolRegistration => {
  const executeCallback: ToolCallback<typeof searchTokensInputShape> =
    withSafeToolHandler(SEARCH_TOKENS_TOOL_NAME, (input) =>
      toJsonToolResponse(searchTokens(getStore(), input)),
    );

  return defineTool<
    typeof searchTokensInputShape,
    typeof searchTokensOutputShape
  >({
    name: SEARCH_TOKENS_TOOL_NAME,
    config: {
      title: "Search HDS design tokens",
      description: DESCRIPTION,
      inputSchema: searchTokensInputShape,
      outputSchema: searchTokensOutputShape,
      annotations: CATALOG_TOOL_ANNOTATIONS,
    },
    executeCallback,
  });
};

const searchTokensTool = createSearchTokensTool(getOrLoadTokenStore);

export default searchTokensTool;