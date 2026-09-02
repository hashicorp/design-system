/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  completeFromAliases,
  withSafeCompletion,
} from "../shared/completions.js";
import { defineDetailResource } from "../shared/define-resource.js";
import { getOrLoadTokenStore } from "../../stores/tokens/index.js";
import { toJsonResourceResponse } from "../shared/responses.js";
import { buildDetailUri } from "../shared/uri.js";
import { TOKENS_URI, TOKEN_BY_KEY_URI_TEMPLATE } from "./constants.js";
import { toSerializableTokenSummary } from "./utils.js";

import type { McpResource } from "../types.js";
import type { TokenCatalogStore } from "../../stores/tokens/index.js";
import type { TokenSummary } from "../../stores/tokens/lookup.js";

export const completeTokenKeys = (
  tokens: TokenSummary[],
  value: string,
): string[] => {
  return completeFromAliases({
    items: tokens,
    getAliases: (token) => [token.key, token.name, token.path.join(".")],
    getValue: (token) => token.key,
    value,
  });
};

export const readTokenByKeyResource = (
  store: TokenCatalogStore,
  tokenKey: string,
) => {
  const token = store.getTokenByKey(tokenKey);
  const uri = buildDetailUri(TOKENS_URI, tokenKey);

  if (token === null) {
    return toJsonResourceResponse(uri, {
      found: false,
      requestedTokenKey: tokenKey,
      message: "Token not found for provided tokenKey.",
    });
  }

  return toJsonResourceResponse(uri, {
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
  return defineDetailResource({
    name: "get_hds_token",
    uriTemplate: TOKEN_BY_KEY_URI_TEMPLATE,
    title: "HDS token detail",
    description: "Detailed token record for a specific token key",
    variableName: "tokenKey",
    complete: withSafeCompletion("get_hds_token", (value) =>
      completeTokenKeys(getStore().listTokens(), value),
    ),
    read: (tokenKey) => readTokenByKeyResource(getStore(), tokenKey),
  });
};

const getTokenByKeyResource = createGetTokenByKeyResource(getOrLoadTokenStore);

export default getTokenByKeyResource;
