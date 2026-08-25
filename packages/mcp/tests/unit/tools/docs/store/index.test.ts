/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  createDocsCatalogStore,
  parseDocsCatalog,
} from "../../../../../src/tools/docs/store/index.js";
import {
  BADGE_CHUNK_ID,
  BUNDLED_AT,
  BUTTON_ACCESSIBILITY_CHUNK_ID,
  BUTTON_FULL_WIDTH_CHUNK_ID,
  BUTTON_GUIDELINES_CHUNK_ID,
  BUTTON_HOW_TO_CHUNK_ID,
  BUTTON_VERSION_CHUNK_ID,
  COLORS_CHUNK_ID,
  COPY_BUTTON_CHUNK_ID,
  COPY_CHUNK_ID,
  SITE_BASE_URL,
  buildDocsCatalog,
  buildDocsChunk,
  buildDocsPage,
} from "../../../../support/docs-catalog.js";

const buildStore = () => createDocsCatalogStore(buildDocsCatalog());

const search = (query: string, overrides = {}) =>
  buildStore().search({ query, limit: 10, ...overrides });

describe("parseDocsCatalog", () => {
  it("accepts the generated catalog shape", () => {
    const catalog = parseDocsCatalog(buildDocsCatalog());

    expect(Object.keys(catalog.pages)).toHaveLength(5);
    expect(catalog.bundledAt).toBe(BUNDLED_AT);
  });

  it("accepts a chunk with only its required keys", () => {
    const catalog = parseDocsCatalog(
      buildDocsCatalog({
        pages: {
          "components/button": buildDocsPage({
            chunks: [
              buildDocsChunk({
                tab: undefined,
                headingTrail: undefined,
                level: undefined,
                symbols: undefined,
              }),
            ],
          }),
        },
      }),
    );

    expect(catalog.pages["components/button"].chunks).toHaveLength(1);
  });

  it("keeps fields the generator adds that this schema does not name", () => {
    const catalog = parseDocsCatalog({
      ...buildDocsCatalog(),
      generatorVersion: "2",
    });

    expect(catalog.generatorVersion).toBe("2");
  });

  it("rejects a catalog with no provenance", () => {
    expect(() =>
      parseDocsCatalog({ ...buildDocsCatalog(), bundledAt: undefined }),
    ).toThrow();
    expect(() =>
      parseDocsCatalog({ ...buildDocsCatalog(), siteBaseUrl: "" }),
    ).toThrow();
  });

  it("rejects a catalog with no pages record", () => {
    expect(() => parseDocsCatalog({})).toThrow();
    expect(() =>
      parseDocsCatalog({ ...buildDocsCatalog(), pages: "not a record" }),
    ).toThrow();
  });

  it("rejects a page missing a title or a chunks array", () => {
    expect(() =>
      parseDocsCatalog(
        buildDocsCatalog({
          pages: { "components/button": buildDocsPage({ title: "" }) },
        }),
      ),
    ).toThrow();
    expect(() =>
      parseDocsCatalog({
        ...buildDocsCatalog(),
        pages: { "components/button": { route: "components/button" } },
      }),
    ).toThrow();
  });

  it("rejects a chunk with no id or no url", () => {
    expect(() =>
      parseDocsCatalog(
        buildDocsCatalog({
          pages: {
            "components/button": buildDocsPage({
              chunks: [buildDocsChunk({ id: "" })],
            }),
          },
        }),
      ),
    ).toThrow();
    expect(() =>
      parseDocsCatalog({
        ...buildDocsCatalog(),
        pages: {
          "components/button": {
            ...buildDocsPage(),
            chunks: [{ id: "components/button", content: "x", text: "x" }],
          },
        },
      }),
    ).toThrow();
  });

  it("rejects a malformed catalog without partially building a store", () => {
    expect(() => parseDocsCatalog("not a catalog")).toThrow();
    expect(() => parseDocsCatalog(null)).toThrow();
  });

  it("rejects a catalog whose siteBaseUrl is not the documented site", () => {
    expect(() =>
      parseDocsCatalog({
        ...buildDocsCatalog(),
        siteBaseUrl: "http://docs-helios.attacker.example/",
      }),
    ).toThrow();
  });

  it("rejects a chunk url pointing anywhere but the documented site", () => {
    expect(() =>
      parseDocsCatalog(
        buildDocsCatalog({
          pages: {
            "components/button": buildDocsPage({
              chunks: [
                buildDocsChunk({
                  url: "http://docs-helios.attacker.example/components/button",
                }),
              ],
            }),
          },
        }),
      ),
    ).toThrow();
  });

  it("rejects a page url pointing anywhere but the documented site", () => {
    expect(() =>
      parseDocsCatalog(
        buildDocsCatalog({
          pages: {
            "components/button": buildDocsPage({
              url: "https://helios.hashicorp.design.attacker.example/components/button",
            }),
          },
        }),
      ),
    ).toThrow();
  });

  // the trailing slash is what makes the pin an origin check rather than a prefix check
  it("rejects a host that merely starts with the site's name", () => {
    expect(() =>
      parseDocsCatalog({
        ...buildDocsCatalog(),
        siteBaseUrl: "https://helios.hashicorp.design.attacker.example/",
      }),
    ).toThrow();
    expect(SITE_BASE_URL).toBe("https://helios.hashicorp.design/");
  });
});

