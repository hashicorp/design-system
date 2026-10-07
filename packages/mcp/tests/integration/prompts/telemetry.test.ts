/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { registerPrompts } from "../../../src/prompts/index.js";
import {
  createRecordingTelemetry,
  getSentValues,
} from "../../support/recording-telemetry.js";

import type { RecordingTelemetry } from "../../support/recording-telemetry.js";

describe("prompt telemetry", () => {
  let client: Client;
  let server: McpServer;
  let recording: RecordingTelemetry;

  beforeEach(async () => {
    recording = createRecordingTelemetry();
    client = new Client({ name: "test-client", version: "1.0.0" });
    server = new McpServer({ name: "test-server", version: "1.0.0" });
    registerPrompts(server, recording.telemetry);
    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();
    await server.connect(serverTransport);
    await client.connect(clientTransport);
  });

  afterEach(async () => {
    await client.close();
    await server.close();
  });

  it("reports a requested prompt by name without its arguments", async () => {
    await client.getPrompt({
      name: "choose_hds_component",
      arguments: { requirements: "A selector for Acme billing regions" },
    });

    expect(recording.events).toStrictEqual([
      {
        event: "hds_mcp_prompt_requested",
        properties: { prompt: "choose_hds_component", outcome: "ok" },
      },
    ]);
    expect(JSON.stringify(getSentValues(recording.events))).not.toContain(
      "Acme",
    );
  });
});
