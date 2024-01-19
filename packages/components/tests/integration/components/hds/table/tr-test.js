/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/table/tr', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Table::Tr id="data-test-table-tr"/>`);
    assert.dom('#data-test-table-tr').hasClass('hds-table__tr');
  });

  // CONTENT

  test('it should render the yielded content', async function (assert) {
    await render(
      hbs`<Hds::Table::Tr id="data-test-table-tr"><td></td></Hds::Table::Tr>`
    );
    assert.dom('#data-test-table-tr > td').exists();
  });

  // ATTRIBUTES

  test('it should support splattributes', async function (assert) {
    await render(hbs`<Hds::Table::Tr id="data-test-table-tr" lang="es" />`);
    assert.dom('#data-test-table-tr').hasAttribute('lang', 'es');
  });

  // ASSERTIONS

  test('it should throw an error if @selectionKey is not defined when @isSelectable is true', async function (assert) {
    const errorMessage =
      '@selectionKey must be defined on Table::Tr when @isSelectable is true';
    assert.expect(1);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, errorMessage);
    });
    await render(
      hbs`<Hds::Table::Tr @isSelectable={{true}} @selectionScope="row" />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
