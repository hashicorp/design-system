/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { ICONS_URI } from "../../../src/resources/flight-icons/constants.js";
import { readIconByNameResource } from "../../../src/resources/flight-icons/get-icon-by-name.js";
import { readIconsResource } from "../../../src/resources/flight-icons/get-icons.js";
import { createIconCatalogStore } from "../../../src/resources/flight-icons/store/index.js";
import { buildIconAsset } from "../../support/flight-icon-catalog.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../support/resource-content.js";

const store = createIconCatalogStore({ assets: [buildIconAsset()] });

describe("Flight icons resources", () => {
  it("returns the icon index payload", () => {
    const response = readIconsResource(store);
    const [content] = response.contents;

    expect(content.uri).toBe(ICONS_URI);
    expect(content.mimeType).toBe("application/json");
    expect(parseResourceJson(getTextContent(content))).toStrictEqual({
      totalIconCount: 1,
      totalAssetCount: 1,
      categories: ["Alerts"],
      icons: [
        {
          iconName: "alert-triangle",
          description: "alert, warning, caution",
          category: "Alerts",
          sizes: ["16"],
          hasMapping: false,
        },
      ],
    });
  });

  it("returns detailed icon payload when the icon exists", () => {
    const response = readIconByNameResource(store, "alert-triangle");
    const [content] = response.contents;

    expect(content.uri).toBe("hds://icons/alert-triangle");
    expect(parseResourceJson(getTextContent(content))).toMatchObject({
      found: true,
      requestedIconName: "alert-triangle",
      icon: {
        iconName: "alert-triangle",
        variants: [{ fileName: "alert-triangle-16" }],
      },
    });
  });

  it("returns a stable not-found payload", () => {
    const response = readIconByNameResource(store, "not/real");
    const [content] = response.contents;

    expect(content.uri).toBe("hds://icons/not%2Freal");
    expect(parseResourceJson(getTextContent(content))).toStrictEqual({
      found: false,
      requestedIconName: "not/real",
      message: "Icon not found for provided iconName or fileName.",
    });
  });
});
