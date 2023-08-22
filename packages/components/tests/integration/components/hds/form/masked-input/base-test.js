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

    test('it should render the text masked by default', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base id="test-form-masked-input" />`
      );
      assert
        .dom('.hds-form-masked-input__control')
        .hasStyle({ '-webkit-text-security': 'disc' });
      assert.dom('.hds-visibility-toggle .flight-icon-eye').exists();
    });

    test('it should render readable text when `isMasked` is false', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base id="test-form-masked-input" @isMasked={{false}} />`
      );
      assert
        .dom('.hds-form-masked-input__control')
        .hasStyle({ '-webkit-text-security': 'none' });
      assert.dom('.hds-visibility-toggle .flight-icon-eye-off').exists();
    });

    test('it should toggle the masking when button is pressed', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base id="test-form-masked-input" />`
      );
      await click('.hds-visibility-toggle');
      assert
        .dom('.hds-form-masked-input__control')
        .hasStyle({ '-webkit-text-security': 'none' });
      assert.dom('.hds-visibility-toggle .flight-icon-eye-off').exists();
    });

    // ACCESSIBILITY

    test('it automatically provides the ID relations between the elements', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base @id="test-form-masked-input" />`
      );
      assert
        .dom('.hds-visibility-toggle')
        .hasAttribute('aria-controls', 'test-form-masked-input');
    });

    test('it updates the button label on toggle', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base @id="test-form-masked-input" />`
      );
      assert
        .dom('.hds-visibility-toggle')
        .hasAttribute('aria-label', 'Show masked content');
      await click('.hds-visibility-toggle');
      assert
        .dom('.hds-visibility-toggle')
        .hasAttribute('aria-label', 'Hide masked content');
    });

    test('it informs the user about visibility change on toggle', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Base @id="test-form-masked-input" />`
      );
      await click('.hds-visibility-toggle');
      assert
        .dom('.hds-visibility-toggle')
        .hasText('Input content is now visible');
      await click('.hds-visibility-toggle');
      assert
        .dom('.hds-visibility-toggle')
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
  }
);
