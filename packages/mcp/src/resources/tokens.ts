/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadTokenCatalog } from "./stores/tokens/store.js";
import { toJsonResourceResponse } from "./utils.js";

import type { McpResource } from "./types.js";
import type { TokenCatalogStore } from "./stores/tokens/store.js";
import type { JsonObject } from "../types.js";
import type { TokenRecord, TokenSummary } from "./stores/tokens/lookup.js";

export const TOKENS_URI = "hds://tokens";
export const TOKEN_BY_KEY_URI_TEMPLATE = `${TOKENS_URI}/{tokenKey}`;

const getTokenByKeyUri = (tokenKey: string): string => {
  return `${TOKENS_URI}/${encodeURIComponent(tokenKey)}`;
};

const decodeTokenKey = (tokenKey: string): string => {
  try {
    return decodeURIComponent(tokenKey);
  } catch {
    return tokenKey;
  }
};

const toSerializableTokenSummary = (token: TokenSummary): JsonObject => {
  return {
    key: token.key,
    name: token.name,
    type: token.type,
    value: token.value,
    cssVar: token.cssVar,
    category: token.category,
    path: token.path,
  };
};

const toSerializableTokenRecord = (token: TokenRecord): JsonObject => {
  return {
    ...toSerializableTokenSummary(token),
    ...(token.original === undefined ? {} : { original: token.original }),
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

const completeTokenKey = (value: string): string[] => {
  const query = value.trim().toLowerCase();
  const matches: string[] = [];

  for (const token of getOrLoadTokenStore().listTokens()) {
    const aliases = [token.key, token.name, token.path.join(".")];
    const isMatch =
      query.length === 0 ||
      aliases.some((alias) => alias.toLowerCase().includes(query));

    if (isMatch) {
      matches.push(token.key);
    }

    if (matches.length >= 100) {
      break;
    }
  }

  return matches;
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
    complete: {
      tokenKey: completeTokenKey,
    },
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

    return readTokenByKeyResource(getOrLoadTokenStore(), decodeTokenKey(tokenKey));
  },
};

const TOKENS_RESOURCES: McpResource[] = [
  getTokensResource,
  getTokenByKeyResource,
];

export default TOKENS_RESOURCES;
