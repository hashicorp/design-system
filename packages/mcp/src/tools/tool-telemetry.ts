/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ToolTelemetryMapper } from "../telemetry/tool-events.js";
import type { TelemetryProperties } from "../telemetry/types.js";

/**
 * Types a tool's telemetry mapper against its own input and payload. The mapper only runs on
 * a successful call, where the args are what the sdk validated against the tool's input
 * schema and the content is the payload the tool built, so the one cast here holds.
 */
export const defineToolTelemetry =
  <TArgs, TContent>(
    mapper: (args: TArgs, content: TContent) => TelemetryProperties,
  ): ToolTelemetryMapper =>
  ({ args, content }) =>
    mapper(args as TArgs, content as TContent);
