/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildSearchIconsPayload,
  registerSearchIconsTool,
} from '../search-icons.js';

import type { IconCatalogStore } from '../../../catalogs/icons/store.js';

type RegisteredTool = {
  name: string;
  handler: (input: {
    query: string;
    limit: number;
    category?: string;
    size?: '16' | '24';
    hasMapping?: boolean;
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

const allIcons = [
  {
    iconName: 'apple',
    description: 'apple, macos, ios',
    category: 'Services',
    sizes: ['16', '24'],
    hasMapping: true,
    variants: [
      {
        id: '707:41',
        fileName: 'apple-16',
        size: '16',
        width: 16,
        height: 16,
        mapping: 'Apple',
      },
      {
        id: '707:38',
        fileName: 'apple-24',
        size: '24',
        width: 24,
        height: 24,
        mapping: 'Apple',
      },
    ],
  },
  {
    iconName: 'loading',
    description: 'loading, spinner, animated',
    category: 'Animated',
    sizes: ['16', '24'],
    hasMapping: false,
    variants: [
      {
        id: '1368:171',
        fileName: 'loading-16',
        size: '16',
        width: 16,
        height: 16,
      },
      {
        id: '1368:168',
        fileName: 'loading-24',
        size: '24',
        width: 24,
        height: 24,
      },
    ],
  },
];

const iconStore: IconCatalogStore = {
  getMeta: () => ({
    totalIconCount: allIcons.length,
    totalAssetCount: 4,
    categories: ['Animated', 'Services'],
  }),
  listIcons: () => allIcons,
  getIconByName: () => null,
  searchIcons: ({ query, limit, category, size, hasMapping }) => {
    const normalizedQuery = query.toLowerCase();
    const normalizedCategory = category?.toLowerCase();

    return allIcons
      .filter((icon) => {
        if (
          normalizedCategory !== undefined &&
          icon.category.toLowerCase() !== normalizedCategory
        ) {
          return false;
        }

        if (size !== undefined && !icon.sizes.includes(size)) {
          return false;
        }

        if (hasMapping !== undefined && icon.hasMapping !== hasMapping) {
          return false;
        }

        return (
          icon.iconName.toLowerCase().includes(normalizedQuery) ||
          icon.description.toLowerCase().includes(normalizedQuery)
        );
      })
      .slice(0, limit);
  },
};

test('buildSearchIconsPayload filters icons by query', () => {
  const payload = buildSearchIconsPayload(iconStore, {
    query: 'apple',
    limit: 10,
  });

  assert.equal(payload.query, 'apple');
  assert.equal(payload.totalIconCount, 2);
  assert.equal(payload.resultCount, 1);
  assert.equal(payload.results[0]?.iconName, 'apple');
});

test('buildSearchIconsPayload filters by category and hasMapping', () => {
  const payload = buildSearchIconsPayload(iconStore, {
    query: 'a',
    limit: 10,
    category: 'Services',
    hasMapping: true,
  });

  assert.equal(payload.resultCount, 1);
  assert.equal(payload.results[0]?.iconName, 'apple');
});

test('registerSearchIconsTool registers and returns payload envelope', async () => {
  const server = new FakeServer();

  registerSearchIconsTool(
    server as unknown as Parameters<typeof registerSearchIconsTool>[0],
    iconStore
  );

  const tool = server.registeredTools[0];
  if (tool === undefined) {
    throw new Error('Expected hds_search_icons to be registered');
  }

  const response = await tool.handler({
    query: 'spinner',
    limit: 10,
  });
  const payload = JSON.parse(response.content[0]?.text ?? '{}') as {
    resultCount: number;
    results: Array<{ iconName: string }>;
  };

  assert.equal(tool.name, 'hds_search_icons');
  assert.equal(payload.resultCount, 1);
  assert.equal(payload.results[0]?.iconName, 'loading');
});
