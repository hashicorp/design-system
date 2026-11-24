/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { render, find, settled } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsFormKeyValueInputsField } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';
import NOOP from 'showcase/utils/noop';

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import type { PowerSelectSelectedItemSignature } from 'ember-power-select/types';

interface ClusterSizeOption {
  size: string;
  price: string;
}

interface ClusterExtra {
  currency: string;
}

const CLUSTER_SIZE_OPTIONS: ClusterSizeOption[] = [
  { size: 'Small', price: '$10' },
  { size: 'Large', price: '$40' },
];

const SelectedClusterSize: TemplateOnlyComponent<
  PowerSelectSelectedItemSignature<ClusterSizeOption, ClusterExtra>
> = <template>{{@selected.size}} ({{@extra.currency}})</template>;

const SelectedClusterSizes: TemplateOnlyComponent<
  PowerSelectSelectedItemSignature<ClusterSizeOption, ClusterExtra, true>
> = <template>{{@selected.size}} ({{@extra.currency}})</template>;

// a selected item component that expects a different `@extra`, which must be rejected
const SelectedClusterSizeWrongExtra: TemplateOnlyComponent<
  PowerSelectSelectedItemSignature<ClusterSizeOption, { region: number }>
> = <template>{{@selected.size}}</template>;

const YIELDED_INPUTS = [
  { type: 'FileInput', selector: '.hds-form-file-input' },
  { type: 'MaskedInput', selector: '.hds-form-text-input' },
  { type: 'SuperSelectSingle', selector: '.hds-form-super-select' },
  { type: 'SuperSelectMultiple', selector: '.hds-form-super-select' },
  { type: 'Select', selector: '.hds-form-select' },
  { type: 'TextInput', selector: '.hds-form-text-input' },
  { type: 'Textarea', selector: '.hds-form-textarea' },
];

