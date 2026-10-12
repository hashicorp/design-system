/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  getComponentLookupKeys,
  normalizeComponentName,
  toComponentRecord,
  toComponentSummary,
} from "../../../../src/stores/components/lookup.js";
import { buildComponentCatalogEntry } from "../../../support/component-catalog.js";

describe("getComponentLookupKeys", () => {
  const keys = getComponentLookupKeys(
    buildComponentCatalogEntry({
      name: "Hds::AdvancedTable::Th",
      modulePath: "hds/advanced-table/th",
    })
  );

  it("accepts the template invocation, with and without the namespace", () => {
    expect(keys).toContain("hds::advancedtable::th");
    expect(keys).toContain("advancedtable::th");
  });

  it("accepts the class name a consumer imports", () => {
    expect(keys).toContain("hdsadvancedtableth");
    expect(keys).toContain("advancedtableth");
  });

  it("accepts the module path, which is the form an import or error message carries", () => {
    expect(keys).toContain("hds/advanced-table/th");
  });

  it("emits every key already lowercased, so lookups can normalize once", () => {
    for (const key of keys) {
      expect(key, key).toBe(key.toLowerCase());
    }
  });

  it("does not collide the bare name with the module path", () => {
    const buttonKeys = getComponentLookupKeys(buildComponentCatalogEntry());

    expect(buttonKeys).toContain("button");
    expect(buttonKeys).toContain("hds/button");
  });
});

describe("normalizeComponentName", () => {
  it("strips the Hds:: namespace prefix", () => {
    expect(normalizeComponentName("Hds::Button")).toBe("button");
  });

  it("leaves a name without the namespace prefix unchanged", () => {
    expect(normalizeComponentName("Button")).toBe("button");
  });

  it("strips only the leading namespace prefix", () => {
    expect(normalizeComponentName("Hds::AdvancedTable::Th")).toBe(
      "advancedtable::th"
    );
    expect(normalizeComponentName("AdvancedTable::Th")).toBe(
      "advancedtable::th"
    );
  });

  it("lowercases and trims before stripping the prefix", () => {
    expect(normalizeComponentName("  HDS::BUTTON  ")).toBe("button");
  });

  it("returns empty string for empty input", () => {
    expect(normalizeComponentName("")).toBe("");
  });
});

describe("toComponentRecord", () => {
  it("maps every field from a full catalog entry", () => {
    const entry = buildComponentCatalogEntry();

    expect(toComponentRecord(entry)).toStrictEqual({
      name: "Hds::Button",
      modulePath: "hds/button",
      docsPath: "components/button",
      element: "HTMLAnchorElement | HTMLButtonElement",
      args: entry.args,
      blocks: entry.blocks,
    });
  });

  it("omits docsPath and element when absent from the entry", () => {
    const record = toComponentRecord(
      buildComponentCatalogEntry({ docsPath: undefined, element: undefined })
    );

    expect(record).not.toHaveProperty("docsPath");
    expect(record).not.toHaveProperty("element");
  });
});

describe("toComponentSummary", () => {
  it("omits docsPath when absent from the record", () => {
    const record = toComponentRecord(
      buildComponentCatalogEntry({ docsPath: undefined })
    );

    expect(toComponentSummary(record)).not.toHaveProperty("docsPath");
  });
});
