/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { registerTools } from '../register-tools.js';

import type { ComponentCatalogStore } from '../../../catalogs/components/store.js';
import type { DocsCatalogStore } from '../../../catalogs/docs/store.js';
import type { IconCatalogStore } from '../../../catalogs/icons/store.js';
import type { TokenCatalogStore } from '../../../catalogs/tokens/store.js';

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

const docsStore: DocsCatalogStore = {
  getMeta: () => ({
    totalRecordCount: 0,
    sources: {
      docs: 0,
    },
    builtAt: null,
    available: false,
    message: 'Docs catalog unavailable: website docs folder has no records.',
  }),
  search: () => ({
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

const iconStore: IconCatalogStore = {
  getMeta: () => ({
    totalIconCount: 0,
    totalAssetCount: 0,
    categories: [],
  }),
  listIcons: () => [],
  getIconByName: () => null,
  searchIcons: () => [],
};

test('registerTools registers search, figma, and docs tools', () => {
  const server = new FakeServer();

  registerTools(
    server as unknown as Parameters<typeof registerTools>[0],
    store,
    docsStore,
    tokenStore,
    iconStore
  );

  assert.deepEqual(
    server.calls.map((call) => call.name),
    [
      'hds_search_components',
      'hds_resolve_figma_frame',
      'hds_search_docs',
      'hds_search_tokens',
      'hds_search_icons',
    ]
  );
});
