/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  getTokenLookupKeys,
  normalizeTokenLookupKey,
  toCssVarName,
  toTokenAlias,
  toTokenRecord,
  toTokenSummary,
  toTokenType,
} from "../../../../src/stores/tokens/lookup.js";

import type { TokenCatalogRow } from "../../../../src/stores/tokens/schema.js";

const buildRow = (
  overrides: Partial<TokenCatalogRow> = {},
): TokenCatalogRow => ({
  key: "{core.color.blue-200}",
  $value: "#1060ff",
  name: "hds-core-color-blue-200",
  path: ["core", "color", "blue-200"],
  attributes: { category: "core" },
  ...overrides,
});

describe("normalizeTokenLookupKey", () => {
  it("lowercases and trims the key", () => {
    expect(normalizeTokenLookupKey("  HDS-CORE-COLOR-BLUE-200  ")).toBe(
      "hds-core-color-blue-200",
    );
  });

  it("strips leading brace", () => {
    expect(normalizeTokenLookupKey("{core.color.blue-200}")).toBe(
      "core.color.blue-200",
    );
  });

  it("handles key that already has hds- prefix after brace strip", () => {
    expect(normalizeTokenLookupKey("{hds-border-radius-small}")).toBe(
      "hds-border-radius-small",
    );
  });

  it("passes through key without braces unchanged (aside from normalization)", () => {
    expect(normalizeTokenLookupKey("hds-core-color-blue-200")).toBe(
      "hds-core-color-blue-200",
    );
  });

  it("returns empty string for empty input", () => {
    expect(normalizeTokenLookupKey("")).toBe("");
  });

  it("strips a leading -- CSS variable prefix", () => {
    expect(normalizeTokenLookupKey("--hds-core-color-blue-200")).toBe(
      "hds-core-color-blue-200",
    );
  });

  it("strips -- after lowercasing and brace-trimming", () => {
    expect(normalizeTokenLookupKey("  --Hds-Border-Radius-Small  ")).toBe(
      "hds-border-radius-small",
    );
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
    expect(toCssVarName("hds-core-color-blue-200")).toBe(
      "--hds-core-color-blue-200",
    );
  });

  it("works with any string", () => {
    expect(toCssVarName("my-token")).toBe("--my-token");
  });
});

describe("toTokenAlias", () => {
  it("returns an unresolved token reference", () => {
    expect(toTokenAlias({ $value: "{core.color.blue-200}" })).toBe(
      "{core.color.blue-200}",
    );
  });

  it("ignores resolved values", () => {
    expect(toTokenAlias({ $value: "#1060ff" })).toBeUndefined();
    expect(toTokenAlias(undefined)).toBeUndefined();
  });
});

describe("toTokenSummary", () => {
  it("maps all fields from a full catalog row", () => {
    const row = buildRow({ $type: "color" });
    const summary = toTokenSummary(row);

    expect(summary).toStrictEqual({
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
    });
  });

  it("extracts category from attributes", () => {
    const row = buildRow({ attributes: { category: "typography" } });
    const summary = toTokenSummary(row);

    expect(summary.category).toBe("typography");
  });

  it("sets category from attributes.category", () => {
    const row = buildRow({ attributes: { category: "foreground" } });
    const summary = toTokenSummary(row);

    expect(summary.category).toBe("foreground");
  });

  it("defaults type to 'other' when $type is absent", () => {
    const row = buildRow({ $type: undefined });
    const summary = toTokenSummary(row);

    expect(summary.type).toBe("other");
  });

  it("derives cssVar from name", () => {
    const row = buildRow({ name: "hds-border-radius-small" });
    const summary = toTokenSummary(row);

    expect(summary.cssVar).toBe("--hds-border-radius-small");
  });

  it("includes optional comments and semantic aliases", () => {
    const summary = toTokenSummary(
      buildRow({
        comment: "Use for interactive text",
        original: { $value: "{core.color.blue-200}" },
      }),
    );

    expect(summary.comment).toBe("Use for interactive text");
    expect(summary.alias).toBe("{core.color.blue-200}");
  });
});

describe("toTokenRecord", () => {
  it("includes original when present on the row", () => {
    const original = {
      $type: "color" as const,
      $value: "#1060ff",
      key: "{core.color.blue-200}",
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
    expect(record.category).toBe("core");
    expect(record.path).toStrictEqual(row.path);
  });
});

describe("getTokenLookupKeys", () => {
  it("returns exactly 4 lookup keys per row", () => {
    const row = buildRow();
    const keys = getTokenLookupKeys(row);

    expect(keys).toHaveLength(4);
  });

  it("includes the name without its hds- prefix, as the website writes it", () => {
    const keys = getTokenLookupKeys(
      buildRow({ name: "hds-foreground-color-action" }),
    );

    expect(keys).toContain("foreground-color-action");
  });

  it("includes the normalized row key", () => {
    const row = buildRow({ key: "{FOREGROUND.COLOR.ACTION}" });
    const keys = getTokenLookupKeys(row);

    expect(keys).toContain("foreground.color.action");
  });

  it("includes the normalized dot-joined path", () => {
    const row = buildRow({
      path: ["foreground", "color", "action"],
    });
    const keys = getTokenLookupKeys(row);

    expect(keys).toContain("foreground.color.action");
  });

  it("includes the normalized row name", () => {
    const row = buildRow({ name: "HDS-FOREGROUND-COLOR-ACTION" });
    const keys = getTokenLookupKeys(row);

    expect(keys).toContain("hds-foreground-color-action");
  });
});
