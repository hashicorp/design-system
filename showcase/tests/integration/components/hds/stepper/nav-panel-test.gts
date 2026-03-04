/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, settled } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsStepperNavPanel } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

const createNavPanel = async (options: {
  currentStep?: number;
  isNavInteractive?: boolean;
}) => {
  const context = new TrackedObject<{
    stepIds: string[];
    panelIds: string[];
  }>({
    stepIds: ['step-1'],
    panelIds: ['panel-1'],
  });

  const currentStep = options.currentStep ?? 0;

  // For testing purposes we use @didInsertNode to align the stepIds with the generated step ID
  const didInsertNode = () => {
    const panel = document.querySelector(
      '.hds-stepper-nav__panel',
    ) as HTMLElement;
    const panelId = panel.getAttribute('id') ?? '';
    context.panelIds = [panelId];
  };

  return await render(
    <template>
      <HdsStepperNavPanel
        @currentStep={{currentStep}}
        @isNavInteractive={{options.isNavInteractive}}
        @stepIds={{context.stepIds}}
        @panelIds={{context.panelIds}}
        @didInsertNode={{didInsertNode}}
      >
        <div id="test-panel-content">Test</div>
      </HdsStepperNavPanel>
    </template>,
  );
};

module('Integration | Component | hds/stepper/nav/panel', function (hooks) {
  setupRenderingTest(hooks);

  // CLASSES

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsStepperNavPanel @currentStep={{1}} data-test="panel-1" />
      </template>,
    );
    assert.dom('[data-test="panel-1"]').hasClass('hds-stepper-nav__panel');
  });

  // OPTIONS

  // stepIds, panelIds

  test('it sets the correct step and panel IDs based on the @stepIds and @panelIds arguments', async function (assert) {
    const context = new TrackedObject<{
      stepIds: string[];
      panelIds: string[];
    }>({
      stepIds: ['step-1'],
      panelIds: ['panel-1'],
    });

    const didInsertNode = () => {
      const panel = document.querySelector(
        '.hds-stepper-nav__panel',
      ) as HTMLElement;
      const panelId = panel.getAttribute('id') ?? '';
      context.panelIds = [panelId];
    };

    await render(
      <template>
        <HdsStepperNavPanel
          @currentStep={{0}}
          @stepIds={{context.stepIds}}
          @panelIds={{context.panelIds}}
          @didInsertNode={{didInsertNode}}
        />
      </template>,
    );

    assert
      .dom('.hds-stepper-nav__panel')
      .hasAttribute('aria-labelledby', 'step-1');
  });

  // isNavInteractive

  test('it sets the panel to interactive when the @isNavInteractive argument is not provided', async function (assert) {
    await createNavPanel({ currentStep: 0 });
    assert.dom('.hds-stepper-nav__panel').hasAttribute('role', 'tabpanel');
  });

  test('it sets the panel to non-interactive when the @isNavInteractive argument is provided', async function (assert) {
    await createNavPanel({ isNavInteractive: false });
    assert.dom('.hds-stepper-nav__panel').hasNoAttribute('role');
  });

  // CALLBACKS

  // didInsertNode

  test('it passes the correct content from the panel in the @didInsertNode action', async function (assert) {
    const context = new TrackedObject<{
      isTriggered: boolean;
    }>({
      isTriggered: false,
    });

    const didInsertNode = () => {
      context.isTriggered = true;
    };

    await render(
      <template>
        <HdsStepperNavPanel
          @currentStep={{0}}
          @didInsertNode={{didInsertNode}}
        />
      </template>,
    );

    assert.ok(context.isTriggered);
  });

  // willDestroyNode

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
          <HdsStepperNavPanel
            @currentStep={{0}}
            @willDestroyNode={{willDestroyNode}}
          />
        {{/if}}
      </template>,
    );

    const panelElement = document.querySelector(
      '.hds-stepper-nav__panel',
    ) as HTMLElement;

    context.isVisible = false;
    await settled();

    assert.ok(context.isTriggered);
    assert.strictEqual(context.element, panelElement);
  });

  // VISIBILITY

  test('it sets the panel content to not visible when the @currentStep argument does not match the panel index in the @panelIds argument', async function (assert) {
    await createNavPanel({ currentStep: 1 });
    assert.dom('.hds-stepper-nav__panel').hasAttribute('hidden');
    assert.dom('#test-panel-content').doesNotExist();
    assert.dom('.hds-stepper-nav__panel').hasAttribute('aria-labelledby');
  });

  test('it sets the panel content to visible when the @currentStep argument matches the panel index in the @panelIds argument', async function (assert) {
    await createNavPanel({ currentStep: 0 });
    assert.dom('.hds-stepper-nav__panel').hasNoAttribute('hidden');
    assert.dom('#test-panel-content').exists();
    assert.dom('.hds-stepper-nav__panel').hasAttribute('aria-labelledby');
  });
});
