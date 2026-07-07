/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { dirname, resolve } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

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
  };

  const onSigint = (): void => {
    void shutdown("SIGINT").finally(() => process.exit(process.exitCode ?? 0));
  };

  const onSigterm = (): void => {
    void shutdown("SIGTERM").finally(() => process.exit(process.exitCode ?? 0));
  };

  const onUnhandledRejection = (reason: unknown): void => {
    void shutdown("unhandledRejection", reason).finally(() =>
      process.exit(process.exitCode ?? 1),
    );
  };

  const onUncaughtException = (error: Error): void => {
    void shutdown("uncaughtException", error).finally(() =>
      process.exit(process.exitCode ?? 1),
    );
  };

  process.once("SIGINT", onSigint);
  process.once("SIGTERM", onSigterm);
  process.once("unhandledRejection", onUnhandledRejection);
  process.once("uncaughtException", onUncaughtException);

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

    shutdown = installLifecycleHandlers(server).shutdown;

    const transport = new StdioServerTransport();

    await server.connect(transport);

    // STDIO servers must never write to stdout; use stderr for diagnostics.
    console.error("Helios Design System MCP server running on stdio");
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
