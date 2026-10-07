/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export type TelemetryProperties = Record<string, string | number | boolean>;

export interface Telemetry {
  track: (event: string, properties?: TelemetryProperties) => void;
  shutdown: () => Promise<void>;
}
