/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// posthog-backed telemetry; failures never throw because telemetry is
// nonessential, and our diagnostics go to stderr since stdout is the transport
import { randomUUID } from "node:crypto";
import { PostHog } from "posthog-node";

import type { TelemetryConfig } from "./config.js";
import type { Telemetry, TelemetryProperties } from "./types.js";

const POSTHOG_HOST = "https://eu.i.posthog.com";
const SHUTDOWN_TIMEOUT_MS = 2000;

export const createPostHogTelemetry = ({
  apiKey,
  debug,
}: TelemetryConfig): Telemetry => {
  // never call `client.debug()`: posthog logs through console.log, which would
  // corrupt the stdio transport
  const client = new PostHog(apiKey, {
    host: POSTHOG_HOST,
    disableGeoip: true,
  });

  // a fresh id per process means sessions cannot be linked to a person
  const distinctId = randomUUID();

  const log = (...args: unknown[]): void => {
    if (debug) {
      console.error("[telemetry]", ...args);
    }
  };

  client.on("error", (error: unknown) => log("error", error));

  return {
    track: (event: string, properties: TelemetryProperties = {}): void => {
      try {
        client.capture({
          distinctId,
          event,
          properties: { ...properties, $process_person_profile: false },
        });

        log("track", event, properties);
      } catch (error: unknown) {
        log("track failed", error);
      }
    },
    shutdown: async (): Promise<void> => {
      try {
        await client.shutdown(SHUTDOWN_TIMEOUT_MS);
      } catch (error: unknown) {
        log("shutdown failed", error);
      }
    },
  };
};
