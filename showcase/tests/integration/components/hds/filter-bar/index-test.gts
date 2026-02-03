/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click, fillIn, settled } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsFilterBar,
  type HdsFilterBarFilters,
} from '@hashicorp/design-system-components/components';

const EMPTY_FILTERS: HdsFilterBarFilters = {};

const FILTERS: Record<string, HdsFilterBarFilters> = {
  'single-select': {
    'single-select': {
      type: 'single-select',
      text: 'Single-select',
      data: {
        value: '1',
        label: 'Option 1',
      },
    },
  },
  'multi-select': {
    'multi-select': {
      type: 'multi-select',
      text: 'Multi-select',
      data: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
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
    generic: {
      type: 'generic',
      text: 'Generic',
      dismissTagText: 'lorem ipsum',
      data: {
        value: 'lorem ipsum',
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
};

const createBasicFilterBar = async (options: {
  hasSearch?: boolean;
  searchPlaceholder?: string;
  isLiveFilter?: boolean;
  appliedFiltersType?: string;
  onFilter?: (filters: HdsFilterBarFilters) => void;
}) => {
  const filters: HdsFilterBarFilters = options.appliedFiltersType
    ? (FILTERS[options.appliedFiltersType] ?? EMPTY_FILTERS)
    : EMPTY_FILTERS;

  return await render(
    <template>
      <HdsFilterBar
        id="test-filter-bar"
        @filters={{filters}}
        @hasSearch={{options.hasSearch}}
        @searchPlaceholder={{options.searchPlaceholder}}
        @isLiveFilter={{options.isLiveFilter}}
        @onFilter={{options.onFilter}}
        as |F|
      >
        <F.FiltersDropdown />
      </HdsFilterBar>
    </template>,
  );
};

module('Integration | Component | hds/filter-bar/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await createBasicFilterBar({});
    assert.dom('#test-filter-bar').hasClass('hds-filter-bar');
  });

  // FILTERS

  test('it should render no applied filters if none are set', async function (assert) {
    await createBasicFilterBar({});
    assert
      .dom('.hds-filter-bar__applied-filters-toggle-button')
      .hasAttribute('aria-expanded', 'false');
    assert.dom('.hds-filter-bar__applied-filters').doesNotExist();
    assert.dom('.hds-filter-bar__clear-button').doesNotExist();
  });

  test('it should render applied filters from the @filters argument', async function (assert) {
    await createBasicFilterBar({ appliedFiltersType: 'single-select' });
    assert
      .dom('.hds-filter-bar__applied-filters-toggle-button')
      .hasAttribute('aria-expanded', 'true');
    assert.dom('.hds-filter-bar__applied-filters').exists();
    assert.dom('.hds-filter-bar__clear-button').exists();
  });

  // LIVE FILTERING

  test('it should render the appropriate content if the @isLiveFilter argument is false by default', async function (assert) {
    await createBasicFilterBar({});
    assert.dom('.hds-filter-bar .sr-only').doesNotExist();
  });

  test('it should render the appropriate content if the @isLiveFilter argument is true', async function (assert) {
    await createBasicFilterBar({ isLiveFilter: true });
    assert
      .dom('.hds-filter-bar .sr-only')
      .exists()
      .hasText('Filters will be applied automatically as selections are made');
  });

  // HASSEARCH

  test('it should not render the search input by default', async function (assert) {
    await createBasicFilterBar({});
    assert.dom('.hds-filter-bar__search').doesNotExist();
  });

  test('it should render the search input if the @hasSearch argument is true', async function (assert) {
    await createBasicFilterBar({
      hasSearch: true,
      appliedFiltersType: 'search',
    });
    assert.dom('.hds-filter-bar__search').exists();
    assert.dom('.hds-filter-bar__search').hasValue('lorem ipsum');
  });

  // SEARCH PLACEHOLDER

  test('it should render the default search input placeholder text if no @searhPlaceholder argument is provided', async function (assert) {
    await createBasicFilterBar({ hasSearch: true });
    assert.dom('.hds-filter-bar__search').hasAttribute('placeholder', 'Search');
  });

  test('it should render the search input placeholder text from the @searhPlaceholder argument', async function (assert) {
    await createBasicFilterBar({
      hasSearch: true,
      searchPlaceholder: 'Search custom placeholder',
    });
    assert
      .dom('.hds-filter-bar__search')
      .hasAttribute('placeholder', 'Search custom placeholder');
  });

  // CALLBACK - ONFILTER

  test('it should call the onFilter callback when applied filters are dismissed', async function (assert) {
    const context = new TrackedObject<{
      isClicked: boolean;
      filters: HdsFilterBarFilters;
    }>({
      isClicked: false,
      filters: FILTERS['single-select'] ?? EMPTY_FILTERS,
    });

    const onFilter = (filters: HdsFilterBarFilters) => {
      context.isClicked = true;
      context.filters = filters;
    };

    await createBasicFilterBar({
      appliedFiltersType: 'single-select',
      onFilter: onFilter,
    });
    assert.dom('.hds-filter-bar__applied-filters .hds-tag').exists();

    await click('.hds-filter-bar__applied-filters .hds-tag .hds-tag__dismiss');
    assert.ok(context.isClicked);
    assert.true(Object.keys(context.filters).length === 0);
    assert
      .dom('.hds-filter-bar__filters-dropdown .hds-dropdown-toggle-button')
      .isFocused();
  });

  test('it should call the onFilter callback when applied filters are dismissed for a multi-select filter type', async function (assert) {
    const context = new TrackedObject<{
      isClicked: boolean;
      filters: HdsFilterBarFilters;
    }>({
      isClicked: false,
      filters: FILTERS['multi-select'] ?? EMPTY_FILTERS,
    });

    const onFilter = (filters: HdsFilterBarFilters) => {
      context.isClicked = true;
      context.filters = filters;
    };

    await createBasicFilterBar({
      appliedFiltersType: 'multi-select',
      onFilter: onFilter,
    });
    assert
      .dom('.hds-filter-bar__applied-filters .hds-tag')
      .exists({ count: 2 });

    await click('.hds-filter-bar__applied-filters .hds-tag .hds-tag__dismiss');
    assert.ok(context.isClicked);
    assert.true(Object.keys(context.filters).length === 1);
    assert
      .dom('.hds-filter-bar__filters-dropdown .hds-dropdown-toggle-button')
      .isFocused();
  });

  test('it should call the onFilter callback when the clear filters button is clicked', async function (assert) {
    const context = new TrackedObject<{
      isClicked: boolean;
      filters: HdsFilterBarFilters;
    }>({
      isClicked: false,
      filters: FILTERS['single-select'] ?? EMPTY_FILTERS,
    });

    const onFilter = (filters: HdsFilterBarFilters) => {
      context.isClicked = true;
      context.filters = filters;
    };

    await createBasicFilterBar({
      appliedFiltersType: 'single-select',
      onFilter: onFilter,
    });
    assert.dom('.hds-filter-bar__clear-button').exists();

    await click('.hds-filter-bar__clear-button');

    assert.ok(context.isClicked);
    assert.true(Object.keys(context.filters).length === 0);
    assert
      .dom('.hds-filter-bar__applied-filters-toggle-button')
      .hasAttribute('aria-expanded', 'false');
    assert
      .dom('.hds-filter-bar__filters-dropdown .hds-dropdown-toggle-button')
      .isFocused();
  });

  test('it should call the onFilter callback if a search is executed', async function (assert) {
    const context = new TrackedObject<{
      isClicked: boolean;
      filtersSearch: unknown;
    }>({
      isClicked: false,
      filtersSearch: undefined,
    });

    const onFilter = (filters: HdsFilterBarFilters) => {
      context.isClicked = true;
      if (
        'search' in filters &&
        'data' in filters['search'] &&
        'value' in filters['search']['data']
      ) {
        context.filtersSearch = filters['search']['data']['value'];
      }
    };

    await createBasicFilterBar({ hasSearch: true, onFilter: onFilter });
    assert.dom('.hds-filter-bar__search').exists();

    await fillIn('.hds-filter-bar__search', 'lorem ipsum');
    assert.dom('.hds-filter-bar__search').hasValue('lorem ipsum');
    assert.ok(context.isClicked);
    assert.equal(context.filtersSearch, 'lorem ipsum');
  });

  // CONTEXTUAL COMPONENTS

  test('it should render the FiltersDropdown contextual component', async function (assert) {
    await render(
      <template>
        <HdsFilterBar @filters={{EMPTY_FILTERS}} as |F|>
          <F.FiltersDropdown />
        </HdsFilterBar>
      </template>,
    );
    assert.dom('.hds-filter-bar__filters-dropdown').exists();
  });

  test('it should render the ActionsDropdown contextual component', async function (assert) {
    await render(
      <template>
        <HdsFilterBar @filters={{EMPTY_FILTERS}} as |F|>
          <F.ActionsDropdown />
        </HdsFilterBar>
      </template>,
    );
    assert.dom('.hds-filter-bar__actions-dropdown').exists();
  });

  test('it should render the ActionsGeneric contextual component', async function (assert) {
    await render(
      <template>
        <HdsFilterBar @filters={{EMPTY_FILTERS}} as |F|>
          <F.ActionsGeneric>
            <div id="hds-filter-bar-generic-test" />
          </F.ActionsGeneric>
        </HdsFilterBar>
      </template>,
    );
    assert.dom('#hds-filter-bar-generic-test').exists();
  });

  // EXPAND / COLLAPSE

  test('it should expand and collapse the applied filters section when the toggle button is clicked', async function (assert) {
    await createBasicFilterBar({});
    assert
      .dom('.hds-filter-bar__applied-filters-toggle-button')
      .hasAttribute('aria-expanded', 'false');
    assert.dom('.hds-filter-bar__applied-filters-list__content').doesNotExist();

    await click('.hds-filter-bar__applied-filters-toggle-button');

    assert
      .dom('.hds-filter-bar__applied-filters-toggle-button')
      .hasAttribute('aria-expanded', 'true');
    assert.dom('.hds-filter-bar__applied-filters-list__content').exists();
  });

  test('it should expand and collapse the applied filters section when the filters argument is updated externally', async function (assert) {
    const context = new TrackedObject({
      filters: EMPTY_FILTERS,
    });

    await render(
      <template>
        <HdsFilterBar @filters={{context.filters}} as |F|>
          <F.FiltersDropdown />
        </HdsFilterBar>
      </template>,
    );
    assert
      .dom('.hds-filter-bar__applied-filters-toggle-button')
      .hasAttribute('aria-expanded', 'false');
    assert.dom('.hds-filter-bar__applied-filters-list__content').doesNotExist();

    context.filters = FILTERS['single-select'] as HdsFilterBarFilters;
    await settled();

    assert
      .dom('.hds-filter-bar__applied-filters-toggle-button')
      .hasAttribute('aria-expanded', 'true');
    assert.dom('.hds-filter-bar__applied-filters-list__content').exists();

    context.filters = EMPTY_FILTERS;
    await settled();

    assert
      .dom('.hds-filter-bar__applied-filters-toggle-button')
      .hasAttribute('aria-expanded', 'false');
    assert.dom('.hds-filter-bar__applied-filters-list__content').doesNotExist();
  });
});
