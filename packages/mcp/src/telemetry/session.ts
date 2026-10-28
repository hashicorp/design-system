/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// one `session_initialized` event once the client has finished the mcp handshake, which is
// the first point the client's self-reported name and version are known

import { SESSION_INITIALIZED_EVENT } from "./events.js";
import { withDefined } from "./properties.js";

import type { Telemetry, TelemetryProperties } from "./types.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Implementation } from "@modelcontextprotocol/sdk/types.js";

// client info is self-reported, so it is bounded before it is sent
export const MAX_CLIENT_FIELD_LENGTH = 64;

export interface SessionPropertiesInput {
  clientInfo: Implementation | undefined;
  serverVersion: string;
  nodeVersion: string;
  platform: string;
}

const toBoundedString = (value: string | undefined): string | null => {
  const trimmed = (value ?? "").trim();

  return trimmed === "" ? null : trimmed.slice(0, MAX_CLIENT_FIELD_LENGTH);
};

const toMajorVersion = (version: string): number | null => {
  const major = Number.parseInt(version, 10);

  return Number.isNaN(major) ? null : major;
};

export const toSessionProperties = ({
  clientInfo,
  serverVersion,
  nodeVersion,
  platform,
}: SessionPropertiesInput): TelemetryProperties =>
  withDefined([
    ["clientName", toBoundedString(clientInfo?.name)],
    ["clientVersion", toBoundedString(clientInfo?.version)],
    ["serverVersion", serverVersion],
    ["nodeMajor", toMajorVersion(nodeVersion)],
    ["platform", platform],
  ]);

export const trackSessionInitialized = (
  server: McpServer,
  telemetry: Telemetry,
  serverVersion: string,
): void => {
  const previous = server.server.oninitialized;

  server.server.oninitialized = () => {
    previous?.();

    try {
      telemetry.track(
        SESSION_INITIALIZED_EVENT,
        toSessionProperties({
          clientInfo: server.server.getClientVersion(),
          serverVersion,
          nodeVersion: process.versions.node,
          platform: process.platform,
        }),
      );
    } catch {
      // telemetry is nonessential, so a failure here must never interrupt the handshake
    }
  };
};
