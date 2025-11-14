/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { array } from '@ember/helper';
import {
  find,
  render,
  resetOnerror,
  select,
  setupOnerror,
} from '@ember/test-helpers';

import { HdsPaginationSizeSelector } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/pagination/size-selector',
  function (hooks) {
    setupRenderingTest(hooks);
    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsPaginationSizeSelector
            @pageSizes={{array 10 30 50}}
            id="test-pagination-size-selector"
          />
        </template>,
      );
      assert
        .dom('#test-pagination-size-selector')
        .hasClass('hds-pagination-size-selector');
    });

    // CONTENT

    test('it should display options for the passed in page sizes', async function (assert) {
      await render(
        <template>
          <HdsPaginationSizeSelector @pageSizes={{array 10 30 50}} />
        </template>,
      );
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
      await render(
        <template>
          <HdsPaginationSizeSelector
            @pageSizes={{array 10 30 50}}
            @selectedSize={{30}}
          />
        </template>,
      );
      assert.dom('.hds-pagination-size-selector select').hasValue('30');
    });

    test('it has a label with a "for" attribute value matching the select id value', async function (assert) {
      await render(
        <template>
          <HdsPaginationSizeSelector
            @pageSizes={{array 10 30 50}}
            id="test-pagination-size-selector"
          />
        </template>,
      );

      const control = find('.hds-form-select');
      const controlId = control?.id ?? '';

      assert
        .dom('.hds-pagination-size-selector label')
        .hasAttribute('for', controlId);
    });

    test('the label text matches the default value if no custom value is set', async function (assert) {
      await render(
        <template>
          <HdsPaginationSizeSelector @pageSizes={{array 10 30 50}} />
        </template>,
      );
      assert
        .dom('.hds-pagination-size-selector label')
        .hasText('Items per page');
    });

    test('it displays the passed in custom text for the label text', async function (assert) {
      await render(
        <template>
          <HdsPaginationSizeSelector
            @pageSizes={{array 10 30 50}}
            @label="Custom text"
          />
        </template>,
      );
      assert.dom('.hds-pagination-size-selector label').hasText('Custom text');
    });

    // EVENTS

    test('it should call the onClick handler with the value of the page number', async function (assert) {
      let size;
      const onChange = (pageSize: number) => (size = pageSize);

      await render(
        <template>
          <HdsPaginationSizeSelector
            @pageSizes={{array 10 30 50}}
            @selectedSize={{10}}
            id="test-pagination-size-selector"
            @onChange={{onChange}}
          />
        </template>,
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
      await render(
        <template>
          {{! @glint-expect-error - testing invalid component usage }}
          <HdsPaginationSizeSelector />
        </template>,
      );
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
        <template>
          <HdsPaginationSizeSelector
            @pageSizes={{array 10 30 50}}
            @selectedSize={{1234}}
          />
        </template>,
      );
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  },
);
