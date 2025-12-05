/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, find } from '@ember/test-helpers';
import { get } from '@ember/helper';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

const createKeyValueInputs = async (options: {
  data?: Record<string, unknown>[];
  isFieldsetRequired?: boolean;
  isFieldsetOptional?: boolean;
  extraAriaDescribedBy?: string;
}) => {
  const data = options?.data ?? [];

  return await render(
    <template>
      <HdsFormKeyValueInputs
        id="test-form-key-value-inputs"
        @data={{data}}
        @isRequired={{options.isFieldsetRequired}}
        @isOptional={{options.isFieldsetOptional}}
        @extraAriaDescribedBy={{options.extraAriaDescribedBy}}
      >
        <:header as |H|>
          <H.Legend>Legend</H.Legend>
          <H.HelperText>Helper text</H.HelperText>
          <H.Generic>
            <span id="header-generic">Generic content</span>
          </H.Generic>
        </:header>

        <:row as |R|>
          <R.DeleteRowButton />
          <R.Field as |F|>
            <F.Label>Value</F.Label>
            <F.HelperText>Helper text</F.HelperText>
            {{! @glint-expect-error }}
            <F.Textarea @value={{get R.rowData "value"}} />
            <F.Error>Error text</F.Error>
          </R.Field>
          <R.Generic>Generic content</R.Generic>
        </:row>

        <:footer as |F|>
          <F.AddRowButton />
          <F.Alert as |A|>
            <A.Description>Alert content</A.Description>
          </F.Alert>
          <F.Error>Error text</F.Error>
        </:footer>
      </HdsFormKeyValueInputs>
    </template>,
  );
};

