/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';
import { toTextResponse } from './response-envelope.js';
import { withSafeToolHandler } from './safe-tool-handler.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ShowcaseSnippetsCatalogStore } from '../../catalogs/showcase-snippets/store.js';

const DEFAULT_LIMIT_PER_COMPONENT = 3;
const MAX_LIMIT_PER_COMPONENT = 10;

export const buildExtractShowcaseSnippetsPayload = (
  store: ShowcaseSnippetsCatalogStore,
  input: {
    components: string[];
    query?: string;
    limitPerComponent: number;
    includeSource: boolean;
  }
) => {
  return store.extractSnippets({
    components: input.components,
    ...(input.query === undefined ? {} : { query: input.query }),
    limitPerComponent: input.limitPerComponent,
    includeSource: input.includeSource,
  });
};

export const registerExtractShowcaseSnippetsTool = (
  server: McpServer,
  store: ShowcaseSnippetsCatalogStore
): void => {
  server.registerTool(
    'hds_extract_showcase_snippets',
    {
      title: 'Extract showcase code snippets',
      description:
        'Extract reusable showcase component examples and helper snippets by component slug.',
      inputSchema: {
        components: z.array(z.string().trim().min(1)).min(1).max(20),
        query: z.string().trim().min(1).optional(),
        limitPerComponent: z
          .number()
          .int()
          .min(1)
          .max(MAX_LIMIT_PER_COMPONENT)
          .default(DEFAULT_LIMIT_PER_COMPONENT),
        includeSource: z.boolean().default(true),
      },
    },
    withSafeToolHandler(
      'hds_extract_showcase_snippets',
      async ({ components, query, limitPerComponent, includeSource }) => {
        return toTextResponse(
          buildExtractShowcaseSnippetsPayload(store, {
            components,
            ...(query === undefined ? {} : { query }),
            limitPerComponent,
            includeSource,
          })
        );
      }
    )
  );
};
