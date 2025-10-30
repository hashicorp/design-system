/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { array, hash } from '@ember/helper';
import {
  click,
  focus,
  render,
  setupOnerror,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsStepperNav } from '@hashicorp/design-system-components/components';
import type { HdsStepperTitleTags } from '@hashicorp/design-system-components/components/hds/stepper/types';

import { setupRenderingTest } from 'showcase/tests/helpers';

const createStepperNav = async (options: {
  currentStep?: number;
  isInteractive?: boolean;
  titleTag?: HdsStepperTitleTags;
  onStepChange?: (event: Event, stepIndex: number) => void;
  ariaLabel?: string;
}) => {
  const ariaLabel = options.ariaLabel ?? 'Label';
  return await render(
    <template>
      <HdsStepperNav
        id="test-stepper-nav"
        @currentStep={{options.currentStep}}
        @titleTag={{options.titleTag}}
        @isInteractive={{options.isInteractive}}
        @ariaLabel={{ariaLabel}}
        @onStepChange={{options.onStepChange}}
        as |S|
      >
        <S.Step data-test="step-1" />
        <S.Step data-test="step-2" />
        <S.Panel />
        <S.Panel />
      </HdsStepperNav>
    </template>,
  );
};

const createStepperNavArray = async (options: {
  currentStep?: number;
  titleTag?: HdsStepperTitleTags;
  onStepChange?: (event: Event, stepIndex: number) => void;
  step1Title?: string;
  step1Description?: string;
  ariaLabel?: string;
}) => {
  const ariaLabel = options.ariaLabel ?? 'Label';
  const step1Title = options.step1Title ?? 'Step 1';

  return await render(
    <template>
      <HdsStepperNav
        id="test-stepper-nav"
        @steps={{array
          (hash title=step1Title description=options.step1Description)
          (hash title="Step 2")
        }}
        @currentStep={{options.currentStep}}
        @titleTag={{options.titleTag}}
        @ariaLabel={{ariaLabel}}
        @onStepChange={{options.onStepChange}}
      >
        <:body>
        </:body>
      </HdsStepperNav>
    </template>,
  );
};

