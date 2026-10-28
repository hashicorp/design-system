/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// one `tool_called` event per tool call, read from the fields every tool result shares
//
// the shared properties are only counts, booleans, enumerated values and public catalog
// versions; a tool may add its own through a mapper, bounded by the rules in sanitize.ts

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

export interface ToolTelemetryCall {
  // the input the sdk validated against the tool's input schema
  args: StructuredRecord;
  // the structured content the tool itself built
  content: StructuredRecord;
}

// the properties one tool adds about its own call, on top of the shared ones
export type ToolTelemetryMapper = (
  call: ToolTelemetryCall,
) => TelemetryProperties;

const toArgsRecord = (args: unknown[]): StructuredRecord => {
  const [input] = args;

  return typeof input === "object" && input !== null && !Array.isArray(input)
    ? (input as StructuredRecord)
    : {};
};

// a failed or unreadable call has no tool-specific signal, and a throwing mapper costs only
// its own properties rather than the whole event
const toMappedProperties = (
  args: unknown[],
  result: CallToolResult | undefined,
  toToolProperties: ToolTelemetryMapper | undefined,
): TelemetryProperties => {
  if (
    toToolProperties === undefined ||
    result === undefined ||
    result.isError === true ||
    result.structuredContent === undefined
  ) {
    return {};
  }

  try {
    return toToolProperties({
      args: toArgsRecord(args),
      content: result.structuredContent,
    });
  } catch {
    return {};
  }
};

export const withToolTelemetry = <TArgs extends unknown[]>(
  toolName: string,
  handler: (...args: TArgs) => CallToolResult | Promise<CallToolResult>,
  telemetry: Telemetry,
  toToolProperties?: ToolTelemetryMapper,
): ((...args: TArgs) => Promise<CallToolResult>) =>
  withCallTelemetry(handler, {
    telemetry,
    event: TOOL_CALLED_EVENT,
    toProperties: ({ args, result, durationMs, isFirstCall }) => ({
      ...toMappedProperties(args, result, toToolProperties),
      // the shared properties are spread last so a tool cannot overwrite them
      tool: toolName,
      outcome: toToolOutcome(result),
      durationMs,
      isFirstCall,
      ...toToolResultProperties(result),
    }),
  });
