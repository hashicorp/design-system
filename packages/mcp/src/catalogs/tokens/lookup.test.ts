/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  getTokenLookupKeys,
  normalizeTokenLookupKey,
  toCssVarName,
  toTokenType,
} from './lookup.js';

test('normalizeTokenLookupKey trims braces and lowercases', () => {
  assert.equal(
    normalizeTokenLookupKey('{Color.Foreground.Action}'),
    'color.foreground.action'
  );
  assert.equal(
    normalizeTokenLookupKey(' token-color-foreground-action '),
    'token-color-foreground-action'
  );
});

test('toTokenType maps unknown types to other', () => {
  assert.equal(toTokenType('color'), 'color');
  assert.equal(toTokenType('unknown'), 'other');
  assert.equal(toTokenType(undefined), 'other');
});

test('getTokenLookupKeys includes key, path, and name', () => {
  const keys = getTokenLookupKeys({
    key: '{color.foreground.action}',
    $type: 'color',
    $value: '#1060ff',
    name: 'token-color-foreground-action',
    path: ['color', 'foreground', 'action'],
  });

  assert.deepEqual(keys, [
    'color.foreground.action',
    'color.foreground.action',
    'token-color-foreground-action',
  ]);
  assert.equal(
    toCssVarName('token-color-foreground-action'),
    '--token-color-foreground-action'
  );
});
