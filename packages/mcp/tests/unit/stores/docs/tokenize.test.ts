/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  tokenize,
  tokenizeQuery,
} from "../../../../src/stores/docs/tokenize.js";

describe("tokenize", () => {
  it("lowercases and splits on non-alphanumeric characters", () => {
    expect(tokenize("Text::Body")).toStrictEqual(["text", "body"]);
    expect(tokenize("neutral-dark-mode")).toStrictEqual([
      "neutral",
      "dark",
      "mode",
    ]);
  });

  it("keeps a camelCase identifier whole and also splits it", () => {
    // an argument has to answer both a query for its exact name and one for the words in it
    expect(tokenize("@isFullWidth")).toStrictEqual([
      "isfullwidth",
      "full",
      "width",
    ]);
  });

  it("keeps a version string as one token", () => {
    expect(tokenize("## 6.4.0")).toStrictEqual(["6.4.0"]);
    expect(tokenize("added in 2.1")).toStrictEqual(["2.1", "added"]);
  });

  it("drops stopwords and single characters", () => {
    expect(tokenize("how do I use a Button")).toStrictEqual(["use", "button"]);
  });

  it("leaves acronyms whose surface form is the search term unstemmed", () => {
    expect(tokenize("css")).toStrictEqual(["css"]);
    expect(tokenize("scss")).toStrictEqual(["scss"]);
    expect(tokenize("aria")).toStrictEqual(["aria"]);
  });

  it("drops the Hds namespace, which every component in the corpus shares", () => {
    // the namespace is how a component is written, not what distinguishes it
    expect(tokenize("Hds::Tag")).toStrictEqual(tokenize("Tag"));
    expect(tokenize("Hds::Form::TextInput")).toStrictEqual(
      tokenize("Form::TextInput"),
    );
    expect(tokenize("hds-button")).toStrictEqual(tokenize("button"));
    // the class form still answers to itself, only its namespace segment goes
    expect(tokenize("HdsButton")).toStrictEqual(["hdsbutton", "button"]);
  });

  it("keeps a standalone hds, which is a real thing to ask about", () => {
    // dropped only where it is bound to a following segment, so "what is HDS" still searches
    expect(tokenize("hds")).toStrictEqual(["hds"]);
    expect(tokenize("what is HDS")).toStrictEqual(["hds"]);
  });

  it("returns nothing for text with no scorable tokens", () => {
    expect(tokenize("")).toStrictEqual([]);
    expect(tokenize("   -- // ")).toStrictEqual([]);
    expect(tokenize("the and of")).toStrictEqual([]);
  });
});

describe("tokenizeQuery", () => {
  it("deduplicates so a repeated word cannot double its own contribution", () => {
    expect(tokenizeQuery("button button Button")).toStrictEqual(["button"]);
  });

  it("preserves first-seen order of the remaining terms", () => {
    expect(tokenizeQuery("sticky table header table")).toStrictEqual([
      "sticky",
      "table",
      "header",
    ]);
  });
});
