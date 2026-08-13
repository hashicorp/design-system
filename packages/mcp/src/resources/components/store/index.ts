/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import {
  getComponentLookupKeys,
  normalizeComponentName,
  normalizeLookupValue,
  toComponentRecord,
  toComponentSummary,
} from "./lookup.js";
import { componentCatalogSchema } from "./schema.js";

import type { ComponentRecord, ComponentSummary } from "./lookup.js";
import type { ComponentCatalog } from "./schema.js";

export interface ComponentCatalogStore {
  getMeta: () => {
    totalComponentCount: number;
  };
  listComponents: () => ComponentSummary[];
  getComponentByName: (componentName: string) => ComponentRecord | null;
}

const require = createRequire(import.meta.url);

const getComponentCatalogPath = (): string => {
  return require.resolve("@hashicorp/design-system-components/component-catalog.json");
};

export const parseComponentCatalog = (value: unknown): ComponentCatalog => {
  return componentCatalogSchema.parse(value);
};

export const createComponentCatalogStore = (
  catalog: ComponentCatalog,
): ComponentCatalogStore => {
  const componentRecords = catalog.components.map((entry) =>
    toComponentRecord(entry, catalog.valueSets ?? {}),
  );
  const componentLookup = new Map<string, ComponentRecord>();

  for (const [index, entry] of catalog.components.entries()) {
    const component = componentRecords[index];

    if (component === undefined) {
      continue;
    } else {
      for (const key of getComponentLookupKeys(entry)) {
        if (!componentLookup.has(key)) {
          componentLookup.set(key, component);
        }
      }
    }
  }

  return {
    getMeta: () => ({
      totalComponentCount: componentRecords.length,
    }),
    listComponents: () =>
      componentRecords.map((component) => toComponentSummary(component)),
    getComponentByName: (componentName: string) => {
      return componentLookup.get(normalizeLookupValue(componentName)) ?? null;
    },
  };
};

export const loadComponentCatalog = (): ComponentCatalogStore => {
  const componentCatalogPath = getComponentCatalogPath();
  const rawCatalog = readFileSync(componentCatalogPath, "utf8");
  const parsedCatalog = JSON.parse(rawCatalog) as unknown;

  return createComponentCatalogStore(parseComponentCatalog(parsedCatalog));
};

let componentStore: ComponentCatalogStore | null = null;

export const getOrLoadComponentStore = (): ComponentCatalogStore => {
  if (componentStore === null) {
    componentStore = loadComponentCatalog();
  }

  return componentStore;
};
