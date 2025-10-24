/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Field from "@hashicorp/design-system-components/components/hds/form/key-value-inputs/field";
import eq from "ember-truth-helpers/helpers/eq";

const YIELDED_INPUTS = [
  { type: 'FileInput', selector: '.hds-form-file-input' },
  { type: 'MaskedInput', selector: '.hds-form-text-input' },
  { type: 'SuperSelectSingle', selector: '.hds-form-super-select' },
  { type: 'SuperSelectMultiple', selector: '.hds-form-super-select' },
  { type: 'Select', selector: '.hds-form-select' },
  { type: 'TextInput', selector: '.hds-form-text-input' },
  { type: 'Textarea', selector: '.hds-form-textarea' },
];

module(
  'Integration | Component | hds/form/key-value-inputs/field',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      this.set('createKeyValueInputsField', async (args = {}) => {
        this.type = args.type ?? 'TextInput';
        this.isInvalid = args.isInvalid;
        this.controlId = args.id;
        this.extraAriaDescribedBy = args.extraAriaDescribedBy;
        // ---
        this.options = ['Option 1', 'Option 2'];
        this.selected_option = 'Option 1';
        this.NOOP = () => {};

        await render(<template>
          <Field id="test-form-key-value-field" @id={{this.controlId}} @isInvalid={{this.isInvalid}} @extraAriaDescribedBy={{this.extraAriaDescribedBy}} @rowIndex={{0}} as |F|>
            <F.Label>Label</F.Label>
            <F.HelperText>Helper text</F.HelperText>
            {{#if (eq this.type "FileInput")}}
              <F.FileInput />
            {{/if}}
            {{#if (eq this.type "MaskedInput")}}
              <F.MaskedInput />
            {{/if}}
            {{#if (eq this.type "SuperSelectSingle")}}
              <F.SuperSelectSingle @onChange={{this.NOOP}} @options={{this.options}} @selected={{this.selected_option}} as |option|>
                {{option}}
              </F.SuperSelectSingle>
            {{/if}}
            {{#if (eq this.type "SuperSelectMultiple")}}
              <F.SuperSelectMultiple @onChange={{this.NOOP}} @options={{this.options}} as |option|>
                {{option}}
              </F.SuperSelectMultiple>
            {{/if}}
            {{#if (eq this.type "Select")}}
              <F.Select />
            {{/if}}
            {{#if (eq this.type "TextInput")}}
              <F.TextInput />
            {{/if}}
            {{#if (eq this.type "Textarea")}}
              <F.Textarea />
            {{/if}}
            <F.Error>Error text</F.Error>
          </Field>
        </template>);
      });
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><Field id="test-form-key-value-field" /></template>,
      );
      assert
        .dom('#test-form-key-value-field')
        .hasClass('hds-form-key-value-inputs__field');
    });

    // LABEL HIDDEN TEXT

    test('it should render the label with screen-reader-only text based on the provided `@rowIndex` argument', async function (assert) {
      await render(<template>
        <Field id="test-form-key-value-field" @rowIndex={{0}} as |F|>
          <F.Label>Label</F.Label>
        </Field>
      </template>);

      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-label',
        )
        // note: "row 1" is the `.sr-only` hidden text
        .hasText('Label row 1');
      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-label .sr-only',
        )
        .hasText('row 1');
    });

    // REQUIRED/OPTIONAL

    test('it should render as required with `@isRequired` argument', async function (assert) {
      await render(<template>
        <Field id="test-form-key-value-field" @isRequired={{true}} @rowIndex={{0}} as |F|>
          <F.Label>Label</F.Label>
        </Field>
      </template>);

      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-label',
        )
        .includesText('Required');
    });

    test('it should render as optional with `@isOptional` argument', async function (assert) {
      await render(<template>
        <Field id="test-form-key-value-field" @isOptional={{true}} @rowIndex={{0}} as |F|>
          <F.Label>Label</F.Label>
        </Field>
      </template>);

      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-label',
        )
        .includesText('(Optional)');
    });

    // YIELDED (CONTEXTUAL) COMPONENTS

    test('it renders the yielded `Label`, `HelperText`, and `Error` contextual components', async function (assert) {
      await this.createKeyValueInputsField();
      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-label',
        )
        .hasText('Label row 1');
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

    YIELDED_INPUTS.forEach(({ type, selector }) => {
      test(`it renders the yielded "${type}" input as contextual components`, async function (assert) {
        await this.createKeyValueInputsField({ type });
        assert.dom(`#test-form-key-value-field ${selector}`).exists();
      });
    });

    // INVALID

    YIELDED_INPUTS.forEach(({ type, selector }) => {
      if (type !== 'FileInput') {
        // file input doesn't have an invalid state
        test(`it should render the "${type}" input as invalid if \`@isInvalid\` is true`, async function (assert) {
          await this.createKeyValueInputsField({ type, isInvalid: true });
          assert
            .dom(`#test-form-key-value-field ${selector}`)
            // we need to remove the initial `.` from the selector string
            .hasClass(`${selector.slice(1)}--is-invalid`);
        });
      }
    });

    // WIDTH

    test('it should add `data-width` if `@width` is provided', async function (assert) {
      await render(
        <template><Field id="test-form-key-value-field" @width="50%" /></template>,
      );
      assert
        .dom('#test-form-key-value-field')
        .hasAttribute('data-width', '50%');
    });

    // CALLBACKS

    test('it should call `@onInsert/@onRemove` callbacks when added/removed', async function (assert) {
      this.set('isRendered', false);
      let inserted = false;
      let removed = false;
      this.set('onInsert', () => {
        inserted = true;
      });
      this.set('onRemove', () => {
        removed = true;
      });

      await render(
        <template>
          {{#if this.isRendered}}
            <Field @onInsert={{this.onInsert}} @onRemove={{this.onRemove}} />
          {{/if}}
        </template>,
      );

      assert.notOk(inserted);
      assert.notOk(removed);
      this.set('isRendered', true);
      assert.ok(inserted);
      this.set('isRendered', false);
      assert.ok(removed);
    });

    // ACCESSIBILITY

    YIELDED_INPUTS.forEach(({ type, selector }) => {
      ['default', 'custom'].forEach((mode) => {
        test(`it should associate the label and help text appropriately for the "${type}" input - ${mode === 'custom' ? 'with custom @id' : 'default'}`, async function (assert) {
          const extraAriaDescribedBy = 'extra';
          const opts = { type, extraAriaDescribedBy };
          if (mode === 'custom') {
            opts.id = 'custom-id';
          }
          await this.createKeyValueInputsField(opts);

          const labelId = document.querySelector(
            '#test-form-key-value-field .hds-form-label',
          ).id;
          const inputId = document.querySelector(
            `#test-form-key-value-field ${selector}`,
          ).id;
          const helperId = document.querySelector(
            '#test-form-key-value-field .hds-form-key-value-inputs__field-helper-text',
          ).id;
          const errorId = document.querySelector(
            '#test-form-key-value-field .hds-form-key-value-inputs__field-error',
          ).id;

          if (type === 'SuperSelectSingle' || type === 'SuperSelectMultiple') {
            assert
              .dom('#test-form-key-value-field [role="combobox"]')
              .hasAria('labelledby', labelId);
            assert
              .dom('#test-form-key-value-field [role="combobox"]')
              .hasAria(
                'describedby',
                `${helperId} ${errorId} ${extraAriaDescribedBy}`,
              );
          } else {
            assert
              .dom(
                '#test-form-key-value-field .hds-form-key-value-inputs__field-label',
              )
              .hasAttribute('for', inputId);
            assert
              .dom(`#test-form-key-value-field ${selector}`)
              .hasAria(
                'describedby',
                `${helperId} ${errorId} ${extraAriaDescribedBy}`,
              );
          }
        });
      });
    });
  },
);
