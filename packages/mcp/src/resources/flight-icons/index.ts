/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  ResourceTemplate,
  ReadResourceTemplateCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";

import {
  toJsonResourceResponse,
  withSafeResourceHandler,
} from "../../utils/resources.js";
import { loadIconCatalog } from "../../stores/flight-icons/store.js";

import type { McpResource } from "../types.js";

export const ICONS_URI = "hds://icons";
export const ICON_URI_TEMPLATE = `${ICONS_URI}/{iconName}`;

const iconStore = loadIconCatalog();

export default [
  {
    name: "get_hds_icons",
    uri: ICONS_URI,
    config: {
      title: "HDS icon catalog index",
      description: "Canonical list of Flight icons with summary metadata.",
      mimeType: "application/json",
    },
    readCallback: withSafeResourceHandler(
      "get_hds_icons",
      async () => {
        const meta = iconStore.getMeta();

        const payload = {
          totalIconCount: meta.totalIconCount,
          totalAssetCount: meta.totalAssetCount,
          categories: meta.categories,
          icons: iconStore.listIcons().map((icon) => ({
            iconName: icon.iconName,
            description: icon.description,
            category: icon.category,
            sizes: icon.sizes,
            hasMapping: icon.hasMapping,
          })),
        };

        return toJsonResourceResponse(ICONS_URI, payload);
      },
      ICONS_URI,
    ),
  },
  {
    name: "get_hds_icon",
    template: new ResourceTemplate(ICON_URI_TEMPLATE, {
      list: undefined,
      complete: {
        iconName: (value) => {
          const normalizedValue = value.trim().toLowerCase();

          return iconStore
            .listIcons()
            .map((icon) => icon.iconName)
            .filter((iconName) => {
              if (normalizedValue === "") {
                return true;
              }

              return iconName.toLowerCase().includes(normalizedValue);
            })
            .slice(0, 25);
        },
      },
    }),
    config: {
      title: "HDS icon catalog entry",
      description: "Detailed metadata for a specific Flight icon.",
      mimeType: "application/json",
    },
    readCallback: withSafeResourceHandler(
      "get_hds_icon",
      async (_uri, variables) => {
        const iconName = variables["iconName"];

        if (typeof iconName !== "string" || iconName.trim() === "") {
          throw new Error(
            'Resource variable "iconName" must be a non-empty string.',
          );
        }

        const icon = iconStore.getIconByName(iconName);

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
      },
    ) as ReadResourceTemplateCallback,
  },
] as McpResource[];
