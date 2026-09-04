/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { McpPrompt } from "./types.js";
const PROMPTS: McpPrompt[] = [];

export function registerPrompts(server: McpServer) {
  for (const prompt of PROMPTS) {
    server.registerPrompt(prompt.name, prompt.config, prompt.callback);
  }
}
