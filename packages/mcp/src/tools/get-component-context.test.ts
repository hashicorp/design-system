/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { buildGetComponentContextPayload } from './get-component-context.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';

function createStore(): ComponentCatalogStore {
  const component = {
    name: 'Button',
    slug: 'button',
    summary: 'Button summary',
    api: {},
  };

  return {
    catalog: {
      generatedAt: '2026-01-01T00:00:00.000Z',
      components: [component],
    },
    getManifestMeta: () => ({
      generatedAt: '2026-01-01T00:00:00.000Z',
      componentCount: 1,
    }),
    listComponents: () => [],
    getComponentContext: (nameOrSlug: string) => {
      if (nameOrSlug === 'button') {
        return component;
      }

      return null;
    },
    getComponentByDesignNode: () => null,
    getDesignCoverage: () => ({
      totalComponentCount: 1,
      componentsWithDesignCount: 0,
      componentsMissingDesignCount: 1,
    }),
  };
}

test('buildGetComponentContextPayload returns found payload', () => {
  const payload = buildGetComponentContextPayload(createStore(), 'button');

  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.equal(payload.found, true);
  assert.equal(payload.query, 'button');
  assert.equal((payload.component as { name: string }).name, 'Button');
});

test('buildGetComponentContextPayload returns not-found payload', () => {
  const payload = buildGetComponentContextPayload(createStore(), 'missing');

  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.equal(payload.found, false);
  assert.equal(payload.query, 'missing');
  assert.equal(typeof payload.message, 'string');
});
