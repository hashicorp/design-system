/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from "../utils/resources.js";

import type { IconCatalogStore } from "../stores/flight-icons/store.js";

export const ICONS_URI = "hds://icons";

export const readIconsResource = (store: IconCatalogStore) => {
  const meta = store.getMeta();

  const payload = {
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

  return toJsonResourceResponse(ICONS_URI, payload);
};

export const readIconResource = (store: IconCatalogStore, iconName: string) => {
  const icon = store.getIconByName(iconName);

  const payload =
    icon === null
      ? {
          found: false,
          requestedIconName: iconName,
          message: "Icon not found for provided iconName.",
        }
      : {
          found: true,
          requestedIconName: iconName,
          icon,
        };

  return toJsonResourceResponse(
    `${ICONS_URI}/${encodeURIComponent(iconName)}`,
    payload,
  );
};
