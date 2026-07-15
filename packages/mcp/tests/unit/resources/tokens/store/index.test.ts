/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  createTokenCatalogStore,
  parseTokenCatalog,
} from "../../../../../src/resources/tokens/store/index.js";
import { buildTokenCatalogRow } from "../../../../support/token-catalog.js";

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
      "{color.foreground.action}"
    );
    expect(store.getTokenByKey("color.foreground.action")?.key).toBe(
      "{color.foreground.action}"
    );
    expect(store.getTokenByKey("token-color-foreground-action")?.key).toBe(
      "{color.foreground.action}"
    );
    expect(store.getTokenByKey("not-a-token")).toBeNull();
  });

  it("returns summaries without original catalog data", () => {
    const store = createTokenCatalogStore(rows);

    expect(store.getMeta().totalTokenCount).toBe(2);
    expect(store.listTokens()).toHaveLength(2);
    expect(store.listTokens()[0]).not.toHaveProperty("original");
  });

  it("searches and filters tokens", () => {
    const store = createTokenCatalogStore(rows);

    expect(
      store.searchTokens({ query: "foreground", limit: 10 })
    ).toHaveLength(1);
    expect(
      store.searchTokens({
        query: "action",
        limit: 10,
        type: "color",
        category: " COLOR ",
      })
    ).toHaveLength(1);
    expect(
      store.searchTokens({ query: "token", limit: 1 })
    ).toHaveLength(1);
    expect(
      store.searchTokens({
        query: "action",
        limit: 10,
        type: "dimension",
      })
    ).toHaveLength(0);
  });
});
