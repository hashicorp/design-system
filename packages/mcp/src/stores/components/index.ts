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
  normalizeComponentName,
  toComponentRecord,
  toComponentSummary,
} from "./lookup.js";
import { componentCatalogSchema } from "./schema.js";
import { searchRanked, getCommonPrefixLength } from "../shared/rank.js";

import type { RankableEntry } from "../shared/rank.js";

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
  suggestComponentNames: (componentName: string, limit: number) => string[];
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

// the four ways a caller writes a component: template invocation, bare name, imported class
// and module path
const toRankable = (component: ComponentRecord): RankableEntry => {
  return {
    identities: [
      normalizeLookupValue(component.name),
      normalizeComponentName(component.name),
      normalizeLookupValue(component.name.replaceAll("::", "")),
      normalizeLookupValue(component.modulePath),
    ],
    blob: toSearchBlob(component),
  };
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

  const searchComponents = ({ query, limit }: SearchComponentsInput) => {
    const { totalMatches, hits } = searchRanked({
      records: componentRecords,
      query,
      limit,
      toRankable,
    });

    return {
      totalMatches,
      hits: hits.map((component) => toComponentSummary(component)),
    };
  };

  /**
   * A name that resolves to nothing is usually a typo or a half-remembered nesting, not a
   * different concept, so the ranked search comes first and prefix overlap is the fallback
   * that survives a wrong tail: `Hds::Buton` still reaches `Hds::Button`.
   */
  const suggestComponentNames = (
    componentName: string,
    limit: number,
  ): string[] => {
    const { hits } = searchComponents({ query: componentName, limit });

    if (hits.length > 0) {
      return hits.map((hit) => hit.name);
    }

    const requested = normalizeComponentName(componentName);

    return componentRecords
      .map((component) => ({
        name: component.name,
        overlap: getCommonPrefixLength(
          normalizeComponentName(component.name),
          requested,
        ),
      }))
      .filter((candidate) => candidate.overlap > 0)
      .sort((left, right) =>
        right.overlap === left.overlap
          ? left.name.localeCompare(right.name)
          : right.overlap - left.overlap,
      )
      .slice(0, limit)
      .map((candidate) => candidate.name);
  };

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
    searchComponents,
    suggestComponentNames,
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
