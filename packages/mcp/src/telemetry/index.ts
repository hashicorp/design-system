/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { createPostHogTelemetry } from "./posthog.js";

import type { TelemetryConfig } from "./config.js";
import type { Telemetry } from "./types.js";

export { TELEMETRY_ENV_VAR, resolveTelemetryConfig } from "./config.js";
export { withPromptTelemetry } from "./prompt-events.js";
export { withResourceTelemetry } from "./resource-events.js";
export { trackSessionInitialized } from "./session.js";
export { withToolTelemetry } from "./tool-events.js";
export type { Telemetry } from "./types.js";

// registrars default to this, so a server built without telemetry behaves as it did before
export const NOOP_TELEMETRY: Telemetry = {
  track: () => {},
  shutdown: async () => {},
};

// the posthog client is only constructed once the user has opted in
export const createTelemetry = (config: TelemetryConfig | null): Telemetry =>
  config === null ? NOOP_TELEMETRY : createPostHogTelemetry(config);
