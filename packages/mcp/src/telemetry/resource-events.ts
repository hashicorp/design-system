/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// one `resource_read` event per resource read; the uri and its variables are never sent

import { withCallTelemetry } from "./call-telemetry.js";
import { RESOURCE_READ_EVENT } from "./events.js";

import type { Telemetry } from "./types.js";
import type { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

export const withResourceTelemetry = <TArgs extends unknown[]>(
  resourceName: string,
  handler: (...args: TArgs) => ReadResourceResult | Promise<ReadResourceResult>,
  telemetry: Telemetry,
): ((...args: TArgs) => Promise<ReadResourceResult>) =>
  withCallTelemetry(handler, {
    telemetry,
    event: RESOURCE_READ_EVENT,
    toProperties: ({ result, durationMs, isFirstCall }) => ({
      resource: resourceName,
      outcome: result === undefined ? "error" : "ok",
      durationMs,
      isFirstCall,
    }),
  });
