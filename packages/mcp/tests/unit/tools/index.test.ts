/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { describe, expect, it, vi } from "vitest";

import { registerTools } from "../../../src/tools/index.js";

describe("registerTools", () => {
  it("registers the documentation tools", () => {
    const server = new McpServer({ name: "test-server", version: "0.0.0" });
    const registerTool = vi.spyOn(server, "registerTool");

    registerTools(server);

    expect(registerTool.mock.calls.map(([name]) => name)).toEqual([
      "hds_search_docs",
      "hds_read_doc",
    ]);
  });
});
