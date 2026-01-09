/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsFilterBarFilterGroupCheckbox,
  type HdsFilterBarMultiSelectFilter,
} from '@hashicorp/design-system-components/components';

const SAMPLE_FILTER = {
  type: 'multi-select',
  data: [{ value: 'test-value', label: 'Test label' }],
} as HdsFilterBarMultiSelectFilter;

module(
  'Integration | Component | hds/filter-bar/filter-group/checkbox',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupCheckbox
            id="test-checkbox"
            @label="Test label"
            @value="test-value"
            @name="test-name"
          />
        </template>,
      );
      assert
        .dom('#test-checkbox.hds-filter-bar__filter-group__checkbox')
        .exists();
    });

    // LABEL

    test('it should render the label when provided', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupCheckbox
            id="test-checkbox"
            @label="Test label"
            @value="test-value"
            @name="test-name"
          />
        </template>,
      );
      assert
        .dom(
          '#test-checkbox .hds-filter-bar__filter-group__selection-option__text-content',
        )
        .hasText('Test label');
    });

    // NAME

    test('it should render the name attribute when provided', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupCheckbox
            id="test-checkbox"
            @label="Test label"
            @value="test-value"
            @name="test-name"
          />
        </template>,
      );
      assert
        .dom(
          '#test-checkbox .hds-filter-bar__filter-group__selection-option__control',
        )
        .hasAttribute('name', 'test-name');
    });

    // VALUE

    test('it should render the value when provided', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupCheckbox
            id="test-checkbox"
            @label="Test label"
            @value="test-value"
            @name="test-name"
          />
        </template>,
      );
      assert
        .dom(
          '#test-checkbox .hds-filter-bar__filter-group__selection-option__control',
        )
        .hasValue('test-value');
    });

    // SEARCH VALUE

    test('it should show the checkbox option when the searchValue matches the label', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupCheckbox
            id="test-checkbox"
            @label="Test label"
            @value="test-value"
            @name="test-name"
            @searchValue="Test"
          />
        </template>,
      );
      assert
        .dom('#test-checkbox')
        .doesNotHaveClass(
          'hds-filter-bar__filter-group__selection-option--hidden',
        );
    });

    test('it should hide the checkbox option when the searchValue does not match the label', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupCheckbox
            id="test-checkbox"
            @label="Test label"
            @value="test-value"
            @name="test-name"
            @searchValue="non-matching-search"
          />
        </template>,
      );
      assert
        .dom('#test-checkbox')
        .hasClass('hds-filter-bar__filter-group__selection-option--hidden');
    });

    // CALLBACKS: ONCHANGE

    test('it should call the onChange callback when the checkbox change event occurs', async function (assert) {
      const context = new TrackedObject({
        isClicked: false,
        isChecked: false,
        label: '',
      });

      const onChange = (event: Event, label?: string) => {
        context.isClicked = true;
        context.isChecked = (event.target as HTMLInputElement).checked;
        if (label) {
          context.label = label ?? label;
        }
      };

      await render(
        <template>
          <HdsFilterBarFilterGroupCheckbox
            id="test-checkbox"
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

    test('it should render the checkbox unchecked by default', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupCheckbox
            id="test-checkbox"
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

    test('it should render the checkbox checked if the @keyFilter argument has it as checked', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupCheckbox
            id="test-checkbox"
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
