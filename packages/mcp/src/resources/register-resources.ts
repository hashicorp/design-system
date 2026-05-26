/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  COMPONENT_BY_SLUG_URI_TEMPLATE,
  getComponentBySlugUri,
  readComponentBySlugResource,
} from './read-component-by-slug.js';
import { COMPONENTS_URI, readComponentsResource } from './read-components.js';
import {
  MANIFEST_META_URI,
  readManifestMetaResource,
} from './read-manifest-meta.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../component-catalog/store.js';

export const registerResources = (
  server: McpServer,
  store: ComponentCatalogStore
): void => {
  server.registerResource(
    'hds_manifest_meta',
    MANIFEST_META_URI,
    {
      title: 'HDS manifest metadata',
      description: 'Top-level manifest metadata including generatedAt and componentCount.',
      mimeType: 'application/json',
    },
    async () => {
      return readManifestMetaResource(store);
    }
  );

  server.registerResource(
    'hds_components',
    COMPONENTS_URI,
    {
      title: 'HDS component catalog index',
      description: 'Canonical list of components with name, slug, and summary.',
      mimeType: 'application/json',
    },
    async () => {
      return readComponentsResource(store);
    }
  );

  server.registerResource(
    'hds_component_by_slug',
    new ResourceTemplate(COMPONENT_BY_SLUG_URI_TEMPLATE, {
      list: async () => {
        return {
          resources: store.listComponents().map((component) => ({
            name: `HDS component: ${component.name}`,
            uri: getComponentBySlugUri(component.slug),
            mimeType: 'application/json',
          })),
        };
      },
    }),
    {
      title: 'HDS component context by slug',
      description: 'Canonical per-component context resource keyed by component slug.',
      mimeType: 'application/json',
    },
    async (_uri, variables) => {
      const slug = variables['slug'];

      if (typeof slug !== 'string') {
        return readComponentBySlugResource(store, '');
      }

      return readComponentBySlugResource(store, slug);
    }
  );
};
