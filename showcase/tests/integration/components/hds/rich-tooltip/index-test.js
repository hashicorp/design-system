/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  resetOnerror,
  setupOnerror,
  click,
  focus,
  blur,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/rich-tooltip/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::RichTooltip id="test-rich-tooltip" />`);
    assert.dom('#test-rich-tooltip').hasClass('hds-rich-tooltip');
    assert.dom('.hds-rich-tooltip.hds-popover-primitive').exists();
  });

  // CONTENT + VISIBILITY + IS-OPEN

  test('it should render the yielded content and other elements by default and toggle their visibility correctly', async function (assert) {
    // notice: we test both `InfoText` and `Generic` in the same test, to avoid too much duplication
    await render(hbs`
      <Hds::RichTooltip @enableClickEvents={{true}} as |RT|>
        <RT.ToggleInfoText>InfoText toggle</RT.ToggleInfoText>
        <RT.ToggleGeneric>Generic toggle</RT.ToggleGeneric>
        <RT.PopoverContent>Popover content</RT.PopoverContent>
      </Hds::RichTooltip>
    `);
    assert
      .dom('.hds-rich-tooltip .hds-popover-primitive__toggle')
      .exists()
      .hasText('InfoText toggle Generic toggle'); // they're both yielded in the same container
    assert
      .dom(
        '.hds-rich-tooltip .hds-popover-primitive__toggle > .hds-rich-tooltip__toggle-info-text .hds-rich-tooltip__toggle-info-text-decoration'
      )
      .exists()
      .hasText('InfoText toggle');

    assert
      .dom('.hds-rich-tooltip .hds-popover-primitive__content')
      .exists()
      .isNotVisible();
    assert
      .dom('.hds-rich-tooltip .hds-popover-primitive__arrow')
      .exists()
      .isNotVisible();
    assert
      .dom('.hds-popover-primitive__content .hds-rich-tooltip__content')
      .doesNotExist();

    // toggle the visibility
    await click('button.hds-popover-primitive__toggle');

    assert
      .dom('.hds-rich-tooltip  .hds-popover-primitive__content')
      .exists()
      .isVisible();
    assert
      .dom('.hds-rich-tooltip  .hds-popover-primitive__arrow')
      .exists()
      .isVisible();
    assert
      .dom('.hds-popover-primitive__content .hds-rich-tooltip__content')
      .exists()
      .hasText('Popover content');
  });

  test('the the content should be rendered and visible if `@isOpen` is `true`', async function (assert) {
    await render(hbs`
        <Hds::RichTooltip @isOpen={{true}} as |RT|>
          <RT.PopoverContent>Content</RT.PopoverContent>
        </Hds::RichTooltip>
      `);
    assert.dom('.hds-rich-tooltip .hds-popover-primitive__arrow').isVisible();
    assert.dom('.hds-rich-tooltip .hds-popover-primitive__content').isVisible();
  });

  // DISPLAY

  test('it should render the rich tooltip and info text as block by default', async function (assert) {
    await render(hbs`
      <Hds::RichTooltip @isOpen={{true}} as |RT|>
        <RT.ToggleInfoText>Toggle</RT.ToggleInfoText>
        <RT.PopoverContent>Content</RT.PopoverContent>
      </Hds::RichTooltip>
    `);
    assert.dom('.hds-popover-primitive--is-block').exists();
    assert.dom('.hds-rich-tooltip__toggle-info-text--is-block').exists();
  });
  test('it should render the container and toggle as inline if `@isInline` is `true`', async function (assert) {
    await render(hbs`
      <Hds::RichTooltip @isInline={{true}} @isOpen={{true}} as |RT|>
        <RT.ToggleInfoText>Toggle</RT.ToggleInfoText>
        <RT.PopoverContent>Content</RT.PopoverContent>
      </Hds::RichTooltip>
    `);
    assert.dom('.hds-popover-primitive--is-inline').exists();
    assert.dom('.hds-rich-tooltip__toggle-info-text--is-inline').exists();
  });

  // WIDTH/HEIGHT

  test('it should render the container to fit the content by default', async function (assert) {
    await render(hbs`
        <Hds::RichTooltip @isOpen={{true}} as |RT|>
          <RT.PopoverContent>
            <div style="width: 98px; height: 76px;" />
          </RT.PopoverContent>
        </Hds::RichTooltip>
      `);
    const content = this.element.querySelector(
      '.hds-popover-primitive__content'
    );
    const rect = content.getBoundingClientRect();
    assert.deepEqual(rect.width, 130); // we need to add the padding
    assert.deepEqual(rect.height, 108); // we need to add the padding
  });
  test('it should render the container with the provided with/height', async function (assert) {
    await render(hbs`
        <Hds::RichTooltip @popoverWidth="123px" @popoverHeight="456px" @isOpen={{true}} />
      `);
    const content1 = this.element.querySelector(
      '.hds-popover-primitive__content'
    );
    const rect1 = content1.getBoundingClientRect();
    assert.deepEqual(rect1.width, 123);
    assert.deepEqual(rect1.height, 456);
    const content2 = this.element.querySelector('.hds-rich-tooltip__content');
    const rect2 = content2.getBoundingClientRect();
    assert.deepEqual(rect2.width, 91); // we need to substract the padding
    assert.deepEqual(rect2.height, 424); // we need to subtract the padding
  });

  // CONTAINS INTERACTIVE ELEMENTS

  test('it should render the toggle container as `<button>` by default', async function (assert) {
    await render(hbs`<Hds::RichTooltip />`);
    assert.dom('button.hds-popover-primitive__toggle').exists();
  });
  test('it should render the toggle container as `<div>` if it contains interactive elements', async function (assert) {
    await render(hbs`
        <Hds::RichTooltip @toggleContainsInteractive={{true}} as |RT|>
          <RT.ToggleGeneric>
            <button type="button">Toggle</button>
          </RT.ToggleGeneric>
          <RT.PopoverContent>Content</RT.PopoverContent>
        </Hds::RichTooltip>
      `);
    assert.dom('div.hds-popover-primitive__toggle').exists();
    assert.dom('div.hds-popover-primitive__toggle > button').exists();
  });

  // INTERACTIONS

  test('it should toggle the content visibility on focus in/out', async function (assert) {
    await render(hbs`
        <Hds::RichTooltip @enableSoftEvents={{true}} as |RT|>
          <RT.ToggleGeneric>Toggle</RT.ToggleGeneric>
          <RT.PopoverContent>Content</RT.PopoverContent>
        </Hds::RichTooltip>
      `);
    // it's hidden when closed
    assert.dom('.hds-popover-primitive__content').isNotVisible();
    // focus the toggle to show the content
    await focus('button.hds-popover-primitive__toggle');
    // now it should be visible
    assert.dom('.hds-popover-primitive__content').isVisible();
    // unfocus the toggle to hide the content
    await blur('button.hds-popover-primitive__toggle');
    // it's hidden when closed
    assert.dom('.hds-popover-primitive__content').isNotVisible();
  });
  test('it should toggle the content visibility on click', async function (assert) {
    await render(hbs`
        <Hds::RichTooltip @enableClickEvents={{true}} as |RT|>
          <RT.ToggleGeneric>Toggle</RT.ToggleGeneric>
          <RT.PopoverContent>Content</RT.PopoverContent>
        </Hds::RichTooltip>
      `);
    // it's hidden when closed
    assert.dom('.hds-rich-tooltip__content').isNotVisible();
    // click the toggle to show the content
    await click('button.hds-popover-primitive__toggle');
    // now it should be visible
    assert.dom('.hds-rich-tooltip__content').isVisible();
    // click again the toggle to hide the content
    await click('button.hds-popover-primitive__toggle');
    // it's hidden when closed
    assert.dom('.hds-rich-tooltip__content').isNotVisible();
  });

  test('it should toggle the content visibility on focus in/out when containinig interactive elements', async function (assert) {
    await render(hbs`
        <Hds::RichTooltip @enableSoftEvents={{true}} @toggleContainsInteractive={{true}} as |RT|>
          <RT.ToggleGeneric>
            <button type="button">Toggle</button>
          </RT.ToggleGeneric>
          <RT.PopoverContent>Content</RT.PopoverContent>
        </Hds::RichTooltip>
      `);
    // it's hidden when closed
    assert.dom('.hds-popover-primitive__content').isNotVisible();
    // focus the toggle to show the content
    await focus('.hds-popover-primitive__toggle > button');
    // now it should be visible
    assert.dom('.hds-popover-primitive__content').isVisible();
    // unfocus the toggle to hide the content
    await blur('.hds-popover-primitive__toggle > button');
    // it's hidden when closed
    assert.dom('.hds-popover-primitive__content').isNotVisible();
  });

  // CALLBACKS

  test('it should invoke the `onOpen/onClose` callbacks', async function (assert) {
    let status;
    this.set('onOpen', () => (status = 'opened'));
    this.set('onClose', () => (status = 'closed'));
    await render(hbs`
        <Hds::RichTooltip @enableClickEvents={{true}} @onOpen={{this.onOpen}} @onClose={{this.onClose}} as |RT|>
          <RT.ToggleGeneric>Toggle</RT.ToggleGeneric>
          <RT.PopoverContent>Content</RT.PopoverContent>
        </Hds::RichTooltip>
      `);
    // toggle the visibility
    await click('button.hds-popover-primitive__toggle');
    assert.strictEqual(status, 'opened');
    // toggle it again
    await click('button.hds-popover-primitive__toggle');
    assert.strictEqual(status, 'closed');
  });

  // ANCHORED POSITION OPTIONS
  // unfortunately there is no easy/reliable way to test them here

  // A11Y

  test('it displays the correct aria attribute for "toggle" with non interactive content', async function (assert) {
    await render(hbs`
        <Hds::RichTooltip @enableClickEvents={{true}} @toggleAriaLabel="test123" as |RT|>
          <RT.ToggleGeneric>Toggle</RT.ToggleGeneric>
          <RT.PopoverContent>Content</RT.PopoverContent>
        </Hds::RichTooltip>

      `);
    assert.dom('.hds-popover-primitive__toggle').hasAria('label', 'test123');
  });

  test('it displays the correct aria attribute for "toggle" with interactive content', async function (assert) {
    await render(hbs`
        <Hds::RichTooltip @enableSoftEvents={{true}} @toggleAriaLabel="test123" @toggleContainsInteractive={{true}} as |RT|>
          <RT.ToggleGeneric>
            <input />
          </RT.ToggleGeneric>
          <RT.PopoverContent>Content</RT.PopoverContent>
        </Hds::RichTooltip>
      `);
    assert.dom('.hds-popover-primitive__toggle').hasAria('label', 'test123');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @popoverPlacement is provided', async function (assert) {
    const errorMessage =
      '@popoverPlacement for "Hds::RichTooltip" must be one of the following: top, top-start, top-end, right, right-start, right-end, bottom, bottom-start, bottom-end, left, left-start, left-end; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::RichTooltip @popoverPlacement="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
