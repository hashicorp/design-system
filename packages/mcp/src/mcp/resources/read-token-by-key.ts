/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from './response-resource.js';

import type { JsonObject } from '../../types.js';
import type { TokenCatalogStore } from '../../tokens/store.js';

export const TOKEN_BY_KEY_URI_TEMPLATE = 'hds://tokens/{tokenKey}';

export const getTokenByKeyUri = (tokenKey: string): string => {
  return `hds://tokens/${encodeURIComponent(tokenKey)}`;
};

export const buildTokenByKeyResourcePayload = (
  store: TokenCatalogStore,
  tokenKey: string
): JsonObject => {
  const token = store.getTokenByKey(tokenKey);

  if (token === null) {
    return {
      found: false,
      requestedTokenKey: tokenKey,
      message: 'Token not found for provided tokenKey.',
    };
  }

  return {
    found: true,
    requestedTokenKey: tokenKey,
    token,
  };
};

export const readTokenByKeyResource = (
  store: TokenCatalogStore,
  tokenKey: string
) => {
  const payload = buildTokenByKeyResourcePayload(store, tokenKey);

  return toJsonResourceResponse(getTokenByKeyUri(tokenKey), payload);
};
