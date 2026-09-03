/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { normalizeLookupValue } from "../../shared/normalize.js";
import {
  DEFAULT_CATALOG_SOURCE,
  createCatalogLoader,
} from "../../shared/catalog.js";
import { getIconLookupKeys, toIconRecord } from "./lookup.js";
import { iconCatalogSchema } from "./schema.js";

import type { CatalogSource } from "../../shared/catalog.js";
import type { CatalogSearchOutcome } from "../types.js";
import type { IconRecord, IconSummary } from "./lookup.js";
import type { IconCatalog } from "./schema.js";

interface SearchIconsInput {
  query: string;
  limit: number;
  category?: string;
  hasMapping?: boolean;
}

export interface IconAlias {
  iconName: string;
  fileNames: string[];
}

export interface IconCatalogStore {
  getMeta: () => {
    totalIconCount: number;
    totalAssetCount: number;
    // the filterable field, so a caller can be told which values actually exist
    categories: string[];
    source: CatalogSource;
  };
  listIcons: () => IconSummary[];
  listIconAliases: () => IconAlias[];
  getIconByName: (nameOrFileName: string) => IconRecord | null;
  searchIcons: (input: SearchIconsInput) => CatalogSearchOutcome<IconSummary>;
}

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
  source: CatalogSource = DEFAULT_CATALOG_SOURCE,
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

  const categories = [
    ...new Set(iconRecords.map((icon) => icon.category)),
  ].sort((left, right) => left.localeCompare(right));

  return {
    getMeta: () => ({
      totalIconCount: iconRecords.length,
      totalAssetCount: catalog.assets.length,
      categories,
      source,
    }),
    listIcons: () => iconRecords.map((icon) => toIconSummary(icon)),
    listIconAliases: () =>
      iconRecords.map((icon) => ({
        iconName: icon.iconName,
        fileNames: icon.variants.map((variant) => variant.fileName),
      })),
    getIconByName: (nameOrFileName: string) => {
      return iconLookup.get(normalizeLookupValue(nameOrFileName)) ?? null;
    },
    searchIcons: ({ query, limit, category, hasMapping }: SearchIconsInput) => {
      const normalizedQuery = normalizeLookupValue(query);
      const normalizedCategory =
        category === undefined ? null : normalizeLookupValue(category);

      const matches = iconRecords.filter((icon) => {
        if (
          normalizedCategory !== null &&
          normalizeLookupValue(icon.category) !== normalizedCategory
        ) {
          return false;
        }

        if (hasMapping !== undefined && icon.hasMapping !== hasMapping) {
          return false;
        }

        return toSearchBlob(icon).includes(normalizedQuery);
      });

      return {
        totalMatches: matches.length,
        hits: matches.slice(0, limit).map((icon) => toIconSummary(icon)),
      };
    },
  };
};

const iconCatalogLoader = createCatalogLoader<IconCatalogStore>({
  specifier: "@hashicorp/flight-icons/catalog.json",
  // icons reach most consumers through the components package they installed
  anchors: ["project-root", "components", "default"],
  create: (value, source) =>
    createIconCatalogStore(parseIconCatalog(value), source),
});

export const loadIconCatalog = (): IconCatalogStore => {
  return iconCatalogLoader.load();
};

export const getOrLoadIconStore = (): IconCatalogStore => {
  return iconCatalogLoader.getOrLoad();
};
