/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from "vitest";
import {
  completeComponentNames,
  createGetComponentByNameResource,
} from "../../../../src/resources/components/get-component-by-name.js";
import { createComponentCatalogStore } from "../../../../src/resources/components/store/index.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../../support/resource-content.js";
import { buildRequestHandlerExtra } from "../../../support/request-handler.js";
import { buildComponentCatalogEntry } from "../../../support/component-catalog.js";

import type { ComponentCatalogStore } from "../../../../src/resources/components/store/index.js";

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

// larger than the per-call default so a capped completer would be caught
const largeCatalog = {
  components: Array.from({ length: 150 }, (_unused, index) =>
    buildComponentCatalogEntry({
      name: `Hds::Component${index}`,
      modulePath: `hds/component-${index}`,
    }),
  ),
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

  it("returns every component for a blank query", () => {
    expect(completeComponentNames(components, "")).toStrictEqual([
      "Hds::Button",
      "Hds::AdvancedTable::Th",
    ]);
    expect(completeComponentNames(components, "   ")).toStrictEqual([
      "Hds::Button",
      "Hds::AdvancedTable::Th",
    ]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(completeComponentNames(components, "zzzz-no-match")).toStrictEqual(
      [],
    );
  });

  it("returns catalog order and respects the limit", () => {
    expect(completeComponentNames(components, "", 1)).toStrictEqual([
      "Hds::Button",
    ]);
  });
});

describe("createGetComponentByNameResource", () => {
  const store = createComponentCatalogStore(catalog);
  const resource = createGetComponentByNameResource(() => store);

  if (!("template" in resource)) {
    throw new Error("Expected a component resource template");
  }

  it("builds the template descriptor without a list callback", () => {
    expect(resource.name).toBe("get_hds_component");
    expect(resource.template.uriTemplate.toString()).toBe(
      "hds://components/{componentName}",
    );
    expect(resource.template.listCallback).toBeUndefined();
    expect(resource.config).toStrictEqual({
      title: "HDS component detail",
      description: "Detailed component record for a specific component name",
      mimeType: "application/json",
    });
  });

  it("does not read the store until the first read", async () => {
    const getStore = vi.fn(() => store);
    const lazyResource = createGetComponentByNameResource(getStore);

    if (!("template" in lazyResource)) {
      throw new Error("Expected a component resource template");
    }

    expect(getStore).not.toHaveBeenCalled();

    await lazyResource.readCallback(
      new URL("hds://components/Hds::Button"),
      { componentName: "Hds::Button" },
      buildRequestHandlerExtra(),
    );

    expect(getStore).toHaveBeenCalledOnce();
  });

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

  it("resolves a bare component name without the namespace", async () => {
    const result = await resource.readCallback(
      new URL("hds://components/button"),
      { componentName: "button" },
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toMatchObject({
      found: true,
      requestedComponentName: "button",
      component: { name: "Hds::Button" },
    });
  });

  it("falls back to the raw component name when it is malformed", async () => {
    const result = await resource.readCallback(
      new URL("hds://components/%25E0%25A4%25A"),
      { componentName: "%E0%A4%A" },
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toMatchObject({
      found: false,
      requestedComponentName: "%E0%A4%A",
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

  it("guards blank and absent variables without reading the store", async () => {
    const blankValues: Array<string | string[] | undefined> = [
      [],
      ["Hds::Button"],
      "",
      "   ",
      undefined,
    ];

    for (const value of blankValues) {
      const getStore = vi.fn(() => store);
      const guardedResource = createGetComponentByNameResource(getStore);

      if (!("template" in guardedResource)) {
        throw new Error("Expected a component resource template");
      }

      const result = await guardedResource.readCallback(
        new URL("hds://components/"),
        { componentName: value } as Record<string, string | string[]>,
        buildRequestHandlerExtra(),
      );
      const content = result.contents[0];

      if (content === undefined) {
        throw new Error("Expected resource content");
      }

      expect(content.uri).toBe("hds://components/");
      expect(parseResourceJson(getTextContent(content))).toStrictEqual({
        found: false,
        message: "Missing componentName variable.",
      });
      expect(getStore).not.toHaveBeenCalled();
    }
  });

  it("exposes completion through the resource template", async () => {
    const complete = resource.template.completeCallback("componentName");

    expect(complete).toBeDefined();
    await expect(Promise.resolve(complete?.("button"))).resolves.toStrictEqual([
      "Hds::Button",
    ]);
  });

  it("wires completion to the declared variable only", () => {
    expect(resource.template.completeCallback("other")).toBeUndefined();
  });

  it("completes the whole catalog for a blank query rather than capping it", async () => {
    const largeResource = createGetComponentByNameResource(() =>
      createComponentCatalogStore(largeCatalog),
    );

    if (!("template" in largeResource)) {
      throw new Error("Expected a component resource template");
    }

    const complete = largeResource.template.completeCallback("componentName");
    const matches = await Promise.resolve(complete?.(""));

    expect(matches).toHaveLength(largeCatalog.components.length);
    expect(matches?.[0]).toBe("Hds::Component0");
    expect(matches?.at(-1)).toBe("Hds::Component149");
  });

  it("degrades completion to an empty list and logs when the catalog is unreadable", async () => {
    const error = new Error("Catalog is broken");
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const brokenResource = createGetComponentByNameResource((): never => {
      throw error;
    });

    if (!("template" in brokenResource)) {
      throw new Error("Expected a component resource template");
    }

    const complete = brokenResource.template.completeCallback("componentName");

    await expect(Promise.resolve(complete?.("button"))).resolves.toStrictEqual(
      [],
    );
    expect(consoleError).toHaveBeenCalledWith(
      "Resource completion failed (get_hds_component):",
      error,
    );

    consoleError.mockRestore();
  });

  it("propagates a read failure so the safe resource handler can report it", async () => {
    const error = new Error("Catalog is broken");
    const brokenResource = createGetComponentByNameResource(
      (): ComponentCatalogStore => {
        throw error;
      },
    );

    if (!("template" in brokenResource)) {
      throw new Error("Expected a component resource template");
    }

    await expect(
      brokenResource.readCallback(
        new URL("hds://components/Hds::Button"),
        { componentName: "Hds::Button" },
        buildRequestHandlerExtra(),
      ),
    ).rejects.toThrow("Catalog is broken");
  });
});
