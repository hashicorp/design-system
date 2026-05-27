/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildIconsResourcePayload,
  ICONS_URI,
  readIconsResource,
} from '../read-icons.js';

import type { IconCatalogStore } from '../../../catalogs/icons/store.js';

const icons = [
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
];

const iconStore: IconCatalogStore = {
  getMeta: () => ({
    totalIconCount: icons.length,
    totalAssetCount: 2,
    categories: ['Services'],
  }),
  listIcons: () => icons,
  getIconByName: () => null,
  searchIcons: () => icons,
};

test('buildIconsResourcePayload returns icon index payload', () => {
  const payload = buildIconsResourcePayload(iconStore);

  assert.equal(payload.totalIconCount, 1);
  assert.equal(payload.totalAssetCount, 2);
  assert.equal(payload.categories[0], 'Services');
  assert.equal(payload.icons[0]?.iconName, 'apple');
});

test('readIconsResource wraps payload in resource contents', () => {
  const response = readIconsResource(iconStore);
  const [content] = response.contents;

  assert.ok(content);
  assert.equal(content?.uri, ICONS_URI);
  assert.equal(content?.mimeType, 'application/json');

  const payload = JSON.parse(content?.text ?? '{}') as {
    totalIconCount: number;
    icons: Array<{ iconName: string }>;
  };

  assert.equal(payload.totalIconCount, 1);
  assert.equal(payload.icons[0]?.iconName, 'apple');
});
