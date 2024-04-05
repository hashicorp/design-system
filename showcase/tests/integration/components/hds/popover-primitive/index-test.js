/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { pauseTest, render, click, focus, blur } from '@ember/test-helpers';
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
        <Hds::PopoverPrimitive id="test-popover-primitive" @popoverOptions={{(hash arrow="#test-popover-primitive-arrow")}} @enableClickEvents={{true}}>
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
        <Hds::PopoverPrimitive id="test-popover-primitive" @isOpen={{true}}>
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
        <Hds::PopoverPrimitive id="test-popover-primitive" />
      `);
      assert.dom('.hds-popover-primitive--is-inline').exists();
      assert.dom('.hds-popover-primitive__toggle--is-inline').exists();
    });
    test('it should render the container and toggle as block if `@isInline` is `false`', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive id="test-popover-primitive" @isInline={{false}} />
      `);
      assert.dom('.hds-popover-primitive--is-block').exists();
      assert.dom('.hds-popover-primitive__toggle--is-block').exists();
    });

    // CONTAINS INTERACTIVE ELEMENTS

    test('it should render the toggle container as `<button>` by default', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive id="test-popover-primitive" />
      `);
      assert.dom('button.hds-popover-primitive__toggle').exists();
    });
    test('it should render the toggle container as `<div>` if it contains interactive elements', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive id="test-popover-primitive">
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
        <Hds::PopoverPrimitive id="test-popover-primitive" @enableSoftEvents={{true}}>
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
        <Hds::PopoverPrimitive id="test-popover-primitive" @enableClickEvents={{true}}>
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
        <Hds::PopoverPrimitive id="test-popover-primitive" @enableSoftEvents={{true}}>
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
    test('it should toggle the content visibility on click when containinig interactive elements', async function (assert) {
      await render(hbs`
        <Hds::PopoverPrimitive id="test-popover-primitive" @enableClickEvents={{true}}>
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
      // click the toggle to show the content
      await click('.hds-popover-primitive__toggle > button');
      // now it should be visible
      // TODO! this fails and it's a problem I missed!
      assert.dom('#test-popover-primitive-content').exists();
      // click again the toggle to hide the content
      await click('.hds-popover-primitive__toggle > button');
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
          id="test-popover-primitive"
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
  }

  // POPOVER OPTIONS

  // TODO!

  // POPOVER API ??

  // TEST IF THE CONTENT GOES ON THE TOP LAYER AND THE POPOVER ATTRIBUTE IS SET
  // popover + popover target attributes
);
