/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  createTokenCatalogStore,
  parseTokenCatalog,
} from "../../../../src/stores/tokens/index.js";
import { buildTokenCatalogRow } from "../../../support/token-catalog.js";

describe("parseTokenCatalog", () => {
  it("accepts JSON values used by the generated catalog", () => {
    const rows = parseTokenCatalog([
      buildTokenCatalogRow({ $value: 1 }),
      buildTokenCatalogRow({
        key: "{font.family.body}",
        $type: "font-family",
        $value: ["Inter", "sans-serif"],
        name: "token-font-family-body",
        path: ["font", "family", "body"],
      }),
    ]);

    expect(rows).toHaveLength(2);
  });

  it("rejects an invalid catalog row", () => {
    expect(() => parseTokenCatalog([{ name: "token-incomplete" }])).toThrow();
  });
});

describe("createTokenCatalogStore", () => {
  const rows = [
    buildTokenCatalogRow(),
    buildTokenCatalogRow({
      key: "{color.foreground.action}",
      $type: "color",
      $value: "#1060ff",
      name: "token-color-foreground-action",
      attributes: { category: "color" },
      path: ["color", "foreground", "action"],
    }),
  ];

  it("resolves a token by key, dot path, and name", () => {
    const store = createTokenCatalogStore(rows);

    expect(store.getTokenByKey("{COLOR.FOREGROUND.ACTION}")?.key).toBe(
      "{color.foreground.action}",
    );
    expect(store.getTokenByKey("color.foreground.action")?.key).toBe(
      "{color.foreground.action}",
    );
    expect(store.getTokenByKey("token-color-foreground-action")?.key).toBe(
      "{color.foreground.action}",
    );
    expect(store.getTokenByKey("not-a-token")).toBeNull();
  });

  it("resolves a token by its CSS variable name", () => {
    const store = createTokenCatalogStore(rows);

    // cssVar for token-color-foreground-action is --token-color-foreground-action
    expect(store.getTokenByKey("--token-color-foreground-action")?.key).toBe(
      "{color.foreground.action}",
    );
  });

  it("returns summaries without original catalog data", () => {
    const store = createTokenCatalogStore(rows);

    expect(store.getMeta().totalTokenCount).toBe(2);
    expect(store.getMeta().categories).toStrictEqual(["border", "color"]);
    expect(store.listTokens()).toHaveLength(2);
    expect(store.listTokens()[0]).not.toHaveProperty("original");
  });

  it("searches and filters tokens", () => {
    const store = createTokenCatalogStore(rows);

    expect(
      store.searchTokens({ query: "foreground", limit: 10 }).hits,
    ).toHaveLength(1);
    expect(
      store.searchTokens({
        query: "action",
        limit: 10,
        type: "color",
        category: " COLOR ",
      }).hits,
    ).toHaveLength(1);
    expect(store.searchTokens({ query: "token", limit: 1 }).hits).toHaveLength(
      1,
    );
    expect(
      store.searchTokens({
        query: "action",
        limit: 10,
        type: "dimension",
      }).hits,
    ).toHaveLength(0);
  });

  it("counts every match, not just the ones the limit left room for", () => {
    const store = createTokenCatalogStore(rows);
    // both token names start with "token-", so the count outruns the one-result window
    const outcome = store.searchTokens({ query: "token", limit: 1 });

    expect(outcome.totalMatches).toBe(2);
    expect(outcome.hits).toHaveLength(1);
    expect(
      store.searchTokens({ query: "token", limit: 10, type: "color" }),
    ).toStrictEqual({
      totalMatches: 1,
      hits: [expect.objectContaining({ key: "{color.foreground.action}" })],
    });
  });
});
