/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  normalizeComponentName,
  normalizeLookupValue,
  toComponentRecord,
  toComponentSummary,
} from "../../../../../src/resources/components/store/lookup.js";
import { buildComponentCatalogEntry } from "../../../../support/component-catalog.js";

describe("normalizeLookupValue", () => {
  it("lowercases and trims the value", () => {
    expect(normalizeLookupValue("  Hds::Button  ")).toBe("hds::button");
  });

  it("returns empty string for empty input", () => {
    expect(normalizeLookupValue("")).toBe("");
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
      "advancedtable::th",
    );
    expect(normalizeComponentName("AdvancedTable::Th")).toBe(
      "advancedtable::th",
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
      buildComponentCatalogEntry({ docsPath: undefined, element: undefined }),
    );

    expect(record).not.toHaveProperty("docsPath");
    expect(record).not.toHaveProperty("element");
  });
});

describe("toComponentSummary", () => {
  it("omits docsPath when absent from the record", () => {
    const record = toComponentRecord(
      buildComponentCatalogEntry({ docsPath: undefined }),
    );

    expect(toComponentSummary(record)).not.toHaveProperty("docsPath");
  });
});
