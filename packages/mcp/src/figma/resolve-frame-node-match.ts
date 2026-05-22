/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ComponentCatalogComponent } from '../component-catalog/schema.js';
import type { ComponentCatalogStore } from '../component-catalog/store.js';

export const UNMATCHED_NODE_WARNING =
  'No design mapping found for this fileKey/nodeId.';

export type ResolveFigmaFrameNodeMatch = {
  nodeId: string;
  matched: boolean;
  component?: ComponentCatalogComponent;
  warnings?: [string];
};

export const resolveFigmaFrameNodeMatch = (
  store: ComponentCatalogStore,
  fileKey: string,
  nodeId: string
): ResolveFigmaFrameNodeMatch => {
  const component = store.getComponentByDesignNode(fileKey, nodeId);

  if (component !== null) {
    return {
      nodeId,
      matched: true,
      component,
    };
  }

  return {
    nodeId,
    matched: false,
    warnings: [UNMATCHED_NODE_WARNING],
  };
};
