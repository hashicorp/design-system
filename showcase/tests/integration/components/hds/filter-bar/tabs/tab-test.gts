/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { TrackedObject } from 'tracked-built-ins';
import {
  render,
  settled,
  click,
  focus,
  triggerKeyEvent,
} from '@ember/test-helpers';

import { HdsFilterBarTabsTab } from '@hashicorp/design-system-components/components';

module('Integration | Component | hds/filter-bar/tabs/tab', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsFilterBarTabsTab data-test="tab-1" /></template>,
    );
    assert.dom('[data-test="tab-1"]').hasClass('hds-filter-bar__tabs__tab');
  });

  // DIDINSERTNODE

  test('it passes the correct content from the tab in the @didInsertNode action', async function (assert) {
    const context = new TrackedObject<{
      isTriggered: boolean;
      element: HTMLElement | undefined;
      tabId: string;
    }>({
      isTriggered: false,
      element: undefined,
      tabId: '',
    });

    const didInsertNode = (element: HTMLElement, tabId: string) => {
      context.isTriggered = true;
      context.element = element;
      context.tabId = tabId;
    };

    await render(
      <template>
        <HdsFilterBarTabsTab
          data-test="tab-1"
          @didInsertNode={{didInsertNode}}
        />
      </template>,
    );

    const tabElement = document.querySelector(
      '[data-test="tab-1"] .hds-filter-bar__tabs__tab__button',
    ) as HTMLElement;

    assert.ok(context.isTriggered);
    assert.strictEqual(context.element, tabElement);
    assert.equal(context.tabId, context.element?.getAttribute('id'));
  });

  // WILLDESTROYNODE

  test('it passes the correct content from the tab in the @willDestroyNode action', async function (assert) {
    const context = new TrackedObject<{
      isVisible: boolean;
      isTriggered: boolean;
      element: HTMLElement | undefined;
    }>({
      isVisible: true,
      isTriggered: false,
      element: undefined,
    });

    const willDestroyNode = (element: HTMLElement) => {
      context.isTriggered = true;
      context.element = element;
    };

    await render(
      <template>
        {{#if context.isVisible}}
          <HdsFilterBarTabsTab
            data-test="tab-1"
            @willDestroyNode={{willDestroyNode}}
          />
        {{/if}}
      </template>,
    );

    const tabElement = document.querySelector(
      '[data-test="tab-1"] .hds-filter-bar__tabs__tab__button',
    ) as HTMLElement;

    context.isVisible = false;
    await settled();

    assert.ok(context.isTriggered);
    assert.strictEqual(context.element, tabElement);
  });

  // TABIDS, PANELIDS

  test('it sets the correct tab and panel IDs based on the @tabIds and @panelIds arguments', async function (assert) {
    const context = new TrackedObject<{
      tabIds: string[];
      panelIds: string[];
    }>({
      tabIds: ['tab-1'],
      panelIds: ['panel-1'],
    });

    // For testing purposes we use @didInsertNode to align the tabIds with the generated tab ID
    const didInsertNode = (element: HTMLElement, tabId: string) => {
      context.tabIds = [tabId];
    };

    await render(
      <template>
        <HdsFilterBarTabsTab
          @tabIds={{context.tabIds}}
          @panelIds={{context.panelIds}}
          @didInsertNode={{didInsertNode}}
          @selectedTabIndex={{0}}
        />
      </template>,
    );

    assert
      .dom('.hds-filter-bar__tabs__tab__button')
      .hasAttribute('aria-controls', 'panel-1');
  });

  // SELECTION

  test('it sets the tab to not selected when the @selectedTabIndex argument does not match the tab index in the @tabIds argument', async function (assert) {
    const context = new TrackedObject<{
      tabIds: string[];
      panelIds: string[];
    }>({
      tabIds: ['tab-1'],
      panelIds: ['panel-1'],
    });

    // For testing purposes we use @didInsertNode to align the tabIds with the generated tab ID
    const didInsertNode = (element: HTMLElement, tabId: string) => {
      context.tabIds = [tabId];
    };

    await render(
      <template>
        <HdsFilterBarTabsTab
          @tabIds={{context.tabIds}}
          @panelIds={{context.panelIds}}
          @didInsertNode={{didInsertNode}}
          @selectedTabIndex={{1}}
        />
      </template>,
    );

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

  test('it sets the tab to selected when the @selectedTabIndex argument does match the tab index in the @tabIds argument', async function (assert) {
    const context = new TrackedObject<{
      tabIds: string[];
      panelIds: string[];
    }>({
      tabIds: ['tab-1'],
      panelIds: ['panel-1'],
    });

    // For testing purposes we use @didInsertNode to align the tabIds with the generated tab ID
    const didInsertNode = (element: HTMLElement, tabId: string) => {
      context.tabIds = [tabId];
    };

    await render(
      <template>
        <HdsFilterBarTabsTab
          @tabIds={{context.tabIds}}
          @panelIds={{context.panelIds}}
          @didInsertNode={{didInsertNode}}
          @selectedTabIndex={{0}}
        />
      </template>,
    );

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

  // CALLBACKS: ONCLICK

  test('it calls the @onClick callback when the tab is clicked', async function (assert) {
    const context = new TrackedObject<{
      tabIds: string[];
      panelIds: string[];
      isTriggered: boolean;
      nodeIndex: number | undefined;
    }>({
      tabIds: ['tab-1'],
      panelIds: ['panel-1'],
      isTriggered: false,
      nodeIndex: undefined,
    });

    const onClick = (event: MouseEvent, nodeIndex: number) => {
      context.isTriggered = true;
      context.nodeIndex = nodeIndex;
    };

    // For testing purposes we use @didInsertNode to align the tabIds with the generated tab ID
    const didInsertNode = (element: HTMLElement, tabId: string) => {
      context.tabIds = [tabId];
    };

    await render(
      <template>
        <HdsFilterBarTabsTab
          @tabIds={{context.tabIds}}
          @panelIds={{context.panelIds}}
          @didInsertNode={{didInsertNode}}
          @onClick={{onClick}}
        />
      </template>,
    );

    await click('.hds-filter-bar__tabs__tab__button');
    assert.ok(context.isTriggered);
    assert.equal(context.nodeIndex, 0);
  });

  // CALLBACKS: ONKEYDOWN

  test('it calls the @onKeyDown callback when the tab is focused and a key is pressed', async function (assert) {
    const context = new TrackedObject<{
      tabIds: string[];
      panelIds: string[];
      isTriggered: boolean;
      nodeIndex: number | undefined;
    }>({
      tabIds: ['tab-1'],
      panelIds: ['panel-1'],
      isTriggered: false,
      nodeIndex: undefined,
    });

    const onKeydown = (event: KeyboardEvent, nodeIndex: number) => {
      context.isTriggered = true;
      context.nodeIndex = nodeIndex;
    };

    // For testing purposes we use @didInsertNode to align the tabIds with the generated tab ID
    const didInsertNode = (element: HTMLElement, tabId: string) => {
      context.tabIds = [tabId];
    };

    await render(
      <template>
        <HdsFilterBarTabsTab
          @tabIds={{context.tabIds}}
          @panelIds={{context.panelIds}}
          @didInsertNode={{didInsertNode}}
          @onKeydown={{onKeydown}}
        />
      </template>,
    );

    await focus('.hds-filter-bar__tabs__tab__button');
    await triggerKeyEvent(
      '.hds-filter-bar__tabs__tab__button',
      'keydown',
      'Enter',
    );
    assert.ok(context.isTriggered);
    assert.equal(context.nodeIndex, 0);
  });
});
