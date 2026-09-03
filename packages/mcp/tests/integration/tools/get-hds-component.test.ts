/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
  GET_COMPONENT_TOOL_NAME,
  MAX_ARG_VALUES,
} from "../../../src/tools/components/constants.js";
import {
  createGetComponentTool,
  getComponent,
  getComponentInputShape,
  getComponentOutputSchema,
} from "../../../src/tools/components/get-component.js";
import { createComponentCatalogStore } from "../../../src/stores/components/index.js";
import { buildComponentCatalogEntry } from "../../support/component-catalog.js";
import { buildRequestHandlerExtra } from "../../support/request-handler.js";
import {
  getToolTextContent,
  parseToolJson,
} from "../../support/tool-content.js";
import { captureToolRegistrations } from "../../support/tool-registration.js";

import type { GetComponentPayload } from "../../../src/tools/components/get-component.js";
import type { RegisteredToolCallback } from "../../support/tool-registration.js";

// stands in for the icon-name enum the generator hoists into a shared value set
const MANY_VALUES = Array.from(
  { length: 675 },
  (_value, index) => `icon-${index}`
);

const store = createComponentCatalogStore({
  components: [
    buildComponentCatalogEntry({
      name: "Hds::Button",
      modulePath: "hds/button",
      docsPath: "components/button",
      element: "HTMLAnchorElement | HTMLButtonElement",
      args: [
        {
          name: "text",
          type: "string",
          required: true,
        },
        {
          name: "color",
          type: '"primary" | "secondary"',
          required: false,
          values: ["primary", "secondary"],
        },
        {
          name: "icon",
          type: "HdsIconSignature['Args']['name']",
          required: false,
          values: MANY_VALUES,
        },
        {
          name: "href",
          type: "string",
          required: false,
          inheritedFrom: "hds/interactive",
        },
      ],
      blocks: [],
    }),
    buildComponentCatalogEntry({
      name: "Hds::Alert",
      modulePath: "hds/alert",
      docsPath: "components/alert",
      element: undefined,
      args: [],
      blocks: [
        {
          name: "default",
          yields: [
            { name: "Title", type: "typeof HdsAlertTitle" },
            { name: "Button", type: "WithBoundArgs<typeof HdsButton, 'size'>" },
          ],
        },
      ],
    }),
    buildComponentCatalogEntry({
      name: "Hds::Flyout",
      modulePath: "hds/flyout",
      docsPath: "components/flyout",
      args: [],
      blocks: [],
    }),
  ],
});

const get = (name: string): GetComponentPayload =>
  getComponent(store, { name });

const getRegisteredCallback = (): RegisteredToolCallback => {
  const [registration] = captureToolRegistrations((server) =>
    createGetComponentTool(() => store).register(server)
  );

  return registration.callback;
};