describe("getMeta", () => {
  it("reports provenance and the size of the corpus behind it", () => {
    expect(buildStore().getMeta()).toStrictEqual({
      bundledAt: BUNDLED_AT,
      siteBaseUrl: SITE_BASE_URL,
      totalPageCount: 5,
      totalChunkCount: 9,
    });
  });
});

describe("getChunkById", () => {
  it("resolves a chunk id, tolerating stray casing and slashes", () => {
    const store = buildStore();

    expect(store.getChunkById(BUTTON_FULL_WIDTH_CHUNK_ID)?.id).toBe(
      BUTTON_FULL_WIDTH_CHUNK_ID,
    );
    expect(
      store.getChunkById(`  /${BUTTON_FULL_WIDTH_CHUNK_ID.toUpperCase()}/  `)
        ?.id,
    ).toBe(BUTTON_FULL_WIDTH_CHUNK_ID);
  });

  it("returns null for an id the catalog does not hold", () => {
    expect(buildStore().getChunkById("components/button#code/nope")).toBeNull();
  });
});

describe("getPageByRoute", () => {
  it("resolves a page by its route", () => {
    expect(buildStore().getPageByRoute("components/badge")?.title).toBe(
      "Badge",
    );
  });

  it("returns null for an unknown route", () => {
    expect(buildStore().getPageByRoute("components/snackbar")).toBeNull();
  });
});

describe("getChildChunks", () => {
  it("returns the passages nested under a heading", () => {
    expect(
      buildStore()
        .getChildChunks(BUTTON_HOW_TO_CHUNK_ID)
        .map((chunk) => chunk.id),
    ).toStrictEqual([BUTTON_FULL_WIDTH_CHUNK_ID]);
  });

  it("does not claim a neighbouring page whose route it prefixes", () => {
    const store = buildStore();

    // "components/copy" prefixes "components/copy/button", so id matching alone is not enough
    expect(store.getChunkById(COPY_BUTTON_CHUNK_ID)).not.toBeNull();
    expect(store.getChildChunks(COPY_CHUNK_ID)).toStrictEqual([]);
  });

  it("returns nothing for a leaf, and nothing for an unknown id", () => {
    const store = buildStore();

    expect(store.getChildChunks(BUTTON_FULL_WIDTH_CHUNK_ID)).toStrictEqual([]);
    expect(store.getChildChunks("components/nope#code")).toStrictEqual([]);
  });
});

describe("suggestChunkIds", () => {
  it("lists the page's own passages when the route resolves", () => {
    expect(
      buildStore().suggestChunkIds("components/button#code/made-up"),
    ).toStrictEqual([
      BUTTON_GUIDELINES_CHUNK_ID,
      BUTTON_HOW_TO_CHUNK_ID,
      BUTTON_FULL_WIDTH_CHUNK_ID,
      BUTTON_ACCESSIBILITY_CHUNK_ID,
      BUTTON_VERSION_CHUNK_ID,
    ]);
  });

  it("falls back to the ids sharing the longest prefix", () => {
    expect(buildStore().suggestChunkIds("components/bad")).toContain(
      BADGE_CHUNK_ID,
    );
  });

  it("returns nothing when the id shares no prefix with the corpus", () => {
    expect(buildStore().suggestChunkIds("zzz")).toStrictEqual([]);
  });
});

describe("listSections and listTabs", () => {
  it("reports the values a filter will accept", () => {
    const store = buildStore();

    expect(store.listSections()).toStrictEqual(["components", "foundations"]);
    expect(store.listTabs()).toStrictEqual([
      "Accessibility",
      "Code",
      "Guidelines",
      "Version history",
    ]);
  });
});

