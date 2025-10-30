/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror, settled, find } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsFormSelectField } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/select/field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a specific CSS class', async function (assert) {
    await render(<template><HdsFormSelectField /></template>);
    assert.dom('.hds-form-field__control').exists();
  });

  // OPTIONS

  test('it should render the options passed via contextual component', async function (assert) {
    await render(
      <template>
        <HdsFormSelectField id="test-form-select" as |F|><F.Options><option
              value="abc123"
            >This is the option</option></F.Options></HdsFormSelectField>
      </template>,
    );
    assert.dom('select option').exists();
    assert.dom('select option').hasText('This is the option');
    assert.dom('select option').hasValue('abc123');
  });

  // WIDTH

  test('it should render the input with a fixed width if a @width value is passed', async function (assert) {
    await render(<template><HdsFormSelectField @width="248px" /></template>);
    assert.dom('select').hasStyle({ width: '248px' });
  });

  // INVALID

  test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
    await render(
      <template><HdsFormSelectField @isInvalid={{true}} /></template>,
    );
    assert.dom('select').hasClass('hds-form-select--is-invalid');
  });

  // ID

  test('it should render the select control with a custom @id', async function (assert) {
    await render(<template><HdsFormSelectField @id="my-input" /></template>);
    assert.dom('select').hasAttribute('id', 'my-input');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    await render(
      <template>
        <HdsFormSelectField as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </HdsFormSelectField>
      </template>,
    );
    assert.dom('.hds-form-field__label').exists();
    assert.dom('.hds-form-field__helper-text').exists();
    assert.dom('.hds-form-field__control').exists();
    assert.dom('.hds-form-field__error').exists();
  });
  test('it does not render the yielded contextual components if not provided', async function (assert) {
    await render(<template><HdsFormSelectField /></template>);
    assert.dom('.hds-form-field__label').doesNotExist();
    assert.dom('.hds-form-field__helper-text').doesNotExist();
    assert.dom('.hds-form-field__error').doesNotExist();
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    await render(
      <template>
        <HdsFormSelectField @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </HdsFormSelectField>
      </template>,
    );
    // the control ID is dynamically generated
    const control = find('.hds-form-field__control select');
    const controlId = control?.id ?? '';
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control select')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} error-${controlId} extra`,
      );
    assert
      .dom('.hds-form-field__error')
      .hasAttribute('id', `error-${controlId}`);
  });
  test('it automatically provides all the ID relations between the elements when dynamically rendered', async function (assert) {
    const context = new TrackedObject({
      showErrors: false,
    });

    await render(
      <template>
        <HdsFormSelectField @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          {{#if context.showErrors}}
            <F.Error>This is the error</F.Error>
          {{/if}}
        </HdsFormSelectField>
      </template>,
    );

    context.showErrors = true;
    await settled();

    // the control ID is dynamically generated
    const control = find('.hds-form-field__control select');
    const controlId = control?.id ?? '';
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control select')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} error-${controlId} extra`,
      );
    assert
      .dom('.hds-form-field__error')
      .hasAttribute('id', `error-${controlId}`);
  });

  // REQUIRED AND OPTIONAL

  test('it should append an indicator to the label text and set the required attribute when user input is required', async function (assert) {
    await render(
      <template>
        <HdsFormSelectField @isRequired={{true}} as |F|>
          <F.Label>This is the label</F.Label>
        </HdsFormSelectField>
      </template>,
    );
    assert.dom('label .hds-form-indicator').exists();
    assert.dom('label .hds-form-indicator').hasText('Required');
    assert.dom('select').hasAttribute('required');
  });
  test('it should append an indicator to the label text when user input is optional', async function (assert) {
    await render(
      <template>
        <HdsFormSelectField @isOptional={{true}} as |F|>
          <F.Label>This is the label</F.Label>
        </HdsFormSelectField>
      </template>,
    );
    assert.dom('label .hds-form-indicator').exists();
    assert.dom('label .hds-form-indicator').hasText('(Optional)');
  });
  test('it should not append an indicator to the label text when the required attribute is set', async function (assert) {
    await render(
      <template>
        <HdsFormSelectField required as |F|>
          <F.Label>This is the label</F.Label>
        </HdsFormSelectField>
      </template>,
    );
    assert.dom('select').hasAttribute('required');
    assert.dom('label .hds-form-indicator').doesNotExist();
  });
});
