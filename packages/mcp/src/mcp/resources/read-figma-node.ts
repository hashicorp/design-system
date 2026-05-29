/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from './response-resource.js';
import { resolveFigmaFrameNodeMatch } from '../../figma/resolve-frame-node-match.js';

import type { JsonObject } from '../../types.js';
import type { ComponentCatalogStore } from '../../catalogs/components/store.js';

export const FIGMA_NODE_URI_TEMPLATE = 'hds://figma/{fileKey}/nodes/{nodeId}';

export const getFigmaNodeUri = (fileKey: string, nodeId: string): string => {
  return `hds://figma/${encodeURIComponent(fileKey)}/nodes/${encodeURIComponent(nodeId)}`;
};

export const buildFigmaNodeResourcePayload = (
  store: ComponentCatalogStore,
  input: {
    fileKey: string;
    nodeId: string;
  }
): JsonObject => {
  const match = resolveFigmaFrameNodeMatch(store, input.fileKey, input.nodeId);

  if (match.matched === false) {
    return {
      generatedAt: store.getManifestMeta().generatedAt,
      found: false,
      fileKey: input.fileKey,
      nodeId: input.nodeId,
      message: 'No design mapping found for this fileKey/nodeId.',
      ...(match.warnings === undefined ? {} : { warnings: match.warnings }),
    };
  }

  return {
    generatedAt: store.getManifestMeta().generatedAt,
    found: true,
    fileKey: input.fileKey,
    nodeId: input.nodeId,
    component: match.component,
  };
};

export const readFigmaNodeResource = (
  store: ComponentCatalogStore,
  input: {
    fileKey: string;
    nodeId: string;
  }
) => {
  const payload = buildFigmaNodeResourcePayload(store, input);

  return toJsonResourceResponse(
    getFigmaNodeUri(input.fileKey, input.nodeId),
    payload
  );
};
