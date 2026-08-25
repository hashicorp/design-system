/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getMcpPackageDirectory } from "../../../src/shared/project-root.js";
import {
  DEFAULT_READ_MAX_BYTES,
  DOCS_CATALOG_FILE_NAME,
  DOCS_TABS,
  SITE_BASE_URL,
  SNIPPET_MAX_LENGTH,
} from "../../../src/tools/docs/constants.js";
import { readDoc } from "../../../src/tools/docs/read-doc.js";
import { searchDocs } from "../../../src/tools/docs/search-docs.js";
import {
  getOrLoadDocsStore,
  loadDocsCatalog,
  parseDocsCatalog,
} from "../../../src/stores/docs/index.js";
import {
  getToolTextContent,
  parseToolJson,
} from "../../support/tool-content.js";

const store = getOrLoadDocsStore();

// the store hands out one chunk at a time; these checks are about the corpus as a whole
const catalog = parseDocsCatalog(
  JSON.parse(
    readFileSync(
      join(getMcpPackageDirectory(), DOCS_CATALOG_FILE_NAME),
      "utf8",
    ),
  ),
);
const allChunks = Object.values(catalog.pages).flatMap((page) => page.chunks);

// the same fence rule the generator splits on: a comment inside an example is the example's
const FENCED_CODE =
  /^[ \t]*(?:```|~~~)[^\n]*\n([\s\S]*?)^[ \t]*(?:```|~~~)[ \t]*$/gm;
