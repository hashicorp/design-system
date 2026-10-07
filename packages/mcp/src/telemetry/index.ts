/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { createPostHogTelemetry } from "./posthog.js";

import type { TelemetryConfig } from "./config.js";
import type { Telemetry } from "./types.js";

export { TELEMETRY_ENV_VAR, resolveTelemetryConfig } from "./config.js";
export type { Telemetry } from "./types.js";

const NOOP_TELEMETRY: Telemetry = {
  track: () => {},
  shutdown: async () => {},
};

// the posthog client is only constructed once the user has opted in
export const createTelemetry = (config: TelemetryConfig | null): Telemetry =>
  config === null ? NOOP_TELEMETRY : createPostHogTelemetry(config);