module('Integration | Component | hds/stepper/nav', function (hooks) {
  setupRenderingTest(hooks);

  // CLASSES

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await createStepperNav({});
    assert.dom('#test-stepper-nav').hasClass('hds-stepper-nav');
  });

  // STEPS

  test('it sets the step title when using the @steps argument', async function (assert) {
    await createStepperNavArray({ step1Title: 'Test' });
    assert.dom('.hds-stepper-nav__step-title').containsText('Test');
  });

  test('it sets the step description when using the @steps argument', async function (assert) {
    await createStepperNavArray({ step1Description: 'Test' });
    assert.dom('.hds-stepper-nav__step-description').containsText('Test');
  });

  test('it should have 2 Steps and 2 Panels', async function (assert) {
    await createStepperNavArray({});
    assert.dom('.hds-stepper-nav__step').exists({ count: 2 });
    assert.dom('.hds-stepper-nav__panel').exists({ count: 2 });
  });

  test('it should have 2 Steps and no Panels if no :body named block is added', async function (assert) {
    await render(
      <template>
        <HdsStepperNav
          id="test-stepper-nav"
          @steps={{array (hash title="Step 1") (hash title="Step 2")}}
          @currentStep={{0}}
          @isInteractive={{false}}
          @ariaLabel="Sample stepper"
        />
      </template>,
    );
    assert.dom('.hds-stepper-nav__step').exists({ count: 2 });
    assert.dom('.hds-stepper-nav__panel').doesNotExist();
  });

  // TITLE TAG

  test('it renders a div when the @titleTag argument is not provided', async function (assert) {
    await createStepperNav({});
    assert.dom('.hds-stepper-nav__step-title').hasTagName('div');
  });

  test('it renders the custom title tag when the @titleTag argument is provided', async function (assert) {
    await createStepperNav({ titleTag: 'h2' });
    assert.dom('.hds-stepper-nav__step-title').hasTagName('h2');
  });

  // CURRENT STEP

  test('it sets the first step to active when the @currentStep argument is not provided', async function (assert) {
    await createStepperNav({});
    assert
      .dom('[data-test="step-1"]')
      .hasClass('hds-stepper-nav__step--active');
  });

  test('it sets the step number provided active when the @currentStep argument is provided', async function (assert) {
    await createStepperNav({ currentStep: 1 });
    assert
      .dom('[data-test="step-2"]')
      .hasClass('hds-stepper-nav__step--active');
  });

  // ISINTERACTIVE

  test('it sets the steps to interactive when the @isInteractive argument is not provided', async function (assert) {
    await createStepperNav({});
    assert.dom('.hds-stepper-nav__list').hasAttribute('role', 'tablist');
    assert
      .dom('[data-test="step-1"]')
      .hasClass('hds-stepper-nav__step--nav-interactive');
    assert.dom('.hds-stepper-nav__panel').hasAttribute('role', 'tabpanel');
  });

  test('it sets the steps to non-interactive when the @isInteractive argument is provided', async function (assert) {
    await createStepperNav({ isInteractive: false });
    assert.dom('.hds-stepper-nav__list').hasNoAttribute('role');
    assert
      .dom('[data-test="step-1"]')
      .hasNoClass('hds-stepper-nav__step--nav-interactive');
    assert.dom('.hds-stepper-nav__panel').hasNoAttribute('role');
  });

  // ARIA LABEL

  test('it sets the aria-label of the ol to the value provided to the @ariaLabel argument', async function (assert) {
    await createStepperNav({ ariaLabel: 'test' });
    assert.dom('.hds-stepper-nav__list').hasAttribute('aria-label', 'test');
  });

  // CALLBACKS: ONSTEPCHANGE

  test('on step click it should invoke the `onStepChange` callback function', async function (assert) {
    const context = new TrackedObject({
      isClicked: false,
      stepNumber: 1,
    });

    const onClick = (_event: Event, index: number) => {
      context.isClicked = true;
      context.stepNumber = index;
    };

    await createStepperNav({
      currentStep: context.stepNumber,
      onStepChange: onClick,
      isInteractive: true,
    });
    await click('[data-test="step-1"] .hds-stepper-nav__step-button');
    assert.ok(context.isClicked);
    assert.strictEqual(context.stepNumber, 0);
  });

  // KEYBOARD CONTROLS

  test('it should focus interactive steps and navigate through them using left and right arrow keys', async function (assert) {
    const leftArrowKey = 37;
    const rightArrowKey = 39;
    await createStepperNav({
      isInteractive: true,
      currentStep: 1,
    });

    // focus 2nd step:
    assert.dom('[data-test="step-2"] .hds-stepper-nav__step-button').exists();
    await focus('[data-test="step-2"] .hds-stepper-nav__step-button');
    // test that the navigated to step is now focused:
    assert
      .dom('[data-test="step-2"] .hds-stepper-nav__step-button')
      .isFocused();

    // navigate to the previous (1st) step using right arrow key:
    await triggerKeyEvent(
      '[data-test="step-2"] .hds-stepper-nav__step-button',
      'keyup',
      rightArrowKey,
    );
    // test that the navigated to step is now focused:
    assert
      .dom('[data-test="step-1"] .hds-stepper-nav__step-button')
      .isFocused();

    // navigate back to the next (2nd) step using left arrow key:
    await triggerKeyEvent(
      '[data-test="step-1"] .hds-stepper-nav__step-button',
      'keyup',
      leftArrowKey,
    );
    // test that the navigated to step is now focused:
    assert
      .dom('[data-test="step-2"] .hds-stepper-nav__step-button')
      .isFocused();
  });

  // ASSERTIONS

  test('it should throw an assertion if the number of steps does not match the number of panels and @isInteractive is provided', async function (assert) {
    const errorMessage =
      'If @isInteractive is true, the number of Steps must be equal to the number of Panels';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        <HdsStepperNav
          id="test-stepper-nav"
          @steps={{array (hash title="Step 1") (hash title="Step 2")}}
          @currentStep={{0}}
          @ariaLabel="Sample stepper"
        />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
