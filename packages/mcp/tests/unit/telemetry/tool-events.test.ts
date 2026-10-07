/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  toCorpusAgeDays,
  toToolOutcome,
  toToolResultProperties,
  withToolTelemetry,
} from "../../../src/telemetry/tool-events.js";
import {
  toDocumentToolResponse,
  toJsonToolResponse,
  withSafeToolHandler,
} from "../../../src/tools/responses.js";
import {
  createRecordingTelemetry,
  getSentValues,
} from "../../support/recording-telemetry.js";
import { watchStdout } from "../../support/stdout.js";

import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const SOURCE = { version: "7.0.0", resolvedVia: "project-root" };
const NOW = Date.parse("2026-10-07T12:00:00.000Z");

let expectNoStdoutWrites: () => void;

beforeEach(() => {
  expectNoStdoutWrites = watchStdout();
});

afterEach(() => {
  expectNoStdoutWrites();
  vi.restoreAllMocks();
});

describe("toToolOutcome", () => {
  it.each<[string, CallToolResult | undefined, string]>([
    ["a thrown handler", undefined, "error"],
    [
      "an error result",
      { content: [{ type: "text", text: "failed" }], isError: true },
      "error",
    ],
    ["an unresolved lookup", toJsonToolResponse({ found: false }), "miss"],
    [
      "a search with no matches",
      toJsonToolResponse({ totalMatches: 0 }),
      "empty",
    ],
    ["a search with matches", toJsonToolResponse({ totalMatches: 3 }), "ok"],
    ["a resolved lookup", toJsonToolResponse({ found: true }), "ok"],
    [
      "a result without structured content",
      { content: [{ type: "text", text: "plain" }] },
      "ok",
    ],
  ])("classifies %s", (_label, result, outcome) => {
    expect(toToolOutcome(result)).toBe(outcome);
  });
});

describe("toCorpusAgeDays", () => {
  it("counts whole days since the snapshot", () => {
    expect(toCorpusAgeDays("2026-09-14T21:43:11.158Z", NOW)).toBe(22);
  });

  it("never reports a negative age for a snapshot dated after the clock", () => {
    expect(toCorpusAgeDays("2026-10-08T00:00:00.000Z", NOW)).toBe(0);
  });

  it.each([null, "not a date"])("leaves out %s", (bundledAt) => {
    expect(toCorpusAgeDays(bundledAt, NOW)).toBeNull();
  });
});

describe("toToolResultProperties", () => {
  it("reads the counts, truncation and catalog source a search returns", () => {
    const result = toJsonToolResponse({
      query: "a private product name",
      totalMatches: 40,
      returnedMatches: 20,
      truncated: true,
      results: [{ name: "Hds::Button" }],
      source: SOURCE,
    });

    expect(toToolResultProperties(result, NOW)).toStrictEqual({
      totalMatches: 40,
      returnedMatches: 20,
      truncated: true,
      catalogVersion: "7.0.0",
      catalogResolvedVia: "project-root",
    });
  });

  it("reads the docs corpus age from a docs result", () => {
    const result = toDocumentToolResponse(
      { found: true, truncated: false, bundledAt: "2026-10-01T12:00:00.000Z" },
      "# Button",
    );

    expect(toToolResultProperties(result, NOW)).toStrictEqual({
      truncated: false,
      docsCorpusAgeDays: 6,
    });
  });

  it("leaves out fields of the wrong type rather than coercing them", () => {
    const result = toJsonToolResponse({
      totalMatches: "40",
      truncated: "yes",
      source: "project-root",
    });

    expect(toToolResultProperties(result, NOW)).toStrictEqual({});
  });

  it("sends nothing for a thrown handler", () => {
    expect(toToolResultProperties(undefined, NOW)).toStrictEqual({});
  });
});

describe("withToolTelemetry", () => {
  it("reports the tool, its outcome and timing alongside the result fields", async () => {
    const { telemetry, events } = createRecordingTelemetry();
    const handler = withToolTelemetry(
      "search_hds_components",
      () =>
        toJsonToolResponse({
          totalMatches: 0,
          returnedMatches: 0,
          source: SOURCE,
        }),
      telemetry,
    );

    await handler();

    expect(events).toStrictEqual([
      {
        event: "hds_mcp_tool_called",
        properties: {
          tool: "search_hds_components",
          outcome: "empty",
          durationMs: expect.any(Number),
          isFirstCall: true,
          totalMatches: 0,
          returnedMatches: 0,
          catalogVersion: "7.0.0",
          catalogResolvedVia: "project-root",
        },
      },
    ]);
  });

  it("never sends the requested name, the message or the suggestions of a miss", async () => {
    const { telemetry, events } = createRecordingTelemetry();
    const handler = withToolTelemetry(
      "get_hds_component",
      () =>
        toJsonToolResponse({
          found: false,
          requestedName: "Hds::AcmeBillingTable",
          message: 'No Helios component resolves to "Hds::AcmeBillingTable".',
          suggestions: ["Hds::Table"],
          source: SOURCE,
        }),
      telemetry,
    );

    await handler();

    expect(events[0].properties.outcome).toBe("miss");
    expect(JSON.stringify(getSentValues(events))).not.toContain("Acme");
    expect(getSentValues(events)).not.toContain("Hds::Table");
  });

  it("reports a guarded failure as an error without its message", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const { telemetry, events } = createRecordingTelemetry();
    const handler = withToolTelemetry(
      "search_hds_docs",
      withSafeToolHandler("search_hds_docs", () => {
        throw new Error("ENOENT: /Users/someone/acme/docs-catalog.json");
      }),
      telemetry,
    );

    const result = await handler();

    expect(result.isError).toBe(true);
    expect(events[0].properties).toStrictEqual({
      tool: "search_hds_docs",
      outcome: "error",
      durationMs: expect.any(Number),
      isFirstCall: true,
    });
  });

  it("flags only the first call of each tool", async () => {
    const { telemetry, events } = createRecordingTelemetry();
    const first = withToolTelemetry(
      "search_hds_icons",
      () => toJsonToolResponse({}),
      telemetry,
    );
    const second = withToolTelemetry(
      "search_hds_tokens",
      () => toJsonToolResponse({}),
      telemetry,
    );

    await first();
    await first();
    await second();

    expect(
      events.map(({ properties }) => [properties.tool, properties.isFirstCall]),
    ).toStrictEqual([
      ["search_hds_icons", true],
      ["search_hds_icons", false],
      ["search_hds_tokens", true],
    ]);
  });
});
