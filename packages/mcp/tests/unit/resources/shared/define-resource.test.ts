/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from "vitest";
import { defineDetailResource } from "../../../../src/resources/shared/define-resource.js";
import { toJsonResourceResponse } from "../../../../src/resources/shared/responses.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../../support/resource-content.js";
import { buildRequestHandlerExtra } from "../../../support/request-handler.js";

const detailPayload = toJsonResourceResponse("hds://widgets", { widgets: [] });

const buildDetailResource = (read = vi.fn(() => detailPayload)) => {
  const complete = vi.fn(() => ["widget-one"]);
  const resource = defineDetailResource({
    name: "get_hds_widget",
    uriTemplate: "hds://widgets/{widgetName}",
    title: "HDS widget detail",
    description: "Detailed widget record for a specific widget name",
    variableName: "widgetName",
    complete,
    read,
  });

  if (!("template" in resource)) {
    throw new Error("Expected a widget resource template");
  }

  return { complete, read, resource };
};

describe("defineDetailResource", () => {
  it("builds the template descriptor without a list callback", () => {
    const { resource } = buildDetailResource();

    expect(resource.name).toBe("get_hds_widget");
    expect(resource.template.uriTemplate.toString()).toBe(
      "hds://widgets/{widgetName}",
    );
    expect(resource.template.listCallback).toBeUndefined();
    expect(resource.config).toStrictEqual({
      title: "HDS widget detail",
      description: "Detailed widget record for a specific widget name",
      mimeType: "application/json",
    });
  });

  it("wires completion to the declared variable only", async () => {
    const { complete, resource } = buildDetailResource();
    const completeWidgetName = resource.template.completeCallback("widgetName");

    expect(resource.template.completeCallback("other")).toBeUndefined();
    await expect(
      Promise.resolve(completeWidgetName?.("wid")),
    ).resolves.toStrictEqual(["widget-one"]);
    expect(complete).toHaveBeenCalledWith("wid");
  });

  it("decodes the variable before reading", async () => {
    const { read, resource } = buildDetailResource();

    await resource.readCallback(
      new URL("hds://widgets/Hds%3A%3AWidget"),
      { widgetName: "Hds%3A%3AWidget" },
      buildRequestHandlerExtra(),
    );

    expect(read).toHaveBeenCalledWith("Hds::Widget");
  });

  it("falls back to the raw variable when it is malformed", async () => {
    const { read, resource } = buildDetailResource();

    await resource.readCallback(
      new URL("hds://widgets/%25E0%25A4%25A"),
      { widgetName: "%E0%A4%A" },
      buildRequestHandlerExtra(),
    );

    expect(read).toHaveBeenCalledWith("%E0%A4%A");
  });

  it("returns the read result unchanged", async () => {
    const { resource } = buildDetailResource();

    await expect(
      resource.readCallback(
        new URL("hds://widgets/widget-one"),
        { widgetName: "widget-one" },
        buildRequestHandlerExtra(),
      ),
    ).resolves.toBe(detailPayload);
  });

  it("guards missing and blank variables without reading", async () => {
    const blankValues: Array<string | string[] | undefined> = [
      [],
      ["widget-one"],
      "",
      "   ",
      undefined,
    ];

    for (const value of blankValues) {
      const { read, resource } = buildDetailResource();
      const result = await resource.readCallback(
        new URL("hds://widgets/"),
        { widgetName: value } as Record<string, string | string[]>,
        buildRequestHandlerExtra(),
      );
      const content = result.contents[0];

      if (content === undefined) {
        throw new Error("Expected resource content");
      }

      expect(content.uri).toBe("hds://widgets/");
      expect(parseResourceJson(getTextContent(content))).toStrictEqual({
        found: false,
        message: "Missing widgetName variable.",
      });
      expect(read).not.toHaveBeenCalled();
    }
  });

  it("guards a request that carries a different variable name", async () => {
    const { read, resource } = buildDetailResource();
    const result = await resource.readCallback(
      new URL("hds://widgets/"),
      { otherName: "widget-one" },
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toStrictEqual({
      found: false,
      message: "Missing widgetName variable.",
    });
    expect(read).not.toHaveBeenCalled();
  });
});
