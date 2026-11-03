/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { PostHog } from "posthog-node";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTelemetry } from "../../../src/telemetry/index.js";
import { watchStdout } from "../../support/stdout.js";

import type { TelemetryConfig } from "../../../src/telemetry/config.js";
import type { MockInstance } from "vitest";

vi.mock("posthog-node", () => ({ PostHog: vi.fn() }));

const PostHogMock = vi.mocked(PostHog);

const PRODUCTION: TelemetryConfig = { apiKey: "production-key", debug: false };
const DEVELOPMENT: TelemetryConfig = { apiKey: "development-key", debug: true };

const client = {
  capture: vi.fn(),
  shutdown: vi.fn(),
  on: vi.fn(),
};

const getErrorListener = (): ((error: unknown) => void) =>
  client.on.mock.calls[0][1];

let consoleErrorSpy: MockInstance;
let expectNoStdoutWrites: () => void;

beforeEach(() => {
  vi.resetAllMocks();

  client.shutdown.mockResolvedValue(undefined);
  // a `function` is required so the mock can be called with `new`
  PostHogMock.mockImplementation(function () {
    // the test double only implements the methods telemetry uses
    return client as unknown as PostHog;
  });

  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  expectNoStdoutWrites = watchStdout();
});

afterEach(() => {
  expectNoStdoutWrites();

  vi.restoreAllMocks();
});

describe("createTelemetry when disabled", () => {
  it("never constructs a client", async () => {
    const telemetry = createTelemetry(null);

    telemetry.track("event");
    await telemetry.shutdown();

    expect(PostHogMock).not.toHaveBeenCalled();
  });
});

describe("createTelemetry when enabled", () => {
  it("sends with the configured key to the EU region with geoip disabled", () => {
    createTelemetry(PRODUCTION);

    expect(PostHogMock).toHaveBeenCalledWith("production-key", {
      host: "https://eu.i.posthog.com",
      disableGeoip: true,
    });
  });

  it("sends with the configured key in debug mode", () => {
    createTelemetry(DEVELOPMENT);

    expect(PostHogMock).toHaveBeenCalledWith(
      "development-key",
      expect.anything()
    );
  });

  it("captures events without creating a person profile", () => {
    createTelemetry(PRODUCTION).track("hds_mcp_example", { count: 2 });

    expect(client.capture).toHaveBeenCalledWith({
      distinctId: expect.any(String),
      event: "hds_mcp_example",
      properties: { count: 2, $process_person_profile: false },
    });
  });

  it("reuses one distinct id per client and creates a new one per client", () => {
    const first = createTelemetry(PRODUCTION);
    const second = createTelemetry(PRODUCTION);

    first.track("a");
    first.track("b");
    second.track("c");

    const [a, b, c] = client.capture.mock.calls.map(
      ([message]) => message.distinctId
    );

    expect(a).toBe(b);
    expect(a).not.toBe(c);
  });

  it("does not throw when capture fails", () => {
    client.capture.mockImplementation(() => {
      throw new Error("boom");
    });

    expect(() => createTelemetry(PRODUCTION).track("event")).not.toThrow();
  });

  it("flushes with a bounded timeout on shutdown", async () => {
    await createTelemetry(PRODUCTION).shutdown();

    expect(client.shutdown).toHaveBeenCalledWith(expect.any(Number));
  });

  it("does not throw when shutdown fails", async () => {
    client.shutdown.mockRejectedValue(new Error("offline"));

    await expect(
      createTelemetry(PRODUCTION).shutdown()
    ).resolves.toBeUndefined();
  });

  it("does not log itself outside debug mode", () => {
    createTelemetry(PRODUCTION).track("event");
    getErrorListener()(new Error("network"));

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("logs tracked events and client errors to stderr in debug mode", () => {
    const error = new Error("network");

    createTelemetry(DEVELOPMENT).track("event", { count: 1 });
    getErrorListener()(error);

    expect(client.on).toHaveBeenCalledWith("error", expect.any(Function));
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[telemetry]",
      "track",
      "event",
      { count: 1 }
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith("[telemetry]", "error", error);
  });
});
