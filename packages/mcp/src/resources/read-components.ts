/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from './response-resource.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';

export const COMPONENTS_URI = 'hds://components';

export const buildComponentsResourcePayload = (store: ComponentCatalogStore) => {
  const manifestMeta = store.getManifestMeta();

  return {
    generatedAt: manifestMeta.generatedAt,
    totalComponentCount: manifestMeta.componentCount,
    components: store.listComponents(),
  };
};

export const readComponentsResource = (store: ComponentCatalogStore) => {
  const payload = buildComponentsResourcePayload(store);

  return toJsonResourceResponse(COMPONENTS_URI, payload);
};
