/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  buildBm25Index,
  getNameMatchRatio,
  hasTerm,
  scoreBm25,
} from "../../../../../src/tools/docs/store/search-index.js";

import type { WeightedField } from "../../../../../src/tools/docs/store/search-index.js";

const buildIndex = (documents: WeightedField[][]) => buildBm25Index(documents);

describe("buildBm25Index", () => {
  it("indexes array and string fields alike, and ignores an absent one", () => {
    const index = buildIndex([
      [
        { value: "Status", weight: 1 },
        { value: ["chip", "pill"], weight: 1 },
        { value: undefined, weight: 1 },
      ],
    ]);

    expect(hasTerm(index, "status")).toBe(true);
    expect(hasTerm(index, "chip")).toBe(true);
    expect(hasTerm(index, "pill")).toBe(true);
    expect(index.documentCount).toBe(1);
  });

  it("counts each occurrence once per unit of field weight", () => {
    const index = buildIndex([[{ value: "chip", weight: 5 }]]);

    expect(index.documentLengths[0]).toBe(5);
    expect(index.postings.get("chip")).toStrictEqual([
      { documentIndex: 0, frequency: 5 },
    ]);
  });

  it("skips a field with no weight rather than indexing it for free", () => {
    const index = buildIndex([
      [
        { value: "chip", weight: 1 },
        { value: "ignored", weight: 0 },
      ],
    ]);

    expect(hasTerm(index, "ignor")).toBe(false);
    expect(index.documentLengths[0]).toBe(1);
  });

  it("handles an empty document set", () => {
    const index = buildIndex([]);

    expect(index.documentCount).toBe(0);
    expect(index.averageLength).toBe(0);
    expect(scoreBm25(index, ["chip"]).scores).toHaveLength(0);
  });
});

describe("scoreBm25", () => {
  const index = buildIndex([
    [{ value: "chip status label", weight: 1 }],
    [{ value: "button action label", weight: 1 }],
    [{ value: "label label label label label label", weight: 1 }],
  ]);

  it("ranks a rare term above a term every document shares", () => {
    const rare = scoreBm25(index, ["chip"]).scores[0];
    const common = scoreBm25(index, ["label"]).scores[0];

    expect(rare).toBeGreaterThan(common);
  });

  it("scores nothing for a term the index has never seen", () => {
    const { scores, matchedTermsByDocument } = scoreBm25(index, ["snackbar"]);

    expect([...scores]).toStrictEqual([0, 0, 0]);
    expect(matchedTermsByDocument.size).toBe(0);
  });

  it("reports only the documents a term actually reached", () => {
    const { matchedTermsByDocument } = scoreBm25(index, ["chip", "action"]);

    expect([...matchedTermsByDocument.entries()]).toStrictEqual([
      [0, new Set(["chip"])],
      [1, new Set(["action"])],
    ]);
  });

  it("normalizes for length, so a long document does not win on repetition alone", () => {
    const { scores } = scoreBm25(index, ["label"]);

    expect(scores[2]).toBeGreaterThan(scores[0]);
    expect(scores[2]).toBeLessThan(scores[0] * 6);
  });
});

describe("hasTerm", () => {
  it("answers on the term, which is what the query is tokenized into", () => {
    const index = buildIndex([[{ value: "sorting columns", weight: 1 }]]);

    expect(hasTerm(index, "sorting")).toBe(true);
  });
});

describe("getNameMatchRatio", () => {
  it("is 1 only when the query and the name are the same words", () => {
    const advancedTable = new Set(["advanc", "table"]);

    expect(getNameMatchRatio(new Set(["button"]), new Set(["button"]))).toBe(1);
    expect(getNameMatchRatio(advancedTable, new Set(advancedTable))).toBe(1);
  });

  it("penalizes a name carrying a word the query never asked for", () => {
    const exact = getNameMatchRatio(new Set(["button"]), new Set(["button"]));
    const extra = getNameMatchRatio(
      new Set(["button"]),
      new Set(["button", "set"]),
    );

    expect(extra).toBe(0.5);
    expect(extra).toBeLessThan(exact);
  });

  it("fades to nothing as a question grows around the name", () => {
    const question = new Set([
      "show",
      "secret",
      "token",
      "user",
      "reveal",
      "copy",
    ]);

    // a long question mentions a name rather than naming it, so BM25 keeps deciding
    expect(getNameMatchRatio(question, new Set(["reveal"]))).toBeLessThan(0.2);
  });

  it("is 0 when nothing overlaps, or when either side is empty", () => {
    expect(getNameMatchRatio(new Set(["button"]), new Set(["tag"]))).toBe(0);
    expect(getNameMatchRatio(new Set(), new Set(["tag"]))).toBe(0);
    expect(getNameMatchRatio(new Set(["tag"]), new Set())).toBe(0);
  });
});
