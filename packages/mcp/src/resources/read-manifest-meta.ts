/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from './response-resource.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';

export const MANIFEST_META_URI = 'hds://manifest/meta';

export const buildManifestMetaResourcePayload = (store: ComponentCatalogStore) => {
  return store.getManifestMeta();
};

export const readManifestMetaResource = (store: ComponentCatalogStore) => {
  const payload = buildManifestMetaResourcePayload(store);

  return toJsonResourceResponse(MANIFEST_META_URI, payload);
};
