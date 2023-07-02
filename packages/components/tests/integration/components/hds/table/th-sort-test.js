/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/th-sort', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort id="data-test-table-th-sort">Artist</Hds::Table::ThSort>`
    );

    assert.dom('#data-test-table-th-sort').hasClass('hds-table__th-sort');
  });

  test('it has the scope attribute, and it is set to column', async function (assert) {
    await render(hbs`<Hds::Table::ThSort>Artist</Hds::Table::ThSort>`);

    assert.dom('.hds-table__th-sort').hasAttribute('scope', 'col');
  });

  test('it should render with the appropriate `@align` CSS class', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort id="data-test-table-th-sort" @align="right">Year</Hds::Table::ThSort>`
    );
    assert
      .dom('#data-test-table-th-sort')
      .hasClass('hds-table__th-sort--text-right');
  });

  test('it should add inline styles if `@width` is declared', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort id="data-test-table-th-sort" @width="10%" />`
    );
    assert
      .dom('#data-test-table-th-sort')
      .hasAttribute('style', 'width: 10%; min-width: 10%;');
  });

  test('if @sortOrder is not defined, the swap-vertical icon should be displayed', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort @sortBy='artist'>Artist</Hds::Table::ThSort>`
    );

    assert.dom('[data-test-icon="swap-vertical"]').exists();
  });

  test('if sorted, and `@sortOrder` is set, the correct icon should be displayed', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort @sortOrder='asc'>Artist</Hds::Table::ThSort>`
    );

    assert.dom('[data-test-icon="arrow-up"]').exists();

    await render(
      hbs`<Hds::Table::ThSort @sortOrder='desc'>Artist</Hds::Table::ThSort>`
    );

    assert.dom('[data-test-icon="arrow-down"]').exists();
  });
  test('if unsorted, the aria-sort attribute value should be set to none', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort @sortBy='artist' id="data-test-table-th-sort">Artist</Hds::Table::ThSort>`
    );

    assert.dom('#data-test-table-th-sort').hasAttribute('aria-sort', 'none');
  });
  test('if sorted, the aria-sort attribute value should reflect the direction', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort @sortBy='artist' @sortOrder="desc" id="data-test-table-th-sort">Artist</Hds::Table::ThSort>`
    );

    assert
      .dom('#data-test-table-th-sort')
      .hasAttribute('aria-sort', 'descending');
  });
});
