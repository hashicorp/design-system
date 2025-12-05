/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror, settled, find } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsFormToggleField } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/toggle/field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a specific CSS class', async function (assert) {
    await render(<template><HdsFormToggleField /></template>);
    // Notice: the "toggle" component has a slightly different DOM structure than the other form controls
    assert.dom('input').hasClass('hds-form-toggle__control');
  });

  // VALUE

  test('it should render the input with the value provided via @value argument', async function (assert) {
    await render(<template><HdsFormToggleField @value="abc123" /></template>);
    assert.dom('input').hasValue('abc123');
  });

  // ID

  test('it should render the input with a custom @id', async function (assert) {
    await render(<template><HdsFormToggleField @id="my-input" /></template>);
    assert.dom('input').hasAttribute('id', 'my-input');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    await render(
      <template>
        <HdsFormToggleField as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </HdsFormToggleField>
      </template>,
    );
    assert.dom('.hds-form-field__label').exists();
    assert.dom('.hds-form-field__helper-text').exists();
    assert.dom('.hds-form-field__control').exists();
    assert.dom('.hds-form-field__error').exists();
  });
  test('it does not render the yielded contextual components if not provided', async function (assert) {
    await render(<template><HdsFormToggleField /></template>);
    assert.dom('.hds-form-field__label').doesNotExist();
    assert.dom('.hds-form-field__helper-text').doesNotExist();
    assert.dom('.hds-form-field__error').doesNotExist();
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    await render(
      <template>
        <HdsFormToggleField @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </HdsFormToggleField>
      </template>,
    );
    // the control ID is dynamically generated
    // Notice: the "toggle" component has a slightly different DOM structure than the other form controls
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
        <HdsFormToggleField @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          {{#if context.showErrors}}
            <F.Error>This is the error</F.Error>
          {{/if}}
        </HdsFormToggleField>
      </template>,
    );

    context.showErrors = true;
    await settled();
    // the control ID is dynamically generated
    // Notice: the "toggle" component has a slightly different DOM structure than the other form controls
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
});
