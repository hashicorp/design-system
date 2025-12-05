/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror, settled, find } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsFormFileInputField } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/file-input/field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a specific CSS class', async function (assert) {
    await render(<template><HdsFormFileInputField /></template>);
    assert.dom('.hds-form-field__control').exists();
  });

  // ID

  test('it should render the input with a custom @id', async function (assert) {
    await render(<template><HdsFormFileInputField @id="my-input" /></template>);
    assert.dom('input').hasAttribute('id', 'my-input');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    await render(
      <template>
        <HdsFormFileInputField as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </HdsFormFileInputField>
      </template>,
    );
    assert.dom('.hds-form-field__label').exists();
    assert.dom('.hds-form-field__helper-text').exists();
    assert.dom('.hds-form-field__control').exists();
    assert.dom('.hds-form-field__error').exists();
  });

  test('it does not render the yielded contextual components if not provided', async function (assert) {
    await render(<template><HdsFormFileInputField /></template>);
    assert.dom('.hds-form-field__label').doesNotExist();
    assert.dom('.hds-form-field__helper-text').doesNotExist();
    assert.dom('.hds-form-field__error').doesNotExist();
  });

  test('it automatically provides all the ID relations between the elements', async function (assert) {
    await render(
      <template>
        <HdsFormFileInputField @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </HdsFormFileInputField>
      </template>,
    );
    // the control ID is dynamically generated
    const control = find('.hds-form-field__control input');
    const controlId = control?.id ?? '';
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control input')
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
        <HdsFormFileInputField @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          {{#if context.showErrors}}
            <F.Error>This is the error</F.Error>
          {{/if}}
        </HdsFormFileInputField>
      </template>,
    );

    context.showErrors = true;
    await settled();

    // the control ID is dynamically generated
    const control = find('.hds-form-field__control input');
    const controlId = control?.id ?? '';
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control input')
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
        <HdsFormFileInputField @isRequired={{true}} as |F|>
          <F.Label>This is the label</F.Label>
        </HdsFormFileInputField>
      </template>,
    );
    assert.dom('label .hds-form-indicator').exists();
    assert.dom('label .hds-form-indicator').hasText('Required');
    assert.dom('input').hasAttribute('required');
  });

  test('it should append an indicator to the label text when user input is optional', async function (assert) {
    await render(
      <template>
        <HdsFormFileInputField @isOptional={{true}} as |F|>
          <F.Label>This is the label</F.Label>
        </HdsFormFileInputField>
      </template>,
    );
    assert.dom('label .hds-form-indicator').exists();
    assert.dom('label .hds-form-indicator').hasText('(Optional)');
  });

  test('it should not append an indicator to the label text when the required attribute is set', async function (assert) {
    await render(
      <template>
        <HdsFormFileInputField required as |F|>
          <F.Label>This is the label</F.Label>
        </HdsFormFileInputField>
      </template>,
    );
    assert.dom('input').hasAttribute('required');
    assert.dom('label .hds-form-indicator').doesNotExist();
  });
});
