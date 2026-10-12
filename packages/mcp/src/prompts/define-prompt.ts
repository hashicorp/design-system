/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZodRawShapeCompat } from "@modelcontextprotocol/sdk/server/zod-compat.js";
import type { McpPrompt } from "./types.js";

export interface PromptRegistration {
  name: string;
  register: (server: McpServer) => void;
}

export const definePrompt = <Args extends ZodRawShapeCompat>(
  prompt: McpPrompt<Args>,
): PromptRegistration => ({
  name: prompt.name,
  register: (server) => {
    server.registerPrompt(prompt.name, prompt.config, prompt.callback);
  },
});
