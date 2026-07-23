/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { registerTools } from "../../../src/tools/index.js";

describe("code examples tools", () => {
  let client: Client;
  let server: McpServer;

  beforeEach(async () => {
    server = new McpServer({ name: "test-server", version: "0.0.0" });
    client = new Client({ name: "test-client", version: "0.0.0" });
    registerTools(server);

    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();

    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport),
    ]);
  });

  afterEach(async () => {
    await Promise.allSettled([client.close(), server.close()]);
  });

  it("searches and reads the generated code examples catalog", async () => {
    const searchResult = await client.callTool({
      name: "hds_search_code_examples",
      arguments: { query: "accordion", limit: 5 },
    });

    const searchOutput = searchResult.structuredContent as {
      results: Array<{ exampleId: string; component: string }>;
      resultCount: number;
    };

    expect(searchOutput.resultCount).toBeGreaterThan(0);
    expect(searchOutput.results[0]?.component).toBe("accordion");

    const firstResult = searchOutput.results[0];

    const readResult = await client.callTool({
      name: "hds_read_code_example",
      arguments: { exampleId: firstResult?.exampleId },
    });

    expect(readResult.structuredContent).toMatchObject({
      found: true,
      example: {
        component: "accordion",
        language: "gts",
      },
    });
  });

  it("returns structured and text content parity", async () => {
    const result = await client.callTool({
      name: "hds_search_code_examples",
      arguments: { query: "button", limit: 3 },
    });

    const content = result.content as Array<{ type: string; text: string }>;
    expect(content[0]).toMatchObject({ type: "text" });
    expect(result.structuredContent).toMatchObject({
      query: "button",
      resultCount: expect.any(Number),
    });

    const textContent = JSON.parse(content[0]?.text ?? "{}") as Record<
      string,
      unknown
    >;

    expect(textContent).toEqual(result.structuredContent);
  });

  it("returns not-found for an unknown example id", async () => {
    const result = await client.callTool({
      name: "hds_read_code_example",
      arguments: { exampleId: "page-components/nonexistent/code-fragments/example" },
    });

    expect(result.structuredContent).toMatchObject({
      found: false,
      message: expect.stringContaining("not found"),
    });
  });

  it("filters search results by component", async () => {
    const result = await client.callTool({
      name: "hds_search_code_examples",
      arguments: { query: "with", component: "accordion", limit: 10 },
    });

    const output = result.structuredContent as {
      results: Array<{ component: string }>;
    };

    expect(output.results.length).toBeGreaterThan(0);
    expect(output.results.every((r) => r.component === "accordion")).toBe(true);
  });
});
