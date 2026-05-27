/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from './response-resource.js';

import type { TokenCatalogStore } from '../../tokens/store.js';

export const TOKENS_URI = 'hds://tokens';

export const buildTokensResourcePayload = (store: TokenCatalogStore) => {
  return {
    totalTokenCount: store.getMeta().totalTokenCount,
    tokens: store.listTokens(),
  };
};

export const readTokensResource = (store: TokenCatalogStore) => {
  const payload = buildTokensResourcePayload(store);

  return toJsonResourceResponse(TOKENS_URI, payload);
};
