/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import { loadIconCatalog } from "../../../src/stores/hds-icons/index.js";

describe("Flight icon catalog", () => {
  it("loads the generated package catalog and resolves lookup aliases", () => {
    const store = loadIconCatalog();
    const icon = store.listIcons()[0];

    expect(store.getMeta().totalIconCount).toBeGreaterThan(0);
    expect(store.getMeta().totalAssetCount).toBeGreaterThan(0);
    expect(icon).toBeDefined();

    if (icon === undefined) {
      throw new Error("Expected at least one Flight icon");
    }

    const detail = store.getIconByName(icon.iconName);
    const fileName = detail?.variants[0]?.fileName;

    expect(detail?.iconName).toBe(icon.iconName);
    expect(fileName).toBeDefined();

    if (fileName !== undefined) {
      expect(store.getIconByName(fileName)?.iconName).toBe(icon.iconName);
    }
  });

  // the mapping format is the flight-icons sync script's, so a change to it must fail here
  it("reads every Carbon mapping the package declares as a Carbon icon name", () => {
    const require = createRequire(import.meta.url);
    const { assets } = JSON.parse(
      readFileSync(
        require.resolve("@hashicorp/flight-icons/catalog.json"),
        "utf8",
      ),
    ) as { assets: { iconName: string; mapping?: string }[] };
    const mapped = new Set(
      assets
        .filter((asset) => asset.mapping !== undefined)
        .map((asset) => asset.iconName),
    );
    const store = loadIconCatalog();

    expect(mapped.size).toBeGreaterThan(0);
    expect(
      store
        .listIcons()
        .filter((icon) => icon.carbonIconName !== undefined)
        .map((icon) => icon.iconName)
        .sort(),
    ).toStrictEqual([...mapped].sort());
  });

  it("finds an icon by its Carbon name without outranking an icon's own name", () => {
    const store = loadIconCatalog();
    const top = (query: string) =>
      store.searchIcons({ query, limit: 1 }).hits[0]?.iconName;

    // `x` maps to Carbon `Close`, `archive` to Carbon `Box`
    expect(store.getIconByName("x")?.carbonIconName).toBe("Close");
    expect(top("Close")).toBe("x");
    expect(top("box")).toBe("box");
  });
});
