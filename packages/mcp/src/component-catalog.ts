/**
 * Copyright HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

import {
  componentCatalogSchema,
  type ComponentCatalog,
  type ComponentCatalogComponent,
} from './component-catalog-schema.js';
import {
  getLookupKeys,
  normalizeComponentName,
} from './component-catalog-utils.js';

const require = createRequire(import.meta.url);

const getManifestPath = (): string => {
  return require.resolve(
    '@hashicorp/design-system-components/manifest/components.json'
  );
};

export type ComponentCatalogStore = {
  catalog: ComponentCatalog;
  getManifestMeta: () => {
    generatedAt: string | null;
    componentCount: number;
  };
  listComponents: () => Array<{
    name: string;
    slug: string;
    summary: string;
  }>;
  getComponentContext: (nameOrSlug: string) => ComponentCatalogComponent | null;
};

export const loadComponentCatalog = (): ComponentCatalogStore => {
  const manifestPath = getManifestPath();
  const rawManifest = readFileSync(manifestPath, 'utf8');
  const parsedManifest = JSON.parse(rawManifest) as unknown;
  const catalog = componentCatalogSchema.parse(parsedManifest);

  const componentLookup = new Map<string, ComponentCatalogComponent>();

  for (const component of catalog.components) {
    for (const key of getLookupKeys(component)) {
      componentLookup.set(key, component);
    }
  }

  return {
    catalog,
    getManifestMeta: () => {
      return {
        generatedAt: catalog.generatedAt ?? null,
        componentCount: catalog.components.length,
      };
    },
    listComponents: () => {
      return catalog.components.map(({ name, slug, summary }) => ({
        name,
        slug,
        summary,
      }));
    },
    getComponentContext: (nameOrSlug: string) => {
      const normalizedInput = normalizeComponentName(nameOrSlug);
      return componentLookup.get(normalizedInput) ?? null;
    },
  };
};
