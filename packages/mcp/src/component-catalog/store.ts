/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { getLookupKeys, normalizeComponentName } from './lookup.js';
import { componentCatalogSchema } from './schema.js';

import type { ComponentCatalog, ComponentCatalogComponent } from './schema.js';

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
