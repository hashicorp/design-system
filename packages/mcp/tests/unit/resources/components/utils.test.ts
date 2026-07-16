/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { toSerializableComponentSummary } from "../../../../src/resources/components/utils.js";

describe("toSerializableComponentSummary", () => {
  it("maps component summary fields", () => {
    expect(
      toSerializableComponentSummary({
        name: "HdsButton",
        description: "A button component.",
      }),
    ).toStrictEqual({
      name: "HdsButton",
      description: "A button component.",
    });
  });
});
