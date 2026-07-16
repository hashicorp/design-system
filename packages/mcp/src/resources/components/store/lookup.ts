/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ComponentCatalogComponent } from "../../../catalogs/components/schema.js";

export interface ComponentSummary {
  name: string;
  description: string;
}

export const normalizeComponentName = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/^hds[-:\s]*/u, "");
};

export const getComponentLookupKeys = (
  component: ComponentCatalogComponent,
): string[] => {
  return [normalizeComponentName(component.name)];
};

export const toComponentSummary = (
  component: ComponentCatalogComponent,
): ComponentSummary => {
  return {
    name: component.name,
    description: component.description,
  };
};
