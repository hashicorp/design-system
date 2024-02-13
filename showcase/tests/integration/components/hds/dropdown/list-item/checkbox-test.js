/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dropdown/list-item/checkbox',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the "list-item/checkbox"', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox>Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom(this.element).exists();
    });

    test('it should render the "list-item/checkbox" as a <li> element with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox>Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom('.hds-dropdown-list-item').hasTagName('li');
      assert
        .dom('.hds-dropdown-list-item')
        .hasClass('hds-dropdown-list-item--variant-checkbox');
    });

    // ELEMENTS

    test('it should render the "list-item" with a checkbox control', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox>Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom('.hds-form-checkbox').exists();
    });

    // ARGUMENT FORWARDING: ID, VALUE

    test('it should forward the `id` and `value` arguments to the input control', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox @id="id" @value="value">Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom('.hds-form-checkbox').hasAttribute('id', 'id');
      assert.dom('.hds-form-checkbox').hasValue('value');
    });

    // CONTROL-LABEL ASSOCIATION
    test('it automatically creates the control-label relationship via generated id', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox @value="value">Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      let control = this.element.querySelector(
        '.hds-dropdown-list-item__control'
      );
      let controlId = control.id;
      assert
        .dom('.hds-dropdown-list-item__label')
        .hasAttribute('for', controlId);
    });

    // ICON

    test('if an icon is declared the flight icon should render in the component', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox @icon="hexagon">Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom('.flight-icon.flight-icon-hexagon').exists();
    });

    // CONTENT

    test('it should render the content passed as block in a form label', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox>Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom('.hds-dropdown-list-item__control').exists();
      assert.dom('.hds-dropdown-list-item__label').hasText('Checkbox item');
    });

    // COUNT

    test('it should render with a result count badge', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox @count="10">Checkbox item</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom('.hds-dropdown-list-item__count').hasText('10');
    });

    // SELECTED

    test('it should render as checked if `checked` is true', async function (assert) {
      await render(
        hbs`<Hds::Dropdown::ListItem::Checkbox checked={{true}}>Checkbox</Hds::Dropdown::ListItem::Checkbox>`
      );
      assert.dom('.hds-form-checkbox').isChecked();
    });
  }
);
