/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/stepper/list/step', function (hooks) {
  setupRenderingTest(hooks);

  // CLASSES

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Stepper::List::Step data-test="step-1" />`);
    assert.dom('[data-test="step-1"]').hasClass('hds-stepper-list__step');
  });

  // STATUS

  test('it sets the status to incomplete when the @status argument is not provided', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step>
            <:title>Test</:title>
          </Hds::Stepper::List::Step>
        `
    );
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-incomplete');
    assert.dom('.sr-only').hasNoText();
  });

  test('it sets the status to the provided value when the @status argument is provided', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step @status="complete">
            <:title>Test</:title>
          </Hds::Stepper::List::Step>
        `
    );
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-complete');
    assert.dom('.sr-only').hasText('Complete: ');
  });

  // TITLE TAG

  test('it renders a div when the @titleTag argument is not provided', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step>
            <:title>Test</:title>
          </Hds::Stepper::List::Step>
        `
    );
    assert.dom('.hds-stepper-list__step__title').hasTagName('div');
  });

  test('it renders the custom title tag when the @titleTag argument is provided', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step @titleTag="h2">
            <:title>Test</:title>
          </Hds::Stepper::List::Step>
        `
    );
    assert.dom('.hds-stepper-list__step__title').hasTagName('h2');
  });

  // STEP NUMBER

  test('it sets the step number automatically when the @stepNumber argument is not provided', async function (assert) {
    // Note: Testing this use case requires wrapping the element in its parent element
    await render(
      hbs`
          <Hds::Stepper::List as |S|>
            <S.Step />
          </Hds::Stepper::List>
        `
    );
    assert.dom('.hds-stepper-indicator-step__text').hasText('1');
  });

  test('it sets the step number when the @stepNumber argument is provided', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step @stepNumber={{3}}>
          </Hds::Stepper::List::Step>
        `
    );
    assert.dom('.hds-stepper-indicator-step__text').hasText('3');
  });

  // TITLE

  test('it renders the title when the title contextual component block is used', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step>
            <:title>Test</:title>
          </Hds::Stepper::List::Step>
        `
    );
    assert.dom('.hds-stepper-list__step__title').containsText('Test');
  });

  // DESCRIPTION

  test('it renders the description when the description contextual component block is used', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step>
            <:description>Test</:description>
          </Hds::Stepper::List::Step>
        `
    );
    assert.dom('.hds-stepper-list__step__description').containsText('Test');
  });

  // CONTENT

  test('it renders the content when the content contextual component block is used', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step>
            <:content>Test</:content>
          </Hds::Stepper::List::Step>
        `
    );
    assert.dom('.hds-stepper-list__step__content').containsText('Test');
  });
});
