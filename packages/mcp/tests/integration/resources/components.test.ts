/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { COMPONENTS_URI } from "../../../src/resources/components/constants.js";
import { readComponentByNameResource } from "../../../src/resources/components/get-component-by-name.js";
import { readComponentsResource } from "../../../src/resources/components/get-components.js";
import { createComponentCatalogStore } from "../../../src/resources/components/store/index.js";
import {
  buildComponentCatalog,
  buildComponentCatalogComponent,
} from "../../support/component-catalog.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../support/resource-content.js";

const component = buildComponentCatalogComponent();
const store = createComponentCatalogStore(
  buildComponentCatalog({ components: [component] }),
);

describe("components resource", () => {
  it("returns the component index payload", () => {
    const response = readComponentsResource(store);
    const content = response.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(content.uri).toBe(COMPONENTS_URI);
    expect(content.mimeType).toBe("application/json");
    expect(parseResourceJson(getTextContent(content))).toStrictEqual({
      updatedAt: "2026-07-01T20:25:05.109Z",
      totalComponentCount: 1,
      components: [
        { name: "HdsButton", description: "A button component." },
      ],
    });
  });

  it("returns the detailed component payload when found", () => {
    const response = readComponentByNameResource(store, "HdsButton");
    const content = response.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(content.uri).toBe("hds://components/HdsButton");
    expect(parseResourceJson(getTextContent(content))).toStrictEqual({
      found: true,
      requestedComponentName: "HdsButton",
      component,
    });
  });

  it("returns a not-found payload", () => {
    const response = readComponentByNameResource(store, "Missing Component");
    const content = response.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(content.uri).toBe("hds://components/Missing%20Component");
    expect(parseResourceJson(getTextContent(content))).toStrictEqual({
      found: false,
      requestedComponentName: "Missing Component",
      message: "Component not found for provided componentName.",
    });
  });
});
