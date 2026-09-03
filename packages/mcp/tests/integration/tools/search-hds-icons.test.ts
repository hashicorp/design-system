/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
  MAX_QUERY_LENGTH,
  MAX_SEARCH_LIMIT,
} from "../../../src/tools/shared/constants.js";

import { SEARCH_ICONS_TOOL_NAME } from "../../../src/tools/icons/constants.js"
import {
  createSearchIconsTool,
  searchIcons,
  searchIconsInputShape,
} from "../../../src/tools/icons/search-icons.js";
import {
  createIconCatalogStore,
  parseIconCatalog,
} from "../../../src/stores/flight-icons/index.js";
import { MAX_FILTER_LENGTH } from "../../../src/tools/shared/search.js";
import { buildIconAsset } from "../../support/flight-icon-catalog.js";
import { buildRequestHandlerExtra } from "../../support/request-handler.js";
import {
  getToolTextContent,
  parseToolJson,
} from "../../support/tool-content.js";
import { captureToolRegistrations } from "../../support/tool-registration.js";

import type { SearchIconsPayload } from "../../../src/tools/icons/search-icons.js";
import type { RegisteredToolCallback } from "../../support/tool-registration.js";

const store = createIconCatalogStore(
  parseIconCatalog({
    assets: [
      buildIconAsset(),
      buildIconAsset({
        id: "1:2",
        fileName: "alert-triangle-24",
        size: "24",
        width: 24,
        height: 24,
        mapping: "Warning",
      }),
      buildIconAsset({
        id: "2:1",
        fileName: "arrow-right-16",
        iconName: "arrow-right",
        description: "arrow, direction, next",
        category: "Navigation",
      }),
      buildIconAsset({
        id: "3:1",
        fileName: "arrow-left-16",
        iconName: "arrow-left",
        description: "arrow, direction, back",
        category: "Navigation",
      }),
    ],
  }),
);

const search = (
  input: Omit<Parameters<typeof searchIcons>[1], "limit"> & { limit?: number },
): SearchIconsPayload => searchIcons(store, { limit: 10, ...input });

const getRegisteredCallback = (): RegisteredToolCallback => {
  const [registration] = captureToolRegistrations((server) =>
    createSearchIconsTool(() => store).register(server),
  );

  return registration.callback;
};

describe("search_hds_icons payload", () => {
  it("returns the matching icons, with the catalog they came from", () => {
    expect(search({ query: "arrow-left" })).toStrictEqual({
      query: "arrow-left",
      totalMatches: 1,
      returnedMatches: 1,
      truncated: false,
      totalIconCount: 3,
      filters: {},
      unknownFilters: [],
      results: [
        {
          iconName: "arrow-left",
          description: "arrow, direction, back",
          category: "Navigation",
          sizes: ["16"],
          hasMapping: false,
        },
      ],
      source: { version: null, resolvedVia: "default" },
    });
  });

  it("reaches an icon through its description keywords, not just its name", () => {
    // "alert-triangle" contains none of the letters of "caution"; its description does
    expect(
      search({ query: "caution" }).results.map((icon) => icon.iconName),
    ).toStrictEqual(["alert-triangle"]);
  });

  it("answers a miss with an empty result set rather than an error", () => {
    const payload = search({ query: "spaceship" });

    expect(payload.results).toStrictEqual([]);
    expect(payload.totalMatches).toBe(0);
    expect(payload.truncated).toBe(false);
    expect(payload.totalIconCount).toBe(3);
  });

  it("narrows by category and mapping, echoing what it applied", () => {
    const payload = search({ query: "arrow", category: " NAVIGATION " });

    expect(payload.filters).toStrictEqual({ category: " NAVIGATION " });
    expect(payload.unknownFilters).toStrictEqual([]);
    expect(payload.results.map((icon) => icon.iconName)).toStrictEqual([
      "arrow-right",
      "arrow-left",
    ]);
    expect(search({ query: "alert", hasMapping: true }).totalMatches).toBe(1);
    expect(search({ query: "arrow", hasMapping: true }).totalMatches).toBe(0);
  });

  it("names a filter value the catalog does not use, with the ones it does", () => {
    const payload = search({ query: "arrow", category: "Spaceships" });

    expect(payload.unknownFilters).toStrictEqual(["category: Spaceships"]);
    expect(payload.availableCategories).toStrictEqual(["Alerts", "Navigation"]);
    expect(payload.results).toStrictEqual([]);
  });

  it("leaves the valid-value list out when the filter landed", () => {
    expect(search({ query: "arrow", category: "Navigation" })).not.toHaveProperty(
      "availableCategories",
    );
  });

  it("counts every match, not just the ones it returned", () => {
    const payload = search({ query: "arrow", limit: 1 });

    expect(payload.totalMatches).toBe(2);
    expect(payload.returnedMatches).toBe(1);
    expect(payload.truncated).toBe(true);
  });

  it("caps the limit for a caller that skipped the schema", () => {
    const payload = searchIcons(store, {
      query: "",
      limit: Number.MAX_SAFE_INTEGER,
    });

    expect(payload.returnedMatches).toBeLessThanOrEqual(MAX_SEARCH_LIMIT);
    expect(payload.totalMatches).toBe(3);
  });

  it("bounds the query and the filters it echoes back", () => {
    const payload = searchIcons(store, {
      query: "x".repeat(MAX_QUERY_LENGTH + 50),
      limit: 10,
      category: "y".repeat(MAX_FILTER_LENGTH + 50),
    });

    expect(payload.query).toHaveLength(MAX_QUERY_LENGTH);
    expect(payload.filters.category).toHaveLength(MAX_FILTER_LENGTH);
    expect(payload.unknownFilters[0]).toHaveLength(
      "category: ".length + MAX_FILTER_LENGTH,
    );
  });
});

describe("search_hds_icons schema", () => {
  it("defaults the limit and refuses one past the cap", () => {
    const inputSchema = z.object(searchIconsInputShape);

    expect(inputSchema.parse({ query: "arrow" }).limit).toBe(20);
    expect(() =>
      inputSchema.parse({ query: "arrow", limit: MAX_SEARCH_LIMIT + 1 }),
    ).toThrow();
    expect(() =>
      inputSchema.parse({ query: "arrow", category: "x".repeat(MAX_FILTER_LENGTH + 1) }),
    ).toThrow();
  });
});

describe("search_hds_icons tool", () => {
  it("returns the same payload as JSON text and as structured content", async () => {
    const result = await getRegisteredCallback()(
      { query: "arrow", limit: 10 },
      buildRequestHandlerExtra(),
    );

    expect(result.isError).toBeUndefined();
    expect(parseToolJson(getToolTextContent(result))).toStrictEqual(
      result.structuredContent,
    );
    expect(result.structuredContent).toMatchObject({ totalMatches: 2 });
  });

  it("degrades an unreadable catalog to one failed call", async () => {
    const [registration] = captureToolRegistrations((server) =>
      createSearchIconsTool(() => {
        throw new Error("catalog missing");
      }).register(server),
    );
    const result = await registration.callback(
      { query: "arrow", limit: 10 },
      buildRequestHandlerExtra(),
    );

    expect(result.isError).toBe(true);
    expect(getToolTextContent(result)).toContain(SEARCH_ICONS_TOOL_NAME);
  });
});