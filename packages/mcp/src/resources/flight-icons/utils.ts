/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type {
  IconRecord,
  IconSummary,
} from "./store/lookup.js";
import type { JsonObject } from "../../types.js";

export const toSerializableIconSummary = (
  icon: IconSummary,
): JsonObject => {
  return {
    iconName: icon.iconName,
    description: icon.description,
    category: icon.category,
    sizes: icon.sizes,
    hasMapping: icon.hasMapping,
  };
};

export const toSerializableIcon = (icon: IconRecord): JsonObject => {
  return {
    ...toSerializableIconSummary(icon),
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
