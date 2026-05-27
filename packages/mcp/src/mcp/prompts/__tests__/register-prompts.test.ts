/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { registerPrompts } from '../register-prompts.js';

import type { ComponentCatalogStore } from '../../../component-catalog/store.js';

type RegisteredCall = {
  name: string;
};

class FakeServer {
  calls: RegisteredCall[] = [];

  registerPrompt(name: string): void {
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

test('registerPrompts registers component-usage and implement-figma-frame prompts', () => {
  const server = new FakeServer();

  registerPrompts(
    server as unknown as Parameters<typeof registerPrompts>[0],
    store
  );

  assert.deepEqual(
    server.calls.map((call) => call.name),
    ['hds_component_usage', 'hds_implement_figma_frame']
  );
});
