/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Checkbox from "@hashicorp/design-system-components/components/hds/dropdown/list-item/checkbox";

module(
  'Integration | Component | hds/dropdown/list-item/checkbox',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the "list-item/checkbox"', async function (assert) {
      await render(
        <template><Checkbox>Checkbox item</Checkbox></template>,
      );
      assert.dom(this.element).exists();
    });

    test('it should render the "list-item/checkbox" as a <li> element with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><Checkbox>Checkbox item</Checkbox></template>,
      );
      assert.dom('.hds-dropdown-list-item').hasTagName('li');
      assert
        .dom('.hds-dropdown-list-item')
        .hasClass('hds-dropdown-list-item--variant-checkbox');
    });

    // ELEMENTS

    test('it should render the "list-item" with a checkbox control', async function (assert) {
      await render(
        <template><Checkbox>Checkbox item</Checkbox></template>,
      );
      assert.dom('.hds-form-checkbox').exists();
    });

    // ARGUMENT FORWARDING: ID, VALUE

    test('it should forward the `id` and `value` arguments to the input control', async function (assert) {
      await render(
        <template><Checkbox @id="id" @value="value">Checkbox item</Checkbox></template>,
      );
      assert.dom('.hds-form-checkbox').hasAttribute('id', 'id');
      assert.dom('.hds-form-checkbox').hasValue('value');
    });

    // CONTROL-LABEL ASSOCIATION
    test('it automatically creates the control-label relationship via generated id', async function (assert) {
      await render(
        <template><Checkbox @value="value">Checkbox item</Checkbox></template>,
      );
      let control = this.element.querySelector(
        '.hds-dropdown-list-item__control',
      );
      let controlId = control.id;
      assert
        .dom('.hds-dropdown-list-item__label')
        .hasAttribute('for', controlId);
    });

    // ICON

    test('if an icon is declared the flight icon should render in the component', async function (assert) {
      await render(
        <template><Checkbox @icon="hexagon">Checkbox item</Checkbox></template>,
      );
      assert.dom('.hds-icon.hds-icon-hexagon').exists();
    });

    // CONTENT

    test('it should render the content passed as block in a form label', async function (assert) {
      await render(
        <template><Checkbox>Checkbox item</Checkbox></template>,
      );
      assert.dom('.hds-dropdown-list-item__control').exists();
      assert.dom('.hds-dropdown-list-item__label').hasText('Checkbox item');
    });

    // COUNT

    test('it should render with a result count badge', async function (assert) {
      await render(
        <template><Checkbox @count="10">Checkbox item</Checkbox></template>,
      );
      assert.dom('.hds-dropdown-list-item__count').hasText('10');
    });

    // SELECTED

    test('it should render as checked if `checked` is true', async function (assert) {
      await render(
        <template><Checkbox checked={{true}}>Checkbox</Checkbox></template>,
      );
      assert.dom('.hds-form-checkbox').isChecked();
    });
  },
);
