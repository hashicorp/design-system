/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from './response-resource.js';

import type { ComponentCatalogStore } from '../../catalogs/components/store.js';

export const MANIFEST_META_URI = 'hds://manifest/meta';

export const buildManifestMetaResourcePayload = (
  store: ComponentCatalogStore
) => {
  const manifestMeta = store.getManifestMeta();
  const designCoverage = store.getDesignCoverage();

  return {
    ...manifestMeta,
    designCoverage: {
      totalComponentCount: designCoverage.totalComponentCount,
      componentsWithDesignCount: designCoverage.componentsWithDesignCount,
      componentsMissingDesignCount: designCoverage.componentsMissingDesignCount,
    },
  };
};

export const readManifestMetaResource = (store: ComponentCatalogStore) => {
  const payload = buildManifestMetaResourcePayload(store);

  return toJsonResourceResponse(MANIFEST_META_URI, payload);
};
