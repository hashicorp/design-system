/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/masked-input/field',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a specific CSS class', async function (assert) {
      await render(hbs`<Hds::Form::MaskedInput::Field />`);
      assert.dom('.hds-form-field__control').exists();
    });

    // VALUE

    test('it should render the input with the value provided via @value argument', async function (assert) {
      await render(hbs`<Hds::Form::MaskedInput::Field @value="abc123" />`);
      assert.dom('input').hasValue('abc123');
    });

    // INVALID

    test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
      await render(hbs`<Hds::Form::MaskedInput::Field @isInvalid={{true}} />`);
      assert.dom('input').hasClass('hds-form-text-input--is-invalid');
    });

    // WIDTH

    test('it should render the input with a fixed width if a @width value is passed', async function (assert) {
      await render(hbs`<Hds::Form::MaskedInput::Field @width="248px" />`);
      assert.dom('.hds-form-masked-input').hasStyle({ width: '248px' });
    });

    // HEIGHT

    test('it should render the input with a fixed height if a @height value is passed and `@isMultiline` is true', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Field @isMultiline={{true}} @height="248px" />`
      );
      assert
        .dom('.hds-form-masked-input__control')
        .hasStyle({ height: '248px' });
    });

    // ID

    test('it should render the input with a custom @id', async function (assert) {
      await render(hbs`<Hds::Form::MaskedInput::Field @id="my-input" />`);
      assert.dom('input').hasAttribute('id', 'my-input');
    });

    // YIELDED (CONTEXTUAL) COMPONENTS

    test('it renders the yielded contextual components', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Field as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.CharacterCount @maxLength={{10}}/>
          <F.Error>This is the error</F.Error>
        </Hds::Form::MaskedInput::Field>`
      );
      assert.dom('.hds-form-field__label').exists();
      assert.dom('.hds-form-field__helper-text').exists();
      assert.dom('.hds-form-field__control').exists();
      assert.dom('.hds-form-field__character-count').exists();
      assert.dom('.hds-form-field__error').exists();
    });
    test('it does not render the yielded contextual components if not provided', async function (assert) {
      await render(hbs`<Hds::Form::MaskedInput::Field />`);
      assert.dom('.hds-form-field__label').doesNotExist();
      assert.dom('.hds-form-field__helper-text').doesNotExist();
      assert.dom('.hds-form-field__character-count').doesNotExist();
      assert.dom('.hds-form-field__error').doesNotExist();
    });
    test('it automatically provides all the ID relations between the elements', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Field @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.CharacterCount @maxLength={{10}}/>
          <F.Error>This is the error</F.Error>
        </Hds::Form::MaskedInput::Field>`
      );
      // the control ID is dynamically generated
      let control = this.element.querySelector(
        '.hds-form-field__control input'
      );
      let controlId = control.id;
      assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
      assert
        .dom('.hds-form-field__helper-text')
        .hasAttribute('id', `helper-text-${controlId}`);
      assert
        .dom('.hds-form-field__control input')
        .hasAttribute(
          'aria-describedby',
          `helper-text-${controlId} character-count-${controlId} error-${controlId} extra`
        );
      assert
        .dom('.hds-form-field__character-count')
        .hasAttribute('id', `character-count-${controlId}`);
      assert
        .dom('.hds-form-field__error')
        .hasAttribute('id', `error-${controlId}`);
    });

    // REQUIRED AND OPTIONAL

    test('it should append an indicator to the label text and set the required attribute when user input is required', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Field @isRequired={{true}} as |F|>
            <F.Label>This is the label</F.Label>
          </Hds::Form::MaskedInput::Field>`
      );
      assert.dom('label .hds-form-indicator').exists();
      assert.dom('label .hds-form-indicator').hasText('Required');
      assert.dom('input').hasAttribute('required');
    });
    test('it should append an indicator to the label text when user input is optional', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Field @isOptional={{true}} as |F|>
            <F.Label>This is the label</F.Label>
          </Hds::Form::MaskedInput::Field>`
      );
      assert.dom('label .hds-form-indicator').exists();
      assert.dom('label .hds-form-indicator').hasText('(Optional)');
    });
    test('it should not append an indicator to the label text when the required attribute is set', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Field required as |F|>
            <F.Label>This is the label</F.Label>
          </Hds::Form::MaskedInput::Field>`
      );
      assert.dom('input').hasAttribute('required');
      assert.dom('label .hds-form-indicator').doesNotExist();
    });

    // ACCESSIBILITY

    test('it automatically provides the ID relations between the elements', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Field @id="test-form-masked-input" />`
      );
      assert
        .dom('.hds-form-visibility-toggle')
        .hasAttribute('aria-controls', 'test-form-masked-input');
    });

    test('it updates the button label on toggle', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Field @id="test-form-masked-input" />`
      );
      assert
        .dom('.hds-form-visibility-toggle')
        .hasAttribute('aria-label', 'Show masked content');
      await click('.hds-form-visibility-toggle');
      assert
        .dom('.hds-form-visibility-toggle')
        .hasAttribute('aria-label', 'Hide masked content');
    });

    test('it renders a custom toggle button label', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Field @id="test-form-masked-input" @visibilityToggleAriaLabel="Show my masked content" />`
      );
      assert
        .dom('.hds-form-visibility-toggle')
        .hasAttribute('aria-label', 'Show my masked content');
    });

    test('it informs the user about visibility change on toggle', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Field @id="test-form-masked-input" />`
      );
      await click('.hds-form-visibility-toggle');
      assert
        .dom('.hds-form-visibility-toggle')
        .hasText('Input content is visible');
      await click('.hds-form-visibility-toggle');
      assert
        .dom('.hds-form-visibility-toggle')
        .hasText('Input content is hidden');
    });

    test('it renders a custom message on toggle', async function (assert) {
      await render(
        hbs`<Hds::Form::MaskedInput::Field @id="test-form-masked-input" @visibilityToggleAriaMessageText="My input content is visible" />`
      );
      assert
        .dom('.hds-form-visibility-toggle')
        .hasText('My input content is visible');
    });
  }
);
