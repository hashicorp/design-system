/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// captures what a registrar handed to registerTool, in a shape assertions can read
//
// registerTool is generic over both schema shapes, so the spy's own call tuple resolves to
// never; the capture is retyped once here rather than at every assertion site

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { vi } from "vitest";

import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import type {
  CallToolResult,
  ServerNotification,
  ServerRequest,
  ToolAnnotations,
} from "@modelcontextprotocol/sdk/types.js";

export type RegisteredToolCallback = (
  args: Record<string, unknown>,
  extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
) => Promise<CallToolResult> | CallToolResult;

export interface CapturedToolConfig {
  title?: string;
  description?: string;
  inputSchema?: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
  annotations?: ToolAnnotations;
}

export interface CapturedToolRegistration {
  name: string;
  config: CapturedToolConfig;
  callback: RegisteredToolCallback;
}

export const captureToolRegistrations = (
  register: (server: McpServer) => void,
): CapturedToolRegistration[] => {
  const server = new McpServer({ name: "test-server", version: "0.0.0" });
  const registerTool = vi.spyOn(server, "registerTool");

  register(server);

  const calls = registerTool.mock.calls as unknown as [
    string,
    CapturedToolConfig,
    RegisteredToolCallback,
  ][];

  return calls.map(([name, config, callback]) => ({ name, config, callback }));
};
