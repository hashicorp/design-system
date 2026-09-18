/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { definePrompt } from "./define-prompt.js";

import chooseComponentPrompt from "./choose-component.js";
import implementPatternPrompt from "./implement-pattern.js";
import reviewUsagePrompt from "./review-usage.js";
import troubleshootComponentPrompt from "./troubleshoot-component.js";

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const PROMPTS = [
  definePrompt(chooseComponentPrompt),
  definePrompt(implementPatternPrompt),
  definePrompt(reviewUsagePrompt),
  definePrompt(troubleshootComponentPrompt),
];

export function registerPrompts(server: McpServer) {
  for (const prompt of PROMPTS) {
    prompt.register(server);
  }
}
