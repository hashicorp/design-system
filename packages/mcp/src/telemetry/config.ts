/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// decides whether usage telemetry is on; it is opt-in and off by default

export const TELEMETRY_ENV_VAR = "HDS_MCP_TELEMETRY";
export const DO_NOT_TRACK_ENV_VAR = "DO_NOT_TRACK";
export const POSTHOG_API_KEY_ENV_VAR = "HDS_MCP_POSTHOG_API_KEY";
export const POSTHOG_DEV_API_KEY_ENV_VAR = "HDS_MCP_POSTHOG_DEV_API_KEY";

export type TelemetryConfig = {
  apiKey: string;
  debug: boolean;
};

export type ResolveTelemetryConfigInput = {
  env: NodeJS.ProcessEnv;
};

const DO_NOT_TRACK_OFF_VALUES = new Set(["", "0", "false"]);

const normalize = (value: string | undefined): string =>
  (value ?? "").trim().toLowerCase();

const resolveDebug = (value: string | undefined): boolean | null => {
  switch (normalize(value)) {
    case "1":
    case "true":
      return false;
    case "debug":
      return true;
    default:
      return null;
  }
};

// null means telemetry is disabled
export const resolveTelemetryConfig = ({
  env,
}: ResolveTelemetryConfigInput): TelemetryConfig | null => {
  if (
    DO_NOT_TRACK_OFF_VALUES.has(normalize(env[DO_NOT_TRACK_ENV_VAR])) === false
  ) {
    return null;
  }

  const debug = resolveDebug(env[TELEMETRY_ENV_VAR]);

  if (debug === null) {
    return null;
  }

  const apiKey = (
    env[debug ? POSTHOG_DEV_API_KEY_ENV_VAR : POSTHOG_API_KEY_ENV_VAR] ?? ""
  ).trim();

  // without a key there is nowhere to send events
  if (apiKey === "") {
    return null;
  }

  return { apiKey, debug };
};
