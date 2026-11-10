/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';

import humanize from 'website/helpers/humanize';

module('Unit | Helper | humanize', function () {
  test('it replaces underscores and dashes with spaces and capitalizes the first letter', function (assert) {
    assert.strictEqual(humanize('getting-started'), 'Getting started');
    assert.strictEqual(humanize('form_elements'), 'Form elements');
  });

  test('it collapses repeated separators into a single space', function (assert) {
    assert.strictEqual(humanize('foo--bar__baz'), 'Foo bar baz');
  });

  test('it lowercases everything after the first letter', function (assert) {
    assert.strictEqual(humanize('API-Reference'), 'Api reference');
  });

  test('it returns an empty string for empty, undefined and null values', function (assert) {
    assert.strictEqual(humanize(''), '');
    assert.strictEqual(humanize(undefined), '');
    assert.strictEqual(humanize(null), '');
  });
});
