/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from "vitest";

import {
  createReadCodeExampleTool,
  readCodeExample,
} from "../../../../src/tools/code-examples/read-code-example.js";
import { READ_CODE_EXAMPLE_TOOL_NAME } from "../../../../src/tools/code-examples/constants.js";
import { createCodeExamplesStore } from "../../../../src/tools/code-examples/store/index.js";
import { buildCodeExamplesCatalog } from "../../../support/code-examples-catalog.js";

const extra = {} as never;

describe("readCodeExample", () => {
  it("returns found true with the full example when the id exists", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const result = readCodeExample(store, {
      exampleId: "page-components/button/code-fragments/with-loading-state",
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
  });

  it("includes full source in the returned example", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const result = readCodeExample(store, {
      exampleId: "page-components/button/code-fragments/with-loading-state",
    });

    if (!result.found) throw new Error("Expected found result");

    expect(result.example.source).toContain("HdsButton");
  });

  it("returns found false with a message when the id does not exist", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const result = readCodeExample(store, {
      exampleId: "nonexistent/example",
    });

    expect(result).toMatchObject({
      found: false,
      message: expect.stringContaining("not found"),
    });
  });
});

describe("createReadCodeExampleTool", () => {
  it("returns a tool with the correct name", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createReadCodeExampleTool(() => store);

    expect(tool.name).toBe(READ_CODE_EXAMPLE_TOOL_NAME);
  });

  it("returns a tool with config, inputSchema, outputSchema, and executeCallback", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createReadCodeExampleTool(() => store);

    expect(tool.config.inputSchema).toBeDefined();
    expect(tool.config.outputSchema).toBeDefined();
    expect(typeof tool.executeCallback).toBe("function");
  });

  it("has readOnlyHint true and openWorldHint false", () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createReadCodeExampleTool(() => store);

    expect(tool.config.annotations).toMatchObject({
      readOnlyHint: true,
      openWorldHint: false,
    });
  });

  it("does not call getStore until executeCallback is invoked", async () => {
    const getStore = vi.fn(() =>
      createCodeExamplesStore(buildCodeExamplesCatalog()),
    );
    const tool = createReadCodeExampleTool(getStore);

    expect(getStore).not.toHaveBeenCalled();

    await tool.executeCallback(
      { exampleId: "page-components/button/code-fragments/with-loading-state" },
      extra,
    );

    expect(getStore).toHaveBeenCalledOnce();
  });

  it("executeCallback returns structured and text content for a found example", async () => {
    const store = createCodeExamplesStore(buildCodeExamplesCatalog());
    const tool = createReadCodeExampleTool(() => store);
    const result = await tool.executeCallback(
      { exampleId: "page-components/button/code-fragments/with-loading-state" },
      extra,
    );

    expect(result.structuredContent).toMatchObject({
      found: true,
      example: {
        exampleId: "page-components/button/code-fragments/with-loading-state",
      },
    });
    expect(result.content[0]).toMatchObject({ type: "text" });
  });

  it("executeCallback returns found false for a missing example", async () => {
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

  it("executeCallback surfaces errors thrown by getStore", async () => {
    const tool = createReadCodeExampleTool(() => {
      throw new Error("store unavailable");
    });

    await expect(
      tool.executeCallback(
        {
          exampleId: "page-components/button/code-fragments/with-loading-state",
        },
        extra,
      ),
    ).rejects.toThrow("store unavailable");
  });
});
