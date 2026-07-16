/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  getIconLookupKeys,
  normalizeLookupValue,
  toIconRecord,
} from "../../../../../src/resources/flight-icons/store/lookup.js";
import { buildIconAsset } from "../../../../support/flight-icon-catalog.js";

describe("normalizeLookupValue", () => {
  it("trims and lowercases lookup values", () => {
    expect(normalizeLookupValue(" Alert-Triangle ")).toBe("alert-triangle");
  });
});

describe("toIconRecord", () => {
  it("groups and sorts variants while retaining optional mappings", () => {
    const record = toIconRecord([
      buildIconAsset({
        id: "1:2",
        fileName: "alert-triangle-24",
        size: "24",
        width: 24,
        height: 24,
        mapping: "Warning",
      }),
      buildIconAsset(),
    ]);

    expect(record).toStrictEqual({
      iconName: "alert-triangle",
      description: "alert, warning, caution",
      category: "Alerts",
      sizes: ["16", "24"],
      hasMapping: true,
      variants: [
        {
          id: "1:1",
          fileName: "alert-triangle-16",
          size: "16",
          width: 16,
          height: 16,
        },
        {
          id: "1:2",
          fileName: "alert-triangle-24",
          size: "24",
          width: 24,
          height: 24,
          mapping: "Warning",
        },
      ],
    });
  });

  it("uses the first non-empty description", () => {
    const record = toIconRecord([
      buildIconAsset({ description: "" }),
      buildIconAsset({ description: " warning " }),
    ]);

    expect(record.description).toBe("warning");
  });

  it("rejects an empty asset group", () => {
    expect(() => toIconRecord([])).toThrow(
      "Cannot create icon record from an empty assets array.",
    );
  });

  it("creates normalized name and filename lookup keys", () => {
    const record = toIconRecord([buildIconAsset()]);

    expect(getIconLookupKeys(record)).toStrictEqual([
      "alert-triangle",
      "alert-triangle-16",
    ]);
  });
});
