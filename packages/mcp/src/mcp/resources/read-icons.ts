/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from './response-resource.js';

import type { IconCatalogStore } from '../../catalogs/icons/store.js';

export const ICONS_URI = 'hds://icons';

export const buildIconsResourcePayload = (store: IconCatalogStore) => {
  const meta = store.getMeta();

  return {
    totalIconCount: meta.totalIconCount,
    totalAssetCount: meta.totalAssetCount,
    categories: meta.categories,
    icons: store.listIcons().map((icon) => ({
      iconName: icon.iconName,
      description: icon.description,
      category: icon.category,
      sizes: icon.sizes,
      hasMapping: icon.hasMapping,
    })),
  };
};

export const readIconsResource = (store: IconCatalogStore) => {
  const payload = buildIconsResourcePayload(store);

  return toJsonResourceResponse(ICONS_URI, payload);
};
