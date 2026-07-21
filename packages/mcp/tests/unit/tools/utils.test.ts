/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from "vitest";

import { withSafeToolHandler } from "../../../src/tools/utils.js";

describe("withSafeToolHandler", () => {
  it("returns an MCP error response when a tool throws", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const handler = withSafeToolHandler(
      "test_tool",
      async (): Promise<never> => {
        throw new Error("catalog unavailable");
      },
    );

    const result = await handler({}, {} as never);

    expect(result).toMatchObject({
      isError: true,
      content: [
        { type: "text", text: expect.stringContaining("catalog unavailable") },
      ],
    });
    expect(consoleError).toHaveBeenCalledOnce();
  });
});
