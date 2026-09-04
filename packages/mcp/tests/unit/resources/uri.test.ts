/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  buildDetailUri,
  decodeUriSegment,
} from "../../../src/resources/uri.js";

describe("buildDetailUri", () => {
  it("appends the encoded key to the base uri", () => {
    expect(buildDetailUri("hds://tokens", "{border.radius.x-small}")).toBe(
      "hds://tokens/%7Bborder.radius.x-small%7D",
    );
    expect(buildDetailUri("hds://components", "Hds::Button")).toBe(
      "hds://components/Hds%3A%3AButton",
    );
    expect(buildDetailUri("hds://icons", "not/real")).toBe(
      "hds://icons/not%2Freal",
    );
    expect(buildDetailUri("hds://icons", "alert-triangle")).toBe(
      "hds://icons/alert-triangle",
    );
  });
});

describe("decodeUriSegment", () => {
  it("decodes percent-encoded segments", () => {
    expect(decodeUriSegment("%7Bcolor.foreground.action%7D")).toBe(
      "{color.foreground.action}",
    );
    expect(decodeUriSegment("Hds%3A%3AButton")).toBe("Hds::Button");
  });

  it("returns the raw value when the segment is malformed", () => {
    expect(decodeUriSegment("%E0%A4%A")).toBe("%E0%A4%A");
    expect(decodeUriSegment("%")).toBe("%");
  });
});
