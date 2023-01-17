import { module, test } from 'qunit';
import { fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';

module('Acceptance | Sidebar filter', function (hooks) {
  setupApplicationTest(hooks);

  test('should show the "Alert" link in the sidebar', async function (assert) {
    await visit('/components');
    assert
      .dom('.doc-page-sidebar__table-of-contents a[href="/components/alert"]')
      .exists();
  });

  test('should show the "Alert" link in the sidebar if filtering using its "page title" (case insensitive)', async function (assert) {
    await visit('/components');
    await fillIn('.doc-page-sidebar__filter input[type="search"]', 'AlErT');
    assert
      .dom('.doc-page-sidebar__table-of-contents a[href="/components/alert"]')
      .exists();
  });

  test('should still show the filter input after filtering', async function (assert) {
    await visit('/components');
    await fillIn('.doc-page-sidebar__filter input[type="search"]', 'xyz');
    assert.dom('.doc-page-sidebar__filter').exists();
  });

  test('should show the "Alert" link in the sidebar if filtering using one of its "keyword" (case insensitive)', async function (assert) {
    await visit('/components');
    await fillIn('.doc-page-sidebar__filter input[type="search"]', 'MeSsAgE');
    assert
      .dom('.doc-page-sidebar__table-of-contents a[href="/components/alert"]')
      .exists();
  });

  test('should show a message when no results are found', async function (assert) {
    await visit('/components');
    await fillIn('.doc-page-sidebar__filter input[type="search"]', 'xyz');
    assert
      .dom('.doc-page-sidebar__table-of-contents a[href="/components/alert"]')
      .doesNotExist();
  });

  test('should clear search results if input is cleared', async function (assert) {
    await visit('/components');
    await fillIn('.doc-page-sidebar__filter input[type="search"]', 'xyz');
    assert
      .dom('.doc-page-sidebar__table-of-contents a[href="/components/alert"]')
      .doesNotExist();
    await fillIn('.doc-page-sidebar__filter input[type="search"]', '');
    assert
      .dom('.doc-page-sidebar__table-of-contents a[href="/components/alert"]')
      .exists();
  });
});