module(
  'Integration | Component | hds/form/key-value-inputs/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await createKeyValueInputs({});
      assert
        .dom('#test-form-key-value-inputs')
        .hasClass('hds-form-key-value-inputs');
    });

    // HEADER

    test('it should render the header content', async function (assert) {
      await createKeyValueInputs({});
      assert
        .dom('#test-form-key-value-inputs .hds-form-key-value-inputs__header')
        .exists();
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__header legend',
        )
        .hasText('Legend')
        .hasClass('hds-form-key-value-inputs__legend')
        .hasAttribute('id', /^legend-/);
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__header .hds-form-key-value-inputs__helper-text',
        )
        .hasText('Helper text');
      assert
        .dom('#test-form-key-value-inputs #header-generic')
        .hasText('Generic content');
    });
    test('it should render the "required" indicator in the legend', async function (assert) {
      await createKeyValueInputs({ isFieldsetRequired: true });
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__header legend .hds-form-indicator.hds-badge--color-neutral',
        )
        .exists();
    });
    test('it should render the "optional" indicator in the legend', async function (assert) {
      await createKeyValueInputs({ isFieldsetOptional: true });
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__header legend .hds-form-indicator.hds-form-indicator--optional',
        )
        .exists();
    });

    // ROW

    test('it should render the row content if the data argument is an empty array', async function (assert) {
      await createKeyValueInputs({});
      assert
        .dom('#test-form-key-value-inputs .hds-form-key-value-inputs__row')
        .exists({ count: 1 });
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__row .hds-form-key-value-inputs__field',
        )
        .exists({ count: 1 });
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__generic-container',
        )
        .exists({ count: 1 });
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__delete-row-button-container',
        )
        .matchesSelector(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__row > :last-child',
        );
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__delete-row-button',
        )
        .exists({ count: 1 });
    });

    test('it should render the row content if the data argument has entries', async function (assert) {
      await createKeyValueInputs({
        data: [{ value: 'Test value' }, { value: 'Another value' }],
      });
      assert
        .dom('#test-form-key-value-inputs .hds-form-key-value-inputs__row')
        .exists({ count: 2 });
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__row .hds-form-key-value-inputs__field',
        )
        .exists({ count: 2 });

      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__generic-container',
        )
        .exists({ count: 2 });
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__delete-row-button',
        )
        .exists({ count: 2 });
    });

    test('it should yield `rowData` and `rowIndex`', async function (assert) {
      const data = [{ key: 'Test key', value: 'Test value' }];
      await render(
        <template>
          <HdsFormKeyValueInputs id="test-form-key-value-inputs" @data={{data}}>
            <:row as |R|>
              <R.Generic>
                This row has R.rowIndex={{R.rowIndex}}
                / R.rowData.key={{R.rowData.key}}
                / R.rowData.value={{R.rowData.value}}
              </R.Generic>
            </:row>
          </HdsFormKeyValueInputs>
        </template>,
      );
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__generic-container',
        )
        .hasText(
          `This row has R.rowIndex=0 / R.rowData.key=${data[0] ? data[0].key : ''} / R.rowData.value=${data[0] ? data[0].value : ''}`,
        );
    });

    // FOOTER

    test('it should render the footer content', async function (assert) {
      await createKeyValueInputs({});
      assert
        .dom('#test-form-key-value-inputs .hds-form-key-value-inputs__footer')
        .exists();
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__footer .hds-form-key-value-inputs__add-row-button',
        )
        .exists()
        .hasText('Add row');
      assert
        .dom('#test-form-key-value-inputs .hds-alert')
        .hasClass('hds-alert--type-compact')
        .hasClass('hds-alert--color-neutral')
        .hasText('Alert content');
      assert
        .dom('#test-form-key-value-inputs .hds-form-key-value-inputs__error')
        .hasText('Error text');
    });

    // INLINE STYLES FOR GRID LAYOUT

    test('it should set the appropriate column indexes for some row children (generic + button) if there is no data', async function (assert) {
      await createKeyValueInputs({});
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__generic-container',
        )
        .hasStyle({ '--hds-key-value-inputs-column-index': '2' });
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__delete-row-button-container',
        )
        .hasStyle({ '--hds-key-value-inputs-column-index': '3' });
    });

    test('it should set the appropriate column indexes for some row children (generic + button) when there is complex row content and data', async function (assert) {
      const data = [
        { key: 'Test key', value: 'Test value' },
        { key: 'Another key', value: 'Another value' },
      ];

      await render(
        <template>
          <HdsFormKeyValueInputs id="test-form-key-value-inputs" @data={{data}}>
            <:header as |H|>
              <H.Legend>Legend</H.Legend>
            </:header>
            <:row as |R|>
              <R.Field as |F|>
                <F.Label>Key</F.Label>
                <F.TextInput />
              </R.Field>
              <R.Generic data-test-generic-1>
                Generic content
              </R.Generic>
              <R.Field as |F|>
                <F.Label>Value</F.Label>
                <F.Textarea />
              </R.Field>
              <R.DeleteRowButton />
              {{! Adding generic content after the delete row button to ensure it is actually rendered in a column before the delete icon }}
              <R.Generic data-test-generic-2>
                Generic content
              </R.Generic>
            </:row>
          </HdsFormKeyValueInputs>
        </template>,
      );
      assert
        .dom('#test-form-key-value-inputs [data-test-generic-1]')
        .hasStyle({ '--hds-key-value-inputs-column-index': '2' });

      assert
        .dom('#test-form-key-value-inputs [data-test-generic-2]')
        .hasStyle({ '--hds-key-value-inputs-column-index': '4' });
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__delete-row-button-container',
        )
        .hasStyle({ '--hds-key-value-inputs-column-index': '5' });
    });

    // CUSTOM WIDTHS

    test('it should set the appropriate `grid-template-columns` CSS property via `--hds-key-value-inputs-columns` for the rows without custom widths', async function (assert) {
      await createKeyValueInputs({
        data: [{ value: 'Test value' }, { value: 'Another value' }],
      });

      assert
        .dom('#test-form-key-value-inputs')
        .hasStyle({ '--hds-key-value-inputs-columns': '1fr auto 2.25rem' });
    });

    test('it should set the appropriate `grid-template-columns` CSS property via `--hds-key-value-inputs-columns` for the rows with complex structure', async function (assert) {
      const data = [
        { key: 'Test key', value: 'Test value' },
        { key: 'Another key', value: 'Another value' },
      ];
      await render(
        <template>
          <HdsFormKeyValueInputs id="test-form-key-value-inputs" @data={{data}}>
            <:row as |R|>
              <R.Field />
              <R.Generic />
              <R.Field />
              <R.Generic />
              <R.DeleteRowButton />
            </:row>
          </HdsFormKeyValueInputs>
        </template>,
      );
      assert.dom('#test-form-key-value-inputs').hasStyle({
        '--hds-key-value-inputs-columns': '1fr auto 1fr auto 2.25rem',
      });
    });

    test('it should set the appropriate `grid-template-columns` CSS property via `--hds-key-value-inputs-columns` for the row when there is no data and no yielded delete button', async function (assert) {
      const data: never[] = [];

      await render(
        <template>
          <HdsFormKeyValueInputs id="test-form-key-value-inputs" @data={{data}}>
            <:row as |R|>
              <R.Field />
              <R.Generic />
            </:row>
          </HdsFormKeyValueInputs>
        </template>,
      );
      assert
        .dom('#test-form-key-value-inputs')
        // per design specs, the last column is always set to provide space for the delete button, even if the button is not rendered, to avoid layout shifts
        .hasStyle({ '--hds-key-value-inputs-columns': '1fr auto 2.25rem' });
    });

    test('it should set the appropriate `grid-template-columns` CSS property via `--hds-key-value-inputs-columns` for the rows with custom widths', async function (assert) {
      const data = [{ value: 'Test value' }, { value: 'Another value' }];
      await render(
        <template>
          <HdsFormKeyValueInputs id="test-form-key-value-inputs" @data={{data}}>
            <:row as |R|>
              <R.Field @width="200px" />
              <R.Generic />
              <R.DeleteRowButton />
            </:row>
          </HdsFormKeyValueInputs>
        </template>,
      );

      assert
        .dom('#test-form-key-value-inputs .hds-form-key-value-inputs__field')
        .hasAttribute('data-width', '200px');

      assert.dom('#test-form-key-value-inputs').hasStyle({
        '--hds-key-value-inputs-columns': '200px auto 2.25rem',
      });
    });

    // ACCESSIBILITY

    test('it should associate together the fieldset and its legend, help text and error', async function (assert) {
      const extraAriaDescribedBy = 'extra';
      await createKeyValueInputs({ extraAriaDescribedBy });

      const legend = find(
        '#test-form-key-value-inputs .hds-form-key-value-inputs__header legend',
      );
      const legendId = legend?.id ?? '';
      const helper = find(
        '#test-form-key-value-inputs .hds-form-key-value-inputs__header .hds-form-key-value-inputs__helper-text',
      );
      const error = find(
        '#test-form-key-value-inputs .hds-form-key-value-inputs__error',
      );

      assert.dom('#test-form-key-value-inputs').hasAria('labelledby', legendId);
      assert
        .dom('#test-form-key-value-inputs')
        .hasAria(
          'describedby',
          `${helper?.id} ${error?.id} ${extraAriaDescribedBy}`,
        );
    });
  },
);
