/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import componentCatalogJson from "../../../catalogs/components/catalog.json" with { type: "json" };
import { componentCatalogSchema } from "../../../catalogs/components/schema.js";
import {
  getComponentLookupKeys,
  normalizeComponentName,
  toComponentSummary,
} from "./lookup.js";

import type {
  ComponentCatalog,
  ComponentCatalogComponent,
} from "../../../catalogs/components/schema.js";
import type { ComponentSummary } from "./lookup.js";

export interface ComponentCatalogStore {
  getMeta: () => {
    updatedAt: string;
    totalComponentCount: number;
  };
  listComponents: () => ComponentSummary[];
  getComponentByName: (name: string) => ComponentCatalogComponent | null;
}

export const parseComponentCatalog = (value: unknown): ComponentCatalog => {
  return componentCatalogSchema.parse(value);
};

export const createComponentCatalogStore = (
  catalog: ComponentCatalog,
): ComponentCatalogStore => {
  const componentLookup = new Map<string, ComponentCatalogComponent>();

  for (const component of catalog.components) {
    for (const key of getComponentLookupKeys(component)) {
      componentLookup.set(key, component);
    }
  }

  return {
    getMeta: () => ({
      updatedAt: catalog.updatedAt,
      totalComponentCount: catalog.components.length,
    }),
    listComponents: () => catalog.components.map(toComponentSummary),
    getComponentByName: (name: string) => {
      return componentLookup.get(normalizeComponentName(name)) ?? null;
    },
  };
};

export const loadComponentCatalog = (): ComponentCatalogStore => {
  return createComponentCatalogStore(parseComponentCatalog(componentCatalogJson));
};

let componentStore: ComponentCatalogStore | null = null;

export const getOrLoadComponentStore = (): ComponentCatalogStore => {
  if (componentStore === null) {
    componentStore = loadComponentCatalog();
  }

  return componentStore;
};
