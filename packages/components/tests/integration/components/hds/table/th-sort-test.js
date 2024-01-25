/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, focus } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/th-sort', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort id="data-test-table-th-sort">Artist</Hds::Table::ThSort>`
    );

    assert.dom('#data-test-table-th-sort').hasClass('hds-table__th--sort');
    assert.dom('#data-test-table-th-sort .hds-table__th-button--sort').exists();
  });

  // CONTENT

  test('it renders text content yielded within the cell', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort id="data-test-table-th-sort">Artist</Hds::Table::ThSort>`
    );
    assert.dom('#data-test-table-th-sort').hasText('Artist');
  });

  // ALIGNMENT

  test('it should render with the appropriate `@align` CSS class', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort id="data-test-table-th-sort" @align="right">Year</Hds::Table::ThSort>`
    );
    assert
      .dom('#data-test-table-th-sort')
      .hasClass('hds-table__th--align-right');
  });

  // WIDTH

  test('it should add inline styles if `@width` is declared', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort id="data-test-table-th-sort" @width="10%" />`
    );
    assert
      .dom('#data-test-table-th-sort')
      .hasAttribute('style', 'width: 10%; min-width: 10%;');
  });

  // SORT ICON

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

  // ATTRIBUTES

  test('it should support splattributes', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort id="data-test-table-th" lang="es">Artist</Hds::Table::ThSort>`
    );
    assert.dom('#data-test-table-th').hasAttribute('lang', 'es');
  });

  test('it has the `scope` attribute, and it is set to column by default', async function (assert) {
    await render(hbs`<Hds::Table::ThSort>Artist</Hds::Table::ThSort>`);

    assert.dom('.hds-table__th--sort').hasAttribute('scope', 'col');
  });
  test('the default `scope` attribute can not be overwritten', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort scope="row">Artist</Hds::Table::ThSort>`
    );

    assert.dom('.hds-table__th--sort').hasAttribute('scope', 'col');
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

  test('it renders the expected aria attributes for the sorting and tooltip buttons', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort id="data-test-table-th-sort" @tooltip="More info.">Artist</Hds::Table::ThSort>`
    );
    assert
      .dom('#data-test-table-th-sort .hds-table__th-button--tooltip')
      .hasAria('label', 'more information');
    assert
      .dom('#data-test-table-th-sort .hds-table__th-button--sort')
      .hasAria('label', 'sort');
  });

  // ONCLICK

  test('it should call the `@onClick` function if provided', async function (assert) {
    let isClicked = false;
    this.set('onClick', () => (isClicked = true));
    await render(
      hbs`<Hds::Table::ThSort id="data-test-table-th-sort" @onClick={{this.onClick}}>Artist</Hds::Table::ThSort>`
    );
    await click('#data-test-table-th-sort .hds-table__th-button--sort');
    assert.ok(isClicked);
  });

  // TOOLTIP

  test('if @tooltip is undefined a tooltip button toggle should not be present', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort id="data-test-table-th-sort">Artist</Hds::Table::ThSort>`
    );

    assert
      .dom('#data-test-table-th-sort .hds-table__th-button--tooltip')
      .doesNotExist();
  });
  test('if @tooltip is defined a tooltip should be added to the table cell header', async function (assert) {
    await render(
      hbs`<Hds::Table::ThSort @tooltip="More info." id="data-test-table-th-sort">Artist</Hds::Table::ThSort>`
    );

    assert
      .dom('#data-test-table-th-sort .hds-table__th-button--tooltip')
      .exists();
    // activate the tooltip:
    await focus('#data-test-table-th-sort .hds-table__th-button--tooltip');
    // test that the tooltip exists and has the passed in content:
    assert.dom('.tippy-content').hasText('More info.');
  });
});
