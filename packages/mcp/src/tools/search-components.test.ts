/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildSearchComponentsPayload,
  registerSearchComponentsTool,
} from './search-components.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';

type RegisteredTool = {
  name: string;
  handler: (input: {
    query: string;
    limit: number;
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

function createStore(): ComponentCatalogStore {
  const components = [
    {
      name: 'Accordion',
      slug: 'accordion',
      summary: 'Accordion summary',
    },
    {
      name: 'Button',
      slug: 'button',
      summary: 'Button summary',
    },
  ];

  return {
    catalog: {
      generatedAt: '2026-01-01T00:00:00.000Z',
      components: [],
    },
    getManifestMeta: () => ({
      generatedAt: '2026-01-01T00:00:00.000Z',
      componentCount: components.length,
    }),
    listComponents: () => components,
    getAllComponents: () => [],
    getComponentBySlug: () => null,
    getComponentContext: () => null,
    getComponentByDesignNode: () => null,
    listDesignMappings: () => [],
    getDesignCoverage: () => ({
      totalComponentCount: components.length,
      componentsWithDesignCount: 0,
      componentsMissingDesignCount: components.length,
    }),
  };
}

test('buildSearchComponentsPayload filters components by query', () => {
  const payload = buildSearchComponentsPayload(createStore(), {
    query: 'button',
    limit: 10,
  });

  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.equal(payload.query, 'button');
  assert.equal(payload.resultCount, 1);
  assert.equal((payload.results as Array<{ name: string }>)[0]?.name, 'Button');
});

test('buildSearchComponentsPayload enforces limit', () => {
  const payload = buildSearchComponentsPayload(createStore(), {
    query: 'summary',
    limit: 1,
  });

  assert.equal(payload.resultCount, 1);
});

test('registerSearchComponentsTool registers and returns payload envelope', async () => {
  const server = new FakeServer();

  registerSearchComponentsTool(
    server as unknown as Parameters<typeof registerSearchComponentsTool>[0],
    createStore()
  );

  const tool = server.registeredTools[0];
  if (tool === undefined) {
    throw new Error('Expected hds_search_components to be registered');
  }

  const response = await tool.handler({
    query: 'button',
    limit: 10,
  });
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    resultCount: number;
    results: Array<{ slug: string }>;
  };

  assert.equal(tool.name, 'hds_search_components');
  assert.equal(payload.resultCount, 1);
  assert.equal(payload.results[0]?.slug, 'button');
});
