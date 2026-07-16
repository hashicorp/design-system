/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  getComponentLookupKeys,
  normalizeComponentName,
  toComponentSummary,
} from "../../../../../src/resources/components/store/lookup.js";
import { buildComponentCatalogComponent } from "../../../../support/component-catalog.js";

describe("normalizeComponentName", () => {
  it("normalizes case, whitespace, and HDS prefixes", () => {
    expect(normalizeComponentName("  HdsButton  ")).toBe("button");
    expect(normalizeComponentName("HDS-Button")).toBe("button");
    expect(normalizeComponentName("hds:button")).toBe("button");
    expect(normalizeComponentName("button")).toBe("button");
  });
});

describe("getComponentLookupKeys", () => {
  it("returns the normalized component name", () => {
    const component = buildComponentCatalogComponent({ name: "HdsButton" });

    expect(getComponentLookupKeys(component)).toStrictEqual(["button"]);
  });
});

describe("toComponentSummary", () => {
  it("returns only component summary fields", () => {
    const component = buildComponentCatalogComponent();

    expect(toComponentSummary(component)).toStrictEqual({
      name: "HdsButton",
      description: "A button component.",
    });
  });
});
