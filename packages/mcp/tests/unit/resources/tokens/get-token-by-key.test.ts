/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  completeTokenKeys,
  createGetTokenByKeyResource,
} from "../../../../src/resources/tokens/get-token-by-key.js";
import { createTokenCatalogStore } from "../../../../src/stores/tokens/index.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../../support/resource-content.js";
import { buildRequestHandlerExtra } from "../../../support/request-handler.js";
import { buildTokenCatalogRow } from "../../../support/token-catalog.js";

const rows = [
  buildTokenCatalogRow(),
  buildTokenCatalogRow({
    key: "{color.foreground.action}",
    $type: "color",
    $value: "#1060ff",
    $modes: { default: "#1060ff", "cds-g0": "#0f62fe" },
    name: "token-color-foreground-action",
    path: ["color", "foreground", "action"],
  }),
];

describe("completeTokenKeys", () => {
  const tokens = createTokenCatalogStore(rows).listTokens();

  it("matches key, name, and dot path case-insensitively", () => {
    expect(completeTokenKeys(tokens, "BORDER.RADIUS")).toStrictEqual([
      "{border.radius.x-small}",
    ]);
    expect(completeTokenKeys(tokens, "TOKEN-COLOR")).toStrictEqual([
      "{color.foreground.action}",
    ]);
  });

  it("returns every token in catalog order for a blank query", () => {
    expect(completeTokenKeys(tokens, "")).toStrictEqual(
      tokens.map((token) => token.key),
    );
  });
});

describe("createGetTokenByKeyResource", () => {
  const store = createTokenCatalogStore(rows);
  const resource = createGetTokenByKeyResource(() => store);

  if (!("template" in resource)) {
    throw new Error("Expected a token resource template");
  }

  it("decodes token keys before reading the store", async () => {
    const result = await resource.readCallback(
      new URL("hds://tokens/%7Bcolor.foreground.action%7D"),
      { tokenKey: "%7Bcolor.foreground.action%7D" },
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toMatchObject({
      found: true,
      requestedTokenKey: "{color.foreground.action}",
    });
  });

  it("returns the token's value in each theme, and omits it for an unthemed one", async () => {
    const read = async (tokenKey: string) => {
      const result = await resource.readCallback(
        new URL(`hds://tokens/${encodeURIComponent(tokenKey)}`),
        { tokenKey: encodeURIComponent(tokenKey) },
        buildRequestHandlerExtra(),
      );
      const content = result.contents[0];

      if (content === undefined) {
        throw new Error("Expected resource content");
      }

      return parseResourceJson(getTextContent(content));
    };

    expect(await read("{color.foreground.action}")).toMatchObject({
      token: { modes: { default: "#1060ff", "cds-g0": "#0f62fe" } },
    });
    expect(
      (await read("{border.radius.x-small}")).token,
    ).not.toHaveProperty("modes");
  });

  it("returns a missing-variable response", async () => {
    const result = await resource.readCallback(
      new URL("hds://tokens/"),
      {
        tokenKey: [],
      },
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(parseResourceJson(getTextContent(content))).toStrictEqual({
      found: false,
      message: "Missing tokenKey variable.",
    });
  });

  it("exposes completion through the resource template", async () => {
    const complete = resource.template.completeCallback("tokenKey");

    expect(complete).toBeDefined();
    await expect(
      Promise.resolve(complete?.("foreground")),
    ).resolves.toStrictEqual(["{color.foreground.action}"]);
  });
});
