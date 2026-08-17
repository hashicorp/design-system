/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  completeIconNames,
  createGetIconByNameResource,
} from "../../../../src/resources/flight-icons/get-icon-by-name.js";
import { createIconCatalogStore } from "../../../../src/resources/flight-icons/store/index.js";
import { buildIconAsset } from "../../../support/flight-icon-catalog.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../../support/resource-content.js";
import { buildRequestHandlerExtra } from "../../../support/request-handler.js";

const store = createIconCatalogStore({
  assets: [
    buildIconAsset(),
    buildIconAsset({
      id: "2:1",
      iconName: "arrow-right",
      fileName: "arrow-right-24",
      category: "Navigation",
      size: "24",
      width: 24,
      height: 24,
    }),
  ],
});

describe("completeIconNames", () => {
  it("matches names and filenames and respects the limit", () => {
    expect(completeIconNames(store, "triangle-16")).toStrictEqual([
      "alert-triangle",
    ]);
    expect(completeIconNames(store, "", 1)).toStrictEqual([
      "alert-triangle",
    ]);
    expect(completeIconNames(store, "warning")).toStrictEqual([]);
  });
});

describe("createGetIconByNameResource", () => {
  const resource = createGetIconByNameResource(() => store);

  if (!("template" in resource)) {
    throw new Error("Expected an icon resource template");
  }

  it("decodes icon names before reading the store", async () => {
    const result = await resource.readCallback(
      new URL("hds://icons/alert%2Dtriangle"),
      { iconName: "alert%2Dtriangle" },
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toMatchObject({
      found: true,
      requestedIconName: "alert-triangle",
    });
  });

  it("returns a missing-variable response", async () => {
    const result = await resource.readCallback(
      new URL("hds://icons/"),
      { iconName: [] },
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toStrictEqual({
      found: false,
      message: "Missing iconName variable.",
    });
  });

  it("falls back to malformed encoded icon names", async () => {
    const result = await resource.readCallback(
      new URL("hds://icons/%25E0%25A4%25A"),
      { iconName: "%E0%A4%A" },
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toMatchObject({
      found: false,
      requestedIconName: "%E0%A4%A",
    });
  });

  it("exposes completion through the resource template", async () => {
    const complete = resource.template.completeCallback("iconName");

    expect(complete).toBeDefined();
    await expect(
      Promise.resolve(complete?.("right-24")),
    ).resolves.toStrictEqual(["arrow-right"]);
  });
});
