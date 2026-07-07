/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export interface IconVariant {
  id: string;
  fileName: string;
  size: string;
  width: number;
  height: number;
  mapping?: string;
}

export interface IconRecord {
  iconName: string;
  description: string;
  category: string;
  sizes: string[];
  hasMapping: boolean;
  variants: IconVariant[];
}

export interface SearchIconsInput {
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
  listIcons: () => IconRecord[];
  getIconByName: (nameOrFileName: string) => IconRecord | null;
  searchIcons: (input: SearchIconsInput) => IconRecord[];
}
