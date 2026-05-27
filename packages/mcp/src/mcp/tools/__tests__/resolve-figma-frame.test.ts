/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildResolveFigmaFramePayload,
  registerResolveFigmaFrameTool,
} from '../resolve-figma-frame.js';

import type { ComponentCatalogStore } from '../../../catalogs/components/store.js';

type RegisteredTool = {
  name: string;
  handler: (input: {
    fileKey: string;
    nodes: Array<{
      nodeId: string;
      nodeName?: string;
      nodeDescription?: string;
    }>;
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

test('buildResolveFigmaFramePayload returns mixed exact and unmatched results', () => {
  const payload = buildResolveFigmaFramePayload(store, {
    fileKey: 'file-1',
    nodes: [{ nodeId: '1:1' }, { nodeId: '2:2' }],
  });

  assert.deepEqual(payload.summary, {
    total: 2,
    matched: 1,
    unmatched: 1,
  });

  const [first, second] = payload.matches as Array<{
    matched: boolean;
  }>;

  assert.equal(first?.matched, true);
  assert.equal(second?.matched, false);
});

test('registerResolveFigmaFrameTool registers and returns payload envelope', async () => {
  const server = new FakeServer();

  registerResolveFigmaFrameTool(
    server as unknown as Parameters<typeof registerResolveFigmaFrameTool>[0],
    store
  );

  const tool = server.registeredTools[0];

  if (tool === undefined) {
    throw new Error('Expected hds_resolve_figma_frame to be registered');
  }

  const response = await tool.handler({
    fileKey: 'file-1',
    nodes: [{ nodeId: '1:1' }],
  });
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    summary?: { matched?: number };
  };

  assert.equal(tool.name, 'hds_resolve_figma_frame');
  assert.equal(payload.summary?.matched, 1);
});
