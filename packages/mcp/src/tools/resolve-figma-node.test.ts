/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildResolveFigmaNodePayload,
  registerResolveFigmaNodeTool,
} from './resolve-figma-node.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';

type RegisteredTool = {
  name: string;
  handler: (input: {
    fileKey: string;
    nodeId: string;
    nodeName?: string;
    nodeDescription?: string;
  }) => Promise<{ content: Array<{ text: string }> }>;
};

class FakeServer {
  registeredTools: RegisteredTool[] = [];

  registerTool(
    name: string,
    _config: unknown,
    handler: RegisteredTool['handler']
  ): void {
    this.registeredTools.push({
      name,
      handler,
    });
  }
}

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
  getComponentContext: () => null,
  getComponentByDesignNode: (fileKey: string, nodeId: string) => {
    if (fileKey === 'file-1' && nodeId === '1:1') {
      return component;
    }

    return null;
  },
  getDesignCoverage: () => ({
    totalComponentCount: 1,
    componentsWithDesignCount: 1,
    componentsMissingDesignCount: 0,
  }),
};

test('buildResolveFigmaNodePayload returns exact match when mapping exists', () => {
  const payload = buildResolveFigmaNodePayload(store, {
    fileKey: 'file-1',
    nodeId: '1:1',
  });

  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.deepEqual(payload.warnings, []);
  assert.deepEqual(payload.match, {
    nodeId: '1:1',
    matched: true,
    component,
  });
});

test('buildResolveFigmaNodePayload returns unmatched warning for exact matching', () => {
  const payload = buildResolveFigmaNodePayload(store, {
    fileKey: 'file-1',
    nodeId: '9:9',
  }) as {
    match: { nodeId: string; matched: boolean };
    warnings: string[];
  };

  assert.equal(payload.match.nodeId, '9:9');
  assert.equal(payload.match.matched, false);
  assert.equal(payload.warnings.length, 1);
});

test('registerResolveFigmaNodeTool registers and returns payload envelope', async () => {
  const server = new FakeServer();

  registerResolveFigmaNodeTool(
    server as unknown as Parameters<typeof registerResolveFigmaNodeTool>[0],
    store
  );

  const tool = server.registeredTools[0];
  if (tool === undefined) {
    throw new Error('Expected hds_resolve_figma_node to be registered');
  }

  const response = await tool.handler({
    fileKey: 'file-1',
    nodeId: '1:1',
  });
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    match?: { matched?: boolean };
  };

  assert.equal(tool.name, 'hds_resolve_figma_node');
  assert.equal(payload.match?.matched, true);
});
