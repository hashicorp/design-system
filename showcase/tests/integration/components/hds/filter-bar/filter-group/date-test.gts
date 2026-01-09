/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, fillIn, select } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsFilterBarFilterGroupDate,
  type HdsFilterBarFilter,
  type HdsFilterBarDateFilter,
  type HdsFilterBarDateFilterData,
  type HdsFilterBarDateFilterSelector,
  type HdsFilterBarDateFilterValue,
} from '@hashicorp/design-system-components/components';

const SAMPLE_FILTER = {
  type: 'date',
  data: {
    selector: 'before',
    value: '2025-11-04',
  },
} as HdsFilterBarDateFilter;

const SAMPLE_BETWEEN_FILTER = {
  type: 'date',
  data: {
    selector: 'between',
    value: {
      start: '2024-11-04',
      end: '2025-11-04',
    },
  },
} as HdsFilterBarDateFilter;

module(
  'Integration | Component | hds/filter-bar/filter-group/date',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><HdsFilterBarFilterGroupDate id="test-date" /></template>,
      );
      assert.dom('#test-date.hds-filter-bar__filter-group__date').exists();
    });

    // TYPE

    test('it should render the date type inputs if no @type argument is provided', async function (assert) {
      await render(<template><HdsFilterBarFilterGroupDate /></template>);
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-label')
        .hasText('Date is');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-text-input')
        .hasAttribute('type', 'date');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-text-input')
        .hasAria('label', 'date value');

      await select(
        '.hds-filter-bar__filter-group__date .hds-form-select',
        'between',
      );

      assert
        .dom('.hds-filter-bar__filter-group__field--between')
        .exists({ count: 2 });
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(1)')
        .hasAttribute('type', 'date');
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(1)')
        .hasAria('label', 'date start value');
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(2)')
        .hasAttribute('type', 'date');
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(2)')
        .hasAria('label', 'date end value');
    });

    test('it should render the appropriate inputs if the @type argument is time', async function (assert) {
      await render(
        <template><HdsFilterBarFilterGroupDate @type="time" /></template>,
      );
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-label')
        .hasText('Time is');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-text-input')
        .hasAttribute('type', 'time');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-text-input')
        .hasAria('label', 'time value');

      await select(
        '.hds-filter-bar__filter-group__date .hds-form-select',
        'between',
      );

      assert
        .dom('.hds-filter-bar__filter-group__field--between')
        .exists({ count: 2 });
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(1)')
        .hasAttribute('type', 'time');
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(1)')
        .hasAria('label', 'time start value');
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(2)')
        .hasAttribute('type', 'time');
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(2)')
        .hasAria('label', 'time end value');
    });

    test('it should render the appropriate inputs if the @type argument is datetime', async function (assert) {
      await render(
        <template><HdsFilterBarFilterGroupDate @type="datetime" /></template>,
      );
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-label')
        .hasText('Datetime is');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-text-input')
        .hasAttribute('type', 'datetime-local');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-text-input')
        .hasAria('label', 'datetime value');

      await select(
        '.hds-filter-bar__filter-group__date .hds-form-select',
        'between',
      );

      assert
        .dom('.hds-filter-bar__filter-group__field--between')
        .exists({ count: 2 });
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(1)')
        .hasAttribute('type', 'datetime-local');
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(1)')
        .hasAria('label', 'datetime start value');
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(2)')
        .hasAttribute('type', 'datetime-local');
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(2)')
        .hasAria('label', 'datetime end value');
    });

    // TEXT

    test('it should render the text provided in the @text argument in the legend', async function (assert) {
      await render(
        <template><HdsFilterBarFilterGroupDate @text="Name" /></template>,
      );
      assert
        .dom('.hds-filter-bar__filter-group__date legend')
        .hasText('Filter by Name');
    });

    // KEYFILTER

    test('it should render the content from the filter data provided in the @keyFilter argument', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupDate @keyFilter={{SAMPLE_FILTER}} />
        </template>,
      );
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-select')
        .hasValue('before');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-text-input')
        .hasValue('2025-11-04');
    });

    test('it should render the content from the filter data provided in the @keyFilter argument for a filter with a between selector', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupDate @keyFilter={{SAMPLE_BETWEEN_FILTER}} />
        </template>,
      );
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-select')
        .hasValue('between');
      assert
        .dom('.hds-filter-bar__filter-group__field--between')
        .exists({ count: 2 });
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(1)')
        .hasValue('2024-11-04');
      assert
        .dom('.hds-filter-bar__filter-group__field--between:nth-of-type(2)')
        .hasValue('2025-11-04');
    });

    // CALLBACKS: ONCHANGE

    test('it should call the onChange callback when the filter inputs are changed', async function (assert) {
      const context = new TrackedObject<{
        isChanged: boolean;
        selector: HdsFilterBarDateFilterSelector | undefined;
        value: HdsFilterBarDateFilterValue | undefined;
      }>({
        isChanged: false,
        selector: undefined,
        value: undefined,
      });

      const onChange = (filter?: HdsFilterBarFilter) => {
        context.isChanged = true;
        context.selector = filter
          ? (filter.data as HdsFilterBarDateFilterData).selector
          : undefined;
        context.value = filter
          ? (filter.data as HdsFilterBarDateFilterData).value
          : undefined;
      };

      await render(
        <template>
          <HdsFilterBarFilterGroupDate @onChange={{onChange}} />
        </template>,
      );

      await select(
        '.hds-filter-bar__filter-group__date .hds-form-select',
        'before',
      );
      await fillIn(
        '.hds-filter-bar__filter-group__date .hds-form-text-input',
        '2025-11-04',
      );
      assert.ok(context.isChanged);
      assert.equal(context.selector, 'before');
      assert.equal(context.value, '2025-11-04');
    });

    test('it should call the onChange callback when the the between selector inputs change', async function (assert) {
      const context = new TrackedObject<{
        isChanged: boolean;
        selector: HdsFilterBarDateFilterSelector | undefined;
        valueStart: string | undefined;
        valueEnd: string | undefined;
      }>({
        isChanged: false,
        selector: undefined,
        valueStart: undefined,
        valueEnd: undefined,
      });

      const onChange = (filter?: HdsFilterBarFilter) => {
        context.isChanged = true;
        context.selector = filter
          ? (filter.data as HdsFilterBarDateFilterData).selector
          : undefined;
        const value = filter
          ? (filter.data as HdsFilterBarDateFilterData).value
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
          <HdsFilterBarFilterGroupDate @onChange={{onChange}} />
        </template>,
      );

      await select(
        '.hds-filter-bar__filter-group__date .hds-form-select',
        'between',
      );
      assert
        .dom('.hds-filter-bar__filter-group__field--between')
        .exists({ count: 2 });

      await fillIn(
        '.hds-filter-bar__filter-group__field--between:nth-of-type(1)',
        '2024-11-04',
      );
      await fillIn(
        '.hds-filter-bar__filter-group__field--between:nth-of-type(2)',
        '2025-11-04',
      );
      assert.ok(context.isChanged);
      assert.equal(context.selector, 'between');
      assert.equal(context.valueStart, '2024-11-04');
      assert.equal(context.valueEnd, '2025-11-04');
    });
  },
);
