/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';

import {
  HdsFilterBarTabs,
  HdsFilterBarTabsTab,
} from '@hashicorp/design-system-components/components';

// NOTICE
// Because of how the `tab` subcomponent is built,
// it's practically impossible to test in isolation, so in our tests
// in this file it will be wrapped inside its parent component.
const createTab = async (options: { selectedTabIndex?: number }) => {
  return await render(
    <template>
      <HdsFilterBarTabs
        @ariaLabel="Test tabs"
        @selectedTabIndex={{options.selectedTabIndex}}
        as |T|
      >
        <T.Tab />
        <T.Panel>
          <div id="test-panel-content">Test</div>
        </T.Panel>
      </HdsFilterBarTabs>
    </template>,
  );
};

module('Integration | Component | hds/filter-bar/tabs/tab', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsFilterBarTabsTab data-test="tab-1" /></template>,
    );
    assert.dom('[data-test="tab-1"]').hasClass('hds-filter-bar__tabs__tab');
  });

  // SELECTION

  test('it sets the tab to not selected when the @selectedTabIndex argument does not match the tab index in the @tabIds argument', async function (assert) {
    await createTab({ selectedTabIndex: 1 });
    assert
      .dom('.hds-filter-bar__tabs__tab')
      .doesNotHaveClass('hds-filter-bar__tabs__tab--is-selected');
    assert
      .dom('.hds-filter-bar__tabs__tab .hds-filter-bar__tabs__tab__button')
      .hasAttribute('aria-selected', 'false');
    assert
      .dom('.hds-filter-bar__tabs__tab .hds-filter-bar__tabs__tab__button')
      .hasAttribute('tabindex', '-1');
  });

  test('it sets the tab to selected when the @selectedTabIndex argument matches the panel index in the @tabIds argument', async function (assert) {
    await createTab({ selectedTabIndex: 0 });
    assert
      .dom('.hds-filter-bar__tabs__tab')
      .hasClass('hds-filter-bar__tabs__tab--is-selected');
    assert
      .dom('.hds-filter-bar__tabs__tab .hds-filter-bar__tabs__tab__button')
      .hasAttribute('aria-selected', 'true');
    assert
      .dom('.hds-filter-bar__tabs__tab .hds-filter-bar__tabs__tab__button')
      .doesNotHaveAttribute('tabindex');
  });

  // NUM FILTERS

  test('it should not show the filters count by default', async function (assert) {
    await render(<template><HdsFilterBarTabsTab /></template>);
    assert.dom('.hds-filter-bar__tabs__tab .sr-only').doesNotExist();
    assert
      .dom(
        '.hds-filter-bar__tabs__tab .hds-filter-bar__tabs__tab__filter-count',
      )
      .doesNotExist();
  });

  test('it should show the filters count when the @numFilters argument is provided', async function (assert) {
    await render(
      <template><HdsFilterBarTabsTab @numFilters={{3}} /></template>,
    );
    assert
      .dom('.hds-filter-bar__tabs__tab .sr-only')
      .exists()
      .hasText('Filters applied');
    assert
      .dom(
        '.hds-filter-bar__tabs__tab .hds-filter-bar__tabs__tab__filter-count',
      )
      .exists()
      .hasText('3');
  });

  // YIELDED TEXT

  test('it should render the yielded text inside the tab button', async function (assert) {
    await render(
      <template>
        <HdsFilterBarTabsTab>
          Tab label
        </HdsFilterBarTabsTab>
      </template>,
    );
    assert
      .dom('.hds-filter-bar__tabs__tab .hds-filter-bar__tabs__tab__text')
      .hasText('Tab label');
  });
});
