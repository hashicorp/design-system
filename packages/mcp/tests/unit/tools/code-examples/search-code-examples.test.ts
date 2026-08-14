/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from "vitest";

import {
  createSearchCodeExamplesTool,
  searchCodeExamples,
} from "../../../../src/tools/code-examples/search-code-examples.js";
import {
  DEFAULT_SEARCH_LIMIT,
  SEARCH_CODE_EXAMPLES_TOOL_NAME,
} from "../../../../src/tools/code-examples/constants.js";
import { createCodeExamplesStore } from "../../../../src/tools/code-examples/store/index.js";
import { buildCodeExamplesCatalog } from "../../../support/code-examples-catalog.js";

const extra = {} as never;

describe("searchCodeExamples", () => {
  it("returns query, resultCount, and results", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const output = searchCodeExamples(store, { query: "button", limit: 10 });

    expect(output).toMatchObject({
      query: "button",
      resultCount: expect.any(Number),
      results: expect.any(Array),
    });
    expect(output.resultCount).toBe(output.results.length);
  });

  it("includes component in output when provided", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const output = searchCodeExamples(store, {
      query: "with",
      component: "accordion",
      limit: 10,
    });

    expect(output.component).toBe("accordion");
  });

  it("omits component key when not provided", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const output = searchCodeExamples(store, { query: "button", limit: 10 });

    expect(output).not.toHaveProperty("component");
  });

  it("omits component key when component is undefined", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const output = searchCodeExamples(store, {
      query: "button",
      component: undefined,
      limit: 10,
    });

    expect(output).not.toHaveProperty("component");
  });

  it("returns zero results for a query with no matches", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const output = searchCodeExamples(store, {
      query: "nonexistentterm",
      limit: 10,
    });

    expect(output.resultCount).toBe(0);
    expect(output.results).toHaveLength(0);
  });

  it("delegates limit to the store", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const output = searchCodeExamples(store, { query: "with", limit: 2 });

    expect(output.results).toHaveLength(2);
    expect(output.resultCount).toBe(2);
  });
});

describe("createSearchCodeExamplesTool", () => {
  it("returns a tool with the correct name", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createSearchCodeExamplesTool(() => store);

    expect(tool.name).toBe(SEARCH_CODE_EXAMPLES_TOOL_NAME);
  });

  it("returns a tool with config, inputSchema, outputSchema, and executeCallback", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createSearchCodeExamplesTool(() => store);

    expect(tool.config.inputSchema).toBeDefined();
    expect(tool.config.outputSchema).toBeDefined();
    expect(typeof tool.executeCallback).toBe("function");
  });

  it("has readOnlyHint true and openWorldHint false", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createSearchCodeExamplesTool(() => store);

    expect(tool.config.annotations).toMatchObject({
      readOnlyHint: true,
      openWorldHint: false,
    });
  });

  it("inputSchema limit defaults to DEFAULT_SEARCH_LIMIT", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createSearchCodeExamplesTool(() => store);

    // Zod default is accessible via .parse on the shaped schema
    const limitSchema = tool.config.inputSchema?.limit;
    const parsed = (limitSchema as { parse: (v: unknown) => number }).parse(
      undefined,
    );

    expect(parsed).toBe(DEFAULT_SEARCH_LIMIT);
  });

  it("does not call getStore until executeCallback is invoked", async () => {
    const getStore = vi.fn(() =>
      createCodeExamplesStore(buildCodeExamplesCatalog()),
    );
    const tool = createSearchCodeExamplesTool(getStore);

    expect(getStore).not.toHaveBeenCalled();

    await tool.executeCallback(
      { query: "accordion", component: undefined, limit: 10 },
      extra,
    );

    expect(getStore).toHaveBeenCalledOnce();
  });

  it("executeCallback returns structured and text content", async () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createSearchCodeExamplesTool(() => store);
    const result = await tool.executeCallback(
      { query: "button", component: undefined, limit: 10 },
      extra,
    );

    expect(result.structuredContent).toMatchObject({
      query: "button",
      resultCount: expect.any(Number),
      results: expect.any(Array),
    });
    expect(result.content[0]).toMatchObject({ type: "text" });
  });

  it("executeCallback propagates component filter into structured output", async () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createSearchCodeExamplesTool(() => store);
    const result = await tool.executeCallback(
      { query: "with", component: "accordion", limit: 10 },
      extra,
    );

    expect(result.structuredContent).toMatchObject({ component: "accordion" });
  });

  it("executeCallback surfaces errors thrown by getStore", async () => {
    const tool = createSearchCodeExamplesTool(() => {
      throw new Error("store unavailable");
    });

    await expect(
      tool.executeCallback(
        { query: "accordion", component: undefined, limit: 10 },
        extra,
      ),
    ).rejects.toThrow("store unavailable");
  });
});
