/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  focus,
  triggerKeyEvent
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/stepper/navigation',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      this.set('createStepperNavigation', async (args = {}) => {
        this.currentStep = args.currentStep ?? undefined;
        this.titleTag = args.titleTag ?? undefined;
        this.onStepChange = args.onStepChange ?? undefined;
        this.step1IsInteractive = args.step1IsInteractive ?? undefined;
        this.step2IsInteractive = args.step2IsInteractive ?? undefined;
        return await render(hbs`
          <Hds::Stepper::Navigation id="test-stepper-navigation" @currentStep={{this.currentStep}} @titleTag={{this.titleTag}} @onStepChange={{this.onStepChange}} as |S|>
            <S.Step data-test="step-1" @isInteractive={{this.step1IsInteractive}}>
            </S.Step>
            <S.Step data-test="step-2" @isInteractive={{this.step2IsInteractive}}>
            </S.Step>
            <S.Panel></S.Panel>
            <S.Panel></S.Panel>
          </Hds::Stepper::Navigation>
          <button id="test-button">Hello</button>
        `);
      });

      this.set('createStepperNavigationArray', async (args = {}) => {
        this.currentStep = args.currentStep ?? undefined;
        this.titleTag = args.titleTag ?? undefined;
        this.onStepChange = args.onStepChange ?? undefined;
        this.step1Title = args.step1Title ?? undefined;
        this.step1Description = args.step1Description ?? undefined;
        this.step1IsComplete = args.step1IsComplete ?? undefined;
        this.step1IsInteractive = args.step1IsInteractive ?? undefined;
        return await render(hbs`
          <Hds::Stepper::Navigation
            id="test-stepper-navigation"
            @steps={{array
              (hash title=this.step1Title description=this.step1Description isComplete=this.step1IsComplete isInteractive=this.step1IsInteractive)
              (hash title="Step 2")
            }}
            @currentStep={{this.currentStep}}
            @titleTag={{this.titleTag}}
            @onStepChange={{this.onStepChange}}
          >
            <:body>
            </:body>
          </Hds::Stepper::Navigation>
        `);
      });
    });

    // CLASSES

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await this.createStepperNavigation();
      assert
        .dom('#test-stepper-navigation')
        .hasClass('hds-stepper-navigation');
    });

    // STEPS

    test('it sets the step title when using the @steps argument', async function (assert) {
      await this.createStepperNavigationArray({step1Title: 'Test'});
      assert.dom('.hds-stepper-navigation__step__title').containsText('Test');
    });

    test('it sets the step description when using the @steps argument', async function (assert) {
      await this.createStepperNavigationArray({step1Description: 'Test'});
      assert.dom('.hds-stepper-navigation__step__description').containsText('Test');
    });

    test('it sets the step to incomplete when using the @steps argument and isComplete is not provided', async function (assert) {
      await this.createStepperNavigationArray();
      let step2 = document.querySelectorAll('.hds-stepper-navigation__step')[1];
      assert.true(step2.classList.contains('hds-stepper-navigation__step-incomplete'));
    });

    test('it sets the step to complete when using the @steps argument and isComplete is provided', async function (assert) {
      await this.createStepperNavigationArray({step1IsComplete: true, currentStep: 1});
      assert.dom('.hds-stepper-navigation__step').hasClass('hds-stepper-navigation__step-complete');
    });

    test('it doest not set the step to interactive when using the @steps argument and isInteractive is not provided', async function (assert) {
      await this.createStepperNavigationArray();
      assert.dom('.hds-stepper-navigation__step .hds-stepper-navigation__step__btn').hasAttribute('aria-disabled', 'true');
    });

    test('it sets the step to interactive when using the @steps argument and isInteractive is provided', async function (assert) {
      await this.createStepperNavigationArray({step1IsInteractive: true});
      assert.dom('.hds-stepper-navigation__step .hds-stepper-navigation__step__btn').doesNotHaveAttribute('aria-disabled');
    });

    test('it should have 2 Steps and 2 Panels', async function (assert) {
      await this.createStepperNavigationArray();
      assert.dom('.hds-stepper-navigation__step').exists({ count: 2 });
      assert.dom('.hds-stepper-navigation__panel').exists({ count: 2 });
    });

    // TITLE TAG

    test('it renders a div when the @titleTag argument is not provided', async function (assert) {
      await this.createStepperNavigation();
      assert.dom('.hds-stepper-navigation__step__title').hasTagName('div');
    });

    test('it renders the custom title tag when the @titleTag argument is provided', async function (assert) {
      await this.createStepperNavigation({titleTag: 'h2'});
      assert.dom('.hds-stepper-navigation__step__title').hasTagName('h2');
    });

    // CURRENT STEP

    test('it sets the first step to active when the @currentStep argument is not provided', async function (assert) {
      await this.createStepperNavigation();
      assert.dom('[data-test="step-1"]').hasClass('hds-stepper-navigation__step-active');
    });

    test('it sets the step number provided active when the @currentStep argument is provided', async function (assert) {
      await this.createStepperNavigation({currentStep: 1});
      assert.dom('[data-test="step-2"]').hasClass('hds-stepper-navigation__step-active');
    });

    // CALLBACKS: ONSTEPCHANGE

    test('on step click it should invoke the `onStepChange` callback function', async function (assert) {
      let clicked = false;
      let stepNumber = -1;
      this.set('onClick', (_event, index) => {
        clicked = true;
        stepNumber = index;
      });
      await this.createStepperNavigation({ onStepChange: this.onClick, step1IsInteractive: true });
      await click('[data-test="step-1"] .hds-stepper-navigation__step__btn');
      assert.ok(clicked);
      assert.strictEqual(stepNumber, 0);
    });

    // KEYBOARD CONTROLS

    test('it should focus interactive steps and navigate through them using left and right arrow keys', async function (assert) {
      const leftArrowKey = 37;
      const rightArrowKey = 39;
      await this.createStepperNavigation({step1IsInteractive: true, step2IsInteractive: true, currentStep: 1});

      // focus 2nd step:
      assert.dom('[data-test="step-2"] .hds-stepper-navigation__step__btn').exists();
      await focus('[data-test="step-2"] .hds-stepper-navigation__step__btn');
      // test that the navigated to step is now focused:
      assert.dom('[data-test="step-2"] .hds-stepper-navigation__step__btn').isFocused();

      // navigate to the previous (1st) step using right arrow key:
      await triggerKeyEvent(
        '[data-test="step-2"] .hds-stepper-navigation__step__btn',
        'keyup',
        rightArrowKey
      );
      // test that the navigated to step is now focused:
      assert.dom('[data-test="step-1"] .hds-stepper-navigation__step__btn').isFocused();

      // navigate back to the next (2nd) step using left arrow key:
      await triggerKeyEvent(
        '[data-test="step-1"] .hds-stepper-navigation__step__btn',
        'keyup',
        leftArrowKey
      );
      // test that the navigated to step is now focused:
      assert.dom('[data-test="step-2"] .hds-stepper-navigation__step__btn').isFocused();
    });
  }
);
