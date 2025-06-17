/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/key-value-inputs/index',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      this.set('createKeyValueInputs', async (args = {}) => {
        this.data = args.data ?? [];
        return await render(hbs`
        <Hds::Form::KeyValueInputs
          id="test-form-key-value-inputs"
          @data={{this.data}}
        >
          <:header as |H|>
            <H.Legend>Legend</H.Legend>
            <H.HelperText>Helper text</H.HelperText>
            <H.Generic>
              <span id="header-generic">Generic content</span>
              </H.Generic>
          </:header>

          <:row as |R|>
            <R.Field as |F|>
               <F.Label>Value</F.Label>
               <F.HelperText>Helper text</F.HelperText>
        <F.Textarea @value={{R.rowData.value}} />
        <F.Error>Error text</F.Error>
            </R.Field>
            <R.Generic>
              <span id="row-generic">Generic content</span>
            </R.Generic>
            <R.DeleteRowButton />
          </:row>

          <:footer as |F|>
            <F.AddRowButton />
            <F.Alert as |A|>
              <A.Description>Alert content</A.Description>
            </F.Alert>
            <F.Error>Error text</F.Error>
          </:footer>
        </Hds::Form::KeyValueInputs>
      `);
      });
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await this.createKeyValueInputs();
      assert
        .dom('#test-form-key-value-inputs')
        .hasClass('hds-form-key-value-inputs');
    });

    // HEADER

    test('it should render the header content', async function (assert) {
      await this.createKeyValueInputs();
      assert
        .dom('#test-form-key-value-inputs .hds-form-key-value-inputs__header')
        .exists();

      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__header legend',
        )
        .hasText('Legend')
        .hasClass('hds-form-key-value-inputs__legend');
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__header .hds-form-key-value-inputs__helper-text',
        )
        .hasText('Helper text');
      assert
        .dom('#test-form-key-value-inputs #header-generic')
        .hasText('Generic content');
    });

    // ROW

    test('it should render the row content', async function (assert) {
      await this.createKeyValueInputs();
      assert
        .dom('#test-form-key-value-inputs .hds-form-key-value-inputs__row')
        .exists();

      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__row .hds-form-key-value-inputs__field',
        )
        .exists();
      assert
        .dom('#test-form-key-value-inputs #row-generic')
        .exists({ count: 1 })
        .hasText('Generic content');
    });

    test('it does not render the delete row button if `@data` is empty', async function (assert) {
      await this.createKeyValueInputs();
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__row .hds-form-key-value-inputs__delete-row-button',
        )
        .doesNotExist();
    });

    test('it does not render the delete row button if `@data` has 1 item', async function (assert) {
      await this.createKeyValueInputs({
        data: [{ value: 'Test value' }],
      });
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__row .hds-form-key-value-inputs__delete-row-button',
        )
        .doesNotExist();
    });

    test('it does render the delete row button if `@data` has more than 1 item', async function (assert) {
      await this.createKeyValueInputs({
        data: [{ value: 'Test value' }, { value: 'Another value' }],
      });
      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__row .hds-form-key-value-inputs__delete-row-button',
        )
        .exists({ count: 2 });
    });

    // FOOTER

    test('it should render the footer content', async function (assert) {
      await this.createKeyValueInputs();
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
        .hasText('Alert content');
      assert
        .dom('#test-form-key-value-inputs .hds-alert')
        .hasClass('hds-alert--type-compact')
        .hasClass('hds-alert--color-neutral');

      assert
        .dom('#test-form-key-value-inputs .hds-form-key-value-inputs__error')
        .hasText('Error text');
    });

    // STYLES

    test('it should set the appropriate column indexes for the generic content and delete row button', async function (assert) {
      await this.createKeyValueInputs({
        data: [{ value: 'Test value' }, { value: 'Another value' }],
      });

      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__row-delete-button-container',
        )
        .hasStyle({ '--hds-key-value-pair-column-index': '3' });

      assert
        .dom(
          '#test-form-key-value-inputs .hds-form-key-value-inputs__yield-container',
        )
        .hasStyle({ '--hds-key-value-pair-column-index': '2' });
    });

    test('it should set the appropriate grid-column-template for the rows without custom widths', async function (assert) {
      await this.createKeyValueInputs({
        data: [{ value: 'Test value' }, { value: 'Another value' }],
      });

      assert
        .dom('#test-form-key-value-inputs')
        .hasStyle({ '--hds-key-value-pair-columns': '1fr auto min-content' });
    });

    test('it should set the appropriate grid-column-template for the rows with custom widths', async function (assert) {
      this.data = [{ value: 'Test value' }, { value: 'Another value' }];
      await render(hbs`
        <Hds::Form::KeyValueInputs
          id="test-form-key-value-inputs"
          @data={{this.data}}
        >
          <:row as |R|>
            <R.Field @width="200px" as |F|>
               <F.Label>Value</F.Label>
               <F.HelperText>Helper text</F.HelperText>
        <F.Textarea @value={{R.rowData.value}} />
        <F.Error>Error text</F.Error>
            </R.Field>
            <R.Generic>
              <span id="row-generic">Generic content</span>
            </R.Generic>
            <R.DeleteRowButton />
          </:row>
        </Hds::Form::KeyValueInputs>
      `);

      assert
        .dom('#test-form-key-value-inputs .hds-form-key-value-inputs__field')
        .hasAttribute('data-width', '200px');

      assert
        .dom('#test-form-key-value-inputs')
        .hasStyle({ '--hds-key-value-pair-columns': '200px auto min-content' });
    });

    test('it should update the appropriate grid-column-template for the rows without custom widths', async function (assert) {
      await this.createKeyValueInputs({
        data: [{ value: 'Test value' }],
      });

      assert
        .dom('#test-form-key-value-inputs')
        .hasStyle({ '--hds-key-value-pair-columns': '1fr auto' });

      this.set('data', [{ value: 'Test value' }, { value: 'Another value' }]);

      assert
        .dom('#test-form-key-value-inputs')
        .hasStyle({ '--hds-key-value-pair-columns': '1fr auto min-content' });

      this.set('data', [{ value: 'Test value' }]);

      assert
        .dom('#test-form-key-value-inputs')
        .hasStyle({ '--hds-key-value-pair-columns': '1fr auto' });
    });

    // ACCESSIBILITY

    test('it should match the label with the input using `for` and `id` attributes', async function (assert) {
      await this.createKeyValueInputs();

      const legendId = document.querySelector(
        '#test-form-key-value-inputs .hds-form-key-value-inputs__header legend',
      ).id;

      assert.dom('#test-form-key-value-inputs').hasAria('labelledby', legendId);
    });

    test('it should match the helper text ids to `aria-describedby` of the input', async function (assert) {
      await this.createKeyValueInputs();
      const helperId = document.querySelector(
        '#test-form-key-value-inputs .hds-form-key-value-inputs__header .hds-form-key-value-inputs__helper-text',
      ).id;

      const errorId = document.querySelector(
        '#test-form-key-value-inputs .hds-form-key-value-inputs__error',
      ).id;

      assert
        .dom('#test-form-key-value-inputs')
        .hasAria('describedby', `${helperId} ${errorId}`);
    });
  },
);
