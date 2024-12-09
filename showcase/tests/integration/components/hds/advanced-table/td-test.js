/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/advanced-table/td', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Td id='data-test-advanced-table-td' />`
    );
    assert
      .dom('#data-test-advanced-table-td')
      .hasClass('hds-advanced-table__td');
  });

  test('it should render with the appropriate role', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Td id='data-test-advanced-table-td' @align='right' />`
    );
    assert.dom('#data-test-advanced-table-td').hasAttribute('role', 'gridcell');
  });

  test('it should render with the appropriate `@align` CSS class', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Td id='data-test-advanced-table-td' @align='right' />`
    );
    assert
      .dom('#data-test-advanced-table-td')
      .hasClass('hds-advanced-table__td--align-right');
  });

  test('it should render with the appropriate span information by default', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Td id='data-test-advanced-table-td' />`
    );

    assert.dom('#data-test-advanced-table-td').hasNoAttribute('aria-rowspan');
    assert.dom('#data-test-advanced-table-td').hasNoAttribute('aria-colspan');
    assert.dom('#data-test-advanced-table-td').hasStyle({
      gridRow: 'auto',
      gridColumn: 'auto',
    });
  });

  test('it should render with the appropriate span information when pass rowspan and colspan', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Td
  id='data-test-advanced-table-td'
  @rowspan={{3}}
  @colspan={{5}}
/>`
    );

    assert
      .dom('#data-test-advanced-table-td')
      .hasAttribute('aria-rowspan', '3');

    assert
      .dom('#data-test-advanced-table-td')
      .hasAttribute('aria-colspan', '5');

    assert.dom('#data-test-advanced-table-td').hasStyle({
      gridRow: 'span 3',
      gridColumn: 'span 5',
    });
  });

  test('it should support splattributes', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Td id='data-test-advanced-table-td' lang='es' />`
    );
    assert.dom('#data-test-advanced-table-td').hasAttribute('lang', 'es');
  });
});
