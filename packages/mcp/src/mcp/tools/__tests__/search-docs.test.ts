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

import type { DocsCatalogStore } from '../../../catalogs/docs/store.js';

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
    'Docs catalog unavailable: website docs folder has no records.'
  );

  assert.deepEqual(payload, {
    available: false,
    query: 'accessibility',
    scope: 'all',
    limit: 10,
    resultCount: 0,
    results: [],
    message: 'Docs catalog unavailable: website docs folder has no records.',
  });
});

test('registerSearchDocsTool returns unavailable payload when store unavailable', async () => {
  const server = new FakeServer();
  const docsStore: DocsCatalogStore = {
    getMeta: () => ({
      totalRecordCount: 0,
      sources: {
        docs: 0,
      },
      builtAt: null,
      available: false,
      message: 'Docs catalog unavailable: website docs failed to load (unknown error).',
    }),
    search: () => ({
      resultCount: 0,
      results: [],
    }),
    readDoc: ({ maxSections, maxChars }) => ({
      found: false,
      requested: {
        detail: 'full',
        maxSections,
        maxChars,
      },
      sections: [],
      message: 'Requested doc was not found in the docs catalog.',
    }),
  };

  registerSearchDocsTool(
    server as unknown as Parameters<typeof registerSearchDocsTool>[0],
    docsStore
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
    'Docs catalog unavailable: website docs failed to load (unknown error).'
  );
});

test('registerSearchDocsTool returns unavailable payload with fallback when message missing', async () => {
  const server = new FakeServer();
  const docsStore: DocsCatalogStore = {
    getMeta: () => ({
      totalRecordCount: 0,
      sources: {
        docs: 0,
      },
      builtAt: null,
      available: false,
    }),
    search: () => ({
      resultCount: 0,
      results: [],
    }),
    readDoc: ({ maxSections, maxChars }) => ({
      found: false,
      requested: {
        detail: 'full',
        maxSections,
        maxChars,
      },
      sections: [],
      message: 'Requested doc was not found in the docs catalog.',
    }),
  };

  registerSearchDocsTool(
    server as unknown as Parameters<typeof registerSearchDocsTool>[0],
    docsStore
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
    message: string;
  };

  assert.equal(payload.message, 'Docs search is unavailable.');
});

test('registerSearchDocsTool returns available payload when store is available', async () => {
  const server = new FakeServer();
  const docsStore: DocsCatalogStore = {
    getMeta: () => ({
      totalRecordCount: 1,
      sources: {
        docs: 1,
      },
      builtAt: '2026-01-01T00:00:00.000Z',
      available: true,
    }),
    search: () => ({
      resultCount: 1,
      results: [
        {
          title: 'Button',
          url: 'https://helios.hashicorp.design/components/button',
          kind: 'text',
          section: 'components',
          snippet: 'Button docs',
          docId: 'components/button',
          anchor: 'usage',
          score: 12.34,
          rankBucket: 'prefix',
        },
      ],
    }),
    readDoc: ({ maxSections, maxChars }) => ({
      found: false,
      requested: {
        detail: 'full',
        maxSections,
        maxChars,
      },
      sections: [],
      message: 'Requested doc was not found in the docs catalog.',
    }),
  };

  registerSearchDocsTool(
    server as unknown as Parameters<typeof registerSearchDocsTool>[0],
    docsStore
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
    results: Array<{ title: string; docId?: string; rankBucket?: string }>;
  };

  assert.equal(payload.available, true);
  assert.equal(payload.resultCount, 1);
  assert.equal(payload.results[0]?.title, 'Button');
  assert.equal(payload.results[0]?.docId, 'components/button');
  assert.equal(payload.results[0]?.rankBucket, 'prefix');
});
