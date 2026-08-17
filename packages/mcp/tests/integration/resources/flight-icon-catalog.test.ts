/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { loadIconCatalog } from "../../../src/resources/flight-icons/store/index.js";

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
});
