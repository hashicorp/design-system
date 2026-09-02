/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { normalizeLookupValue } from "../../shared/normalize.js";
import {
  DEFAULT_CATALOG_SOURCE,
  createCatalogLoader,
} from "../../shared/catalog.js";
import {
  getComponentLookupKeys,
  toComponentRecord,
  toComponentSummary,
} from "./lookup.js";
import { componentCatalogSchema } from "./schema.js";

import type { CatalogSearchOutcome } from "../types.js";
import type { CatalogSource } from "../../shared/catalog.js";
import type { ComponentRecord, ComponentSummary } from "./lookup.js";
import type { ComponentCatalog } from "./schema.js";

interface SearchComponentsInput {
  query: string;
  limit: number;
}

export interface ComponentCatalogStore {
  getMeta: () => {
    totalComponentCount: number;
    source: CatalogSource;
  };
  listComponents: () => ComponentSummary[];
  getComponentByName: (componentName: string) => ComponentRecord | null;
  searchComponents: (
    input: SearchComponentsInput,
  ) => CatalogSearchOutcome<ComponentSummary>;
}

const toSearchBlob = (component: ComponentRecord): string => {
  return [
    component.name,
    component.name.replaceAll("::", ""),
    component.modulePath,
    component.modulePath.replaceAll(/[/-]/gu, " "),
    component.docsPath ?? "",
  ]
    .join(" ")
    .toLowerCase();
};

export const parseComponentCatalog = (value: unknown): ComponentCatalog => {
  return componentCatalogSchema.parse(value);
};

export const createComponentCatalogStore = (
  catalog: ComponentCatalog,
  source: CatalogSource = DEFAULT_CATALOG_SOURCE,
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
      source,
    }),
    listComponents: () =>
      componentRecords.map((component) => toComponentSummary(component)),
    getComponentByName: (componentName: string) => {
      return componentLookup.get(normalizeLookupValue(componentName)) ?? null;
    },
    searchComponents: ({ query, limit }: SearchComponentsInput) => {
      const normalizedQuery = normalizeLookupValue(query);
      const matches = componentRecords.filter((component) =>
        toSearchBlob(component).includes(normalizedQuery),
      );

      return {
        totalMatches: matches.length,
        hits: matches
          .slice(0, limit)
          .map((component) => toComponentSummary(component)),
      };
    },
  };
};

const componentCatalogLoader = createCatalogLoader<ComponentCatalogStore>({
  specifier: "@hashicorp/design-system-components/component-catalog.json",
  anchors: ["project-root", "default"],
  create: (value, source) =>
    createComponentCatalogStore(parseComponentCatalog(value), source),
});

export const loadComponentCatalog = (): ComponentCatalogStore => {
  return componentCatalogLoader.load();
};

export const getOrLoadComponentStore = (): ComponentCatalogStore => {
  return componentCatalogLoader.getOrLoad();
};
