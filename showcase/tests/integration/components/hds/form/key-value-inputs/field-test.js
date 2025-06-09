/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/key-value-inputs/field',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(hbs`<Hds::Form::KeyValueInputs::Field id="test-form-key-value-field" as |F|>
      <F.Label>Label</F.Label>
      <F.TextInput @value="Value" />
      <F.HelperText>Helper text</F.HelperText>
      <F.Error>Error text</F.Error>
    </Hds::Form::KeyValueInputs::Field>`);
      assert
        .dom('#test-form-key-value-field')
        .hasClass('hds-form-key-value-inputs__field');
    });

    test('it should render the subcomponents with the correct CSS classes', async function (assert) {
      await render(hbs`<Hds::Form::KeyValueInputs::Field id="test-form-key-value-field" @rowIndex={{0}} as |F|>
      <F.Label>Label</F.Label>
      <F.TextInput @value="Value" />
      <F.HelperText>Helper text</F.HelperText>
      <F.Error>Error text</F.Error>
    </Hds::Form::KeyValueInputs::Field>`);

      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-label',
        )
        .hasText('Label row 1');
      assert.dom('#test-form-key-value-field .hds-form-text-input').exists();
      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-helper-text',
        )
        .hasText('Helper text');
      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-error',
        )
        .hasText('Error text');
    });

    // ARGUMENTS

    test('it should render as required with `@isRequired` argument', async function (assert) {
      await render(hbs`<Hds::Form::KeyValueInputs::Field id="test-form-key-value-field" @isRequired={{true}} @rowIndex={{0}} as |F|>
      <F.Label>Label</F.Label>
      <F.TextInput @value="Value" />
      <F.HelperText>Helper text</F.HelperText>
      <F.Error>Error text</F.Error>
    </Hds::Form::KeyValueInputs::Field>`);

      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-label',
        )
        .includesText('Required');
    });

    test('it should render as optional with `@isOptional` argument', async function (assert) {
      await render(hbs`<Hds::Form::KeyValueInputs::Field id="test-form-key-value-field" @isOptional={{true}} @rowIndex={{0}} as |F|>
      <F.Label>Label</F.Label>
      <F.TextInput @value="Value" />
      <F.HelperText>Helper text</F.HelperText>
      <F.Error>Error text</F.Error>
    </Hds::Form::KeyValueInputs::Field>`);

      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-label',
        )
        .includesText('(Optional)');
    });

    test('it should render as invalid if `@isInvalid` is true', async function (assert) {
      await render(hbs`<Hds::Form::KeyValueInputs::Field id="test-form-key-value-field" @isInvalid={{true}} @rowIndex={{0}} as |F|>
      <F.Label>Label</F.Label>
      <F.TextInput @value="Value" />
      <F.HelperText>Helper text</F.HelperText>
      <F.Error>Error text</F.Error>
    </Hds::Form::KeyValueInputs::Field>`);

      assert
        .dom('#test-form-key-value-field .hds-form-text-input')
        .hasClass('hds-form-text-input--is-invalid');
      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-error',
        )
        .hasText('Error text');
    });

    // WIDTH

    test('it should add `data-width` if `@width` is provided', async function (assert) {
      await render(
        hbs`<Hds::Form::KeyValueInputs::Field id="test-form-key-value-field" @width="50%" />`,
      );
      assert
        .dom('#test-form-key-value-field')
        .hasAttribute('data-width', '50%');
    });

    // ACCESSIBILITY

    test('it should match the label with the input using `for` and `id` attributes', async function (assert) {
      await render(hbs`<Hds::Form::KeyValueInputs::Field id="test-form-key-value-field" @rowIndex={{0}} as |F|>
    <F.Label>Label</F.Label>
       <F.TextInput @value="Value" />
       </Hds::Form::KeyValueInputs::Field>`);

      const inputId = document.querySelector(
        '#test-form-key-value-field .hds-form-text-input',
      ).id;

      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-label',
        )
        .hasAttribute('for', inputId);
    });

    test('it should match the helper text ids to `aria-describedby` of the input', async function (assert) {
      await render(hbs`<Hds::Form::KeyValueInputs::Field id="test-form-key-value-field" @rowIndex={{0}} as |F|>
    <F.Label>Label</F.Label>
    <F.HelperText>Helper text</F.HelperText>
       <F.TextInput @value="Value" />
       <F.Error>Error text</F.Error>
       </Hds::Form::KeyValueInputs::Field>`);

      const helperId = document.querySelector(
        '#test-form-key-value-field .hds-form-key-value-inputs__field-helper-text',
      ).id;

      const errorId = document.querySelector(
        '#test-form-key-value-field .hds-form-key-value-inputs__field-error',
      ).id;

      assert
        .dom('#test-form-key-value-field .hds-form-text-input')
        .hasAria('describedby', `${helperId} ${errorId}`);
    });
  },
);
