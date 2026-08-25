/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
  DEFAULT_READ_MAX_BYTES,
  MAX_FILTER_LENGTH,
  MIN_READ_MAX_BYTES,
} from "../../../src/tools/docs/constants.js";
import {
  readDoc,
  readDocInputShape,
} from "../../../src/tools/docs/read-doc.js";
import { createDocsCatalogStore } from "../../../src/tools/docs/store/index.js";
import {
  BUNDLED_AT,
  BUTTON_ACCESSIBILITY_CHUNK_ID,
  BUTTON_FULL_WIDTH_CHUNK_ID,
  BUTTON_GUIDELINES_CHUNK_ID,
  BUTTON_HOW_TO_CHUNK_ID,
  BUTTON_VERSION_CHUNK_ID,
  SITE_BASE_URL,
  buildDocsCatalog,
  buildDocsChunk,
  buildDocsPage,
} from "../../support/docs-catalog.js";
import {
  getToolTextContent,
  parseToolJson,
} from "../../support/tool-content.js";

import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const store = createDocsCatalogStore(buildDocsCatalog());

const read = (
  id: string,
  overrides: { includeChildren?: boolean; maxBytes?: number } = {},
): CallToolResult =>
  readDoc(store, {
    id,
    includeChildren: false,
    maxBytes: DEFAULT_READ_MAX_BYTES,
    ...overrides,
  });

const getMetadata = (response: CallToolResult) =>
  parseToolJson(getToolTextContent(response, 0));

describe("read_hds_docs hit", () => {
  it("returns the passage metadata, provenance included", () => {
    expect(getMetadata(read(BUTTON_FULL_WIDTH_CHUNK_ID))).toStrictEqual({
      found: true,
      id: BUTTON_FULL_WIDTH_CHUNK_ID,
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
      level: 3,
      url: `${SITE_BASE_URL}components/button?tab=code#full-width`,
      pageUrl: `${SITE_BASE_URL}components/button`,
      relatedDocsPaths: ["components/button-set"],
      links: {
        github: "https://github.com/hashicorp/design-system/tree/main/button",
        figma: "https://www.figma.com/design/hds-components",
      },
      status: { updated: "2.1.0" },
      includedChunkIds: [BUTTON_FULL_WIDTH_CHUNK_ID],
      childChunkCount: 0,
      contentBytes: 184,
      truncated: false,
      bundledAt: BUNDLED_AT,
      siteBaseUrl: SITE_BASE_URL,
      provenance: `Bundled snapshot of ${SITE_BASE_URL} taken at ${BUNDLED_AT}. Fetch ${SITE_BASE_URL}components/button?tab=code#full-width for the live page.`,
    });
  });

  it("keeps the usage example that search snippets strip out", () => {
    const response = read(BUTTON_FULL_WIDTH_CHUNK_ID);
    const markdown = getToolTextContent(response, 1);

    expect(markdown).toContain("```handlebars");
    expect(markdown).toContain(
      '<Hds::Button @text="Full width button" @isFullWidth={{true}} />',
    );
    expect(markdown).toContain("### Full-width");
  });

  it("keeps the markdown out of structuredContent, so it is never sent twice", () => {
    const response = read(BUTTON_FULL_WIDTH_CHUNK_ID);

    expect(response.content).toHaveLength(2);
    expect(response.isError).toBeUndefined();
    // the metadata record is there, as it is on a miss; only the markdown block is not
    expect(response.structuredContent).toStrictEqual(getMetadata(response));
    expect(JSON.stringify(response.structuredContent)).not.toContain(
      "```handlebars",
    );
  });

  it("resolves an id whose casing or slashes drifted", () => {
    const metadata = getMetadata(
      read(`/${BUTTON_FULL_WIDTH_CHUNK_ID.toUpperCase()}`),
    );

    expect(metadata.found).toBe(true);
    expect(metadata.id).toBe(BUTTON_FULL_WIDTH_CHUNK_ID);
  });

  it("reports that a section header has detail nested below it", () => {
    const metadata = getMetadata(read(BUTTON_HOW_TO_CHUNK_ID));

    expect(metadata.childChunkCount).toBe(1);
    expect(metadata.includedChunkIds).toStrictEqual([BUTTON_HOW_TO_CHUNK_ID]);
  });

  it("appends the nested passages when asked for them", () => {
    const response = read(BUTTON_HOW_TO_CHUNK_ID, { includeChildren: true });
    const metadata = getMetadata(response);

    expect(metadata.includedChunkIds).toStrictEqual([
      BUTTON_HOW_TO_CHUNK_ID,
      BUTTON_FULL_WIDTH_CHUNK_ID,
    ]);
    expect(getToolTextContent(response, 1)).toContain(
      "## How to use this component",
    );
    expect(getToolTextContent(response, 1)).toContain("### Full-width");
  });

  it("omits the optional metadata a page or passage does not carry", () => {
    const metadata = getMetadata(read("components/badge#guidelines"));

    expect(metadata.found).toBe(true);
    expect(metadata).not.toHaveProperty("status");
    expect(metadata).not.toHaveProperty("relatedDocsPaths");
    // absent, not an empty object: every other optional field in the payload behaves this way
    expect(metadata).not.toHaveProperty("links");
    expect(metadata).not.toHaveProperty("level");
    expect(metadata).not.toHaveProperty("omittedChunkIds");
  });

  it("reports the tab, so a version entry is legible without the page", () => {
    const metadata = getMetadata(read(BUTTON_VERSION_CHUNK_ID));

    expect(metadata.tab).toBe("Version history");
    expect(metadata.headingPath).toStrictEqual([
      "Button",
      "Version history",
      "2.1.0",
    ]);
  });

  it("names only the passages the byte cap left in the markdown", () => {
    const wordy = "word ".repeat(200);
    const childStore = createDocsCatalogStore(
      buildDocsCatalog({
        pages: {
          "components/button": buildDocsPage({
            chunks: [
              buildDocsChunk({
                id: BUTTON_HOW_TO_CHUNK_ID,
                content: `## How to use this component\n\n${wordy}`,
              }),
              buildDocsChunk({
                id: BUTTON_FULL_WIDTH_CHUNK_ID,
                content: `### Full-width\n\n${wordy}`,
              }),
              buildDocsChunk({
                id: `${BUTTON_HOW_TO_CHUNK_ID}/icon`,
                content: `### Icon\n\n${wordy}`,
              }),
            ],
          }),
        },
      }),
    );
    const response = readDoc(childStore, {
      id: BUTTON_HOW_TO_CHUNK_ID,
      includeChildren: true,
      maxBytes: MIN_READ_MAX_BYTES,
    });
    const metadata = getMetadata(response);

    expect(metadata.childChunkCount).toBe(2);
    expect(metadata.truncated).toBe(true);
    // one passage of the three fits; the caller is told which two to read separately
    expect(metadata.includedChunkIds).toStrictEqual([BUTTON_HOW_TO_CHUNK_ID]);
    expect(metadata.omittedChunkIds).toStrictEqual([
      BUTTON_FULL_WIDTH_CHUNK_ID,
      `${BUTTON_HOW_TO_CHUNK_ID}/icon`,
    ]);
    expect(getToolTextContent(response, 1)).not.toContain("### Full-width");
  });

  it("caps the markdown at maxBytes and says that it did", () => {
    const longStore = createDocsCatalogStore(
      buildDocsCatalog({
        pages: {
          "components/button": buildDocsPage({
            chunks: [buildDocsChunk({ content: "word ".repeat(1_000) })],
          }),
        },
      }),
    );
    const response = readDoc(longStore, {
      id: BUTTON_FULL_WIDTH_CHUNK_ID,
      includeChildren: false,
      maxBytes: MIN_READ_MAX_BYTES,
    });
    const metadata = getMetadata(response);
    const markdown = getToolTextContent(response, 1);

    expect(metadata.truncated).toBe(true);
    expect(metadata.contentBytes).toBeLessThanOrEqual(MIN_READ_MAX_BYTES);
    expect(Buffer.byteLength(markdown, "utf8")).toBeLessThanOrEqual(
      MIN_READ_MAX_BYTES,
    );
    expect(markdown).toContain("[truncated: raise maxBytes to read the rest]");
  });
});

