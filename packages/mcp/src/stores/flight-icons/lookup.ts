/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { IconAsset } from "./schema.js";
import type { IconRecord, IconVariant } from "./types.js";

export const normalizeLookupValue = (value: string): string => {
  return value.trim().toLowerCase();
};

export const getIconLookupKeys = (icon: IconRecord): string[] => {
  const keys = [normalizeLookupValue(icon.iconName)];

  for (const variant of icon.variants) {
    keys.push(normalizeLookupValue(variant.fileName));
  }

  return keys;
};

const compareIconVariantsBySize = (
  left: IconVariant,
  right: IconVariant,
): number => {
  return Number(left.size) - Number(right.size);
};

export const toIconRecord = (assets: IconAsset[]): IconRecord => {
  const [firstAsset] = assets;

  if (firstAsset === undefined) {
    throw new Error("Cannot create icon record from an empty assets array.");
  }

  const variants: IconVariant[] = assets
    .map((asset) => ({
      id: asset.id,
      fileName: asset.fileName,
      size: asset.size,
      width: asset.width,
      height: asset.height,
      ...(asset.mapping === undefined ? {} : { mapping: asset.mapping }),
    }))
    .sort(compareIconVariantsBySize);

  const sizes = variants.map((variant) => variant.size);
  const descriptions = assets
    .map((asset) => asset.description?.trim() ?? "")
    .filter((description) => description.length > 0);
  const firstDescription = descriptions[0] ?? "";

  return {
    iconName: firstAsset.iconName,
    description: firstDescription,
    category: firstAsset.category,
    sizes,
    hasMapping: variants.some((variant) => variant.mapping !== undefined),
    variants,
  };
};
