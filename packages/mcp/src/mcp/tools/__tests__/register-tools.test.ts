/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { registerTools } from '../register-tools.js';

import type { ComponentCatalogStore } from '../../../component-catalog/store.js';
import type { DocsSearchClient } from '../../../docs-search/client.js';
import type { TokenCatalogStore } from '../../../tokens/store.js';

type RegisteredCall = {
  name: string;
};

class FakeServer {
  calls: RegisteredCall[] = [];

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
  getAllComponents: () => [],
  getComponentBySlug: () => null,
  getComponentContext: () => null,
  getComponentByDesignNode: () => null,
  listDesignMappings: () => [],
  getDesignCoverage: () => ({
    totalComponentCount: 0,
    componentsWithDesignCount: 0,
    componentsMissingDesignCount: 0,
  }),
};

const docsSearchClient: DocsSearchClient = {
  available: false,
  missingEnvVars: ['ALGOLIA_APPLICATION_ID'],
  search: async () => ({
    resultCount: 0,
    results: [],
  }),
};

const tokenStore: TokenCatalogStore = {
  getMeta: () => ({
    totalTokenCount: 0,
  }),
  listTokens: () => [],
  getTokenByKey: () => null,
  searchTokens: () => [],
};

test('registerTools registers search, figma, and docs tools', () => {
  const server = new FakeServer();

  registerTools(
    server as unknown as Parameters<typeof registerTools>[0],
    store,
    docsSearchClient,
    tokenStore
  );

  assert.deepEqual(
    server.calls.map((call) => call.name),
    [
      'hds_search_components',
      'hds_resolve_figma_frame',
      'hds_search_docs',
      'hds_search_tokens',
    ]
  );
});
