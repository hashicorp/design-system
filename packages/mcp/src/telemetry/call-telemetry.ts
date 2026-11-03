/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// the timing and failure isolation every tracked handler shares, so tools, resources and
// prompts only describe what they report rather than how a call is measured

import type { Telemetry, TelemetryProperties } from "./types.js";

export interface TrackedCall<TArgs extends unknown[], TResult> {
  args: TArgs;
  // undefined when the handler threw
  result: TResult | undefined;
  durationMs: number;
  // the first call in a process pays for loading a catalog, so it is reported apart
  isFirstCall: boolean;
}

export interface CallTelemetryOptions<TArgs extends unknown[], TResult> {
  telemetry: Telemetry;
  event: string;
  toProperties: (call: TrackedCall<TArgs, TResult>) => TelemetryProperties;
}

export const withCallTelemetry = <TArgs extends unknown[], TResult>(
  handler: (...args: TArgs) => TResult | Promise<TResult>,
  { telemetry, event, toProperties }: CallTelemetryOptions<TArgs, TResult>,
): ((...args: TArgs) => Promise<TResult>) => {
  let hasBeenCalled = false;

  return async (...args: TArgs): Promise<TResult> => {
    const isFirstCall = hasBeenCalled === false;
    const startedAt = performance.now();

    hasBeenCalled = true;

    const report = (result: TResult | undefined): void => {
      try {
        telemetry.track(
          event,
          toProperties({
            args,
            result,
            durationMs: Math.round(performance.now() - startedAt),
            isFirstCall,
          }),
        );
      } catch {
        // telemetry is nonessential, so a failure here must never change what the caller sees
      }
    };

    try {
      const result = await handler(...args);

      report(result);

      return result;
    } catch (error: unknown) {
      report(undefined);

      throw error;
    }
  };
};
