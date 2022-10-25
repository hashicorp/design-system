import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/table', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/table', async function (assert) {
    await visit('/components/table');

    assert.strictEqual(currentURL(), '/components/table');
  });
  test('the sortable table exists on the page', async function (assert) {
    await visit('/components/table');
    assert.dom('#showcase-table-sortable-all').exists();
  });

  test('it sorts the rows asc by default when the sort button is clicked on an unsorted column', async function (assert) {
    await visit('/components/table');

    assert
      .dom('#showcase-table-sortable-all td:nth-of-type(1)')
      .hasText('Nick Drake');

    await click(
      '#showcase-table-sortable-all .hds-table__th-sort:nth-of-type(1) button'
    );
    assert
      .dom('#showcase-table-sortable-all td:nth-of-type(1)')
      .hasText('Bob Dylan');
  });
});
