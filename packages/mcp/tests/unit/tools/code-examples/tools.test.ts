/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from "vitest";

import { createReadCodeExampleTool } from "../../../../src/tools/code-examples/read-code-example.js";
import { createSearchCodeExamplesTool } from "../../../../src/tools/code-examples/search-code-examples.js";
import { createCodeExamplesStore } from "../../../../src/tools/code-examples/store/index.js";
import { buildCodeExamplesCatalog } from "../../../support/code-examples-catalog.js";

const extra = {} as never;

describe("code examples tool factories", () => {
  it("loads the injected store only when invoked", async () => {
    const getStore = vi.fn(() =>
      createCodeExamplesStore(buildCodeExamplesCatalog()),
    );
    const tool = createSearchCodeExamplesTool(getStore);

    expect(getStore).not.toHaveBeenCalled();

    const result = await tool.executeCallback(
      { query: "accordion", component: undefined, limit: 10 },
      extra,
    );

    expect(getStore).toHaveBeenCalledOnce();
    expect(result.structuredContent).toMatchObject({ resultCount: 1 });
  });

  it("returns structured and text content from search", async () => {
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

  it("returns structured and text content from read", async () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createReadCodeExampleTool(() => store);
    const result = await tool.executeCallback(
      {
        exampleId:
          "page-components/button/code-fragments/with-loading-state",
      },
      extra,
    );

    expect(result.structuredContent).toMatchObject({
      found: true,
      example: { exampleId: "page-components/button/code-fragments/with-loading-state" },
    });
    expect(result.content[0]).toMatchObject({ type: "text" });
  });

  it("returns found false for missing example", async () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createReadCodeExampleTool(() => store);
    const result = await tool.executeCallback(
      { exampleId: "nonexistent/example" },
      extra,
    );

    expect(result.structuredContent).toMatchObject({
      found: false,
      message: expect.stringContaining("not found"),
    });
  });

  it("propagates component filter in search output", async () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createSearchCodeExamplesTool(() => store);
    const result = await tool.executeCallback(
      { query: "with", component: "accordion", limit: 10 },
      extra,
    );

    expect(result.structuredContent).toMatchObject({
      component: "accordion",
    });
  });

  it("handles store exceptions gracefully via withSafeToolHandler", async () => {
    // The safe handler wrapping happens in registerTools, not in the factory.
    // Verify the factory itself surfaces the error through the executeCallback.
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
