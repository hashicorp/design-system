/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { dirname, resolve } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadIconCatalog } from "./stores/flight-icons/store.js";
import { withSafeResourceHandler } from "./utils/resources.js";
import {
  readIconsResource,
  readIconResource,
} from "./resources/flight-icons.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = dirname(currentFilePath);
const packageJsonPath = resolve(currentDirectoryPath, "../package.json");
const defaultServerVersion = "0.0.0";

const ICONS_URI = "hds://icons";
const ICON_URI_TEMPLATE = `${ICONS_URI}/{iconName}`;

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

  const iconStore = loadIconCatalog();

  server.registerResource(
    "get_hds_icons",
    ICONS_URI,
    {
      title: "HDS icon catalog index",
      description: "Canonical list of Flight icons with summary metadata.",
      mimeType: "application/json",
    },
    withSafeResourceHandler(
      "get_hds_icons",
      async () => {
        return readIconsResource(iconStore);
      },
      ICONS_URI,
    ),
  );

  server.registerResource(
    "get_hds_icon",
    new ResourceTemplate(ICON_URI_TEMPLATE, {
      list: undefined,
      complete: {
        iconName: (value) => {
          const normalizedValue = value.trim().toLowerCase();

          return iconStore
            .listIcons()
            .map((icon) => icon.iconName)
            .filter((iconName) => {
              if (normalizedValue === "") {
                return true;
              }

              return iconName.toLowerCase().includes(normalizedValue);
            })
            .slice(0, 25);
        },
      },
    }),
    {
      title: "HDS icon catalog entry",
      description: "Detailed metadata for a specific Flight icon.",
      mimeType: "application/json",
    },
    withSafeResourceHandler("get_hds_icon", async (_uri, variables) => {
      const iconName = variables["iconName"];

      if (typeof iconName !== "string" || iconName.trim() === "") {
        throw new Error(
          'Resource variable "iconName" must be a non-empty string.',
        );
      }

      return readIconResource(iconStore, iconName);
    }),
  );

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
    void shutdown("SIGINT");
  };

  const onSigterm = (): void => {
    void shutdown("SIGTERM");
  };

  const onUnhandledRejection = (reason: unknown): void => {
    void shutdown("unhandledRejection", reason);
  };

  const onUncaughtException = (error: Error): void => {
    void shutdown("uncaughtException", error);
  };

  process.on("SIGINT", onSigint);
  process.on("SIGTERM", onSigterm);
  process.on("unhandledRejection", onUnhandledRejection);
  process.on("uncaughtException", onUncaughtException);

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

main().catch((error: unknown) => {
  console.error("Fatal error starting MCP server:", error);
  process.exit(1);
});
