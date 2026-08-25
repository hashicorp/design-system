/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from "../shared/responses.js";
import { ICONS_URI } from "./constants.js";
import { getOrLoadIconStore } from "../../stores/flight-icons/index.js";
import { toSerializableIconSummary } from "./utils.js";

import type { McpResource } from "../types.js";
import type { IconCatalogStore } from "../../stores/flight-icons/index.js";

export const readIconsResource = (store: IconCatalogStore) => {
  const meta = store.getMeta();
  const payload = {
    totalIconCount: meta.totalIconCount,
    totalAssetCount: meta.totalAssetCount,
    categories: meta.categories,
    source: meta.source,
    icons: store.listIcons().map((icon) => toSerializableIconSummary(icon)),
  };

  return toJsonResourceResponse(ICONS_URI, payload);
};

export const createGetIconsResource = (
  getStore: () => IconCatalogStore,
): McpResource => {
  return {
    name: "get_hds_icons",
    uri: ICONS_URI,
    config: {
      title: "HDS icon catalog index",
      description: "Canonical list of Flight icons with summary metadata",
      mimeType: "application/json",
    },
    readCallback: async () => readIconsResource(getStore()),
  };
};

export const getIconsResource = createGetIconsResource(getOrLoadIconStore);

export default getIconsResource;
