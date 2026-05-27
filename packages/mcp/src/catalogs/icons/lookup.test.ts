/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  getIconLookupKeys,
  normalizeLookupValue,
  toIconRecord,
} from './lookup.js';

test('normalizeLookupValue trims and lowercases', () => {
  assert.equal(normalizeLookupValue(' Apple-16 '), 'apple-16');
});

test('toIconRecord groups variants and computes mapping metadata', () => {
  const record = toIconRecord([
    {
      id: '707:38',
      fileName: 'apple-24',
      iconName: 'apple',
      description: 'apple, macos, ios',
      category: 'Services',
      size: '24',
      width: 24,
      height: 24,
      mapping: 'Apple',
    },
    {
      id: '707:41',
      fileName: 'apple-16',
      iconName: 'apple',
      description: 'apple, macos, ios',
      category: 'Services',
      size: '16',
      width: 16,
      height: 16,
      mapping: 'Apple',
    },
  ]);

  assert.equal(record.iconName, 'apple');
  assert.equal(record.hasMapping, true);
  assert.deepEqual(record.sizes, ['16', '24']);
  assert.equal(record.variants[0]?.fileName, 'apple-16');
});

test('getIconLookupKeys includes iconName and variant fileNames', () => {
  const keys = getIconLookupKeys({
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
  });

  assert.deepEqual(keys, ['apple', 'apple-16', 'apple-24']);
});
