/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror, find } from '@ember/test-helpers';

import { HdsFormCheckboxField } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/checkbox/field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with the appropriate CSS class', async function (assert) {
    await render(<template><HdsFormCheckboxField /></template>);
    assert.dom('.hds-form-field__control').exists();
  });

  // VALUE

  test('it should render the input with the value provided via @value argument', async function (assert) {
    await render(<template><HdsFormCheckboxField @value="abc123" /></template>);
    assert.dom('input').hasValue('abc123');
  });

  // ID

  test('it should render the input with a custom @id', async function (assert) {
    await render(<template><HdsFormCheckboxField @id="my-input" /></template>);
    assert.dom('input').hasAttribute('id', 'my-input');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    await render(
      <template>
        <HdsFormCheckboxField checked as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </HdsFormCheckboxField>
      </template>,
    );
    assert.dom('.hds-form-field__label').exists();
    assert.dom('.hds-form-field__helper-text').exists();
    assert.dom('.hds-form-field__control').exists();
    assert.dom('.hds-form-field__control input').isChecked();
    assert.dom('.hds-form-field__error').exists();
  });
  test('it does not render the yielded contextual components if not provided', async function (assert) {
    await render(<template><HdsFormCheckboxField /></template>);
    assert.dom('.hds-form-field__label').doesNotExist();
    assert.dom('.hds-form-field__helper-text').doesNotExist();
    assert.dom('.hds-form-field__error').doesNotExist();
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    await render(
      <template>
        <HdsFormCheckboxField @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </HdsFormCheckboxField>
      </template>,
    );
    // the control ID is dynamically generated
    const control = find('.hds-form-field__control input');

    assert.dom('.hds-form-field__label').hasAttribute('for', control?.id || '');
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${control?.id || ''}`);
    assert
      .dom('.hds-form-field__control input')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${control?.id || ''} error-${control?.id || ''} extra`,
      );
    assert
      .dom('.hds-form-field__error')
      .hasAttribute('id', `error-${control?.id || ''}`);
  });
});
