/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  MAX_SENT_NAME_LENGTH,
  toComponentNameForm,
  toHdsComponentName,
  toKnownFilterValue,
  toQueryShape,
  toUnknownFilterKinds,
} from "../../../src/telemetry/sanitize.js";

describe("toComponentNameForm", () => {
  it.each([
    ["Hds::Button", "invocation"],
    ["hds::form::text-input", "other"],
    ["Hds::Form::TextInput", "invocation"],
    ["hds/form/text-input", "module"],
    ["HdsFormTextInput", "class"],
    ["button", "other"],
    ["Hds::", "other"],
    ["<Hds::Button />", "other"],
  ])("classifies %s as %s", (value, form) => {
    expect(toComponentNameForm(value)).toBe(form);
  });
});

describe("toHdsComponentName", () => {
  it.each([
    ["Hds::Button", "Hds::Button"],
    ["  Hds::Button  ", "Hds::Button"],
    ["hds::form::textInput", "Hds::Form::TextInput"],
    ["hds/form/text-input", "Hds::Form::TextInput"],
    ["hds/select/multi", "Hds::Select::Multi"],
    ["HdsFormTextInput", "HdsFormTextInput"],
    ["hdsbutton", "HdsButton"],
  ])("sends %s as %s", (value, expected) => {
    expect(toHdsComponentName(value)).toBe(expected);
  });

  it.each([
    ["a bare name", "button"],
    ["another library's component", "AcmeBillingTable"],
    [
      "free text that mentions a component",
      "the Hds::Button in our billing page",
    ],
    ["markup", '<Hds::Button @text="Save" />'],
    ["an argument", "Hds::Button @color"],
    ["a path outside hds", "acme/hds/button"],
    ["an empty namespace", "Hds::"],
    ["an empty string", ""],
  ])("never sends %s", (_label, value) => {
    expect(toHdsComponentName(value)).toBeNull();
  });

  it("never sends a name longer than the cap", () => {
    const atCap = `Hds::${"A".repeat(MAX_SENT_NAME_LENGTH - 5)}`;
    const overCap = `${atCap}B`;

    expect(toHdsComponentName(atCap)).toBe(atCap);
    expect(toHdsComponentName(overCap)).toBeNull();
  });
});

describe("toQueryShape", () => {
  it("reduces a query to its length and word count", () => {
    expect(toQueryShape("  sticky table   header ")).toStrictEqual({
      queryLength: 21,
      queryWordCount: 3,
    });
  });

  it("counts an empty query as no words", () => {
    expect(toQueryShape("   ")).toStrictEqual({
      queryLength: 0,
      queryWordCount: 0,
    });
  });
});

describe("toUnknownFilterKinds", () => {
  it("keeps only the declared kinds, sorted and deduplicated", () => {
    expect(
      toUnknownFilterKinds(
        ["tab: Acme Internal", "section: acme", "tab: other", "secret: x"],
        ["section", "tab", "docsPath"],
      ),
    ).toBe("section,tab");
  });

  it("returns null when every filter landed", () => {
    expect(toUnknownFilterKinds([], ["category"])).toBeNull();
  });
});

describe("toKnownFilterValue", () => {
  it("sends a filter value the tool resolved", () => {
    expect(toKnownFilterValue("tab", "code", ["section: acme"])).toBe("code");
  });

  it("never sends a filter value the tool reported as unknown", () => {
    expect(toKnownFilterValue("section", "acme", ["section: acme"])).toBeNull();
  });

  it("sends nothing when the filter was not set", () => {
    expect(toKnownFilterValue("tab", undefined, [])).toBeNull();
  });
});
