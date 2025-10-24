/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Radio from "@hashicorp/design-system-components/components/hds/dropdown/list-item/radio";

module(
  'Integration | Component | hds/dropdown/list-item/radio',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the "list-item/radio"', async function (assert) {
      await render(
        <template><Radio>Radio item</Radio></template>,
      );
      assert.dom(this.element).exists();
    });

    test('it should render the "list-item/radio" as a <li> element with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><Radio>Radio item</Radio></template>,
      );
      assert.dom('.hds-dropdown-list-item').hasTagName('li');
      assert
        .dom('.hds-dropdown-list-item')
        .hasClass('hds-dropdown-list-item--variant-radio');
    });

    // ELEMENTS

    test('it should render the "list-item" with a radio control', async function (assert) {
      await render(
        <template><Radio>Radio item</Radio></template>,
      );
      assert.dom('.hds-form-radio').exists();
    });

    // ARGUMENT FORWARDING: ID, VALUE

    test('it should forward the `id` and `value` arguments to the input control', async function (assert) {
      await render(
        <template><Radio @id="id" @value="value">Radio item</Radio></template>,
      );
      assert.dom('.hds-form-radio').hasAttribute('id', 'id');
      assert.dom('.hds-form-radio').hasValue('value');
    });

    // CONTROL-LABEL ASSOCIATION
    test('it automatically creates the control-label relationship via generated id', async function (assert) {
      await render(
        <template><Radio @value="value">Checkbox item</Radio></template>,
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
        <template><Radio @icon="hexagon">Radio item</Radio></template>,
      );
      assert.dom('.hds-icon.hds-icon-hexagon').exists();
    });

    // CONTENT

    test('it should render the content passed as block in a form label', async function (assert) {
      await render(
        <template><Radio>Radio item</Radio></template>,
      );
      assert.dom('.hds-dropdown-list-item__control').exists();
      assert.dom('.hds-dropdown-list-item__label').hasText('Radio item');
    });

    // COUNT

    test('it should render with a result count badge', async function (assert) {
      await render(
        <template><Radio @count="10">Radio item</Radio></template>,
      );
      assert.dom('.hds-dropdown-list-item__count').hasText('10');
    });

    // SELECTED

    test('it should render as checked if `checked` is true', async function (assert) {
      await render(
        <template><Radio checked={{true}}>Radio</Radio></template>,
      );
      assert.dom('.hds-form-radio').isChecked();
    });
  },
);
