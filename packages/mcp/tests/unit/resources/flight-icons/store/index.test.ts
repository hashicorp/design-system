/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  createIconCatalogStore,
  parseIconCatalog,
} from "../../../../../src/resources/flight-icons/store/index.js";
import { buildIconAsset } from "../../../../support/flight-icon-catalog.js";

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
    expect(() => parseIconCatalog({ assets: [{ id: "incomplete" }] })).toThrow();
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
    });
    expect(store.listIcons()).toHaveLength(2);
    expect(store.listIcons()[0]).not.toHaveProperty("variants");
  });

  it("resolves icon names and variant filenames case-insensitively", () => {
    const store = createIconCatalogStore(catalog);

    expect(store.getIconByName(" ALERT-TRIANGLE ")?.iconName).toBe(
      "alert-triangle",
    );
    expect(store.getIconByName("alert-triangle-24")?.iconName).toBe(
      "alert-triangle",
    );
    expect(store.getIconByName("not-an-icon")).toBeNull();
  });

  it("searches aliases and filters icons", () => {
    const store = createIconCatalogStore(catalog);

    expect(store.searchIcons({ query: "triangle-24", limit: 10 })).toHaveLength(1);
    expect(
      store.searchIcons({
        query: "warning",
        limit: 10,
        category: " ALERTS ",
        size: "24",
        hasMapping: true,
      }),
    ).toHaveLength(1);
    expect(
      store.searchIcons({ query: "arrow", limit: 10, hasMapping: true }),
    ).toHaveLength(0);
    expect(store.searchIcons({ query: "", limit: 1 })).toHaveLength(1);
  });
});
