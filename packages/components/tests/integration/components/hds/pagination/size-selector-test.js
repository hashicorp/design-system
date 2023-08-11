/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  select,
  render,
  resetOnerror,
  setupOnerror,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/pagination/size-selector',
  function (hooks) {
    setupRenderingTest(hooks);
    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(hbs`
      <Hds::Pagination::SizeSelector @pageSizes={{array 10 30 50}} id="test-pagination-size-selector" />
    `);
      assert
        .dom('#test-pagination-size-selector')
        .hasClass('hds-pagination-size-selector');
    });

    // CONTENT

    test('it should display options for the passed in page sizes', async function (assert) {
      await render(hbs`
      <Hds::Pagination::SizeSelector @pageSizes={{array 10 30 50}} />
    `);
      assert
        .dom('.hds-pagination-size-selector option[value="10"]')
        .hasText('10');
      assert
        .dom('.hds-pagination-size-selector option[value="30"]')
        .hasText('30');
      assert
        .dom('.hds-pagination-size-selector option[value="50"]')
        .hasText('50');
    });

    test('it should display the passed in @selectedSize as selected value', async function (assert) {
      await render(hbs`
        <Hds::Pagination::SizeSelector @pageSizes={{array 10 30 50}} @selectedSize={{30}} />
      `);
      assert.dom('.hds-pagination-size-selector select').hasValue('30');
    });

    test('it has a label with a "for" attribute value matching the select id value', async function (assert) {
      await render(hbs`
        <Hds::Pagination::SizeSelector @pageSizes={{array 10 30 50}} id="test-pagination-size-selector" />
      `);

      let controlId = this.element.querySelector('.hds-form-select').id;
      assert
        .dom('.hds-pagination-size-selector label')
        .hasAttribute('for', controlId);
    });

    test('the label text matches the default value if no custom value is set', async function (assert) {
      await render(hbs`
        <Hds::Pagination::SizeSelector @pageSizes={{array 10 30 50}} />
      `);
      assert
        .dom('.hds-pagination-size-selector label')
        .hasText('Items per page');
    });

    test('it displays the passed in custom text for the label text', async function (assert) {
      await render(hbs`
        <Hds::Pagination::SizeSelector @pageSizes={{array 10 30 50}} @label="Custom text" />
      `);
      assert.dom('.hds-pagination-size-selector label').hasText('Custom text');
    });

    // EVENTS

    test('it should call the onClick handler with the value of the page number', async function (assert) {
      let size;
      this.set('onChange', (pageSize) => (size = pageSize));
      await render(
        hbs`
        <Hds::Pagination::SizeSelector @pageSizes={{array 10 30 50}} @selectedSize={{10}} id="test-pagination-size-selector" @onChange={{this.onChange}} />
        `
      );
      await select('#test-pagination-size-selector select', '30'); // notice: '30' needs to be a string to work
      assert.strictEqual(size, 30); // notice: it's converted to an integer by the callback function
    });

    // ASSERTIONS

    test('it should throw an assertion if @pageSizes is not defined', async function (assert) {
      const errorMessage =
        '@pageSizes for "Pagination::SizeSelector" must be defined';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(hbs`<Hds::Pagination::SizeSelector />`);
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
    test('it should throw an assertion if @selectedSize is not one of the @pageSizes items', async function (assert) {
      const errorMessage =
        '@selectedSize for "Pagination::SizeSelector" must one of the @pageSizes provided (10,30,50), received 1234';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(
        hbs`<Hds::Pagination::SizeSelector @pageSizes={{array 10 30 50}} @selectedSize={{1234}} />`
      );
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  }
);
