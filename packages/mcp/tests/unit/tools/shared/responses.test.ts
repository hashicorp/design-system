/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  toDocumentToolResponse,
  toJsonToolResponse,
  withSafeToolHandler,
} from "../../../../src/tools/shared/responses.js";
import {
  getToolTextContent,
  parseToolJson,
} from "../../../support/tool-content.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("toJsonToolResponse", () => {
  it("emits the same payload as text and as structured content", () => {
    const payload = { found: true, results: [{ id: "components/button" }] };
    const response = toJsonToolResponse(payload);

    expect(parseToolJson(getToolTextContent(response))).toStrictEqual(payload);
    expect(response.structuredContent).toBe(payload);
    expect(response.isError).toBeUndefined();
  });
});

describe("toDocumentToolResponse", () => {
  it("keeps the document out of the JSON, as its own block", () => {
    const document = "## Full-width\n\n<Hds::Button @isFullWidth={{true}} />";
    const response = toDocumentToolResponse({ found: true }, document);

    expect(response.content).toHaveLength(2);
    expect(parseToolJson(getToolTextContent(response, 0))).toStrictEqual({
      found: true,
    });
    expect(getToolTextContent(response, 1)).toBe(document);
  });

  it("carries the metadata as structured content, but never the document", () => {
    const document = "## Full-width\n\n<Hds::Button @isFullWidth={{true}} />";
    const metadata = { found: true };
    const response = toDocumentToolResponse(metadata, document);

    expect(response.structuredContent).toBe(metadata);
    expect(JSON.stringify(response.structuredContent)).not.toContain(
      "Full-width",
    );
  });
});

describe("withSafeToolHandler", () => {
  it("passes a successful result straight through", async () => {
    const handler = withSafeToolHandler("search_hds_docs", () =>
      toJsonToolResponse({ ok: true }),
    );

    expect(await handler()).toStrictEqual({
      content: [{ type: "text", text: JSON.stringify({ ok: true }, null, 2) }],
      structuredContent: { ok: true },
    });
  });

  it("turns a thrown error into an isError result naming the tool", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const handler = withSafeToolHandler("read_hds_docs", () => {
      throw new Error("ENOENT: docs-catalog.json");
    });
    const response = await handler();

    expect(response.isError).toBe(true);
    expect(getToolTextContent(response)).toBe(
      "read_hds_docs failed: ENOENT: docs-catalog.json",
    );
  });

  it("reports a thrown non-error too, rather than losing it", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const handler = withSafeToolHandler("read_hds_docs", () => {
      throw "catalog is unreadable";
    });

    expect(getToolTextContent(await handler())).toBe(
      "read_hds_docs failed: catalog is unreadable",
    );
  });

  it("logs the failure to stderr so a broken catalog is diagnosable", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const thrown = new Error("boom");
    const handler = withSafeToolHandler("search_hds_docs", () => {
      throw thrown;
    });

    await handler();

    expect(error).toHaveBeenCalledWith(
      "Tool handler failed (search_hds_docs):",
      thrown,
    );
  });

  it("forwards the arguments it was called with", async () => {
    const inner = vi.fn(() => toJsonToolResponse({ ok: true }));
    const handler = withSafeToolHandler<[string, number]>(
      "search_hds_docs",
      inner,
    );

    await handler("button", 8);

    expect(inner).toHaveBeenCalledWith("button", 8);
  });
});
