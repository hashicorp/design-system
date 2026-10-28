/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { afterEach, describe, expect, it, vi } from "vitest";

import { DEMO_BLOCK } from "../../../scripts/build-docs-catalog/assembly.mjs";
import { splitTabs } from "../../../scripts/build-docs-catalog/chunks.mjs";

const matchDemoBlocks = (source) =>
  [...source.matchAll(DEMO_BLOCK)].map(([, reference]) => reference);

describe("DEMO_BLOCK", () => {
  it.each([
    "[[code-snippets/example]]",
    "[[code-snippets/example execute=false]]",
    "[[code-snippets/example expanded=true]]",
    "[[code-snippets/example theming=false]]",
    "[[code-snippets/example execute=true expanded=false theming=true]]",
  ])("matches %s", (marker) => {
    expect(matchDemoBlocks(marker)).toStrictEqual(["code-snippets/example"]);
  });

  it("ignores unknown options", () => {
    expect(matchDemoBlocks("[[code-snippets/example unknown=true]]")).toEqual(
      [],
    );
  });
});

describe("splitTabs", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a single untabbed unit when there are no tab sections", () => {
    expect(splitTabs("route", "# Title\n\nBody")).toStrictEqual([
      { tab: undefined, content: "# Title\n\nBody" },
    ]);
  });

  it("splits tab sections without altering their content", () => {
    const content =
      '<section data-tab="Guidelines">\nA\n</section>\n\n<section data-tab=" Code ">\nB\n</section>';

    expect(splitTabs("route", content)).toStrictEqual([
      { tab: "Guidelines", content: "\nA\n" },
      { tab: "Code", content: "\nB\n" },
    ]);
  });

  it("prepends a leading preamble to every tab", () => {
    const content =
      '\n!!! Info\n\nBanner\n\n!!!\n\n<section data-tab="Guidelines">\nA\n</section>\n<section data-tab="Code">\nB\n</section>';

    expect(splitTabs("route", content)).toStrictEqual([
      { tab: "Guidelines", content: "\n!!! Info\n\nBanner\n\n!!!\n\nA\n" },
      { tab: "Code", content: "\n!!! Info\n\nBanner\n\n!!!\n\nB\n" },
    ]);
  });

  it.each([
    [
      "between tabs",
      '<section data-tab="A">\nA\n</section>\nStray\n<section data-tab="B">\nB\n</section>',
    ],
    ["after the last tab", '<section data-tab="A">\nA\n</section>\nStray'],
  ])("fails on content %s", (_, content) => {
    const exit = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("exit");
    });
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => splitTabs("route", content)).toThrow("exit");
    expect(exit).toHaveBeenCalledWith(1);
  });
});
