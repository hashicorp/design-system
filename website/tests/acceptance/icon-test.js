import { module, test } from 'qunit';
import { fillIn, visit, currentURL } from '@ember/test-helpers';
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

    assert.dom('.doc-icons-list-grid-item').exists({ count: 1 });
  });

  test('should load content based on query param', async function (assert) {
    await visit('/icons/library?searchQuery=loading&selectedIconSize=16');

    assert.strictEqual(
      currentURL(),
      '/icons/library?searchQuery=loading&selectedIconSize=16'
    );

    assert.dom('.doc-icons-list-grid-item').exists({ count: 1 });
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

    assert.dom('.doc-icons-list-grid__not-found').exists();
    assert.dom('[data-test-icon="activity"]').doesNotExist();
  });
});
