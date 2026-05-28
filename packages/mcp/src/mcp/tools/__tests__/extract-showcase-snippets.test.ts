/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildExtractShowcaseSnippetsPayload,
  registerExtractShowcaseSnippetsTool,
} from '../extract-showcase-snippets.js';

import type { ShowcaseSnippetsCatalogStore } from '../../../catalogs/showcase-snippets/store.js';

type RegisteredTool = {
  name: string;
  handler: (input: {
    components: string[];
    query?: string;
    limitPerComponent: number;
    includeSource: boolean;
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

const showcaseStore: ShowcaseSnippetsCatalogStore = {
  getMeta: () => ({
    available: true,
    totalSnippetCount: 2,
    builtAt: '2026-01-01T00:00:00.000Z',
  }),
  extractSnippets: ({ components, query, limitPerComponent, includeSource }) => {
    return {
      query: query?.trim().toLowerCase() ?? null,
      limitPerComponent,
      includeSource,
      resultCount: components[0] === 'button' ? 1 : 0,
      results: components.map((component) => {
        if (component !== 'button') {
          return {
            component,
            resolvedSlug: null,
            snippetCount: 0,
            snippets: [],
            message: 'No showcase code fragments found for this component.',
          };
        }

        return {
          component,
          resolvedSlug: 'button',
          snippetCount: 1,
          snippets: [
            {
              id: 'button:with-loading-state.gts',
              name: 'with-loading-state',
              path: 'showcase/app/components/page-components/button/code-fragments/with-loading-state.gts',
              language: 'gts' as const,
              kind: 'example' as const,
              ...(includeSource ? { source: '<Hds::Button />' } : {}),
            },
          ],
        };
      }),
    };
  },
};

test('buildExtractShowcaseSnippetsPayload returns grouped payload', () => {
  const payload = buildExtractShowcaseSnippetsPayload(showcaseStore, {
    components: ['button', 'copy/button'],
    limitPerComponent: 3,
    includeSource: true,
  });

  assert.equal(payload.limitPerComponent, 3);
  assert.equal(payload.includeSource, true);
  assert.equal(payload.resultCount, 1);
  assert.equal(payload.results[0]?.component, 'button');
  assert.equal(payload.results[1]?.component, 'copy/button');
});

test('registerExtractShowcaseSnippetsTool registers and returns payload envelope', async () => {
  const server = new FakeServer();

  registerExtractShowcaseSnippetsTool(
    server as unknown as Parameters<typeof registerExtractShowcaseSnippetsTool>[0],
    showcaseStore
  );

  const tool = server.registeredTools[0];
  if (tool === undefined) {
    throw new Error('Expected hds_extract_showcase_snippets to be registered');
  }

  const response = await tool.handler({
    components: ['button'],
    limitPerComponent: 3,
    includeSource: false,
  });
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    includeSource: boolean;
    resultCount: number;
    results: Array<{
      snippets: Array<{ source?: string }>;
    }>;
  };

  assert.equal(tool.name, 'hds_extract_showcase_snippets');
  assert.equal(payload.includeSource, false);
  assert.equal(payload.resultCount, 1);
  assert.equal(payload.results[0]?.snippets[0]?.source, undefined);
});
