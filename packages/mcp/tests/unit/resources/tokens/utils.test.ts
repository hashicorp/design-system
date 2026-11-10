/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { toSerializableTokenSummary } from "../../../../src/resources/tokens/utils.js";

import type { TokenSummary } from "../../../../src/stores/tokens/lookup.js";

describe("toSerializableTokenSummary", () => {
  it("maps field values correctly", () => {
    const summary: TokenSummary = {
      key: "{core.color.blue-200}",
      name: "hds-core-color-blue-200",
      type: "color",
      value: "#1060ff",
      cssVar: "--hds-core-color-blue-200",
      category: "core",
      attributes: {
        category: "core",
      },
      path: ["core", "color", "blue-200"],
    };
    const result = toSerializableTokenSummary(summary);

    expect(result).toStrictEqual({
      key: "{core.color.blue-200}",
      name: "hds-core-color-blue-200",
      type: "color",
      value: "#1060ff",
      cssVar: "--hds-core-color-blue-200",
      category: "core",
      path: ["core", "color", "blue-200"],
    });
  });
});
