/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  createIconCatalogStore,
  parseIconCatalog,
} from "../../../../src/stores/hds-icons/index.js";
import { buildIconAsset } from "../../../support/hds-icon-catalog.js";

describe("parseIconCatalog", () => {
  it("accepts the generated catalog shape", () => {
    const catalog = parseIconCatalog({
      lastRunFigma: {
        id: "file-id",
        page: "Export",
        excludeFrames: [],
      },
      assets: [buildIconAsset()],
    });

    expect(catalog.assets).toHaveLength(1);
  });

  it("rejects an invalid catalog asset", () => {
    expect(() =>
      parseIconCatalog({ assets: [{ id: "incomplete" }] })
    ).toThrow();
  });
});

describe("createIconCatalogStore", () => {
  const catalog = parseIconCatalog({
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
    ],
  });

  it("reports metadata and returns summaries without variants", () => {
    const store = createIconCatalogStore(catalog);

    expect(store.getMeta()).toStrictEqual({
      totalIconCount: 2,
      totalAssetCount: 3,
      categories: ["Alerts", "Navigation"],
      source: { version: null, resolvedVia: "default" },
    });
    expect(store.listIcons()).toHaveLength(2);
    expect(store.listIcons()[0]).not.toHaveProperty("variants");
  });

  it("resolves icon names and variant filenames case-insensitively", () => {
    const store = createIconCatalogStore(catalog);

    expect(store.getIconByName(" ALERT-TRIANGLE ")?.iconName).toBe(
      "alert-triangle"
    );
    expect(store.getIconByName("alert-triangle-24")?.iconName).toBe(
      "alert-triangle"
    );
    expect(store.getIconByName("not-an-icon")).toBeNull();
  });

  describe("search ranking", () => {
    const rankingCatalog = {
      assets: [
        // sorts first in the catalog, and only contains the query as a prefix of a longer name
        buildIconAsset({
          id: "3:1",
          fileName: "arrow-right-circle-16",
          iconName: "arrow-right-circle",
          description: "arrow, circle",
          category: "Navigation",
        }),
        buildIconAsset({
          id: "2:1",
          fileName: "arrow-right-16",
          iconName: "arrow-right",
          description: "arrow, direction, next",
          category: "Navigation",
        }),
        buildIconAsset({
          id: "1:1",
          fileName: "alert-triangle-16",
          iconName: "alert-triangle",
          description: "alert, warning, caution",
          category: "Alerts",
        }),
      ],
    };

    const search = (query: string): string[] =>
      createIconCatalogStore(rankingCatalog)
        .searchIcons({ query, limit: 10 })
        .hits.map((icon) => icon.iconName);

    it("puts the icon the query names above one that merely extends it", () => {
      expect(search("arrow-right")[0]).toBe("arrow-right");
    });

    it("does not care which delimiter the caller typed", () => {
      expect(search("arrow right")[0]).toBe("arrow-right");
    });

    it("ranks a description-keyword match below a name match", () => {
      // "warning" reaches alert-triangle only through its description, so it must not
      // outrank an icon actually named for the query
      expect(search("warning")).toStrictEqual(["alert-triangle"]);
      expect(search("arrow")[0]).toBe("arrow-right");
    });

    it("keeps the best match when the window is too small to hold every match", () => {
      expect(
        createIconCatalogStore(rankingCatalog).searchIcons({
          query: "arrow-right",
          limit: 1,
        }).hits[0]?.iconName
      ).toBe("arrow-right");
    });
  });

  it("searches aliases and filters icons", () => {
    const store = createIconCatalogStore(catalog);

    expect(
      store.searchIcons({ query: "triangle-24", limit: 10 }).hits
    ).toHaveLength(1);
    expect(
      store.searchIcons({
        query: "warning",
        limit: 10,
        category: " ALERTS ",
        hasMapping: true,
      }).hits
    ).toHaveLength(1);
    expect(
      store.searchIcons({ query: "arrow", limit: 10, hasMapping: true }).hits
    ).toHaveLength(0);
    expect(store.searchIcons({ query: "", limit: 1 }).hits).toHaveLength(1);
  });

  it("counts every match, not just the ones the limit left room for", () => {
    const store = createIconCatalogStore(catalog);
    // an empty query matches the blob of both icons, so the count outruns the window
    const outcome = store.searchIcons({ query: "", limit: 1 });

    expect(outcome).toStrictEqual({
      totalMatches: 2,
      hits: [expect.objectContaining({ iconName: "alert-triangle" })],
    });
    // the filtered count is the filtered total, not the catalog total
    expect(
      store.searchIcons({ query: "", limit: 10, category: "Navigation" })
    ).toStrictEqual({
      totalMatches: 1,
      hits: [expect.objectContaining({ iconName: "arrow-right" })],
    });
  });
});
