/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { toTextResponse, withGeneratedAt } from './utils.js';

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

test('toTextResponse wraps the payload in MCP text content envelope', () => {
  const response = toTextResponse({ hello: 'world' });

  assert.deepEqual(response, {
    content: [
      {
        type: 'text',
        text: JSON.stringify({ hello: 'world' }, null, 2),
      },
    ],
  });
});

test('toTextResponse pretty-prints JSON with two-space indentation', () => {
  const response = toTextResponse({ nested: { value: 1 }, list: [1, 2] });
  const [entry] = response.content;

  assert.ok(entry);
  assert.equal(
    entry?.text,
    '{\n  "nested": {\n    "value": 1\n  },\n  "list": [\n    1,\n    2\n  ]\n}'
  );
});

test('toTextResponse handles an empty payload', () => {
  const response = toTextResponse({});

  assert.equal(response.content.length, 1);
  assert.equal(response.content[0]?.type, 'text');
  assert.equal(response.content[0]?.text, '{}');
});