describe("search", () => {
  it("ranks the passage that names the query above the rest of its page", () => {
    const outcome = search("full width");

    expect(outcome.hits[0].chunk.id).toBe(BUTTON_FULL_WIDTH_CHUNK_ID);
    expect(outcome.hits[0].relScore).toBe(1);
  });

  it("finds a page through a keyword that appears nowhere in its prose", () => {
    const outcome = search("chip");

    expect(outcome.hits[0].chunk.id).toBe(BADGE_CHUNK_ID);
    expect(outcome.hits[0].pageMatchedTerms).toStrictEqual(["chip"]);
  });

  it("reports a query term the corpus has never seen", () => {
    const outcome = search("snackbar");

    expect(outcome.totalMatches).toBe(0);
    expect(outcome.hits).toStrictEqual([]);
    expect(outcome.matchedTerms).toStrictEqual([]);
    expect(outcome.unmatchedTerms).toStrictEqual(["snackbar"]);
  });

  it("returns nothing at all for a query that is only stopwords", () => {
    const outcome = search("the and of");

    expect(outcome.totalMatches).toBe(0);
    expect(outcome.matchedTerms).toStrictEqual([]);
    expect(outcome.unmatchedTerms).toStrictEqual([]);
  });

  it("counts every match but returns only the requested number", () => {
    const outcome = search("button", { limit: 2 });

    expect(outcome.hits).toHaveLength(2);
    expect(outcome.totalMatches).toBeGreaterThan(2);
  });

  it("caps the passages a page-metadata-only match can contribute", () => {
    // "cta" is a keyword and appears in no chunk, so every passage on the page ties
    const outcome = search("cta");

    expect(outcome.totalMatches).toBe(3);
    expect(outcome.hits.map((hit) => hit.chunk.id)).toStrictEqual([
      BUTTON_GUIDELINES_CHUNK_ID,
      BUTTON_HOW_TO_CHUNK_ID,
      BUTTON_FULL_WIDTH_CHUNK_ID,
    ]);
  });

  it("scopes to a section without changing how terms are weighted", () => {
    const outcome = search("color combination", { section: "Foundations" });

    expect(outcome.filters).toStrictEqual({ section: "foundations" });
    expect(outcome.unknownFilters).toStrictEqual([]);
    expect(outcome.hits.map((hit) => hit.chunk.id)).toStrictEqual([
      COLORS_CHUNK_ID,
    ]);
  });

  it("scopes to a route prefix, which is the component catalog's docsPath", () => {
    const outcome = search("copy", { docsPath: "components/copy" });

    expect(outcome.hits.map((hit) => hit.chunk.id).sort()).toStrictEqual([
      COPY_CHUNK_ID,
      COPY_BUTTON_CHUNK_ID,
    ]);
  });

  it("scopes to a tab", () => {
    const outcome = search("button", { tab: "accessibility" });

    expect(outcome.hits.map((hit) => hit.chunk.id)).toStrictEqual([
      BUTTON_ACCESSIBILITY_CHUNK_ID,
    ]);
  });

  it("names a filter that matches nothing in the catalog", () => {
    const outcome = search("button", {
      section: "nope",
      tab: "Nope",
      docsPath: "components/nope",
    });

    expect(outcome.unknownFilters).toStrictEqual([
      "section: nope",
      "tab: Nope",
      "docsPath: components/nope",
    ]);
    expect(outcome.hits).toStrictEqual([]);
  });

  it("reports a filter that normalizes to nothing without applying it", () => {
    const outcome = search("button", {
      docsPath: "/",
      section: "  ",
      tab: " ",
    });

    expect(outcome.filters).toStrictEqual({});
    expect(outcome.unknownFilters).toStrictEqual([
      "section:   ",
      "tab:  ",
      "docsPath: /",
    ]);
    expect(outcome.hits.length).toBeGreaterThan(0);
  });

  it("demotes version history unless the caller asked for that tab", () => {
    const demoted = search("2.1.0");
    const scoped = search("2.1.0", { tab: "Version history" });

    expect(demoted.hits[0].chunk.id).toBe(BUTTON_VERSION_CHUNK_ID);
    expect(scoped.hits[0].chunk.id).toBe(BUTTON_VERSION_CHUNK_ID);
    expect(scoped.hits[0].score).toBeGreaterThan(demoted.hits[0].score);
  });

  it("orders identical scores by catalog order, so a repeat is byte-identical", () => {
    const first = search("cta");
    const second = search("cta");

    expect(first.hits.map((hit) => hit.chunk.id)).toStrictEqual(
      second.hits.map((hit) => hit.chunk.id),
    );
    expect(first.hits.map((hit) => hit.score)).toStrictEqual(
      second.hits.map((hit) => hit.score),
    );
  });

  it("carries a snippet built from the scoring text, not the raw markdown", () => {
    const [hit] = search("full width").hits;

    expect(hit.snippet).toBe(hit.chunk.text);
    expect(hit.snippet).not.toContain("```");
  });
});
