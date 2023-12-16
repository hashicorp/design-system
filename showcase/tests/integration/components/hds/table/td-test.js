/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/td', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Table::Td id="data-test-table-td"/>`);
    assert.dom('#data-test-table-td').hasClass('hds-table__td');
  });

  test('it should render with the appropriate `@align` CSS class', async function (assert) {
    await render(hbs`<Hds::Table::Td id="data-test-table-td" @align="right"/>`);
    assert.dom('#data-test-table-td').hasClass('hds-table__td--text-right');
  });

  test('it should support splattributes', async function (assert) {
    await render(hbs`<Hds::Table::Td id="data-test-table-td" lang="es" />`);
    assert.dom('#data-test-table-td').hasAttribute('lang', 'es');
  });
});
