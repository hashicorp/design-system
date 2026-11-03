/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { describe, expect, it, vi } from "vitest";
import { defineTool } from "../../../src/tools/define-tool.js";
import { toJsonToolResponse } from "../../../src/tools/responses.js";
import { createRecordingTelemetry } from "../../support/recording-telemetry.js";
import { buildRequestHandlerExtra } from "../../support/request-handler.js";
import { captureToolRegistrations } from "../../support/tool-registration.js";

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

  it("reports each call to the telemetry it is registered with", async () => {
    const { telemetry, events } = createRecordingTelemetry();
    const tool = defineTool({
      name: "search_hds_docs",
      config: { inputSchema: inputShape },
      executeCallback: ({ query }) =>
        toJsonToolResponse({ query, totalMatches: 1 }),
    });

    const [{ callback }] = captureToolRegistrations((server) =>
      tool.register(server, telemetry),
    );
    const result = await callback(
      { query: "button" },
      buildRequestHandlerExtra(),
    );

    expect(result.structuredContent).toStrictEqual({
      query: "button",
      totalMatches: 1,
    });
    expect(events).toStrictEqual([
      {
        event: "hds_mcp_tool_called",
        properties: expect.objectContaining({
          tool: "search_hds_docs",
          outcome: "ok",
        }),
      },
    ]);
  });

  it("registers a working callback when no telemetry is given", async () => {
    const tool = defineTool({
      name: "search_hds_docs",
      config: { inputSchema: inputShape },
      executeCallback: ({ query }) => toJsonToolResponse({ query }),
    });

    const [{ callback }] = captureToolRegistrations((server) =>
      tool.register(server),
    );

    await expect(
      callback({ query: "button" }, buildRequestHandlerExtra()),
    ).resolves.toMatchObject({ structuredContent: { query: "button" } });
  });
});
