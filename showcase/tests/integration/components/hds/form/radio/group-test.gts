/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  find,
  findAll,
  render,
  resetOnerror,
  settled,
} from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsFormRadioGroup } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/radio/group', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component', async function (assert) {
    await render(
      <template><HdsFormRadioGroup id="test-form-radio" /></template>,
    );
    assert.dom('#test-form-radio').hasClass('hds-form-group');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components and subcomponents', async function (assert) {
    await render(
      <template>
        <HdsFormRadioGroup as |G|>
          <G.Legend>This is the legend</G.Legend>
          <G.HelperText>This is the group helper text</G.HelperText>
          <G.RadioField checked @value="abc123" as |F|>
            <F.Label>This is the control label</F.Label>
            <F.HelperText>This is the control helper text</F.HelperText>
            <F.Error>This is the control error</F.Error>
          </G.RadioField>
          <G.Error>This is the group error</G.Error>
        </HdsFormRadioGroup>
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
    await render(<template><HdsFormRadioGroup /></template>);
    assert.dom('.hds-form-group__legend').doesNotExist();
    assert.dom('.hds-form-group__helper-text').doesNotExist();
    assert.dom('.hds-form-group__error').doesNotExist();
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    await render(
      <template>
        <HdsFormRadioGroup as |G|>
          <G.Legend>This is the legend</G.Legend>
          <G.HelperText>This is the group helper text</G.HelperText>
          <G.RadioField checked @value="abc123" as |F|>
            <F.Label>This is the control label</F.Label>
            <F.HelperText>This is the control helper text</F.HelperText>
            <F.Error>This is the control error</F.Error>
          </G.RadioField>
          <G.Error>This is the group error</G.Error>
        </HdsFormRadioGroup>
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

  test('it automatically provides all the ID relations between the elements when dynamically rendered', async function (assert) {
    const context = new TrackedObject({
      showErrors: false,
    });

    await render(
      <template>
        <HdsFormRadioGroup as |G|>
          <G.Legend>This is the legend</G.Legend>
          <G.HelperText>This is the group helper text</G.HelperText>
          <G.RadioField checked @value="abc123" as |F|>
            <F.Label>This is the control label</F.Label>
            <F.HelperText>This is the control helper text</F.HelperText>
            <F.Error>This is the control error</F.Error>
          </G.RadioField>
          {{#if context.showErrors}}
            <G.Error>This is the group error</G.Error>
          {{/if}}
        </HdsFormRadioGroup>
      </template>,
    );

    context.showErrors = true;
    await settled();

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

  test('it automatically provides all the ID relations between the elements when dynamically rendered using boolean values', async function (assert) {
    await render(
      <template>
        <HdsFormRadioGroup as |G|>
          {{! @glint-expect-error - testing invalid component usage}}
          <G.RadioField @value={{true}} @id={{true}} as |F|>
            <F.Label>This is the label for the 'true' value</F.Label>
          </G.RadioField>
          {{! template-lint-disable no-duplicate-id }}
          {{! @glint-expect-error - testing invalid component usage}}
          <G.RadioField @value={{false}} @id={{false}} as |F|>
            <F.Label>This is the label for the 'false' value</F.Label>
          </G.RadioField>
        </HdsFormRadioGroup>
      </template>,
    );

    const inputs = findAll('input[type="radio"]');
    const labels = findAll('label');

    // the `true` value should be used for the `id` (input) and `for` (label) attributes
    assert.dom(inputs[0]).hasAttribute('id', 'true');
    assert.dom(labels[0]).hasAttribute('for', 'true');

    // the `false` value should not be used, but the `id` (input) attribute should be generated and the `for` (label) attribute should match it
    const generatedId = inputs[1]?.id ?? '';
    assert.true(generatedId?.startsWith('ember'));
    assert.dom(labels[1]).hasAttribute('for', generatedId);
  });

  // NAME

  test('it renders the defined name on all controls within a group', async function (assert) {
    await render(
      <template>
        <HdsFormRadioGroup @name="datacenter-demo" as |G|>
          <G.Legend>Choose datacenter</G.Legend>
          <G.RadioField data-test="first-control" as |F|>
            <F.Label>NYC1</F.Label>
          </G.RadioField>
          <G.RadioField data-test="second-control" as |F|>
            <F.Label>DC1</F.Label>
          </G.RadioField>
        </HdsFormRadioGroup>
      </template>,
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
      <template>
        <HdsFormRadioGroup @isRequired={{true}} as |G|>
          <G.Legend>This is the legend</G.Legend>
          <G.RadioField checked @value="abc123" as |F|>
            <F.Label>This is the control label</F.Label>
          </G.RadioField>
        </HdsFormRadioGroup>
      </template>,
    );
    assert.dom('legend .hds-form-indicator').exists();
    assert.dom('legend .hds-form-indicator').hasText('Required');
    assert.dom('input').hasAttribute('required');
  });
  test('it should append an indicator to the legend text when user input is optional', async function (assert) {
    await render(
      <template>
        <HdsFormRadioGroup @isOptional={{true}} as |G|>
          <G.Legend>This is the legend</G.Legend>
          <G.RadioField checked @value="abc123" as |F|>
            <F.Label>This is the control label</F.Label>
          </G.RadioField>
        </HdsFormRadioGroup>
      </template>,
    );
    assert.dom('legend .hds-form-indicator').exists();
    assert.dom('legend .hds-form-indicator').hasText('(Optional)');
  });
});
