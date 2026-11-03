/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// one `prompt_requested` event per prompt; its arguments are free text and are never sent

import { withCallTelemetry } from "./call-telemetry.js";
import { PROMPT_REQUESTED_EVENT } from "./events.js";

import type { Telemetry } from "./types.js";
import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";

export const withPromptTelemetry = <TArgs extends unknown[]>(
  promptName: string,
  handler: (...args: TArgs) => GetPromptResult | Promise<GetPromptResult>,
  telemetry: Telemetry,
): ((...args: TArgs) => Promise<GetPromptResult>) =>
  withCallTelemetry(handler, {
    telemetry,
    event: PROMPT_REQUESTED_EVENT,
    toProperties: ({ result }) => ({
      prompt: promptName,
      outcome: result === undefined ? "error" : "ok",
    }),
  });
