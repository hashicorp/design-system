/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  toSerializableIcon,
  toSerializableIconSummary,
} from "../../../../src/resources/hds-icons/utils.js";
import { toIconRecord } from "../../../../src/stores/hds-icons/lookup.js";
import { buildIconAsset } from "../../../support/hds-icon-catalog.js";

describe("Flight icon serialization", () => {
  const icon = toIconRecord([buildIconAsset()]);
  const iconWithMapping = toIconRecord([
    buildIconAsset({ mapping: "Warning" }),
  ]);

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

  it("includes mapping in variant serialization when present", () => {
    expect(toSerializableIcon(iconWithMapping)).toStrictEqual({
      iconName: "alert-triangle",
      description: "alert, warning, caution",
      category: "Alerts",
      sizes: ["16"],
      hasMapping: true,
      variants: [
        {
          id: "1:1",
          fileName: "alert-triangle-16",
          size: "16",
          width: 16,
          height: 16,
          mapping: "Warning",
        },
      ],
    });
  });
});
