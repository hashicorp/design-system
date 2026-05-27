/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from './response-resource.js';

import type { ComponentCatalogStore } from '../../catalogs/components/store.js';

export const DESIGN_MAPPINGS_URI = 'hds://design/mappings';

export const buildDesignMappingsResourcePayload = (
  store: ComponentCatalogStore
) => {
  const manifestMeta = store.getManifestMeta();
  const mappings = store.listDesignMappings();

  return {
    generatedAt: manifestMeta.generatedAt,
    totalMappingCount: mappings.length,
    mappings,
  };
};

export const readDesignMappingsResource = (store: ComponentCatalogStore) => {
  const payload = buildDesignMappingsResourcePayload(store);

  return toJsonResourceResponse(DESIGN_MAPPINGS_URI, payload);
};
