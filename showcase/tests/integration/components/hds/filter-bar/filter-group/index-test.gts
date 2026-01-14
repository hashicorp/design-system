/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click, fillIn, select } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import NOOP from 'showcase/utils/noop';

import {
  HdsFilterBarTabs,
  HdsFilterBarFilterGroup,
  type HdsFilterBarFilter,
  type HdsFilterBarGenericFilter,
} from '@hashicorp/design-system-components/components';

const EMPTY_FILTERS = {};

const SAMPLE_FILTERS = {
  name: {
    type: 'multi-select' as const,
    text: 'Name',
    data: [
      { value: 'option-1', label: 'Option 1' },
      { value: 'option-2', label: 'Option 2' },
    ],
  },
} as Record<string, HdsFilterBarFilter>;

const SAMPLE_GENERIC_FILTER = {
  type: 'generic',
  dismissTagText: 'test',
  data: {
    value: 'test-value',
  },
} as HdsFilterBarGenericFilter;

module(
  'Integration | Component | hds/filter-bar/filter-group/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs id="test-tabs" as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="multi-select"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
            />
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('#test-tabs .hds-filter-bar__tabs__tab').exists({ count: 1 });
      assert
        .dom('#test-tabs .hds-filter-bar__tabs__panel')
        .exists({ count: 1 });
    });

    // TEXT

    test('it should render the name of the filter group provided to the @text argument', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="multi-select"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
            />
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('.hds-filter-bar__tabs__tab__text').hasText('Name');
    });

    // TYPE

    test('it should render the apporpriate content if the @type argument is multi-select', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="multi-select"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
            />
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('.hds-filter-bar__filter-group__values-list').exists();
      assert
        .dom('.hds-filter-bar__filter-group__list legend')
        .hasText('Filter by Name');
    });

    test('it should render the apporpriate content if the @type argument is single-select', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="single-select"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
            />
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('.hds-filter-bar__filter-group__values-list').exists();
      assert
        .dom('.hds-filter-bar__filter-group__list legend')
        .hasText('Filter by Name');
    });

    test('it should render the apporpriate content if the @type argument is numerical', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="numerical"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
            />
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('.hds-filter-bar__filter-group__numerical').exists();
      assert
        .dom('.hds-filter-bar__filter-group__numerical legend')
        .hasText('Filter by Name');
      assert
        .dom('.hds-filter-bar__filter-group__numerical .hds-form-select')
        .hasAttribute('name', 'name-selector');
      assert
        .dom('.hds-filter-bar__filter-group__numerical .hds-form-text-input')
        .hasAttribute('name', 'name-value');
    });

    test('it should render the apporpriate content if the @type argument is date', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="date"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
            />
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('.hds-filter-bar__filter-group__date').exists();
      assert
        .dom('.hds-filter-bar__filter-group__date legend')
        .hasText('Filter by Name');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-field__label')
        .hasText('Date is');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-select')
        .hasAttribute('name', 'name-selector');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-text-input')
        .hasAttribute('name', 'name-value');
    });

    test('it should render the apporpriate content if the @type argument is datetime', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="datetime"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
            />
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('.hds-filter-bar__filter-group__date').exists();
      assert
        .dom('.hds-filter-bar__filter-group__date legend')
        .hasText('Filter by Name');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-field__label')
        .hasText('Datetime is');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-select')
        .hasAttribute('name', 'name-selector');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-text-input')
        .hasAttribute('name', 'name-value');
    });

    test('it should render the apporpriate content if the @type argument is time', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="time"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
            />
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('.hds-filter-bar__filter-group__date').exists();
      assert
        .dom('.hds-filter-bar__filter-group__date legend')
        .hasText('Filter by Name');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-field__label')
        .hasText('Time is');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-select')
        .hasAttribute('name', 'name-selector');
      assert
        .dom('.hds-filter-bar__filter-group__date .hds-form-text-input')
        .hasAttribute('name', 'name-value');
    });

    // SEARCH

    test('it should not render the search input by default', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="multi-select"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
            />
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('.hds-filter-bar__filter-group__search').doesNotExist();
    });

    test('it should render the search input if the @searchEnabled argument is true', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="multi-select"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
              @searchEnabled={{true}}
            />
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('.hds-filter-bar__filter-group__search').exists();
    });

    test('it should filter the list of options by the search term provided', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="multi-select"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
              @searchEnabled={{true}}
              as |F|
            >
              <F.Checkbox @value="option-1" @label="Option 1" />
              <F.Checkbox @value="option-2" @label="Option number 2" />
              <F.Checkbox @value="option-3" @label="Option number 3" />
            </HdsFilterBarFilterGroup>
          </HdsFilterBarTabs>
        </template>,
      );

      assert
        .dom('.hds-filter-bar__filter-group__selection-option')
        .exists({ count: 3 });
      assert
        .dom('.hds-filter-bar__filter-group__selection-option--hidden')
        .doesNotExist();
      assert.dom('.hds-filter-bar__filter-group__search').exists();

      await fillIn(
        '.hds-filter-bar__filter-group__search .hds-form-text-input',
        'number',
      );
      assert
        .dom('.hds-filter-bar__filter-group__search .hds-form-text-input')
        .hasValue('number');
      assert
        .dom('.hds-filter-bar__filter-group__selection-option--hidden')
        .exists({ count: 1 });

      await fillIn(
        '.hds-filter-bar__filter-group__search .hds-form-text-input',
        '1',
      );
      assert
        .dom('.hds-filter-bar__filter-group__search .hds-form-text-input')
        .hasValue('1');
      assert
        .dom('.hds-filter-bar__filter-group__selection-option--hidden')
        .exists({ count: 2 });
    });

    // CONTEXTUAL COMPONENTS

    test('it should render the Checkbox contextual component', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="multi-select"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
              as |F|
            >
              <F.Checkbox @value="option-1" @label="Option 1" />
            </HdsFilterBarFilterGroup>
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('.hds-filter-bar__filter-group__checkbox').exists();
      assert
        .dom('.hds-filter-bar__filter-group__selection-option__text-content')
        .hasText('Option 1');
      assert
        .dom('.hds-filter-bar__filter-group__selection-option__control')
        .hasValue('option-1')
        .hasAttribute('name', 'name');
    });

    test('it should render the Radio contextual component', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="single-select"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
              as |F|
            >
              <F.Radio @value="option-1" @label="Option 1" />
            </HdsFilterBarFilterGroup>
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('.hds-filter-bar__filter-group__radio').exists();
      assert
        .dom('.hds-filter-bar__filter-group__selection-option__text-content')
        .hasText('Option 1');
      assert
        .dom('.hds-filter-bar__filter-group__selection-option__control')
        .hasValue('option-1')
        .hasAttribute('name', 'name');
    });

    test('it should render the Generic contextual component', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="generic"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{NOOP}}
              as |FG|
            >
              <FG.Generic />
            </HdsFilterBarFilterGroup>
          </HdsFilterBarTabs>
        </template>,
      );
      assert.dom('.hds-filter-bar__filter-group__generic').exists();
    });

    // ONCHANGE - SELECTION

    test('it should call the onChange callback when a single-select filter is added and removed', async function (assert) {
      const context = new TrackedObject<{
        isTriggered: boolean;
        key: string;
        keyFilter: HdsFilterBarFilter | undefined;
      }>({
        isTriggered: false,
        key: '',
        keyFilter: undefined,
      });

      const onChange = (key: string, keyFilter?: HdsFilterBarFilter) => {
        context.isTriggered = true;
        context.key = key;
        context.keyFilter = keyFilter ?? undefined;
      };

      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="single-select"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{onChange}}
              as |F|
            >
              <F.Radio @value="option-1" @label="Option 1" />
            </HdsFilterBarFilterGroup>
          </HdsFilterBarTabs>
        </template>,
      );

      await click('.hds-filter-bar__filter-group__radio .hds-form-radio');

      assert.true(context.isTriggered);
      assert.equal(context.key, 'name');
      assert.deepEqual(context.keyFilter, {
        type: 'single-select',
        text: 'Name',
        data: {
          value: 'option-1',
          label: 'Option 1',
        },
      });

      await click('.hds-filter-bar__filter-group__clear-button');

      assert.equal(context.keyFilter, undefined);
    });

    test('it should call the onChange callback when a multi-select filter is added and removed', async function (assert) {
      const context = new TrackedObject<{
        isTriggered: boolean;
        key: string;
        keyFilter: HdsFilterBarFilter | undefined;
      }>({
        isTriggered: false,
        key: '',
        keyFilter: undefined,
      });

      const onChange = (key: string, keyFilter?: HdsFilterBarFilter) => {
        context.isTriggered = true;
        context.key = key;
        context.keyFilter = keyFilter ?? undefined;
      };

      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="multi-select"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{onChange}}
              as |F|
            >
              <F.Checkbox @value="option-1" @label="Option 1" />
              <F.Checkbox @value="option-2" @label="Option 2" />
            </HdsFilterBarFilterGroup>
          </HdsFilterBarTabs>
        </template>,
      );

      await click(
        '.hds-filter-bar__filter-group__checkbox:nth-of-type(1) .hds-form-checkbox',
      );
      await click(
        '.hds-filter-bar__filter-group__checkbox:nth-of-type(2) .hds-form-checkbox',
      );

      assert.true(context.isTriggered);
      assert.equal(context.key, 'name');
      assert.deepEqual(context.keyFilter, {
        type: 'multi-select',
        text: 'Name',
        data: [
          { value: 'option-1', label: 'Option 1' },
          { value: 'option-2', label: 'Option 2' },
        ],
      });

      await click('.hds-filter-bar__filter-group__clear-button');

      assert.equal(context.keyFilter, undefined);
    });

    // ONCHANGE - NUMERICAL

    test('it should call the onChange callback when a numerical filter is added and removed', async function (assert) {
      const context = new TrackedObject<{
        isTriggered: boolean;
        key: string;
        keyFilter: HdsFilterBarFilter | undefined;
      }>({
        isTriggered: false,
        key: '',
        keyFilter: undefined,
      });

      const onChange = (key: string, keyFilter?: HdsFilterBarFilter) => {
        context.isTriggered = true;
        context.key = key;
        context.keyFilter = keyFilter ?? undefined;
      };

      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="numerical"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{onChange}}
            />
          </HdsFilterBarTabs>
        </template>,
      );

      await select('.hds-form-select', 'less-than');
      await fillIn('.hds-form-text-input', '10');

      assert.true(context.isTriggered);
      assert.equal(context.key, 'name');
      assert.deepEqual(context.keyFilter, {
        type: 'numerical',
        text: 'Name',
        data: {
          selector: 'less-than',
          value: 10,
        },
      });

      await click('.hds-filter-bar__filter-group__clear-button');

      assert.equal(context.keyFilter, undefined);
    });

    // ONCHANGE - DATE

    test('it should call the onChange callback when a date filter is added and removed', async function (assert) {
      const context = new TrackedObject<{
        isTriggered: boolean;
        key: string;
        keyFilter: HdsFilterBarFilter | undefined;
      }>({
        isTriggered: false,
        key: '',
        keyFilter: undefined,
      });

      const onChange = (key: string, keyFilter?: HdsFilterBarFilter) => {
        context.isTriggered = true;
        context.key = key;
        context.keyFilter = keyFilter ?? undefined;
      };

      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="date"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{onChange}}
            />
          </HdsFilterBarTabs>
        </template>,
      );

      await select('.hds-form-select', 'before');
      await fillIn('.hds-form-text-input', '2025-01-01');

      assert.true(context.isTriggered);
      assert.equal(context.key, 'name');
      assert.deepEqual(context.keyFilter, {
        type: 'date',
        text: 'Name',
        data: {
          selector: 'before',
          value: '2025-01-01',
        },
      });

      await click('.hds-filter-bar__filter-group__clear-button');

      assert.equal(context.keyFilter, undefined);
    });

    // ONCHANGE - GENERIC

    test('it should call the onChange callback when a generic filter is added and removed', async function (assert) {
      const context = new TrackedObject<{
        isTriggered: boolean;
        key: string;
        keyFilter: HdsFilterBarFilter | undefined;
      }>({
        isTriggered: false,
        key: '',
        keyFilter: undefined,
      });

      const onChange = (key: string, keyFilter?: HdsFilterBarFilter) => {
        context.isTriggered = true;
        context.key = key;
        context.keyFilter = keyFilter ?? undefined;
      };

      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="generic"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{EMPTY_FILTERS}}
              @onChange={{onChange}}
              as |FG|
            >
              <FG.Generic as |G|>
                <button
                  id="update-filter-button"
                  {{on "click" (fn G.updateFilter SAMPLE_GENERIC_FILTER)}}
                >
                  Update Filter
                </button>
              </FG.Generic>
            </HdsFilterBarFilterGroup>
          </HdsFilterBarTabs>
        </template>,
      );

      await click('#update-filter-button');

      assert.ok(context.isTriggered);
      assert.equal(context.key, 'name');
      assert.deepEqual(context.keyFilter, SAMPLE_GENERIC_FILTER);

      await click('.hds-filter-bar__filter-group__clear-button');

      assert.equal(context.keyFilter, undefined);
    });

    // NUM FILTERS

    test('it should display the correct number of applied filters', async function (assert) {
      await render(
        <template>
          <HdsFilterBarTabs as |T|>
            <HdsFilterBarFilterGroup
              @key="name"
              @text="Name"
              @type="date"
              @tab={{T.Tab}}
              @panel={{T.Panel}}
              @filters={{SAMPLE_FILTERS}}
              @onChange={{NOOP}}
            />
          </HdsFilterBarTabs>
        </template>,
      );
      assert
        .dom('.hds-filter-bar__tabs__tab__filter-count')
        .exists()
        .hasText('2');
    });
  },
);
