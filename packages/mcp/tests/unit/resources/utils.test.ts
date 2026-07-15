/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  toJsonResourceResponse,
  withSafeResourceHandler,
} from "../../../src/resources/utils.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../support/resource-content.js";
import { buildRequestHandlerExtra } from "../../support/request-handler.js";

describe("toJsonResourceResponse", () => {
  it("returns a single content entry with the correct uri, mimeType, and serialized payload", () => {
    const uri = "hds://tokens/token-color-palette-blue-200";
    const payload = { found: true, count: 42, tags: ["a", "b"] };
    const result = toJsonResourceResponse(uri, payload);
    const [entry] = result.contents;
    const parsed = parseResourceJson(getTextContent(entry));

    expect(result.contents).toHaveLength(1);
    expect(entry.uri).toBe(uri);
    expect(entry.mimeType).toBe("application/json");
    expect(parsed).toStrictEqual(payload);
  });
});

describe("withSafeResourceHandler", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns successful handler results unchanged", async () => {
    const expected = toJsonResourceResponse("hds://tokens", { ok: true });
    const handler = withSafeResourceHandler("tokens", () => expected);

    await expect(
      handler(new URL("hds://tokens"), buildRequestHandlerExtra()),
    ).resolves.toBe(expected);
  });

  it("converts thrown errors to resource responses", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const handler = withSafeResourceHandler("tokens", () => {
      throw new TypeError("Catalog unavailable");
    });
    const result = await handler(
      new URL("hds://tokens"),
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toStrictEqual({
      ok: false,
      resource: "tokens",
      error: {
        name: "TypeError",
        message: "Catalog unavailable",
      },
    });
    expect(content.uri).toBe("hds://tokens");
    expect(consoleError).toHaveBeenCalledOnce();
  });

  it("converts rejected non-Error values", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const handler = withSafeResourceHandler("tokens", async () => {
      return Promise.reject("unavailable");
    });
    const result = await handler(
      new URL("hds://tokens"),
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toMatchObject({
      error: { message: "unavailable" },
    });
  });
});
