/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadIconCatalog } from "../stores/flight-icons/store.js";
import { toJsonResourceResponse, withSafeResourceHandler } from "./utils.js";

import type { JsonObject } from "../types.js";
import type { IconCatalogStore } from "../stores/flight-icons/types.js";
import type { IconRecord } from "../stores/flight-icons/types.js";
import type { McpResource } from "./types.js";

export const ICONS_URI = "hds://icons";

const ICON_URI_TEMPLATE = `${ICONS_URI}/{iconName}`;
const iconStore = loadIconCatalog();

const toSerializableIcon = (icon: IconRecord): JsonObject => {
  return {
    iconName: icon.iconName,
    description: icon.description,
    category: icon.category,
    sizes: icon.sizes,
    hasMapping: icon.hasMapping,
    variants: icon.variants.map((variant) => ({
      id: variant.id,
      fileName: variant.fileName,
      size: variant.size,
      width: variant.width,
      height: variant.height,
      ...(variant.mapping === undefined ? {} : { mapping: variant.mapping }),
    })),
  };
};

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

  if (icon === null) {
    return toJsonResourceResponse(
      `${ICONS_URI}/${encodeURIComponent(iconName)}`,
      {
        found: false,
        requestedIconName: iconName,
        message: "Icon not found for provided iconName.",
      },
    );
  }

  return toJsonResourceResponse(
    `${ICONS_URI}/${encodeURIComponent(iconName)}`,
    {
      found: true,
      requestedIconName: iconName,
      icon: toSerializableIcon(icon),
    },
  );
};

const getIconsResource: McpResource = {
  name: "get_hds_icons",
  uri: ICONS_URI,
  config: {
    title: "HDS icon catalog index",
    description: "Canonical list of Flight icons with summary metadata",
    mimeType: "application/json",
  },
  readCallback: withSafeResourceHandler(
    "hds_icons",
    async () => {
      return readIconsResource(iconStore);
    },
    ICONS_URI,
  ),
};

const getIconResource: McpResource = {
  name: "get_hds_icon",
  template: new ResourceTemplate(ICON_URI_TEMPLATE, {
    list: undefined,
  }),
  config: {
    title: "HDS icon detail",
    description: "Detailed Flight icon record for a specific icon name",
    mimeType: "application/json",
  },
  readCallback: withSafeResourceHandler(
    "hds_icon",
    async (uri: URL, variables: Record<string, string | string[]>) => {
      const iconName = variables.iconName;

      if (typeof iconName !== "string" || iconName.trim().length === 0) {
        return toJsonResourceResponse(uri.toString(), {
          found: false,
          message: "Missing iconName variable.",
        });
      }

      return readIconResource(iconStore, iconName);
    },
    ICONS_URI,
  ),
};

const FLIGHT_ICONS_RESOURCES: McpResource[] = [
  getIconsResource,
  getIconResource,
];

export default FLIGHT_ICONS_RESOURCES;
