/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsFilterBarDropdown,
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

module('Integration | Component | hds/filter-bar/dropdown', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsFilterBarDropdown @filters={{EMPTY_FILTERS}} id="test-dropdown" />
      </template>,
    );
    assert.dom('#test-dropdown').hasClass('hds-filter-bar__dropdown');
  });

  // LIVE FILTERING

  test('it should show the appropriate content if the argument @isLiveFilter is true', async function (assert) {
    await render(
      <template>
        <HdsFilterBarDropdown
          @filters={{EMPTY_FILTERS}}
          @isLiveFilter={{true}}
        />
      </template>,
    );
    await click('.hds-dropdown-toggle-button');
    assert.dom('.hds-filter-bar__dropdown .hds-button').exists({ count: 1 });
    assert
      .dom('.hds-filter-bar__dropdown .hds-button')
      .hasText('Clear all filters');
  });

  test('it should show the appropriate content if the argument @isLiveFilter is false', async function (assert) {
    await render(
      <template><HdsFilterBarDropdown @filters={{EMPTY_FILTERS}} /></template>,
    );
    await click('.hds-dropdown-toggle-button');
    assert.dom('.hds-filter-bar__dropdown .hds-button').exists({ count: 2 });
    assert
      .dom('.hds-filter-bar__dropdown .hds-button')
      .hasText('Apply filters');
  });

  // CONTEXTIAL COMPONENTS

  test('it should render the FilterGroup contextual component', async function (assert) {
    await render(
      <template>
        <HdsFilterBarDropdown @filters={{EMPTY_FILTERS}} as |D|>
          <D.FilterGroup @key="test" @text="Test" />
        </HdsFilterBarDropdown>
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
        <HdsFilterBarDropdown
          @filters={{EMPTY_FILTERS}}
          @onFilter={{onFilter}}
          id="test-dropdown"
        />
      </template>,
    );
    await click('.hds-dropdown-toggle-button');
    assert.dom('.hds-button').exists();
    await click('.hds-button');

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
        <HdsFilterBarDropdown
          @filters={{SAMPLE_FILTERS}}
          @onFilter={{onFilter}}
          id="test-dropdown"
        />
      </template>,
    );
    await click('.hds-dropdown-toggle-button');
    assert.dom('.hds-button:nth-of-type(2)').exists();
    await click('.hds-button:nth-of-type(2)');

    assert.ok(context.isClicked);
    assert.true(Object.keys(context.filters).length === 0);
  });
});
