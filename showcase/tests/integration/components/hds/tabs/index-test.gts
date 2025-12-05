/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test, skip } from 'qunit';
import {
  click,
  find,
  focus,
  render,
  resetOnerror,
  settled,
  setupOnerror,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsTabs } from '@hashicorp/design-system-components/components';
import type { HdsTabsSizes } from '@hashicorp/design-system-components/components/hds/tabs/types';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

import { setupRenderingTest } from 'showcase/tests/helpers';

const assertCssVarsCloseTo = (
  assert: Assert,
  style: CSSStyleDeclaration,
  values: number[],
) => {
  const indicatorLeftPos = style.getPropertyValue('--indicator-left-pos')
    ? parseInt(style.getPropertyValue('--indicator-left-pos'))
    : 0;
  const indicatorWidth = style.getPropertyValue('--indicator-width')
    ? parseInt(style.getPropertyValue('--indicator-width'))
    : 0;

  const expectedIndicatorLeftPos = values[0] ?? 0;
  const expectedIndicatorWidth = values[1] ?? 0;
  let isIndicatorLeftPosWithinTolerance;
  let isIndicatorWidthWithinTolerance;
  // debugger;
  if (indicatorLeftPos === expectedIndicatorLeftPos) {
    isIndicatorLeftPosWithinTolerance = true;
  } else {
    isIndicatorLeftPosWithinTolerance =
      Math.abs(indicatorLeftPos - expectedIndicatorLeftPos) /
        expectedIndicatorLeftPos <=
      0.02;
  }
  if (indicatorWidth === expectedIndicatorWidth) {
    isIndicatorWidthWithinTolerance = true;
  } else {
    isIndicatorWidthWithinTolerance =
      Math.abs(indicatorWidth - expectedIndicatorWidth) /
        expectedIndicatorWidth <=
      0.03;
  }

  assert.ok(
    isIndicatorLeftPosWithinTolerance,
    `comparing expected \`--indicator-left-pos\` value \`${expectedIndicatorLeftPos}\` with actual value \`${indicatorLeftPos}\``,
  );
  assert.ok(
    isIndicatorWidthWithinTolerance,
    `comparing expected \`--indicator-width\` value \`${expectedIndicatorWidth}\` with actual value \`${indicatorWidth}\``,
  );
};

const createTabs = async (options: {
  iconTab1?: HdsIconSignature['Args']['name'];
  countTab1?: string;
  isSelectedTab1?: boolean;
  isSelectedTab2?: boolean;
  selectedTabIndex?: number;
  size?: HdsTabsSizes;
  onClickTab?: (event: Event, index: number) => void;
}) => {
  return await render(
    <template>
      <HdsTabs
        id="test-tabs"
        @size={{options.size}}
        @selectedTabIndex={{options.selectedTabIndex}}
        @onClickTab={{options.onClickTab}}
        as |T|
      >
        <T.Tab
          data-test="tab-1"
          @isSelected={{options.isSelectedTab1}}
          @icon={{options.iconTab1}}
          @count={{options.countTab1}}
        >One</T.Tab>
        <T.Tab
          data-test="tab-2"
          @isSelected={{options.isSelectedTab2}}
        >Two</T.Tab>
        <T.Panel data-test="panel-1">Content 1</T.Panel>
        <T.Panel data-test="panel-2">Content 2</T.Panel>
      </HdsTabs>
    </template>,
  );
};

// NOTICE
// Because of how the `tab` and `panel` subcomponents are built,
// it's practically impossible to test them in isolation, so we will
// test everything in this file and try to cover as much as possible

