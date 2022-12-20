import { module, test } from 'qunit';
import { fillIn, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';

module('Acceptance | Icon Search', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting a icons page and interacting with search by default', async function (assert) {
    await visit('/foundations/icons');
    await fillIn('.doc-icons-list-filter input[type="search"]', 'loading');

    assert.strictEqual(
      currentURL(),
      '/foundations/icons?searchQuery=loading&selectedIconSize=24'
    );

    assert.dom('.doc-icons-list-grid-item').exists({ count: 1 });
  });

  test('visiting a icons page with a query param', async function (assert) {
    await visit('/foundations/icons?searchQuery=loading&selectedIconSize=16');

    assert.strictEqual(
      currentURL(),
      '/foundations/icons?searchQuery=loading&selectedIconSize=16'
    );

    assert.dom('.doc-icons-list-grid-item').exists({ count: 1 });
  });

  test('visiting a icons page with a query param and clearing the search results', async function (assert) {
    await visit('/foundations/icons?searchQuery=loading&selectedIconSize=16');

    await fillIn('.doc-icons-list-filter input[type="search"]', '');

    // naive way of seeing if all the results come back
    assert.dom('[data-test-icon="activity"]').exists();
  });

  test('visiting icons page with no results', async function (assert) {
    await visit('/foundations/icons?searchQuery=wubalubadubdub');

    assert.dom('.doc-icons-list-grid__not-found').exists();
    assert.dom('[data-test-icon="activity"]').doesNotExist();
  });
});
