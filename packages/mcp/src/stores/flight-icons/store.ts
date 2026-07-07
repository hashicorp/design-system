/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import {
  getIconLookupKeys,
  normalizeLookupValue,
  toIconRecord,
} from "./lookup.js";
import { iconCatalogSchema } from "./schema.js";

import type { IconRecord } from "./lookup.js";

interface SearchIconsInput {
  query: string;
  limit: number;
  category?: string;
  size?: string;
  hasMapping?: boolean;
}

export type IconCatalogStore = {
  getMeta: () => {
    totalIconCount: number;
    totalAssetCount: number;
    categories: string[];
  };
  listIcons: () => IconRecord[];
  getIconByName: (nameOrFileName: string) => IconRecord | null;
  searchIcons: (input: SearchIconsInput) => IconRecord[];
};

const require = createRequire(import.meta.url);

const getIconCatalogPath = (): string => {
  return require.resolve("@hashicorp/flight-icons/catalog.json");
};

const toSearchBlob = (icon: IconRecord): string => {
  const mappings = icon.variants
    .map((variant) => variant.mapping ?? "")
    .join(" ");
  const fileNames = icon.variants.map((variant) => variant.fileName).join(" ");

  return [icon.iconName, icon.description, icon.category, mappings, fileNames]
    .join(" ")
    .toLowerCase();
};

export const loadIconCatalog = (): IconCatalogStore => {
  const iconCatalogPath = getIconCatalogPath();
  const rawCatalog = readFileSync(iconCatalogPath, "utf8");
  const parsedCatalog = JSON.parse(rawCatalog) as unknown;
  const catalog = iconCatalogSchema.parse(parsedCatalog);

  const assetsByIconName = new Map<string, typeof catalog.assets>();

  for (const asset of catalog.assets) {
    const normalizedName = normalizeLookupValue(asset.iconName);
    const existingAssets = assetsByIconName.get(normalizedName);

    if (existingAssets) {
      existingAssets.push(asset);
    } else {
      assetsByIconName.set(normalizedName, [asset]);
    }

  const icons = [...assetsByIconName.values()].map((assets) =>
    toIconRecord(assets),
  );
  const iconLookup = new Map<string, IconRecord>();

  for (const icon of icons) {
    for (const key of getIconLookupKeys(icon)) {
      iconLookup.set(key, icon);
    }
  }

  const categories = [...new Set(icons.map((icon) => icon.category))].sort(
    (a, b) => a.localeCompare(b),
  );

  return {
    getMeta: () => ({
      totalIconCount: icons.length,
      totalAssetCount: catalog.assets.length,
      categories,
    }),
    listIcons: () => icons,
    getIconByName: (nameOrFileName: string) => {
      return iconLookup.get(normalizeLookupValue(nameOrFileName)) ?? null;
    },
    searchIcons: ({
      query,
      limit,
      category,
      size,
      hasMapping,
    }: SearchIconsInput) => {
      const normalizedQuery = normalizeLookupValue(query);
      const normalizedCategory =
        category === undefined ? null : normalizeLookupValue(category);

      return icons
        .filter((icon) => {
          if (
            normalizedCategory !== null &&
            normalizeLookupValue(icon.category) !== normalizedCategory
          ) {
            return false;
          }

          if (size !== undefined && !icon.sizes.includes(size)) {
            return false;
          }

          if (hasMapping !== undefined && icon.hasMapping !== hasMapping) {
            return false;
          }

          return toSearchBlob(icon).includes(normalizedQuery);
        })
        .slice(0, limit);
    },
  };
};
