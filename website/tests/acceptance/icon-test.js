/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, fillIn, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';

module('Acceptance | Icon Search', function (hooks) {
  setupApplicationTest(hooks);

  test('should update query param and content based on search', async function (assert) {
    await visit('/icons/library');
    await fillIn('.doc-icons-list-filter input[type="search"]', 'loading');

    assert.strictEqual(
      currentURL(),
      '/icons/library?searchQuery=loading&selectedIconSize=24'
    );

    assert.dom('.doc-icons-list-grid-item').exists({ count: 2 });
  });

  test('should load content based on query param', async function (assert) {
    await visit('/icons/library?searchQuery=cpu&selectedIconSize=16');

    assert.strictEqual(
      currentURL(),
      '/icons/library?searchQuery=cpu&selectedIconSize=16'
    );

    assert.dom('.doc-icons-list-grid-item').exists({ count: 1 });
    assert.dom('.flight-icon-cpu').exists({ count: 1 });
    assert.dom('.doc-copy-button__visible-value').hasText('cpu');
  });

  test('should load content based on category in query param, with case-insensitive results', async function (assert) {
    await visit('/icons/library?searchQuery=AniMaTed&selectedIconSize=24');

    assert.strictEqual(
      currentURL(),
      '/icons/library?searchQuery=AniMaTed&selectedIconSize=24'
    );

    assert.dom('.doc-icons-list-grid-item').exists({ count: 4 });
    assert.dom('.doc-text-h4').hasText('Animated');
  });

  test('should load a specific icon based on query param', async function (assert) {
    await visit(
      '/icons/library?searchQuery=icon%3Ayoutube&selectedIconSize=24'
    );

    assert.strictEqual(
      currentURL(),
      '/icons/library?searchQuery=icon%3Ayoutube&selectedIconSize=24'
    );

    assert.dom('.doc-icons-list-grid-item').exists({ count: 1 });
    assert.dom('.flight-icon-youtube').exists({ count: 1 });
    assert.dom('.doc-copy-button__visible-value ').hasText('youtube');
  });

  test('should clear search results if input is cleared', async function (assert) {
    await visit('/icons/library?searchQuery=loading&selectedIconSize=16');

    await fillIn('.doc-icons-list-filter input[type="search"]', '');

    // naive way of seeing if all the results come back
    assert.dom('[data-test-icon="activity"]').exists();
    assert.strictEqual(currentURL(), '/icons/library?selectedIconSize=16');
  });

  test('should show message when no results are found', async function (assert) {
    await visit('/icons/library?searchQuery=wubalubadubdub');

    assert.dom('.doc-icons-list-filter__not-found').exists();
    assert.dom('[data-test-icon="activity"]').doesNotExist();
  });

  test('should show message when no results are found for a specific icon', async function (assert) {
    await visit('/icons/library?searchQuery=icon%3awubalubadubdub');

    assert.dom('.doc-icons-list-filter__not-found').exists();
    assert.dom('[data-test-icon="activity"]').doesNotExist();
  });

  test('should show single icon when permalink is clicked', async function (assert) {
    await visit('/icons/library');
    await click('[data-test="icon-permalink-loading"]');

    assert.strictEqual(
      currentURL(),
      '/icons/library?searchQuery=icon%3Aloading&selectedIconSize=24'
    );
    assert
      .dom('.doc-icons-list-filter input[type="search"]')
      .hasValue('icon:loading');
    assert.dom('.doc-icons-list-grid-item').exists({ count: 1 });
    assert.dom('.flight-icon-loading').exists({ count: 1 });
    assert.dom('.doc-copy-button__visible-value ').hasText('loading');
  });
});
