/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { Implementation } from "@modelcontextprotocol/sdk/types.js";

describe("test entry point", () => {
  it("runs vitest in the mcp package", () => {
    expect(true).toBe(true);
  });

  it("can construct an MCP server instance", () => {
    const serverInfo: Implementation = {
      name: "helios-design-system-mcp",
      version: "0.0.0",
    };

    const server = new McpServer(serverInfo);

    expect(server).toBeInstanceOf(McpServer);
  });
});