const createKeyValueInputsField = async (options: {
  type?: string;
  isInvalid?: boolean;
  id?: string;
  extraAriaDescribedBy?: string;
}) => {
  const type = options.type ?? 'TextInput';
  const superSelectOptions = ['Option 1', 'Option 2'];
  const superSelectSelected = 'Option 1';

  await render(
    <template>
      <HdsFormKeyValueInputsField
        id="test-form-key-value-field"
        @id={{options.id}}
        @isInvalid={{options.isInvalid}}
        @extraAriaDescribedBy={{options.extraAriaDescribedBy}}
        @rowIndex={{0}}
        as |F|
      >
        <F.Label>Label</F.Label>
        <F.HelperText>Helper text</F.HelperText>
        {{#if (eq type "FileInput")}}
          <F.FileInput />
        {{/if}}
        {{#if (eq type "MaskedInput")}}
          <F.MaskedInput />
        {{/if}}
        {{#if (eq type "SuperSelectSingle")}}
          <F.SuperSelectSingle
            @onChange={{NOOP}}
            @options={{superSelectOptions}}
            @selected={{superSelectSelected}}
            as |option|
          >
            {{option}}
          </F.SuperSelectSingle>
        {{/if}}
        {{#if (eq type "SuperSelectMultiple")}}
          <F.SuperSelectMultiple
            @onChange={{NOOP}}
            @options={{superSelectOptions}}
            as |option|
          >
            {{option}}
          </F.SuperSelectMultiple>
        {{/if}}
        {{#if (eq type "Select")}}
          <F.Select />
        {{/if}}
        {{#if (eq type "TextInput")}}
          <F.TextInput />
        {{/if}}
        {{#if (eq type "Textarea")}}
          <F.Textarea />
        {{/if}}
        <F.Error>Error text</F.Error>
      </HdsFormKeyValueInputsField>
    </template>,
  );
};

module(
  'Integration | Component | hds/form/key-value-inputs/field',
  function (hooks) {
    setupRenderingTest(hooks);

    // the yielded SuperSelect components must keep the generic types of the Base components, so `@options` types the
    // yielded options, the callbacks, `@selected` and `@extra`: `lint:types` fails if the inference is lost
    // (the positive cases stop type checking) or if a `@glint-expect-error` below stops being needed
    test('the yielded SuperSelect components infer the option and `@extra` types from their arguments', async function (assert) {
      const selectedSize = CLUSTER_SIZE_OPTIONS[0];
      const onChangeSingle = (option: ClusterSizeOption | undefined): void => {
        void option?.price;
      };
      const onChangeMultiple = (options: ClusterSizeOption[]): void => {
        void options.map((option) => option.price);
      };
      const wrongSelected = { name: 'not a cluster size' };

      await render(
        <template>
          <HdsFormKeyValueInputsField @rowIndex={{0}} as |F|>
            <F.SuperSelectSingle
              @options={{CLUSTER_SIZE_OPTIONS}}
              @selected={{selectedSize}}
              @onChange={{onChangeSingle}}
              @extra={{hash currency="USD"}}
              @selectedItemComponent={{SelectedClusterSize}}
              id="test-super-select-single"
              as |option|
            >
              {{option.size}}
              {{! @glint-expect-error - not a property of the option type }}
              {{option.name}}
            </F.SuperSelectSingle>
            <F.SuperSelectMultiple
              @options={{CLUSTER_SIZE_OPTIONS}}
              @selected={{CLUSTER_SIZE_OPTIONS}}
              @onChange={{onChangeMultiple}}
              @extra={{hash currency="USD"}}
              @selectedItemComponent={{SelectedClusterSizes}}
              id="test-super-select-multiple"
              as |option|
            >
              {{option.price}}
            </F.SuperSelectMultiple>
          </HdsFormKeyValueInputsField>
        </template>,
      );

      assert.dom('#test-super-select-single').hasText('Small (USD)');
      assert.dom('#test-super-select-multiple').includesText('Small (USD)');
      assert.dom('#test-super-select-multiple').includesText('Large (USD)');

      // type-only checks, not rendered
      if (false as boolean) {
        await render(
          <template>
            <HdsFormKeyValueInputsField @rowIndex={{0}} as |F|>
              <F.SuperSelectSingle
                @options={{CLUSTER_SIZE_OPTIONS}}
                {{! @glint-expect-error - not one of the options }}
                @selected={{wrongSelected}}
                @onChange={{onChangeSingle}}
                as |option|
              >
                {{option.size}}
              </F.SuperSelectSingle>
              <F.SuperSelectSingle
                @options={{CLUSTER_SIZE_OPTIONS}}
                @onChange={{onChangeSingle}}
                {{! @glint-expect-error - the selected item component expects a different @extra }}
                @extra={{hash currency="USD"}}
                @selectedItemComponent={{SelectedClusterSizeWrongExtra}}
                as |option|
              >
                {{option.size}}
              </F.SuperSelectSingle>
              <F.SuperSelectMultiple
                @options={{CLUSTER_SIZE_OPTIONS}}
                {{! @glint-expect-error - Multiple passes an array of options }}
                @onChange={{onChangeSingle}}
                as |option|
              >
                {{option.size}}
              </F.SuperSelectMultiple>
            </HdsFormKeyValueInputsField>
          </template>,
        );
      }
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFormKeyValueInputsField
            id="test-form-key-value-field"
            @rowIndex={{0}}
          />
        </template>,
      );
      assert
        .dom('#test-form-key-value-field')
        .hasClass('hds-form-key-value-inputs__field');
    });

    // LABEL HIDDEN TEXT

    test('it should render the label with screen-reader-only text based on the provided `@rowIndex` argument', async function (assert) {
      await render(
        <template>
          <HdsFormKeyValueInputsField
            id="test-form-key-value-field"
            @rowIndex={{0}}
            as |F|
          >
            <F.Label>Label</F.Label>
          </HdsFormKeyValueInputsField>
        </template>,
      );

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
      await render(
        <template>
          <HdsFormKeyValueInputsField
            id="test-form-key-value-field"
            @isRequired={{true}}
            @rowIndex={{0}}
            as |F|
          >
            <F.Label>Label</F.Label>
          </HdsFormKeyValueInputsField>
        </template>,
      );

      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-label',
        )
        .includesText('Required');
    });

    test('it should render as optional with `@isOptional` argument', async function (assert) {
      await render(
        <template>
          <HdsFormKeyValueInputsField
            id="test-form-key-value-field"
            @isOptional={{true}}
            @rowIndex={{0}}
            as |F|
          >
            <F.Label>Label</F.Label>
          </HdsFormKeyValueInputsField>
        </template>,
      );

      assert
        .dom(
          '#test-form-key-value-field .hds-form-key-value-inputs__field-label',
        )
        .includesText('(Optional)');
    });

    // YIELDED (CONTEXTUAL) COMPONENTS

    test('it renders the yielded `Label`, `HelperText`, and `Error` contextual components', async function (assert) {
      await createKeyValueInputsField({});
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
        await createKeyValueInputsField({ type });
        assert.dom(`#test-form-key-value-field ${selector}`).exists();
      });
    });

    // INVALID

    YIELDED_INPUTS.forEach(({ type, selector }) => {
      if (type !== 'FileInput') {
        // file input doesn't have an invalid state
        test(`it should render the "${type}" input as invalid if \`@isInvalid\` is true`, async function (assert) {
          await createKeyValueInputsField({ type, isInvalid: true });
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
        <template>
          <HdsFormKeyValueInputsField
            id="test-form-key-value-field"
            @width="50%"
            @rowIndex={{0}}
          />
        </template>,
      );
      assert
        .dom('#test-form-key-value-field')
        .hasAttribute('data-width', '50%');
    });

    // CALLBACKS

    test('it should call `@onInsert/@onRemove` callbacks when added/removed', async function (assert) {
      const context = new TrackedObject({
        isRendered: false,
        isInserted: false,
        isRemoved: false,
      });
      const onInsert = () => {
        context.isInserted = true;
      };
      const onRemove = () => {
        context.isRemoved = true;
      };

      await render(
        <template>
          {{#if context.isRendered}}
            <HdsFormKeyValueInputsField
              @onInsert={{onInsert}}
              @onRemove={{onRemove}}
              @rowIndex={{0}}
            />
          {{/if}}
        </template>,
      );

      assert.notOk(context.isInserted);
      assert.notOk(context.isRemoved);

      context.isRendered = true;
      await settled();
      assert.ok(context.isInserted);

      context.isRendered = false;
      await settled();
      assert.ok(context.isRemoved);
    });

    // ACCESSIBILITY

    YIELDED_INPUTS.forEach(({ type, selector }) => {
      ['default', 'custom'].forEach((mode) => {
        test(`it should associate the label and help text appropriately for the "${type}" input - ${mode === 'custom' ? 'with custom @id' : 'default'}`, async function (assert) {
          const extraAriaDescribedBy = 'extra';
          const opts: {
            type: string;
            extraAriaDescribedBy: string;
            id?: string;
          } = { type, extraAriaDescribedBy };
          if (mode === 'custom') {
            opts.id = 'custom-id';
          }
          await createKeyValueInputsField(opts);

          const label = find('#test-form-key-value-field .hds-form-label');
          const labelId = label?.id ?? '';

          const input = find(`#test-form-key-value-field ${selector}`);
          const inputId = input?.id ?? '';

          const helper = find(
            '#test-form-key-value-field .hds-form-key-value-inputs__field-helper-text',
          );
          const error = find(
            '#test-form-key-value-field .hds-form-key-value-inputs__field-error',
          );

          if (type === 'SuperSelectSingle' || type === 'SuperSelectMultiple') {
            assert
              .dom('#test-form-key-value-field [role="combobox"]')
              .hasAria('labelledby', labelId);
            assert
              .dom('#test-form-key-value-field [role="combobox"]')
              .hasAria(
                'describedby',
                `${helper?.id} ${error?.id} ${extraAriaDescribedBy}`,
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
                `${helper?.id} ${error?.id} ${extraAriaDescribedBy}`,
              );
          }
        });
      });
    });
  },
);
