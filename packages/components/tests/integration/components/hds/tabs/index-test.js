/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  module,
  test,
  skip,
  // only
} from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  focus,
  find,
  // pauseTest,
  render,
  resetOnerror,
  setupOnerror,
  settled,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

function assertCssVarsCloseTo(assert, string, values) {
  // we need to use this regex because the widths of the tabs in local env and in CI are different (browser rendering)
  const match = string.match(
    /^--indicator-left-pos: (\d+)px; --indicator-width: (\d+)px;$/
  );
  if (match) {
    const indicatorLeftPos = parseInt(match[1]);
    const indicatorWidth = parseInt(match[2]);
    const expectedIndicatorLeftPos = values[0];
    const expectedIndicatorWidth = values[1];
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
      `comparing expected \`--indicator-left-pos\` value \`${expectedIndicatorLeftPos}\` with actual value \`${indicatorLeftPos}\``
    );
    assert.ok(
      isIndicatorWidthWithinTolerance,
      `comparing expected \`--indicator-width\` value \`${expectedIndicatorWidth}\` with actual value \`${indicatorWidth}\``
    );
  } else {
    assert.ok(
      false,
      `testing \`${string}\` against \`/^--indicator-left-pos: (\\d+)px; --indicator-width: (\\d+)px;$/\` regex failed because there was no match`
    );
  }
}

// NOTICE
// Because of how the `tab` and `panel` subcomponents are built,
// it's practically impossible to test them in isolation, so we will
// test everything in this file and try to cover as much as possible

