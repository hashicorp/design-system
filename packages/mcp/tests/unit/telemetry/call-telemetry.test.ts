/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { withCallTelemetry } from "../../../src/telemetry/call-telemetry.js";
import { createRecordingTelemetry } from "../../support/recording-telemetry.js";
import { watchStdout } from "../../support/stdout.js";

import type { TrackedCall } from "../../../src/telemetry/call-telemetry.js";

let expectNoStdoutWrites: () => void;

beforeEach(() => {
  expectNoStdoutWrites = watchStdout();
});

afterEach(() => {
  expectNoStdoutWrites();
  vi.restoreAllMocks();
});

describe("withCallTelemetry", () => {
  it("returns the handler's result and reports one event per call", async () => {
    const { telemetry, events } = createRecordingTelemetry();
    const handler = withCallTelemetry((value: number) => value * 2, {
      telemetry,
      event: "hds_mcp_test",
      toProperties: ({ result }) => ({ result: result ?? -1 }),
    });

    await expect(handler(2)).resolves.toBe(4);
    await expect(handler(3)).resolves.toBe(6);

    expect(events).toStrictEqual([
      { event: "hds_mcp_test", properties: { result: 4 } },
      { event: "hds_mcp_test", properties: { result: 6 } },
    ]);
  });

  it("hands the arguments, a whole-millisecond duration and first-call flag to the mapper", async () => {
    const { telemetry } = createRecordingTelemetry();
    const calls: TrackedCall<[string], string>[] = [];
    const handler = withCallTelemetry(async (value: string) => value, {
      telemetry,
      event: "hds_mcp_test",
      toProperties: (call) => {
        calls.push(call);

        return {};
      },
    });

    await handler("first");
    await handler("second");

    expect(
      calls.map(({ args, isFirstCall }) => ({ args, isFirstCall })),
    ).toStrictEqual([
      { args: ["first"], isFirstCall: true },
      { args: ["second"], isFirstCall: false },
    ]);

    for (const { durationMs } of calls) {
      expect(Number.isInteger(durationMs)).toBe(true);
      expect(durationMs).toBeGreaterThanOrEqual(0);
    }
  });

  it("reports an undefined result and rethrows when the handler throws", async () => {
    const { telemetry, events } = createRecordingTelemetry();
    const error = new Error("catalog unreadable");
    const handler = withCallTelemetry(
      (): string => {
        throw error;
      },
      {
        telemetry,
        event: "hds_mcp_test",
        toProperties: ({ result }) => ({ failed: result === undefined }),
      },
    );

    await expect(handler()).rejects.toBe(error);

    expect(events).toStrictEqual([
      { event: "hds_mcp_test", properties: { failed: true } },
    ]);
  });

  it("keeps the handler's result when building the properties throws", async () => {
    const { telemetry, events } = createRecordingTelemetry();
    const handler = withCallTelemetry(() => "result", {
      telemetry,
      event: "hds_mcp_test",
      toProperties: () => {
        throw new Error("bad mapper");
      },
    });

    await expect(handler()).resolves.toBe("result");

    expect(events).toStrictEqual([]);
  });

  it("keeps the handler's result when tracking throws", async () => {
    const handler = withCallTelemetry(() => "result", {
      telemetry: {
        track: () => {
          throw new Error("offline");
        },
        shutdown: async () => {},
      },
      event: "hds_mcp_test",
      toProperties: () => ({}),
    });

    await expect(handler()).resolves.toBe("result");
  });
});
