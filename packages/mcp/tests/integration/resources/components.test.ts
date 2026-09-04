/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { COMPONENTS_URI } from "../../../src/resources/components/constants.js";
import { readComponentsResource } from "../../../src/resources/components/get-components.js";
import { readComponentByNameResource } from "../../../src/resources/components/get-component-by-name.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../support/resource-content.js";

import type { ComponentCatalogStore } from "../../../src/resources/components/store/index.js";
import type {
  ComponentRecord,
  ComponentSummary,
} from "../../../src/resources/components/store/lookup.js";
import type { CatalogSource } from "../../../src/catalog/loader.js";

const STORE_SOURCE: CatalogSource = {
  version: "6.4.0",
  resolvedVia: "default",
};

const buildStore = ({
  components,
  componentByName,
}: {
  components: ComponentSummary[];
  componentByName: ComponentRecord | null;
}): ComponentCatalogStore => {
  return {
    getMeta: () => ({
      totalComponentCount: components.length,
      source: STORE_SOURCE,
    }),
    listComponents: () => components,
    getComponentByName: () => componentByName,
  };
};

describe("components resource", () => {
  it("returns component index payload for hds://components", () => {
    const component: ComponentSummary = {
      name: "Hds::Button",
      modulePath: "hds/button",
      docsPath: "components/button",
    };
    const store = buildStore({
      components: [component],
      componentByName: null,
    });
    const response = readComponentsResource(store);
    const [{ uri, mimeType, ...content }] = response.contents;
    const text = getTextContent({ uri, ...content });
    const payload = parseResourceJson(text);

    expect(uri).toBe(COMPONENTS_URI);
    expect(mimeType).toBe("application/json");
    expect(payload).toStrictEqual({
      totalComponentCount: 1,
      source: {
        resolvedVia: "default",
        version: "6.4.0",
      },
      components: [
        {
          name: component.name,
          modulePath: component.modulePath,
          docsPath: component.docsPath,
        },
      ],
    });
  });

  it("returns detailed component payload when component exists", () => {
    const componentName = "Hds::Button";
    const component: ComponentRecord = {
      name: componentName,
      modulePath: "hds/button",
      docsPath: "components/button",
      element: "HTMLAnchorElement | HTMLButtonElement",
      args: [
        {
          name: "size",
          type: '"small" | "medium" | "large"',
          required: false,
          values: ["small", "medium", "large"],
          inheritedFrom: "hds/interactive",
        },
      ],
      blocks: [{ name: "default", yields: [] }],
    };
    const store = buildStore({ components: [], componentByName: component });
    const response = readComponentByNameResource(store, componentName);
    const [{ uri, ...content }] = response.contents;
    const text = getTextContent({ uri, ...content });
    const payload = parseResourceJson(text);

    expect(uri).toBe(`${COMPONENTS_URI}/${encodeURIComponent(componentName)}`);
    expect(payload).toStrictEqual({
      found: true,
      requestedComponentName: componentName,
      component: {
        name: component.name,
        modulePath: component.modulePath,
        docsPath: component.docsPath,
        element: component.element,
        args: component.args,
        blocks: component.blocks,
      },
    });
  });

  it("returns not found payload when component does not exist", () => {
    const componentName = "Hds::NotReal";
    const store = buildStore({ components: [], componentByName: null });
    const response = readComponentByNameResource(store, componentName);
    const [{ uri, ...content }] = response.contents;
    const text = getTextContent({ uri, ...content });
    const payload = parseResourceJson(text);

    expect(uri).toBe(`${COMPONENTS_URI}/${encodeURIComponent(componentName)}`);
    expect(payload).toStrictEqual({
      found: false,
      requestedComponentName: componentName,
      message: "Component not found for provided componentName.",
    });
  });

  it("encodes component names in component detail URI", () => {
    const componentName = "Hds::AdvancedTable::Th";
    const store = buildStore({ components: [], componentByName: null });
    const response = readComponentByNameResource(store, componentName);
    const [{ uri }] = response.contents;

    expect(uri).toBe("hds://components/Hds%3A%3AAdvancedTable%3A%3ATh");
  });
});
