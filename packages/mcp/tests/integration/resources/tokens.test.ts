/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { TOKENS_URI } from "../../../src/resources/tokens/constants.js";
import { readTokensResource } from "../../../src/resources/tokens/get-tokens.js";
import { readTokenByKeyResource } from "../../../src/resources/tokens/get-token-by-key.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../support/resource-content.js";

import type { TokenCatalogStore } from "../../../src/resources/tokens/store/index.js";
import type {
  TokenRecord,
  TokenSummary,
} from "../../../src/resources/tokens/store/lookup.js";

const buildStore = ({
  tokens,
  tokenByKey,
}: {
  tokens: TokenSummary[];
  tokenByKey: TokenRecord | null;
}): TokenCatalogStore => {
  return {
    getMeta: () => ({
      totalTokenCount: tokens.length,
    }),
    listTokens: () => tokens,
    getTokenByKey: () => tokenByKey,
    searchTokens: () => [],
  };
};

describe("tokens resource", () => {
  it("returns token index payload for hds://tokens", () => {
    const token: TokenSummary = {
      key: "token-color-palette-blue-200",
      name: "token.color.palette.blue.200",
      type: "color",
      value: "#e8f1ff",
      cssVar: "--token.color.palette.blue.200",
      category: "palette",
      path: ["token", "color", "palette", "blue", "200"],
    };
    const store = buildStore({ tokens: [token], tokenByKey: null });
    const response = readTokensResource(store);
    const [{ uri, mimeType, ...content }] = response.contents;
    const text = getTextContent({ uri, ...content });
    const payload = parseResourceJson(text);

    expect(uri).toBe(TOKENS_URI);
    expect(mimeType).toBe("application/json");
    expect(payload).toStrictEqual({
      totalTokenCount: 1,
      tokens: [
        {
          key: token.key,
          name: token.name,
          type: token.type,
          value: token.value,
          cssVar: token.cssVar,
          category: token.category,
          path: token.path,
        },
      ],
    });
  });

  it("returns detailed token payload when token exists", () => {
    const tokenKey = "token-color-palette-blue-200";
    const token: TokenRecord = {
      key: tokenKey,
      name: "token.color.palette.blue.200",
      type: "color",
      value: "#e8f1ff",
      cssVar: "--token.color.palette.blue.200",
      category: "palette",
      path: ["token", "color", "palette", "blue", "200"],
      original: {
        $type: "color",
        $value: "#e8f1ff",
        key: tokenKey,
      },
    };
    const store = buildStore({ tokens: [], tokenByKey: token });
    const response = readTokenByKeyResource(store, tokenKey);
    const [{ uri, ...content }] = response.contents;
    const text = getTextContent({ uri, ...content });
    const payload = parseResourceJson(text);

    expect(uri).toBe(`${TOKENS_URI}/${encodeURIComponent(tokenKey)}`);
    expect(payload).toStrictEqual({
      found: true,
      requestedTokenKey: tokenKey,
      token: {
        key: token.key,
        name: token.name,
        type: token.type,
        value: token.value,
        cssVar: token.cssVar,
        category: token.category,
        path: token.path,
        original: token.original,
      },
    });
  });

  it("returns not found payload when token does not exist", () => {
    const tokenKey = "token-not-real";
    const store = buildStore({ tokens: [], tokenByKey: null });
    const response = readTokenByKeyResource(store, tokenKey);
    const [{ uri, ...content }] = response.contents;
    const text = getTextContent({ uri, ...content });
    const payload = parseResourceJson(text);

    expect(uri).toBe(`${TOKENS_URI}/${encodeURIComponent(tokenKey)}`);
    expect(payload).toStrictEqual({
      found: false,
      requestedTokenKey: tokenKey,
      message: "Token not found for provided tokenKey.",
    });
  });

  it("encodes token keys in token detail URI", () => {
    const tokenKey = "token.color.palette.blue/200";
    const token: TokenRecord = {
      key: tokenKey,
      name: "token.color.palette.blue.200",
      type: "color",
      value: "#e8f1ff",
      cssVar: "--token.color.palette.blue.200",
      category: "palette",
      path: ["token", "color", "palette", "blue", "200"],
    };
    const store = buildStore({ tokens: [], tokenByKey: token });
    const response = readTokenByKeyResource(store, tokenKey);
    const [{ uri }] = response.contents;

    expect(uri).toBe("hds://tokens/token.color.palette.blue%2F200");
  });
});
