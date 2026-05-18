/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { withGeneratedAt } from './utils.js';

import type { ComponentCatalogStore } from '../component-catalog.js';

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

test('withGeneratedAt adds generatedAt envelope field', () => {
  const payload = withGeneratedAt(store, { componentCount: 12 });

  assert.deepEqual(payload, {
    generatedAt: '2026-01-01T00:00:00.000Z',
    componentCount: 12,
  });
});
