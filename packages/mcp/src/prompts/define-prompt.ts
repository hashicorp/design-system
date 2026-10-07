/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { NOOP_TELEMETRY, withPromptTelemetry } from "../telemetry/index.js";

import type {
  McpServer,
  PromptCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZodRawShapeCompat } from "@modelcontextprotocol/sdk/server/zod-compat.js";
import type { Telemetry } from "../telemetry/index.js";
import type { McpPrompt } from "./types.js";

export interface PromptRegistration {
  name: string;
  register: (server: McpServer, telemetry?: Telemetry) => void;
}

export const definePrompt = <Args extends ZodRawShapeCompat>(
  prompt: McpPrompt<Args>,
): PromptRegistration => ({
  name: prompt.name,
  register: (server, telemetry = NOOP_TELEMETRY) => {
    // the sdk's callback type is conditional on the args shape, which a generic wrapper
    // cannot resolve; the wrapper forwards its arguments untouched, so the shape holds
    const callback = withPromptTelemetry(
      prompt.name,
      prompt.callback as Parameters<typeof withPromptTelemetry>[1],
      telemetry,
    ) as PromptCallback<Args>;

    server.registerPrompt(prompt.name, prompt.config, callback);
  },
});
