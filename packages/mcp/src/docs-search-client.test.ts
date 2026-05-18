/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  createDocsSearchClient,
  getFilterForScope,
  normalizeDocsSearchResult,
  truncateSnippet,
} from './docs-search-client.js';

test('getFilterForScope returns undefined for all scope', () => {
  assert.equal(getFilterForScope('all'), undefined);
});

test('getFilterForScope returns componentApi filter', () => {
  assert.equal(
    getFilterForScope('componentApi'),
    'pageMainCategory:components AND (type:component-api-property OR source:component-api)'
  );
});

test('normalizeDocsSearchResult maps and normalizes hit fields', () => {
  const result = normalizeDocsSearchResult({
    pageTitle: '  Button  ',
    searchResultURL: '/components/button',
    type: 'TEXT',
    pageSection: 'components',
    content: 'This is a long snippet with extra spaces.',
  });

  assert.deepEqual(result, {
    title: 'Button',
    url: 'https://helios.hashicorp.design/components/button',
    kind: 'text',
    section: 'components',
    snippet: 'This is a long snippet with extra spaces.',
  });
});

test('normalizeDocsSearchResult preserves absolute url and token fallback title', () => {
  const result = normalizeDocsSearchResult({
    'token-name': 'color.palette.blue.100',
    searchResultURL: 'https://helios.hashicorp.design/foundations/tokens',
    type: 'token',
    category: 'foundations',
    pageCaption: 'Token docs page',
  });

  assert.deepEqual(result, {
    title: 'color.palette.blue.100',
    url: 'https://helios.hashicorp.design/foundations/tokens',
    kind: 'token',
    section: 'foundations',
    snippet: 'Token docs page',
  });
});

test('truncateSnippet truncates deterministicly with ellipsis', () => {
  assert.equal(truncateSnippet('abcdef', 5), 'abcd…');
});

test('createDocsSearchClient returns unavailable client for missing env vars', () => {
  const client = createDocsSearchClient({
    available: false,
    missingEnvVars: ['ALGOLIA_APPLICATION_ID'],
  });

  assert.equal(client.available, false);
  assert.deepEqual(client.missingEnvVars, ['ALGOLIA_APPLICATION_ID']);
});
