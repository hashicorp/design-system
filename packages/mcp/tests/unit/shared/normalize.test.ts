/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { normalizeLookupValue } from "../../../src/shared/normalize.js";

describe("normalizeLookupValue", () => {
  it("trims and lowercases, so a caller's casing and padding never matter", () => {
    expect(normalizeLookupValue("  Hds::Button  ")).toBe("hds::button");
    expect(normalizeLookupValue("")).toBe("");
  });
});
