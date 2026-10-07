/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// a telemetry double that keeps every event in memory, so tests can assert on exactly
// what would have been sent

import type {
  Telemetry,
  TelemetryProperties,
} from "../../src/telemetry/types.js";

export interface RecordedEvent {
  event: string;
  properties: TelemetryProperties;
}

export interface RecordingTelemetry {
  telemetry: Telemetry;
  events: RecordedEvent[];
}

export const createRecordingTelemetry = (): RecordingTelemetry => {
  const events: RecordedEvent[] = [];

  return {
    events,
    telemetry: {
      track: (event, properties = {}) => {
        events.push({ event, properties });
      },
      shutdown: async () => {},
    },
  };
};

// every property value, so a test can assert a piece of free text never leaves the process
export const getSentValues = (events: RecordedEvent[]): unknown[] =>
  events.flatMap(({ properties }) => Object.values(properties));
