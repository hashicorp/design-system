/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  find,
  focus,
  render,
  setupOnerror,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { hash } from '@ember/helper';

import { HdsTooltipButton } from '@hashicorp/design-system-components/components';

import { setupRenderingTest, wait } from 'showcase/tests/helpers';

module('Integration | Component | hds/tooltip/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsTooltipButton
          @text="More info."
          id="test-tooltip-button"
        >info</HdsTooltipButton>
      </template>,
    );
    assert.dom('#test-tooltip-button').hasClass('hds-tooltip-button');
  });

  // CONTENT

  test('it renders plain text content passed into the tooltip', async function (assert) {
    await render(
      <template>
        <HdsTooltipButton
          @text="More info."
          id="test-tooltip-button"
        >info</HdsTooltipButton>
      </template>,
    );
    await focus('#test-tooltip-button');
    assert.dom('.tippy-content').hasText('More info.');
  });

  test('when allowHTML to true is passed in as an extraTippyOption, it renders rich HTML and text content passed into the tooltip', async function (assert) {
    await render(
      <template>
        <HdsTooltipButton
          @extraTippyOptions={{hash allowHTML=true}}
          @text="<em>em</em> <strong>strong</strong>"
          id="test-tooltip-button"
        >info</HdsTooltipButton>
      </template>,
    );
    await focus('#test-tooltip-button');
    assert.dom('.tippy-content em').exists().hasText('em');
    assert.dom('.tippy-content strong').exists().hasText('strong');
  });

  // A11Y

  test('it displays the tooltip when focused and dismisses it if Escape key is triggered', async function (assert) {
    await render(
      <template>
        <HdsTooltipButton
          @text="More info."
          id="test-tooltip-button"
        >info</HdsTooltipButton>
      </template>,
    );

    // Test that tooltip does not display by default:
    assert.dom('.tippy-box').doesNotExist();

    // Focus button to trigger tooltip display:
    await focus('#test-tooltip-button');
    assert.dom('.tippy-box').exists();

    // Trigger escape key to close the tooltip:
    await triggerKeyEvent('#test-tooltip-button', 'keydown', 'Escape');

    await wait(1000);
    assert.dom('.tippy-box').doesNotExist();
  });

  test('the tooltip has a role of "tooltip"', async function (assert) {
    await render(
      <template>
        <HdsTooltipButton
          @text="More info."
          id="test-tooltip-button"
        >info</HdsTooltipButton>
      </template>,
    );
    await focus('#test-tooltip-button');
    assert.dom('.tippy-box').hasAttribute('role', 'tooltip');
  });

  test('the button has an aria-describedby and aria-controls attribute with a value matching the tooltip container', async function (assert) {
    await render(
      <template>
        <HdsTooltipButton
          @text="Hello"
          data-test-tooltip-button
        >info</HdsTooltipButton>
      </template>,
    );
    await focus('[data-test-tooltip-button]');
    const tooltipContainer = find('.hds-tooltip-container');
    assert
      .dom('[data-test-tooltip-button]')
      .hasAttribute('aria-describedby', tooltipContainer?.id ?? '');
    assert
      .dom('[data-test-tooltip-button]')
      .hasAttribute('aria-controls', tooltipContainer?.id ?? '');
  });

  // PLACEMENT

  test('it should render the component with the passed in @placement', async function (assert) {
    await render(
      <template>
        <HdsTooltipButton
          @text="Hello"
          @placement="right"
          id="test-tooltip-button"
        >info</HdsTooltipButton>
      </template>,
    );
    await focus('#test-tooltip-button');
    assert.dom('.tippy-box').hasAttribute('data-placement', 'right');
  });

  // isInline

  test('it should render the component with isInline as true by default', async function (assert) {
    await render(
      <template>
        <HdsTooltipButton
          @text="More info."
          id="test-tooltip-button"
        >info</HdsTooltipButton>
      </template>,
    );
    assert
      .dom('#test-tooltip-button')
      .hasClass('hds-tooltip-button--is-inline');
  });

  test('it should render the component with the correct class if isInline is set to false', async function (assert) {
    await render(
      <template>
        <HdsTooltipButton
          @text="More info."
          @isInline={{false}}
          id="test-tooltip-button"
        >info</HdsTooltipButton>
      </template>,
    );
    assert.dom('#test-tooltip-button').hasClass('hds-tooltip-button--is-block');
  });

  // ASSERTIONS

  test('it should throw an assertion if @text is missing/has no value', async function (assert) {
    const errorMessage =
      '@text for "Hds::TooltipButton" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsTooltipButton>info</HdsTooltipButton>
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it should throw an assertion if the value passed to @placement is invalid', async function (assert) {
    const errorMessage =
      '@placement for "Hds::TooltipButton" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        <HdsTooltipButton
          @text="More info."
          {{! @glint-expect-error - testing invalid component usage }}
          @placement="invalid"
        >info</HdsTooltipButton>
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