describe("read_hds_docs miss", () => {
  it("answers a bad id with a well-formed payload, not an error", () => {
    const response = read("components/button#code/no-such-passage");
    const payload = parseToolJson(getToolTextContent(response));

    expect(response.isError).toBeUndefined();
    expect(response.content).toHaveLength(1);
    expect(payload).toStrictEqual({
      found: false,
      requestedId: "components/button#code/no-such-passage",
      message:
        'No documentation passage found for id "components/button#code/no-such-passage". Ids come from search_hds_docs results.',
      suggestions: [
        BUTTON_GUIDELINES_CHUNK_ID,
        BUTTON_HOW_TO_CHUNK_ID,
        BUTTON_FULL_WIDTH_CHUNK_ID,
        BUTTON_ACCESSIBILITY_CHUNK_ID,
        BUTTON_VERSION_CHUNK_ID,
      ],
      bundledAt: BUNDLED_AT,
      siteBaseUrl: SITE_BASE_URL,
    });
  });

  it("carries the payload as structured content too, since it is a record", () => {
    const response = read("components/button#code/no-such-passage");

    expect(response.structuredContent).toStrictEqual(
      parseToolJson(getToolTextContent(response)),
    );
  });

  it("suggests ids the caller can actually retry with", () => {
    const response = read("components/button#code/no-such-passage");
    const payload = parseToolJson(getToolTextContent(response)) as {
      suggestions: string[];
    };

    for (const suggestion of payload.suggestions) {
      expect(store.getChunkById(suggestion)).not.toBeNull();
    }
  });

  it("refuses an id longer than any the corpus holds", () => {
    const inputSchema = z.object(readDocInputShape);

    expect(() =>
      inputSchema.parse({ id: "x".repeat(MAX_FILTER_LENGTH + 1) }),
    ).toThrow();
    expect(() => inputSchema.parse({ id: "x".repeat(200) })).not.toThrow();
  });

  it("clamps an oversized id rather than echoing it back four times", () => {
    const oversized = "x".repeat(2_000_000);
    const response = read(oversized);
    const payload = parseToolJson(getToolTextContent(response));

    expect(payload.requestedId).toHaveLength(MAX_FILTER_LENGTH);
    expect(JSON.stringify(response).length).toBeLessThan(10_000);
  });

  it("still answers when the id resembles nothing in the corpus", () => {
    const payload = parseToolJson(getToolTextContent(read("zzz")));

    expect(payload.found).toBe(false);
    expect(payload.suggestions).toStrictEqual([]);
    expect(payload.bundledAt).toBe(BUNDLED_AT);
  });
});
