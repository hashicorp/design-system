/**
 * Copyright HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { registerTools } from './register-tools.js';

import type { ComponentCatalogStore } from '../component-catalog.js';
import type { DocsSearchClient } from '../docs-search-client.js';

type RegisterCall = {
  name: string;
};

class FakeServer {
  calls: RegisterCall[] = [];

  registerTool(name: string): void {
    this.calls.push({ name });
  }
}

const store: ComponentCatalogStore = {
  catalog: {
    generatedAt: '2026-01-01T00:00:00.000Z',
    components: [],
  },
  getManifestMeta: () => ({
    generatedAt: '2026-01-01T00:00:00.000Z',
    componentCount: 0,
  }),
  listComponents: () => [],
  getComponentContext: () => null,
};

const docsSearchClient: DocsSearchClient = {
  available: false,
  missingEnvVars: ['ALGOLIA_APPLICATION_ID'],
  search: async () => ({
    resultCount: 0,
    results: [],
  }),
};

test('registerTools registers manifest tools and docs search tool', () => {
  const server = new FakeServer();

  registerTools(
    server as unknown as Parameters<typeof registerTools>[0],
    store,
    docsSearchClient
  );

  assert.deepEqual(
    server.calls.map((call) => call.name),
    [
      'hds_list_components',
      'hds_get_component_context',
      'hds_get_manifest_meta',
      'hds_search_docs',
    ]
  );
});
