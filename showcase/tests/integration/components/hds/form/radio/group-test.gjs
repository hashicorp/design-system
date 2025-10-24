/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, resetOnerror, settled } from '@ember/test-helpers';
import Group from "@hashicorp/design-system-components/components/hds/form/radio/group";

module('Integration | Component | hds/form/radio/group', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component', async function (assert) {
    await render(<template><Group id="test-form-radio" /></template>);
    assert.dom('#test-form-radio').hasClass('hds-form-group');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components and subcomponents', async function (assert) {
    await render(
      <template><Group as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.HelperText>This is the group helper text</G.HelperText>
            <G.RadioField checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
              <F.HelperText>This is the control helper text</F.HelperText>
              <F.Error>This is the control error</F.Error>
            </G.RadioField>
            <G.Error>This is the group error</G.Error>
          </Group></template>,
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
    await render(<template><Group /></template>);
    assert.dom('.hds-form-group__legend').doesNotExist();
    assert.dom('.hds-form-group__helper-text').doesNotExist();
    assert.dom('.hds-form-group__error').doesNotExist();
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    await render(
      <template><Group as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.HelperText>This is the group helper text</G.HelperText>
            <G.RadioField checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
              <F.HelperText>This is the control helper text</F.HelperText>
              <F.Error>This is the control error</F.Error>
            </G.RadioField>
            <G.Error>This is the group error</G.Error>
          </Group></template>,
    );
    // the IDs are dynamically generated
    let groupHelperText = this.element.querySelector(
      '.hds-form-group__helper-text',
    );
    let groupHelperTextId = groupHelperText.id;
    let groupError = this.element.querySelector('.hds-form-group__error');
    let groupErrorId = groupError.id;
    let fieldHelperText = this.element.querySelector(
      '.hds-form-field__helper-text',
    );
    let fieldHelperTextId = fieldHelperText.id;
    let fieldError = this.element.querySelector('.hds-form-field__error');
    let fieldErrorId = fieldError.id;
    assert
      .dom('input')
      .hasAttribute(
        'aria-describedby',
        `${fieldHelperTextId} ${fieldErrorId} ${groupHelperTextId} ${groupErrorId}`,
      );
  });

  test('it automatically provides all the ID relations between the elements when dynamically rendered', async function (assert) {
    await render(
      <template><Group as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.HelperText>This is the group helper text</G.HelperText>
            <G.RadioField checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
              <F.HelperText>This is the control helper text</F.HelperText>
              <F.Error>This is the control error</F.Error>
            </G.RadioField>
            {{#if this.showErrors}}
              <G.Error>This is the group error</G.Error>
            {{/if}}
          </Group></template>,
    );

    this.set('showErrors', true);
    await settled();
    // the IDs are dynamically generated
    let groupHelperText = this.element.querySelector(
      '.hds-form-group__helper-text',
    );
    let groupHelperTextId = groupHelperText.id;
    let groupError = this.element.querySelector('.hds-form-group__error');
    let groupErrorId = groupError.id;
    let fieldHelperText = this.element.querySelector(
      '.hds-form-field__helper-text',
    );
    let fieldHelperTextId = fieldHelperText.id;
    let fieldError = this.element.querySelector('.hds-form-field__error');
    let fieldErrorId = fieldError.id;
    assert
      .dom('input')
      .hasAttribute(
        'aria-describedby',
        `${fieldHelperTextId} ${fieldErrorId} ${groupHelperTextId} ${groupErrorId}`,
      );
  });

  test('it automatically provides all the ID relations between the elements when dynamically rendered using boolean values', async function (assert) {
    await render(
      <template><Group as |G|>
            <G.RadioField @value={{true}} @id={{true}} as |F|>
              <F.Label>This is the label for the 'true' value</F.Label>
            </G.RadioField>
            <G.RadioField @value={{false}} @id={{false}} as |F|>
              <F.Label>This is the label for the 'false' value</F.Label>
            </G.RadioField>
          </Group></template>,
    );

    const inputs = this.element.querySelectorAll('input[type="radio"]');
    const labels = this.element.querySelectorAll('label');

    // the `true` value should be used for the `id` (input) and `for` (label) attributes
    assert.dom(inputs[0]).hasAttribute('id', 'true');
    assert.dom(labels[0]).hasAttribute('for', 'true');

    // the `false` value should not be used, but the `id` (input) attribute should be generated and the `for` (label) attribute should match it
    const generatedId = inputs[1].id;
    assert.true(generatedId.startsWith('ember'));
    assert.dom(labels[1]).hasAttribute('for', generatedId);
  });

  // NAME

  test('it renders the defined name on all controls within a group', async function (assert) {
    await render(
      <template><Group @name="datacenter-demo" as |G|>
            <G.Legend>Choose datacenter</G.Legend>
            <G.RadioField data-test="first-control" as |F|>
              <F.Label>NYC1</F.Label>
            </G.RadioField>
            <G.RadioField data-test="second-control" as |F|>
              <F.Label>DC1</F.Label>
            </G.RadioField>
          </Group></template>,
    );
    assert
      .dom('[data-test="first-control"]')
      .hasAttribute('name', 'datacenter-demo');
    assert
      .dom('[data-test="second-control"]')
      .hasAttribute('name', 'datacenter-demo');
  });

  // REQUIRED AND OPTIONAL

  test('it should append an indicator to the legend text and set the required attribute when user input is required', async function (assert) {
    await render(
      <template><Group @isRequired={{true}} as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.RadioField checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
            </G.RadioField>
        </Group></template>,
    );
    assert.dom('legend .hds-form-indicator').exists();
    assert.dom('legend .hds-form-indicator').hasText('Required');
    assert.dom('input').hasAttribute('required');
  });
  test('it should append an indicator to the legend text when user input is optional', async function (assert) {
    await render(
      <template><Group @isOptional={{true}} as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.RadioField checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
            </G.RadioField>
          </Group></template>,
    );
    assert.dom('legend .hds-form-indicator').exists();
    assert.dom('legend .hds-form-indicator').hasText('(Optional)');
  });
});
