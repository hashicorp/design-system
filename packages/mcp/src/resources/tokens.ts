/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadTokenCatalog } from "./stores/tokens/store.js";
import { toJsonResourceResponse } from "./utils.js";

import type { McpResource } from "./types.js";
import type { TokenCatalogStore } from "./stores/tokens/store.js";
import type { JsonObject, JsonValue } from "../types.js";
import type { TokenRecord, TokenSummary } from "./stores/tokens/lookup.js";

export const TOKENS_URI = "hds://tokens";
export const TOKEN_BY_KEY_URI_TEMPLATE = `${TOKENS_URI}/{tokenKey}`;

const getTokenByKeyUri = (tokenKey: string): string => {
  return `${TOKENS_URI}/${encodeURIComponent(tokenKey)}`;
};

const toJsonValue = (value: unknown): JsonValue => {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => toJsonValue(item));
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).map(
      ([key, entryValue]) => [key, toJsonValue(entryValue)],
    );

    return Object.fromEntries(entries) as JsonObject;
  }

  return String(value);
};

const toSerializableTokenSummary = (token: TokenSummary): JsonObject => {
  return {
    key: token.key,
    name: token.name,
    type: token.type,
    value: toJsonValue(token.value),
    cssVar: token.cssVar,
    category: token.category,
    path: token.path,
  };
};

const toSerializableTokenRecord = (token: TokenRecord): JsonObject => {
  return {
    ...toSerializableTokenSummary(token),
    ...(token.original === undefined
      ? {}
      : { original: toJsonValue(token.original) }),
  };
};

export const readTokensResource = (store: TokenCatalogStore) => {
  const payload = {
    totalTokenCount: store.getMeta().totalTokenCount,
    tokens: store
      .listTokens()
      .map((token) => toSerializableTokenSummary(token)),
  };

  return toJsonResourceResponse(TOKENS_URI, payload);
};

export const readTokenByKeyResource = (
  store: TokenCatalogStore,
  tokenKey: string,
) => {
  const token = store.getTokenByKey(tokenKey);

  if (token === null) {
    return toJsonResourceResponse(getTokenByKeyUri(tokenKey), {
      found: false,
      requestedTokenKey: tokenKey,
      message: "Token not found for provided tokenKey.",
    });
  }

  return toJsonResourceResponse(getTokenByKeyUri(tokenKey), {
    found: true,
    requestedTokenKey: tokenKey,
    token: toSerializableTokenRecord(token),
  });
};

let tokenStore: TokenCatalogStore | null = null;

const getOrLoadTokenStore = (): TokenCatalogStore => {
  if (tokenStore === null) {
    tokenStore = loadTokenCatalog();
  }

  return tokenStore;
};

const getTokensResource: McpResource = {
  name: "get_hds_tokens",
  uri: TOKENS_URI,
  config: {
    title: "HDS token catalog index",
    description: "Canonical list of tokens with summary metadata",
    mimeType: "application/json",
  },
  readCallback: async () => {
    return readTokensResource(getOrLoadTokenStore());
  },
};

const getTokenByKeyResource: McpResource = {
  name: "get_hds_token",
  template: new ResourceTemplate(TOKEN_BY_KEY_URI_TEMPLATE, {
    list: undefined,
  }),
  config: {
    title: "HDS token detail",
    description: "Detailed token record for a specific token key",
    mimeType: "application/json",
  },
  readCallback: async (
    uri: URL,
    variables: Record<string, string | string[]>,
  ) => {
    const tokenKey = variables.tokenKey;

    if (typeof tokenKey !== "string" || tokenKey.trim().length === 0) {
      return toJsonResourceResponse(uri.toString(), {
        found: false,
        message: "Missing tokenKey variable.",
      });
    }

    return readTokenByKeyResource(getOrLoadTokenStore(), tokenKey);
  },
};

const TOKENS_RESOURCES: McpResource[] = [
  getTokensResource,
  getTokenByKeyResource,
];

export default TOKENS_RESOURCES;
