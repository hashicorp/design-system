/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { TrackedObject } from 'tracked-built-ins';
import { render, settled } from '@ember/test-helpers';

import { HdsFilterBarTabsPanel } from '@hashicorp/design-system-components/components';

module('Integration | Component | hds/filter-bar/tabs/panel', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsFilterBarTabsPanel data-test="panel-1" /></template>,
    );
    assert.dom('[data-test="panel-1"]').hasClass('hds-filter-bar__tabs__panel');
  });

  // DIDINSERTNODE

  test('it passes the correct content from the panel in the @didInsertNode action', async function (assert) {
    const context = new TrackedObject<{
      isTriggered: boolean;
      element: HTMLElement | undefined;
      panelId: string;
    }>({
      isTriggered: false,
      element: undefined,
      panelId: '',
    });

    const didInsertNode = (element: HTMLElement, panelId: string) => {
      context.isTriggered = true;
      context.element = element;
      context.panelId = panelId;
    };

    await render(
      <template>
        <HdsFilterBarTabsPanel
          data-test="panel-1"
          @didInsertNode={{didInsertNode}}
        />
      </template>,
    );

    const panelElement = document.querySelector(
      '[data-test="panel-1"]',
    ) as HTMLElement;

    assert.ok(context.isTriggered);
    assert.strictEqual(context.element, panelElement);
    assert.equal(context.panelId, context.element?.getAttribute('id'));
  });

  // WILLDESTROYNODE

  test('it passes the correct content from the panel in the @willDestroyNode action', async function (assert) {
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
          <HdsFilterBarTabsPanel
            data-test="panel-1"
            @willDestroyNode={{willDestroyNode}}
          />
        {{/if}}
      </template>,
    );

    const panelElement = document.querySelector(
      '[data-test="panel-1"]',
    ) as HTMLElement;

    context.isVisible = false;
    await settled();

    assert.ok(context.isTriggered);
    assert.strictEqual(context.element, panelElement);
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

    // For testing purposes we use @didInsertNode to align the panelIds with the generated panel ID
    const didInsertNode = (element: HTMLElement, panelId: string) => {
      context.panelIds = [panelId];
    };

    await render(
      <template>
        <HdsFilterBarTabsPanel
          @tabIds={{context.tabIds}}
          @panelIds={{context.panelIds}}
          @didInsertNode={{didInsertNode}}
          @selectedTabIndex={{0}}
        />
      </template>,
    );

    assert
      .dom('.hds-filter-bar__tabs__panel')
      .hasAttribute('aria-labelledby', 'tab-1');
  });

  // VISIBILITY

  test('it sets the panel content to visible when the @selectedTabIndex argument matches the panel index in the @panelIds argument', async function (assert) {
    const context = new TrackedObject<{
      tabIds: string[];
      panelIds: string[];
    }>({
      tabIds: ['tab-1'],
      panelIds: ['panel-1'],
    });

    // For testing purposes we use @didInsertNode to align the panelIds with the generated panel ID
    const didInsertNode = (element: HTMLElement, panelId: string) => {
      context.panelIds = [panelId];
    };

    await render(
      <template>
        <HdsFilterBarTabsPanel
          @tabIds={{context.tabIds}}
          @panelIds={{context.panelIds}}
          @didInsertNode={{didInsertNode}}
          @selectedTabIndex={{0}}
        >
          <div id="test-panel-content">Test</div>
        </HdsFilterBarTabsPanel>
      </template>,
    );

    assert.dom('.hds-filter-bar__tabs__panel').hasNoAttribute('hidden');
    assert.dom('#test-panel-content').exists();
  });

  test('it sets the panel content to not visible when the @selectedTabIndex argument does not match the panel index in the @panelIds argument', async function (assert) {
    const context = new TrackedObject<{
      tabIds: string[];
      panelIds: string[];
    }>({
      tabIds: ['tab-1', 'tab-2'],
      panelIds: ['panel-1', 'panel-2'],
    });

    // For testing purposes we use @didInsertNode to align the panelIds with the generated panel ID
    const didInsertNode = (element: HTMLElement, panelId: string) => {
      context.panelIds = [panelId, 'panel-2'];
    };

    await render(
      <template>
        <HdsFilterBarTabsPanel
          @tabIds={{context.tabIds}}
          @panelIds={{context.panelIds}}
          @didInsertNode={{didInsertNode}}
          @selectedTabIndex={{1}}
        >
          <div id="test-panel-content">Test</div>
        </HdsFilterBarTabsPanel>
      </template>,
    );

    assert.dom('.hds-filter-bar__tabs__panel').hasAttribute('hidden');
    assert.dom('#test-panel-content').doesNotExist();
  });
});
