/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, focus } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/th', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th">Artist</Hds::Table::Th>`
    );
    assert.dom('#data-test-table-th').hasClass('hds-table__th');
  });

  // CONTENT

  test('it renders text content yielded within the cell', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th">Artist</Hds::Table::Th>`
    );
    assert.dom('#data-test-table-th').hasText('Artist');
  });

  // ALIGNMENT

  test('it should render with the appropriate `@align` CSS class', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th" @align="right">Artist</Hds::Table::Th>`
    );
    assert.dom('#data-test-table-th').hasClass('hds-table__th--align-right');
  });

  // WIDTH

  test('it should add inline styles if `@width` is declared', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th" @width="10%">Artist</Hds::Table::Th>`
    );
    assert
      .dom('#data-test-table-th')
      .hasAttribute('style', 'width: 10%; min-width: 10%;');
  });

  // ATTRIBUTES

  test('it should support splattributes', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th" lang="es">Artist</Hds::Table::Th>`
    );
    assert.dom('#data-test-table-th').hasAttribute('lang', 'es');
  });

  test('it has the scope attribute set to column by default', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th">Artist</Hds::Table::Th>`
    );
    assert.dom('#data-test-table-th').hasAttribute('scope', 'col');
  });
  test('it has the scope attribute set to row if inside a tbody', async function (assert) {
    await render(
      hbs`<Hds::Table><:body as |B|><B.Tr><B.Th id="data-test-table-th">Artist</B.Th></B.Tr></:body></Hds::Table>`
    );
    assert.dom('#data-test-table-th').hasAttribute('scope', 'row');
  });

  test('it renders the expected aria attribute for the tooltip button', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th" @tooltip="More info.">Artist</Hds::Table::Th>`
    );
    assert
      .dom('#data-test-table-th .hds-table__th-button--tooltip')
      .hasAria('label', 'more information');
  });

  // TOOLTIP

  test('if @tooltip is undefined a tooltip button toggle should not be present', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th">Artist</Hds::Table::Th>`
    );

    assert
      .dom('#data-test-table-th .hds-table__th-button--tooltip')
      .doesNotExist();
  });
  test('if @tooltip is defined a tooltip should be added to the table cell header', async function (assert) {
    await render(
      hbs`<Hds::Table::Th @tooltip="More info." id="data-test-table-th">Artist</Hds::Table::Th>`
    );

    assert.dom('#data-test-table-th .hds-table__th-button--tooltip').exists();
    // activate the tooltip:
    await focus('#data-test-table-th .hds-table__th-button--tooltip');
    // test that the tooltip exists and has the passed in content:
    assert.dom('.tippy-content').hasText('More info.');
  });
});
