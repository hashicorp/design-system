/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from "vitest";

import { createReadDocTool } from "../../../../src/tools/docs/read-doc.js";
import { createSearchDocsTool } from "../../../../src/tools/docs/search-docs.js";
import { createDocsStore } from "../../../../src/tools/docs/store/index.js";
import { buildDocsCatalog } from "../../../support/docs-catalog.js";

const extra = {} as never;

describe("documentation tool factories", () => {
  it("loads the injected store only when invoked", async () => {
    const getStore = vi.fn(() => createDocsStore(buildDocsCatalog()));
    const tool = createSearchDocsTool(getStore);

    expect(getStore).not.toHaveBeenCalled();

    const result = await tool.executeCallback(
      { query: "button", scope: "all", limit: 10 },
      extra,
    );

    expect(getStore).toHaveBeenCalledOnce();
    expect(result.structuredContent).toMatchObject({ resultCount: 2 });
  });

  it("returns structured and text content from read", async () => {
    const store = createDocsStore(buildDocsCatalog());
    const tool = createReadDocTool(() => store);
    const result = await tool.executeCallback(
      {
        docId: "components/button/index",
        sectionId: "code--component-api",
        maxSections: 1,
        maxChars: 1_000,
      },
      extra,
    );

    expect(result.structuredContent).toMatchObject({
      found: true,
      sections: [{ id: "code--component-api" }],
    });
    expect(result.content[0]).toMatchObject({ type: "text" });
  });
});
