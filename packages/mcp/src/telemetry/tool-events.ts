/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// one `tool_called` event per tool call, read from the fields every tool result shares
//
// only counts, booleans, enumerated values and public catalog versions leave the process:
// the query, the requested name and any error message are free text and are never sent

import { withCallTelemetry } from "./call-telemetry.js";
import { TOOL_CALLED_EVENT } from "./events.js";
import {
  pickBoolean,
  pickNumber,
  pickRecord,
  pickString,
  withDefined,
} from "./properties.js";

import type { StructuredRecord } from "./properties.js";
import type { CallOutcome, Telemetry, TelemetryProperties } from "./types.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const DAY_MS = 24 * 60 * 60 * 1000;

const getStructuredContent = (
  result: CallToolResult | undefined,
): StructuredRecord => result?.structuredContent ?? {};

export const toToolOutcome = (
  result: CallToolResult | undefined,
): CallOutcome => {
  if (result === undefined || result.isError === true) {
    return "error";
  }

  const content = getStructuredContent(result);

  if (pickBoolean(content, "found") === false) {
    return "miss";
  }

  if (pickNumber(content, "totalMatches") === 0) {
    return "empty";
  }

  return "ok";
};

export const toCorpusAgeDays = (
  bundledAt: string | null,
  now: number,
): number | null => {
  const bundledAtMs = bundledAt === null ? Number.NaN : Date.parse(bundledAt);

  return Number.isNaN(bundledAtMs)
    ? null
    : Math.max(0, Math.floor((now - bundledAtMs) / DAY_MS));
};

// `source` is the installed package version and how it was located, both public facts
export const toToolResultProperties = (
  result: CallToolResult | undefined,
  now: number = Date.now(),
): TelemetryProperties => {
  const content = getStructuredContent(result);
  const source = pickRecord(content, "source") ?? {};

  return withDefined([
    ["totalMatches", pickNumber(content, "totalMatches")],
    ["returnedMatches", pickNumber(content, "returnedMatches")],
    ["truncated", pickBoolean(content, "truncated")],
    ["catalogVersion", pickString(source, "version")],
    ["catalogResolvedVia", pickString(source, "resolvedVia")],
    [
      "docsCorpusAgeDays",
      toCorpusAgeDays(pickString(content, "bundledAt"), now),
    ],
  ]);
};

export const withToolTelemetry = <TArgs extends unknown[]>(
  toolName: string,
  handler: (...args: TArgs) => CallToolResult | Promise<CallToolResult>,
  telemetry: Telemetry,
): ((...args: TArgs) => Promise<CallToolResult>) =>
  withCallTelemetry(handler, {
    telemetry,
    event: TOOL_CALLED_EVENT,
    toProperties: ({ result, durationMs, isFirstCall }) => ({
      tool: toolName,
      outcome: toToolOutcome(result),
      durationMs,
      isFirstCall,
      ...toToolResultProperties(result),
    }),
  });
