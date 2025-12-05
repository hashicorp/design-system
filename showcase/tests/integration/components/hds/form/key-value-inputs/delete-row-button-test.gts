/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, click, fillIn, settled } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsFormKeyValueInputs,
  HdsFormKeyValueInputsDeleteRowButton,
} from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/form/key-value-inputs/delete-row-button',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      const rowData = { test: true };
      await render(
        <template>
          <HdsFormKeyValueInputsDeleteRowButton
            id="test-form-key-value-delete-row-button"
            @rowIndex={{0}}
            @rowData={{rowData}}
          />
        </template>,
      );
      assert
        .dom('#test-form-key-value-delete-row-button')
        .hasClass('hds-form-key-value-inputs__delete-row-button');
    });

    // TEXT

    test('it should render with default text', async function (assert) {
      const rowData = { test: true };
      await render(
        <template>
          <HdsFormKeyValueInputsDeleteRowButton
            id="test-form-key-value-delete-row-button"
            @rowIndex={{0}}
            @rowData={{rowData}}
          />
        </template>,
      );
      assert
        .dom('#test-form-key-value-delete-row-button')
        .hasAria('label', 'Delete row 1');
    });

    test('it should render text from `@text` argument', async function (assert) {
      const rowData = { test: true };
      await render(
        <template>
          <HdsFormKeyValueInputsDeleteRowButton
            @text="Custom text"
            id="test-form-key-value-delete-row-button"
            @rowIndex={{0}}
            @rowData={{rowData}}
          />
        </template>,
      );
      assert
        .dom('#test-form-key-value-delete-row-button')
        .hasAria('label', 'Custom text');
    });

    // CALLBACKS

    test('it should call `@onClick` action when clicked and return rowData/rowIndex as positional arguments', async function (assert) {
      const rowData = { test: true };
      const rowIndex = 5;

      const context = new TrackedObject<{
        isClicked: boolean;
        passedRowData: unknown;
        passedRowIndex: number | undefined;
      }>({
        isClicked: false,
        passedRowData: undefined,
        passedRowIndex: undefined,
      });

      const onClick = (rowData: unknown, rowIndex: number) => {
        context.isClicked = true;
        context.passedRowData = rowData;
        context.passedRowIndex = rowIndex;
      };

      await render(
        <template>
          <HdsFormKeyValueInputsDeleteRowButton
            @onClick={{onClick}}
            @rowData={{rowData}}
            @rowIndex={{rowIndex}}
            id="test-form-key-value-delete-row-button"
          />
        </template>,
      );

      await click('#test-form-key-value-delete-row-button');
      assert.ok(context.isClicked);
      assert.strictEqual(
        context.passedRowData,
        rowData,
        'rowData is passed as first argument',
      );
      assert.strictEqual(
        context.passedRowIndex,
        rowIndex,
        'rowIndex is passed as second argument',
      );
    });

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
            <HdsFormKeyValueInputsDeleteRowButton
              @onInsert={{onInsert}}
              @onRemove={{onRemove}}
              @rowIndex={{0}}
              @rowData={{null}}
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

    // RETURN FOCUS

    test('it returns focus to the main frameset when a row is deleted and the `DeleteRowButton` element removed from the DOM', async function (assert) {
      const context = new TrackedObject({
        data: [
          { key: 'Test key', value: 'Test value' },
          { key: 'Another key', value: 'Another value' },
        ],
      });

      const onClick = function (
        _passedRowData: unknown,
        passedRowIndex: number,
      ) {
        context.data = context.data.filter(
          (_row, index) => index !== passedRowIndex,
        );
      };

      await render(
        <template>
          <HdsFormKeyValueInputs
            id="test-form-key-value-inputs"
            @data={{context.data}}
          >
            <:row as |R|>
              {{#let R.rowIndex as |index|}}
                <R.Field as |F|>
                  <F.Label>Label</F.Label>
                  <F.TextInput data-test-input="row-{{index}}" />
                </R.Field>
                <R.Generic />
                <R.DeleteRowButton
                  data-test-button="row-{{index}}"
                  @onClick={{onClick}}
                />
              {{/let}}
            </:row>
          </HdsFormKeyValueInputs>
        </template>,
      );

      const inputSelector =
        '#test-form-key-value-inputs [data-test-input="row-1"]';
      const buttonSelector =
        '#test-form-key-value-inputs [data-test-button="row-1"]';
      await fillIn(inputSelector, 'test');
      assert.dom(inputSelector).isFocused();
      await click(buttonSelector);
      assert.dom('#test-form-key-value-inputs').isFocused();
    });
  },
);
