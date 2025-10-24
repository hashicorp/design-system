/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { click, render, resetOnerror, settled } from '@ember/test-helpers';
import Field from "@hashicorp/design-system-components/components/hds/form/text-input/field";

module('Integration | Component | hds/form/text-input/field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a specific CSS class', async function (assert) {
    await render(<template><Field /></template>);
    assert.dom('.hds-form-field__control').exists();
  });

  // TYPE

  test('it should render the "text" type if no type is declared', async function (assert) {
    await render(<template><Field /></template>);
    assert.dom('input').hasAttribute('type', 'text');
  });
  test('it should render the correct type depending on the @type prop', async function (assert) {
    await render(<template><Field @type="email" /></template>);
    assert.dom('input').hasAttribute('type', 'email');
  });

  // PASSWORD

  test('it should render the password input with visibility toggle and masked by default', async function (assert) {
    await render(<template><Field @type="password" /></template>);
    assert.dom('input').hasAttribute('type', 'password');
    assert.dom('.hds-form-visibility-toggle .hds-icon-eye').exists();
  });

  test('it should toggle the masking when the toggle button is pressed', async function (assert) {
    await render(<template><Field @type="password" /></template>);
    await click('.hds-form-visibility-toggle');
    assert.dom('input').hasAttribute('type', 'text');
    assert.dom('.hds-form-visibility-toggle .hds-icon-eye-off').exists();
  });

  test('it should render the password input without visibility toggle when `hasVisibilityToggle` is false', async function (assert) {
    await render(
      <template><Field @type="password" @hasVisibilityToggle={{false}} /></template>,
    );
    assert.dom('input').hasAttribute('type', 'password');
    assert.dom('.hds-form-visibility-toggle').doesNotExist();
  });

  // VALUE

  test('it should render the input with the value provided via @value argument', async function (assert) {
    await render(<template><Field @value="abc123" /></template>);
    assert.dom('input').hasValue('abc123');
  });

  // INVALID

  test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
    await render(<template><Field @isInvalid={{true}} /></template>);
    assert.dom('input').hasClass('hds-form-text-input--is-invalid');
  });

  // IS LOADING

  test('it should render the correct CSS class if the @isLoading prop is declared', async function (assert) {
    await render(
      <template><Field @type="search" @isLoading={{true}} /></template>,
    );
    assert.dom('input').hasClass('hds-form-text-input--is-loading');
  });

  // WIDTH

  test('it should render the input with a fixed width if a @width value is passed', async function (assert) {
    await render(<template><Field @width="248px" /></template>);
    assert.dom('input').hasStyle({ width: '248px' });
  });

  // ID

  test('it should render the input with a custom @id', async function (assert) {
    await render(<template><Field @id="my-input" /></template>);
    assert.dom('input').hasAttribute('id', 'my-input');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    await render(
      <template><Field @value="abc123" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.CharacterCount @maxLength={{10}} />
          <F.Error>This is the error</F.Error>
        </Field></template>,
    );
    assert.dom('.hds-form-field__label').exists();
    assert.dom('.hds-form-field__helper-text').exists();
    assert.dom('.hds-form-field__control').exists();
    assert.dom('.hds-form-field__character-count').exists();
    assert.dom('.hds-form-field__error').exists();
  });
  test('it does not render the yielded contextual components if not provided', async function (assert) {
    await render(<template><Field /></template>);
    assert.dom('.hds-form-field__label').doesNotExist();
    assert.dom('.hds-form-field__helper-text').doesNotExist();
    assert.dom('.hds-form-field__character-count').doesNotExist();
    assert.dom('.hds-form-field__error').doesNotExist();
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    await render(
      <template><Field @value="abc123" @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.CharacterCount @maxLength={{10}} />
          <F.Error>This is the error</F.Error>
        </Field></template>,
    );
    // the control ID is dynamically generated
    let control = this.element.querySelector('.hds-form-field__control input');
    let controlId = control.id;
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control input')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} character-count-${controlId} error-${controlId} extra`,
      );
    assert
      .dom('.hds-form-field__character-count')
      .hasAttribute('id', `character-count-${controlId}`);
    assert
      .dom('.hds-form-field__character-count')
      .hasText('4 characters remaining');
    assert
      .dom('.hds-form-field__error')
      .hasAttribute('id', `error-${controlId}`);
  });

  test('it automatically provides all the ID relations between the elements even when dynamically rendered', async function (assert) {
    await render(
      <template><Field @value="abc123" @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.CharacterCount @maxLength={{10}} />
          {{#if this.showErrors}}
            <F.Error>This is the error</F.Error>
          {{/if}}
        </Field></template>,
    );

    this.set('showErrors', true);
    await settled();

    // the control ID is dynamically generated
    let control = this.element.querySelector('.hds-form-field__control input');
    let controlId = control.id;
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control input')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} character-count-${controlId} error-${controlId} extra`,
      );
    assert
      .dom('.hds-form-field__character-count')
      .hasAttribute('id', `character-count-${controlId}`);
    assert
      .dom('.hds-form-field__character-count')
      .hasText('4 characters remaining');
    assert
      .dom('.hds-form-field__error')
      .hasAttribute('id', `error-${controlId}`);
  });

  // REQUIRED AND OPTIONAL

  test('it should append an indicator to the label text and set the required attribute when user input is required', async function (assert) {
    await render(
      <template><Field @isRequired={{true}} as |F|>
            <F.Label>This is the label</F.Label>
          </Field></template>,
    );
    assert.dom('label .hds-form-indicator').exists();
    assert.dom('label .hds-form-indicator').hasText('Required');
    assert.dom('input').hasAttribute('required');
  });
  test('it should append an indicator to the label text when user input is optional', async function (assert) {
    await render(
      <template><Field @isOptional={{true}} as |F|>
            <F.Label>This is the label</F.Label>
          </Field></template>,
    );
    assert.dom('label .hds-form-indicator').exists();
    assert.dom('label .hds-form-indicator').hasText('(Optional)');
  });
  test('it should not append an indicator to the label text when the required attribute is set', async function (assert) {
    await render(
      <template><Field required as |F|>
            <F.Label>This is the label</F.Label>
          </Field></template>,
    );
    assert.dom('input').hasAttribute('required');
    assert.dom('label .hds-form-indicator').doesNotExist();
  });
});
