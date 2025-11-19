/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror, find } from '@ember/test-helpers';

import { HdsFormToggleGroup } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/toggle/group', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsFormToggleGroup id="test-form-toggle" /></template>,
    );
    assert.dom('#test-form-toggle').hasClass('hds-form-group');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components and subcomponents', async function (assert) {
    await render(
      <template>
        <HdsFormToggleGroup as |G|>
          <G.Legend>This is the legend</G.Legend>
          <G.HelperText>This is the group helper text</G.HelperText>
          <G.ToggleField checked @value="abc123" as |F|>
            <F.Label>This is the control label</F.Label>
            <F.HelperText>This is the control helper text</F.HelperText>
            <F.Error>This is the control error</F.Error>
          </G.ToggleField>
          <G.Error>This is the group error</G.Error>
        </HdsFormToggleGroup>
      </template>,
    );
    assert.dom('.hds-form-group__legend').exists();
    assert.dom('.hds-form-group__legend').hasText('This is the legend');
    assert.dom('.hds-form-group__helper-text').exists();
    assert
      .dom('.hds-form-group__helper-text')
      .hasText('This is the group helper text');
    assert
      .dom('.hds-form-group__control-fields-wrapper .hds-form-field__label')
      .exists();
    assert
      .dom(
        '.hds-form-group__control-fields-wrapper .hds-form-field__helper-text',
      )
      .exists();
    assert
      .dom('.hds-form-group__control-fields-wrapper .hds-form-field__control')
      .exists();
    assert.dom('.hds-form-group__control-fields-wrapper input').isChecked();
    assert
      .dom('.hds-form-group__control-fields-wrapper input')
      .hasValue('abc123');
    assert
      .dom('.hds-form-group__control-fields-wrapper .hds-form-field__error')
      .exists();
    assert.dom('.hds-form-group__error').exists();
    assert.dom('.hds-form-group__error').hasText('This is the group error');
  });
  test('it does not render the yielded contextual components if not provided', async function (assert) {
    await render(<template><HdsFormToggleGroup /></template>);
    assert.dom('.hds-form-group__legend').doesNotExist();
    assert.dom('.hds-form-group__helper-text').doesNotExist();
    assert.dom('.hds-form-group__error').doesNotExist();
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    await render(
      <template>
        <HdsFormToggleGroup as |G|>
          <G.Legend>This is the legend</G.Legend>
          <G.HelperText>This is the group helper text</G.HelperText>
          <G.ToggleField checked @value="abc123" as |F|>
            <F.Label>This is the control label</F.Label>
            <F.HelperText>This is the control helper text</F.HelperText>
            <F.Error>This is the control error</F.Error>
          </G.ToggleField>
          <G.Error>This is the group error</G.Error>
        </HdsFormToggleGroup>
      </template>,
    );

    const groupHelperText = find('.hds-form-group__helper-text');
    const groupError = find('.hds-form-group__error');
    const fieldHelperText = find('.hds-form-field__helper-text');
    const fieldError = find('.hds-form-field__error');

    assert
      .dom('input')
      .hasAttribute(
        'aria-describedby',
        `${fieldHelperText?.id} ${fieldError?.id} ${groupHelperText?.id} ${groupError?.id}`,
      );
  });

  // REQUIRED AND OPTIONAL

  test('it should append an indicator to the legend text and set the required attribute when user input is required', async function (assert) {
    await render(
      <template>
        <HdsFormToggleGroup @isRequired={{true}} as |G|>
          <G.Legend>This is the legend</G.Legend>
          <G.ToggleField checked @value="abc123" as |F|>
            <F.Label>This is the control label</F.Label>
          </G.ToggleField>
        </HdsFormToggleGroup>
      </template>,
    );
    assert.dom('legend .hds-form-indicator').exists();
    assert.dom('legend .hds-form-indicator').hasText('Required');
    assert.dom('input').hasAttribute('required');
  });
  test('it should append an indicator to the legend text when user input is optional', async function (assert) {
    await render(
      <template>
        <HdsFormToggleGroup @isOptional={{true}} as |G|>
          <G.Legend>This is the legend</G.Legend>
          <G.ToggleField checked @value="abc123" as |F|>
            <F.Label>This is the control label</F.Label>
          </G.ToggleField>
        </HdsFormToggleGroup>
      </template>,
    );
    assert.dom('legend .hds-form-indicator').exists();
    assert.dom('legend .hds-form-indicator').hasText('(Optional)');
  });
});
