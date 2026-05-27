/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildIconByNameResourcePayload,
  getIconByNameUri,
  ICON_BY_NAME_URI_TEMPLATE,
  readIconByNameResource,
} from '../read-icon-by-name.js';

import type { IconCatalogStore } from '../../../catalogs/icons/store.js';

const icon = {
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
};

const iconStore: IconCatalogStore = {
  getMeta: () => ({
    totalIconCount: 1,
    totalAssetCount: 2,
    categories: ['Services'],
  }),
  listIcons: () => [icon],
  getIconByName: (iconName: string) => {
    if (iconName === 'apple' || iconName === 'apple-16') {
      return icon;
    }

    return null;
  },
  searchIcons: () => [icon],
};

test('buildIconByNameResourcePayload returns found payload', () => {
  const payload = buildIconByNameResourcePayload(iconStore, 'apple');

  assert.equal(payload.found, true);
  assert.equal((payload.icon as { iconName: string }).iconName, 'apple');
});

test('buildIconByNameResourcePayload returns not-found payload', () => {
  const payload = buildIconByNameResourcePayload(iconStore, 'missing-icon');

  assert.equal(payload.found, false);
  assert.equal(payload.requestedIconName, 'missing-icon');
  assert.equal(typeof payload.message, 'string');
});

test('readIconByNameResource wraps payload in resource contents', () => {
  const response = readIconByNameResource(iconStore, 'apple');
  const [content] = response.contents;

  assert.ok(content);
  assert.equal(content?.uri, getIconByNameUri('apple'));
  assert.equal(content?.mimeType, 'application/json');
});

test('icon by name resource template is stable', () => {
  assert.equal(ICON_BY_NAME_URI_TEMPLATE, 'hds://icons/{iconName}');
});
