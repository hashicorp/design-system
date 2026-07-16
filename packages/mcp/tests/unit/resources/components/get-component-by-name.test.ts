/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  completeComponentNames,
  createGetComponentByNameResource,
} from "../../../../src/resources/components/get-component-by-name.js";
import { createComponentCatalogStore } from "../../../../src/resources/components/store/index.js";
import {
  buildComponentCatalog,
  buildComponentCatalogComponent,
} from "../../../support/component-catalog.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../../support/resource-content.js";
import { buildRequestHandlerExtra } from "../../../support/request-handler.js";

const store = createComponentCatalogStore(
  buildComponentCatalog({
    components: [
      buildComponentCatalogComponent(),
      buildComponentCatalogComponent({
        name: "HdsAccordion",
        description: "An accordion component.",
      }),
    ],
  }),
);

describe("completeComponentNames", () => {
  const components = store.listComponents();

  it("matches names case-insensitively", () => {
    expect(completeComponentNames(components, "BUTTON")).toStrictEqual([
      "HdsButton",
    ]);
  });

  it("returns catalog order and respects the limit", () => {
    expect(completeComponentNames(components, "", 1)).toStrictEqual([
      "HdsButton",
    ]);
  });
});

describe("createGetComponentByNameResource", () => {
  const resource = createGetComponentByNameResource(() => store);

  if (!("template" in resource)) {
    throw new Error("Expected a component resource template");
  }

  it("decodes component names before reading the store", async () => {
    const result = await resource.readCallback(
      new URL("hds://components/Hds%20Button"),
      { componentName: "Hds%20Button" },
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toMatchObject({
      found: true,
      requestedComponentName: "Hds Button",
      component: { name: "HdsButton" },
    });
  });

  it("returns a missing-variable response", async () => {
    const result = await resource.readCallback(
      new URL("hds://components/"),
      { componentName: [] },
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
    await expect(Promise.resolve(complete?.("accordion"))).resolves.toStrictEqual(
      ["HdsAccordion"],
    );
  });
});
