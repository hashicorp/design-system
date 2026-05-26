/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { getLookupKeys, normalizeComponentName } from './lookup.js';
import { componentCatalogSchema } from './schema.js';

import type { ComponentCatalog, ComponentCatalogComponent } from './schema.js';

export type ComponentDesignMapping = {
  name: string;
  slug: string;
  fileKey: string;
  nodeId: string;
};

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
  getAllComponents: () => ComponentCatalog['components'];
  getComponentBySlug: (slug: string) => ComponentCatalogComponent | null;
  getComponentContext: (nameOrSlug: string) => ComponentCatalogComponent | null;
  getComponentByDesignNode: (
    fileKey: string,
    nodeId: string
  ) => ComponentCatalogComponent | null;
  listDesignMappings: () => ComponentDesignMapping[];
  getDesignCoverage: () => {
    totalComponentCount: number;
    componentsWithDesignCount: number;
    componentsMissingDesignCount: number;
  };
};

export const loadComponentCatalog = (): ComponentCatalogStore => {
  const manifestPath = getManifestPath();
  const rawManifest = readFileSync(manifestPath, 'utf8');
  const parsedManifest = JSON.parse(rawManifest) as unknown;
  const catalog = componentCatalogSchema.parse(parsedManifest);

  const componentLookup = new Map<string, ComponentCatalogComponent>();
  const componentBySlugLookup = new Map<string, ComponentCatalogComponent>();
  const designNodeLookup = new Map<string, ComponentCatalogComponent>();

  for (const component of catalog.components) {
    for (const key of getLookupKeys(component)) {
      componentLookup.set(key, component);
    }

    componentBySlugLookup.set(normalizeComponentName(component.slug), component);

    if (
      component.design !== undefined &&
      component.design.fileKey !== undefined &&
      component.design.nodeId !== undefined
    ) {
      designNodeLookup.set(
        `${component.design.fileKey}:${component.design.nodeId}`,
        component
      );
    }
  }

  const componentsWithDesignCount = catalog.components.filter(
    (component) => component.design !== undefined
  ).length;

  const designMappings: ComponentDesignMapping[] = catalog.components.flatMap(
    (component) => {
      if (
        component.design === undefined ||
        component.design.fileKey === undefined ||
        component.design.nodeId === undefined
      ) {
        return [];
      }

      return [
        {
          name: component.name,
          slug: component.slug,
          fileKey: component.design.fileKey,
          nodeId: component.design.nodeId,
        },
      ];
    }
  );

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
    getAllComponents: () => {
      return catalog.components;
    },
    getComponentBySlug: (slug: string) => {
      const normalizedSlug = normalizeComponentName(slug);

      return componentBySlugLookup.get(normalizedSlug) ?? null;
    },
    getComponentContext: (nameOrSlug: string) => {
      const normalizedInput = normalizeComponentName(nameOrSlug);

      return componentLookup.get(normalizedInput) ?? null;
    },
    getComponentByDesignNode: (fileKey: string, nodeId: string) => {
      return designNodeLookup.get(`${fileKey.trim()}:${nodeId.trim()}`) ?? null;
    },
    listDesignMappings: () => {
      return designMappings;
    },
    getDesignCoverage: () => {
      return {
        totalComponentCount: catalog.components.length,
        componentsWithDesignCount,
        componentsMissingDesignCount:
          catalog.components.length - componentsWithDesignCount,
      };
    },
  };
};
