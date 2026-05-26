/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  resolveFigmaFrameNodeMatch,
  UNMATCHED_NODE_WARNING,
} from './resolve-frame-node-match.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';

const component = {
  name: 'Button',
  slug: 'button',
  summary: 'Button summary',
  design: {
    figmaUrl: 'https://www.figma.com/design/example?node-id=1-1',
    fileKey: 'file-1',
    nodeId: '1:1',
  },
  api: {},
};

const store: ComponentCatalogStore = {
  catalog: {
    generatedAt: '2026-01-01T00:00:00.000Z',
    components: [component],
  },
  getManifestMeta: () => ({
    generatedAt: '2026-01-01T00:00:00.000Z',
    componentCount: 1,
  }),
  listComponents: () => [],
  getAllComponents: () => [component],
  getComponentBySlug: (slug: string) => {
    if (slug === 'button') {
      return component;
    }

    return null;
  },
  getComponentContext: () => null,
  getComponentByDesignNode: (fileKey: string, nodeId: string) => {
    if (fileKey === 'file-1' && nodeId === '1:1') {
      return component;
    }

    return null;
  },
  listDesignMappings: () => [
    {
      name: 'Button',
      slug: 'button',
      fileKey: 'file-1',
      nodeId: '1:1',
    },
  ],
  getDesignCoverage: () => ({
    totalComponentCount: 1,
    componentsWithDesignCount: 1,
    componentsMissingDesignCount: 0,
  }),
};

test('resolveFigmaFrameNodeMatch returns exact match for known node', () => {
  const match = resolveFigmaFrameNodeMatch(store, 'file-1', '1:1');

  assert.equal(match.nodeId, '1:1');
  assert.equal(match.matched, true);

  if (match.matched !== true) {
    throw new Error('Expected exact match');
  }

  assert.equal(match.component?.name, 'Button');
});

test('resolveFigmaFrameNodeMatch returns unmatched with warning for missing node', () => {
  const match = resolveFigmaFrameNodeMatch(store, 'file-1', '9:9');

  assert.equal(match.nodeId, '9:9');
  assert.equal(match.matched, false);
  if (match.matched !== false) {
    throw new Error('Expected unmatched result');
  }
  assert.deepEqual(match.warnings ?? [], [UNMATCHED_NODE_WARNING]);
});
