/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { registerResources } from './register-resources.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';

type RegisteredCall = {
  name: string;
};

class FakeServer {
  calls: RegisteredCall[] = [];

  registerResource(name: string): void {
    this.calls.push({ name });
  }
}

const component = {
  name: 'Button',
  slug: 'button',
  summary: 'Button summary',
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
  listComponents: () => [
    {
      name: 'Button',
      slug: 'button',
      summary: 'Button summary',
    },
  ],
  getAllComponents: () => [component],
  getComponentBySlug: () => component,
  getComponentContext: () => component,
  getComponentByDesignNode: () => null,
  listDesignMappings: () => [],
  getDesignCoverage: () => ({
    totalComponentCount: 1,
    componentsWithDesignCount: 0,
    componentsMissingDesignCount: 1,
  }),
};

test('registerResources registers all catalog resources', () => {
  const server = new FakeServer();

  registerResources(
    server as unknown as Parameters<typeof registerResources>[0],
    store
  );

  assert.deepEqual(
    server.calls.map((call) => call.name),
    [
      'hds_manifest_meta',
      'hds_design_mappings',
      'hds_components',
      'hds_component_by_slug',
      'hds_figma_node',
    ]
  );
});
