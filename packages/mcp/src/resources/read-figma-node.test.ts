/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildFigmaNodeResourcePayload,
  FIGMA_NODE_URI_TEMPLATE,
  getFigmaNodeUri,
  readFigmaNodeResource,
} from './read-figma-node.js';

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
  getComponentBySlug: () => component,
  getComponentContext: () => component,
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

test('buildFigmaNodeResourcePayload returns found payload', () => {
  const payload = buildFigmaNodeResourcePayload(store, {
    fileKey: 'file-1',
    nodeId: '1:1',
  });

  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.equal(payload.found, true);
  assert.equal((payload.component as { name: string }).name, 'Button');
});

test('buildFigmaNodeResourcePayload returns not-found payload', () => {
  const payload = buildFigmaNodeResourcePayload(store, {
    fileKey: 'file-1',
    nodeId: '9:9',
  });

  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.equal(payload.found, false);
  assert.equal(payload.fileKey, 'file-1');
  assert.equal(payload.nodeId, '9:9');
  assert.equal(typeof payload.message, 'string');
});

test('readFigmaNodeResource wraps payload in resource contents', () => {
  const response = readFigmaNodeResource(store, {
    fileKey: 'file-1',
    nodeId: '1:1',
  });
  const [content] = response.contents;

  assert.ok(content);
  assert.equal(content?.uri, getFigmaNodeUri('file-1', '1:1'));
  assert.equal(content?.mimeType, 'application/json');
});

test('figma node resource template is stable', () => {
  assert.equal(FIGMA_NODE_URI_TEMPLATE, 'hds://figma/{fileKey}/nodes/{nodeId}');
});
