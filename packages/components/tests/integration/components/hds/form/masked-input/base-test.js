/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/masked-input/base',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a specific CSS class', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base id="test-form-masked-input" />`
      );
      assert
        .dom('#test-form-masked-input')
        .hasClass('hds-form-masked-input__control');
    });

    // MASKING

    test('it should render a button with the "eye" icon by default', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base id="test-form-masked-input" />`
      );
      assert
        .dom('.hds-form-masked-input__toggle-button .flight-icon-eye')
        .exists();
    });

    test('it should render a button with the "eye-off" icon when `isMasked` is false', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base id="test-form-masked-input" @isMasked={{false}} />`
      );
      assert
        .dom('.hds-form-masked-input__toggle-button .flight-icon-eye-off')
        .exists();
    });

    test('it should toggle the "eye" icon when button is pressed', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base id="test-form-masked-input" />`
      );
      await click('.hds-form-masked-input__toggle-button');
      assert
        .dom('.hds-form-masked-input__toggle-button .flight-icon-eye-off')
        .exists();
    });

    // ACCESSIBILITY

    test('it automatically provides the ID relations between the elements', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base @id="test-form-masked-input" />`
      );
      assert
        .dom('.hds-form-masked-input__toggle-button')
        .hasAttribute('aria-controls', 'test-form-masked-input');
    });

    test('it updates the button label on toggle', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base @id="test-form-masked-input" />`
      );
      assert
        .dom('.hds-form-masked-input__toggle-button')
        .hasAttribute('aria-label', 'Show masked content');
      await click('.hds-form-masked-input__toggle-button');
      assert
        .dom('.hds-form-masked-input__toggle-button')
        .hasAttribute('aria-label', 'Hide masked content');
    });

    test('it informs the user about visibility change on toggle', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base @id="test-form-masked-input" />`
      );
      await click('.hds-form-masked-input__toggle-button');
      assert
        .dom('.hds-form-masked-input__toggle-button')
        .hasText('Input content is now visible');
      await click('.hds-form-masked-input__toggle-button');
      assert
        .dom('.hds-form-masked-input__toggle-button')
        .hasText('Input content is now hidden');
    });

    // MULTILINE

    test('it should render an `<input>` element by default', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base id="test-form-masked-input" />`
      );
      assert.dom('input#test-form-masked-input').exists();
    });

    test('it should render a `<textarea>` element when `@isMultiline` is true', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base @isMultiline={{true}} id="test-form-masked-input" />`
      );
      assert.dom('textarea#test-form-masked-input').exists();
    });

    // ATTRIBUTES

    test('it should spread all the attributes passed to the component on the input', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base class="my-class" data-test1 data-test2="test" />`
      );
      assert.dom('input').hasClass('my-class');
      assert.dom('input').hasAttribute('data-test1');
      assert.dom('input').hasAttribute('data-test2', 'test');
    });
  }
);
