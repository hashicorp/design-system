/**
 * Copyright HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { buildListComponentsPayload } from './list-components.js';

import type { ComponentCatalogStore } from '../component-catalog.js';

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
    getComponentContext: () => null,
  };
}

test('buildListComponentsPayload returns full list when query missing', () => {
  const payload = buildListComponentsPayload(createStore());

  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.equal(payload.query, null);
  assert.equal(payload.totalComponentCount, 2);
  assert.equal(payload.componentCount, 2);
  assert.equal(Array.isArray(payload.components), true);
});

test('buildListComponentsPayload filters by query', () => {
  const payload = buildListComponentsPayload(createStore(), 'button');

  assert.equal(payload.query, 'button');
  assert.equal(payload.componentCount, 1);
  const firstComponent = (payload.components as Array<{ name: string }>)[0];
  assert.equal(firstComponent?.name, 'Button');
});
