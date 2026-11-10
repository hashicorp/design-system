/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  getIconLookupKeys,
  toIconRecord,
} from "../../../../src/stores/hds-icons/lookup.js";
import { buildIconAsset } from "../../../support/hds-icon-catalog.js";

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
      carbonIconName: "Warning",
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

  it("takes only a Carbon icon name as a mapping, not a free-text note", () => {
    expect(
      toIconRecord([buildIconAsset({ mapping: "warning--diamond-fill" })])
        .carbonIconName,
    ).toBe("warning--diamond-fill");

    // flight-icons 5.0.0 wrote notes like these into the same field
    for (const note of ["No Carbon equivalent.\nTBD", "Maps to: Folder--shared"]) {
      const record = toIconRecord([buildIconAsset({ mapping: note })]);

      expect(record.hasMapping).toBe(false);
      expect(record).not.toHaveProperty("carbonIconName");
      expect(record.variants[0]).not.toHaveProperty("mapping");
    }
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
