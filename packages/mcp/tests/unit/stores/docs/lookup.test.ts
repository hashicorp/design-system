/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { SNIPPET_MAX_LENGTH } from "../../../../src/stores/docs/constants.js";
import {
  buildSnippet,
  getAncestorHeadings,
  getChunkHeading,
  getHeadingPath,
  getPageNameTerms,
  matchesDocsPath,
  matchesFilters,
  normalizeRoute,
  toChunkRecord,
  toPageRecord,
} from "../../../../src/stores/docs/lookup.js";
import {
  buildDocsChunk,
  buildDocsPage,
} from "../../../support/docs-catalog.js";

const buildRecord = () => toChunkRecord(buildDocsChunk(), buildDocsPage());

describe("normalizeRoute", () => {
  it("strips surrounding slashes as well as casing", () => {
    expect(normalizeRoute("/Components/Button/")).toBe("components/button");
  });

  // a docsPath of "/" is all separator and nothing else, which resolveFilters must not apply
  it("normalizes a bare slash to nothing", () => {
    expect(normalizeRoute("/")).toBe("");
  });
});

describe("getPageNameTerms", () => {
  it("is the title plus the terminal route segment, and nothing above it", () => {
    const terms = getPageNameTerms(toPageRecord(buildDocsPage()));

    // "components" is shared by every component page, so it says nothing about which one
    expect([...terms]).toStrictEqual(["button"]);
  });

  it("keeps both wordings when the title and the route disagree", () => {
    const terms = getPageNameTerms(
      toPageRecord(
        buildDocsPage({ route: "layouts/flex", title: "Layout::Flex" }),
      ),
    );

    expect([...terms].sort()).toStrictEqual(["flex", "layout"]);
  });
});

describe("toPageRecord", () => {
  it("maps every field and defaults the list-shaped ones", () => {
    const page = buildDocsPage();

    expect(toPageRecord(page)).toStrictEqual({
      route: "components/button",
      section: "components",
      title: "Button",
      url: page.url,
      caption: page.caption,
      description: page.description,
      keywords: ["action", "cta"],
      related: ["components/button-set"],
      links: page.links,
      status: page.status,
    });
  });

  it("drops a field the catalog carries but this version does not publish", () => {
    const page = buildDocsPage({ previewImage: "assets/button.jpg" } as object);

    expect(toPageRecord(page)).not.toHaveProperty("previewImage");
  });

  it("omits the optional keys rather than emitting them undefined", () => {
    const record = toPageRecord(
      buildDocsPage({
        caption: undefined,
        description: undefined,
        keywords: undefined,
        related: undefined,
        links: undefined,
        status: undefined,
      }),
    );

    expect(record).not.toHaveProperty("caption");
    expect(record).not.toHaveProperty("description");
    expect(record).not.toHaveProperty("links");
    expect(record).not.toHaveProperty("status");
    expect(record.keywords).toStrictEqual([]);
    expect(record.related).toStrictEqual([]);
  });
});

describe("toChunkRecord", () => {
  it("carries the owning page's identity onto the chunk", () => {
    const record = buildRecord();

    expect(record.route).toBe("components/button");
    expect(record.section).toBe("components");
    expect(record.pageTitle).toBe("Button");
    expect(record.pageUrl).toBe(
      "https://helios.hashicorp.design/components/button",
    );
  });

  it("omits tab and level rather than emitting them undefined", () => {
    const record = toChunkRecord(
      buildDocsChunk({ tab: undefined, level: undefined, symbols: undefined }),
      buildDocsPage(),
    );

    expect(record).not.toHaveProperty("tab");
    expect(record).not.toHaveProperty("level");
    expect(record.symbols).toStrictEqual([]);
  });
});

describe("getHeadingPath", () => {
  it("reads page title, then tab, then the headings", () => {
    expect(getHeadingPath(buildRecord())).toStrictEqual([
      "Button",
      "Code",
      "How to use this component",
      "Full-width",
    ]);
  });

  it("skips the tab on a page that has none", () => {
    const record = toChunkRecord(
      buildDocsChunk({ tab: undefined, headingTrail: undefined }),
      buildDocsPage(),
    );

    expect(getHeadingPath(record)).toStrictEqual(["Button"]);
  });
});

