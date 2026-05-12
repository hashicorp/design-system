/**
 * Copyright HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ComponentCatalogStore } from '../component-catalog.js';

type JsonObject = Record<string, unknown>;

export const withGeneratedAt = (
  store: ComponentCatalogStore,
  payload: JsonObject
): JsonObject => {
  return {
    generatedAt: store.getManifestMeta().generatedAt,
    ...payload,
  };
};

export const toTextResponse = (payload: JsonObject) => {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(payload, null, 2),
      },
    ],
  };
};
