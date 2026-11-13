/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
  MAX_QUERY_LENGTH,
  MAX_SEARCH_LIMIT,
} from "../../../src/tools/constants.js";
import { SEARCH_TOKENS_TOOL_NAME } from "../../../src/tools/tokens/constants.js";
import {
  createSearchTokensTool,
  searchTokens,
  searchTokensInputShape,
  searchTokensOutputSchema,
} from "../../../src/tools/tokens/search-tokens.js";
import { createTokenCatalogStore } from "../../../src/stores/tokens/index.js";
import { createTokenMigrations } from "../../../src/stores/tokens/migrations.js";
import { MAX_FILTER_LENGTH } from "../../../src/tools/search.js";
import { buildTokenCatalogRow } from "../../support/token-catalog.js";
import { buildRequestHandlerExtra } from "../../support/request-handler.js";
import {
  getToolTextContent,
  parseToolJson,
} from "../../support/tool-content.js";
import { captureToolRegistrations } from "../../support/tool-registration.js";

import type { SearchTokensPayload } from "../../../src/tools/tokens/search-tokens.js";
import type { RegisteredToolCallback } from "../../support/tool-registration.js";

const store = createTokenCatalogStore([
  buildTokenCatalogRow(),
  buildTokenCatalogRow({
    key: "{foreground.color.action}",
    $type: "color",
    $value: "#1060ff",
    name: "hds-foreground-color-action",
    attributes: { category: "foreground" },
    path: ["foreground", "color", "action"],
  }),
  buildTokenCatalogRow({
    key: "{foreground.color.strong}",
    $type: "color",
    $value: "#0c0c0e",
    name: "hds-foreground-color-strong",
    comment: "Use for high-emphasis text",
    attributes: { category: "foreground" },
    path: ["foreground", "color", "strong"],
    original: {
      $type: "color",
      $value: "{core.color.neutral-700}",
      key: "{foreground.color.strong}",
    },
  }),
]);

const search = (
  input: Omit<Parameters<typeof searchTokens>[1], "limit"> & { limit?: number },
): SearchTokensPayload => searchTokens(store, { limit: 10, ...input });

const getRegisteredCallback = (): RegisteredToolCallback => {
  const [registration] = captureToolRegistrations((server) =>
    createSearchTokensTool(() => store).register(server),
  );

  return registration.callback;
};

describe("search_hds_tokens payload", () => {
  it("returns the matching tokens with the CSS variable to write", () => {
    expect(search({ query: "foreground-color-action" })).toStrictEqual({
      query: "foreground-color-action",
      totalMatches: 1,
      returnedMatches: 1,
      truncated: false,
      totalTokenCount: 3,
      filters: {},
      unknownFilters: [],
      results: [
        {
          key: "{foreground.color.action}",
          name: "hds-foreground-color-action",
          cssVar: "--hds-foreground-color-action",
          type: "color",
          value: "#1060ff",
          category: "foreground",
        },
      ],
      source: { version: null, resolvedVia: "default" },
    });
  });

  it("drops the raw attributes and the path, which only repeat the key", () => {
    const [token] = search({ query: "foreground-color-action" }).results;

    expect(token).not.toHaveProperty("attributes");
    expect(token).not.toHaveProperty("path");
    expect(token).not.toHaveProperty("original");
  });

  it("finds a token by the value it holds, not just by its name", () => {
    expect(
      search({ query: "#1060ff" }).results.map((token) => token.key),
    ).toStrictEqual(["{foreground.color.action}"]);
  });

  it("returns and searches token comments and semantic aliases", () => {
    const [token] = search({ query: "high-emphasis" }).results;

    expect(token).toMatchObject({
      key: "{foreground.color.strong}",
      comment: "Use for high-emphasis text",
      alias: "{core.color.neutral-700}",
    });
    expect(
      search({ query: "core.color.neutral-700" }).results.map(
        (result) => result.key,
      ),
    ).toStrictEqual(["{foreground.color.strong}"]);
  });

  it("does not turn delimiter-only queries into a catalog browse", () => {
    const payload = search({ query: "-" });

    expect(payload.totalMatches).toBe(0);
    expect(payload.results).toStrictEqual([]);
  });

  it("answers a miss with an empty result set rather than an error", () => {
    const payload = search({ query: "hds-foreground-color-nonexistent" });

    expect(payload.results).toStrictEqual([]);
    expect(payload.totalMatches).toBe(0);
    expect(payload.truncated).toBe(false);
    expect(payload.totalTokenCount).toBe(3);
  });

  it("narrows by type and category, echoing what it applied", () => {
    const payload = search({
      query: "hds",
      type: "color",
      category: " FOREGROUND ",
    });

    expect(payload.filters).toStrictEqual({
      type: "color",
      category: " FOREGROUND ",
    });
    expect(payload.unknownFilters).toStrictEqual([]);
    expect(payload.totalMatches).toBe(2);
    expect(search({ query: "hds", type: "dimension" }).totalMatches).toBe(1);
  });

  it("names a category the catalog does not use, with the ones it does", () => {
    const payload = search({ query: "hds", category: "motion" });

    expect(payload.unknownFilters).toStrictEqual(["category: motion"]);
    expect(payload.availableCategories).toStrictEqual(["border", "foreground"]);
    expect(payload.results).toStrictEqual([]);
  });

  it("leaves the valid-value list out when the filter landed", () => {
    expect(search({ query: "hds", category: "foreground" })).not.toHaveProperty(
      "availableCategories",
    );
  });

  it("counts every match, not just the ones it returned", () => {
    const payload = search({ query: "hds", limit: 1 });

    expect(payload.totalMatches).toBe(3);
    expect(payload.returnedMatches).toBe(1);
    expect(payload.truncated).toBe(true);
  });

  it("caps the limit for a caller that skipped the schema", () => {
    const payload = searchTokens(store, {
      query: "hds",
      limit: Number.MAX_SAFE_INTEGER,
    });

    expect(payload.returnedMatches).toBeLessThanOrEqual(MAX_SEARCH_LIMIT);
    expect(payload.totalMatches).toBe(3);
  });

  it("bounds the query and the category it echoes back", () => {
    const payload = searchTokens(store, {
      query: "x".repeat(MAX_QUERY_LENGTH + 50),
      limit: 10,
      category: "y".repeat(MAX_FILTER_LENGTH + 50),
    });

    expect(payload.query).toHaveLength(MAX_QUERY_LENGTH);
    expect(payload.filters.category).toHaveLength(MAX_FILTER_LENGTH);
  });
});

