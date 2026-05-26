/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { toJsonResourceResponse } from './response-resource.js';

test('toJsonResourceResponse wraps payload in json resource content', () => {
  const response = toJsonResourceResponse('hds://manifest/meta', {
    generatedAt: '2026-01-01T00:00:00.000Z',
  });

  assert.deepEqual(response, {
    contents: [
      {
        uri: 'hds://manifest/meta',
        mimeType: 'application/json',
        text: JSON.stringify(
          {
            generatedAt: '2026-01-01T00:00:00.000Z',
          },
          null,
          2
        ),
      },
    ],
  });
});
