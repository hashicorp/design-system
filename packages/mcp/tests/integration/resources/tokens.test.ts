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

import type { TokenCatalogStore } from "../../../src/stores/tokens/index.js";
import type {
  TokenRecord,
  TokenSummary,
} from "../../../src/stores/tokens/lookup.js";
import type { CatalogSource } from "../../../src/catalog/loader.js";

const STORE_SOURCE: CatalogSource = {
  version: "5.1.0",
  resolvedVia: "project-root",
};

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
      categories: [
        ...new Set(
          tokens
            .map((token) => token.category)
            .filter((category): category is string => category !== undefined)
        ),
      ].sort(),
      source: STORE_SOURCE,
    }),
    listTokens: () => tokens,
    getTokenByKey: () => tokenByKey,
    findMigration: () => null,
    searchTokens: () => ({ totalMatches: 0, hits: [] }),
  };
};

describe("tokens resource", () => {
  it("returns token index payload for hds://tokens", () => {
    const token: TokenSummary = {
      key: "{core.color.blue-200}",
      name: "hds-core-color-blue-200",
      type: "color",
      value: "#1060ff",
      cssVar: "--hds-core-color-blue-200",
      category: "core",
      attributes: {
        category: "core",
      },
      path: ["core", "color", "blue-200"],
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
      source: STORE_SOURCE,
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
    const tokenKey = "{core.color.blue-200}";
    const token: TokenRecord = {
      key: tokenKey,
      name: "hds-core-color-blue-200",
      type: "color",
      value: "#1060ff",
      cssVar: "--hds-core-color-blue-200",
      category: "core",
      attributes: {
        category: "core",
      },
      path: ["core", "color", "blue-200"],
      original: {
        $type: "color",
        $value: "#1060ff",
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
    const tokenKey = "hds-not-real";
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

  it("answers an old token name with what replaced it", () => {
    const store: TokenCatalogStore = {
      ...buildStore({ tokens: [], tokenByKey: null }),
      findMigration: () => ({
        before: "--token-color-foreground-action",
        after: "--hds-foreground-color-action",
        version: "6.0.0",
      }),
    };
    const [content] = readTokenByKeyResource(
      store,
      "--token-color-foreground-action",
    ).contents;

    expect(parseResourceJson(getTextContent(content))).toStrictEqual({
      found: false,
      requestedTokenKey: "--token-color-foreground-action",
      message: "Token renamed to --hds-foreground-color-action in 6.0.0.",
      migration: {
        before: "--token-color-foreground-action",
        after: "--hds-foreground-color-action",
        version: "6.0.0",
      },
    });
  });

  it("encodes token keys in token detail URI", () => {
    const tokenKey = "core.color.blue/200";
    const token: TokenRecord = {
      key: tokenKey,
      name: "hds-core-color-blue-200",
      type: "color",
      value: "#1060ff",
      cssVar: "--hds-core-color-blue-200",
      category: "core",
      attributes: {
        category: "core",
      },
      path: ["core", "color", "blue-200"],
    };
    const store = buildStore({ tokens: [], tokenByKey: token });
    const response = readTokenByKeyResource(store, tokenKey);
    const [{ uri }] = response.contents;

    expect(uri).toBe("hds://tokens/core.color.blue%2F200");
  });
});
