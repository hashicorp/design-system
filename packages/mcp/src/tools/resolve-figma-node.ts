/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';
import { toTextResponse, withGeneratedAt } from './response-envelope.js';
import {
  resolveFigmaFrameNodeMatch,
  UNMATCHED_NODE_WARNING,
} from '../figma/resolve-frame-node-match.js';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ComponentCatalogStore } from '../component-catalog/store.js';
import type { ResolveFigmaFrameNodeMatch } from '../figma/resolve-frame-node-match.js';

export const buildResolveFigmaNodePayload = (
  store: ComponentCatalogStore,
  input: {
    fileKey: string;
    nodeId: string;
    nodeName?: string;
    nodeDescription?: string;
  }
) => {
  const warnings: string[] = [];
  const designCoverage = store.getDesignCoverage();

  if (designCoverage.componentsMissingDesignCount > 0) {
    warnings.push(
      `Design metadata is incomplete: ${designCoverage.componentsMissingDesignCount} of ${designCoverage.totalComponentCount} components are missing design mapping.`
    );
  }

  const match: ResolveFigmaFrameNodeMatch = resolveFigmaFrameNodeMatch(
    store,
    input.fileKey,
    input.nodeId
  );

  if (match.matched === false) {
    warnings.push(UNMATCHED_NODE_WARNING);
  }

  return withGeneratedAt(store, {
    query: {
      fileKey: input.fileKey,
      nodeId: input.nodeId,
      ...(input.nodeName !== undefined ? { nodeName: input.nodeName } : {}),
      ...(input.nodeDescription !== undefined
        ? { nodeDescription: input.nodeDescription }
        : {}),
    },
    match,
    warnings,
  });
};

export const registerResolveFigmaNodeTool = (
  server: McpServer,
  store: ComponentCatalogStore
): void => {
  server.registerTool(
    'hds_resolve_figma_node',
    {
      title: 'Resolve Figma node to HDS component',
      description:
        'Resolve a Figma node to an HDS component using strict fileKey + nodeId matching.',
      inputSchema: {
        fileKey: z.string().min(1),
        nodeId: z.string().min(1),
        nodeName: z.string().min(1).optional(),
        nodeDescription: z.string().min(1).optional(),
      },
    },
    async ({ fileKey, nodeId, nodeName, nodeDescription }) => {
      return toTextResponse(
        buildResolveFigmaNodePayload(store, {
          fileKey,
          nodeId,
          nodeName,
          nodeDescription,
        })
      );
    }
  );
};
