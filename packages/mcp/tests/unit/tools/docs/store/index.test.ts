/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";

import {
  createDocsStore,
  loadDocsCatalog,
  parseDocsCatalog,
} from "../../../../../src/tools/docs/store/index.js";
import { encodeDocsCursor } from "../../../../../src/tools/docs/store/lookup.js";
import { buildDocsCatalog } from "../../../../support/docs-catalog.js";

describe("documentation store", () => {
  it("validates catalogs and loads the generated catalog", () => {
    expect(parseDocsCatalog(buildDocsCatalog()).pages).toHaveLength(2);
    expect(() => parseDocsCatalog({ version: 1, pages: [{}] })).toThrow();
    expect(
      loadDocsCatalog().searchDocs({
        query: "accordion",
        scope: "components",
        limit: 1,
      }),
    ).toHaveLength(1);
  });

  it("ranks matches and filters by semantic scope", () => {
    const results = createDocsStore(buildDocsCatalog()).searchDocs({
      query: "button action",
      scope: "components",
      limit: 10,
    });

    expect(results[0]).toMatchObject({
      docId: "components/button/index",
      sectionId: "guidelines--usage",
      url: "/components/button?tab=guidelines#usage",
    });
    expect(results.every((result) => result.title === "Button")).toBe(true);
  });

  it("reads an exact section and paginates without losing content", () => {
    const store = createDocsStore(buildDocsCatalog());
    const first = store.readDoc({
      docId: "components/button/index",
      sectionId: "guidelines--usage",
      maxSections: 1,
      maxChars: 20,
    });

    expect(first).toMatchObject({
      found: true,
      sections: [{ id: "guidelines--usage" }],
    });

    if (!first.found || first.nextCursor === undefined) {
      throw new Error("Expected a continuation cursor");
    }

    const next = store.readDoc({
      cursor: first.nextCursor,
      maxSections: 1,
      maxChars: 20,
    });

    expect(next).toMatchObject({
      found: true,
      sections: [{ id: "guidelines--usage" }],
    });
    expect(next.sections[0]?.markdown).not.toBe(first.sections[0]?.markdown);
  });

  it("rejects ambiguous locators and invalid cursor bounds", () => {
    const store = createDocsStore(buildDocsCatalog());

    expect(
      store.readDoc({ maxSections: 1, maxChars: 200 }),
    ).toMatchObject({ found: false, message: expect.stringContaining("either") });
    expect(
      store.readDoc({
        docId: "components/button/index",
        cursor: "invalid",
        maxSections: 1,
        maxChars: 200,
      }),
    ).toMatchObject({ found: false, message: expect.stringContaining("either") });
    expect(
      store.readDoc({
        cursor: encodeDocsCursor({
          docId: "components/button/index",
          sectionIndex: 99,
          charOffset: 0,
        }),
        maxSections: 1,
        maxChars: 200,
      }),
    ).toMatchObject({ found: false, message: "Invalid cursor." });
  });
});
