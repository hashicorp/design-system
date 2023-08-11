/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  focus,
  render,
  triggerKeyEvent,
  setupOnerror,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/tooltip/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::TooltipButton @text="More info." id="test-tooltip-button">info</Hds::TooltipButton>`
    );
    assert.dom('#test-tooltip-button').hasClass('hds-tooltip-button');
  });

  // CONTENT

  test('it renders plain text content passed into the tooltip', async function (assert) {
    await render(
      hbs`<Hds::TooltipButton @text="More info." id="test-tooltip-button">info</Hds::TooltipButton>`
    );
    await focus('#test-tooltip-button');
    assert.dom('.tippy-content').hasText('More info.');
  });

  test('when allowHTML to true is passed in as an extraTippyOption, it renders rich HTML and text content passed into the tooltip', async function (assert) {
    await render(
      hbs`
        <Hds::TooltipButton
          @extraTippyOptions={{hash allowHTML=true}}
          @text="<em>em</em> <strong>strong</strong>"
          id="test-tooltip-button"
        >info</Hds::TooltipButton>
      `
    );
    await focus('#test-tooltip-button');
    assert.dom('.tippy-content em').exists().hasText('em');
    assert.dom('.tippy-content strong').exists().hasText('strong');
  });

  // A11Y

  test('it displays the tooltip when focused and dismisses it if Escape key is triggered', async function (assert) {
    const escapeKey = 27;

    function wait(timeout = 1000) {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    }

    await render(
      hbs`<Hds::TooltipButton @text="More info." id="test-tooltip-button">info</Hds::TooltipButton>`
    );

    // Test that tooltip does not display by default:
    assert.dom('.tippy-box').doesNotExist();

    // Focus button to trigger tooltip display:
    await focus('#test-tooltip-button');
    assert.dom('.tippy-box').exists();

    // Trigger escape key to close the tooltip:
    await triggerKeyEvent('#test-tooltip-button', 'keydown', escapeKey);
    await wait();
    // test that the tooltip is now gone:
    assert.dom('.tippy-box').doesNotExist();
  });

  test('the tooltip has a role of "tooltip"', async function (assert) {
    await render(
      hbs`<Hds::TooltipButton @text="More info." id="test-tooltip-button">info</Hds::TooltipButton>`
    );
    await focus('#test-tooltip-button');
    assert.dom('.tippy-box').hasAttribute('role', 'tooltip');
  });

  test('the button has an aria-describedby attribute with a value matching the tooltip id', async function (assert) {
    await render(
      hbs`<Hds::TooltipButton @text="Hello" data-test-tooltip-button>info</Hds::TooltipButton>`
    );
    await focus('[data-test-tooltip-button]');
    assert.dom('[data-test-tooltip-button]').hasAttribute('aria-describedby');
    assert.dom('[data-tippy-root]').hasAttribute('id');

    assert.strictEqual(
      this.element
        .querySelector('[data-test-tooltip-button]')
        .getAttribute('aria-describedby'),
      this.element.querySelector('[data-tippy-root]').getAttribute('id')
    );
  });

  // PLACEMENT

  test('it should render the component with the passed in @placement', async function (assert) {
    await render(
      hbs`<Hds::TooltipButton @text="Hello" @placement="right" id="test-tooltip-button">info</Hds::TooltipButton>`
    );
    await focus('#test-tooltip-button');
    assert.dom('.tippy-box').hasAttribute('data-placement', 'right');
  });

  // isInline

  test('it should render the component with isInline as true by default', async function (assert) {
    await render(
      hbs`<Hds::TooltipButton @text="More info." id="test-tooltip-button">info</Hds::TooltipButton>`
    );
    assert
      .dom('#test-tooltip-button')
      .hasClass('hds-tooltip-button--is-inline');
  });

  test('it should render the component with the correct class if isInline is set to false', async function (assert) {
    await render(
      hbs`<Hds::TooltipButton @text="More info." @isInline={{false}} id="test-tooltip-button">info</Hds::TooltipButton>`
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
    await render(hbs`<Hds::TooltipButton>info</Hds::TooltipButton>`);
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
      hbs`<Hds::TooltipButton @text="More info." @placement="invalid">info</Hds::TooltipButton>`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
