/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  MAX_CLIENT_FIELD_LENGTH,
  toSessionProperties,
  trackSessionInitialized,
} from "../../../src/telemetry/session.js";
import { createRecordingTelemetry } from "../../support/recording-telemetry.js";
import { watchStdout } from "../../support/stdout.js";

const BASE_INPUT = {
  serverVersion: "0.3.0",
  nodeVersion: "24.4.1",
  platform: "darwin",
};

let expectNoStdoutWrites: () => void;

beforeEach(() => {
  expectNoStdoutWrites = watchStdout();
});

afterEach(() => {
  expectNoStdoutWrites();
  vi.restoreAllMocks();
});

describe("toSessionProperties", () => {
  it("reports the client, server and runtime", () => {
    expect(
      toSessionProperties({
        ...BASE_INPUT,
        clientInfo: { name: "claude-code", version: "2.1.0" },
      }),
    ).toStrictEqual({
      clientName: "claude-code",
      clientVersion: "2.1.0",
      serverVersion: "0.3.0",
      nodeMajor: 24,
      platform: "darwin",
    });
  });

  it("bounds self-reported client fields", () => {
    const properties = toSessionProperties({
      ...BASE_INPUT,
      clientInfo: { name: "x".repeat(200), version: ` ${"1".repeat(200)} ` },
    });

    expect(properties.clientName).toHaveLength(MAX_CLIENT_FIELD_LENGTH);
    expect(properties.clientVersion).toHaveLength(MAX_CLIENT_FIELD_LENGTH);
  });

  it("leaves out client fields the client did not send", () => {
    const properties = toSessionProperties({
      ...BASE_INPUT,
      clientInfo: undefined,
    });

    expect(properties).not.toHaveProperty("clientName");
    expect(properties).not.toHaveProperty("clientVersion");
  });

  it("leaves out an unparseable node version", () => {
    const properties = toSessionProperties({
      ...BASE_INPUT,
      nodeVersion: "unknown",
      clientInfo: undefined,
    });

    expect(properties).not.toHaveProperty("nodeMajor");
  });
});

describe("trackSessionInitialized", () => {
  let client: Client;
  let server: McpServer;

  beforeEach(() => {
    client = new Client({ name: "test-client", version: "1.2.3" });
    server = new McpServer({ name: "test-server", version: "0.3.0" });
  });

  afterEach(async () => {
    await client.close();
    await server.close();
  });

  const connect = async (): Promise<void> => {
    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();

    await server.connect(serverTransport);
    await client.connect(clientTransport);
  };

  // the initialized notification is delivered after connect resolves, so events are awaited

  it("reports one event once the client completes the handshake", async () => {
    const { telemetry, events } = createRecordingTelemetry();

    trackSessionInitialized(server, telemetry, "0.3.0");

    expect(events).toStrictEqual([]);

    await connect();
    await vi.waitFor(() => expect(events).toHaveLength(1));

    expect(events[0]).toStrictEqual({
      event: "hds_mcp_session_initialized",
      properties: expect.objectContaining({
        clientName: "test-client",
        clientVersion: "1.2.3",
        serverVersion: "0.3.0",
      }),
    });
  });

  it("keeps an initialized handler that was already installed", async () => {
    const { telemetry, events } = createRecordingTelemetry();
    const previous = vi.fn();

    server.server.oninitialized = previous;
    trackSessionInitialized(server, telemetry, "0.3.0");

    await connect();
    await vi.waitFor(() => expect(events).toHaveLength(1));

    expect(previous).toHaveBeenCalledOnce();
  });

  it("does not interrupt the handshake when tracking throws", async () => {
    trackSessionInitialized(
      server,
      {
        track: () => {
          throw new Error("offline");
        },
        shutdown: async () => {},
      },
      "0.3.0",
    );

    await connect();

    await expect(client.ping()).resolves.toBeDefined();
  });
});
