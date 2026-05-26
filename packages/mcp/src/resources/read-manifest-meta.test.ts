/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildManifestMetaResourcePayload,
  MANIFEST_META_URI,
  readManifestMetaResource,
} from './read-manifest-meta.js';

import type { ComponentCatalogStore } from '../component-catalog/store.js';

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
  getAllComponents: () => [],
  getComponentBySlug: () => null,
  getComponentContext: () => null,
  getComponentByDesignNode: () => null,
  getDesignCoverage: () => ({
    totalComponentCount: 12,
    componentsWithDesignCount: 0,
    componentsMissingDesignCount: 12,
  }),
};

test('buildManifestMetaResourcePayload returns manifest metadata', () => {
  const payload = buildManifestMetaResourcePayload(store);

  assert.deepEqual(payload, {
    generatedAt: '2026-01-01T00:00:00.000Z',
    componentCount: 12,
  });
});

test('readManifestMetaResource wraps payload in resource contents', () => {
  const response = readManifestMetaResource(store);
  const [content] = response.contents;

  assert.ok(content);
  assert.equal(content?.uri, MANIFEST_META_URI);
  assert.equal(content?.mimeType, 'application/json');

  const payload = JSON.parse(content?.text ?? '{}') as {
    generatedAt: string;
    componentCount: number;
  };

  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.equal(payload.componentCount, 12);
});
