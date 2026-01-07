/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click, focus, triggerKeyEvent } from '@ember/test-helpers';

import { HdsFilterBarTabs } from '@hashicorp/design-system-components/components';

const createTabs = async (options: { selectedTabIndex?: number }) => {
  return await render(
    <template>
      <HdsFilterBarTabs @selectedTabIndex={{options.selectedTabIndex}} as |T|>
        <T.Tab>Tab 1</T.Tab>
        <T.Tab>Tab 2</T.Tab>
        <T.Panel />
        <T.Panel />
      </HdsFilterBarTabs>
    </template>,
  );
};

module('Integration | Component | hds/filter-bar/tabs/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsFilterBarTabs id="test-tabs" /></template>);
    assert.dom('#test-tabs').hasClass('hds-filter-bar__tabs');
  });

  // SELECTED TAB

  test('it sets the first tab to selected by default', async function (assert) {
    await createTabs({});
    assert
      .dom('.hds-filter-bar__tabs .hds-filter-bar__tabs__tab')
      .hasClass('hds-filter-bar__tabs__tab--is-selected');
  });

  test('it sets the tab number provided to the @selectedTabIndex argument as selected', async function (assert) {
    await createTabs({ selectedTabIndex: 1 });
    assert
      .dom('.hds-filter-bar__tabs .hds-filter-bar__tabs__tab:nth-of-type(2)')
      .hasClass('hds-filter-bar__tabs__tab--is-selected');
  });

  // TAB SELECTION

  test('it should select the focused tab when clicked', async function (assert) {
    await createTabs({});

    await click(
      '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
    );
    assert
      .dom('.hds-filter-bar__tabs .hds-filter-bar__tabs__tab:nth-of-type(2)')
      .hasClass('hds-filter-bar__tabs__tab--is-selected');
  });

  // KEYBOARD CONTROLS

  test('it should select the focused tab when triggered with the enter key', async function (assert) {
    const enterKey = 13;
    await createTabs({});

    // focus 2nd step:
    assert
      .dom(
        '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
      )
      .exists();
    await focus(
      '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
    );

    // select 2nd step:
    await triggerKeyEvent(
      '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
      'keydown',
      enterKey,
    );

    assert
      .dom('.hds-filter-bar__tabs .hds-filter-bar__tabs__tab:nth-of-type(2)')
      .hasClass('hds-filter-bar__tabs__tab--is-selected');
  });

  test('it should select the focused tab when triggered with the spacebar', async function (assert) {
    const spacebarKey = 32;
    await createTabs({});

    // focus 2nd step:
    assert
      .dom(
        '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
      )
      .exists();
    await focus(
      '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
    );

    // select 2nd step:
    await triggerKeyEvent(
      '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
      'keydown',
      spacebarKey,
    );

    assert
      .dom('.hds-filter-bar__tabs .hds-filter-bar__tabs__tab:nth-of-type(2)')
      .hasClass('hds-filter-bar__tabs__tab--is-selected');
  });

  test('it should focus interactive steps and navigate through them using left and right arrow keys', async function (assert) {
    const leftArrowKey = 37;
    const rightArrowKey = 39;
    await createTabs({});

    // focus 2nd step:
    assert
      .dom(
        '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
      )
      .exists();
    await focus(
      '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
    );
    // test that the navigated to step is now focused:
    assert
      .dom(
        '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
      )
      .isFocused();

    // navigate to the previous (1st) step using right arrow key:
    await triggerKeyEvent(
      '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
      'keydown',
      rightArrowKey,
    );
    // test that the navigated to step is now focused:
    assert
      .dom('.hds-filter-bar__tabs__tab .hds-filter-bar__tabs__tab__button')
      .isFocused();

    // navigate back to the next (2nd) step using left arrow key:
    await triggerKeyEvent(
      '.hds-filter-bar__tabs__tab .hds-filter-bar__tabs__tab__button',
      'keydown',
      leftArrowKey,
    );
    // test that the navigated to step is now focused:
    assert
      .dom(
        '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
      )
      .isFocused();
  });

  test('it should focus interactive steps and navigate through them using up and down arrow keys', async function (assert) {
    const upArrowKey = 38;
    const downArrowKey = 40;
    await createTabs({});

    // focus 2nd step:
    assert
      .dom(
        '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
      )
      .exists();
    await focus(
      '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
    );
    // test that the navigated to step is now focused:
    assert
      .dom(
        '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
      )
      .isFocused();

    // navigate to the previous (1st) step using right arrow key:
    await triggerKeyEvent(
      '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
      'keydown',
      downArrowKey,
    );
    // test that the navigated to step is now focused:
    assert
      .dom('.hds-filter-bar__tabs__tab .hds-filter-bar__tabs__tab__button')
      .isFocused();

    // navigate back to the next (2nd) step using left arrow key:
    await triggerKeyEvent(
      '.hds-filter-bar__tabs__tab .hds-filter-bar__tabs__tab__button',
      'keydown',
      upArrowKey,
    );
    // test that the navigated to step is now focused:
    assert
      .dom(
        '.hds-filter-bar__tabs__tab:nth-of-type(2) .hds-filter-bar__tabs__tab__button',
      )
      .isFocused();
  });
});
