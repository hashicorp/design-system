/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { IconAsset } from "./schema.js";

export interface IconVariant {
  id: string;
  fileName: string;
  size: string;
  width: number;
  height: number;
  mapping?: string;
}

export interface IconSummary {
  iconName: string;
  description: string;
  category: string;
  sizes: string[];
  hasMapping: boolean;
}

export interface IconRecord extends IconSummary {
  variants: IconVariant[];
}

export const normalizeLookupValue = (value: string): string => {
  return value.trim().toLowerCase();
};

export const getIconLookupKeys = (icon: IconRecord): string[] => {
  return [
    normalizeLookupValue(icon.iconName),
    ...icon.variants.map((variant) =>
      normalizeLookupValue(variant.fileName),
    ),
  ];
};

const compareIconVariantsBySize = (
  left: IconVariant,
  right: IconVariant,
): number => {
  return left.size.localeCompare(right.size, undefined, { numeric: true });
};

export const toIconRecord = (assets: IconAsset[]): IconRecord => {
  const firstAsset = assets[0];

  if (firstAsset === undefined) {
    throw new Error("Cannot create icon record from an empty assets array.");
  }

  const variants = assets
    .map((asset): IconVariant => {
      return {
        id: asset.id,
        fileName: asset.fileName,
        size: asset.size,
        width: asset.width,
        height: asset.height,
        ...(asset.mapping === undefined ? {} : { mapping: asset.mapping }),
      };
    })
    .sort(compareIconVariantsBySize);
  const description =
    assets
      .map((asset) => asset.description?.trim() ?? "")
      .find((value) => value.length > 0) ?? "";

  return {
    iconName: firstAsset.iconName,
    description,
    category: firstAsset.category,
    sizes: variants.map((variant) => variant.size),
    hasMapping: variants.some((variant) => variant.mapping !== undefined),
    variants,
  };
};
