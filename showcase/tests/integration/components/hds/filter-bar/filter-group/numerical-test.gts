/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, fillIn, select } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsFilterBarFilterGroupNumerical,
  type HdsFilterBarFilter,
  type HdsFilterBarNumericalFilter,
  type HdsFilterBarNumericalFilterData,
  type HdsFilterBarNumericalFilterSelector,
  type HdsFilterBarNumericalFilterValue,
} from '@hashicorp/design-system-components/components';

const SAMPLE_FILTER = {
  type: 'numerical',
  data: {
    selector: 'less-than',
    value: 10,
  },
} as HdsFilterBarNumericalFilter;

const SAMPLE_BETWEEN_FILTER = {
  type: 'numerical',
  data: {
    selector: 'between',
    value: {
      start: 10,
      end: 20,
    },
  },
} as HdsFilterBarNumericalFilter;

module(
  'Integration | Component | hds/filter-bar/filter-group/numerical',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupNumerical
            @key="test-key"
            id="test-numerical"
          />
        </template>,
      );
      assert
        .dom('#test-numerical.hds-filter-bar__filter-group__numerical')
        .exists();
    });

    // KEY

    test('it should set the name of the inputs correctly based on the @key argument', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupNumerical @key="test-key" />
        </template>,
      );
      assert
        .dom('.hds-filter-bar__filter-group__numerical .hds-form-select')
        .hasAttribute('name', 'test-key-selector');
      assert
        .dom('.hds-filter-bar__filter-group__numerical .hds-form-text-input')
        .hasAttribute('name', 'test-key-value');
      await select(
        '.hds-filter-bar__filter-group__numerical .hds-form-select',
        'between',
      );
      assert
        .dom(
          '.hds-filter-bar__filter-group__numerical .hds-filter-bar__filter-group__field--between:nth-of-type(1)',
        )
        .hasAttribute('name', 'test-key-between-start');
      assert
        .dom(
          '.hds-filter-bar__filter-group__numerical .hds-filter-bar__filter-group__field--between:nth-of-type(2)',
        )
        .hasAttribute('name', 'test-key-between-end');
    });

    // KEYFILTER

    test('it should render the content from the filter data provided in the @keyFilter argument', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupNumerical
            @key="test-key"
            @keyFilter={{SAMPLE_FILTER}}
          />
        </template>,
      );
      assert
        .dom('.hds-filter-bar__filter-group__numerical .hds-form-select')
        .hasValue('less-than');
      assert
        .dom('.hds-filter-bar__filter-group__numerical .hds-form-text-input')
        .hasValue('10');
    });

    test('it should render the content from the filter data provided in the @keyFilter argument for a filter with a between selector', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupNumerical
            @key="test-key"
            @keyFilter={{SAMPLE_BETWEEN_FILTER}}
          />
        </template>,
      );
      assert
        .dom('.hds-filter-bar__filter-group__numerical .hds-form-select')
        .hasValue('between');
      assert
        .dom('.hds-filter-bar__filter-group__field--between')
        .exists({ count: 2 });
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(1)')
        .hasValue('10');
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(2)')
        .hasValue('20');
    });

    // TEXT

    test('it should render the text provided in the @text argument in the legend', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupNumerical @key="test-key" @text="Name" />
        </template>,
      );
      assert
        .dom('.hds-filter-bar__filter-group__numerical legend')
        .hasText('Filter by Name');
    });

    // CALLBACKS: ONCHANGE

    test('it should call the onChange callback when the filter inputs are changed', async function (assert) {
      const context = new TrackedObject<{
        isChanged: boolean;
        selector: HdsFilterBarNumericalFilterSelector | undefined;
        value: HdsFilterBarNumericalFilterValue | undefined;
      }>({
        isChanged: false,
        selector: undefined,
        value: undefined,
      });

      const onChange = (filter?: HdsFilterBarFilter) => {
        context.isChanged = true;
        context.selector = filter
          ? (filter.data as HdsFilterBarNumericalFilterData).selector
          : undefined;
        context.value = filter
          ? (filter.data as HdsFilterBarNumericalFilterData).value
          : undefined;
      };

      await render(
        <template>
          <HdsFilterBarFilterGroupNumerical
            @key="test-key"
            @onChange={{onChange}}
          />
        </template>,
      );

      await select(
        '.hds-filter-bar__filter-group__numerical .hds-form-select',
        'less-than',
      );
      await fillIn(
        '.hds-filter-bar__filter-group__numerical .hds-form-text-input',
        '10',
      );
      assert.ok(context.isChanged);
      assert.equal(context.selector, 'less-than');
      assert.equal(context.value, '10');
    });

    test('it should call the onChange callback when the between selector inputs change', async function (assert) {
      const context = new TrackedObject<{
        isChanged: boolean;
        selector: HdsFilterBarNumericalFilterSelector | undefined;
        valueStart: number | undefined;
        valueEnd: number | undefined;
      }>({
        isChanged: false,
        selector: undefined,
        valueStart: undefined,
        valueEnd: undefined,
      });

      const onChange = (filter?: HdsFilterBarFilter) => {
        context.isChanged = true;
        context.selector = filter
          ? (filter.data as HdsFilterBarNumericalFilterData).selector
          : undefined;
        const value = filter
          ? (filter.data as HdsFilterBarNumericalFilterData).value
          : undefined;
        if (
          value &&
          typeof value === 'object' &&
          'start' in value &&
          'end' in value
        ) {
          context.valueStart = value.start;
          context.valueEnd = value.end;
        } else {
          context.valueStart = undefined;
          context.valueEnd = undefined;
        }
      };

      await render(
        <template>
          <HdsFilterBarFilterGroupNumerical
            @key="test-key"
            @onChange={{onChange}}
          />
        </template>,
      );

      await select(
        '.hds-filter-bar__filter-group__numerical .hds-form-select',
        'between',
      );
      assert
        .dom('.hds-filter-bar__filter-group__field--between')
        .exists({ count: 2 });

      await fillIn(
        '.hds-filter-bar__filter-group__field--between:nth-of-type(1)',
        '10',
      );
      await fillIn(
        '.hds-filter-bar__filter-group__field--between:nth-of-type(2)',
        '20',
      );
      assert.ok(context.isChanged);
      assert.equal(context.selector, 'between');
      assert.equal(context.valueStart, '10');
      assert.equal(context.valueEnd, '20');
    });
  },
);
