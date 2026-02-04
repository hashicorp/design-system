/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';

import { HdsFilterBarFilterGroupClearButton } from '@hashicorp/design-system-components/components';

module(
  'Integration | Component | hds/filter-bar/filter-group/clear-button',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupClearButton
            id="test-clear-button"
            @text="Lorem ipsum"
          />
        </template>,
      );
      assert
        .dom('#test-clear-button.hds-filter-bar__filter-group__clear-button')
        .exists();
    });

    // TEXT

    test('it should render the text when provided to the @text argument', async function (assert) {
      await render(
        <template>
          <HdsFilterBarFilterGroupClearButton
            id="test-clear-button"
            @text="Lorem ipsum"
          />
        </template>,
      );
      assert.dom('#test-clear-button').hasText('Lorem ipsum');
    });
  },
);
