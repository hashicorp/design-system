/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, focus, blur, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/popover-primitive/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(hbs`<Hds::PopoverPrimitive id="test-popover-primitive" />`);
      assert.dom('#test-popover-primitive').hasClass('hds-popover-primitive');
    });

    // BASE ELEMENTS + CONTENT VISIBILITY + ISOPEN

    test('it should render the elements yielded to the :toggle and :content slots', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @popoverOptions={{(hash arrow="#test-popover-primitive-arrow")}} @enableClickEvents={{true}}>
          <:toggle>
            <div id="test-popover-primitive-toggle">Toggle</div>
          </:toggle>
          <:content>
            <div id="test-popover-primitive-arrow" />
            <div id="test-popover-primitive-content">Content</div>
          </:content>
        </Hds::PopoverPrimitive>
      `);
      assert.dom('.hds-popover-primitive__toggle').exists();
      assert.dom('#test-popover-primitive-toggle').exists();
      assert.dom('.hds-popover-primitive__content').exists();
      // it's hidden when closed
      assert.dom('#test-popover-primitive-arrow').doesNotExist();
      assert.dom('#test-popover-primitive-content').doesNotExist();
      // toggle the visibility
      await click('button.hds-popover-primitive__toggle');
      // now it should be visible
      // TODO! this fails and it's a problem I missed!
      assert.dom('#test-popover-primitive-arrow').exists();
      assert.dom('#test-popover-primitive-content').exists();
    });

    test('it should render the content if `@isOpen` is `true`', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @isOpen={{true}}>
          <:toggle>
            <div id="test-popover-primitive-toggle">Toggle</div>
          </:toggle>
          <:content>
            <div id="test-popover-primitive-content">Content</div>
          </:content>
        </Hds::PopoverPrimitive>
      `);
      assert.dom('#test-popover-primitive-content').exists();
    });

    // DISPLAY

    test('it should render the container and toggle as inline by default', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive />
      `);
      assert.dom('.hds-popover-primitive--is-inline').exists();
      assert.dom('.hds-popover-primitive__toggle--is-inline').exists();
    });
    test('it should render the container and toggle as block if `@isInline` is `false`', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @isInline={{false}} />
      `);
      assert.dom('.hds-popover-primitive--is-block').exists();
      assert.dom('.hds-popover-primitive__toggle--is-block').exists();
    });

    // CONTAINS INTERACTIVE ELEMENTS

    test('it should render the toggle container as `<button>` by default', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive />
      `);
      assert.dom('button.hds-popover-primitive__toggle').exists();
    });
    test('it should render the toggle container as `<div>` if it contains interactive elements', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive>
          <:toggle as |t|>
            <button type="button" id="test-popover-primitive-toggle">Toggle</button>
          </:toggle>
          <:content>
            <div id="test-popover-primitive-content">Content</div>
          </:content>
        </Hds::PopoverPrimitive>
      `);
      assert.dom('div.hds-popover-primitive__toggle').exists();
      assert.dom('div.hds-popover-primitive__toggle > button').exists();
    });

    // INTERACTIONS

    test('it should toggle the content visibility on focus in/out', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableSoftEvents={{true}}>
          <:toggle>
            <div id="test-popover-primitive-toggle">Toggle</div>
          </:toggle>
          <:content>
            <div id="test-popover-primitive-content">Content</div>
          </:content>
        </Hds::PopoverPrimitive>
      `);
      // it's hidden when closed
      assert.dom('#test-popover-primitive-content').doesNotExist();
      // focus the toggle to show the content
      await focus('button.hds-popover-primitive__toggle');
      // now it should be visible
      // TODO! this fails and it's a problem I missed!
      assert.dom('#test-popover-primitive-content').exists();
      // unfocus the toggle to hide the content
      await blur('button.hds-popover-primitive__toggle');
      // it's hidden when closed
      assert.dom('#test-popover-primitive-content').doesNotExist();
    });
    test('it should toggle the content visibility on click', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableClickEvents={{true}}>
          <:toggle>
            <div id="test-popover-primitive-toggle">Toggle</div>
          </:toggle>
          <:content>
            <div id="test-popover-primitive-content">Content</div>
          </:content>
        </Hds::PopoverPrimitive>
      `);
      // it's hidden when closed
      assert.dom('#test-popover-primitive-content').doesNotExist();
      // click the toggle to show the content
      await click('button.hds-popover-primitive__toggle');
      // now it should be visible
      // TODO! this fails and it's a problem I missed!
      assert.dom('#test-popover-primitive-content').exists();
      // click again the toggle to hide the content
      await click('button.hds-popover-primitive__toggle');
      // it's hidden when closed
      assert.dom('#test-popover-primitive-content').doesNotExist();
    });

    test('it should toggle the content visibility on focus in/out when containinig interactive elements', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableSoftEvents={{true}}>
          <:toggle as |t|>
            <button type="button" id="test-popover-primitive-toggle">Toggle</button>
          </:toggle>
          <:content>
            <div id="test-popover-primitive-content">Content</div>
          </:content>
        </Hds::PopoverPrimitive>
      `);
      // it's hidden when closed
      assert.dom('#test-popover-primitive-content').doesNotExist();
      // focus the toggle to show the content
      await focus('.hds-popover-primitive__toggle > button');
      // now it should be visible
      // TODO! this fails and it's a problem I missed!
      assert.dom('#test-popover-primitive-content').exists();
      // unfocus the toggle to hide the content
      await blur('.hds-popover-primitive__toggle > button');
      // it's hidden when closed
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
        >
          <:toggle>
            <div id="test-popover-primitive-toggle">Toggle</div>
          </:toggle>
          <:content>
            <div id="test-popover-primitive-content">Content</div>
          </:content>
        </Hds::PopoverPrimitive>
      `);
      // toggle the visibility
      await click('button.hds-popover-primitive__toggle');
      assert.strictEqual(status, 'opened');
      // toggle it again
      await click('button.hds-popover-primitive__toggle');
      assert.strictEqual(status, 'closed');
    });

    // POPOVER OPTIONS

    // TODO!

    // POPOVER API (HTML ATTRIBUTES)

    test('the toggle does not have a `popovertarget` attribute by default', async function (assert) {
      await render(hbs`<Hds::PopoverPrimitive />`);
      assert
        .dom('.hds-popover-primitive__toggle')
        .doesNotHaveAttribute('popovertarget');
    });
    test('the toggle has a `popovertarget` attribute if `@enableClickEvents` is `true`', async function (assert) {
      await render(hbs`<Hds::PopoverPrimitive @enableClickEvents={{true}} />`);
      // the target ID is dynamically generated
      let target = this.element.querySelector(
        '.hds-popover-primitive__content'
      );
      let targetId = target.id;
      assert
        .dom('.hds-popover-primitive__toggle')
        .hasAttribute('popovertarget', targetId);
    });

    test('the content has a `popover` attribute by default', async function (assert) {
      await render(hbs`<Hds::PopoverPrimitive />`);
      assert
        .dom('.hds-popover-primitive__content')
        .hasAttribute('popover', 'auto');
    });
    test('the content has a `popover` attribute set to `manual` if `@isOpen` is `true` and it reverts to `auto` after interacting with it', async function (assert) {
      await render(
        hbs`<Hds::PopoverPrimitive @enableSoftEvents={{true}} @isOpen={{true}} />`
      );
      assert
        .dom('.hds-popover-primitive__content')
        .hasAttribute('popover', 'manual');
      await focus('.hds-popover-primitive__toggle');
      assert
        .dom('.hds-popover-primitive__content')
        .hasAttribute('popover', 'auto');
    });

    // • default => hds-popover-primitive__content > popover="auto"
    // • isOpen=true => hds-popover-primitive__content > popover="auto"

    // • test if the content goes on the top layer and the popover attribute is set

    // TODO!

    // A11Y

    test('it displays the correct aria and role attributes', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableClickEvents={{true}} @toggleAriaLabel="test123" />
      `);
      assert.dom('.hds-popover-primitive__toggle').hasAria('label', 'test123');
      assert.dom('.hds-popover-primitive__toggle').hasAria('expanded', 'false');
      await click('.hds-popover-primitive__toggle');
      assert.dom('.hds-popover-primitive__toggle').hasAria('expanded', 'true');
      assert
        .dom('.hds-popover-primitive__content')
        .hasAttribute('role', 'tooltip');
      assert
        .dom('.hds-popover-primitive__content')
        .hasAttribute('tabindex', '-1');
    });

    // ASSERTIONS

    test('it should throw an assertion if `@enableClickEvents` is `true` and the toggle contains interactive elements', async function (assert) {
      const errorMessage =
        'Hds::PopoverPrimitive - You have assigned `onClick` events to the "toggle" element, but it contains interactive elements: this may result in unexpected behaviours or non accessible code';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(hbs`
        <Hds::PopoverPrimitive @enableClickEvents={{true}}>
          <:toggle as |t|>
            <button type="button" id="test-popover-primitive-toggle">Toggle</button>
          </:toggle>
          <:content>
            <div id="test-popover-primitive-content">Content</div>
          </:content>
        </Hds::PopoverPrimitive>
      `);
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  }
);
