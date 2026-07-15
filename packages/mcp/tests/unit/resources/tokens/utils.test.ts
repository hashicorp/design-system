/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { toSerializableTokenSummary } from "../../../../src/resources/tokens/utils.js";

import type { TokenSummary } from "../../../../src/resources/tokens/store/lookup.js";

describe("toSerializableTokenSummary", () => {
  it("maps field values correctly", () => {
    const summary: TokenSummary = {
      key: "token-color-palette-blue-200",
      name: "token.color.palette.blue.200",
      type: "color",
      value: "#e8f1ff",
      cssVar: "--token.color.palette.blue.200",
      category: "palette",
      path: ["token", "color", "palette", "blue", "200"],
    };
    const result = toSerializableTokenSummary(summary);

    expect(result).toStrictEqual({
      key: "token-color-palette-blue-200",
      name: "token.color.palette.blue.200",
      type: "color",
      value: "#e8f1ff",
      cssVar: "--token.color.palette.blue.200",
      category: "palette",
      path: ["token", "color", "palette", "blue", "200"],
    });
  });
});
