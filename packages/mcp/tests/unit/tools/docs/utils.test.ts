/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  toChunkRecord,
  toPageRecord,
} from "../../../../src/stores/docs/lookup.js";
import {
  joinChunkContent,
  toSerializablePageLinks,
  toSerializableSearchResult,
  truncateToBytes,
} from "../../../../src/tools/docs/utils.js";
import {
  buildDocsChunk,
  buildDocsPage,
} from "../../../support/docs-catalog.js";

import type { DocsSearchHit } from "../../../../src/stores/docs/index.js";

const buildHit = (overrides: Partial<DocsSearchHit> = {}): DocsSearchHit => ({
  chunk: toChunkRecord(buildDocsChunk(), buildDocsPage()),
  page: toPageRecord(buildDocsPage()),
  score: 24.1648,
  relScore: 1,
  pageMatchedTerms: ["button"],
  snippet: "Full-width This indicates that the Button should take up…",
  ...overrides,
});

describe("toSerializableSearchResult", () => {
  it("reports the route as docsPath, so a hit joins the components catalog", () => {
    const result = toSerializableSearchResult(buildHit());

    expect(result.route).toBe("components/button");
    expect(result.docsPath).toBe(result.route);
  });

  it("emits the whole result shape, breadcrumb and canonical url included", () => {
    expect(toSerializableSearchResult(buildHit())).toStrictEqual({
      id: "components/button#code/how-to-use-this-component/full-width",
      score: 24.1648,
      relScore: 1,
      title: "Button",
      route: "components/button",
      docsPath: "components/button",
      section: "components",
      tab: "Code",
      headingPath: [
        "Button",
        "Code",
        "How to use this component",
        "Full-width",
      ],
      url: "https://helios.hashicorp.design/components/button?tab=code#full-width",
      pageAnchored: true,
      pageDescription:
        "An interactive element that initiates an action or event, such as a form submission.",
      pageMatchedTerms: ["button"],
      snippet: "Full-width This indicates that the Button should take up…",
    });
  });

  it("reports a result that only matched prose as not page-anchored", () => {
    const result = toSerializableSearchResult(
      buildHit({ pageMatchedTerms: [] }),
    );

    expect(result.pageAnchored).toBe(false);
  });

  it("omits the tab on a page that has none", () => {
    const result = toSerializableSearchResult(
      buildHit({
        chunk: toChunkRecord(
          buildDocsChunk({ tab: undefined }),
          buildDocsPage(),
        ),
      }),
    );

    expect(result).not.toHaveProperty("tab");
  });
});

describe("toSerializablePageLinks", () => {
  it("carries the github and figma links when the page has them", () => {
    expect(
      toSerializablePageLinks(toPageRecord(buildDocsPage())),
    ).toStrictEqual({
      github: "https://github.com/hashicorp/design-system/tree/main/button",
      figma: "https://www.figma.com/design/hds-components",
    });
  });

  // 24 of the 92 pages carry neither link, and an empty object is not a link list
  it("returns undefined when the page has no links, rather than an empty object", () => {
    expect(
      toSerializablePageLinks(
        toPageRecord(buildDocsPage({ links: undefined })),
      ),
    ).toBeUndefined();
    expect(
      toSerializablePageLinks(toPageRecord(buildDocsPage({ links: {} }))),
    ).toBeUndefined();
  });
});

describe("truncateToBytes", () => {
  it("returns the value untouched when it fits", () => {
    expect(truncateToBytes("short", 500)).toStrictEqual({
      value: "short",
      truncated: false,
    });
  });

  it("measures the cap in bytes, not characters", () => {
    // 100 two-byte characters do not fit a 60-byte cap, though they are 100 characters
    const { value, truncated } = truncateToBytes("é".repeat(100), 60);

    expect(truncated).toBe(true);
    expect(Buffer.byteLength(value, "utf8")).toBeLessThanOrEqual(60);
    expect(value).toContain("[truncated: raise maxBytes to read the rest]");
  });

  it("never hands back a character split down the middle", () => {
    // an odd budget lands mid-character, which would otherwise decode to U+FFFD
    const { value } = truncateToBytes("é".repeat(100), 61);

    expect(value).not.toContain("�");
    expect(Buffer.byteLength(value, "utf8")).toBeLessThanOrEqual(61);
  });

  // the tool's own schema floors maxBytes well above the note, so this is only the edge
  it("degrades to the note alone when the cap leaves no room for content", () => {
    const { value, truncated } = truncateToBytes("é".repeat(100), 10);

    expect(truncated).toBe(true);
    expect(value).toBe("\n\n[truncated: raise maxBytes to read the rest]");
  });
});

describe("joinChunkContent", () => {
  it("joins passages with a blank line and trims each one", () => {
    const page = buildDocsPage();
    const chunks = [
      toChunkRecord(buildDocsChunk({ content: "  ## Parent  " }), page),
      toChunkRecord(buildDocsChunk({ content: "### Child\n" }), page),
    ];

    expect(joinChunkContent(chunks)).toBe("## Parent\n\n### Child");
  });

  it("returns an empty string for no passages", () => {
    expect(joinChunkContent([])).toBe("");
  });
});
