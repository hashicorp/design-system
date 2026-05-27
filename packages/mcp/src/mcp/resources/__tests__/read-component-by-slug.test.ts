/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildComponentBySlugResourcePayload,
  COMPONENT_BY_SLUG_URI_TEMPLATE,
  getComponentBySlugUri,
  readComponentBySlugResource,
} from '../read-component-by-slug.js';

import type { ComponentCatalogStore } from '../../../catalogs/components/store.js';

const buttonComponent = {
  name: 'Button',
  slug: 'button',
  summary: 'Button summary',
  api: {},
};

const store: ComponentCatalogStore = {
  catalog: {
    generatedAt: '2026-01-01T00:00:00.000Z',
    components: [buttonComponent],
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
  getAllComponents: () => [buttonComponent],
  getComponentBySlug: (slug: string) => {
    if (slug.toLowerCase() === 'button') {
      return buttonComponent;
    }

    return null;
  },
  getComponentContext: () => null,
  getComponentByDesignNode: () => null,
  listDesignMappings: () => [],
  getDesignCoverage: () => ({
    totalComponentCount: 1,
    componentsWithDesignCount: 0,
    componentsMissingDesignCount: 1,
  }),
};

test('buildComponentBySlugResourcePayload returns found payload', () => {
  const payload = buildComponentBySlugResourcePayload(store, 'button');

  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.equal(payload.found, true);
  assert.equal((payload.component as { name: string }).name, 'Button');
});

test('buildComponentBySlugResourcePayload returns not-found payload', () => {
  const payload = buildComponentBySlugResourcePayload(store, 'missing');

  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.equal(payload.found, false);
  assert.equal(payload.slug, 'missing');
  assert.equal(typeof payload.message, 'string');
});

test('readComponentBySlugResource wraps payload in resource contents', () => {
  const response = readComponentBySlugResource(store, 'button');
  const [content] = response.contents;

  assert.ok(content);
  assert.equal(content?.uri, getComponentBySlugUri('button'));
  assert.equal(content?.mimeType, 'application/json');
});

test('component slug resource template is stable', () => {
  assert.equal(COMPONENT_BY_SLUG_URI_TEMPLATE, 'hds://components/{slug}');
});
