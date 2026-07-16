/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  toSerializableIcon,
  toSerializableIconSummary,
} from "../../../../src/resources/flight-icons/utils.js";
import { toIconRecord } from "../../../../src/resources/flight-icons/store/lookup.js";
import { buildIconAsset } from "../../../support/flight-icon-catalog.js";

describe("Flight icon serialization", () => {
  const icon = toIconRecord([buildIconAsset()]);

  it("serializes an explicit summary field set", () => {
    expect(toSerializableIconSummary(icon)).toStrictEqual({
      iconName: "alert-triangle",
      description: "alert, warning, caution",
      category: "Alerts",
      sizes: ["16"],
      hasMapping: false,
    });
  });

  it("includes variants only in detail serialization", () => {
    expect(toSerializableIcon(icon)).toStrictEqual({
      iconName: "alert-triangle",
      description: "alert, warning, caution",
      category: "Alerts",
      sizes: ["16"],
      hasMapping: false,
      variants: [
        {
          id: "1:1",
          fileName: "alert-triangle-16",
          size: "16",
          width: 16,
          height: 16,
        },
      ],
    });
  });
});
