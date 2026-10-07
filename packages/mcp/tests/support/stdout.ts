/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// stdout is the mcp transport, so telemetry must never write to it; call the returned
// assertion after the code under test has run

import { expect, vi } from "vitest";

export const watchStdout = (): (() => void) => {
  const spies = [
    vi.spyOn(process.stdout, "write"),
    vi.spyOn(console, "log"),
    vi.spyOn(console, "info"),
    vi.spyOn(console, "debug"),
  ];

  return () => {
    for (const spy of spies) {
      expect(spy).not.toHaveBeenCalled();
    }
  };
};
