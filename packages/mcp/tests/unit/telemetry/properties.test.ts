/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  pickBoolean,
  pickNumber,
  pickRecord,
  pickString,
  withDefined,
} from "../../../src/telemetry/properties.js";

const RECORD = {
  count: 3,
  infinite: Number.POSITIVE_INFINITY,
  flag: false,
  label: "ok",
  nested: { version: "7.0.0" },
  list: ["a"],
  empty: null,
};

describe("pick helpers", () => {
  it("read a value only when it has the expected type", () => {
    expect(pickNumber(RECORD, "count")).toBe(3);
    expect(pickNumber(RECORD, "label")).toBeNull();
    expect(pickBoolean(RECORD, "flag")).toBe(false);
    expect(pickBoolean(RECORD, "count")).toBeNull();
    expect(pickString(RECORD, "label")).toBe("ok");
    expect(pickString(RECORD, "missing")).toBeNull();
    expect(pickRecord(RECORD, "nested")).toStrictEqual({ version: "7.0.0" });
  });

  it("reject values that cannot be sent as they are", () => {
    expect(pickNumber(RECORD, "infinite")).toBeNull();
    expect(pickRecord(RECORD, "list")).toBeNull();
    expect(pickRecord(RECORD, "empty")).toBeNull();
  });
});

describe("withDefined", () => {
  it("keeps falsy values and drops only missing ones", () => {
    expect(
      withDefined([
        ["zero", 0],
        ["no", false],
        ["blank", ""],
        ["missing", null],
      ]),
    ).toStrictEqual({ zero: 0, no: false, blank: "" });
  });
});
