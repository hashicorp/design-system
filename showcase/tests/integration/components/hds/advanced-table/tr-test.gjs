/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click, setupOnerror } from '@ember/test-helpers';
import Tr from "@hashicorp/design-system-components/components/hds/advanced-table/tr";

module('Integration | Component | hds/advanced-table/tr', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><Tr id="data-test-advanced-table-tr" /></template>,
    );

    assert
      .dom('#data-test-advanced-table-tr')
      .hasClass('hds-advanced-table__tr');
  });

  test('it should render with the appropriate role', async function (assert) {
    await render(
      <template><Tr id="data-test-advanced-table-tr" /></template>,
    );
    assert.dom('#data-test-advanced-table-tr').hasAttribute('role', 'row');
  });

  // CONTENT

  test('it should render the yielded content', async function (assert) {
    await render(
      <template><Tr id="data-test-advanced-table-tr"><td></td></Tr></template>,
    );
    assert.dom('#data-test-advanced-table-tr > td').exists();
  });

  // SELECTABLE

  const checkboxSelector =
    '#data-test-advanced-table-tr > .hds-advanced-table__th--is-selectable input.hds-advanced-table__checkbox';

  test('it should not render a checkbox if `@isSelectable` is not set', async function (assert) {
    await render(
      <template><Tr id="data-test-advanced-table-tr" /></template>,
    );
    assert.dom(checkboxSelector).doesNotExist();
  });

  test('it should render a checkbox if `@isSelectable` is `true`', async function (assert) {
    await render(
      <template><Tr id="data-test-advanced-table-tr" @isSelectable={{true}} /></template>,
    );
    assert.dom(checkboxSelector).exists();
  });

  test('the checkbox should be checked if `@isSelected` is `true`', async function (assert) {
    await render(
      <template><Tr id="data-test-advanced-table-tr" @isSelectable={{true}} @isSelected={{true}} /></template>,
    );
    assert.dom(checkboxSelector).isChecked();
  });

  test('the checkbox contains the `@selectionAriaLabelSuffix` suffix', async function (assert) {
    await render(
      <template><Tr id="data-test-advanced-table-tr" @isSelectable={{true}} @selectionAriaLabelSuffix="row 123" /></template>,
    );
    assert.dom(checkboxSelector).hasAria('label', 'Select row 123');
  });

  test('the `th` element has the correct `role` attribute value provided via `@selectionScope`', async function (assert) {
    await render(
      <template><Tr id="data-test-advanced-table-tr" @isSelectable={{true}} @selectionScope="row" /></template>,
    );
    assert
      .dom(
        '#data-test-advanced-table-tr > .hds-advanced-table__th--is-selectable',
      )
      .hasAttribute('role', 'gridcell');
  });

  test('it should invoke the `onSelectionChange` callback when the checkbox is selected', async function (assert) {
    let key;
    this.set(
      'onSelectionChange',
      (_checkbox, selectionKey) => (key = selectionKey),
    );
    await render(
      <template><Tr id="data-test-advanced-table-tr" @isSelectable={{true}} @selectionScope="row" @selectionKey="row123" @onSelectionChange={{this.onSelectionChange}} /></template>,
    );
    await click(checkboxSelector);
    assert.strictEqual(key, 'row123');
  });

  test('it should render a sort button in the checkbox cell if `@onClickSortBySelected` is provided and `@isSelectable` is `true`', async function (assert) {
    this.set('noop', () => {});

    await render(
      <template><Tr id="data-test-advanced-table-tr" @isSelectable={{true}} @onClickSortBySelected={{this.noop}} /></template>,
    );

    assert
      .dom(checkboxSelector + ' ~ .hds-advanced-table__th-button--sort')
      .exists();
  });

  test('it should not render a sort button in the checkbox cell if `@isSelectable` is `true`, and `@onClickSortBySelected` is undefined', async function (assert) {
    await render(
      <template><Tr id="data-test-advanced-table-tr" @isSelectable={{true}} /></template>,
    );

    assert
      .dom(checkboxSelector + ' + .hds-advanced-table__th-button--sort')
      .doesNotExist();
  });

  // ATTRIBUTES

  test('it should support splattributes', async function (assert) {
    await render(
      <template><Tr id="data-test-advanced-table-tr" lang="es" /></template>,
    );
    assert.dom('#data-test-advanced-table-tr').hasAttribute('lang', 'es');
  });

  // ASSERTIONS

  test('it should throw an error if @selectionKey is not defined when @isSelectable is `true` and @selectionScope is `row`', async function (assert) {
    const errorMessage =
      '@selectionKey must be defined on AdvancedTable::Tr or B.Tr when @isSelectable is true';
    assert.expect(1);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, errorMessage);
    });
    await render(
      <template><Tr @isSelectable={{true}} @selectionScope="row" /></template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
