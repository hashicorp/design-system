/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// typed reads from a tool's structured content, which the sdk only types as a plain record

import type { TelemetryProperties } from "./types.js";

export type StructuredRecord = Record<string, unknown>;

export type TelemetryValue = TelemetryProperties[string];

export const pickNumber = (
  record: StructuredRecord,
  key: string,
): number | null => {
  const value = record[key];

  return typeof value === "number" && Number.isFinite(value) ? value : null;
};

export const pickBoolean = (
  record: StructuredRecord,
  key: string,
): boolean | null => {
  const value = record[key];

  return typeof value === "boolean" ? value : null;
};

export const pickString = (
  record: StructuredRecord,
  key: string,
): string | null => {
  const value = record[key];

  return typeof value === "string" ? value : null;
};

export const pickRecord = (
  record: StructuredRecord,
  key: string,
): StructuredRecord | null => {
  const value = record[key];

  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as StructuredRecord)
    : null;
};

// properties a result does not carry are left out rather than sent as placeholders
export const withDefined = (
  entries: [string, TelemetryValue | null][],
): TelemetryProperties =>
  Object.fromEntries(
    entries.filter(
      (entry): entry is [string, TelemetryValue] => entry[1] !== null,
    ),
  );
