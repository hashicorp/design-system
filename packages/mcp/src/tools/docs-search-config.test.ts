/**
 * Copyright HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { getDocsSearchConfig } from '../docs-search-config.js';

test('getDocsSearchConfig returns available when env vars are present', () => {
  const configState = getDocsSearchConfig({
    ALGOLIA_APPLICATION_ID: ' app-id ',
    ALGOLIA_API_KEY_SEARCH: ' search-key ',
    ALGOLIA_INDEX_ID: ' index-id ',
  });

  assert.equal(configState.available, true);

  if (configState.available === true) {
    assert.deepEqual(configState.config, {
      applicationId: 'app-id',
      apiKeySearch: 'search-key',
      indexId: 'index-id',
    });
  }
});

test('getDocsSearchConfig returns missing env vars for empty values', () => {
  const configState = getDocsSearchConfig({
    ALGOLIA_APPLICATION_ID: ' ',
    ALGOLIA_API_KEY_SEARCH: '',
    ALGOLIA_INDEX_ID: undefined,
  });

  assert.equal(configState.available, false);

  if (configState.available === false) {
    assert.deepEqual(configState.missingEnvVars, [
      'ALGOLIA_APPLICATION_ID',
      'ALGOLIA_API_KEY_SEARCH',
      'ALGOLIA_INDEX_ID',
    ]);
  }
});
