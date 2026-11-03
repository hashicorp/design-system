/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  DO_NOT_TRACK_ENV_VAR,
  POSTHOG_API_KEY_ENV_VAR,
  POSTHOG_DEV_API_KEY_ENV_VAR,
  TELEMETRY_ENV_VAR,
  resolveTelemetryConfig,
} from "../../../src/telemetry/config.js";

const KEYS = {
  [POSTHOG_API_KEY_ENV_VAR]: "production-key",
  [POSTHOG_DEV_API_KEY_ENV_VAR]: "development-key",
};

const PRODUCTION = { apiKey: "production-key", debug: false };
const DEVELOPMENT = { apiKey: "development-key", debug: true };

const resolve = (env: NodeJS.ProcessEnv) =>
  resolveTelemetryConfig({ env: { ...KEYS, ...env } });

describe("resolveTelemetryConfig", () => {
  it("is disabled when nothing is set", () => {
    expect(resolveTelemetryConfig({ env: {} })).toBeNull();
  });

  it("is disabled when only the keys are set", () => {
    expect(resolve({})).toBeNull();
  });

  it.each(["1", "true", " TRUE "])(
    "opts in with the production key for %j",
    (value) => {
      expect(resolve({ [TELEMETRY_ENV_VAR]: value })).toEqual(PRODUCTION);
    }
  );

  it.each(["debug", " Debug "])(
    "opts in to debug mode with the development key for %j",
    (value) => {
      expect(resolve({ [TELEMETRY_ENV_VAR]: value })).toEqual(DEVELOPMENT);
    }
  );

  it.each(["", "   ", "0", "false", "yes", "on"])(
    "stays disabled for %j",
    (value) => {
      expect(resolve({ [TELEMETRY_ENV_VAR]: value })).toBeNull();
    }
  );

  it.each([
    ["1", POSTHOG_API_KEY_ENV_VAR],
    ["debug", POSTHOG_DEV_API_KEY_ENV_VAR],
  ])(
    "stays disabled for HDS_MCP_TELEMETRY=%j when %s is missing or blank",
    (value, keyEnvVar) => {
      expect(
        resolve({ [TELEMETRY_ENV_VAR]: value, [keyEnvVar]: undefined })
      ).toBeNull();
      expect(
        resolve({ [TELEMETRY_ENV_VAR]: value, [keyEnvVar]: "  " })
      ).toBeNull();
    }
  );

  it("does not fall back to the other project's key", () => {
    expect(
      resolveTelemetryConfig({
        env: {
          [TELEMETRY_ENV_VAR]: "debug",
          [POSTHOG_API_KEY_ENV_VAR]: "production-key",
        },
      })
    ).toBeNull();
  });

  it("trims whitespace around the key", () => {
    expect(
      resolve({
        [TELEMETRY_ENV_VAR]: "1",
        [POSTHOG_API_KEY_ENV_VAR]: " production-key\n",
      })
    ).toEqual(PRODUCTION);
  });

  it.each([
    ["1", "1"],
    ["true", "1"],
    ["yes", "1"],
    ["1", "debug"],
  ])("lets DO_NOT_TRACK=%j override HDS_MCP_TELEMETRY=%j", (dnt, value) => {
    expect(
      resolve({ [TELEMETRY_ENV_VAR]: value, [DO_NOT_TRACK_ENV_VAR]: dnt })
    ).toBeNull();
  });

  it.each(["", "0", "false"])("ignores DO_NOT_TRACK=%j", (dnt) => {
    expect(
      resolve({ [TELEMETRY_ENV_VAR]: "1", [DO_NOT_TRACK_ENV_VAR]: dnt })
    ).toEqual(PRODUCTION);
  });
});
