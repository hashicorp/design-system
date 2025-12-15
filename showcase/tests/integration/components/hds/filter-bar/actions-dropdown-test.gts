/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';

import { HdsFilterBarActionsDropdown } from '@hashicorp/design-system-components/components';

module(
  'Integration | Component | hds/filter-bar/actions-dropdown',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFilterBarActionsDropdown id="test-actions-dropdown" />
        </template>,
      );
      assert
        .dom('#test-actions-dropdown')
        .hasClass('hds-filter-bar__actions-dropdown');
    });

    // TOGGLE BUTTON TEXT

    test('it should render the toggle button text set in the @toggleButtonText argument', async function (assert) {
      await render(
        <template>
          <HdsFilterBarActionsDropdown @toggleButtonText="Lorem ipsum" />
        </template>,
      );
      assert.dom('.hds-dropdown-toggle-button__text').hasText('Lorem ipsum');
    });

    test('it should render the default toggle button text if the @toggleButtonText argument is not provided', async function (assert) {
      await render(<template><HdsFilterBarActionsDropdown /></template>);
      assert.dom('.hds-dropdown-toggle-button__text').hasText('Actions');
    });

    // TOGGLE BUTTON ICON

    test('it should render the toggle button icon set in the @toggleButtonIcon argument', async function (assert) {
      await render(
        <template>
          <HdsFilterBarActionsDropdown @toggleButtonIcon="plus" />
        </template>,
      );
      assert.dom('.hds-dropdown-toggle-button__icon').exists();
    });

    test('it should render no toggle button icon if the @toggleButtonIcon argument is not provided', async function (assert) {
      await render(<template><HdsFilterBarActionsDropdown /></template>);
      assert.dom('.hds-dropdown-toggle-button__icon').doesNotExist();
    });
  },
);
