/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  MAX_FILTER_LENGTH,
  clampFilterValue,
  clampSearchLimit,
  collectUnknownFilters,
} from "../../../src/tools/search.js";

describe("search helpers", () => {
  it("clamps limits to an integer within the supported range", () => {
    expect(clampSearchLimit(-1, 50)).toBe(1);
    expect(clampSearchLimit(2.9, 50)).toBe(2);
    expect(clampSearchLimit(100, 50)).toBe(50);
  });

  it("bounds filter values", () => {
    expect(clampFilterValue("x".repeat(MAX_FILTER_LENGTH + 1))).toHaveLength(
      MAX_FILTER_LENGTH,
    );
  });

  it("identifies unknown filters case-insensitively", () => {
    expect(
      collectUnknownFilters([
        { name: "category", value: " COLOR ", known: ["color"] },
        { name: "size", value: "32", known: ["16", "24"] },
        { name: "type", value: undefined, known: ["color"] },
      ]),
    ).toStrictEqual(["size: 32"]);
  });
});
