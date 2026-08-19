/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from "vitest";
import {
  completeFromAliases,
  withSafeCompletion,
} from "../../../../src/resources/shared/completions.js";

interface TestItem {
  value: string;
  aliases: string[];
}

const items: TestItem[] = [
  { value: "Hds::Button", aliases: ["Hds::Button", "hds/button"] },
  { value: "Hds::Card", aliases: ["Hds::Card", "hds/card"] },
  { value: "Hds::Icon", aliases: ["Hds::Icon", "hds/icon", "flight-icon"] },
];

const complete = (value: string): string[] => {
  return completeFromAliases({
    items,
    getAliases: (item) => item.aliases,
    getValue: (item) => item.value,
    value,
  });
};

describe("completeFromAliases", () => {
  it("returns every value in item order for a blank query", () => {
    expect(complete("")).toStrictEqual([
      "Hds::Button",
      "Hds::Card",
      "Hds::Icon",
    ]);

    expect(complete("   ")).toStrictEqual([
      "Hds::Button",
      "Hds::Card",
      "Hds::Icon",
    ]);
  });

  it("matches any alias case-insensitively as a substring", () => {
    expect(complete("BUTT")).toStrictEqual(["Hds::Button"]);

    expect(complete("hds/")).toStrictEqual([
      "Hds::Button",
      "Hds::Card",
      "Hds::Icon",
    ]);

    expect(complete("FLIGHT-ICON")).toStrictEqual(["Hds::Icon"]);
  });

  it("trims the query before matching", () => {
    expect(complete("  card  ")).toStrictEqual(["Hds::Card"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(complete("zzzz-no-match")).toStrictEqual([]);
  });

  // the SDK transmits only the first 100 but derives `total` and `hasMore` from what it is
  // handed, so a capped list would tell the client the truncation was the whole answer
  it("returns every match past 100 rather than capping", () => {
    const many = Array.from({ length: 150 }, (_unused, index) => ({
      value: `item-${index}`,
      aliases: [`item-${index}`],
    }));

    const matches = completeFromAliases({
      items: many,
      getAliases: (item) => item.aliases,
      getValue: (item) => item.value,
      value: "item-",
    });

    expect(matches).toHaveLength(150);
    expect(matches[0]).toBe("item-0");
    expect(matches[149]).toBe("item-149");
  });

  it("projects aliases for every item", () => {
    const getAliases = vi.fn((item: TestItem) => item.aliases);

    completeFromAliases({
      items,
      getAliases,
      getValue: (item) => item.value,
      value: "",
    });

    expect(getAliases).toHaveBeenCalledTimes(items.length);
  });

  it("returns the projected value rather than the matched alias", () => {
    expect(
      completeFromAliases({
        items,
        getAliases: (item) => item.aliases,
        getValue: (item) => item.aliases[1] ?? "",
        value: "card",
      }),
    ).toStrictEqual(["hds/card"]);
  });
});

describe("withSafeCompletion", () => {
  it("passes the value through to the wrapped completer", () => {
    const complete = vi.fn(() => ["Hds::Card"]);

    expect(
      withSafeCompletion("get_hds_component", complete)("card"),
    ).toStrictEqual(["Hds::Card"]);
    expect(complete).toHaveBeenCalledWith("card");
  });

  it("degrades to an empty list and logs when the catalog is unreadable", () => {
    const error = new Error("Catalog is broken");
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    expect(
      withSafeCompletion("get_hds_component", () => {
        throw error;
      })("card"),
    ).toStrictEqual([]);
    expect(consoleError).toHaveBeenCalledWith(
      "Resource completion failed (get_hds_component):",
      error,
    );

    consoleError.mockRestore();
  });
});
