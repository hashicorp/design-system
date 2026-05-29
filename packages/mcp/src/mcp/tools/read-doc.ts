/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';
import { toTextResponse } from './response-envelope.js';
import { withSafeToolHandler } from './safe-tool-handler.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { DocsCatalogStore } from '../../catalogs/docs/store.js';

const DEFAULT_MAX_SECTIONS = 3;
const DEFAULT_MAX_CHARS = 1200;
const DEFAULT_DETAIL = 'full';

export const registerReadDocTool = (
  server: McpServer,
  docsStore: DocsCatalogStore
): void => {
  server.registerTool(
    'hds_read_doc',
    {
      title: 'Read a specific Helios doc',
      description:
        'Read focused sections from a Helios doc by docId or URL, with optional section anchor targeting.',
      inputSchema: {
        docId: z.string().trim().min(1).optional(),
        url: z.string().trim().min(1).optional(),
        anchor: z.string().trim().min(1).optional(),
        detail: z.enum(['full', 'summary']).default(DEFAULT_DETAIL),
        cursor: z.string().trim().min(1).optional(),
        maxSections: z.number().int().min(1).max(10).default(DEFAULT_MAX_SECTIONS),
        maxChars: z.number().int().min(200).max(5000).default(DEFAULT_MAX_CHARS),
      },
    },
    withSafeToolHandler(
      'hds_read_doc',
      async ({ docId, url, anchor, detail, cursor, maxSections, maxChars }) => {
      const resolvedDetail = detail ?? DEFAULT_DETAIL;

      if (docId === undefined && url === undefined) {
        return toTextResponse({
          found: false,
          requested: {
            ...(anchor === undefined ? {} : { anchor }),
            detail: resolvedDetail,
            ...(cursor === undefined ? {} : { cursor }),
            maxSections,
            maxChars,
          },
          sections: [],
          message: 'One of docId or url is required.',
        });
      }

      return toTextResponse(
        docsStore.readDoc({
          ...(docId === undefined ? {} : { docId }),
          ...(url === undefined ? {} : { url }),
          ...(anchor === undefined ? {} : { anchor }),
          detail: resolvedDetail,
          ...(cursor === undefined ? {} : { cursor }),
          maxSections,
          maxChars,
        })
      );
      }
    )
  );
};
