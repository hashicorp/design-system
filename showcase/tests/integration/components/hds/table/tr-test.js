/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, setupOnerror } from '@ember/test-helpers';
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

  // SELECTABLE

  const checkboxSelector =
    '#data-test-table-tr > .hds-table__th--is-selectable input.hds-table__checkbox';

  test('it should render a checkbox if `@isSelectable` is `true`', async function (assert) {
    await render(
      hbs`<Hds::Table::Tr id="data-test-table-tr" @isSelectable={{true}} />`
    );
    assert.dom(checkboxSelector).exists();
  });

  test('the checkbox should be checked if `@isSelected` is `true`', async function (assert) {
    await render(
      hbs`<Hds::Table::Tr id="data-test-table-tr" @isSelectable={{true}} @isSelected={{true}} />`
    );
    assert.dom(checkboxSelector).isChecked();
  });

  test('the checkbox contains the `@selectionAriaLabelSuffix` suffix', async function (assert) {
    await render(
      hbs`<Hds::Table::Tr id="data-test-table-tr" @isSelectable={{true}} @selectionAriaLabelSuffix="row 123" />`
    );
    assert.dom(checkboxSelector).hasAria('label', 'Select row 123');
    await render(
      hbs`<Hds::Table::Tr id="data-test-table-tr" @isSelectable={{true}} @isSelected={{true}} @selectionAriaLabelSuffix="row 123" />`
    );
    assert.dom(checkboxSelector).hasAria('label', 'Deselect row 123');
  });

  test('the `th` element has the correct `scope` attribute value provided via `@selectionScope`', async function (assert) {
    await render(
      hbs`<Hds::Table::Tr id="data-test-table-tr" @isSelectable={{true}} @selectionScope="test-selectionscope" />`
    );
    assert
      .dom('#data-test-table-tr > .hds-table__th--is-selectable')
      .hasAttribute('scope', 'test-selectionscope');
  });

  test('it should invoke the `onSelectionChange` callback when the checkbox is selected', async function (assert) {
    let key;
    this.set(
      'onSelectionChange',
      (_checkbox, selectionKey) => (key = selectionKey)
    );
    await render(
      hbs`<Hds::Table::Tr id="data-test-table-tr" @isSelectable={{true}} @selectionScope="row" @selectionKey="row123" @onSelectionChange={{this.onSelectionChange}} />`
    );
    await click(checkboxSelector);
    assert.strictEqual(key, 'row123');
  });

  test('it should render a sort button in the checkbox cell if `@onClickSortBySelected` is provided and `@isSelectable` is `true`', async function (assert) {
    this.set('noop', () => {});

    await render(
      hbs`<Hds::Table::Tr id="data-test-table-tr" @isSelectable={{true}} @onClickSortBySelected={{this.noop}} />`
    );

    assert.dom(checkboxSelector + ' ~ .hds-table__th-button--sort').exists();
  });

  test('it should not render a sort button in the checkbox cell if `@isSelectable` is `true`, and `@onClickSortBySelected` is undefined', async function (assert) {
    await render(
      hbs`<Hds::Table::Tr id="data-test-table-tr" @isSelectable={{true}} />`
    );

    assert
      .dom(checkboxSelector + ' + .hds-table__th-button--sort')
      .doesNotExist();
  });

  // ATTRIBUTES

  test('it should support splattributes', async function (assert) {
    await render(hbs`<Hds::Table::Tr id="data-test-table-tr" lang="es" />`);
    assert.dom('#data-test-table-tr').hasAttribute('lang', 'es');
  });

  // ASSERTIONS

  test('it should throw an error if @selectionKey is not defined when @isSelectable is `true` and @selectionScope is `row`', async function (assert) {
    const errorMessage =
      '@selectionKey must be defined on Table::Tr or B.Tr when @isSelectable is true';
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
