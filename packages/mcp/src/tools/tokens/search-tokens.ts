/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";
import { SEARCH_TOKENS_TOOL_NAME } from './constants.js';
import { CATALOG_TOOL_ANNOTATIONS, defineTool } from "../define-tool.js";
import catalogSourceOutputSchema from "../output-schema.js";
import {
  toJsonToolResponse,
  withSafeToolHandler,
} from "../responses.js";
import {
  MAX_FILTER_LENGTH,
  clampFilterValue,
  clampSearchLimit,
  collectUnknownFilters,
  searchCountsOutputShape,
  searchLimitSchema,
} from "../search.js";
import {
  DEFAULT_SEARCH_LIMIT,
  MAX_QUERY_LENGTH,
  MAX_SEARCH_LIMIT,
} from "../constants.js";
import { getOrLoadTokenStore } from "../../stores/tokens/index.js";
import { TOKEN_TYPES } from "../../stores/tokens/schema.js";

import type { JsonValue } from "../../types.js";
import type { ToolRegistration } from "../define-tool.js";
import type { TokenCatalogStore } from "../../stores/tokens/index.js";
import type { TokenType } from "../../stores/tokens/schema.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

export const searchTokensInputShape = {
  query: z
    .string()
    .min(1)
    .describe(
      "Token name fragment or value, e.g. 'foreground-color-action', 'border radius', 'blue-200' or '#1060ff'. Matched as a case-insensitive substring against the token key, its CSS variable name, its dotted path and its value in every theme.",
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
      "Restrict to one token category, e.g. 'foreground', 'border' or 'typography'. A value the catalog does not use comes back in unknownFilters alongside the categories that exist.",
    ),
};

const searchTokensResultShape = z.object({
  // the catalog key, in braces: {foreground.color.action}
  key: z.string(),
  name: z.string(),
  // the name to use in CSS: var(--hds-foreground-color-action)
  cssVar: z.string(),
  type: z.enum(TOKEN_TYPES),
  // the value in the default theme
  value: z.json(),
  // the value in each theme, e.g. { default, cds-g0, cds-g10, cds-g90, cds-g100 }; absent on a
  // token the tokens package does not theme
  modes: z.record(z.string(), z.json()).optional(),
  category: z.string(),
  comment: z.string().optional(),
  // the unresolved semantic reference in the default theme, e.g. {core.color.blue-200}
  alias: z.string().optional(),
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
  "Every result carries the cssVar to write in a stylesheet — var(--hds-foreground-color-action) — so use this to replace a hard-coded color, spacing or radius with the token that holds it.",
  "A token that changes with the theme also carries `modes`, its value in each theme (default, cds-g0, cds-g10, cds-g90 and cds-g100); the cssVar resolves to the right one at runtime.",
  "The query matches the token value in every theme too, so searching a hex code finds which token already defines it, including a value from a Carbon theme.",
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
      ...(token.modes === undefined
        ? {}
        : { modes: toResultModes(token.modes) }),
      category: token.category,
      ...(token.comment === undefined ? {} : { comment: token.comment }),
      ...(token.alias === undefined ? {} : { alias: token.alias }),
    })),
    source: meta.source,
  };
};

/**
 * Twenty tokens carry an inlined SVG data url, up to 528 characters each, which is enough to
 * make a full result four times the size of the same search over any other category. The head of
 * one still identifies it; nobody reconstructs an icon from a search result. Only data urls are
 * cut: a font stack is about as long as the head kept here, and is only useful whole.
 */
const MAX_DATA_URL_LENGTH = 120;

const DATA_URL = /^url\(["']?data:/u;

const toResultValue = (value: JsonValue): JsonValue => {
  if (
    typeof value !== "string" ||
    !DATA_URL.test(value) ||
    value.length <= MAX_DATA_URL_LENGTH
  ) {
    return value;
  }

  return `${value.slice(0, MAX_DATA_URL_LENGTH)}…`;
};

const toResultModes = (
  modes: Record<string, JsonValue>,
): Record<string, JsonValue> => {
  return Object.fromEntries(
    Object.entries(modes).map(([mode, value]) => [mode, toResultValue(value)]),
  );
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
