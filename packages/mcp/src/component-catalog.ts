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

const normalizeName = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/^hds[-:\s]*/u, '');
};

const require = createRequire(import.meta.url);

const getManifestPath = (): string => {
  return require.resolve(
    '@hashicorp/design-system-components/manifest/components.json'
  );
};

const getLookupKeys = (component: ComponentCatalogComponent): string[] => {
  return [normalizeName(component.name), normalizeName(component.slug)];
};

export type ComponentCatalogStore = {
  catalog: ComponentCatalog;
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
    listComponents: () => {
      return catalog.components.map(({ name, slug, summary }) => ({
        name,
        slug,
        summary,
      }));
    },
    getComponentContext: (nameOrSlug: string) => {
      const normalizedInput = normalizeName(nameOrSlug);
      return componentLookup.get(normalizedInput) ?? null;
    },
  };
};
