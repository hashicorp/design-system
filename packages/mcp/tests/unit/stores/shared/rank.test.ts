/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  RANK_BLOB,
  RANK_EXACT,
  RANK_IDENTITY,
  RANK_NONE,
  RANK_PREFIX,
  RANK_SEGMENT,
  getCommonPrefixLength,
  scoreEntry,
  scoreIdentity,
  searchRanked,
} from "../../../../src/stores/shared/rank.js";

import type { RankableEntry } from "../../../../src/stores/shared/rank.js";

interface Row {
  id: string;
  keywords: string;
}

const buildRows = (...ids: string[]): Row[] =>
  ids.map((id) => ({ id, keywords: "" }));

const toRankable = (row: Row): RankableEntry => ({
  identities: [row.id],
  blob: `${row.id} ${row.keywords}`.toLowerCase(),
});

const rank = (rows: Row[], query: string, limit = 10): string[] =>
  searchRanked({ records: rows, query, limit, toRankable }).hits.map(
    (row) => row.id
  );

describe("scoreIdentity", () => {
  it("grades a match by how much of the identity the query accounts for", () => {
    expect(scoreIdentity("button", "button")).toBe(RANK_EXACT);
    expect(scoreIdentity("button-set", "button")).toBe(RANK_PREFIX);
    expect(scoreIdentity("hds::form::field", "form")).toBe(RANK_SEGMENT);
    expect(scoreIdentity("copybutton", "button")).toBe(RANK_IDENTITY);
    expect(scoreIdentity("flyout", "button")).toBe(RANK_NONE);
  });

  it("treats every delimiter the catalogs use as a segment boundary", () => {
    // `::` in an invocation, `/` in a module path, `-` in a token or icon name, `.` in a key
    expect(scoreIdentity("hds::advanced-table::th", "th")).toBe(RANK_SEGMENT);
    expect(scoreIdentity("hds/advanced-table/th", "th")).toBe(RANK_SEGMENT);
    expect(scoreIdentity("token-color-foreground-action", "foreground")).toBe(
      RANK_SEGMENT,
    );
    expect(scoreIdentity("color.foreground.action", "foreground")).toBe(
      RANK_SEGMENT,
    );
  });

  it("scores the same regardless of which delimiter the caller typed", () => {
    // a token key uses dots, the CSS variable a caller copies uses hyphens
    for (const query of ["border-radius", "border radius", "border.radius"]) {
      expect(scoreIdentity("border.radius.small", query), query).toBe(
        RANK_PREFIX,
      );
    }

    expect(scoreIdentity("hds::advanced-table::th", "advanced table")).toBe(
      RANK_SEGMENT,
    );
    expect(scoreIdentity("hds::button", "hds/button")).toBe(RANK_EXACT);
  });

  it("keeps a multi-word query a phrase rather than loose terms", () => {
    // `radius.small` is a run of segments here; `radius.large` is not a run with `small`
    expect(scoreIdentity("border.radius.small", "radius small")).toBe(
      RANK_SEGMENT,
    );
    expect(scoreIdentity("border.radius.large", "radius small")).toBe(
      RANK_NONE,
    );
  });
});

describe("scoreEntry", () => {
  it("takes the best identity, not the first", () => {
    const entry: RankableEntry = {
      identities: ["hds::button", "button", "hds/button"],
      blob: "",
    };

    expect(scoreEntry(entry, "button").score).toBe(RANK_EXACT);
  });

  it("falls back to the blob so a keyword-only hit still counts", () => {
    const entry: RankableEntry = {
      identities: ["alert-triangle"],
      blob: "alert-triangle warning caution danger",
    };

    expect(scoreEntry(entry, "caution").score).toBe(RANK_BLOB);
    expect(scoreEntry(entry, "spaceship").score).toBe(RANK_NONE);
  });

  it("reports the shortest identity that earned the winning score", () => {
    const entry: RankableEntry = {
      identities: ["form::field", "hds::form::field"],
      blob: "",
    };

    // both are segment matches; the tiebreak needs the shorter of the two
    expect(scoreEntry(entry, "field")).toStrictEqual({
      score: RANK_SEGMENT,
      identityLength: "form::field".length,
    });
  });
});

describe("searchRanked", () => {
  it("puts the entry that IS the query above the ones that merely contain it", () => {
    // the regression this ranking exists for: `form` matched 55 components and returned the
    // 20 alphabetically-first, none of which was `Hds::Form`
    const rows = buildRows(
      "hds::form::character-count",
      "hds::form::checkbox::base",
      "hds::form",
      "hds::form::label"
    );

    expect(rank(rows, "hds::form")[0]).toBe("hds::form");
  });

  it("orders exact above prefix above segment above substring above keyword", () => {
    const rows: Row[] = [
      { id: "copybutton", keywords: "" },
      { id: "button-set", keywords: "" },
      { id: "hds::form::button", keywords: "" },
      { id: "button", keywords: "" },
      { id: "flyout", keywords: "button dismiss" },
    ];

    expect(rank(rows, "button")).toStrictEqual([
      "button",
      "button-set",
      "hds::form::button",
      "copybutton",
      "flyout",
    ]);
  });

  it("breaks a tie on the shorter name, then on catalog order", () => {
    const rows = buildRows("arrow-right", "arrow-left", "arrow-up");

    // all three are prefix matches, so length decides, and `right`/`left` cannot both win
    expect(rank(rows, "arrow")).toStrictEqual([
      "arrow-up",
      "arrow-left",
      "arrow-right",
    ]);
  });

  it("returns the same order for the same query every time", () => {
    const rows = buildRows("alpha-one", "alpha-two", "alpha-six");

    expect(rank(rows, "alpha")).toStrictEqual(rank(rows, "alpha"));
  });

  it("counts every match but returns only the window", () => {
    const rows = buildRows("form", "form-a", "form-b", "form-c");
    const outcome = searchRanked({
      records: rows,
      query: "form",
      limit: 2,
      toRankable,
    });

    expect(outcome.totalMatches).toBe(4);
    expect(outcome.hits).toHaveLength(2);
    // the window is the top of the ranking, not an arbitrary slice
    expect(outcome.hits[0].id).toBe("form");
  });

  it("applies the domain filter before scoring, so counts reflect it", () => {
    const rows = buildRows("form", "form-a", "flyout");
    const outcome = searchRanked({
      records: rows,
      query: "form",
      limit: 10,
      toRankable,
      matches: (row) => row.id !== "form-a",
    });

    expect(outcome.totalMatches).toBe(1);
    expect(outcome.hits.map((row) => row.id)).toStrictEqual(["form"]);
  });

  it("treats an all-whitespace query as a browse that keeps catalog order", () => {
    const rows = buildRows("zebra", "apple", "mango");

    expect(rank(rows, "   ")).toStrictEqual(["zebra", "apple", "mango"]);
  });

  it("ignores surrounding whitespace and casing in the query", () => {
    const rows = buildRows("hds::button", "hds::button-set");

    expect(rank(rows, "  HDS::Button  ")[0]).toBe("hds::button");
  });
});

describe("getCommonPrefixLength", () => {
  it("measures how far two keys agree from the left", () => {
    // `hds::butt` survives; the two diverge at the doubled `t`
    expect(getCommonPrefixLength("hds::button", "hds::buton")).toBe(8);
    expect(getCommonPrefixLength("button", "button")).toBe(6);
    expect(getCommonPrefixLength("button", "flyout")).toBe(0);
    expect(getCommonPrefixLength("", "button")).toBe(0);
  });
});
