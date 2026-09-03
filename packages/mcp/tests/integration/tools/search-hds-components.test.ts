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
import { SEARCH_COMPONENTS_TOOL_NAME } from "../../../src/tools/components/constants.js";
import {
  createSearchComponentsTool,
  searchComponents,
  searchComponentsInputShape,
} from "../../../src/tools/components/search-components.js";
import { createComponentCatalogStore } from "../../../src/stores/components/index.js";
import { buildComponentCatalogEntry } from "../../support/component-catalog.js";
import { buildRequestHandlerExtra } from "../../support/request-handler.js";
import {
  getToolTextContent,
  parseToolJson,
} from "../../support/tool-content.js";
import { captureToolRegistrations } from "../../support/tool-registration.js";

import type { SearchComponentsPayload } from "../../../src/tools/components/search-components.js";
import type { RegisteredToolCallback } from "../../support/tool-registration.js";

const buildEntry = (name: string, modulePath: string, docsPath: string) =>
  buildComponentCatalogEntry({
    name,
    modulePath,
    docsPath,
    args: [],
    blocks: [],
  });

const store = createComponentCatalogStore({
  components: [
    buildComponentCatalogEntry(),
    buildEntry("Hds::CopyButton", "hds/copy/button", "components/copy/button"),
    buildEntry(
      "Hds::AdvancedTable::Th",
      "hds/advanced-table/th",
      "components/table/advanced-table",
    ),
    buildEntry("Hds::Flyout", "hds/flyout", "components/flyout"),
  ],
});

const search = (input: {
  query: string;
  limit?: number;
}): SearchComponentsPayload => searchComponents(store, { limit: 10, ...input });

const getRegisteredCallback = (): RegisteredToolCallback => {
  const [registration] = captureToolRegistrations((server) =>
    createSearchComponentsTool(() => store).register(server),
  );

  return registration.callback;
};

describe("search_hds_components payload", () => {
  it("returns the matching components, with the catalog they came from", () => {
    expect(search({ query: "flyout" })).toStrictEqual({
      query: "flyout",
      totalMatches: 1,
      returnedMatches: 1,
      truncated: false,
      totalComponentCount: 4,
      results: [
        {
          name: "Hds::Flyout",
          modulePath: "hds/flyout",
          docsPath: "components/flyout",
        },
      ],
      source: { version: null, resolvedVia: "default" },
    });
  });

  it("answers a miss with an empty result set rather than an error", () => {
    const payload = search({ query: "datepicker" });

    expect(payload.results).toStrictEqual([]);
    expect(payload.totalMatches).toBe(0);
    expect(payload.truncated).toBe(false);
    // the catalog size is still reported, so a miss is legible as "not in these 4"
    expect(payload.totalComponentCount).toBe(4);
  });

  it("counts every match, not just the ones it returned", () => {
    // Hds::Button and Hds::CopyButton both match; the window holds one
    const payload = search({ query: "button", limit: 1 });

    expect(payload.totalMatches).toBe(2);
    expect(payload.returnedMatches).toBe(1);
    expect(payload.truncated).toBe(true);
    expect(payload.results).toHaveLength(1);
  });

  it("does not claim truncation when the window was never filled", () => {
    const payload = search({ query: "button", limit: 10 });

    expect(payload.totalMatches).toBe(2);
    expect(payload.returnedMatches).toBe(2);
    expect(payload.truncated).toBe(false);
  });

  it("caps the limit for a caller that skipped the schema", () => {
    const payload = searchComponents(store, {
      query: "hds",
      limit: Number.MAX_SAFE_INTEGER,
    });

    expect(payload.returnedMatches).toBeLessThanOrEqual(MAX_SEARCH_LIMIT);
    // and the honest total still names everything that matched
    expect(payload.totalMatches).toBe(4);
  });

  it("floors a limit below one rather than returning nothing", () => {
    expect(
      searchComponents(store, { query: "hds", limit: 0 }).returnedMatches,
    ).toBe(1);
  });

  it("truncates an oversized query instead of refusing it", () => {
    const payload = searchComponents(store, {
      query: `flyout${"x".repeat(MAX_QUERY_LENGTH)}`,
      limit: 10,
    });

    // the echo names what was actually searched for, so it can never amplify the input
    expect(payload.query).toHaveLength(MAX_QUERY_LENGTH);
  });
});

describe("search_hds_components schema", () => {
  it("defaults the limit and refuses one past the cap", () => {
    const inputSchema = z.object(searchComponentsInputShape);

    expect(inputSchema.parse({ query: "button" }).limit).toBe(20);
    expect(() =>
      inputSchema.parse({ query: "button", limit: MAX_SEARCH_LIMIT + 1 }),
    ).toThrow();
    expect(() => inputSchema.parse({ query: "" })).toThrow();
  });
});

describe("search_hds_components tool", () => {
  it("returns the same payload as JSON text and as structured content", async () => {
    const result = await getRegisteredCallback()(
      { query: "flyout", limit: 10 },
      buildRequestHandlerExtra(),
    );

    expect(result.isError).toBeUndefined();
    expect(parseToolJson(getToolTextContent(result))).toStrictEqual(
      result.structuredContent,
    );
    expect(result.structuredContent).toMatchObject({ totalMatches: 1 });
  });

  it("degrades an unreadable catalog to one failed call", async () => {
    const [registration] = captureToolRegistrations((server) =>
      createSearchComponentsTool(() => {
        throw new Error("catalog missing");
      }).register(server),
    );
    const result = await registration.callback(
      { query: "flyout", limit: 10 },
      buildRequestHandlerExtra(),
    );

    expect(result.isError).toBe(true);
    expect(getToolTextContent(result)).toContain(SEARCH_COMPONENTS_TOOL_NAME);
  });
});
