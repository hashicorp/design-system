/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { registerTools } from "../../../src/tools/index.js";

describe("documentation tools", () => {
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

  it("searches and reads the generated website catalog", async () => {
    const searchResult = await client.callTool({
      name: "hds_search_docs",
      arguments: { query: "accordion", scope: "components", limit: 1 },
    });
    const searchOutput = searchResult.structuredContent as {
      results: Array<{ docId: string; sectionId: string }>;
    };
    const result = searchOutput.results[0];

    expect(result).toMatchObject({ docId: "components/accordion/index" });

    const readResult = await client.callTool({
      name: "hds_read_doc",
      arguments: {
        docId: result?.docId,
        sectionId: result?.sectionId,
        maxSections: 1,
      },
    });

    expect(readResult.structuredContent).toMatchObject({
      found: true,
      doc: { title: "Accordion" },
    });
  });
});
