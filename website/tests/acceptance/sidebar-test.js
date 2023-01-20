import { module, test } from 'qunit';
import { fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';

module('Acceptance | Sidebar filter', function (hooks) {
  setupApplicationTest(hooks);

  // FILTERING

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

  test('should show the "Checkbox" link in the sidebar (under an opened parent container) if filtering using its "page title" (case insensitive)', async function (assert) {
    await visit('/components');
    let link = this.element.querySelector(
      '.doc-page-sidebar__table-of-contents a[href="/components/form/checkbox"]'
    );
    assert.dom(link).exists();
    assert.dom('.doc-table-of-contents__folder[open]').exists({ count: 0 });
    await fillIn('.doc-page-sidebar__filter input[type="search"]', 'ChEcKbOx');
    assert.dom(link).exists();
    // notice: we can't use `.hasAttribute('open')` here because it returns always false
    assert.dom('.doc-table-of-contents__folder[open]').exists({ count: 1 });
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

  // QUERY PARAMS

  test('all "folder" containers should be closed by default if the "current route" link is not inside any of them', async function (assert) {
    await visit('/components/alert');
    assert.dom('.doc-table-of-contents__folder[open]').exists({ count: 0 });
  });

  test('the "folder" container of the "current route" link should be opened by default', async function (assert) {
    await visit('/components/form/radio-card');
    assert.dom('.doc-table-of-contents__folder[open]').exists({ count: 1 });
  });
});
