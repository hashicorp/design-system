/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
  MAX_FILTER_LENGTH,
  clampFilterValue,
  clampSearchLimit,
  collectUnknownFilters,
  searchCountsOutputShape,
  searchLimitSchema,
} from "../../../../src/tools/shared/search.js";

describe("clampFilterValue", () => {
  it("bounds a value that is echoed back, and leaves a short one alone", () => {
    expect(clampFilterValue("components/button")).toBe("components/button");
    expect(clampFilterValue("x".repeat(MAX_FILTER_LENGTH + 100))).toHaveLength(
      MAX_FILTER_LENGTH,
    );
  });
});

describe("clampSearchLimit", () => {
  it("holds a limit inside the window a caller is allowed", () => {
    expect(clampSearchLimit(8, 25)).toBe(8);
    expect(clampSearchLimit(0, 25)).toBe(1);
    expect(clampSearchLimit(-5, 25)).toBe(1);
    expect(clampSearchLimit(1_000, 25)).toBe(25);
    expect(clampSearchLimit(Number.MAX_SAFE_INTEGER, 50)).toBe(50);
  });

  it("truncates a fractional limit rather than slicing on one", () => {
    expect(clampSearchLimit(2.9, 25)).toBe(2);
  });
});

describe("searchLimitSchema", () => {
  it("defaults, bounds, and says both numbers in its description", () => {
    const schema = searchLimitSchema(50, 20);

    expect(schema.parse(undefined)).toBe(20);
    expect(schema.parse(50)).toBe(50);
    expect(() => schema.parse(51)).toThrow();
    expect(() => schema.parse(0)).toThrow();
    expect(() => schema.parse(2.5)).toThrow();
    expect(schema.description).toBe(
      "Maximum results to return (1-50). Defaults to 20.",
    );
  });
});

describe("searchCountsOutputShape", () => {
  it("declares the three counts that tell a full window from a cut one", () => {
    expect(Object.keys(searchCountsOutputShape)).toStrictEqual([
      "totalMatches",
      "returnedMatches",
      "truncated",
    ]);
    expect(
      z
        .object(searchCountsOutputShape)
        .parse({ totalMatches: 9, returnedMatches: 4, truncated: true }),
    ).toStrictEqual({ totalMatches: 9, returnedMatches: 4, truncated: true });
  });
});

describe("collectUnknownFilters", () => {
  const known = ["Alerts", "Navigation"];

  it("says nothing about a filter that was not passed", () => {
    expect(
      collectUnknownFilters([{ name: "category", value: undefined, known }]),
    ).toStrictEqual([]);
  });

  it("compares the way the stores filter, so a valid value never reads as unknown", () => {
    expect(
      collectUnknownFilters([{ name: "category", value: " ALERTS ", known }]),
    ).toStrictEqual([]);
  });

  it("names an unknown value, and echoes it as the caller wrote it", () => {
    expect(
      collectUnknownFilters([{ name: "category", value: "Spaceships", known }]),
    ).toStrictEqual(["category: Spaceships"]);
  });

  it("reports every filter that missed, in the order it was given", () => {
    expect(
      collectUnknownFilters([
        { name: "category", value: "Spaceships", known },
        { name: "size", value: "16", known: ["16", "24"] },
        { name: "size", value: "9", known: ["16", "24"] },
      ]),
    ).toStrictEqual(["category: Spaceships", "size: 9"]);
  });

  it("treats a whitespace-only value as unknown rather than silently dropping it", () => {
    // it would filter nothing out, so a caller must be told it did not do what they asked
    expect(
      collectUnknownFilters([{ name: "category", value: "   ", known }]),
    ).toStrictEqual(["category:    "]);
  });
});
