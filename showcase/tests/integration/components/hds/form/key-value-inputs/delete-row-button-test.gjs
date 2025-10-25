/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click, fillIn } from '@ember/test-helpers';
import DeleteRowButton from "@hashicorp/design-system-components/components/hds/form/key-value-inputs/delete-row-button";
import KeyValueInputs from "@hashicorp/design-system-components/components/hds/form/key-value-inputs/index";

module(
  'Integration | Component | hds/form/key-value-inputs/delete-row-button',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><DeleteRowButton id="test-form-key-value-delete-row-button" @rowIndex={{0}} /></template>,
      );
      assert
        .dom('#test-form-key-value-delete-row-button')
        .hasClass('hds-form-key-value-inputs__delete-row-button');
    });

    // TEXT

    test('it should render with default text', async function (assert) {
      await render(
        <template><DeleteRowButton id="test-form-key-value-delete-row-button" @rowIndex={{0}} /></template>,
      );
      assert
        .dom('#test-form-key-value-delete-row-button')
        .hasAria('label', 'Delete row 1');
    });

    test('it should render text from `@text` argument', async function (assert) {
      await render(
        <template><DeleteRowButton @text="Custom text" id="test-form-key-value-delete-row-button" @rowIndex={{0}} /></template>,
      );
      assert
        .dom('#test-form-key-value-delete-row-button')
        .hasAria('label', 'Custom text');
    });

    // CALLBACKS

    test('it should call `@onClick` action when clicked and return rowData/rowIndex as positional arguments', async function (assert) {
      const rowData = { test: true };
      const rowIndex = 5;
      this.set('rowData', rowData);
      this.set('rowIndex', rowIndex);
      let clicked = false;
      this.set(
        'onClick',
        function (passedRowData, passedRowIndex) {
          clicked = true;
          this.set('passedRowData', passedRowData);
          this.set('passedRowIndex', passedRowIndex);
        }.bind(this),
      );

      await render(
        <template><DeleteRowButton @onClick={{this.onClick}} @rowData={{this.rowData}} @rowIndex={{this.rowIndex}} id="test-form-key-value-delete-row-button" /></template>,
      );

      await click('#test-form-key-value-delete-row-button');
      assert.ok(clicked);
      assert.strictEqual(
        this.passedRowData,
        rowData,
        'rowData is passed as first argument',
      );
      assert.strictEqual(
        this.passedRowIndex,
        rowIndex,
        'rowIndex is passed as second argument',
      );
    });

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
            <DeleteRowButton @onInsert={{this.onInsert}} @onRemove={{this.onRemove}} />
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

    // RETURN FOCUS

    test('it returns focus to the main frameset when a row is deleted and the `DeleteRowButton` element removed from the DOM', async function (assert) {
      this.data = [
        { key: 'Test key', value: 'Test value' },
        { key: 'Another key', value: 'Another value' },
      ];
      this.set(
        'onClick',
        function (_passedRowData, passedRowIndex) {
          this.set(
            'data',
            this.data.filter((_row, idx) => idx !== passedRowIndex),
          );
        }.bind(this),
      );

      await render(<template>
        <KeyValueInputs id="test-form-key-value-inputs" @data={{this.data}}>
          <:row as |R|>
            {{#let R.rowIndex as |index|}}
              <R.Field as |F|>
                <F.Label>Label</F.Label>
                <F.TextInput data-test-input="row-{{index}}" />
              </R.Field>
              <R.Generic />
              <R.DeleteRowButton data-test-button="row-{{index}}" @onClick={{this.onClick}} />
            {{/let}}
          </:row>
        </KeyValueInputs>
      </template>);

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
