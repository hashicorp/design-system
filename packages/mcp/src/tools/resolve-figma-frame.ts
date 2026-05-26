/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';
import { toTextResponse, withGeneratedAt } from './response-envelope.js';
import { resolveFigmaFrameNodeMatch } from '../figma/resolve-frame-node-match.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../component-catalog/store.js';
import type { ResolveFigmaFrameNodeMatch } from '../figma/resolve-frame-node-match.js';

export const buildResolveFigmaFramePayload = (
  store: ComponentCatalogStore,
  input: {
    fileKey: string;
    nodes: Array<{
      nodeId: string;
      nodeName?: string;
      nodeDescription?: string;
    }>;
  }
) => {
  const warnings: string[] = [];
  const designCoverage = store.getDesignCoverage();

  if (designCoverage.componentsMissingDesignCount > 0) {
    warnings.push(
      `Design metadata is incomplete: ${designCoverage.componentsMissingDesignCount} of ${designCoverage.totalComponentCount} components are missing design mapping.`
    );
  }

  const matches: ResolveFigmaFrameNodeMatch[] = input.nodes.map((node) =>
    resolveFigmaFrameNodeMatch(store, input.fileKey, node.nodeId)
  );

  const resolvedNodeCount = matches.filter((match) => match.matched).length;
  const unresolvedNodeCount = input.nodes.length - resolvedNodeCount;

  return withGeneratedAt(store, {
    query: {
      fileKey: input.fileKey,
      nodeCount: input.nodes.length,
    },
    summary: {
      total: input.nodes.length,
      matched: resolvedNodeCount,
      unmatched: unresolvedNodeCount,
    },
    matches,
    warnings,
  });
};

export const registerResolveFigmaFrameTool = (
  server: McpServer,
  store: ComponentCatalogStore
): void => {
  server.registerTool(
    'hds_resolve_figma_frame',
    {
      title: 'Resolve Figma frame nodes to HDS components',
      description:
        'Resolve multiple Figma nodes to HDS components using strict fileKey + nodeId matching.',
      inputSchema: {
        fileKey: z.string().min(1),
        nodes: z
          .array(
            z.object({
              nodeId: z.string().min(1),
              nodeName: z.string().min(1).optional(),
              nodeDescription: z.string().min(1).optional(),
            })
          )
          .min(1)
          .max(200),
      },
    },
    async ({ fileKey, nodes }) => {
      return toTextResponse(
        buildResolveFigmaFramePayload(store, {
          fileKey,
          nodes,
        })
      );
    }
  );
};
