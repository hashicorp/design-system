/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { toJsonResourceResponse } from "../utils.js";
import { ICONS_URI, ICON_BY_NAME_URI_TEMPLATE } from "./constants.js";
import { getOrLoadIconStore } from "./store/index.js";
import { toSerializableIcon } from "./utils.js";

import type { McpResource } from "../types.js";
import type { IconCatalogStore } from "./store/index.js";

const getIconByNameUri = (iconName: string): string => {
  return `${ICONS_URI}/${encodeURIComponent(iconName)}`;
};

const decodeIconName = (iconName: string): string => {
  try {
    return decodeURIComponent(iconName);
  } catch {
    return iconName;
  }
};

export const completeIconNames = (
  store: IconCatalogStore,
  value: string,
  limit = 100,
): string[] => {
  const query = value.trim().toLowerCase();
  const matches: string[] = [];

  for (const summary of store.listIcons()) {
    const icon = store.getIconByName(summary.iconName);
    const aliases = [
      summary.iconName,
      ...(icon?.variants.map((variant) => variant.fileName) ?? []),
    ];
    const isMatch =
      query.length === 0 ||
      aliases.some((alias) => alias.toLowerCase().includes(query));

    if (isMatch) {
      matches.push(summary.iconName);
    }

    if (matches.length >= limit) {
      break;
    }
  }

  return matches;
};

export const readIconByNameResource = (
  store: IconCatalogStore,
  iconName: string,
) => {
  const icon = store.getIconByName(iconName);

  if (icon === null) {
    return toJsonResourceResponse(getIconByNameUri(iconName), {
      found: false,
      requestedIconName: iconName,
      message: "Icon not found for provided iconName or fileName.",
    });
  }

  return toJsonResourceResponse(getIconByNameUri(iconName), {
    found: true,
    requestedIconName: iconName,
    icon: toSerializableIcon(icon),
  });
};

export const createGetIconByNameResource = (
  getStore: () => IconCatalogStore,
): McpResource => {
  return {
    name: "get_hds_icon",
    template: new ResourceTemplate(ICON_BY_NAME_URI_TEMPLATE, {
      list: undefined,
      complete: {
        iconName: (value) => completeIconNames(getStore(), value),
      },
    }),
    config: {
      title: "HDS icon detail",
      description: "Detailed Flight icon record for a specific icon name",
      mimeType: "application/json",
    },
    readCallback: async (
      uri: URL,
      variables: Record<string, string | string[]>,
    ) => {
      const iconName = variables.iconName;

      if (typeof iconName !== "string" || iconName.trim().length === 0) {
        return toJsonResourceResponse(uri.toString(), {
          found: false,
          message: "Missing iconName variable.",
        });
      }

      return readIconByNameResource(getStore(), decodeIconName(iconName));
    },
  };
};

const getIconByNameResource =
  createGetIconByNameResource(getOrLoadIconStore);

export default getIconByNameResource;