const GTS_BLOCK = /^[ \t]*```gts\b[^\n]*\n([\s\S]*?)^[ \t]*```[ \t]*$/gm;
const TEMPLATE_FENCE = /^[ \t]*```(?:gts|handlebars)([^\n]*)$/gm;

const matchAll = (source: string, pattern: RegExp): RegExpExecArray[] => {
  const matches: RegExpExecArray[] = [];
  let match: RegExpExecArray | null;

  pattern.lastIndex = 0;

  while ((match = pattern.exec(source)) !== null) matches.push(match);

  return matches;
};

const RANKING_CASES: { query: string; route: string }[] = [
  { query: "button", route: "components/button" },
  { query: "Hds::Tag", route: "components/tag" },
  { query: "Hds::Button", route: "components/button" },
  { query: "toast notification", route: "components/toast" },
  { query: "how do I make a button full width", route: "components/button" },
  { query: "flyout vs modal", route: "components/flyout" },
  { query: "sticky table header", route: "components/table/advanced-table" },
  { query: "advanced table sorting", route: "components/table/advanced-table" },
  { query: "copy text to clipboard", route: "components/copy/button" },
  { query: "keyboard navigation for dropdown", route: "components/dropdown" },
  { query: "empty state illustration", route: "components/application-state" },
  { query: "vertically center items with flex", route: "layouts/flex" },
  { query: "responsive breakpoints", route: "foundations/breakpoints" },
  {
    query: "color contrast accessibility requirements",
    route: "foundations/colors",
  },
  { query: "design principles", route: "about/principles" },
  { query: "design system overview", route: "about/overview" },
];

const COMPARISON_CASES: { query: string; routes: string[] }[] = [
  {
    query: "when should I use a modal versus a flyout",
    routes: ["components/modal", "components/flyout"],
  },
  {
    query: "alert vs toast",
    routes: ["components/alert", "components/toast"],
  },
  {
    query: "badge or tag",
    routes: ["components/badge", "components/tag"],
  },
];

// the vocabulary a developer arrives with, which lives only in a page's keywords
const SYNONYM_CASES: { query: string; route: string }[] = [
  { query: "chip", route: "components/badge" },
  { query: "drawer", route: "components/flyout" },
  { query: "datagrid", route: "components/table/table" },
];

const search = (query: string, overrides = {}) =>
  searchDocs(store, { query, limit: 8, ...overrides });

describe("generated docs catalog", () => {
  it("loads the committed corpus and reports its provenance", () => {
    const meta = store.getMeta();

    expect(meta.totalPageCount).toBe(92);
    expect(meta.totalChunkCount).toBeGreaterThan(2_000);
    expect(meta.siteBaseUrl).toBe("https://helios.hashicorp.design/");
    expect(Number.isNaN(Date.parse(meta.bundledAt))).toBe(false);
  });

  it("memoizes the store, and rebuilds on an explicit load", () => {
    expect(getOrLoadDocsStore()).toBe(store);
    expect(loadDocsCatalog()).not.toBe(store);
  });

  it("uses exactly the tabs the tool description advertises", () => {
    expect(store.listTabs()).toStrictEqual([...DOCS_TABS]);
  });

  it("keeps every route inside the documented sections", () => {
    expect(store.listSections()).toStrictEqual([
      "about",
      "components",
      "content",
      "foundations",
      "getting-started",
      "icons",
      "layouts",
      "overrides",
      "patterns",
      "utilities",
      "whats-new",
    ]);
  });
});

describe("ranking against the real corpus", () => {
  for (const { query, route } of RANKING_CASES) {
    it(`ranks ${route} first for "${query}"`, () => {
      const [top] = search(query).results;

      expect(top.route).toBe(route);
      expect(top.relScore).toBe(1);
      expect(top.url.startsWith("https://helios.hashicorp.design/")).toBe(true);
    });
  }

  for (const { query, routes } of COMPARISON_CASES) {
    it(`surfaces both sides of "${query}" within the default window`, () => {
      const seen = new Set(search(query).results.map((hit) => hit.route));

      for (const route of routes) expect(seen).toContain(route);
    });
  }

  it("still fills the window from one page when only that page answers", () => {
    // diversity must not make a single-topic query return short
    expect(search("button").results).toHaveLength(8);
  });

  for (const { query, route } of SYNONYM_CASES) {
    it(`reaches ${route} through the keyword "${query}"`, () => {
      const [top] = search(query).results;

      expect(top.route).toBe(route);
      // the term never appears in the prose, so the page metadata is what found it
      expect(top.pageMatchedTerms).toStrictEqual([query]);
      expect(top.pageAnchored).toBe(true);
    });
  }

  it("answers a question too long for any query cap rather than refusing it", () => {
    // the parameter invites natural language, and an agent asking a real question overruns
    // any length a keyword box would have been given
    const question = [
      "I am building an Ember application and I need a side panel that slides in from the",
      "right edge of the screen to show extra detail about the row a user just clicked on,",
      "without navigating away from the current page. Which Helios component should I reach",
      "for, and how do I open and close it from my component's backing class?",
    ].join(" ");

    expect(question.length).toBeGreaterThan(200);

    const payload = search(question);

    expect(payload.results[0].route).toBe("components/flyout");
    // the echoed query is what was scored, so a caller can see nothing was dropped
    expect(payload.query).toBe(question);
  });

  it("returns nothing for a component the design system does not have", () => {
    for (const query of ["snackbar", "carousel", "treeview"]) {
      const payload = search(query);

      expect(payload.totalMatches).toBe(0);
      expect(payload.results).toStrictEqual([]);
      expect(payload.unmatchedTerms).toStrictEqual([query]);
    }
  });

  it("keeps version history out of an unscoped result list", () => {
    const payload = search("copy text to clipboard", { limit: 10 });

    expect(
      payload.results.filter((result) => result.tab === "Version history"),
    ).toStrictEqual([]);
  });

  it("answers a version question once the caller scopes to that tab", () => {
    const payload = search("6.4.0", { tab: "Version history" });

    expect(payload.results.length).toBeGreaterThan(0);
    expect(payload.results[0].tab).toBe("Version history");
  });

  it("scopes to a docsPath the components catalog reports", () => {
    const payload = search("keyboard", {
      docsPath: "components/table/advanced-table",
      limit: 3,
    });

    expect(payload.totalMatches).toBeGreaterThan(0);
    expect([
      ...new Set(payload.results.map((result) => result.docsPath)),
    ]).toStrictEqual(["components/table/advanced-table"]);
  });
});

describe("search and read compose over the real corpus", () => {
  it("resolves every id search hands back, with its examples intact", () => {
    const [top] = search("how do I make a button full width").results;
    const response = readDoc(store, {
      id: top.id,
      includeChildren: false,
      maxBytes: DEFAULT_READ_MAX_BYTES,
    });
    const metadata = parseToolJson(getToolTextContent(response, 0));
    const markdown = getToolTextContent(response, 1);

    expect(metadata.found).toBe(true);
    expect(metadata.id).toBe(top.id);
    expect(metadata.url).toBe(top.url);
    expect(markdown).toContain("Hds::Button");
    expect(markdown).toContain("@isFullWidth");
  });

  it("gives every chunk a canonical url under the documentation site", () => {
    const offenders = search("button", { limit: 25 }).results.filter(
      (result) => !result.url.startsWith(`${SITE_BASE_URL}${result.route}`),
    );

    expect(offenders).toStrictEqual([]);
  });

  it("keeps every snippet inside the budget across the real corpus", () => {
    const queries = [
      "sticky table header",
      "button",
      "accessibility",
      "form validation",
      "color contrast",
      "how do I make a button full width",
      "flyout",
      "code editor syntax highlighting",
    ];
    const oversized = queries.flatMap((query) =>
      search(query, { limit: 25 })
        .results.filter(
          (result) => result.snippet.length > SNIPPET_MAX_LENGTH + 1,
        )
        .map((result) => `${result.id} at ${result.snippet.length}`),
    );

    expect(oversized).toStrictEqual([]);
  });

  it("keeps a full result list small enough to be worth 25 results", () => {
    const payload = search("accessibility", { limit: 25 });

    expect(payload.results).toHaveLength(25);
    expect(JSON.stringify(payload).length).toBeLessThan(25_000);
  });
});

describe("what the corpus is allowed to serve as documentation", () => {
  it("carries no HTML comment into a passage", () => {
    const offenders = allChunks
      .filter((chunk) => {
        const prose = chunk.content.replace(FENCED_CODE, " ");

        return prose.includes("<!--") || prose.includes("-->");
      })
      .map((chunk) => chunk.id);

    expect(offenders).toStrictEqual([]);
  });

  it("indexes nothing that existed only inside a comment", () => {
    const commentedOut = [
      "patterns/form-patterns#guidelines/spacing/fields/text-fields",
      "patterns/form-patterns#guidelines/spacing/fields/data-fields",
      "components/rich-tooltip#guidelines/future-use-cases/onboarding-and-walkthrough",
      "components/rich-tooltip#guidelines/future-use-cases/data-visualization",
    ];

    for (const id of commentedOut) expect(store.getChunkById(id)).toBeNull();

    expect(
      allChunks.some((chunk) =>
        chunk.content.includes("/components/form/textrea"),
      ),
    ).toBe(false);
  });

  it("keeps the content the website fences off, without its delimiters", () => {
    const principles = store.getChunkById("about/principles");
    const palette = store.getChunkById(
      "foundations/colors#palette/semantic-tokens/foreground",
    );

    expect(principles?.content).toBe("<Doc::Content::HdsPrinciples />");
    expect(palette?.content).toContain("<Doc::ColorSwatch");
    expect(palette?.content).not.toContain("algolia-ignore");
    // fenced off from the site's own index, so it stays out of the scored text too
    expect(palette?.text).toBe("Foreground Use for text and icons.");
  });

  it("hands out urls a parser leaves alone", () => {
    const offenders = allChunks
      .filter((chunk) => new URL(chunk.url).href !== chunk.url)
      .map((chunk) => chunk.url);

    expect(offenders).toStrictEqual([]);
    const modal = store.getChunkById(
      "components/modal#guidelines/dismissal/via-cancel-button",
    );

    expect(modal?.url).toBe(
      "https://helios.hashicorp.design/components/modal#via-%E2%80%9Ccancel%E2%80%9D-button",
    );
    expect(decodeURIComponent(new URL(modal?.url ?? "").hash)).toBe(
      "#via-“cancel”-button",
    );
  });
});

describe("the authoring format the corpus teaches", () => {
  it("labels every template example with the format it is written in", () => {
    const unlabelled = allChunks.flatMap((chunk) =>
      matchAll(chunk.content, TEMPLATE_FENCE)
        .filter((match) => !/^ title="[^"]+"$/.test(match[1]))
        .map(() => chunk.id),
    );

    expect(unlabelled).toStrictEqual([]);
  });

  it("ships whole .gts files, so the import paths survive", () => {
    const blocks = allChunks.flatMap((chunk) =>
      matchAll(chunk.content, GTS_BLOCK).map((match) => ({
        id: chunk.id,
        code: match[1],
      })),
    );
    const withoutImport = blocks
      .filter((block) => !/^import /m.test(block.code))
      .map((block) => block.id);

    // an import path is the one thing a consumer cannot infer from the markup
    expect(blocks.length).toBeGreaterThan(600);
    expect(withoutImport).toStrictEqual([]);
  });

  it("leads with the modern form where a demo ships both", () => {
    const content =
      store.getChunkById("components/button#code/how-to-use-this-component")
        ?.content ?? "";

    expect(
      content.indexOf('```gts title="Modern Ember (.gts)"'),
    ).toBeGreaterThan(-1);
    expect(content.indexOf("```gts")).toBeLessThan(
      content.indexOf("```handlebars"),
    );
    expect(content).toContain("@hashicorp/design-system-components/components");
  });

  it("makes the modern component name reachable", () => {
    const payload = search("HdsButton", { limit: 25 });

    expect(payload.unmatchedTerms).toStrictEqual([]);
    expect(payload.results.map((result) => result.route)).toContain(
      "components/button",
    );
  });
});