module('Integration | Component | hds/tabs/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('createTabs', async (args = {}) => {
      this.iconTab1 = args.iconTab1 ?? undefined;
      this.countTab1 = args.countTab1 ?? undefined;
      this.isSelectedTab1 = args.isSelectedTab1 ?? false;
      this.isSelectedTab2 = args.isSelectedTab2 ?? false;
      this.selectedTabIndex = args.selectedTabIndex ?? undefined;
      this.onClickTab = args.onClickTab ?? undefined;
      return await render(hbs`
        <Hds::Tabs id="test-tabs" @selectedTabIndex={{this.selectedTabIndex}} @onClickTab={{this.onClickTab}} as |T|>
          <T.Tab data-test="tab-1" @isSelected={{this.isSelectedTab1}} @icon={{this.iconTab1}} @count={{this.countTab1}}>One</T.Tab>
          <T.Tab data-test="tab-2" @isSelected={{this.isSelectedTab2}}>Two</T.Tab>
          <T.Panel data-test="panel-1">Content 1</T.Panel>
          <T.Panel data-test="panel-2">Content 2</T.Panel>
        </Hds::Tabs>
      `);
    });
  });

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component names', async function (assert) {
    await this.createTabs();
    assert.dom('[data-test="tab-1"]').hasClass('hds-tabs__tab');
    assert.dom('[data-test="panel-1"]').hasClass('hds-tabs__panel');
  });

  // CONTENT

  test('it should have 2 Tabs and 2 Panels', async function (assert) {
    await this.createTabs();
    assert.dom('.hds-tabs__panel').exists({ count: 2 });
  });

  // TAB AND PANEL SELECTION AND DISPLAY

  test('it should select the first tab and display the first panel by default', async function (assert) {
    await this.createTabs();
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
    await this.createTabs({ isSelectedTab2: true });
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
    await this.createTabs({ selectedTabIndex: 1 });
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
    this.set('isSelectedTab1', false);
    this.set('isSelectedTab2', true);
    await this.createTabs({
      isSelectedTab1: this.isSelectedTab1,
      isSelectedTab2: this.isSelectedTab2,
    });
    assert
      .dom('[data-test="tab-1"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert.dom('[data-test="tab-2"]').hasClass('hds-tabs__tab--is-selected');
    this.set('isSelectedTab1', true);
    this.set('isSelectedTab2', false);
    await settled();
    assert.dom('[data-test="tab-1"]').hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-2"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
  });

  test('it should dynamically select the specified tab when @selectedIndex changes', async function (assert) {
    this.set('selectedTabIndex', 1);
    await this.createTabs({
      selectedTabIndex: this.selectedTabIndex,
    });
    assert
      .dom('[data-test="tab-1"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert.dom('[data-test="tab-2"]').hasClass('hds-tabs__tab--is-selected');
    this.set('selectedTabIndex', 0);
    await settled();
    assert.dom('[data-test="tab-1"]').hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="tab-2"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
  });

  // TAB CLICK

  test('on click it should select the clicked tab, display the associated panel', async function (assert) {
    await this.createTabs();
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
    await this.createTabs();
    // focus 2nd tab:
    await focus('[data-test="tab-2"] .hds-tabs__tab-button');
    // test that the navigated to tab is now focused:
    assert.dom('[data-test="tab-2"] .hds-tabs__tab-button').isFocused();
    // activate the focused tab using the space key:
    await triggerKeyEvent(
      '[data-test="tab-2"] .hds-tabs__tab-button',
      'keyup',
      spaceKey
    );
    // check that the focused tab is now selected
    assert.dom('[data-test="tab-2"]').hasClass('hds-tabs__tab--is-selected');
    // navigate to the previous (1st) tab using right arrow key:
    await triggerKeyEvent(
      '[data-test="tab-2"] .hds-tabs__tab-button',
      'keyup',
      rightArrowKey
    );
    // test that the navigated to tab is now focused:
    assert.dom('[data-test="tab-1"] .hds-tabs__tab-button').isFocused();

    // navigate back to the next (2nd) tab using left arrow key:
    await triggerKeyEvent(
      '[data-test="tab-1"] .hds-tabs__tab-button',
      'keyup',
      leftArrowKey
    );
    // test that the navigated to tab is now focused:
    assert.dom('[data-test="tab-2"] .hds-tabs__tab-button').isFocused();
  });

  test('It should display the associated panel when a focused tab is activated', async function (assert) {
    const enterKey = 13;
    const spaceKey = 32;
    await this.createTabs();
    // focus 2nd tab:
    await focus('[data-test="tab-2"] .hds-tabs__tab-button');
    // activate the tab using the enterKey:
    await triggerKeyEvent(
      '[data-test="tab-2"] .hds-tabs__tab-button',
      'keyup',
      enterKey
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
      spaceKey
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
    await this.createTabs();
    assert.dom('[data-test="tab-1"]').hasAttribute('role', 'presentation');
    assert
      .dom('[data-test="tab-1"] .hds-tabs__tab-button')
      .hasAttribute('role', 'tab');
    assert.dom('[data-test="panel-1"]').hasAttribute('role', 'tabpanel');
    const tabId = find(
      '[data-test="tab-1"] .hds-tabs__tab-button'
    ).getAttribute('id');
    assert.dom('[data-test="panel-1"]').hasAttribute('aria-labelledby', tabId);
  });

  // CALLBACKS

  test('on click it should invoke the `onClickTab` callback function', async function (assert) {
    let clicked = false;
    let selected = -1;
    this.set('onClick', (_event, index) => {
      clicked = true;
      selected = index;
    });
    await this.createTabs({ onClickTab: this.onClick });
    await click('[data-test="tab-1"] .hds-tabs__tab-button');
    assert.ok(clicked);
    assert.strictEqual(selected, 0);
  });

  // ASSERTIONS

  test('it should throw an assertion if the number of tabs does not match the number of panels', async function (assert) {
    const errorMessage =
      'The number of Tabs must be equal to the number of Panels';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`
      <Hds::Tabs as |T|>
        <T.Tab>One</T.Tab>
        <T.Tab>Two</T.Tab>
        <T.Panel>Content 1</T.Panel>
        <T.Panel>Content 2</T.Panel>
        <T.Panel>Content 3</T.Panel>
      </Hds::Tabs>
    `);
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
    await render(hbs`
      <Hds::Tabs as |T|>
        <T.Tab @isSelected={{true}} @id="ONE">One</T.Tab>
        <T.Tab @isSelected={{true}} @id="TWO">Two</T.Tab>
        <T.Panel data-test="panel-1">Content 1</T.Panel>
        <T.Panel data-test="panel-2">Content 2</T.Panel>
      </Hds::Tabs>
    `);
    // await pauseTest();
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  // ===============================================================

  // TAB OPTIONS

  test('`Tab` should render an icon if @icon is defined', async function (assert) {
    await this.createTabs({ iconTab1: 'info' });
    assert.dom('.hds-tabs__tab-icon').exists();
    assert.dom('.hds-tabs__tab-icon').hasAttribute('data-test-icon', 'info');
  });

  test('`Tab` should render a badge if @count is defined', async function (assert) {
    await this.createTabs({ countTab1: '5' });
    assert.dom('.hds-tabs__tab-count').exists();
    assert.dom('.hds-tabs__tab-count').hasText('5');
  });

  // ===============================================================

  // INDICATOR

  // eslint-disable-next-line qunit/require-expect
  test('tab indicator should respond to tab clicks', async function (assert) {
    await this.createTabs();
    let tablistStyle = find('.hds-tabs__tablist').style;
    assertCssVarsCloseTo(assert, tablistStyle['cssText'], [0, 51]); // --indicator-left-pos: 0px; --indicator-width: 51px;
    // select tab 2
    await click('[data-test="tab-2"] .hds-tabs__tab-button');
    assertCssVarsCloseTo(assert, tablistStyle['cssText'], [51, 51]); // --indicator-left-pos: 51px; --indicator-width: 51px;
  });

  // eslint-disable-next-line qunit/require-expect
  test('tab indicator should respond to content size changes', async function (assert) {
    this.set('count', 5);
    await render(hbs`
      <Hds::Tabs id="test-tabs" as |T|>
        <T.Tab data-test="tab-1" @count="{{this.count}}">One</T.Tab>
        <T.Tab data-test="tab-2">Two</T.Tab>
        <T.Panel data-test="panel-1">Content 1</T.Panel>
        <T.Panel data-test="panel-2">Content 2</T.Panel>
      </Hds::Tabs>
    `);
    let tablistStyle = find('.hds-tabs__tablist').style;
    assertCssVarsCloseTo(assert, tablistStyle['cssText'], [0, 81]); // --indicator-left-pos: 0px; --indicator-width: 81px;
    this.set('count', 12345);
    await settled();
    assertCssVarsCloseTo(assert, tablistStyle['cssText'], [0, 112]); // --indicator-left-pos: 0px; --indicator-width: 112px;
  });

  // eslint-disable-next-line qunit/require-expect
  test('tab indicator should not move when focus is shifted to another tab', async function (assert) {
    const leftArrowKey = 37;
    const spaceKey = 32;
    await this.createTabs();
    let tablistStyle = find('.hds-tabs__tablist').style;
    // test that the indicator is in the right position
    assertCssVarsCloseTo(assert, tablistStyle['cssText'], [0, 51]); // --indicator-left-pos: 0px; --indicator-width: 51px;
    // focus 2nd tab:
    await focus('[data-test="tab-2"] .hds-tabs__tab-button');
    // test that the navigated to tab is now focused:
    assert.dom('[data-test="tab-2"] .hds-tabs__tab-button').isFocused();
    // activate the focused tab using the space key:
    await triggerKeyEvent(
      '[data-test="tab-2"] .hds-tabs__tab-button',
      'keyup',
      spaceKey
    );
    // test that the indicator has changed position
    assertCssVarsCloseTo(assert, tablistStyle['cssText'], [51, 51]); // --indicator-left-pos: 51px; --indicator-width: 51px;
    // navigate back to the previous (1st) tab using left arrow key:
    await triggerKeyEvent(
      '[data-test="tab-2"] .hds-tabs__tab-button',
      'keyup',
      leftArrowKey
    );
    // test that the navigated to tab is now focused:
    assert.dom('[data-test="tab-1"] .hds-tabs__tab-button').isFocused();
    // test that the indicator did _not_ changed position (tab has not been activated, just focused)
    assertCssVarsCloseTo(assert, tablistStyle['cssText'], [51, 51]); // --indicator-left-pos: 51px; --indicator-width: 51px;
  });

  // ===============================================================
  // ===============================================================
  // ===============================================================

  // NESTED TABS

  test('it should have the correct selection of tabs (via @isSelected) and correct indicator at different stages', async function (assert) {
    await render(hbs`
      <Hds::Tabs id="test-tabs" as |T|>
        <T.Tab data-test="tab-1">One</T.Tab>
        <T.Tab data-test="tab-2" @isSelected={{true}}>Two</T.Tab>
        <T.Panel data-test="panel-1">
          <Hds::Tabs id="test-tabs-sub1" as |T|>
            <T.Tab data-test="tab-1__subtab-1">Tab One / Subtab One</T.Tab>
            <T.Tab data-test="tab-1__subtab-2">Tab One / Subtab Two</T.Tab>
            <T.Panel data-test="tab-1__panel-1">Tab One / Subcontent 1</T.Panel>
            <T.Panel data-test="tab-1__panel-2">Tab One / SubContent 2</T.Panel>
          </Hds::Tabs>
        </T.Panel>
        <T.Panel data-test="panel-2">
          <Hds::Tabs id="test-tabs-sub2" as |T|>
            <T.Tab data-test="tab-2__subtab-1">Tab Two / Subtab One</T.Tab>
            <T.Tab data-test="tab-2__subtab-2" @isSelected={{true}}>Tab Two / Subtab Two</T.Tab>
            <T.Panel data-test="tab-2__panel-1">Tab Two / Subcontent 1</T.Panel>
            <T.Panel data-test="tab-2__panel-2">Tab Two / SubContent 2</T.Panel>
          </Hds::Tabs>
        </T.Panel>
      </Hds::Tabs>
    `);

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
        '[data-test="panel-2"] [data-test="tab-2__subtab-2"] .hds-tabs__tab-button'
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
        '[data-test="panel-1"] [data-test="tab-1__subtab-1"] .hds-tabs__tab-button'
      )
      .hasAttribute('aria-selected', 'true');
    assert
      .dom('[data-test="panel-1"] [data-test="tab-1__panel-1"]')
      .doesNotHaveAttribute('hidden');
  });

  test('it should have the correct selection of tabs (via @selectedTabIndex) and correct indicator at different stages', async function (assert) {
    await render(hbs`
      <Hds::Tabs id="test-tabs" @selectedTabIndex={{1}} as |T|>
        <T.Tab data-test="tab-1">One</T.Tab>
        <T.Tab data-test="tab-2">Two</T.Tab>
        <T.Panel data-test="panel-1">
          <Hds::Tabs id="test-tabs-sub1" as |T|>
            <T.Tab data-test="tab-1__subtab-1">Tab One / Subtab One</T.Tab>
            <T.Tab data-test="tab-1__subtab-2">Tab One / Subtab Two</T.Tab>
            <T.Panel data-test="tab-1__panel-1">Tab One / Subcontent 1</T.Panel>
            <T.Panel data-test="tab-1__panel-2">Tab One / SubContent 2</T.Panel>
          </Hds::Tabs>
        </T.Panel>
        <T.Panel data-test="panel-2">
          <Hds::Tabs id="test-tabs-sub2" @selectedTabIndex={{1}} as |T|>
            <T.Tab data-test="tab-2__subtab-1">Tab Two / Subtab One</T.Tab>
            <T.Tab data-test="tab-2__subtab-2">Tab Two / Subtab Two</T.Tab>
            <T.Panel data-test="tab-2__panel-1">Tab Two / Subcontent 1</T.Panel>
            <T.Panel data-test="tab-2__panel-2">Tab Two / SubContent 2</T.Panel>
          </Hds::Tabs>
        </T.Panel>
      </Hds::Tabs>
    `);

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
        '[data-test="panel-2"] [data-test="tab-2__subtab-2"] .hds-tabs__tab-button'
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
        '[data-test="panel-1"] [data-test="tab-1__subtab-1"] .hds-tabs__tab-button'
      )
      .hasAttribute('aria-selected', 'true');
    assert
      .dom('[data-test="panel-1"] [data-test="tab-1__panel-1"]')
      .doesNotHaveAttribute('hidden');
  });
});
