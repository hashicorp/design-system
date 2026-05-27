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
  DESIGN_MAPPINGS_URI,
  readDesignMappingsResource,
} from './read-design-mappings.js';
import {
  FIGMA_NODE_URI_TEMPLATE,
  getFigmaNodeUri,
  readFigmaNodeResource,
} from './read-figma-node.js';
import {
  MANIFEST_META_URI,
  readManifestMetaResource,
} from './read-manifest-meta.js';
import {
  TOKEN_BY_KEY_URI_TEMPLATE,
  getTokenByKeyUri,
  readTokenByKeyResource,
} from './read-token-by-key.js';
import { TOKENS_URI, readTokensResource } from './read-tokens.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../../component-catalog/store.js';
import type { TokenCatalogStore } from '../../tokens/store.js';

export const registerResources = (
  server: McpServer,
  store: ComponentCatalogStore,
  tokenStore: TokenCatalogStore
): void => {
  server.registerResource(
    'hds_manifest_meta',
    MANIFEST_META_URI,
    {
      title: 'HDS manifest metadata',
      description:
        'Top-level manifest metadata including generatedAt and componentCount.',
      mimeType: 'application/json',
    },
    async () => {
      return readManifestMetaResource(store);
    }
  );

  server.registerResource(
    'hds_design_mappings',
    DESIGN_MAPPINGS_URI,
    {
      title: 'HDS design mappings',
      description:
        'Canonical mapping table from Figma fileKey/nodeId pairs to HDS components.',
      mimeType: 'application/json',
    },
    async () => {
      return readDesignMappingsResource(store);
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
    'hds_tokens',
    TOKENS_URI,
    {
      title: 'HDS token catalog index',
      description: 'Canonical list of HDS tokens with summary metadata.',
      mimeType: 'application/json',
    },
    async () => {
      return readTokensResource(tokenStore);
    }
  );

  server.registerResource(
    'hds_token_by_key',
    new ResourceTemplate(TOKEN_BY_KEY_URI_TEMPLATE, {
      list: async () => {
        return {
          resources: tokenStore.listTokens().map((token) => ({
            name: `HDS token: ${token.key}`,
            uri: getTokenByKeyUri(token.key),
            mimeType: 'application/json',
          })),
        };
      },
    }),
    {
      title: 'HDS token detail by key',
      description: 'Canonical token lookup keyed by token key or token path.',
      mimeType: 'application/json',
    },
    async (_uri, variables) => {
      const tokenKey = variables['tokenKey'];

      return readTokenByKeyResource(
        tokenStore,
        typeof tokenKey === 'string' ? tokenKey : ''
      );
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
      description:
        'Canonical per-component context resource keyed by component slug.',
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

  server.registerResource(
    'hds_figma_node',
    new ResourceTemplate(FIGMA_NODE_URI_TEMPLATE, {
      list: async () => {
        return {
          resources: store.listDesignMappings().map((mapping) => ({
            name: `HDS mapped node: ${mapping.name}`,
            uri: getFigmaNodeUri(mapping.fileKey, mapping.nodeId),
            mimeType: 'application/json',
          })),
        };
      },
    }),
    {
      title: 'HDS component by Figma node mapping',
      description:
        'Resolve a mapped Figma fileKey/nodeId pair to an HDS component.',
      mimeType: 'application/json',
    },
    async (_uri, variables) => {
      const fileKey = variables['fileKey'];
      const nodeId = variables['nodeId'];

      return readFigmaNodeResource(store, {
        fileKey: typeof fileKey === 'string' ? fileKey : '',
        nodeId: typeof nodeId === 'string' ? nodeId : '',
      });
    }
  );
};
