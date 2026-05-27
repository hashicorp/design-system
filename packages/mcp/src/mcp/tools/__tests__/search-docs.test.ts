/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildSearchDocsUnavailablePayload,
  registerSearchDocsTool,
} from '../search-docs.js';

import type { DocsSearchClient } from '../../../docs-search/client.js';

type RegisteredTool = {
  name: string;
  handler: (input: {
    query: string;
    scope: 'all' | 'components';
    limit: number;
  }) => Promise<{ content: Array<{ text: string }> }>;
};

class FakeServer {
  registeredTools: RegisteredTool[] = [];

  registerTool(
    name: string,
    _config: unknown,
    handler: RegisteredTool['handler']
  ): void {
    this.registeredTools.push({
      name,
      handler,
    });
  }
}

test('buildSearchDocsUnavailablePayload returns deterministic envelope', () => {
  const payload = buildSearchDocsUnavailablePayload(
    'accessibility',
    'all',
    10,
    ['ALGOLIA_APPLICATION_ID', 'ALGOLIA_API_KEY_SEARCH']
  );

  assert.deepEqual(payload, {
    available: false,
    query: 'accessibility',
    scope: 'all',
    limit: 10,
    resultCount: 0,
    results: [],
    message:
      'Docs search is unavailable. Missing environment variables: ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY_SEARCH.',
  });
});

test('registerSearchDocsTool returns unavailable payload when client unavailable', async () => {
  const server = new FakeServer();
  const docsSearchClient: DocsSearchClient = {
    available: false,
    missingEnvVars: ['ALGOLIA_APPLICATION_ID'],
    search: async () => ({
      resultCount: 0,
      results: [],
    }),
  };

  registerSearchDocsTool(
    server as unknown as Parameters<typeof registerSearchDocsTool>[0],
    docsSearchClient
  );

  const tool = server.registeredTools[0];
  if (tool === undefined) {
    throw new Error('Expected hds_search_docs to be registered');
  }

  const response = await tool.handler({
    query: 'patterns',
    scope: 'all',
    limit: 10,
  });
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    available: boolean;
    resultCount: number;
    message: string;
  };

  assert.equal(tool.name, 'hds_search_docs');
  assert.equal(payload.available, false);
  assert.equal(payload.resultCount, 0);
  assert.equal(
    payload.message,
    'Docs search is unavailable. Missing environment variables: ALGOLIA_APPLICATION_ID.'
  );
});

test('registerSearchDocsTool returns available payload when client is available', async () => {
  const server = new FakeServer();
  const docsSearchClient: DocsSearchClient = {
    available: true,
    search: async () => ({
      resultCount: 1,
      results: [
        {
          title: 'Button',
          url: 'https://helios.hashicorp.design/components/button',
          kind: 'text',
          section: 'components',
          snippet: 'Button docs',
        },
      ],
    }),
  };

  registerSearchDocsTool(
    server as unknown as Parameters<typeof registerSearchDocsTool>[0],
    docsSearchClient
  );

  const tool = server.registeredTools[0];
  if (tool === undefined) {
    throw new Error('Expected hds_search_docs to be registered');
  }

  const response = await tool.handler({
    query: 'button',
    scope: 'components',
    limit: 10,
  });
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    available: boolean;
    resultCount: number;
    results: Array<{ title: string }>;
  };

  assert.equal(payload.available, true);
  assert.equal(payload.resultCount, 1);
  assert.equal(payload.results[0]?.title, 'Button');
});
