/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  getTokenLookupKeys,
  normalizeLookupValue,
  normalizeTokenLookupKey,
  toCssVarName,
  toTokenRecord,
  toTokenSummary,
  toTokenType,
} from "../../../../../src/resources/tokens/store/lookup.js";

import type { TokenCatalogRow } from "../../../../../src/resources/tokens/store/schema.js";

const buildRow = (
  overrides: Partial<TokenCatalogRow> = {}
): TokenCatalogRow => ({
  key: "token-color-palette-blue-200",
  $value: "#e8f1ff",
  name: "token.color.palette.blue.200",
  path: ["token", "color", "palette", "blue", "200"],
  attributes: { category: "palette" },
  ...overrides,
});

describe("normalizeLookupValue", () => {
  it("lowercases the value", () => {
    expect(normalizeLookupValue("BLUE")).toBe("blue");
  });

  it("trims leading and trailing whitespace", () => {
    expect(normalizeLookupValue("  blue  ")).toBe("blue");
  });

  it("lowercases and trims together", () => {
    expect(normalizeLookupValue("  Token-Color-BLUE  ")).toBe(
      "token-color-blue"
    );
  });

  it("returns empty string for empty input", () => {
    expect(normalizeLookupValue("")).toBe("");
  });
});

describe("normalizeTokenLookupKey", () => {
  it("lowercases and trims the key", () => {
    expect(normalizeTokenLookupKey("  TOKEN-COLOR-BLUE  ")).toBe(
      "token-color-blue"
    );
  });

  it("strips leading brace", () => {
    expect(normalizeTokenLookupKey("{token-color-blue}")).toBe(
      "token-color-blue"
    );
  });

  it("handles key that already has token- prefix after brace strip", () => {
    expect(normalizeTokenLookupKey("{token-spacing-100}")).toBe(
      "token-spacing-100"
    );
  });

  it("passes through key without braces unchanged (aside from normalization)", () => {
    expect(normalizeTokenLookupKey("token-color-palette-blue-200")).toBe(
      "token-color-palette-blue-200"
    );
  });

  it("returns empty string for empty input", () => {
    expect(normalizeTokenLookupKey("")).toBe("");
  });
});

describe("toTokenType", () => {
  it("returns a known type unchanged", () => {
    expect(toTokenType("color")).toBe("color");
    expect(toTokenType("dimension")).toBe("dimension");
    expect(toTokenType("font-weight")).toBe("font-weight");
    expect(toTokenType("number")).toBe("number");
  });

  it("returns 'other' for undefined", () => {
    expect(toTokenType(undefined)).toBe("other");
  });

  it("returns 'other' for an unrecognized type string", () => {
    expect(toTokenType("gradient")).toBe("other");
    expect(toTokenType("shadow")).toBe("other");
  });

  it("handles leading/trailing whitespace in type value", () => {
    expect(toTokenType("  color  ")).toBe("color");
  });
});

describe("toCssVarName", () => {
  it("prepends -- to the token name", () => {
    expect(toCssVarName("token.color.palette.blue.200")).toBe(
      "--token.color.palette.blue.200"
    );
  });

  it("works with any string", () => {
    expect(toCssVarName("my-token")).toBe("--my-token");
  });
});

describe("toTokenSummary", () => {
  it("maps all fields from a full catalog row", () => {
    const row = buildRow({ $type: "color" });
    const summary = toTokenSummary(row);

    expect(summary).toStrictEqual({
      key: "token-color-palette-blue-200",
      name: "token.color.palette.blue.200",
      type: "color",
      value: "#e8f1ff",
      cssVar: "--token.color.palette.blue.200",
      category: "palette",
      path: ["token", "color", "palette", "blue", "200"],
    });
  });

  it("sets category to null when attributes is absent", () => {
    const row = buildRow({ attributes: undefined });
    const summary = toTokenSummary(row);

    expect(summary.category).toBeNull();
  });

  it("sets category to null when attributes.category is absent", () => {
    const row = buildRow({ attributes: {} });
    const summary = toTokenSummary(row);

    expect(summary.category).toBeNull();
  });

  it("defaults type to 'other' when $type is absent", () => {
    const row = buildRow({ $type: undefined });
    const summary = toTokenSummary(row);

    expect(summary.type).toBe("other");
  });

  it("derives cssVar from name", () => {
    const row = buildRow({ name: "token.spacing.100" });
    const summary = toTokenSummary(row);

    expect(summary.cssVar).toBe("--token.spacing.100");
  });
});

describe("toTokenRecord", () => {
  it("includes original when present on the row", () => {
    const original = {
      $type: "color" as const,
      $value: "#e8f1ff",
      key: "token-color-palette-blue-200",
    };
    const row = buildRow({ $type: "color", original });
    const record = toTokenRecord(row);

    expect(record.original).toStrictEqual(original);
  });

  it("omits original when absent from the row", () => {
    const row = buildRow({ original: undefined });
    const record = toTokenRecord(row);

    expect(record).not.toHaveProperty("original");
  });

  it("includes all summary fields", () => {
    const row = buildRow({ $type: "color" });
    const record = toTokenRecord(row);

    expect(record.key).toBe(row.key);
    expect(record.name).toBe(row.name);
    expect(record.type).toBe("color");
    expect(record.value).toBe(row.$value);
    expect(record.cssVar).toBe(`--${row.name}`);
    expect(record.category).toBe("palette");
    expect(record.path).toStrictEqual(row.path);
  });
});

describe("getTokenLookupKeys", () => {
  it("returns exactly 3 lookup keys per row", () => {
    const row = buildRow();
    const keys = getTokenLookupKeys(row);

    expect(keys).toHaveLength(3);
  });

  it("includes the normalized row key", () => {
    const row = buildRow({ key: "TOKEN-COLOR-BLUE" });
    const keys = getTokenLookupKeys(row);

    expect(keys).toContain("token-color-blue");
  });

  it("includes the normalized dot-joined path", () => {
    const row = buildRow({
      path: ["token", "color", "palette", "blue", "200"],
    });
    const keys = getTokenLookupKeys(row);

    expect(keys).toContain("token.color.palette.blue.200");
  });

  it("includes the normalized row name", () => {
    const row = buildRow({ name: "Token.Color.Palette.Blue.200" });
    const keys = getTokenLookupKeys(row);

    expect(keys).toContain("token.color.palette.blue.200");
  });
});
