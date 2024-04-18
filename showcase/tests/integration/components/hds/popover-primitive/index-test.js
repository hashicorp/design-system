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

    // BASE ELEMENTS + CONTENT VISIBILITY + IS-OPEN

    test('it should not render the "arrow" by default', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive />
      `);
      assert.dom('.hds-popover-primitive__arrow').doesNotExist();
    });
    test('it should render the "arrow" element if `@popoverHasArrow` is `true`', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @popoverHasArrow={{true}} />
      `);
      assert.dom('.hds-popover-primitive__arrow').exists();
    });

    test('it should render the elements yielded to the :toggle and :content slots and toggle their visibility correctly', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @popoverHasArrow={{true}} @enableClickEvents={{true}}>
          <:toggle>
            <div id="test-popover-primitive-toggle">Toggle</div>
          </:toggle>
          <:content>
            <div id="test-popover-primitive-content">Content</div>
          </:content>
        </Hds::PopoverPrimitive>
      `);
      assert.dom('.hds-popover-primitive__toggle').exists();
      assert.dom('#test-popover-primitive-toggle').exists();
      assert.dom('.hds-popover-primitive__arrow').exists().isNotVisible();
      assert.dom('.hds-popover-primitive__content').exists().isNotVisible();
      assert.dom('#test-popover-primitive-content').doesNotExist();

      // toggle the visibility
      await click('button.hds-popover-primitive__toggle');

      assert.dom('.hds-popover-primitive__arrow').isVisible();
      assert.dom('.hds-popover-primitive__content').isVisible();
      assert.dom('#test-popover-primitive-content').exists().isVisible();
    });

    test('the arrow and the content should be rendered and visible if `@isOpen` is `true`', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @popoverHasArrow={{true}} @isOpen={{true}}>
          <:toggle>Toggle</:toggle>
          <:content>Content</:content>
        </Hds::PopoverPrimitive>
      `);
      assert.dom('.hds-popover-primitive__arrow').isVisible();
      assert.dom('.hds-popover-primitive__content').isVisible();
      // we use the Popover API selector to do an extra check
      assert.dom('.hds-popover-primitive__content:popover-open').exists();
    });

    // DISPLAY

    test('it should render the container and toggle as block by default', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive />
      `);
      assert.dom('.hds-popover-primitive--is-block').exists();
    });
    test('it should render the container and toggle as inline if `@isInline` is `true`', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @isInline={{true}} />
      `);
      assert.dom('.hds-popover-primitive--is-inline').exists();
    });

    // WIDTH/HEIGHT

    test('it should render the container to fit the content by default', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @isOpen={{true}}>
          <:content>
            <div style="width: 98px; height: 76px;" />
          </:content>
        </Hds::PopoverPrimitive>
      `);
      const content = this.element.querySelector(
        '.hds-popover-primitive__content'
      );
      const rect = content.getBoundingClientRect();
      assert.deepEqual(rect.width, 98);
      assert.deepEqual(rect.height, 76);
    });
    test('it should render the container with the provided with/height', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @popoverWidth="123px" @popoverHeight="456px" @isOpen={{true}} />
      `);
      const content = this.element.querySelector(
        '.hds-popover-primitive__content'
      );
      const rect = content.getBoundingClientRect();
      assert.deepEqual(rect.width, 123);
      assert.deepEqual(rect.height, 456);
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
        <Hds::PopoverPrimitive @toggleContainsInteractive={{true}}>
          <:toggle>
            <button type="button">Toggle</button>
          </:toggle>
          <:content>Content</:content>
        </Hds::PopoverPrimitive>
      `);
      assert.dom('div.hds-popover-primitive__toggle').exists();
      assert.dom('div.hds-popover-primitive__toggle > button').exists();
    });

    // INTERACTIONS

    test('it should toggle the content visibility on focus in/out', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableSoftEvents={{true}}>
          <:toggle>Toggle</:toggle>
          <:content>
            <div id="test-popover-primitive-content">Content</div>
          </:content>
        </Hds::PopoverPrimitive>
      `);
      // it's hidden when closed
      assert.dom('.hds-popover-primitive__content').isNotVisible();
      assert.dom('#test-popover-primitive-content').doesNotExist();
      // focus the toggle to show the content
      await focus('button.hds-popover-primitive__toggle');
      // now it should be visible
      assert.dom('.hds-popover-primitive__content').isVisible();
      assert.dom('#test-popover-primitive-content').exists().isVisible();
      // extra test to check that the the content goes on the top layer
      assert.strictEqual(
        document.querySelectorAll('[popover]:popover-open').length,
        1
      );
      // unfocus the toggle to hide the content
      await blur('button.hds-popover-primitive__toggle');
      // it's hidden when closed
      assert.dom('.hds-popover-primitive__content').isNotVisible();
      assert.dom('#test-popover-primitive-content').doesNotExist();
    });
    test('it should toggle the content visibility on click', async function (assert) {
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

    test('it should toggle the content visibility on focus in/out when containinig interactive elements', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableSoftEvents={{true}} @toggleContainsInteractive={{true}}>
          <:toggle>
            <button type="button">Toggle</button>
          </:toggle>
          <:content>
            <div id="test-popover-primitive-content">Content</div>
          </:content>
        </Hds::PopoverPrimitive>
      `);
      // it's hidden when closed
      assert.dom('.hds-popover-primitive__content').isNotVisible();
      assert.dom('#test-popover-primitive-content').doesNotExist();
      // focus the toggle to show the content
      await focus('.hds-popover-primitive__toggle > button');
      // now it should be visible
      assert.dom('#test-popover-primitive-content').isVisible();
      assert.dom('#test-popover-primitive-content').exists().isVisible();
      // unfocus the toggle to hide the content
      await blur('.hds-popover-primitive__toggle > button');
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

    // ANCHORED POSITION OPTIONS

    // notice: since these options are forwarded to the `hds-anchored-position` modifier and there are specific tests for it, we're not going to test them here
    // plus, since the content elements are moved to the top layer, thery're not scaled like the `ember-testing` container, all the sizes/positions are out of sync

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
    test('the content has a `popover` attribute set to `manual` if `@isOpen` is `true` and it reverts to `auto` after "soft" interacting with it', async function (assert) {
      await render(
        hbs`<Hds::PopoverPrimitive @enableSoftEvents={{true}} @isOpen={{true}} />`
      );
      assert
        .dom('.hds-popover-primitive__content')
        .hasAttribute('popover', 'manual');
      await focus('.hds-popover-primitive__toggle');
      // this will change back the `popover` attribute to `auto`
      await blur('.hds-popover-primitive__toggle');
      assert
        .dom('.hds-popover-primitive__content')
        .hasAttribute('popover', 'auto');
    });
    test('the content has a `popover` attribute set to `manual` if `@isOpen` is `true` and it reverts to `auto` after "click" interacting with it', async function (assert) {
      await render(
        hbs`<Hds::PopoverPrimitive @enableClickEvents={{true}} @isOpen={{true}} />`
      );
      assert
        .dom('.hds-popover-primitive__content')
        .hasAttribute('popover', 'manual');
      // this will change back the `popover` attribute to `auto`
      await click('.hds-popover-primitive__toggle');
      assert
        .dom('.hds-popover-primitive__content')
        .hasAttribute('popover', 'auto');
    });

    // A11Y

    test('it displays the correct aria and role attributes for "toggle" with non interactive content', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableClickEvents={{true}} @toggleAriaLabel="test123">
          <:toggle>Toggle</:toggle>
          <:content>Content</:content>
        </Hds::PopoverPrimitive>

      `);
      // the target ID is dynamically generated
      let target = this.element.querySelector(
        '.hds-popover-primitive__content'
      );
      let targetId = target.id;
      assert.dom('.hds-popover-primitive__toggle').hasAria('label', 'test123');
      assert.dom('.hds-popover-primitive__toggle').hasAria('expanded', 'false');
      assert
        .dom('.hds-popover-primitive__toggle')
        .hasAria('controls', targetId);
      assert
        .dom('.hds-popover-primitive__toggle')
        .hasAria('describedby', targetId);
      assert.dom('.hds-popover-primitive__toggle').hasAria('details', targetId);

      await click('.hds-popover-primitive__toggle');

      assert.dom('.hds-popover-primitive__toggle').hasAria('expanded', 'true');
      assert
        .dom('.hds-popover-primitive__content')
        .hasAttribute('role', 'tooltip');
      assert
        .dom('.hds-popover-primitive__content')
        .hasAttribute('tabindex', '-1');
    });

    test('it displays the correct aria and role attributes for "toggle" with interactive content', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive @enableSoftEvents={{true}} @toggleAriaLabel="test123" @toggleContainsInteractive={{true}}>
          <:toggle>
            <input />
          </:toggle>
          <:content>Content</:content>
        </Hds::PopoverPrimitive>
      `);
      // the target ID is dynamically generated
      let target = this.element.querySelector(
        '.hds-popover-primitive__content'
      );
      let targetId = target.id;
      assert.dom('.hds-popover-primitive__toggle').hasAria('label', 'test123');
      assert.dom('.hds-popover-primitive__toggle').doesNotHaveAria('expanded');
      assert
        .dom('.hds-popover-primitive__toggle')
        .hasAria('controls', targetId);
      assert
        .dom('.hds-popover-primitive__toggle')
        .hasAria('describedby', targetId);
      assert.dom('.hds-popover-primitive__toggle').hasAria('details', targetId);

      await focus('.hds-popover-primitive__toggle input');

      assert.dom('.hds-popover-primitive__toggle').doesNotHaveAria('expanded');
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
        'Hds::PopoverPrimitive - You have enabled `click` events to the "toggle" element (via `@enableClickEvents`), but it contains interactive elements: this may result in unexpected behaviours or non accessible code';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });
      await render(hbs`
        <Hds::PopoverPrimitive @enableClickEvents={{true}} @toggleContainsInteractive={{true}}>
          <:toggle>
            <input />
          </:toggle>
          <:content>Content</:content>
        </Hds::PopoverPrimitive>
      `);
      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });
  }
);
