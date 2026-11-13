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
        key: "{typography.font-stack.text}",
        $type: "font-family",
        $value: ["Inter", "sans-serif"],
        name: "hds-typography-font-stack-text",
        path: ["typography", "font-stack", "text"],
      }),
    ]);

    expect(rows).toHaveLength(2);
  });

  it("rejects an invalid catalog row", () => {
    expect(() => parseTokenCatalog([{ name: "hds-incomplete" }])).toThrow();
  });
});

describe("createTokenCatalogStore", () => {
  const rows = [
    buildTokenCatalogRow(),
    buildTokenCatalogRow({
      key: "{foreground.color.action}",
      $type: "color",
      $value: "#1060ff",
      name: "hds-foreground-color-action",
      attributes: { category: "foreground" },
      path: ["foreground", "color", "action"],
    }),
  ];

  describe("search ranking", () => {
    const rankingRows = [
      // sorts first in the catalog, and merely contains the query
      buildTokenCatalogRow({
        key: "{tooltip.border.radius}",
        name: "hds-tooltip-border-radius",
        attributes: { category: "tooltip" },
        path: ["tooltip", "border", "radius"],
      }),
      buildTokenCatalogRow({
        key: "{border.radius.small}",
        name: "hds-border-radius-small",
        attributes: { category: "border" },
        path: ["border", "radius", "small"],
      }),
    ];

    const search = (query: string): string[] =>
      createTokenCatalogStore(rankingRows)
        .searchTokens({ query, limit: 10 })
        .hits.map((token) => token.name);

    it("puts the token the query names above one that merely contains it", () => {
      expect(search("border-radius")[0]).toBe("hds-border-radius-small");
    });

    it("does not care which delimiter the caller typed", () => {
      // the key uses dots, the CSS variable a caller copies uses hyphens
      for (const query of ["border-radius", "border radius", "border.radius"]) {
        expect(search(query)[0], query).toBe("hds-border-radius-small");
      }
    });

    it("ranks a value-only match below a name match", () => {
      const rows = [
        buildTokenCatalogRow({
          key: "{surface.color.faint}",
          $type: "color",
          $value: "#1060ff",
          name: "hds-surface-color-faint",
          attributes: { category: "surface" },
          path: ["surface", "color", "faint"],
        }),
        buildTokenCatalogRow({
          key: "{foreground.color.action}",
          $type: "color",
          $value: "#f0f0f0",
          name: "hds-foreground-color-action",
          attributes: { category: "foreground" },
          path: ["foreground", "color", "action"],
        }),
      ];
      const hits = createTokenCatalogStore(rows)
        .searchTokens({ query: "foreground", limit: 10 })
        .hits.map((token) => token.name);

      expect(hits[0]).toBe("hds-foreground-color-action");
    });

    it("keeps the best match when the window is too small to hold every match", () => {
      expect(
        createTokenCatalogStore(rankingRows).searchTokens({
          query: "border-radius",
          limit: 1,
        }).hits[0]?.name
      ).toBe("hds-border-radius-small");
    });
  });

  it("resolves a token by key, dot path, and name", () => {
    const store = createTokenCatalogStore(rows);

    expect(store.getTokenByKey("{FOREGROUND.COLOR.ACTION}")?.key).toBe(
      "{foreground.color.action}"
    );
    expect(store.getTokenByKey("foreground.color.action")?.key).toBe(
      "{foreground.color.action}"
    );
    expect(store.getTokenByKey("hds-foreground-color-action")?.key).toBe(
      "{foreground.color.action}"
    );
    expect(store.getTokenByKey("not-a-token")).toBeNull();
  });

  it("resolves a token by its CSS variable name", () => {
    const store = createTokenCatalogStore(rows);

    // cssVar for hds-foreground-color-action is --hds-foreground-color-action
    expect(store.getTokenByKey("--hds-foreground-color-action")?.key).toBe(
      "{foreground.color.action}"
    );
  });

  it("returns summaries without original catalog data", () => {
    const store = createTokenCatalogStore(rows);

    expect(store.getMeta().totalTokenCount).toBe(2);
    expect(store.getMeta().categories).toStrictEqual(["border", "foreground"]);
    expect(store.listTokens()).toHaveLength(2);
    expect(store.listTokens()[0]).not.toHaveProperty("original");
  });

  it("searches and filters tokens", () => {
    const store = createTokenCatalogStore(rows);

    expect(
      store.searchTokens({ query: "foreground", limit: 10 }).hits
    ).toHaveLength(1);
    expect(
      store.searchTokens({
        query: "action",
        limit: 10,
        type: "color",
        category: " FOREGROUND ",
      }).hits
    ).toHaveLength(1);
    expect(store.searchTokens({ query: "hds", limit: 1 }).hits).toHaveLength(
      1
    );
    expect(
      store.searchTokens({
        query: "action",
        limit: 10,
        type: "dimension",
      }).hits
    ).toHaveLength(0);
  });

  it("searches JSON token values, including numbers and arrays", () => {
    const store = createTokenCatalogStore([
      buildTokenCatalogRow({
        key: "{tag.typography.line-height}",
        $type: "number",
        $value: 1.2308,
        name: "hds-tag-typography-line-height",
        attributes: { category: "tag" },
        path: ["tag", "typography", "line-height"],
      }),
      buildTokenCatalogRow({
        key: "{typography.font-stack.text}",
        $type: "font-family",
        $value: ["Inter", "sans-serif"],
        name: "hds-typography-font-stack-text",
        attributes: { category: "typography" },
        path: ["typography", "font-stack", "text"],
      }),
    ]);

    expect(
      store.searchTokens({ query: "1.2308", limit: 10 }).hits.map((token) => token.key),
    ).toStrictEqual(["{tag.typography.line-height}"]);
    expect(
      store.searchTokens({ query: "sans-serif", limit: 10 }).hits.map((token) => token.key),
    ).toStrictEqual(["{typography.font-stack.text}"]);
  });

  it("searches token comments and semantic aliases", () => {
    const store = createTokenCatalogStore([
      buildTokenCatalogRow({
        key: "{foreground.color.action}",
        comment: "Use for interactive text",
        original: { $value: "{core.color.blue-200}" },
      }),
    ]);

    expect(
      store.searchTokens({ query: "interactive text", limit: 10 }).hits[0]?.key,
    ).toBe("{foreground.color.action}");
    expect(
      store.searchTokens({ query: "core.color.blue-200", limit: 10 })
        .hits[0]?.key,
    ).toBe("{foreground.color.action}");
  });

  it("counts every match, not just the ones the limit left room for", () => {
    const store = createTokenCatalogStore(rows);
    // both token names start with "hds-", so the count outruns the one-result window
    const outcome = store.searchTokens({ query: "hds", limit: 1 });

    expect(outcome.totalMatches).toBe(2);
    expect(outcome.hits).toHaveLength(1);
    expect(
      store.searchTokens({ query: "hds", limit: 10, type: "color" })
    ).toStrictEqual({
      totalMatches: 1,
      hits: [expect.objectContaining({ key: "{foreground.color.action}" })],
    });
  });
});
