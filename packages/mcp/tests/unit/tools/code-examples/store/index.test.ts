/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";

import {
  createCodeExamplesStore,
  loadCodeExamplesCatalog,
  parseCodeExamplesCatalog,
} from "../../../../../src/tools/code-examples/store/index.js";
import { buildCodeExamplesCatalog } from "../../../../support/code-examples-catalog.js";

describe("code examples store", () => {
  it("validates catalogs and loads the generated catalog", () => {
    expect(
      parseCodeExamplesCatalog(buildCodeExamplesCatalog()).examples,
    ).toHaveLength(4);
    expect(() =>
      parseCodeExamplesCatalog({ version: 1, examples: [{}] }),
    ).toThrow();
    expect(
      loadCodeExamplesCatalog().searchCodeExamples({
        query: "accordion",
        limit: 1,
      }),
    ).toHaveLength(1);
  });

  it("ranks exact component matches highest", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const results = store.searchCodeExamples({
      query: "accordion",
      limit: 10,
    });

    expect(results[0]?.component).toBe("accordion");
    expect(results[0]?.exampleId).toBe(
      "page-components/accordion/code-fragments/with-external-control",
    );
  });

  it("filters by component", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const results = store.searchCodeExamples({
      query: "with",
      component: "button",
      limit: 10,
    });

    expect(results).toHaveLength(1);
    expect(results[0]?.component).toBe("button");
  });

  it("filters nested component paths", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const results = store.searchCodeExamples({
      query: "with",
      component: "form",
      limit: 10,
    });

    expect(results[0]?.component).toBe("form/super-select");
  });

  it("finds results by imported HDS component name", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const results = store.searchCodeExamples({
      query: "HdsButton",
      limit: 10,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(
      results.some((result) =>
        result.importedHdsComponents.includes("HdsButton"),
      ),
    ).toBe(true);
  });

  it("requires all query terms to be present", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const results = store.searchCodeExamples({
      query: "accordion nonexistentterm",
      limit: 10,
    });

    expect(results).toHaveLength(0);
  });

  it("respects the limit", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const results = store.searchCodeExamples({ query: "with", limit: 2 });

    expect(results).toHaveLength(2);
  });

  it("returns empty array for blank query", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const results = store.searchCodeExamples({ query: "   ", limit: 10 });

    expect(results).toHaveLength(0);
  });

  it("returns a snippet (not full source) in search results", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const results = store.searchCodeExamples({ query: "accordion", limit: 1 });

    expect(results[0]?.snippet).toBeDefined();
    expect((results[0]?.snippet?.length ?? 0) <= 300).toBe(true);
  });

  it("reads a found example with full source", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const result = store.readCodeExample({
      exampleId:
        "page-components/button/code-fragments/with-loading-state",
    });

    expect(result).toMatchObject({
      found: true,
      example: {
        exampleId: "page-components/button/code-fragments/with-loading-state",
        component: "button",
        title: "With loading state",
        language: "gts",
        isStandalone: true,
      },
    });

    if (!result.found) throw new Error("Expected found result");
    expect(result.example.source).toContain("HdsButton");
  });

  it("returns found false for a missing example", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const result = store.readCodeExample({ exampleId: "nonexistent/example" });

    expect(result).toMatchObject({
      found: false,
      message: expect.stringContaining("not found"),
    });
  });

  it("rejects a malformed catalog record", () => {
    expect(() =>
      parseCodeExamplesCatalog({
        version: 1,
        examples: [{ id: "", component: "accordion" }],
      }),
    ).toThrow();
  });
});
