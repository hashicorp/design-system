/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ComponentCatalogComponent } from '../catalogs/components/schema.js';
import type { ComponentCatalogStore } from '../catalogs/components/store.js';

export const UNMATCHED_NODE_WARNING =
  'No design mapping found for this fileKey/nodeId.';

export const FIGMA_NODE_ID_FORMAT_HINT =
  'Node ID formats often use ":" separators; dash-delimited IDs are normalized automatically.';

export type ResolveFigmaFrameNodeMatch = {
  nodeId: string;
  matched: boolean;
  component?: ComponentCatalogComponent;
  warnings?: string[];
};

const normalizeNodeIdToCanonical = (value: string): string => {
  const trimmed = value.trim();

  if (trimmed === '') {
    return '';
  }

  if (trimmed.includes(':')) {
    return trimmed;
  }

  const dashedPattern = /^(\d+)-(\d+)$/u;
  const dashedMatch = dashedPattern.exec(trimmed);

  if (dashedMatch === null) {
    return trimmed;
  }

  return `${dashedMatch[1]}:${dashedMatch[2]}`;
};

const toNodeIdLookupCandidates = (value: string): string[] => {
  const trimmed = value.trim();
  const normalized = normalizeNodeIdToCanonical(trimmed);

  return Array.from(new Set([trimmed, normalized])).filter((entry) => entry !== '');
};

const findSuggestedNodeId = (
  store: ComponentCatalogStore,
  fileKey: string,
  normalizedNodeId: string
): string | null => {
  const mappings = store.listDesignMappings();

  for (const mapping of mappings) {
    if (mapping.fileKey !== fileKey) {
      continue;
    }

    if (normalizeNodeIdToCanonical(mapping.nodeId) === normalizedNodeId) {
      return mapping.nodeId;
    }
  }

  return null;
};

export const resolveFigmaFrameNodeMatch = (
  store: ComponentCatalogStore,
  fileKey: string,
  nodeId: string
): ResolveFigmaFrameNodeMatch => {
  const candidates = toNodeIdLookupCandidates(nodeId);

  for (const candidate of candidates) {
    const component = store.getComponentByDesignNode(fileKey, candidate);

    if (component !== null) {
      return {
        nodeId,
        matched: true,
        component,
      };
    }
  }

  const normalizedNodeId = normalizeNodeIdToCanonical(nodeId);
  const suggestedNodeId = findSuggestedNodeId(store, fileKey, normalizedNodeId);
  const warnings = [UNMATCHED_NODE_WARNING, FIGMA_NODE_ID_FORMAT_HINT];

  if (suggestedNodeId !== null && suggestedNodeId !== nodeId) {
    warnings.push(`Did you mean nodeId "${suggestedNodeId}"?`);
  }

  return {
    nodeId,
    matched: false,
    warnings,
  };
};
