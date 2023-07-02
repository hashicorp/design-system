/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/th', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th">Artist</Hds::Table::Th>`
    );
    assert.dom('#data-test-table-th').hasClass('hds-table__th');
  });

  test('it has the scope attribute set to column by default', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th">artist</Hds::Table::Th>`
    );
    assert.dom('#data-test-table-th').hasAttribute('scope', 'col');
  });

  test('it has the scope attribute set to row if inside a tbody', async function (assert) {
    await render(
      hbs`<Hds::Table><:body as |B|><B.Tr><B.Th id="data-test-table-th">artist</B.Th></B.Tr></:body></Hds::Table>`
    );
    assert.dom('#data-test-table-th').hasAttribute('scope', 'row');
  });

  test('it should render with the appropriate `@align` CSS class', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th" @align="right">Artist</Hds::Table::Th>`
    );
    assert.dom('#data-test-table-th').hasClass('hds-table__th--text-right');
  });

  test('it should add inline styles if `@width` is declared', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th" @width="10%">Artist</Hds::Table::Th>`
    );
    assert
      .dom('#data-test-table-th')
      .hasAttribute('style', 'width: 10%; min-width: 10%;');
  });

  test('it should support splattributes', async function (assert) {
    await render(
      hbs`<Hds::Table::Th id="data-test-table-th" lang="es">Artist</Hds::Table::Th>`
    );
    assert.dom('#data-test-table-th').hasAttribute('lang', 'es');
  });
});
