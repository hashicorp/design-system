/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsFilterBarFilterGroupRadio,
  type HdsFilterBarSingleSelectFilter,
} from '@hashicorp/design-system-components/components';

const SAMPLE_FILTER = {
  type: 'single-select',
  data: { value: 'test-value', label: 'Test label' },
} as HdsFilterBarSingleSelectFilter;

module(
  'Integration | Component | hds/filter-bar/filter-group/radio',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupRadio
            id="test-radio"
            @label="Test label"
            @value="test-value"
            @name="test-name"
          />
        </template>,
      );
      assert.dom('#test-radio.hds-filter-bar__filter-group__radio').exists();
    });

    // LABEL, NAME, VALUE

    test('it should render the label, name, and value when provided', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupRadio
            id="test-radio"
            @label="Test label"
            @value="test-value"
            @name="test-name"
          />
        </template>,
      );
      assert
        .dom(
          '#test-radio .hds-filter-bar__filter-group__selection-option__text-content',
        )
        .hasText('Test label');
      assert
        .dom(
          '#test-radio .hds-filter-bar__filter-group__selection-option__control',
        )
        .hasAttribute('name', 'test-name');
      assert
        .dom(
          '#test-radio .hds-filter-bar__filter-group__selection-option__control',
        )
        .hasValue('test-value');
    });

    // SEARCH VALUE

    test('it should show the radio when the search value matches the label', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupRadio
            id="test-radio"
            @label="Foo test label"
            @value="test-value"
            @name="test-name"
            @searchValue="Foo"
          />
        </template>,
      );
      assert
        .dom('#test-radio.hds-filter-bar__filter-group__selection-option')
        .doesNotHaveClass(
          'hds-filter-bar__filter-group__selection-option--hidden',
        );
    });

    test('it should hide the radio when the search value does not match the label', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupRadio
            id="test-radio"
            @label="Test label"
            @value="test-value"
            @name="test-name"
            @searchValue="Bar"
          />
        </template>,
      );
      assert
        .dom('#test-radio.hds-filter-bar__filter-group__selection-option')
        .hasClass('hds-filter-bar__filter-group__selection-option--hidden');
    });

    // CALLBACKS: ONCHANGE

    test('it should call the onChange callback when the radio change event occurs', async function (assert) {
      const context = new TrackedObject({
        isClicked: false,
        isChecked: false,
        label: '',
      });

      const onChange = (event: Event, label?: string) => {
        context.isClicked = true;
        context.isChecked = (event.target as HTMLInputElement).checked;
        context.label = label ?? '';
      };

      await render(
        <template>
          <HdsFilterBarFilterGroupRadio
            id="test-radio"
            @label="Test label"
            @value="test-value"
            @name="test-name"
            @onChange={{onChange}}
          />
        </template>,
      );

      await click('.hds-filter-bar__filter-group__selection-option__control');
      assert.true(context.isClicked);
      assert.true(context.isChecked);
      assert.equal(context.label, 'Test label');
      assert
        .dom('.hds-filter-bar__filter-group__selection-option__control')
        .isChecked();
    });

    // ISCHECKED

    test('it should render the radio unchecked by default', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupRadio
            id="test-radio"
            @label="Test label"
            @value="test-value"
            @name="test-name"
          />
        </template>,
      );
      assert
        .dom('.hds-filter-bar__filter-group__selection-option__control')
        .isNotChecked();
    });

    test('it should render the radio checked if the @keyFilter argument has it as checked', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupRadio
            id="test-radio"
            @label="Test label"
            @value="test-value"
            @name="test-name"
            @keyFilter={{SAMPLE_FILTER}}
          />
        </template>,
      );
      assert
        .dom('.hds-filter-bar__filter-group__selection-option__control')
        .isChecked();
    });
  },
);
