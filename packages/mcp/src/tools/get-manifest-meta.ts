/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';
import { toTextResponse } from './response-envelope.js';

export const registerGetManifestMetaTool = (
  server: McpServer,
  store: ComponentCatalogStore
): void => {
  server.registerTool(
    'hds_get_manifest_meta',
    {
      title: 'Get HDS manifest metadata',
      description:
        'Get top-level component manifest metadata including timestamp and component count.',
    },
    async () => {
      return toTextResponse(store.getManifestMeta());
    }
  );
};
