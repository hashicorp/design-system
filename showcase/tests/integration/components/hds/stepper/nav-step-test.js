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

module('Integration | Component | hds/stepper/nav/step', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('createNavStep', async (args = {}) => {
      this.title = args.title ?? undefined;
      this.description = args.description ?? undefined;
      this.currentStep = args.currentStep ?? undefined;
      this.stepNumber = args.stepNumber ?? undefined;
      this.isInteractive = args.isInteractive ?? undefined;
      this.titleTag = args.titleTag ?? undefined;
      return await render(hbs`
          <Hds::Stepper::Nav
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
          </Hds::Stepper::Nav>
        `);
    });
  });

  // CLASSES

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Stepper::Nav::Step id="test-stepper-nav-step" />`);
    assert.dom('#test-stepper-nav-step').hasClass('hds-stepper-nav__step');
  });

  // STEP NUMBER

  test('it sets the step number automatically based on the step ids provided', async function (assert) {
    await this.createNavStep();
    assert.dom('.hds-stepper-indicator-step__text').hasText('1');
  });

  // NAV INTERACTIVE

  test('it sets the step to not interactive when the @isInteractive argument is not provided to the parent', async function (assert) {
    await this.createNavStep();
    assert.dom('.hds-stepper-nav__step').hasNoAttribute('role');
    assert
      .dom('.hds-stepper-nav__step')
      .hasNoClass('hds-stepper-nav__step--interactive');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasNoClass('hds-stepper-indicator-step--is-interactive');
    assert
      .dom('.hds-stepper-nav__step-content')
      .hasNoClass('hds-stepper-nav__step-btn');
  });

  test('it sets the step to interactive when the @isInteractive argument is provided to the parent', async function (assert) {
    await this.createNavStep({ isInteractive: true });
    assert.dom('.hds-stepper-nav__step').hasAttribute('role', 'presentation');
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--nav-interactive');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--is-interactive');
    assert
      .dom('.hds-stepper-nav__step-content')
      .hasClass('hds-stepper-nav__step-btn');
  });

  // STATES - INTERACTIVE

  test('it sets the step to incomplete when the @currentStep is less than the nodeIndex and @isInteractive is true', async function (assert) {
    await render(
      hbs`
        <Hds::Stepper::Nav::Step @stepNumber={{1}} @currentStep={{2}} @isNavInteractive={{true}}>
          <:title>Title</:title>
          <:description>Description</:description>
        </Hds::Stepper::Nav::Step>`
    );
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--incomplete');
    assert.dom('.hds-stepper-nav__step-btn').hasAttribute('tabindex', '-1');
    assert
      .dom('.hds-stepper-nav__step-btn')
      .hasAttribute('aria-selected', 'false');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-incomplete');
    assert.dom('.sr-only').hasNoText();
  });

  test('it sets the step to complete when the @currentStep is greater than the nodeIndex and @isInteractive is true', async function (assert) {
    await this.createNavStep({ currentStep: 1, isInteractive: true });
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--complete');
    assert.dom('.hds-stepper-nav__step-btn').hasAttribute('tabindex', '-1');
    assert
      .dom('.hds-stepper-nav__step-btn')
      .hasAttribute('aria-selected', 'false');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-complete');
    assert.dom('.sr-only').hasText('Complete: ');
  });

  test('it sets the step to active when the @currentStep is equal to the nodeIndex and @isInteractive is true', async function (assert) {
    await this.createNavStep({ currentStep: 0, isInteractive: true });
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--active');
    assert.dom('.hds-stepper-nav__step-btn').hasNoAttribute('tabindex');
    assert
      .dom('.hds-stepper-nav__step-btn')
      .hasAttribute('aria-selected', 'true');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-progress');
    assert.dom('.sr-only').hasText('Current: ');
  });

  // STATES - NOT INTERACTIVE

  test('it sets the step to incomplete when the @currentStep is less than the nodeIndex and @isInteractive is false', async function (assert) {
    await render(
      hbs`
        <Hds::Stepper::Nav::Step @stepNumber={{1}} @currentStep={{2}}>
          <:title>Title</:title>
          <:description>Description</:description>
        </Hds::Stepper::Nav::Step>`
    );
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--incomplete');
    assert
      .dom('.hds-stepper-nav__step-content')
      .hasAttribute('aria-current', 'false');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-incomplete');
    assert.dom('.sr-only').hasNoText();
  });

  test('it sets the step to complete when the @currentStep is greater than the nodeIndex and @isInteractive is false', async function (assert) {
    await this.createNavStep({ currentStep: 1 });
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--complete');
    assert
      .dom('.hds-stepper-nav__step-content')
      .hasAttribute('aria-current', 'false');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-complete');
    assert.dom('.sr-only').hasText('Complete: ');
  });

  test('it sets the step to active when the @currentStep is equal to the nodeIndex and @isInteractive is false', async function (assert) {
    await this.createNavStep({ currentStep: 0 });
    assert
      .dom('.hds-stepper-nav__step')
      .hasClass('hds-stepper-nav__step--active');
    assert
      .dom('.hds-stepper-nav__step-content')
      .hasAttribute('aria-current', 'step');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-progress');
    assert.dom('.sr-only').hasText('Current: ');
  });

  // TITLE TAG

  test('it renders a div when the @titleTag argument is not provided', async function (assert) {
    await this.createNavStep();
    assert.dom('.hds-stepper-nav__step-title').hasTagName('div');
  });

  test('it renders the custom title tag when the @titleTag argument is provided', async function (assert) {
    await this.createNavStep({ titleTag: 'h2' });
    assert.dom('.hds-stepper-nav__step-title').hasTagName('h2');
  });

  // TITLE

  test('it renders the title when the title contextual component block is used', async function (assert) {
    await this.createNavStep({ title: 'Test' });
    assert.dom('.hds-stepper-nav__step-title').containsText('Test');
  });

  // DESCRIPTION

  test('it renders the description when the description contextual component block is used', async function (assert) {
    await this.createNavStep({ description: 'Test' });
    assert.dom('.hds-stepper-nav__step-description').containsText('Test');
  });
});
