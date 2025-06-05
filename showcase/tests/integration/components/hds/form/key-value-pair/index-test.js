/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/key-value-pair/index',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      this.set('createKeyValuePair', async (args = {}) => {
        this.data = args.data ?? [];
        return await render(hbs`
        <Hds::Form::KeyValuePair
          id="test-form-key-value-pair"
          @data={{this.data}}
        >
          <:header as |H|>
            <H.Legend>Legend</H.Legend>
            <H.HelperText>Helper text</H.HelperText>
            <H.Generic>
              <span id="header-generic">Generic content</span>
              </H.Generic>
            <H.Error>Error text</H.Error>
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
            <F.Generic>
              <span id="footer-generic">Generic content</span>
            </F.Generic>
          </:footer>
        </Hds::Form::KeyValuePair>
      `);
      });
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await this.createKeyValuePair();
      assert
        .dom('#test-form-key-value-pair')
        .hasClass('hds-form-key-value-pair');
    });

    // HEADER

    test('it should render the header content', async function (assert) {
      await this.createKeyValuePair();
      assert
        .dom('#test-form-key-value-pair .hds-form-key-value-pair__header')
        .exists();
      // await pauseTest(); // Wait for the header to render
      assert
        .dom(
          '#test-form-key-value-pair .hds-form-key-value-pair__header legend',
        )
        .hasText('Legend')
        .hasClass('hds-form-key-value-pair__legend');
      assert
        .dom(
          '#test-form-key-value-pair .hds-form-key-value-pair__header .hds-form-key-value-pair__helper-text',
        )
        .hasText('Helper text');
      assert
        .dom('#test-form-key-value-pair #header-generic')
        .hasText('Generic content');
      assert
        .dom(
          '#test-form-key-value-pair .hds-form-key-value-pair__header .hds-form-key-value-pair__error',
        )
        .hasText('Error text');
    });

    // ROW

    test('it should render the row content', async function (assert) {
      await this.createKeyValuePair();
      assert
        .dom('#test-form-key-value-pair .hds-form-key-value-pair__row')
        .exists();

      assert
        .dom(
          '#test-form-key-value-pair .hds-form-key-value-pair__row .hds-form-key-value-pair__field',
        )
        .exists();
      assert
        .dom('#test-form-key-value-pair #row-generic')
        .exists({ count: 1 })
        .hasText('Generic content');
    });

    test('it does not render the delete row button if `@data` is empty', async function (assert) {
      await this.createKeyValuePair();
      assert
        .dom(
          '#test-form-key-value-pair .hds-form-key-value-pair__row .hds-form-key-value-pair__delete-row-button',
        )
        .doesNotExist();
    });

    test('it does not render the delete row button if `@data` has 1 item', async function (assert) {
      await this.createKeyValuePair({
        data: [{ value: 'Test value' }],
      });
      assert
        .dom(
          '#test-form-key-value-pair .hds-form-key-value-pair__row .hds-form-key-value-pair__delete-row-button',
        )
        .doesNotExist();
    });

    test('it does render the delete row button if `@data` has more than 1 item', async function (assert) {
      await this.createKeyValuePair({
        data: [{ value: 'Test value' }, { value: 'Another value' }],
      });
      assert
        .dom(
          '#test-form-key-value-pair .hds-form-key-value-pair__row .hds-form-key-value-pair__delete-row-button',
        )
        .exists({ count: 2 });
    });

    // FOOTER

    test('it should render the footer content', async function (assert) {
      await this.createKeyValuePair();
      assert
        .dom('#test-form-key-value-pair .hds-form-key-value-pair__footer')
        .exists();
      assert
        .dom(
          '#test-form-key-value-pair .hds-form-key-value-pair__footer .hds-form-key-value-pair__add-row-button',
        )
        .exists()
        .hasText('Add row');
      assert
        .dom('#test-form-key-value-pair #footer-generic')
        .hasText('Generic content');
    });

    // ACCESSIBILITY

    test('it should match the label with the input using `for` and `id` attributes', async function (assert) {
      await this.createKeyValuePair();

      const legendId = document.querySelector(
        '#test-form-key-value-pair .hds-form-key-value-pair__header legend',
      ).id;

      assert.dom('#test-form-key-value-pair').hasAria('labelledby', legendId);
    });

    test('it should match the helper text ids to `aria-describedby` of the input', async function (assert) {
      await this.createKeyValuePair();
      const helperId = document.querySelector(
        '#test-form-key-value-pair .hds-form-key-value-pair__header .hds-form-key-value-pair__helper-text',
      ).id;

      const errorId = document.querySelector(
        '#test-form-key-value-pair .hds-form-key-value-pair__header .hds-form-key-value-pair__error',
      ).id;

      assert
        .dom('#test-form-key-value-pair')
        .hasAria('describedby', `${helperId} ${errorId}`);
    });
  },
);
