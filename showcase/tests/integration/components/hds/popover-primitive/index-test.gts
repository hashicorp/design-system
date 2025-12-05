/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test, skip } from 'qunit';
import {
  blur,
  click,
  find,
  focus,
  render,
  settled,
  setupOnerror,
} from '@ember/test-helpers';
import { hash } from '@ember/helper';
import { TrackedObject } from 'tracked-built-ins';

import { HdsPopoverPrimitive } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/popover-primitive/index',
  function (hooks) {
    setupRenderingTest(hooks);

    // NOTICE: the PopoverPrimitive is a headless component

    // IDs

    test('it should generate IDs provided and connect them with the popover attributes', async function (assert) {
      await render(
        <template>
          <HdsPopoverPrimitive @enableClickEvents={{true}} as |PP|>
            <div {{PP.setupPrimitiveContainer}}>
              <button {{PP.setupPrimitiveToggle}} type="button" />
              <main
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
              />
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      // the popover ID is dynamically generated
      const popover = find('main');
      const popoverId = popover?.id ?? '';
      assert.dom('button').hasAttribute('popovertarget', popoverId);
      assert.dom('button').hasAttribute('aria-controls', popoverId);
      assert.dom('main').hasAttribute('popover', 'auto');
    });

    test('it should use the IDs provided and connect them with the popover attributes', async function (assert) {
      await render(
        <template>
          <HdsPopoverPrimitive @enableClickEvents={{true}} as |PP|>
            <div {{PP.setupPrimitiveContainer}}>
              <button
                {{PP.setupPrimitiveToggle}}
                id="test-popover-primitive-toggle"
                type="button"
              />
              <div
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
                id="test-popover-primitive-content"
              />
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      assert
        .dom('#test-popover-primitive-toggle')
        .hasAttribute('popovertarget', 'test-popover-primitive-content');
      assert
        .dom('#test-popover-primitive-content')
        .hasAttribute('popover', 'auto');
    });

    // INTERACTIONS

    test('it should toggle the popover visibility on focus in/out', async function (assert) {
      await render(
        <template>
          <HdsPopoverPrimitive @enableSoftEvents={{true}} as |PP|>
            <div {{PP.setupPrimitiveContainer}}>
              <button
                {{PP.setupPrimitiveToggle}}
                id="test-popover-primitive-toggle"
                type="button"
              />
              <div
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
                id="test-popover-primitive-content"
              />
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      // it's hidden by default
      assert.dom('#test-popover-primitive-content').isNotVisible();
      // focus the toggle to show the popover
      await focus('#test-popover-primitive-toggle');
      // now it should be visible
      assert.dom('#test-popover-primitive-content').isVisible();
      // extra test to check that the the content goes on the top layer
      assert.strictEqual(
        document.querySelectorAll('[popover]:popover-open').length,
        1,
      );
      // unfocus the toggle to hide the popover
      await blur('#test-popover-primitive-toggle');
      // should go back to hidden
      assert.dom('#test-popover-primitive-content').isNotVisible();
    });
    test('it should toggle the popover visibility on click', async function (assert) {
      await render(
        <template>
          <HdsPopoverPrimitive @enableClickEvents={{true}} as |PP|>
            <div {{PP.setupPrimitiveContainer}}>
              <button
                {{PP.setupPrimitiveToggle}}
                id="test-popover-primitive-toggle"
                type="button"
              />
              <div
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
                id="test-popover-primitive-content"
              />
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      // it's hidden by default
      assert.dom('#test-popover-primitive-content').isNotVisible();
      // focus the toggle to show the popover
      await click('#test-popover-primitive-toggle');
      // now it should be visible
      assert.dom('#test-popover-primitive-content').isVisible();
      // extra test to check that the the content goes on the top layer
      assert.strictEqual(
        document.querySelectorAll('[popover]:popover-open').length,
        1,
      );
      // click again the toggle to hide the content
      await click('#test-popover-primitive-toggle');
      // should go back to hidden
      assert.dom('#test-popover-primitive-content').isNotVisible();
    });
    test('it should continue to work when the toggle element is dynamically swapped', async function (assert) {
      const context = new TrackedObject({
        isSwapped: false,
      });

      await render(
        <template>
          <HdsPopoverPrimitive @enableClickEvents={{true}} as |PP|>
            <div {{PP.setupPrimitiveContainer}}>
              {{#if context.isSwapped}}
                <button
                  data-test-id="replacement-toggle"
                  type="button"
                  {{PP.setupPrimitiveToggle}}
                >
                  Replacement
                </button>
              {{else}}
                <button
                  data-test-id="original-toggle"
                  type="button"
                  {{PP.setupPrimitiveToggle}}
                >
                  Original
                </button>
              {{/if}}
              <div
                data-test-id="popover-content"
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
              >
                Content
              </div>
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );

      // verify the initial toggle works as expected
      assert
        .dom('[data-test-id="original-toggle"]')
        .exists('The original toggle is rendered');
      assert
        .dom('[data-test-id="popover-content"]')
        .isNotVisible('The popover is initially hidden');

      await click('[data-test-id="original-toggle"]');
      assert
        .dom('[data-test-id="popover-content"]')
        .isVisible('The popover becomes visible after the first click');

      await click('[data-test-id="original-toggle"]');
      assert
        .dom('[data-test-id="popover-content"]')
        .isNotVisible('The popover is hidden again');

      // swap the toggle element
      context.isSwapped = true;
      await settled();

      assert
        .dom('[data-test-id="original-toggle"]')
        .doesNotExist('The original toggle is removed');
      assert
        .dom('[data-test-id="replacement-toggle"]')
        .exists('The replacement toggle is rendered');

      // verify the *new* toggle now controls the popover
      assert
        .dom('[data-test-id="popover-content"]')
        .isNotVisible('The popover remains hidden after the swap');

      await click('[data-test-id="replacement-toggle"]');
      assert
        .dom('[data-test-id="popover-content"]')
        .isVisible(
          'The popover becomes visible when the new toggle is clicked',
        );

      await click('[data-test-id="replacement-toggle"]');
      assert
        .dom('[data-test-id="popover-content"]')
        .isNotVisible('The popover is hidden again by the new toggle');
    });
    skip('it should toggle the popover visibility on click', async function (assert) {
      await render(
        <template>
          <HdsPopoverPrimitive @enableClickEvents={{true}} as |PP|>
            <button
              {{PP.setupPrimitiveToggle}}
              id="test-popover-primitive-toggle"
              type="button"
            >
              Toggle</button>
            <div {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}>
              <div id="test-popover-primitive-content">Content</div>
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      // it's hidden when closed
      assert.dom('.hds-popover-primitive__content').isNotVisible();
      assert.dom('#test-popover-primitive-content').doesNotExist();
      // click the toggle to show the content
      await click('button.hds-popover-primitive__toggle');
      // now it should be visible
      assert.dom('.hds-popover-primitive__content').isVisible();
      assert.dom('#test-popover-primitive-content').exists().isVisible();
      // click again the toggle to hide the content
      await click('button.hds-popover-primitive__toggle');
      // it's hidden when closed
      assert.dom('.hds-popover-primitive__content').isNotVisible();
      assert.dom('#test-popover-primitive-content').doesNotExist();
    });

    // CALLBACKS

    test('it should invoke the `onOpen/onClose` callbacks', async function (assert) {
      const context = new TrackedObject({
        status: '',
      });

      const onOpen = () => {
        context.status = 'opened';
      };

      const onClose = () => {
        context.status = 'closed';
      };

      await render(
        <template>
          <HdsPopoverPrimitive
            @enableClickEvents={{true}}
            @onOpen={{onOpen}}
            @onClose={{onClose}}
            as |PP|
          >
            <div {{PP.setupPrimitiveContainer}}>
              <button
                {{PP.setupPrimitiveToggle}}
                id="test-popover-primitive-toggle"
                type="button"
              />
              <div
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
              />
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      // toggle the visibility
      await click('#test-popover-primitive-toggle');
      assert.strictEqual(context.status, 'opened');
      // toggle it again
      await click('#test-popover-primitive-toggle');
      assert.strictEqual(context.status, 'closed');
    });

    // ANCHORED POSITION OPTIONS

    // notice: since these options are forwarded to the `hds-anchored-position` modifier and there are specific tests for it, we're not going to test them here
    // plus, since the content elements are moved to the top layer, thery're not scaled like the `ember-testing` container, all the sizes/positions are out of sync

    // POPOVER API (HTML ATTRIBUTES)

    test('the toggle does not have a `popovertarget` attribute by default', async function (assert) {
      await render(
        <template>
          <HdsPopoverPrimitive as |PP|>
            <div {{PP.setupPrimitiveContainer}}>
              <button
                {{PP.setupPrimitiveToggle}}
                id="test-popover-primitive-toggle"
                type="button"
              />
              <div
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
              />
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      assert
        .dom('#test-popover-primitive-toggle')
        .doesNotHaveAttribute('popovertarget');
    });
    test('the toggle has a `popovertarget` attribute if `@enableClickEvents` is `true`', async function (assert) {
      await render(
        <template>
          <HdsPopoverPrimitive @enableClickEvents={{true}} as |PP|>
            <div {{PP.setupPrimitiveContainer}}>
              <button
                {{PP.setupPrimitiveToggle}}
                id="test-popover-primitive-toggle"
                type="button"
              />
              <div
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
                id="test-popover-primitive-popover"
              />
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      assert
        .dom('#test-popover-primitive-toggle')
        .hasAttribute('popovertarget', 'test-popover-primitive-popover');
    });
    test('the popover has a `popover` attribute by default', async function (assert) {
      await render(
        <template>
          <HdsPopoverPrimitive as |PP|>
            <div {{PP.setupPrimitiveContainer}}>
              <button
                {{PP.setupPrimitiveToggle}}
                id="test-popover-primitive-toggle"
                type="button"
              />
              <div
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
                id="test-popover-primitive-content"
              />
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      assert
        .dom('#test-popover-primitive-content')
        .hasAttribute('popover', 'auto');
    });
    test('the popover has a `popover` attribute set to `manual` if `@isOpen` is `true` and it reverts to `auto` after "soft" interacting with it', async function (assert) {
      await render(
        <template>
          <HdsPopoverPrimitive
            @enableClickEvents={{true}}
            @isOpen={{true}}
            as |PP|
          >
            <div {{PP.setupPrimitiveContainer}}>
              <button
                {{PP.setupPrimitiveToggle}}
                id="test-popover-primitive-toggle"
                type="button"
              />
              <div
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
                id="test-popover-primitive-content"
              />
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      assert
        .dom('#test-popover-primitive-content')
        .isVisible()
        .hasAttribute('popover', 'manual');
      // focus the toggle to show the popover
      await focus('#test-popover-primitive-toggle');
      // unfocus the toggle to hide the popover
      await blur('#test-popover-primitive-toggle');
      assert
        .dom('#test-popover-primitive-content')
        .isNotVisible()
        .hasAttribute('popover', 'auto');
    });
    test('the popover has a `popover` attribute set to `manual` if `@isOpen` is `true` and it reverts to `auto` after "click" interacting with it', async function (assert) {
      await render(
        <template>
          <HdsPopoverPrimitive
            @enableClickEvents={{true}}
            @isOpen={{true}}
            as |PP|
          >
            <div {{PP.setupPrimitiveContainer}}>
              <button
                {{PP.setupPrimitiveToggle}}
                id="test-popover-primitive-toggle"
                type="button"
              />
              <div
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
                id="test-popover-primitive-content"
              />
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      assert
        .dom('#test-popover-primitive-content')
        .hasAttribute('popover', 'manual');
      // this will change back the `popover` attribute to `auto`
      await click('#test-popover-primitive-toggle');
      assert
        .dom('#test-popover-primitive-content')
        .hasAttribute('popover', 'auto');
    });
    test('the popover is open when `isOpen` is true', async function (assert) {
      await render(
        <template>
          <HdsPopoverPrimitive
            @enableClickEvents={{true}}
            @isOpen={{true}}
            as |PP|
          >
            <div {{PP.setupPrimitiveContainer}}>
              <button
                {{PP.setupPrimitiveToggle}}
                id="test-popover-primitive-toggle"
                type="button"
              />
              <div
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
                id="test-popover-primitive-content"
              />
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      assert.dom('#test-popover-primitive-content').isVisible();
    });

    // ASSERTIONS

    test('it should throw an assertion if the toggle element is not a button', async function (assert) {
      const errorMessage =
        'The toggle element of "Hds::PopoverPrimitive" must be a <button>; element received: <div>';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(
        <template>
          <HdsPopoverPrimitive as |PP|>
            <div {{PP.setupPrimitiveContainer}}>
              {{! @glint-expect-error - testing invalid component usage }}
              <div {{PP.setupPrimitiveToggle}} />
              <div
                {{PP.setupPrimitivePopover anchoredPositionOptions=(hash)}}
              />
            </div>
          </HdsPopoverPrimitive>
        </template>,
      );
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  },
);
