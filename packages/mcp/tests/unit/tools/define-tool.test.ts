/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { describe, expect, it, vi } from "vitest";
import { defineTool } from "../../../src/tools/define-tool.js";
import { toJsonToolResponse } from "../../../src/tools/responses.js";

const inputShape = { query: z.string().min(1) };

describe("defineTool", () => {
  it("registers nothing until it is handed a server", () => {
    const server = new McpServer({ name: "test-server", version: "0.0.0" });

    const registerTool = vi.spyOn(server, "registerTool");

    defineTool({
      name: "search_hds_docs",
      config: { inputSchema: inputShape },
      executeCallback: ({ query }) => toJsonToolResponse({ query }),
    });

    expect(registerTool).not.toHaveBeenCalled();
  });

  it("passes the name, config and callback through to registerTool", () => {
    const server = new McpServer({ name: "test-server", version: "0.0.0" });

    const registerTool = vi.spyOn(server, "registerTool");

    const config = {
      title: "Search HDS documentation",
      inputSchema: inputShape,
      annotations: { readOnlyHint: true, openWorldHint: false },
    };
    const tool = defineTool({
      name: "search_hds_docs",
      config,
      executeCallback: ({ query }) => toJsonToolResponse({ query }),
    });

    expect(tool.name).toBe("search_hds_docs");

    tool.register(server);

    expect(registerTool).toHaveBeenCalledOnce();
    expect(registerTool).toHaveBeenCalledWith(
      "search_hds_docs",
      config,
      expect.any(Function),
    );
  });

  it("holds tools with different input shapes in one array", () => {
    const tools = [
      defineTool({
        name: "search_hds_docs",
        config: { inputSchema: inputShape },
        executeCallback: ({ query }) => toJsonToolResponse({ query }),
      }),
      defineTool({
        name: "read_hds_docs",
        config: { inputSchema: { id: z.string(), maxBytes: z.number() } },
        executeCallback: ({ id, maxBytes }) =>
          toJsonToolResponse({ id, maxBytes }),
      }),
    ];

    expect(tools.map((tool) => tool.name)).toStrictEqual([
      "search_hds_docs",
      "read_hds_docs",
    ]);
  });
});
