/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildComponentsResourcePayload,
  COMPONENTS_URI,
  readComponentsResource,
} from './read-components.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';

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

const store: ComponentCatalogStore = {
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
  getDesignCoverage: () => ({
    totalComponentCount: components.length,
    componentsWithDesignCount: 0,
    componentsMissingDesignCount: components.length,
  }),
};

test('buildComponentsResourcePayload returns component index payload', () => {
  const payload = buildComponentsResourcePayload(store);

  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.equal(payload.totalComponentCount, 2);
  assert.equal(payload.components.length, 2);
  assert.equal(payload.components[0]?.name, 'Accordion');
});

test('readComponentsResource wraps payload in resource contents', () => {
  const response = readComponentsResource(store);
  const [content] = response.contents;

  assert.ok(content);
  assert.equal(content?.uri, COMPONENTS_URI);
  assert.equal(content?.mimeType, 'application/json');

  const payload = JSON.parse(content?.text ?? '{}') as {
    totalComponentCount: number;
    components: Array<{ slug: string }>;
  };

  assert.equal(payload.totalComponentCount, 2);
  assert.equal(payload.components[1]?.slug, 'button');
});