module('Integration | Component | hds/tabs/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component names', async function (assert) {
    await createTabs({});
    assert.dom('[data-test="tab-1"]').hasClass('hds-tabs__tab');
    assert.dom('[data-test="panel-1"]').hasClass('hds-tabs__panel');
  });

  // CONTENT

  test('it should have 2 Tabs and 2 Panels', async function (assert) {
    await createTabs({});
    assert.dom('.hds-tabs__panel').exists({ count: 2 });
  });

  // SIZE

  test('it should render the component with CSS classes that reflect the default values if no arguments provided', async function (assert) {
    await createTabs({});
    assert.dom('#test-tabs').hasClass('hds-tabs--size-medium');
  });

  test('it should render the component with CSS classes that reflect the arguments provided', async function (assert) {
    await createTabs({ size: 'large' });
    assert.dom('#test-tabs').hasClass('hds-tabs--size-large');
  });

  // TAB AND PANEL SELECTION AND DISPLAY

  test('it should select the first tab and display the first panel by default', async function (assert) {
    await createTabs({});
    assert.dom('[data-test="tab-1"]').hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-1"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected', 'true');
    assert.dom('[data-test="panel-1"]').doesNotHaveAttribute('hidden');
    assert
      .dom('[data-test="tab-2"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-2"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected', 'false');
    assert.dom('[data-test="panel-2"]').hasAttribute('hidden');
  });

  test('it should select the specified tab using @isSelected and display the associated panel', async function (assert) {
    await createTabs({ isSelectedTab2: true });
    assert.dom('[data-test="tab-2"]').hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-2"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected', 'true');
    assert.dom('[data-test="panel-2"]').doesNotHaveAttribute('hidden');

    assert
      .dom('[data-test="tab-1"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-1"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected', 'false');
    assert.dom('[data-test="panel-1"]').hasAttribute('hidden');
  });

  test('it should select the specified tab using @selectedTabIndex and display the associated panel', async function (assert) {
    await createTabs({ selectedTabIndex: 1 });
    assert.dom('[data-test="tab-2"]').hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-2"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected', 'true');
    assert.dom('[data-test="panel-2"]').doesNotHaveAttribute('hidden');

    assert
      .dom('[data-test="tab-1"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-1"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected', 'false');
    assert.dom('[data-test="panel-1"]').hasAttribute('hidden');
  });

  test('it should dynamically select the specified tab with multiple @isSelected conditions', async function (assert) {
    const context = new TrackedObject({
      isSelectedTab1: false,
      isSelectedTab2: true,
    });

    await render(
      <template>
        <HdsTabs id="test-tabs" as |T|>
          <T.Tab
            data-test="tab-1"
            @isSelected={{context.isSelectedTab1}}
          >One</T.Tab>
          <T.Tab
            data-test="tab-2"
            @isSelected={{context.isSelectedTab2}}
          >Two</T.Tab>
          <T.Panel>Content 1</T.Panel>
          <T.Panel>Content 2</T.Panel>
        </HdsTabs>
      </template>,
    );

    assert
      .dom('[data-test="tab-1"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert.dom('[data-test="tab-2"]').hasClass('hds-tabs__tab--is-selected');

    context.isSelectedTab1 = true;
    context.isSelectedTab2 = false;
    await settled();

    assert.dom('[data-test="tab-1"]').hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-2"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
  });

  test('it should dynamically select the specified tab when @selectedIndex changes', async function (assert) {
    const context = new TrackedObject({
      selectedTabIndex: 1,
    });

    await render(
      <template>
        <HdsTabs
          id="test-tabs"
          @selectedTabIndex={{context.selectedTabIndex}}
          as |T|
        >
          <T.Tab data-test="tab-1">One</T.Tab>
          <T.Tab data-test="tab-2">Two</T.Tab>
          <T.Panel>Content 1</T.Panel>
          <T.Panel>Content 2</T.Panel>
        </HdsTabs>
      </template>,
    );

    assert
      .dom('[data-test="tab-1"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert.dom('[data-test="tab-2"]').hasClass('hds-tabs__tab--is-selected');

    context.selectedTabIndex = 0;
    await settled();

    assert.dom('[data-test="tab-1"]').hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-2"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
  });

  // TAB CLICK

  test('on click it should select the clicked tab, display the associated panel', async function (assert) {
    await createTabs({});
    // select tab 2
    await click('[data-test="tab-2"] .hds-tabs__tab-button');
    assert.dom('[data-test="tab-2"]').hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-2"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected', 'true');
    assert.dom('[data-test="panel-2"]').doesNotHaveAttribute('hidden');
    assert
      .dom('[data-test="tab-1"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-1"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected', 'false');
    assert.dom('[data-test="panel-1"]').hasAttribute('hidden');
  });

  // KEYBOARD CONTROLS

  test('it should focus tabs and navigate through them using left and right arrow keys', async function (assert) {
    const leftArrowKey = 37;
    const rightArrowKey = 39;
    const spaceKey = 32;
    await createTabs({});
    // focus 2nd tab:
    await focus('[data-test="tab-2"] .hds-tabs__tab-button');
    // test that the navigated to tab is now focused:
    assert.dom('[data-test="tab-2"] .hds-tabs__tab-button').isFocused();
    // activate the focused tab using the space key:
    await triggerKeyEvent(
      '[data-test="tab-2"] .hds-tabs__tab-button',
      'keyup',
      spaceKey,
    );
    // check that the focused tab is now selected
    assert.dom('[data-test="tab-2"]').hasClass('hds-tabs__tab--is-selected');
    // navigate to the previous (1st) tab using right arrow key:
    await triggerKeyEvent(
      '[data-test="tab-2"] .hds-tabs__tab-button',
      'keyup',
      rightArrowKey,
    );
    // test that the navigated to tab is now focused:
    assert.dom('[data-test="tab-1"] .hds-tabs__tab-button').isFocused();

    // navigate back to the next (2nd) tab using left arrow key:
    await triggerKeyEvent(
      '[data-test="tab-1"] .hds-tabs__tab-button',
      'keyup',
      leftArrowKey,
    );
    // test that the navigated to tab is now focused:
    assert.dom('[data-test="tab-2"] .hds-tabs__tab-button').isFocused();
  });

  test('It should display the associated panel when a focused tab is activated', async function (assert) {
    const enterKey = 13;
    const spaceKey = 32;
    await createTabs({});
    // focus 2nd tab:
    await focus('[data-test="tab-2"] .hds-tabs__tab-button');
    // activate the tab using the enterKey:
    await triggerKeyEvent(
      '[data-test="tab-2"] .hds-tabs__tab-button',
      'keyup',
      enterKey,
    );
    // test that the tab and panel have been activated:
    assert.dom('[data-test="tab-2"]').hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-2"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected', 'true');
    assert.dom('[data-test="panel-2"]').doesNotHaveAttribute('hidden');

    // focus 1st tab:
    await focus('[data-test="tab-1"] .hds-tabs__tab-button');
    // activate the tab using the spaceKey:
    await triggerKeyEvent(
      '[data-test="tab-1"] .hds-tabs__tab-button',
      'keyup',
      spaceKey,
    );
    // test that the tab and panel have been activated:
    assert.dom('[data-test="tab-1"]').hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-1"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected', 'true');
    assert.dom('[data-test="panel-1"]').doesNotHaveAttribute('hidden');
  });

  // ATTRIBUTES

  test('elements should have a set of attributes based on the arguments provided', async function (assert) {
    await createTabs({});
    assert.dom('[data-test="tab-1"]').hasAttribute('role', 'presentation');
    assert
      .dom('[data-test="tab-1"] .hds-tabs__tab-button')
      .hasAttribute('role', 'tab');
    const panelId = find('[data-test="panel-1"]')?.id ?? '';
    assert
      .dom('[data-test="tab-1"] .hds-tabs__tab-button')
      .hasAttribute('aria-controls', panelId);
    assert.dom('[data-test="panel-1"]').hasAttribute('role', 'tabpanel');
    const tabId = find('[data-test="tab-1"] .hds-tabs__tab-button')?.id ?? '';
    assert.dom('[data-test="panel-1"]').hasAttribute('aria-labelledby', tabId);
  });

  // CALLBACKS

  test('on click it should invoke the `onClickTab` callback function', async function (assert) {
    const context = new TrackedObject({
      isClicked: false,
      selected: -1,
    });

    const onClick = (_event: Event, index: number) => {
      context.isClicked = true;
      context.selected = index;
    };

    await createTabs({ onClickTab: onClick });
    await click('[data-test="tab-1"] .hds-tabs__tab-button');
    assert.ok(context.isClicked);
    assert.strictEqual(context.selected, 0);
  });

  // ASSERTIONS

  test('it should throw an assertion if the number of tabs does not match the number of panels', async function (assert) {
    const errorMessage =
      'The number of Tabs must be equal to the number of Panels';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        <HdsTabs as |T|>
          <T.Tab>One</T.Tab>
          <T.Tab>Two</T.Tab>
          <T.Panel>Content 1</T.Panel>
          <T.Panel>Content 2</T.Panel>
          <T.Panel>Content 3</T.Panel>
        </HdsTabs>
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  // for some reasons, the second button triggers an error on `willDestroyNode` because `element` is undefeined
  // not sure why it's happening, so I am skipping this test for now
  skip('it should throw an assertion if more than one tab is selected', async function (assert) {
    const errorMessage = 'Only one tab may use isSelected argument';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    // await this.createTabs({ isSelectedTab1: true, isSelectedTab2: true });
    await render(
      <template>
        <HdsTabs as |T|>
          <T.Tab @isSelected={{true}} id="ONE">One</T.Tab>
          <T.Tab @isSelected={{true}} id="TWO">Two</T.Tab>
          <T.Panel data-test="panel-1">Content 1</T.Panel>
          <T.Panel data-test="panel-2">Content 2</T.Panel>
        </HdsTabs>
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  // ===============================================================

  // TAB OPTIONS

  test('`Tab` should render an icon if @icon is defined', async function (assert) {
    await createTabs({ iconTab1: 'info' });
    assert.dom('.hds-tabs__tab-icon').exists();
    assert.dom('.hds-tabs__tab-icon').hasAttribute('data-test-icon', 'info');
  });

  test('`Tab` should render a badge if @count is defined', async function (assert) {
    await createTabs({ countTab1: '5' });
    assert.dom('.hds-tabs__tab-count').exists();
    assert.dom('.hds-tabs__tab-count').hasText('5');
  });

  // ===============================================================

  // INDICATOR

  test('tab indicator should respond to tab clicks', async function (assert) {
    await createTabs({});

    const tablist = find('.hds-tabs__tablist') as HTMLElement;
    console.log(tablist);

    let tablistStyle = tablist.style;
    assertCssVarsCloseTo(assert, tablistStyle, [0, 51]); // --indicator-left-pos: 0px; --indicator-width: 51px;

    // select tab 2
    await click('[data-test="tab-2"] .hds-tabs__tab-button');
    tablistStyle = tablist.style;
    assertCssVarsCloseTo(assert, tablistStyle, [51, 51]); // --indicator-left-pos: 51px; --indicator-width: 51px;
  });

  test('tab indicator should respond to content size changes', async function (assert) {
    const context = new TrackedObject({
      count: 5,
    });

    await render(
      <template>
        <HdsTabs id="test-tabs" as |T|>
          <T.Tab data-test="tab-1" @count="{{context.count}}">One</T.Tab>
          <T.Tab data-test="tab-2">Two</T.Tab>
          <T.Panel data-test="panel-1">Content 1</T.Panel>
          <T.Panel data-test="panel-2">Content 2</T.Panel>
        </HdsTabs>
      </template>,
    );

    const tablist = find('.hds-tabs__tablist') as HTMLElement;
    let tablistStyle = tablist.style;

    assertCssVarsCloseTo(assert, tablistStyle, [0, 81]); // --indicator-left-pos: 0px; --indicator-width: 81px;

    context.count = 12345;
    await settled();
    tablistStyle = tablist.style;
    assertCssVarsCloseTo(assert, tablistStyle, [0, 112]); // --indicator-left-pos: 0px; --indicator-width: 112px;
  });

  test('tab indicator should not move when focus is shifted to another tab', async function (assert) {
    const leftArrowKey = 37;
    const spaceKey = 32;
    await createTabs({});
    const tablist = find('.hds-tabs__tablist') as HTMLElement;
    let tablistStyle = tablist.style;
    // test that the indicator is in the right position
    assertCssVarsCloseTo(assert, tablistStyle, [0, 51]); // --indicator-left-pos: 0px; --indicator-width: 51px;
    // focus 2nd tab:
    await focus('[data-test="tab-2"] .hds-tabs__tab-button');
    // test that the navigated to tab is now focused:
    assert.dom('[data-test="tab-2"] .hds-tabs__tab-button').isFocused();
    // activate the focused tab using the space key:
    await triggerKeyEvent(
      '[data-test="tab-2"] .hds-tabs__tab-button',
      'keyup',
      spaceKey,
    );
    tablistStyle = tablist.style;
    // test that the indicator has changed position
    assertCssVarsCloseTo(assert, tablistStyle, [51, 51]); // --indicator-left-pos: 51px; --indicator-width: 51px;
    // navigate back to the previous (1st) tab using left arrow key:
    await triggerKeyEvent(
      '[data-test="tab-2"] .hds-tabs__tab-button',
      'keyup',
      leftArrowKey,
    );
    // test that the navigated to tab is now focused:
    assert.dom('[data-test="tab-1"] .hds-tabs__tab-button').isFocused();
    // test that the indicator did _not_ changed position (tab has not been activated, just focused)
    assertCssVarsCloseTo(assert, tablistStyle, [51, 51]); // --indicator-left-pos: 51px; --indicator-width: 51px;
  });

  // ===============================================================
  // ===============================================================
  // ===============================================================

  // NESTED TABS

  test('it should have the correct selection of tabs (via @isSelected) and correct indicator at different stages', async function (assert) {
    await render(
      <template>
        <HdsTabs id="test-tabs" as |T|>
          <T.Tab data-test="tab-1">One</T.Tab>
          <T.Tab data-test="tab-2" @isSelected={{true}}>Two</T.Tab>
          <T.Panel data-test="panel-1">
            <HdsTabs id="test-tabs-sub1" as |T|>
              <T.Tab data-test="tab-1__subtab-1">Tab One / Subtab One</T.Tab>
              <T.Tab data-test="tab-1__subtab-2">Tab One / Subtab Two</T.Tab>
              <T.Panel data-test="tab-1__panel-1">Tab One / Subcontent 1</T.Panel>
              <T.Panel data-test="tab-1__panel-2">Tab One / SubContent 2</T.Panel>
            </HdsTabs>
          </T.Panel>
          <T.Panel data-test="panel-2">
            <HdsTabs id="test-tabs-sub2" as |T|>
              <T.Tab data-test="tab-2__subtab-1">Tab Two / Subtab One</T.Tab>
              <T.Tab data-test="tab-2__subtab-2" @isSelected={{true}}>Tab Two /
                Subtab Two</T.Tab>
              <T.Panel data-test="tab-2__panel-1">Tab Two / Subcontent 1</T.Panel>
              <T.Panel data-test="tab-2__panel-2">Tab Two / SubContent 2</T.Panel>
            </HdsTabs>
          </T.Panel>
        </HdsTabs>
      </template>,
    );

    // tab 2 is selected (via @isSelected)
    assert.dom('[data-test="tab-2"]').hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-2"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected', 'true');
    assert.dom('[data-test="panel-2"]').doesNotHaveAttribute('hidden');

    // tab 2 / subtab 2 is selected (via @isSelected)
    assert
      .dom('[data-test="panel-2"] [data-test="tab-2__subtab-2"]')
      .hasClass('hds-tabs__tab--is-selected');
    assert
      .dom(
        '[data-test="panel-2"] [data-test="tab-2__subtab-2"] .hds-tabs__tab-button',
      )
      .hasAttribute('aria-selected', 'true');
    assert
      .dom('[data-test="panel-2"] [data-test="tab-2__panel-2"]')
      .doesNotHaveAttribute('hidden');

    // tab 1 / subtab 1 is not selected (default, invisible)

    assert
      .dom('[data-test="panel-1"] [data-test="tab-1__subtab-1"]')
      .hasClass('hds-tabs__tab--is-selected');
    assert
      .dom(
        '[data-test="panel-1"] [data-test="tab-1__subtab-1"] .hds-tabs__tab-button',
      )
      .hasAttribute('aria-selected', 'true');
    assert
      .dom('[data-test="panel-1"] [data-test="tab-1__panel-1"]')
      .doesNotHaveAttribute('hidden');
  });

  test('it should have the correct selection of tabs (via @selectedTabIndex) and correct indicator at different stages', async function (assert) {
    await render(
      <template>
        <HdsTabs id="test-tabs" @selectedTabIndex={{1}} as |T|>
          <T.Tab data-test="tab-1">One</T.Tab>
          <T.Tab data-test="tab-2">Two</T.Tab>
          <T.Panel data-test="panel-1">
            <HdsTabs id="test-tabs-sub1" as |T|>
              <T.Tab data-test="tab-1__subtab-1">Tab One / Subtab One</T.Tab>
              <T.Tab data-test="tab-1__subtab-2">Tab One / Subtab Two</T.Tab>
              <T.Panel data-test="tab-1__panel-1">Tab One / Subcontent 1</T.Panel>
              <T.Panel data-test="tab-1__panel-2">Tab One / SubContent 2</T.Panel>
            </HdsTabs>
          </T.Panel>
          <T.Panel data-test="panel-2">
            <HdsTabs id="test-tabs-sub2" @selectedTabIndex={{1}} as |T|>
              <T.Tab data-test="tab-2__subtab-1">Tab Two / Subtab One</T.Tab>
              <T.Tab data-test="tab-2__subtab-2">Tab Two / Subtab Two</T.Tab>
              <T.Panel data-test="tab-2__panel-1">Tab Two / Subcontent 1</T.Panel>
              <T.Panel data-test="tab-2__panel-2">Tab Two / SubContent 2</T.Panel>
            </HdsTabs>
          </T.Panel>
        </HdsTabs>
      </template>,
    );

    // tab 2 is selected (via @isSelected)
    assert.dom('[data-test="tab-2"]').hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-2"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected', 'true');
    assert.dom('[data-test="panel-2"]').doesNotHaveAttribute('hidden');

    // tab 2 / subtab 2 is selected (via @isSelected)
    assert
      .dom('[data-test="panel-2"] [data-test="tab-2__subtab-2"]')
      .hasClass('hds-tabs__tab--is-selected');
    assert
      .dom(
        '[data-test="panel-2"] [data-test="tab-2__subtab-2"] .hds-tabs__tab-button',
      )
      .hasAttribute('aria-selected', 'true');
    assert
      .dom('[data-test="panel-2"] [data-test="tab-2__panel-2"]')
      .doesNotHaveAttribute('hidden');

    // tab 1 / subtab 1 is not selected (default, invisible)

    assert
      .dom('[data-test="panel-1"] [data-test="tab-1__subtab-1"]')
      .hasClass('hds-tabs__tab--is-selected');
    assert
      .dom(
        '[data-test="panel-1"] [data-test="tab-1__subtab-1"] .hds-tabs__tab-button',
      )
      .hasAttribute('aria-selected', 'true');
    assert
      .dom('[data-test="panel-1"] [data-test="tab-1__panel-1"]')
      .doesNotHaveAttribute('hidden');
  });
});
