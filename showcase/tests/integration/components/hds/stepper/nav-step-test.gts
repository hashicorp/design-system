/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, click, settled, triggerKeyEvent } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsStepperNavStep } from '@hashicorp/design-system-components/components';
import type { HdsStepperTitleTags } from '@hashicorp/design-system-components/components/hds/stepper/types';

import { setupRenderingTest } from 'showcase/tests/helpers';

const createNavStep = async (options: {
  title?: string;
  description?: string;
  currentStep?: number;
  isNavInteractive?: boolean;
  titleTag?: HdsStepperTitleTags;
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
    const step = document.querySelector(
      '.hds-stepper-nav__step-content',
    ) as HTMLElement;
    const stepId = step.getAttribute('id') ?? '';
    context.stepIds = [stepId];
  };

  return await render(
    <template>
      <HdsStepperNavStep
        @currentStep={{currentStep}}
        @isNavInteractive={{options.isNavInteractive}}
        @titleTag={{options.titleTag}}
        @stepIds={{context.stepIds}}
        @panelIds={{context.panelIds}}
        @didInsertNode={{didInsertNode}}
      >
        <:title>{{options.title}}</:title>
        <:description>{{options.description}}</:description>
      </HdsStepperNavStep>
    </template>,
  );
};

module('Integration | Component | hds/stepper/nav/step', function (hooks) {
  setupRenderingTest(hooks);

  // CLASSES

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsStepperNavStep id="test-stepper-nav-step" @currentStep={{0}} />
      </template>,
    );
    assert.dom('#test-stepper-nav-step').hasClass('hds-stepper-nav__step');
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
      const step = document.querySelector(
        '.hds-stepper-nav__step-content',
      ) as HTMLElement;
      const stepId = step.getAttribute('id') ?? '';
      context.stepIds = [stepId];
    };

    await render(
      <template>
        <HdsStepperNavStep
          @currentStep={{0}}
          @stepIds={{context.stepIds}}
          @panelIds={{context.panelIds}}
          @didInsertNode={{didInsertNode}}
        />
      </template>,
    );

    assert
      .dom('.hds-stepper-nav__step-button')
      .hasAttribute('aria-controls', 'panel-1');
  });

  // stepNumber

  test('it sets the step number automatically based on the step ids provided', async function (assert) {
    await createNavStep({});
    assert.dom('.hds-stepper-indicator-step__text').hasText('1');
  });

  // navInteractive

  test('it sets the step to interactive when the @isNavInteractive argument is not provided to the parent', async function (assert) {
    await createNavStep({});
    assert.dom('.hds-stepper-nav__step').hasAttribute('role', 'presentation');
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--nav-interactive');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--is-interactive');
    assert
      .dom('.hds-stepper-nav__step-content')
      .hasClass('hds-stepper-nav__step-button');
  });

  test('it sets the step to non-interactive when the @isNavInteractive argument is provided to the parent', async function (assert) {
    await createNavStep({ isNavInteractive: false });
    assert.dom('.hds-stepper-nav__step').hasNoAttribute('role');
    assert
      .dom('.hds-stepper-nav__step')
      .hasNoClass('hds-stepper-nav__step--interactive');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasNoClass('hds-stepper-indicator-step--is-interactive');
    assert
      .dom('.hds-stepper-nav__step-content')
      .hasNoClass('hds-stepper-nav__step-button');
  });

  // titleTag

  test('it renders a div when the @titleTag argument is not provided', async function (assert) {
    await createNavStep({});
    assert.dom('.hds-stepper-nav__step-title').hasTagName('div');
  });

  test('it renders the custom title tag when the @titleTag argument is provided', async function (assert) {
    await createNavStep({ titleTag: 'h2' });
    assert.dom('.hds-stepper-nav__step-title').hasTagName('h2');
  });

  // STATUS - INTERACTIVE

  test('it sets the step to incomplete when the @currentStep is less than the nodeIndex and @isNavInteractive is true', async function (assert) {
    await render(
      <template>
        <HdsStepperNavStep @currentStep={{2}} @isNavInteractive={{true}}>
          <:title>Title</:title>
          <:description>Description</:description>
        </HdsStepperNavStep>
      </template>,
    );
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--incomplete');
    assert.dom('.hds-stepper-nav__step-button').hasAttribute('tabindex', '-1');
    assert
      .dom('.hds-stepper-nav__step-button')
      .hasAttribute('aria-selected', 'false');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-incomplete');
    assert.dom('.sr-only').hasNoText();
  });

  test('it sets the step to complete when the @currentStep is greater than the nodeIndex and @isNavInteractive is true', async function (assert) {
    await createNavStep({ currentStep: 1 });
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--complete');
    assert.dom('.hds-stepper-nav__step-button').hasAttribute('tabindex', '-1');
    assert
      .dom('.hds-stepper-nav__step-button')
      .hasAttribute('aria-selected', 'false');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-complete');
    assert.dom('.sr-only').hasText('(complete)');
  });

  test('it sets the step to active when the @currentStep is equal to the nodeIndex and @isNavInteractive is true', async function (assert) {
    await createNavStep({ currentStep: 0 });
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--active');
    assert.dom('.hds-stepper-nav__step-button').hasNoAttribute('tabindex');
    assert
      .dom('.hds-stepper-nav__step-button')
      .hasAttribute('aria-selected', 'true');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-progress');
    assert.dom('.sr-only').hasText('(current)');
  });

  // STATUS - NOT INTERACTIVE

  test('it sets the step to incomplete when the @currentStep is less than the nodeIndex and @isNavInteractive is false', async function (assert) {
    await render(
      <template>
        <HdsStepperNavStep @currentStep={{2}} @isNavInteractive={{false}}>
          <:title>Title</:title>
          <:description>Description</:description>
        </HdsStepperNavStep>
      </template>,
    );
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--incomplete');
    assert.dom('.hds-stepper-nav__step').hasAttribute('aria-current', 'false');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-incomplete');
    assert.dom('.sr-only').hasNoText();
  });

  test('it sets the step to complete when the @currentStep is greater than the nodeIndex and @isNavInteractive is false', async function (assert) {
    await createNavStep({ currentStep: 1, isNavInteractive: false });
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--complete');
    assert.dom('.hds-stepper-nav__step').hasAttribute('aria-current', 'false');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-complete');
    assert.dom('.sr-only').hasText('(complete)');
  });

  test('it sets the step to active when the @currentStep is equal to the nodeIndex and @isNavInteractive is false', async function (assert) {
    await createNavStep({ currentStep: 0, isNavInteractive: false });
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--active');
    assert.dom('.hds-stepper-nav__step').hasAttribute('aria-current', 'step');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-progress');
    assert.dom('.sr-only').hasText('(current)');
  });

  // NAMED BLOCKS

  // title

  test('it renders the title when the title contextual component block is used', async function (assert) {
    await createNavStep({ title: 'Test' });
    assert.dom('.hds-stepper-nav__step-title').containsText('Test');
  });

  // description

  test('it does not render the description when the description contextual component block is not used', async function (assert) {
    await render(<template><HdsStepperNavStep @currentStep={{0}} /></template>);
    assert.dom('.hds-stepper-nav__step-description').doesNotExist();
  });

  test('it renders the description when the description contextual component block is used', async function (assert) {
    await createNavStep({ description: 'Test' });
    assert.dom('.hds-stepper-nav__step-description').exists();
    assert.dom('.hds-stepper-nav__step-description').containsText('Test');
  });

  // CALLBACKS

  // didInsertNode

  test('it calls the @didInsertNode action when the component is inserted into the DOM', async function (assert) {
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
        <HdsStepperNavStep @currentStep={{0}} @didInsertNode={{didInsertNode}}>
          <:title>Title</:title>
          <:description>Description</:description>
        </HdsStepperNavStep>
      </template>,
    );

    assert.ok(context.isTriggered);
  });

  // willDestroyNode

  test('it passes the correct content from the step in the @willDestroyNode action', async function (assert) {
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
          <HdsStepperNavStep
            @currentStep={{0}}
            data-test="step-1"
            @willDestroyNode={{willDestroyNode}}
          />
        {{/if}}
      </template>,
    );

    const tabElement = document.querySelector(
      '[data-test="step-1"] .hds-stepper-nav__step-button',
    ) as HTMLElement;

    context.isVisible = false;
    await settled();

    assert.ok(context.isTriggered);
    assert.strictEqual(context.element, tabElement);
  });

  // onStepChange

  test('it calls the @onStepChange action when the step button is clicked', async function (assert) {
    const context = new TrackedObject<{
      isTriggered: boolean;
      stepNumber: number | undefined;
      stepIds: string[];
      panelIds: string[];
    }>({
      isTriggered: false,
      stepNumber: undefined,
      stepIds: ['step-1'],
      panelIds: ['panel-1'],
    });

    const didInsertNode = () => {
      const step = document.querySelector(
        '.hds-stepper-nav__step-content',
      ) as HTMLElement;
      const stepId = step.getAttribute('id') ?? '';
      context.stepIds = [stepId];
    };

    const onStepChange = (event: MouseEvent, stepNumber: number) => {
      context.isTriggered = true;
      context.stepNumber = stepNumber;
    };

    await render(
      <template>
        <HdsStepperNavStep
          @currentStep={{1}}
          @isNavInteractive={{true}}
          @stepIds={{context.stepIds}}
          @panelIds={{context.panelIds}}
          @didInsertNode={{didInsertNode}}
          @onStepChange={{onStepChange}}
        >
          <:title>Title</:title>
          <:description>Description</:description>
        </HdsStepperNavStep>
      </template>,
    );

    await click('.hds-stepper-nav__step-button');

    assert.ok(context.isTriggered);
    assert.equal(context.stepNumber, 0);
  });

  // onKeyUp

  test('it calls the @onKeyUp action when the step button is clicked', async function (assert) {
    const context = new TrackedObject<{
      isTriggered: boolean;
      stepNumber: number | undefined;
      stepIds: string[];
      panelIds: string[];
    }>({
      isTriggered: false,
      stepNumber: undefined,
      stepIds: ['step-1'],
      panelIds: ['panel-1'],
    });

    const didInsertNode = () => {
      const step = document.querySelector(
        '.hds-stepper-nav__step-content',
      ) as HTMLElement;
      const stepId = step.getAttribute('id') ?? '';
      context.stepIds = [stepId];
    };

    const onKeyUp = (stepNumber: number) => {
      context.isTriggered = true;
      context.stepNumber = stepNumber;
    };

    await render(
      <template>
        <HdsStepperNavStep
          @currentStep={{1}}
          @isNavInteractive={{true}}
          @stepIds={{context.stepIds}}
          @panelIds={{context.panelIds}}
          @didInsertNode={{didInsertNode}}
          @onKeyUp={{onKeyUp}}
        >
          <:title>Title</:title>
          <:description>Description</:description>
        </HdsStepperNavStep>
      </template>,
    );

    await triggerKeyEvent('.hds-stepper-nav__step-button', 'keyup', 'Enter');

    assert.ok(context.isTriggered);
    assert.equal(context.stepNumber, 0);
  });
});
