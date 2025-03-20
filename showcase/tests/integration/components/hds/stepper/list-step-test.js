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
      .dom('.hds-stepper-list__step')
      .hasClass('hds-stepper-list__step--incomplete');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-incomplete');
    assert.dom('.sr-only').hasNoText();
  });

  test('it sets the status to complete when the @status argument is provided', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step @status="complete">
            <:title>Test</:title>
          </Hds::Stepper::List::Step>
        `
    );
    assert
      .dom('.hds-stepper-list__step')
      .hasClass('hds-stepper-list__step--complete');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-complete');
    assert.dom('.sr-only').hasText('(complete)');
  });

  test('it sets the status to progress when the @status argument is provided', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step @status="progress">
            <:title>Test</:title>
          </Hds::Stepper::List::Step>
        `
    );
    assert
      .dom('.hds-stepper-list__step')
      .hasClass('hds-stepper-list__step--progress');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-progress');
    assert.dom('.sr-only').hasText('(current)');
  });

  test('it sets the status to processing when the @status argument is provided', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step @status="processing">
            <:title>Test</:title>
          </Hds::Stepper::List::Step>
        `
    );
    assert
      .dom('.hds-stepper-list__step')
      .hasClass('hds-stepper-list__step--processing');
    assert
      .dom('.hds-stepper-indicator-step')
      .hasClass('hds-stepper-indicator-step--status-processing');
    assert.dom('.sr-only').hasText('(in progress)');
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
    assert.dom('.hds-stepper-list__step-title').hasTagName('div');
  });

  test('it renders the custom title tag when the @titleTag argument is provided', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step @titleTag="h2">
            <:title>Test</:title>
          </Hds::Stepper::List::Step>
        `
    );
    assert.dom('.hds-stepper-list__step-title').hasTagName('h2');
  });

  // STEP NUMBER

  test('it sets the step number automatically based on the step ids provided', async function (assert) {
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

  // TITLE

  test('it renders the title when the title contextual component block is used', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step>
            <:title>Test</:title>
          </Hds::Stepper::List::Step>
        `
    );
    assert.dom('.hds-stepper-list__step-title').containsText('Test');
  });

  // DESCRIPTION

  test('it does not render the description when the description contextual component block is not used', async function (assert) {
    await render(hbs`<Hds::Stepper::List::Step></Hds::Stepper::List::Step>`);
    assert.dom('.hds-stepper-list__step-description').doesNotExist();
  });

  test('it renders the description when the description contextual component block is used', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step>
            <:description>Test</:description>
          </Hds::Stepper::List::Step>
        `
    );
    assert.dom('.hds-stepper-list__step-description').exists();
    assert.dom('.hds-stepper-list__step-description').containsText('Test');
  });

  // CONTENT

  test('it does not render the content when the content contextual component block is not used', async function (assert) {
    await render(hbs`<Hds::Stepper::List::Step></Hds::Stepper::List::Step>`);
    assert.dom('.hds-stepper-list__step-content').doesNotExist();
  });

  test('it renders the content when the content contextual component block is used', async function (assert) {
    await render(
      hbs`
          <Hds::Stepper::List::Step>
            <:content>Test</:content>
          </Hds::Stepper::List::Step>
        `
    );
    assert.dom('.hds-stepper-list__step-content').exists();
    assert.dom('.hds-stepper-list__step-content').containsText('Test');
  });
});
