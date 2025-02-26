/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

// NOTICE
// Because of how the `step` subcomponent is built,
// it's practically impossible to test in isolation, so in our tests
// in this file it will be wrapped inside its parent comoponent.

module(
  'Integration | Component | hds/stepper/navigation/step',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      this.set('createNavigationStep', async (args = {}) => {
        this.title = args.title ?? undefined;
        this.description = args.description ?? undefined;
        this.currentStep = args.currentStep ?? undefined;
        this.stepNumber = args.stepNumber ?? undefined;
        this.isInteractive = args.isInteractive ?? undefined;
        this.titleTag = args.titleTag ?? undefined;
        return await render(hbs`
          <Hds::Stepper::Navigation
            @currentStep={{this.currentStep}}
            @isInteractive={{this.isInteractive}}
            as |S|
          >
            <S.Step
              @stepNumber={{this.stepNumber}}
              @titleTag={{this.titleTag}}
            >
              <:title>{{this.title}}</:title>
              <:description>{{this.description}}</:description>
            </S.Step>
            <S.Panel />
          </Hds::Stepper::Navigation>
        `);
      });
    });

    // CLASSES

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Navigation::Step id="test-stepper-navigation-step" />`
      );
      assert
        .dom('#test-stepper-navigation-step')
        .hasClass('hds-stepper-navigation__step');
    });

    // STEP NUMBER

    test('it sets the step number automatically when the @stepNumber argument is not provided', async function (assert) {
      await this.createNavigationStep();
      assert.dom('.hds-stepper-indicator-step__text').hasText('1');
    });

    test('it sets the step number when the @stepNumber argument is provided', async function (assert) {
      await this.createNavigationStep({ stepNumber: 3 });
      assert.dom('.hds-stepper-indicator-step__text').hasText('3');
    });

    // NAVIGATION INTERACTIVE

    test('it sets the step to not interactive when the @isInteractive argument is not provided to the parent', async function (assert) {
      await this.createNavigationStep();
      assert.dom('.hds-stepper-navigation__step').hasNoAttribute('role');
      assert
        .dom('.hds-stepper-navigation__step')
        .hasNoClass('hds-stepper-navigation__step--interactive');
      assert
        .dom('.hds-stepper-indicator-step')
        .hasNoClass('hds-stepper-indicator-step--is-interactive');
      assert
        .dom('.hds-stepper-navigation__step__content')
        .hasNoClass('hds-stepper-navigation__step__btn');
    });

    test('it sets the step to interactive when the @isInteractive argument is provided to the parent', async function (assert) {
      await this.createNavigationStep({ isInteractive: true });
      assert
        .dom('.hds-stepper-navigation__step')
        .hasAttribute('role', 'presentation');
      assert
        .dom('.hds-stepper-navigation__step')
        .hasClass('hds-stepper-navigation__step--navigation-interactive');
      assert
        .dom('.hds-stepper-indicator-step')
        .hasClass('hds-stepper-indicator-step--is-interactive');
      assert
        .dom('.hds-stepper-navigation__step__content')
        .hasClass('hds-stepper-navigation__step__btn');
    });

    // STATES

    test('it sets the step to incomplete when the @currentStep is less than the nodeIndex', async function (assert) {
      await render(
        hbs`
        <Hds::Stepper::Navigation::Step @stepNumber={{1}} @currentStep={{2}} @isNavInteractive={{true}}>
          <:title>Title</:title>
          <:description>Description</:description>
        </Hds::Stepper::Navigation::Step>`
      );
      assert
        .dom('.hds-stepper-navigation__step')
        .hasClass('hds-stepper-navigation__step--incomplete');
      assert
        .dom('.hds-stepper-navigation__step__btn')
        .hasAttribute('tabindex', '-1');
      assert
        .dom('.hds-stepper-navigation__step__btn')
        .hasAttribute('aria-selected', 'false');
      assert
        .dom('.hds-stepper-indicator-step')
        .hasClass('hds-stepper-indicator-step--status-incomplete');
      assert.dom('.sr-only').hasNoText();
    });

    test('it sets the step to complete when the @currentStep is greater than the nodeIndex', async function (assert) {
      await this.createNavigationStep({ currentStep: 1, isInteractive: true });
      assert
        .dom('.hds-stepper-navigation__step')
        .hasClass('hds-stepper-navigation__step--complete');
      assert
        .dom('.hds-stepper-navigation__step__btn')
        .hasAttribute('tabindex', '-1');
      assert
        .dom('.hds-stepper-navigation__step__btn')
        .hasAttribute('aria-selected', 'false');
      assert
        .dom('.hds-stepper-indicator-step')
        .hasClass('hds-stepper-indicator-step--status-complete');
      assert.dom('.sr-only').hasText('Complete: ');
    });

    test('it sets the step to active when the @currentStep is equal to the nodeIndex', async function (assert) {
      await this.createNavigationStep({ currentStep: 0, isInteractive: true });
      assert
        .dom('.hds-stepper-navigation__step')
        .hasClass('hds-stepper-navigation__step--active');
      assert
        .dom('.hds-stepper-navigation__step__btn')
        .hasNoAttribute('tabindex');
      assert
        .dom('.hds-stepper-navigation__step__btn')
        .hasAttribute('aria-selected', 'true');
      assert
        .dom('.hds-stepper-indicator-step')
        .hasClass('hds-stepper-indicator-step--status-progress');
      assert.dom('.sr-only').hasText('Current: ');
    });

    // TITLE TAG

    test('it renders a div when the @titleTag argument is not provided', async function (assert) {
      await this.createNavigationStep();
      assert.dom('.hds-stepper-navigation__step__title').hasTagName('div');
    });

    test('it renders the custom title tag when the @titleTag argument is provided', async function (assert) {
      await this.createNavigationStep({ titleTag: 'h2' });
      assert.dom('.hds-stepper-navigation__step__title').hasTagName('h2');
    });

    // TITLE

    test('it renders the title when the title contextual component block is used', async function (assert) {
      await this.createNavigationStep({ title: 'Test' });
      assert.dom('.hds-stepper-navigation__step__title').containsText('Test');
    });

    // DESCRIPTION

    test('it renders the description when the description contextual component block is used', async function (assert) {
      await this.createNavigationStep({ description: 'Test' });
      assert
        .dom('.hds-stepper-navigation__step__description')
        .containsText('Test');
    });
  }
);
