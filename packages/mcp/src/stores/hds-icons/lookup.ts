/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { normalizeLookupValue } from "../../catalog/normalize.js";

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
  // the Carbon icon this one maps to, e.g. `Arrow--right`
  carbonIconName?: string;
}

export interface IconRecord extends IconSummary {
  variants: IconVariant[];
}

// a Carbon icon name such as `Arrow--right` or `warning--diamond-fill`; flight-icons 5.0.0 put
// free-text notes ("No Carbon equivalent.") in the same field, which are not a mapping
const CARBON_ICON_NAME = /^[a-z0-9]+(?:-{1,2}[a-z0-9]+)*$/iu;

export const toCarbonIconName = (
  mapping: string | undefined,
): string | undefined => {
  const trimmed = mapping?.trim();

  return trimmed !== undefined && CARBON_ICON_NAME.test(trimmed)
    ? trimmed
    : undefined;
};

export const getIconLookupKeys = (icon: IconRecord): string[] => {
  return [
    normalizeLookupValue(icon.iconName),
    ...icon.variants.map((variant) => normalizeLookupValue(variant.fileName)),
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
      const mapping = toCarbonIconName(asset.mapping);

      return {
        id: asset.id,
        fileName: asset.fileName,
        size: asset.size,
        width: asset.width,
        height: asset.height,
        ...(mapping === undefined ? {} : { mapping }),
      };
    })
    .sort(compareIconVariantsBySize);
  const description =
    assets
      .map((asset) => asset.description?.trim() ?? "")
      .find((value) => value.length > 0) ?? "";
  // every size carries the same mapping, since Carbon has one glyph that is scaled
  const carbonIconName = variants.find(
    (variant) => variant.mapping !== undefined,
  )?.mapping;

  return {
    iconName: firstAsset.iconName,
    description,
    category: firstAsset.category,
    sizes: variants.map((variant) => variant.size),
    hasMapping: carbonIconName !== undefined,
    ...(carbonIconName === undefined ? {} : { carbonIconName }),
    variants,
  };
};
