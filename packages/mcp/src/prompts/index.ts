/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { definePrompt } from "./define-prompt.js";

import chooseComponentPrompt from "./choose-component.js";
import implementPatternPrompt from "./implement-pattern.js";
import reviewUsagePrompt from "./review-usage.js";
import troubleshootComponentPrompt from "./troubleshoot-component.js";

import { NOOP_TELEMETRY } from "../telemetry/index.js";

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Telemetry } from "../telemetry/index.js";

const PROMPTS = [
  definePrompt(chooseComponentPrompt),
  definePrompt(implementPatternPrompt),
  definePrompt(reviewUsagePrompt),
  definePrompt(troubleshootComponentPrompt),
];

export function registerPrompts(
  server: McpServer,
  telemetry: Telemetry = NOOP_TELEMETRY,
) {
  for (const prompt of PROMPTS) {
    prompt.register(server, telemetry);
  }
}
