import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/table', function (hooks) {
  setupApplicationTest(hooks);

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

  test('it renders the empty caption by default', async function (assert) {
    await visit('/components/table');

    assert
      .dom('#showcase-table-sortable-all td:nth-of-type(1)')
      .hasText('Nick Drake');

    assert.dom('#showcase-table-sortable-all caption').hasText('');
  });

  test('it updates the caption correctly after a sort has been performed', async function (assert) {
    await visit('/components/table');

    assert
      .dom('#showcase-table-sortable-all td:nth-of-type(1)')
      .hasText('Nick Drake');

    assert.dom('#showcase-table-sortable-all caption').hasText('');

    await click(
      '#showcase-table-sortable-all .hds-table__th-sort:nth-of-type(1) button'
    );
    assert
      .dom('#showcase-table-sortable-all td:nth-of-type(1)')
      .hasText('Bob Dylan');
    assert
      .dom('#showcase-table-sortable-all caption')
      .hasText('Sorted by artist ascending');
  });

  test('it updates the `aria-sort` attribute value when a sort is performed', async function (assert) {
    await visit('/components/table');

    await click(
      '#showcase-table-sortable-all .hds-table__th-sort:nth-of-type(1) button'
    );
    assert
      .dom('#showcase-table-sortable-all .hds-table__th-sort:nth-of-type(1)')
      .hasAttribute('aria-sort', 'ascending');
    await click(
      '#showcase-table-sortable-all .hds-table__th-sort:nth-of-type(1) button'
    );
    assert
      .dom('#showcase-table-sortable-all .hds-table__th-sort:nth-of-type(1)')
      .hasAttribute('aria-sort', 'descending');
  });
});
