/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { registerGetManifestMetaTool } from './get-manifest-meta.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';

type RegisteredTool = {
  name: string;
  handler: () => Promise<{ content: Array<{ text: string }> }>;
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

const store: ComponentCatalogStore = {
  catalog: {
    generatedAt: '2026-01-01T00:00:00.000Z',
    components: [],
  },
  getManifestMeta: () => ({
    generatedAt: '2026-01-01T00:00:00.000Z',
    componentCount: 12,
  }),
  listComponents: () => [],
  getComponentContext: () => null,
};

test('registerGetManifestMetaTool returns manifest metadata', async () => {
  const server = new FakeServer();

  registerGetManifestMetaTool(
    server as unknown as Parameters<typeof registerGetManifestMetaTool>[0],
    store
  );

  const tool = server.registeredTools[0];
  if (tool === undefined) {
    throw new Error('Expected hds_get_manifest_meta to be registered');
  }

  const response = await tool.handler();
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    generatedAt: string;
    componentCount: number;
  };

  assert.equal(tool.name, 'hds_get_manifest_meta');
  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.equal(payload.componentCount, 12);
});
