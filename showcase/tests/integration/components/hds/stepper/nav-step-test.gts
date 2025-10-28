/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import {
  HdsStepperNav,
  HdsStepperNavStep,
} from '@hashicorp/design-system-components/components';
import type { HdsStepperTitleTags } from '@hashicorp/design-system-components/components/hds/stepper/types';

import { setupRenderingTest } from 'showcase/tests/helpers';

// NOTICE
// Because of how the `step` subcomponent is built,
// it's practically impossible to test in isolation, so in our tests
// in this file it will be wrapped inside its parent comoponent.
const createNavStep = async (options: {
  title?: string;
  description?: string;
  currentStep?: number;
  stepNumber?: number;
  isNavInteractive?: boolean;
  titleTag?: HdsStepperTitleTags;
}) => {
  const currentStep = options.currentStep ?? 0;

  return await render(
    <template>
      <HdsStepperNav
        @ariaLabel="Sample stepper"
        @currentStep={{currentStep}}
        @isInteractive={{options.isNavInteractive}}
        as |S|
      >
        <S.Step @titleTag={{options.titleTag}}>
          <:title>{{options.title}}</:title>
          <:description>{{options.description}}</:description>
        </S.Step>
        <S.Panel />
      </HdsStepperNav>
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

  // STEP NUMBER

  test('it sets the step number automatically based on the step ids provided', async function (assert) {
    await createNavStep({});
    assert.dom('.hds-stepper-indicator-step__text').hasText('1');
  });

  // NAV INTERACTIVE

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

  // TITLE TAG

  test('it renders a div when the @titleTag argument is not provided', async function (assert) {
    await createNavStep({});
    assert.dom('.hds-stepper-nav__step-title').hasTagName('div');
  });

  test('it renders the custom title tag when the @titleTag argument is provided', async function (assert) {
    await createNavStep({ titleTag: 'h2' });
    assert.dom('.hds-stepper-nav__step-title').hasTagName('h2');
  });

  // TITLE

  test('it renders the title when the title contextual component block is used', async function (assert) {
    await createNavStep({ title: 'Test' });
    assert.dom('.hds-stepper-nav__step-title').containsText('Test');
  });

  // DESCRIPTION

  test('it does not render the description when the description contextual component block is not used', async function (assert) {
    await render(<template><HdsStepperNavStep @currentStep={{0}} /></template>);
    assert.dom('.hds-stepper-nav__step-description').doesNotExist();
  });

  test('it renders the description when the description contextual component block is used', async function (assert) {
    await createNavStep({ description: 'Test' });
    assert.dom('.hds-stepper-nav__step-description').exists();
    assert.dom('.hds-stepper-nav__step-description').containsText('Test');
  });
});