describe("search_hds_tokens old token names", () => {
  const migratedStore = createTokenCatalogStore(
    [
      buildTokenCatalogRow({
        key: "{foreground.color.action}",
        $type: "color",
        $value: "#1060ff",
        name: "hds-foreground-color-action",
        attributes: { category: "foreground" },
        path: ["foreground", "color", "action"],
      }),
    ],
    undefined,
    createTokenMigrations({
      version: "6.0.0",
      renamedTokens: [
        {
          before: "--token-color-foreground-action",
          after: "--hds-foreground-color-action",
        },
      ],
      removedTokens: ["--token-tooltip-focus-offset"],
    }),
  );
  const migratedSearch = (query: string): SearchTokensPayload =>
    searchTokens(migratedStore, { query, limit: 10 });

  it("answers a renamed token with its replacement, and returns the replacement", () => {
    const payload = migratedSearch("var(--token-color-foreground-action)");

    expect(payload.query).toBe("var(--token-color-foreground-action)");
    expect(payload.migration).toStrictEqual({
      before: "--token-color-foreground-action",
      after: "--hds-foreground-color-action",
      version: "6.0.0",
    });
    expect(payload.results.map((token) => token.name)).toStrictEqual([
      "hds-foreground-color-action",
    ]);
  });

  it("says a removed token was removed", () => {
    const payload = migratedSearch("--token-tooltip-focus-offset");

    expect(payload.migration).toStrictEqual({
      before: "--token-tooltip-focus-offset",
      removed: true,
      version: "6.0.0",
    });
    expect(payload.results).toStrictEqual([]);
  });

  it("leaves migration off an ordinary search", () => {
    expect(migratedSearch("foreground")).not.toHaveProperty("migration");
  });
});

describe("search_hds_tokens schema", () => {
  it("defaults the limit, caps it, and closes the type filter over the known types", () => {
    const inputSchema = z.object(searchTokensInputShape);

    expect(inputSchema.parse({ query: "color" }).limit).toBe(20);
    expect(() =>
      inputSchema.parse({ query: "color", limit: MAX_SEARCH_LIMIT + 1 }),
    ).toThrow();
    expect(inputSchema.parse({ query: "color", type: "color" }).type).toBe(
      "color",
    );
    // an unknown type is a schema rejection, so it never reaches unknownFilters
    expect(() =>
      inputSchema.parse({ query: "color", type: "colour" }),
    ).toThrow();
  });
});

describe("search_hds_tokens tool", () => {
  it("returns the same payload as JSON text and as structured content", async () => {
    const result = await getRegisteredCallback()(
      { query: "foreground", limit: 10 },
      buildRequestHandlerExtra(),
    );

    expect(result.isError).toBeUndefined();
    expect(parseToolJson(getToolTextContent(result))).toStrictEqual(
      result.structuredContent,
    );
    expect(searchTokensOutputSchema.parse(result.structuredContent)).toStrictEqual(
      result.structuredContent,
    );
    expect(result.structuredContent).toMatchObject({ totalMatches: 2 });
  });

  it("degrades an unreadable catalog to one failed call", async () => {
    const [registration] = captureToolRegistrations((server) =>
      createSearchTokensTool(() => {
        throw new Error("catalog missing");
      }).register(server),
    );
    const result = await registration.callback(
      { query: "color", limit: 10 },
      buildRequestHandlerExtra(),
    );

    expect(result.isError).toBe(true);
    expect(getToolTextContent(result)).toContain(SEARCH_TOKENS_TOOL_NAME);
  });
});
