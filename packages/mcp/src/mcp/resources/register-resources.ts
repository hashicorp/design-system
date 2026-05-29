/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  COMPONENT_BY_SLUG_URI_TEMPLATE,
  readComponentBySlugResource,
} from './read-component-by-slug.js';
import { COMPONENTS_URI, readComponentsResource } from './read-components.js';
import {
  DESIGN_MAPPINGS_URI,
  readDesignMappingsResource,
} from './read-design-mappings.js';
import {
  FIGMA_NODE_URI_TEMPLATE,
  readFigmaNodeResource,
} from './read-figma-node.js';
import {
  MANIFEST_META_URI,
  readManifestMetaResource,
} from './read-manifest-meta.js';
import {
  ICON_BY_NAME_URI_TEMPLATE,
  readIconByNameResource,
} from './read-icon-by-name.js';
import { ICONS_URI, readIconsResource } from './read-icons.js';
import {
  TOKEN_BY_KEY_URI_TEMPLATE,
  readTokenByKeyResource,
} from './read-token-by-key.js';
import { TOKENS_URI, readTokensResource } from './read-tokens.js';
import { withSafeResourceHandler } from './safe-resource-handler.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../../catalogs/components/store.js';
import type { IconCatalogStore } from '../../catalogs/icons/store.js';
import type { TokenCatalogStore } from '../../catalogs/tokens/store.js';

export const registerResources = (
  server: McpServer,
  store: ComponentCatalogStore,
  tokenStore: TokenCatalogStore,
  iconStore: IconCatalogStore
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
    withSafeResourceHandler(
      'hds_manifest_meta',
      async () => {
        return readManifestMetaResource(store);
      },
      MANIFEST_META_URI
    )
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
    withSafeResourceHandler(
      'hds_design_mappings',
      async () => {
        return readDesignMappingsResource(store);
      },
      DESIGN_MAPPINGS_URI
    )
  );

  server.registerResource(
    'hds_components',
    COMPONENTS_URI,
    {
      title: 'HDS component catalog index',
      description: 'Canonical list of components with name, slug, and summary.',
      mimeType: 'application/json',
    },
    withSafeResourceHandler(
      'hds_components',
      async () => {
        return readComponentsResource(store);
      },
      COMPONENTS_URI
    )
  );

  server.registerResource(
    'hds_tokens',
    TOKENS_URI,
    {
      title: 'HDS token catalog index',
      description: 'Canonical list of HDS tokens with summary metadata.',
      mimeType: 'application/json',
    },
    withSafeResourceHandler(
      'hds_tokens',
      async () => {
        return readTokensResource(tokenStore);
      },
      TOKENS_URI
    )
  );

  server.registerResource(
    'hds_icons',
    ICONS_URI,
    {
      title: 'HDS icon catalog index',
      description: 'Canonical list of Flight icons with summary metadata.',
      mimeType: 'application/json',
    },
    withSafeResourceHandler(
      'hds_icons',
      async () => {
        return readIconsResource(iconStore);
      },
      ICONS_URI
    )
  );

  server.registerResource(
    'hds_icon_by_name',
    new ResourceTemplate(ICON_BY_NAME_URI_TEMPLATE, { list: undefined }),
    {
      title: 'HDS icon detail by icon name',
      description:
        'Canonical icon lookup keyed by icon name, with file name alias support.',
      mimeType: 'application/json',
    },
    withSafeResourceHandler('hds_icon_by_name', async (_uri, variables) => {
      const iconName = variables['iconName'];

      if (typeof iconName !== 'string' || iconName.trim() === '') {
        throw new Error(
          'Resource variable "iconName" must be a non-empty string.'
        );
      }

      return readIconByNameResource(iconStore, iconName);
    })
  );

  server.registerResource(
    'hds_token_by_key',
    new ResourceTemplate(TOKEN_BY_KEY_URI_TEMPLATE, { list: undefined }),
    {
      title: 'HDS token detail by key',
      description: 'Canonical token lookup keyed by token key or token path.',
      mimeType: 'application/json',
    },
    withSafeResourceHandler('hds_token_by_key', async (_uri, variables) => {
      const tokenKey = variables['tokenKey'];

      if (typeof tokenKey !== 'string' || tokenKey.trim() === '') {
        throw new Error(
          'Resource variable "tokenKey" must be a non-empty string.'
        );
      }

      return readTokenByKeyResource(tokenStore, tokenKey);
    })
  );

  server.registerResource(
    'hds_component_by_slug',
    new ResourceTemplate(COMPONENT_BY_SLUG_URI_TEMPLATE, { list: undefined }),
    {
      title: 'HDS component context by slug',
      description:
        'Canonical per-component context resource keyed by component slug.',
      mimeType: 'application/json',
    },
    withSafeResourceHandler(
      'hds_component_by_slug',
      async (_uri, variables) => {
        const slug = variables['slug'];

        if (typeof slug !== 'string' || slug.trim() === '') {
          throw new Error(
            'Resource variable "slug" must be a non-empty string.'
          );
        }

        return readComponentBySlugResource(store, slug);
      }
    )
  );

  server.registerResource(
    'hds_figma_node',
    new ResourceTemplate(FIGMA_NODE_URI_TEMPLATE, { list: undefined }),
    {
      title: 'HDS component by Figma node mapping',
      description:
        'Resolve a mapped Figma fileKey/nodeId pair to an HDS component.',
      mimeType: 'application/json',
    },
    withSafeResourceHandler('hds_figma_node', async (_uri, variables) => {
      const fileKey = variables['fileKey'];
      const nodeId = variables['nodeId'];

      if (typeof fileKey !== 'string' || fileKey.trim() === '') {
        throw new Error(
          'Resource variable "fileKey" must be a non-empty string.'
        );
      }

      if (typeof nodeId !== 'string' || nodeId.trim() === '') {
        throw new Error(
          'Resource variable "nodeId" must be a non-empty string.'
        );
      }

      return readFigmaNodeResource(store, {
        fileKey,
        nodeId,
      });
    })
  );
};
