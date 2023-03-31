/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/tr', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Table::Tr id="data-test-table-tr"/>`);
    assert.dom('#data-test-table-tr').hasClass('hds-table__tr');
  });

  test('it should support splattributes', async function (assert) {
    await render(hbs`<Hds::Table::Tr id="data-test-table-tr" lang="es" />`);
    assert.dom('#data-test-table-tr').hasAttribute('lang', 'es');
  });
});