describe("getChunkHeading", () => {
  it("returns the chunk's own heading, which is the last of the trail", () => {
    expect(getChunkHeading(buildRecord())).toBe("Full-width");
  });

  it("returns undefined for a tab preamble with no heading of its own", () => {
    const record = toChunkRecord(
      buildDocsChunk({ headingTrail: [] }),
      buildDocsPage(),
    );

    expect(getChunkHeading(record)).toBeUndefined();
    expect(getAncestorHeadings(record)).toStrictEqual([]);
  });
});

describe("getAncestorHeadings", () => {
  it("returns the trail without the chunk's own heading", () => {
    expect(getAncestorHeadings(buildRecord())).toStrictEqual([
      "How to use this component",
    ]);
  });
});

describe("matchesDocsPath", () => {
  it("matches the route itself and anything below it", () => {
    expect(matchesDocsPath("components/form", "components/form")).toBe(true);
    expect(matchesDocsPath("components/form/checkbox", "components/form")).toBe(
      true,
    );
  });

  it("requires the separator, so a sibling route is not claimed", () => {
    expect(matchesDocsPath("components/button-set", "components/button")).toBe(
      false,
    );
  });
});

describe("matchesFilters", () => {
  const record = buildRecord();

  it("passes everything when no filter is set", () => {
    expect(matchesFilters(record, {})).toBe(true);
  });

  it("matches section, tab and docsPath case-insensitively", () => {
    expect(
      matchesFilters(record, {
        section: "components",
        tab: "code",
        docsPath: "components/button",
      }),
    ).toBe(true);
  });

  it("rejects a chunk outside the requested section, tab or route", () => {
    expect(matchesFilters(record, { section: "foundations" })).toBe(false);
    expect(matchesFilters(record, { tab: "guidelines" })).toBe(false);
    expect(matchesFilters(record, { docsPath: "components/badge" })).toBe(
      false,
    );
  });

  it("rejects a chunk with no tab when a tab is requested", () => {
    const untabbed = toChunkRecord(
      buildDocsChunk({ tab: undefined }),
      buildDocsPage(),
    );

    expect(matchesFilters(untabbed, { tab: "code" })).toBe(false);
  });
});

describe("buildSnippet", () => {
  const terms = new Set(["sticky", "header"]);

  it("returns a short passage whole", () => {
    expect(buildSnippet("A short passage.", terms)).toBe("A short passage.");
  });

  it("trims surrounding whitespace", () => {
    expect(buildSnippet("  padded  ", terms)).toBe("padded");
  });

  it("returns an empty string for a chunk with no readable text", () => {
    expect(buildSnippet("", terms)).toBe("");
  });

  it("windows onto the sentence that concentrates the query terms", () => {
    const text = [
      "The component renders a wrapper element around its content.",
      "A sticky header keeps the column labels visible while scrolling.",
      "Every other consideration is described in the specifications tab.",
    ].join(" ");
    const snippet = buildSnippet(text, terms, 80);

    expect(snippet).toContain("sticky header");
    expect(snippet.startsWith("…")).toBe(true);
    expect(snippet.endsWith("…")).toBe(true);
  });

  it("truncates a single unbroken sentence at the budget", () => {
    const snippet = buildSnippet("word ".repeat(60), terms, 40);

    expect(snippet.endsWith("…")).toBe(true);
    expect(snippet.length).toBeLessThanOrEqual(41);
  });

  it("cuts a seed sentence that overruns the budget on its own", () => {
    const seed = `A ${"very ".repeat(100)}sticky header explanation.`;
    const snippet = buildSnippet(
      ["Short opener.", seed, "Short closer."].join(" "),
      terms,
      100,
    );

    expect(seed.length).toBeGreaterThan(100);
    expect(snippet.length).toBeLessThanOrEqual(101);
    // the passage did not start here, and it does not end here either
    expect(snippet.startsWith("…")).toBe(true);
    expect(snippet.endsWith("…")).toBe(true);
  });

  it("stays inside the default budget whatever the sentence lengths are", () => {
    const texts = [
      `Opener. ${"word ".repeat(400)}sticky header.`,
      `${"word ".repeat(400)}sticky header. Closer.`,
      "sticky header. ".repeat(200),
      "no boundaries at all ".repeat(200),
    ];

    for (const text of texts) {
      expect(buildSnippet(text, terms).length).toBeLessThanOrEqual(
        SNIPPET_MAX_LENGTH + 1,
      );
    }
  });
});
