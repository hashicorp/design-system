/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { withPromptTelemetry } from "../../../src/telemetry/prompt-events.js";
import {
  createRecordingTelemetry,
  getSentValues,
} from "../../support/recording-telemetry.js";
import { watchStdout } from "../../support/stdout.js";

import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";

const toPromptResult = (text: string): GetPromptResult => ({
  messages: [{ role: "user", content: { type: "text", text } }],
});

let expectNoStdoutWrites: () => void;

beforeEach(() => {
  expectNoStdoutWrites = watchStdout();
});

afterEach(() => {
  expectNoStdoutWrites();
  vi.restoreAllMocks();
});

describe("withPromptTelemetry", () => {
  it("reports the prompt name but never its arguments", async () => {
    const { telemetry, events } = createRecordingTelemetry();
    const handler = withPromptTelemetry(
      "review_hds_usage",
      ({ code }: { code: string }) => toPromptResult(code),
      telemetry,
    );

    await handler({ code: "<AcmeBillingTable />" });

    expect(events).toStrictEqual([
      {
        event: "hds_mcp_prompt_requested",
        properties: { prompt: "review_hds_usage", outcome: "ok" },
      },
    ]);
    expect(JSON.stringify(getSentValues(events))).not.toContain("Acme");
  });

  it("reports an error and rethrows when the prompt fails", async () => {
    const { telemetry, events } = createRecordingTelemetry();
    const handler = withPromptTelemetry(
      "choose_hds_component",
      (): GetPromptResult => {
        throw new Error("invalid arguments");
      },
      telemetry,
    );

    await expect(handler()).rejects.toThrow("invalid arguments");

    expect(events[0].properties).toStrictEqual({
      prompt: "choose_hds_component",
      outcome: "error",
    });
  });
});
