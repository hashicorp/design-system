/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { fillIn, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';

module('Acceptance | Token Search', function (hooks) {
  setupApplicationTest(hooks);

  test('should update query param and content based on search', async function (assert) {
    await visit('/foundations/tokens');
    await fillIn('.doc-tokens-list-filter input[type="search"]', 'blue');

    assert.strictEqual(currentURL(), '/foundations/tokens?searchQuery=blue');

    assert.dom('.doc-tokens-list__item').exists({ count: 6 });
  });

  test('should load content based on query param', async function (assert) {
    await visit('/foundations/tokens?searchQuery=blue');

    assert.strictEqual(currentURL(), '/foundations/tokens?searchQuery=blue');

    assert.dom('.doc-tokens-list__item').exists({ count: 6 });
  });

  test('should clear search results if input is cleared', async function (assert) {
    await visit('/foundations/tokens?searchQuery=blue');

    await fillIn('.doc-tokens-list-filter input[type="search"]', '');

    assert.strictEqual(currentURL(), '/foundations/tokens');
  });

  test('should show message when no results are found', async function (assert) {
    await visit('/foundations/tokens?searchQuery=wubalubadubdub');

    assert.dom('[data-test-target="no-tokens-found"]').exists();
  });
});
