/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsFilterBarAppliedFilters,
  type HdsFilterBarFilters,
} from '@hashicorp/design-system-components/components';

const EMPTY_FILTERS = {};

const FILTERS = {
  'single-select': {
    'single-select-1': {
      type: 'single-select',
      text: 'Single-select',
      data: {
        value: '1',
        label: 'Option 1',
      },
    },
    'single-select-2': {
      type: 'single-select',
      text: 'Single-select',
      data: {
        value: 'value-without-label',
      },
    },
  },
  'multi-select': {
    'multi-select-1': {
      type: 'multi-select',
      text: 'Multi-select',
      data: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
      ],
    },
    'multi-select-2': {
      type: 'multi-select',
      text: 'Multi-select',
      data: [
        { value: 'value-without-label-1' },
        { value: 'value-without-label-2' },
      ],
    },
  },
  numerical: {
    numerical: {
      type: 'numerical',
      text: 'Numerical',
      data: {
        selector: 'less-than',
        value: 10,
      },
    },
    'numerical-2': {
      type: 'numerical',
      text: 'Numerical',
      data: {
        selector: 'less-than-or-equal-to',
        value: 10,
      },
    },
    'numerical-3': {
      type: 'numerical',
      text: 'Numerical',
      data: {
        selector: 'equal-to',
        value: 10,
      },
    },
    'numerical-4': {
      type: 'numerical',
      text: 'Numerical',
      data: {
        selector: 'greater-than',
        value: 10,
      },
    },
    'numerical-5': {
      type: 'numerical',
      text: 'Numerical',
      data: {
        selector: 'greater-than-or-equal-to',
        value: 10,
      },
    },
    'numerical-6': {
      type: 'numerical',
      text: 'Numerical',
      data: {
        selector: 'between',
        value: {
          start: 10,
          end: 20,
        },
      },
    },
  },
  date: {
    date: {
      type: 'date',
      text: 'Date',
      data: {
        selector: 'before',
        value: '2025-01-01',
      },
    },
    'date-2': {
      type: 'date',
      text: 'Date',
      data: {
        selector: 'exactly',
        value: '2025-01-01',
      },
    },
    'date-3': {
      type: 'date',
      text: 'Date',
      data: {
        selector: 'after',
        value: '2025-01-01',
      },
    },
    'date-4': {
      type: 'date',
      text: 'Date',
      data: {
        selector: 'between',
        value: {
          start: '2024-01-01',
          end: '2025-01-01',
        },
      },
    },
  },
  time: {
    time: {
      type: 'time',
      text: 'Time',
      data: {
        selector: 'before',
        value: '12:00',
      },
    },
    'time-2': {
      type: 'time',
      text: 'Time',
      data: {
        selector: 'exactly',
        value: '12:00',
      },
    },
    'time-3': {
      type: 'time',
      text: 'Time',
      data: {
        selector: 'after',
        value: '12:00',
      },
    },
    'time-4': {
      type: 'time',
      text: 'Time',
      data: {
        selector: 'between',
        value: {
          start: '10:00',
          end: '12:00',
        },
      },
    },
  },
  datetime: {
    datetime: {
      type: 'datetime',
      text: 'Datetime',
      data: {
        selector: 'before',
        value: '2025-01-01T12:00',
      },
    },
    'datetime-2': {
      type: 'datetime',
      text: 'Datetime',
      data: {
        selector: 'exactly',
        value: '2025-01-01T12:00',
      },
    },
    'datetime-3': {
      type: 'datetime',
      text: 'Datetime',
      data: {
        selector: 'after',
        value: '2025-01-01T12:00',
      },
    },
    'datetime-4': {
      type: 'datetime',
      text: 'Datetime',
      data: {
        selector: 'between',
        value: {
          start: '2024-01-01T10:00',
          end: '2025-01-01T12:00',
        },
      },
    },
  },
  generic: {
    'generic-1': {
      type: 'generic',
      text: 'Generic',
      dismissTagText: 'lorem ipsum',
      data: {
        value: 'with dismissTagText',
      },
    },
    'generic-2': {
      type: 'generic',
      text: 'Generic',
      data: {
        value: 'value-without-dismissTagText',
        label: 'no dismissTagText',
      },
    },
    'generic-3': {
      type: 'generic',
      text: 'Generic',
      data: {
        value: 'value-without-dismissTagText-and-label',
      },
    },
  },
  search: {
    search: {
      type: 'search',
      text: 'Search',
      data: {
        value: 'lorem ipsum',
      },
    },
  },
} as Record<string, HdsFilterBarFilters>;

