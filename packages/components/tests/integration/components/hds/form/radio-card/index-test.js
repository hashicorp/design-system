/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/radio-card/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::RadioCard/>`);
    assert.dom('label').hasClass('hds-form-radio-card');
  });
  test('it should render the input with a specific CSS class', async function (assert) {
    await render(hbs`<Hds::Form::RadioCard />`);
    assert.dom('input').hasClass('hds-form-radio-card__control');
  });

  // NAME, VALUE

  test('it should render the input with the arguments provided', async function (assert) {
    await render(hbs`<Hds::Form::RadioCard @name="name" @value="value" />`);
    assert.dom('input').hasValue('value');
    assert.dom('input').hasAttribute('name', 'name');
  });

  // CHECKED, DISABLED, MAX-WIDTH

  test('it should render the component with CSS classes that reflect the arguments provided', async function (assert) {
    await render(
      hbs`<Hds::Form::RadioCard @checked="checked" @disabled="disabled" />`
    );
    assert.dom('label').hasClass('hds-form-radio-card--checked');
    assert.dom('label').hasClass('hds-form-radio-card--disabled');
  });

  // WIDTH

  test('it should render the default class, resulting in a fluid width', async function (assert) {
    await render(hbs`<Hds::Form::RadioCard />`);
    assert.dom('label').hasClass('hds-form-radio-card--has-fluid-width');
  });

  test('it should render the correct class if `@maxWidth` is set', async function (assert) {
    await render(hbs`<Hds::Form::RadioCard @maxWidth="25%" />`);
    assert.dom('label').hasClass('hds-form-radio-card--has-fixed-width');
  });

  // CONTEXTUAL COMPONENTS

  test('it renders the contextual components', async function (assert) {
    await render(
      hbs`<Hds::Form::RadioCard as |R|>
            <R.Icon @name="hexagon"/>
            <R.Label>This is the label</R.Label>
            <R.Badge @text="badge"/>
            <R.Description>This is the description</R.Description>
            <R.Generic><div class="custom">This is the custom content</div></R.Generic>
          </Hds::Form::RadioCard>`
    );
    assert.dom('.flight-icon-hexagon').exists();
    assert.dom('.hds-form-radio-card__label').exists();
    assert.dom('.hds-badge').exists();
    assert.dom('.hds-form-radio-card__description').exists();
    assert.dom('.custom').exists();
  });
  test('it does not render the contextual components if not provided', async function (assert) {
    await render(hbs`<Hds::Form::RadioCard />`);
    assert.dom('.flight-icon').doesNotExist();
    assert.dom('.hds-form-radio-card__label').doesNotExist();
    assert.dom('.hds-badge').doesNotExist();
    assert.dom('.hds-form-radio-card__description').doesNotExist();
    assert.dom('.custom').doesNotExist();
  });

  // ASSERTIONS: ALIGNMENT, CONTROL POSITION, LAYOUT

  test('it should throw an assertion if an incorrect value for @alignment is provided', async function (assert) {
    const errorMessage =
      '@alignment for "Hds::Form::RadioCard" must be one of the following: left, center; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Form::RadioCard @alignment="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it should throw an assertion if an incorrect value for @controlPosition is provided', async function (assert) {
    const errorMessage =
      '@controlPosition for "Hds::Form::RadioCard" must be one of the following: bottom, left; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Form::RadioCard @controlPosition="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
