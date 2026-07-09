/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { Implementation } from "@modelcontextprotocol/sdk/types.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = dirname(currentFilePath);

describe("test entry point", () => {
  it("runs vitest in the mcp package", () => {
    expect(true).toBe(true);
  });

  it("uses the expected package name", () => {
    const packageJsonPath = resolve(currentDirectoryPath, "../package.json");
    const rawPackageJson = readFileSync(packageJsonPath, "utf8");
    const packageJson = JSON.parse(rawPackageJson) as { name?: unknown };

    expect(packageJson.name).toBe("@hashicorp/design-system-mcp");
  });

  it("can construct an MCP server instance", () => {
    const serverInfo: Implementation = {
      name: "helios-design-system-mcp",
      version: "0.0.0",
    };

    const server = new McpServer(serverInfo);

    expect(server).toBeInstanceOf(McpServer);
  });
});
