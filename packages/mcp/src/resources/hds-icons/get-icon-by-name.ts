/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  completeFromAliases,
  withSafeCompletion,
} from "../shared/completions.js";
import { defineDetailResource } from "../shared/define-resource.js";
import { toJsonResourceResponse } from "../shared/responses.js";
import { buildDetailUri } from "../shared/uri.js";
import { ICONS_URI, ICON_BY_NAME_URI_TEMPLATE } from "./constants.js";
import { getOrLoadIconStore } from "../../stores/hds-icons/index.js";
import { toSerializableIcon } from "./utils.js";

import type { McpResource } from "../types.js";
import type {
  IconAlias,
  IconCatalogStore,
} from "../../stores/hds-icons/index.js";

export const completeIconNames = (
  icons: IconAlias[],
  value: string,
): string[] => {
  return completeFromAliases({
    items: icons,
    getAliases: (icon) => [icon.iconName, ...icon.fileNames],
    getValue: (icon) => icon.iconName,
    value,
  });
};

export const readIconByNameResource = (
  store: IconCatalogStore,
  iconName: string,
) => {
  const icon = store.getIconByName(iconName);
  const uri = buildDetailUri(ICONS_URI, iconName);

  if (icon === null) {
    return toJsonResourceResponse(uri, {
      found: false,
      requestedIconName: iconName,
      message: "Icon not found for provided iconName or fileName.",
    });
  }

  return toJsonResourceResponse(uri, {
    found: true,
    requestedIconName: iconName,
    icon: toSerializableIcon(icon),
  });
};

export const createGetIconByNameResource = (
  getStore: () => IconCatalogStore,
): McpResource => {
  return defineDetailResource({
    name: "get_hds_icon",
    uriTemplate: ICON_BY_NAME_URI_TEMPLATE,
    title: "HDS icon detail",
    description: "Detailed Flight icon record for a specific icon name",
    variableName: "iconName",
    complete: withSafeCompletion("get_hds_icon", (value) =>
      completeIconNames(getStore().listIconAliases(), value),
    ),
    read: (iconName) => readIconByNameResource(getStore(), iconName),
  });
};

const getIconByNameResource = createGetIconByNameResource(getOrLoadIconStore);

export default getIconByNameResource;