describe("get_hds_component payload", () => {
  it("returns the full argument list, with types, requiredness and inheritance", () => {
    const payload = get("Hds::Button");

    expect(payload.found).toBe(true);
    expect(payload.component?.name).toBe("Hds::Button");
    expect(payload.component?.modulePath).toBe("hds/button");
    expect(payload.component?.docsPath).toBe("components/button");
    expect(payload.component?.element).toBe(
      "HTMLAnchorElement | HTMLButtonElement"
    );
    expect(payload.component?.args[0]).toStrictEqual({
      name: "text",
      type: "string",
      required: true,
    });
    expect(payload.component?.args[3]).toStrictEqual({
      name: "href",
      type: "string",
      required: false,
      inheritedFrom: "hds/interactive",
    });
  });

  it("reports the yielded contextual components, which are the undiscoverable API", () => {
    expect(get("Hds::Alert").component?.blocks).toStrictEqual([
      {
        name: "default",
        yields: [
          { name: "Title", type: "typeof HdsAlertTitle" },
          { name: "Button", type: "WithBoundArgs<typeof HdsButton, 'size'>" },
        ],
      },
    ]);
  });

  it("leaves a small enum whole, and says so by omission", () => {
    const color = get("Hds::Button").component?.args.find(
      (arg) => arg.name === "color"
    );

    expect(color?.values).toStrictEqual(["primary", "secondary"]);
    expect(color).not.toHaveProperty("valuesCount");
    expect(color).not.toHaveProperty("valuesTruncated");
  });

  it("caps a hoisted enum rather than spending 30KB on icon names", () => {
    const icon = get("Hds::Button").component?.args.find(
      (arg) => arg.name === "icon"
    );

    expect(icon?.values).toHaveLength(MAX_ARG_VALUES);
    expect(icon?.valuesTruncated).toBe(true);
    // the real total survives, so a caller knows the list is a sample
    expect(icon?.valuesCount).toBe(675);
  });

  it("keeps a whole component's API small enough to be worth asking for", () => {
    expect(JSON.stringify(get("Hds::Button")).length).toBeLessThan(2_000);
  });

  it("omits an element the catalog does not record", () => {
    expect(get("Hds::Alert").component).not.toHaveProperty("element");
  });

  it("resolves every name form a caller might hold", () => {
    for (const name of [
      "Hds::Button",
      "HdsButton",
      "button",
      "hds/button",
      "  HDS::BUTTON  ",
    ]) {
      expect(get(name).component?.name, `${name} should resolve`).toBe(
        "Hds::Button"
      );
    }
  });

  it("answers a miss with suggestions rather than an error", () => {
    const payload = get("Hds::Buton");

    expect(payload.found).toBe(false);
    expect(payload.component).toBeUndefined();
    expect(payload.message).toContain("Hds::Buton");
    // prefix overlap survives a wrong tail, which a substring match does not
    expect(payload.suggestions?.[0]).toBe("Hds::Button");
  });

  it("leaves suggestions out when nothing is close", () => {
    const payload = get("zzzzzzzz");

    expect(payload.found).toBe(false);
    expect(payload).not.toHaveProperty("suggestions");
  });

  it("clamps an oversized name rather than echoing it back", () => {
    const payload = get("x".repeat(10_000));

    expect(payload.found).toBe(false);
    expect(JSON.stringify(payload).length).toBeLessThan(2_000);
  });

  it("reports the catalog the answer came from", () => {
    expect(get("Hds::Button").source).toStrictEqual({
      version: null,
      resolvedVia: "default",
    });
  });

  it("satisfies its own declared output schema", () => {
    expect(() =>
      getComponentOutputSchema.parse(get("Hds::Button"))
    ).not.toThrow();
    expect(() => getComponentOutputSchema.parse(get("nope"))).not.toThrow();
  });
});

describe("get_hds_component input schema", () => {
  const schema = z.object(getComponentInputShape);

  it("requires a non-empty name", () => {
    expect(schema.safeParse({ name: "" }).success).toBe(false);
    expect(schema.safeParse({}).success).toBe(false);
    expect(schema.safeParse({ name: "Hds::Button" }).success).toBe(true);
  });

  it("describes the name argument, so a client can render it", () => {
    expect(getComponentInputShape.name.description).toBeTruthy();
  });
});

describe("get_hds_component registration", () => {
  it("returns text and structured content that agree", async () => {
    const result = await getRegisteredCallback()(
      { name: "Hds::Button" },
      buildRequestHandlerExtra()
    );

    expect(result.isError).toBeUndefined();
    expect(parseToolJson(getToolTextContent(result))).toStrictEqual(
      result.structuredContent
    );
    expect(result.structuredContent).toMatchObject({ found: true });
  });

  it("degrades an unreadable catalog to one failed call", async () => {
    const [registration] = captureToolRegistrations((server) =>
      createGetComponentTool(() => {
        throw new Error("catalog missing");
      }).register(server)
    );
    const result = await registration.callback(
      { name: "Hds::Button" },
      buildRequestHandlerExtra()
    );

    expect(result.isError).toBe(true);
    expect(getToolTextContent(result)).toContain(GET_COMPONENT_TOOL_NAME);
  });
});
