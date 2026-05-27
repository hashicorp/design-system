/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from './response-resource.js';

import type { IconCatalogStore } from '../../catalogs/icons/store.js';

export const ICON_BY_NAME_URI_TEMPLATE = 'hds://icons/{iconName}';

export const getIconByNameUri = (iconName: string): string => {
  return `hds://icons/${encodeURIComponent(iconName)}`;
};

export const buildIconByNameResourcePayload = (
  store: IconCatalogStore,
  iconName: string
): Record<string, unknown> => {
  const icon = store.getIconByName(iconName);

  if (icon === null) {
    return {
      found: false,
      requestedIconName: iconName,
      message: 'Icon not found for provided iconName.',
    };
  }

  return {
    found: true,
    requestedIconName: iconName,
    icon,
  };
};

export const readIconByNameResource = (
  store: IconCatalogStore,
  iconName: string
) => {
  const payload = buildIconByNameResourcePayload(store, iconName);

  return toJsonResourceResponse(getIconByNameUri(iconName), payload);
};
