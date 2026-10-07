/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { withResourceTelemetry } from "../../../src/telemetry/resource-events.js";
import {
  toJsonResourceResponse,
  withSafeResourceHandler,
} from "../../../src/resources/responses.js";
import {
  createRecordingTelemetry,
  getSentValues,
} from "../../support/recording-telemetry.js";
import { buildRequestHandlerExtra } from "../../support/request-handler.js";
import { watchStdout } from "../../support/stdout.js";

let expectNoStdoutWrites: () => void;

beforeEach(() => {
  expectNoStdoutWrites = watchStdout();
});

afterEach(() => {
  expectNoStdoutWrites();
  vi.restoreAllMocks();
});

describe("withResourceTelemetry", () => {
  it("reports the resource and timing but never the uri or its variables", async () => {
    const { telemetry, events } = createRecordingTelemetry();
    const uri = new URL("hds://components/Hds::AcmeBillingTable");
    const handler = withResourceTelemetry(
      "get_hds_component",
      (requested: URL) => toJsonResourceResponse(requested.toString(), {}),
      telemetry,
    );

    await handler(uri);

    expect(events).toStrictEqual([
      {
        event: "hds_mcp_resource_read",
        properties: {
          resource: "get_hds_component",
          outcome: "ok",
          durationMs: expect.any(Number),
          isFirstCall: true,
        },
      },
    ]);
    expect(JSON.stringify(getSentValues(events))).not.toContain("Acme");
  });

  it("reports an error when wrapped inside the safe guard", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const { telemetry, events } = createRecordingTelemetry();
    const handler = withSafeResourceHandler(
      "get_hds_tokens",
      withResourceTelemetry(
        "get_hds_tokens",
        (): never => {
          throw new Error("catalog unreadable");
        },
        telemetry,
      ),
    );

    const result = await handler(
      new URL("hds://tokens"),
      buildRequestHandlerExtra(),
    );

    expect(result.contents).toHaveLength(1);
    expect(events[0].properties).toMatchObject({
      resource: "get_hds_tokens",
      outcome: "error",
    });
  });
});
