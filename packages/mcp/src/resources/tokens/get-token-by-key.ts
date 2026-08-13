import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getOrLoadTokenStore } from "./store/index.js";
import { toJsonResourceResponse } from "../utils.js";
import { TOKENS_URI, TOKEN_BY_KEY_URI_TEMPLATE } from "./constants.js";
import { toSerializableTokenSummary } from "./utils.js";

import type { McpResource } from "../types.js";
import type { TokenCatalogStore } from "./store/index.js";
import type { TokenSummary } from "./store/lookup.js";

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

export const completeTokenKeys = (
  tokens: TokenSummary[],
  value: string,
  limit = 100,
): string[] => {
  const query = value.trim().toLowerCase();
  const matches: string[] = [];

  for (const token of tokens) {
    const aliases = [token.key, token.name, token.path.join(".")];
    const isMatch =
      query.length === 0 ||
      aliases.some((alias) => alias.toLowerCase().includes(query));

    if (isMatch) {
      matches.push(token.key);
    }

    if (matches.length >= limit) {
      break;
    }
  }

  return matches;
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
    token: {
      ...toSerializableTokenSummary(token),
      ...(token.original === undefined ? {} : { original: token.original }),
    },
  });
};

export const createGetTokenByKeyResource = (
  getStore: () => TokenCatalogStore,
): McpResource => {
  return {
    name: "get_hds_token",
    template: new ResourceTemplate(TOKEN_BY_KEY_URI_TEMPLATE, {
      list: undefined,
      complete: {
        tokenKey: (value) => completeTokenKeys(getStore().listTokens(), value),
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

      return readTokenByKeyResource(getStore(), decodeTokenKey(tokenKey));
    },
  };
};

const getTokenByKeyResource = createGetTokenByKeyResource(getOrLoadTokenStore);

export default getTokenByKeyResource;
