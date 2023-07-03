/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/sensitive-input/base',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Form::SensitiveInput::Base id="test-form-sensitive-input" />`
      );
      assert
        .dom('#test-form-sensitive-input')
        .hasClass('hds-form-sensitive-input__control');
    });

    // OBFUSCATION

    test('it should render a button with the "eye" icon by default', async function (assert) {
      await render(
        hbs`<Hds::Form::SensitiveInput::Base id="test-form-sensitive-input" />`
      );
      assert
        .dom('.hds-form-sensitive-input__toggle-button .flight-icon-eye')
        .exists();
    });

    test('it should render a button with the "eye-off" icon when `isObfuscated` is false', async function (assert) {
      await render(
        hbs`<Hds::Form::SensitiveInput::Base id="test-form-sensitive-input" @isObfuscated={{false}} />`
      );
      assert
        .dom('.hds-form-sensitive-input__toggle-button .flight-icon-eye-off')
        .exists();
    });

    test('it should toggle the "eye" icon when button is pressed', async function (assert) {
      await render(
        hbs`<Hds::Form::SensitiveInput::Base id="test-form-sensitive-input" />`
      );
      await click('.hds-form-sensitive-input__toggle-button');
      assert
        .dom('.hds-form-sensitive-input__toggle-button .flight-icon-eye-off')
        .exists();
    });

    // ACCESSIBILITY

    test('it automatically provides the ID relations between the elements', async function (assert) {
      await render(
        hbs`<Hds::Form::SensitiveInput::Base @id="test-form-sensitive-input" />`
      );
      assert
        .dom('.hds-form-sensitive-input__toggle-button')
        .hasAttribute('aria-controls', 'test-form-sensitive-input');
    });

    // ATTRIBUTES

    test('it should spread all the attributes passed to the component on the input', async function (assert) {
      await render(
        hbs`<Hds::Form::SensitiveInput::Base class="my-class" data-test1 data-test2="test" />`
      );
      assert.dom('input').hasClass('my-class');
      assert.dom('input').hasAttribute('data-test1');
      assert.dom('input').hasAttribute('data-test2', 'test');
    });
  }
);
