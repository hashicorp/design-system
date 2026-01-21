/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsFilterBarFiltersDropdown,
  type HdsFilterBarFilters,
} from '@hashicorp/design-system-components/components';

const EMPTY_FILTERS = {};

const SAMPLE_FILTERS = {
  'single-select': {
    type: 'single-select',
    text: 'Single-select',
    data: {
      value: '1',
      label: 'Option 1',
    },
  },
} as HdsFilterBarFilters;

module(
  'Integration | Component | hds/filter-bar/filters-dropdown',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFiltersDropdown
            @filters={{EMPTY_FILTERS}}
            id="test-dropdown"
          />
        </template>,
      );
      assert.dom('#test-dropdown').hasClass('hds-filter-bar__filters-dropdown');
    });

    // LIVE FILTERING

    test('it should show the appropriate content if the argument @isLiveFilter is false by default', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFiltersDropdown @filters={{EMPTY_FILTERS}} />
        </template>,
      );
      await click('.hds-dropdown-toggle-button');
      assert
        .dom('.hds-filter-bar__filters-dropdown .hds-button')
        .exists({ count: 2 });
      assert
        .dom('.hds-filter-bar__filters-dropdown .hds-button:nth-of-type(1)')
        .hasText('Apply filters');
      assert
        .dom('.hds-filter-bar__filters-dropdown .hds-button:nth-of-type(2)')
        .hasText('Clear all filters');
    });

    test('it should show the appropriate content if the argument @isLiveFilter is true', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFiltersDropdown
            @filters={{EMPTY_FILTERS}}
            @isLiveFilter={{true}}
          />
        </template>,
      );
      await click('.hds-dropdown-toggle-button');
      assert
        .dom('.hds-filter-bar__filters-dropdown .hds-button')
        .exists({ count: 1 });
      assert
        .dom('.hds-filter-bar__filters-dropdown .hds-button')
        .hasText('Clear all filters');
    });

    // HEIGHT

    test('it should set the height of the dropdown content to the default value', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFiltersDropdown @filters={{EMPTY_FILTERS}} />
        </template>,
      );
      await click('.hds-dropdown-toggle-button');
      assert
        .dom('.hds-dropdown__content')
        .hasStyle({ '--filter-bar-filters-dropdown-height': '600px' });
    });

    test('it should set the height of the dropdown content to the value provided by the @height argument', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFiltersDropdown
            @filters={{EMPTY_FILTERS}}
            @height="400px"
          />
        </template>,
      );
      await click('.hds-dropdown-toggle-button');
      assert
        .dom('.hds-dropdown__content')
        .hasStyle({ '--filter-bar-filters-dropdown-height': '400px' });
    });

    // CONTEXTUAL COMPONENTS

    test('it should render the FilterGroup contextual component', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFiltersDropdown @filters={{EMPTY_FILTERS}} as |D|>
            <D.FilterGroup @key="test" @text="Test" @type="multi-select" />
          </HdsFilterBarFiltersDropdown>
        </template>,
      );
      await click('.hds-dropdown-toggle-button');
      assert.dom('.hds-filter-bar__tabs__tab').exists();
    });

    // CALLBACKS: ONFILTER

    test('it should call the onFilter callback when the apply filters button is clicked', async function (assert) {
      const context = new TrackedObject({
        isClicked: false,
      });

      const onFilter = () => {
        context.isClicked = true;
      };

      await render(
        <template>
          <HdsFilterBarFiltersDropdown
            @filters={{EMPTY_FILTERS}}
            @onFilter={{onFilter}}
            id="test-dropdown"
          />
        </template>,
      );
      await click('.hds-dropdown-toggle-button');
      assert
        .dom('.hds-button:nth-of-type(1)')
        .exists()
        .hasText('Apply filters');
      await click('.hds-button:nth-of-type(1)');

      assert.ok(context.isClicked);
    });

    test('it should call the onFilter callback when the clear filters button is clicked', async function (assert) {
      const context = new TrackedObject<{
        isClicked: boolean;
        filters: HdsFilterBarFilters;
      }>({
        isClicked: false,
        filters: SAMPLE_FILTERS,
      });

      const onFilter = (filters: HdsFilterBarFilters) => {
        context.isClicked = true;
        context.filters = filters;
      };

      await render(
        <template>
          <HdsFilterBarFiltersDropdown
            @filters={{SAMPLE_FILTERS}}
            @onFilter={{onFilter}}
            id="test-dropdown"
          />
        </template>,
      );
      await click('.hds-dropdown-toggle-button');
      assert
        .dom('.hds-button:nth-of-type(2)')
        .exists()
        .hasText('Clear all filters');
      await click('.hds-button:nth-of-type(2)');

      assert.ok(context.isClicked);
      assert.true(Object.keys(context.filters).length === 0);
    });
  },
);
