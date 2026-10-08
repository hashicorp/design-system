#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { dirname, resolve } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { registerPrompts } from "./prompts/index.js";
import { registerResources } from "./resources/index.js";
import {
  TELEMETRY_ENV_VAR,
  createTelemetry,
  resolveTelemetryConfig,
} from "./telemetry/index.js";
import { registerTools } from "./tools/index.js";

import type { Telemetry } from "./telemetry/index.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = dirname(currentFilePath);
const packageJsonPath = resolve(currentDirectoryPath, "../package.json");
const defaultServerVersion = "0.0.0";

const getServerVersion = (): string => {
  try {
    const rawPackageJson = readFileSync(packageJsonPath, "utf8");
    const parsedPackageJson = JSON.parse(rawPackageJson) as {
      version?: unknown;
    };

    if (typeof parsedPackageJson.version === "string") {
      return parsedPackageJson.version;
    }
  } catch (error: unknown) {
    console.error("Unable to read MCP package version:", error);
  }

  return defaultServerVersion;
};

const buildServer = (): McpServer => {
  const server = new McpServer({
    name: "helios-design-system-mcp",
    version: getServerVersion(),
  });

  return server;
};

const installLifecycleHandlers = (
  server: McpServer,
  telemetry: Telemetry,
): { shutdown: (reason: string, error?: unknown) => Promise<void> } => {
  let isShuttingDown = false;

  const shutdown = async (reason: string, error?: unknown): Promise<void> => {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;

    if (error) {
      process.exitCode = 1;

      console.error(`Shutting down MCP server due to ${reason}:`, error);
    } else {
      console.error(`Shutting down MCP server (${reason})`);
    }

    try {
      await server.close();

      console.error("MCP server shutdown complete");
    } catch (closeError: unknown) {
      process.exitCode = 1;

      console.error("Failed to close MCP server cleanly:", closeError);
    }

    await telemetry.shutdown();
  };

  const shutdownAndExit = (
    reason: string,
    defaultExitCode: number,
    error?: unknown,
  ): void => {
    void shutdown(reason, error).finally(() =>
      process.exit(process.exitCode ?? defaultExitCode),
    );
  };

  process.once("SIGINT", () => shutdownAndExit("SIGINT", 0));
  process.once("SIGTERM", () => shutdownAndExit("SIGTERM", 0));
  process.once("unhandledRejection", (reason: unknown) =>
    shutdownAndExit("unhandledRejection", 1, reason),
  );
  process.once("uncaughtException", (error: Error) =>
    shutdownAndExit("uncaughtException", 1, error),
  );
  // stdio clients disconnect by closing stdin; without this the process exits
  // before telemetry can flush
  process.stdin.once("end", () => shutdownAndExit("stdin closed", 0));

  return {
    shutdown,
  };
};

const main = async (): Promise<void> => {
  let shutdown:
    | ((reason: string, error?: unknown) => Promise<void>)
    | undefined;

  try {
    const server = buildServer();
    const telemetryConfig = resolveTelemetryConfig({ env: process.env });
    const telemetry = createTelemetry(telemetryConfig);

    shutdown = installLifecycleHandlers(server, telemetry).shutdown;

    registerPrompts(server);
    registerResources(server);
    registerTools(server);

    const transport = new StdioServerTransport();

    await server.connect(transport);

    // STDIO servers must never write to stdout; use stderr for diagnostics.
    console.error("Helios Design System MCP server running on stdio");

    if (telemetryConfig !== null) {
      const mode = telemetryConfig.debug ? " in debug mode" : "";

      console.error(
        `Usage telemetry is enabled${mode}. Unset ${TELEMETRY_ENV_VAR} to disable it.`,
      );
    }
  } catch (error: unknown) {
    if (shutdown) {
      await shutdown("startup-failure", error);
    } else {
      console.error("Failed to initialize MCP server:", error);
    }

    throw error;
  }
};

void main().catch((error: unknown) => {
  console.error("Fatal error in MCP server:", error);

  process.exit(1);
});
