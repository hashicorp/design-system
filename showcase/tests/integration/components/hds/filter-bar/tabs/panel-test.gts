/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';

import {
  HdsFilterBarTabs,
  HdsFilterBarTabsPanel,
} from '@hashicorp/design-system-components/components';

// NOTICE
// Because of how the `panel` subcomponent is built,
// it's practically impossible to test in isolation, so in our tests
// in this file it will be wrapped inside its parent component.
const createTabPanel = async (options: { selectedTabIndex?: number }) => {
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

module('Integration | Component | hds/filter-bar/tabs/panel', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsFilterBarTabsPanel data-test="panel-1" /></template>,
    );
    assert.dom('[data-test="panel-1"]').hasClass('hds-filter-bar__tabs__panel');
  });

  // VISIBILITY

  test('it sets the panel content to not visible when the @selectedTabIndex argument does not match the panel index in the @panelIds argument', async function (assert) {
    await createTabPanel({ selectedTabIndex: 1 });
    assert.dom('.hds-filter-bar__tabs__panel').hasAttribute('hidden');
    assert.dom('#test-panel-content').doesNotExist();
    assert.dom('.hds-filter-bar__tabs__panel').hasAttribute('aria-labelledby');
  });

  test('it sets the panel content to visible when the @selectedTabIndex argument matches the panel index in the @panelIds argument', async function (assert) {
    await createTabPanel({ selectedTabIndex: 0 });
    assert.dom('.hds-filter-bar__tabs__panel').hasNoAttribute('hidden');
    assert.dom('#test-panel-content').exists();
    assert.dom('.hds-filter-bar__tabs__panel').hasAttribute('aria-labelledby');
  });
});
