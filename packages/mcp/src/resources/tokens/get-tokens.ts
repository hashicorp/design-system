/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from "../shared/responses.js";
import { getOrLoadTokenStore } from "./store/index.js";
import { toSerializableTokenSummary } from "./utils.js";
import { TOKENS_URI } from "./constants.js";

import type { McpResource } from "../types.js";
import type { TokenCatalogStore } from "./store/index.js";

export const readTokensResource = (store: TokenCatalogStore) => {
  const meta = store.getMeta();

  const payload = {
    totalTokenCount: meta.totalTokenCount,
    source: meta.source,
    tokens: store
      .listTokens()
      .map((token) => toSerializableTokenSummary(token)),
  };

  return toJsonResourceResponse(TOKENS_URI, payload);
};

export const createGetTokensResource = (
  getStore: () => TokenCatalogStore,
): McpResource => {
  return {
    name: "get_hds_tokens",
    uri: TOKENS_URI,
    config: {
      title: "HDS token catalog index",
      description: "Canonical list of tokens with summary metadata",
      mimeType: "application/json",
    },
    readCallback: async () => readTokensResource(getStore()),
  };
};

export const getTokensResource = createGetTokensResource(getOrLoadTokenStore);

export default getTokensResource;
