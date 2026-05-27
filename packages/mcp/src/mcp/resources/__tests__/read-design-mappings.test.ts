/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildDesignMappingsResourcePayload,
  DESIGN_MAPPINGS_URI,
  readDesignMappingsResource,
} from '../read-design-mappings.js';

import type { ComponentCatalogStore } from '../../../component-catalog/store.js';

const designMappings = [
  {
    name: 'Button',
    slug: 'button',
    fileKey: 'abc123',
    nodeId: '1:1',
  },
  {
    name: 'Alert',
    slug: 'alert',
    fileKey: 'abc123',
    nodeId: '2:2',
  },
];

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
  listDesignMappings: () => designMappings,
  getDesignCoverage: () => ({
    totalComponentCount: 12,
    componentsWithDesignCount: 2,
    componentsMissingDesignCount: 10,
  }),
};

test('buildDesignMappingsResourcePayload returns mappings payload', () => {
  const payload = buildDesignMappingsResourcePayload(store);

  assert.equal(payload.generatedAt, '2026-01-01T00:00:00.000Z');
  assert.equal(payload.totalMappingCount, 2);
  assert.equal(payload.mappings[0]?.slug, 'button');
});

test('readDesignMappingsResource wraps payload in resource contents', () => {
  const response = readDesignMappingsResource(store);
  const [content] = response.contents;

  assert.ok(content);
  assert.equal(content?.uri, DESIGN_MAPPINGS_URI);
  assert.equal(content?.mimeType, 'application/json');

  const payload = JSON.parse(content?.text ?? '{}') as {
    totalMappingCount: number;
    mappings: Array<{ fileKey: string }>;
  };

  assert.equal(payload.totalMappingCount, 2);
  assert.equal(payload.mappings[1]?.fileKey, 'abc123');
});
