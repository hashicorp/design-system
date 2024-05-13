/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, focus, blur, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/popover-primitive/index',
  function (hooks) {
    setupRenderingTest(hooks);

    // NOTICE: the PopoverPrimitive is a headless component

    // IDs

    test('it should generate IDs provided and connect them with the popover attributes', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableClickEvents={{true}} as |PP|>
          <div {{PP.setupPrimitiveContainer}}>
            <button {{PP.setupPrimitiveToggle}} />
            <main {{PP.setupPrimitivePopover}} />
          </div>
        </Hds::PopoverPrimitive>
      `);
      // the popover ID is dynamically generated
      const popover = this.element.querySelector('main');
      const popoverId = popover.id;
      assert.dom('button').hasAttribute('popovertarget', popoverId);
      assert.dom('main').hasAttribute('popover', 'auto');
    });

    test('it should use the IDs provided and connect them with the popover attributes', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableClickEvents={{true}} as |PP|>
          <div {{PP.setupPrimitiveContainer}}>
            <button {{PP.setupPrimitiveToggle}} id="test-popover-primitive-toggle" />
            <div {{PP.setupPrimitivePopover}} id="test-popover-primitive-content" />
          </div>
        </Hds::PopoverPrimitive>
      `);
      assert
        .dom('#test-popover-primitive-toggle')
        .hasAttribute('popovertarget', 'test-popover-primitive-content');
      assert
        .dom('#test-popover-primitive-content')
        .hasAttribute('popover', 'auto');
    });

    // INTERACTIONS

    test('it should toggle the popover visibility on focus in/out', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableSoftEvents={{true}} as |PP|>
          <div {{PP.setupPrimitiveContainer}}>
            <button {{PP.setupPrimitiveToggle}} id="test-popover-primitive-toggle" />
            <div {{PP.setupPrimitivePopover}} id="test-popover-primitive-content" />
          </div>
        </Hds::PopoverPrimitive>
      `);
      // it's hidden by default
      assert.dom('#test-popover-primitive-content').isNotVisible();
      // focus the toggle to show the popover
      await focus('#test-popover-primitive-toggle');
      // now it should be visible
      assert.dom('#test-popover-primitive-content').isVisible();
      // extra test to check that the the content goes on the top layer
      assert.strictEqual(
        document.querySelectorAll('[popover]:popover-open').length,
        1
      );
      // unfocus the toggle to hide the popover
      await blur('#test-popover-primitive-toggle');
      // should go back to hidden
      assert.dom('#test-popover-primitive-content').isNotVisible();
    });
    test('it should toggle the popover visibility on click', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableClickEvents={{true}} as |PP|>
          <div {{PP.setupPrimitiveContainer}}>
            <button {{PP.setupPrimitiveToggle}} id="test-popover-primitive-toggle" />
            <div {{PP.setupPrimitivePopover}} id="test-popover-primitive-content" />
          </div>
        </Hds::PopoverPrimitive>
      `);
      // it's hidden by default
      assert.dom('#test-popover-primitive-content').isNotVisible();
      // focus the toggle to show the popover
      await click('#test-popover-primitive-toggle');
      // now it should be visible
      assert.dom('#test-popover-primitive-content').isVisible();
      // extra test to check that the the content goes on the top layer
      assert.strictEqual(
        document.querySelectorAll('[popover]:popover-open').length,
        1
      );
      // click again the toggle to hide the content
      await click('#test-popover-primitive-toggle');
      // should go back to hidden
      assert.dom('#test-popover-primitive-content').isNotVisible();
    });
    skip('it should toggle the popover visibility on click', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableClickEvents={{true}}>
          <:toggle>Toggle</:toggle>
          <:content>
            <div id="test-popover-primitive-content">Content</div>
          </:content>
        </Hds::PopoverPrimitive>
      `);
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
      let status;
      this.set('onOpen', () => (status = 'opened'));
      this.set('onClose', () => (status = 'closed'));
      await render(hbs`
        <Hds::PopoverPrimitive
          @enableClickEvents={{true}}
          @onOpen={{this.onOpen}}
          @onClose={{this.onClose}}
          as |PP|
        >
          <div {{PP.setupPrimitiveContainer}}>
            <button {{PP.setupPrimitiveToggle}} id="test-popover-primitive-toggle" />
            <div {{PP.setupPrimitivePopover}} />
          </div>
        </Hds::PopoverPrimitive>
      `);
      // toggle the visibility
      await click('#test-popover-primitive-toggle');
      assert.strictEqual(status, 'opened');
      // toggle it again
      await click('#test-popover-primitive-toggle');
      assert.strictEqual(status, 'closed');
    });

    // ANCHORED POSITION OPTIONS

    // notice: since these options are forwarded to the `hds-anchored-position` modifier and there are specific tests for it, we're not going to test them here
    // plus, since the content elements are moved to the top layer, thery're not scaled like the `ember-testing` container, all the sizes/positions are out of sync

    // POPOVER API (HTML ATTRIBUTES)

    test('the toggle does not have a `popovertarget` attribute by default', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive as |PP|>
          <div {{PP.setupPrimitiveContainer}}>
            <button {{PP.setupPrimitiveToggle}} id="test-popover-primitive-toggle" />
            <div {{PP.setupPrimitivePopover}} />
          </div>
        </Hds::PopoverPrimitive>
      `);
      assert
        .dom('#test-popover-primitive-toggle')
        .doesNotHaveAttribute('popovertarget');
    });
    test('the toggle has a `popovertarget` attribute if `@enableClickEvents` is `true`', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableClickEvents={{true}} as |PP|>
          <div {{PP.setupPrimitiveContainer}}>
            <button {{PP.setupPrimitiveToggle}} id="test-popover-primitive-toggle" />
            <div {{PP.setupPrimitivePopover}} id="test-popover-primitive-popover" />
          </div>
        </Hds::PopoverPrimitive>
      `);
      assert
        .dom('#test-popover-primitive-toggle')
        .hasAttribute('popovertarget', 'test-popover-primitive-popover');
    });
    test('the popover has a `popover` attribute by default', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive as |PP|>
          <div {{PP.setupPrimitiveContainer}}>
            <button {{PP.setupPrimitiveToggle}} id="test-popover-primitive-toggle" />
            <div {{PP.setupPrimitivePopover}} id="test-popover-primitive-content" />
          </div>
        </Hds::PopoverPrimitive>
      `);
      assert
        .dom('#test-popover-primitive-content')
        .hasAttribute('popover', 'auto');
    });
    test('the popover has a `popover` attribute set to `manual` if `@isOpen` is `true` and it reverts to `auto` after "soft" interacting with it', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableClickEvents={{true}} @isOpen={{true}} as |PP|>
          <div {{PP.setupPrimitiveContainer}}>
            <button {{PP.setupPrimitiveToggle}} id="test-popover-primitive-toggle" />
            <div {{PP.setupPrimitivePopover}} id="test-popover-primitive-content" />
          </div>
        </Hds::PopoverPrimitive>
      `);
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
      await render(hbs`
        <Hds::PopoverPrimitive @enableClickEvents={{true}} @isOpen={{true}} as |PP|>
          <div {{PP.setupPrimitiveContainer}}>
            <button {{PP.setupPrimitiveToggle}} id="test-popover-primitive-toggle" />
            <div {{PP.setupPrimitivePopover}} id="test-popover-primitive-content" />
          </div>
        </Hds::PopoverPrimitive>
      `);
      assert
        .dom('#test-popover-primitive-content')
        .hasAttribute('popover', 'manual');
      // this will change back the `popover` attribute to `auto`
      await click('#test-popover-primitive-toggle');
      assert
        .dom('#test-popover-primitive-content')
        .hasAttribute('popover', 'auto');
    });

    // ASSERTIONS

    test('it should throw an assertion if the toggle element is not a button', async function (assert) {
      const errorMessage =
        'The toggle element of "Hds::PopoverPrimitive" must be a <button>; element received: <div>';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(hbs`
        <Hds::PopoverPrimitive as |PP|>
          <div {{PP.setupPrimitiveContainer}}>
            <div {{PP.setupPrimitiveToggle}} />
            <div {{PP.setupPrimitivePopover}} />
          </div>
        </Hds::PopoverPrimitive>
      `);
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  }
);
