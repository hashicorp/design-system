/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from './response-resource.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';

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
): Record<string, unknown> => {
  const component = store.getComponentByDesignNode(input.fileKey, input.nodeId);

  if (component === null) {
    return {
      generatedAt: store.getManifestMeta().generatedAt,
      found: false,
      fileKey: input.fileKey,
      nodeId: input.nodeId,
      message: 'No design mapping found for this fileKey/nodeId.',
    };
  }

  return {
    generatedAt: store.getManifestMeta().generatedAt,
    found: true,
    fileKey: input.fileKey,
    nodeId: input.nodeId,
    component,
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
