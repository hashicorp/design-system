/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click, fillIn, select } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsFilterBarFilterGroupNumerical,
  type HdsFilterBarNumericalFilter,
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
          <HdsFilterBarFilterGroupNumerical id="test-numerical" />
        </template>,
      );
      assert
        .dom('#test-numerical.hds-filter-bar__filter-group__numerical')
        .exists();
    });

    // KEYFILTER

    test('it should render the content from the filter data provided in the @keyFilter argument', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupNumerical @keyFilter={{SAMPLE_FILTER}} />
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

    // CALLBACKS: ONCHANHE

    test('it should call the onChange callback when the selector input changes', async function (assert) {
      const context = new TrackedObject<{
        isChanged: boolean;
        selector: HdsFilterBarNumericalFilterSelector | undefined;
        value: HdsFilterBarNumericalFilterValue | undefined;
      }>({
        isChanged: false,
        selector: undefined,
        value: undefined,
      });

      const onChange = (
        selector?: HdsFilterBarNumericalFilterSelector,
        value?: HdsFilterBarNumericalFilterValue,
      ) => {
        context.isChanged = true;
        context.selector = selector ?? undefined;
        context.value = value ?? undefined;
      };

      await render(
        <template>
          <HdsFilterBarFilterGroupNumerical @onChange={{onChange}} />
        </template>,
      );

      await select(
        '.hds-filter-bar__filter-group__numerical .hds-form-select',
        'less-than',
      );
      assert.ok(context.isChanged);
      assert.equal(context.selector, 'less-than');
    });

    test('it should call the onChange callback when the value input changes', async function (assert) {
      const context = new TrackedObject<{
        isChanged: boolean;
        selector: HdsFilterBarNumericalFilterSelector | undefined;
        value: HdsFilterBarNumericalFilterValue | undefined;
      }>({
        isChanged: false,
        selector: undefined,
        value: undefined,
      });

      const onChange = (
        selector?: HdsFilterBarNumericalFilterSelector,
        value?: HdsFilterBarNumericalFilterValue,
      ) => {
        context.isChanged = true;
        context.selector = selector ?? undefined;
        context.value = value ?? undefined;
      };

      await render(
        <template>
          <HdsFilterBarFilterGroupNumerical @onChange={{onChange}} />
        </template>,
      );

      await fillIn(
        '.hds-filter-bar__filter-group__numerical .hds-form-text-input',
        '10',
      );
      assert.ok(context.isChanged);
      assert.equal(context.value, '10');
    });

    test('it should call the onChange callback when the start and end inputs change', async function (assert) {
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

      const onChange = (
        selector?: HdsFilterBarNumericalFilterSelector,
        value?: HdsFilterBarNumericalFilterValue,
      ) => {
        context.isChanged = true;
        context.selector = selector ?? undefined;
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
          <HdsFilterBarFilterGroupNumerical @onChange={{onChange}} />
        </template>,
      );

      await select(
        '.hds-filter-bar__filter-group__numerical .hds-form-select',
        'between',
      );
      assert.equal(context.selector, 'between');
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
      assert.equal(context.valueStart, '10');
      assert.equal(context.valueEnd, '20');
    });

    test('it should call the onChange callback when the clear button is clicked', async function (assert) {
      const context = new TrackedObject<{
        isChanged: boolean;
        selector: HdsFilterBarNumericalFilterSelector | undefined;
        value: HdsFilterBarNumericalFilterValue | undefined;
      }>({
        isChanged: false,
        selector: undefined,
        value: undefined,
      });

      const onChange = (
        selector?: HdsFilterBarNumericalFilterSelector,
        value?: HdsFilterBarNumericalFilterValue,
      ) => {
        context.isChanged = true;
        context.selector = selector ?? undefined;
        context.value = value ?? undefined;
      };

      await render(
        <template>
          <HdsFilterBarFilterGroupNumerical @onChange={{onChange}} />
        </template>,
      );

      await select(
        '.hds-filter-bar__filter-group__numerical .hds-form-select',
        'less-than',
      );
      await fillIn(
        '.hds-filter-bar__filter-group__numerical .hds-form-text-input',
        '20',
      );
      assert.ok(context.isChanged);
      assert.equal(context.selector, 'less-than');
      assert.equal(context.value, '20');

      await click(
        '.hds-filter-bar__filter-group__numerical .hds-filter-bar__filter-group__clear .hds-button',
      );
      assert.equal(context.selector, undefined);
      assert.equal(context.value, undefined);
    });
  },
);