const createFilterBarAppliedFilters = async (options: {
  appliedFiltersType?: string;
  onFilterDismiss?: (key: string, filterValue?: unknown) => void;
}) => {
  const filters: HdsFilterBarFilters = options.appliedFiltersType
    ? (FILTERS[options.appliedFiltersType] ?? EMPTY_FILTERS)
    : EMPTY_FILTERS;

  return await render(
    <template>
      <HdsFilterBarAppliedFilters
        id="test-applied-filters"
        @filters={{filters}}
        @onFilterDismiss={{options.onFilterDismiss}}
      />
    </template>,
  );
};

module(
  'Integration | Component | hds/filter-bar/applied-filters',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await createFilterBarAppliedFilters({});
      assert
        .dom('#test-applied-filters')
        .hasClass('hds-filter-bar__applied-filters');
    });

    // FILTERS

    test('it should render no applied filters if none are set', async function (assert) {
      await createFilterBarAppliedFilters({});
      assert.dom('.hds-tag').doesNotExist();
    });

    test('it should render applied filters from the @filters argument', async function (assert) {
      await createFilterBarAppliedFilters({
        appliedFiltersType: 'single-select',
      });
      assert.dom('.hds-tag').exists({ count: 2 });
    });

    test('it should render applied filters for the single-select filter type from the @filters argument', async function (assert) {
      await createFilterBarAppliedFilters({
        appliedFiltersType: 'single-select',
      });
      assert.dom('.hds-tag').exists({ count: 2 });
      assert
        .dom('.hds-tag:nth-of-type(1) .hds-tag__dismiss')
        .hasAttribute('aria-label', 'Clear filter Single-select: Option 1');
      assert
        .dom('.hds-tag:nth-of-type(1) .hds-tag__text')
        .hasText('Single-select: Option 1');
      assert
        .dom('.hds-tag:nth-of-type(2) .hds-tag__text')
        .hasText('Single-select: value-without-label');
    });

    test('it should render applied filters for the multi-select filter type from the @filters argument', async function (assert) {
      await createFilterBarAppliedFilters({
        appliedFiltersType: 'multi-select',
      });
      assert.dom('.hds-tag').exists({ count: 4 });
      assert
        .dom('.hds-tag:nth-of-type(1) .hds-tag__dismiss')
        .hasAttribute('aria-label', 'Clear filter Multi-select: Option 1');
      assert
        .dom('.hds-tag:nth-of-type(1) .hds-tag__text')
        .hasText('Multi-select: Option 1');
      assert
        .dom('.hds-tag:nth-of-type(3) .hds-tag__text')
        .hasText('Multi-select: value-without-label-1');
    });

    test('it should render applied filters for the numerical filter type from the @filters argument', async function (assert) {
      await createFilterBarAppliedFilters({ appliedFiltersType: 'numerical' });
      assert.dom('.hds-tag').exists({ count: 6 });
      assert
        .dom('.hds-tag .hds-tag__dismiss')
        .hasAttribute('aria-label', 'Clear filter Numerical < 10');
      assert
        .dom('.hds-tag:nth-of-type(1) .hds-tag__text')
        .hasText('Numerical < 10');
      assert
        .dom('.hds-tag:nth-of-type(2) .hds-tag__text')
        .hasText('Numerical ≤ 10');
      assert
        .dom('.hds-tag:nth-of-type(3) .hds-tag__text')
        .hasText('Numerical = 10');
      assert
        .dom('.hds-tag:nth-of-type(4) .hds-tag__text')
        .hasText('Numerical > 10');
      assert
        .dom('.hds-tag:nth-of-type(5) .hds-tag__text')
        .hasText('Numerical ≥ 10');
      assert
        .dom('.hds-tag:nth-of-type(6) .hds-tag__text')
        .hasText('Numerical between 10 and 20');
    });

    test('it should render applied filters for the date filter type from the @filters argument', async function (assert) {
      await createFilterBarAppliedFilters({ appliedFiltersType: 'date' });
      assert.dom('.hds-tag').exists({ count: 4 });
      assert
        .dom('.hds-tag .hds-tag__dismiss')
        .hasAttribute('aria-label', 'Clear filter Date before 1/1/25');
      assert
        .dom('.hds-tag:nth-of-type(1) .hds-tag__text')
        .hasText('Date before 1/1/25');
      assert
        .dom('.hds-tag:nth-of-type(2) .hds-tag__text')
        .hasText('Date exactly 1/1/25');
      assert
        .dom('.hds-tag:nth-of-type(3) .hds-tag__text')
        .hasText('Date after 1/1/25');
      assert
        .dom('.hds-tag:nth-of-type(4) .hds-tag__text')
        .hasText('Date between 1/1/24 and 1/1/25');
    });

    test('it should render applied filters for the time filter type from the @filters argument', async function (assert) {
      await createFilterBarAppliedFilters({ appliedFiltersType: 'time' });
      assert.dom('.hds-tag').exists({ count: 4 });
      assert
        .dom('.hds-tag .hds-tag__dismiss')
        .hasAttribute('aria-label', 'Clear filter Time before 12:00 PM');
      assert
        .dom('.hds-tag:nth-of-type(1) .hds-tag__text')
        .hasText('Time before 12:00 PM');
      assert
        .dom('.hds-tag:nth-of-type(2) .hds-tag__text')
        .hasText('Time exactly 12:00 PM');
      assert
        .dom('.hds-tag:nth-of-type(3) .hds-tag__text')
        .hasText('Time after 12:00 PM');
      assert
        .dom('.hds-tag:nth-of-type(4) .hds-tag__text')
        .hasText('Time between 10:00 AM and 12:00 PM');
    });

    test('it should render applied filters for the datetime filter type from the @filters argument', async function (assert) {
      await createFilterBarAppliedFilters({ appliedFiltersType: 'datetime' });
      assert.dom('.hds-tag').exists({ count: 4 });
      assert
        .dom('.hds-tag .hds-tag__dismiss')
        .hasAttribute(
          'aria-label',
          'Clear filter Datetime before 1/1/25, 12:00 PM',
        );
      assert
        .dom('.hds-tag:nth-of-type(1) .hds-tag__text')
        .hasText('Datetime before 1/1/25, 12:00 PM');
      assert
        .dom('.hds-tag:nth-of-type(2) .hds-tag__text')
        .hasText('Datetime exactly 1/1/25, 12:00 PM');
      assert
        .dom('.hds-tag:nth-of-type(3) .hds-tag__text')
        .hasText('Datetime after 1/1/25, 12:00 PM');
      assert
        .dom('.hds-tag:nth-of-type(4) .hds-tag__text')
        .hasText('Datetime between 1/1/24, 10:00 AM and 1/1/25, 12:00 PM');
    });

    test('it should render applied filters for the generic filter type from the @filters argument', async function (assert) {
      await createFilterBarAppliedFilters({ appliedFiltersType: 'generic' });
      assert.dom('.hds-tag').exists({ count: 3 });
      assert
        .dom('.hds-tag:nth-of-type(1) .hds-tag__dismiss')
        .hasAttribute('aria-label', 'Clear filter Generic lorem ipsum');
      assert
        .dom('.hds-tag:nth-of-type(1) .hds-tag__text')
        .hasText('Generic lorem ipsum');
      assert
        .dom('.hds-tag:nth-of-type(2) .hds-tag__text')
        .hasText('Generic: no dismissTagText');
      assert
        .dom('.hds-tag:nth-of-type(3) .hds-tag__text')
        .hasText('Generic: value-without-dismissTagText-and-label');
    });

    test('it should render applied filters for the search filter type from the @filters argument', async function (assert) {
      await createFilterBarAppliedFilters({ appliedFiltersType: 'search' });
      assert.dom('.hds-tag').exists({ count: 1 });
      assert
        .dom('.hds-tag .hds-tag__dismiss')
        .hasAttribute('aria-label', 'Clear filter Search: lorem ipsum');
      assert.dom('.hds-tag .hds-tag__text').hasText('Search: lorem ipsum');
    });

    // CALLBACK: ONFILTERDISMISS

    test('it should trigged the onFilterDismiss callback when applied filters are dismissed', async function (assert) {
      const context = new TrackedObject({
        isClicked: false,
        key: '',
      });

      const onFilterDismiss = (key: string) => {
        context.isClicked = true;
        context.key = key;
      };

      await createFilterBarAppliedFilters({
        appliedFiltersType: 'single-select',
        onFilterDismiss: onFilterDismiss,
      });
      assert.dom('.hds-tag').exists();

      await click('.hds-tag .hds-tag__dismiss');
      assert.ok(context.isClicked);
      assert.equal(context.key, 'single-select-1');
    });

    test('it should trigged the onFilterDismiss callback when applied filters are dismissed for a mult-select-filter', async function (assert) {
      const context = new TrackedObject<{
        isClicked: boolean;
        key: string;
        value: unknown;
      }>({
        isClicked: false,
        key: '',
        value: undefined,
      });

      const onFilterDismiss = (key: string, filterValue?: unknown) => {
        context.isClicked = true;
        context.key = key;
        context.value = filterValue ?? undefined;
      };

      await createFilterBarAppliedFilters({
        appliedFiltersType: 'multi-select',
        onFilterDismiss: onFilterDismiss,
      });
      assert.dom('.hds-tag').exists();

      await click('.hds-tag .hds-tag__dismiss');
      assert.ok(context.isClicked);
      assert.equal(context.key, 'multi-select-1');
      assert.equal(context.value, '1');
    });
  },
);
