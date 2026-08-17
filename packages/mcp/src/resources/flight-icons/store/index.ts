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

import type { IconRecord, IconSummary } from "./lookup.js";
import type { IconCatalog } from "./schema.js";

interface SearchIconsInput {
  query: string;
  limit: number;
  category?: string;
  size?: string;
  hasMapping?: boolean;
}

export interface IconCatalogStore {
  getMeta: () => {
    totalIconCount: number;
    totalAssetCount: number;
    categories: string[];
  };
  listIcons: () => IconSummary[];
  getIconByName: (nameOrFileName: string) => IconRecord | null;
  searchIcons: (input: SearchIconsInput) => IconSummary[];
}

const require = createRequire(import.meta.url);

const getIconCatalogPath = (): string => {
  return require.resolve("@hashicorp/flight-icons/catalog.json");
};

const toIconSummary = (icon: IconRecord): IconSummary => {
  return {
    iconName: icon.iconName,
    description: icon.description,
    category: icon.category,
    sizes: icon.sizes,
    hasMapping: icon.hasMapping,
  };
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

export const parseIconCatalog = (value: unknown): IconCatalog => {
  return iconCatalogSchema.parse(value);
};

export const createIconCatalogStore = (
  catalog: IconCatalog,
): IconCatalogStore => {
  const assetsByIconName = new Map<string, IconCatalog["assets"]>();

  for (const asset of catalog.assets) {
    const normalizedName = normalizeLookupValue(asset.iconName);
    const existingAssets = assetsByIconName.get(normalizedName) ?? [];

    assetsByIconName.set(normalizedName, [...existingAssets, asset]);
  }

  const iconRecords = [...assetsByIconName.values()].map((assets) =>
    toIconRecord(assets),
  );
  const iconLookup = new Map<string, IconRecord>();

  for (const icon of iconRecords) {
    for (const key of getIconLookupKeys(icon)) {
      iconLookup.set(key, icon);
    }
  }

  const categories = [...new Set(iconRecords.map((icon) => icon.category))]
    .sort((left, right) => left.localeCompare(right));

  return {
    getMeta: () => ({
      totalIconCount: iconRecords.length,
      totalAssetCount: catalog.assets.length,
      categories,
    }),
    listIcons: () => iconRecords.map((icon) => toIconSummary(icon)),
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

      return iconRecords
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
        .slice(0, limit)
        .map((icon) => toIconSummary(icon));
    },
  };
};

export const loadIconCatalog = (): IconCatalogStore => {
  const iconCatalogPath = getIconCatalogPath();
  const rawCatalog = readFileSync(iconCatalogPath, "utf8");
  const parsedCatalog = JSON.parse(rawCatalog) as unknown;

  return createIconCatalogStore(parseIconCatalog(parsedCatalog));
};

let iconStore: IconCatalogStore | null = null;

export const getOrLoadIconStore = (): IconCatalogStore => {
  if (iconStore === null) {
    iconStore = loadIconCatalog();
  }

  return iconStore;
};
