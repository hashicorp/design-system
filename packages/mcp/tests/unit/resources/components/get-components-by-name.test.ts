/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  completeComponentNames,
  createGetComponentByNameResource,
} from "../../../../src/resources/components/get-component-by-name.js";
import { createComponentCatalogStore } from "../../../../src/stores/components/index.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../../support/resource-content.js";
import { buildRequestHandlerExtra } from "../../../support/request-handler.js";
import { buildComponentCatalogEntry } from "../../../support/component-catalog.js";

const catalog = {
  components: [
    buildComponentCatalogEntry(),
    buildComponentCatalogEntry({
      name: "Hds::AdvancedTable::Th",
      modulePath: "hds/advanced-table/th",
      docsPath: "components/table/advanced-table",
      element: "HTMLTableCellElement",
      args: [],
      blocks: [],
    }),
  ],
};

describe("completeComponentNames", () => {
  const components = createComponentCatalogStore(catalog).listComponents();

  it("matches name and module path case-insensitively", () => {
    expect(completeComponentNames(components, "BUTT")).toStrictEqual([
      "Hds::Button",
    ]);
    expect(completeComponentNames(components, "advanced-table")).toStrictEqual([
      "Hds::AdvancedTable::Th",
    ]);
  });

  it("returns every component in catalog order for a blank query", () => {
    expect(completeComponentNames(components, "")).toStrictEqual(
      components.map((component) => component.name),
    );
  });
});

describe("createGetComponentByNameResource", () => {
  const store = createComponentCatalogStore(catalog);
  const resource = createGetComponentByNameResource(() => store);

  if (!("template" in resource)) {
    throw new Error("Expected a component resource template");
  }

  it("decodes component names before reading the store", async () => {
    const result = await resource.readCallback(
      new URL("hds://components/Hds%3A%3AButton"),
      { componentName: "Hds%3A%3AButton" },
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toMatchObject({
      found: true,
      requestedComponentName: "Hds::Button",
    });
  });

  it("resolves a raw component name", async () => {
    const result = await resource.readCallback(
      new URL("hds://components/Hds::Button"),
      { componentName: "Hds::Button" },
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toMatchObject({
      found: true,
      requestedComponentName: "Hds::Button",
    });
  });

  it("returns a missing-variable response", async () => {
    const result = await resource.readCallback(
      new URL("hds://components/"),
      {
        componentName: [],
      },
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toStrictEqual({
      found: false,
      message: "Missing componentName variable.",
    });
  });

  it("exposes completion through the resource template", async () => {
    const complete = resource.template.completeCallback("componentName");

    expect(complete).toBeDefined();
    await expect(Promise.resolve(complete?.("button"))).resolves.toStrictEqual([
      "Hds::Button",
    ]);
  });
});
