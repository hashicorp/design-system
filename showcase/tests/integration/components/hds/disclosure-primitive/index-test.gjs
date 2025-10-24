/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { click, render, resetOnerror } from '@ember/test-helpers';
import DisclosurePrimitive from "@hashicorp/design-system-components/components/hds/disclosure-primitive/index";
import { on } from "@ember/modifier";

module(
  'Integration | Component | hds/disclosure-primitive/index',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><DisclosurePrimitive id="test-disclosure-primitive" /></template>,
      );
      assert
        .dom('div#test-disclosure-primitive')
        .hasClass('hds-disclosure-primitive');
    });

    // TOGGLE + CONTENT

    test('it should render the "toggle" block but not the "content', async function (assert) {
      await render(<template>
      <DisclosurePrimitive>
        <:toggle>
          <button type="button" id="test-disclosure-primitive-button" />
        </:toggle>
        <:content>
          <a id="test-disclosure-primitive-link" href="#">test</a>
        </:content>
      </DisclosurePrimitive>
    </template>);
      assert.dom('.hds-disclosure-primitive__toggle').exists();
      assert.dom('button#test-disclosure-primitive-button').exists();
      assert.dom('.hds-disclosure-primitive__content').exists();
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();
    });
    test('it should render the "content" when the "toggle" is clicked', async function (assert) {
      await render(<template>
      <DisclosurePrimitive>
        <:toggle as |t|>
          <button type="button" id="test-disclosure-primitive-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-primitive-link" href="#">test</a>
        </:content>
      </DisclosurePrimitive>
    </template>);
      await click('button#test-disclosure-primitive-button');
      assert.dom('a#test-disclosure-primitive-link').exists();
    });

    // isOpen

    test('it should toggle the "content" when @isOpen is set', async function (assert) {
      this.set('isOpen', true);
      await render(<template>
      <DisclosurePrimitive @isOpen={{this.isOpen}} id="test-disclosure-primitive">
        <:toggle as |t|>
          <button type="button" id="test-toggle-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-primitive-link" href="#">test</a>
        </:content>
      </DisclosurePrimitive>
    </template>);
      assert.dom('a#test-disclosure-primitive-link').exists();

      this.set('isOpen', false);
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();
    });

    test('it should allow @isOpen to override an internal _isOpen=true', async function (assert) {
      await render(<template>
      <DisclosurePrimitive @isOpen={{this.isOpen}} id="test-disclosure-primitive">
        <:toggle as |t|>
          <button type="button" id="test-toggle-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-primitive-link" href="#">test</a>
        </:content>
      </DisclosurePrimitive>
    </template>);
      await click('button#test-toggle-button');
      assert.dom('a#test-disclosure-primitive-link').exists();

      this.set('isOpen', false);
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();
    });

    test('it should allow @isOpen to override an internal _isOpen=false', async function (assert) {
      await render(<template>
      <DisclosurePrimitive @isOpen={{this.isOpen}} id="test-disclosure-primitive">
        <:toggle as |t|>
          <button type="button" id="test-toggle-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-primitive-link" href="#">test</a>
        </:content>
      </DisclosurePrimitive>
    </template>);
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();

      this.set('isOpen', true);
      assert.dom('a#test-disclosure-primitive-link').exists();
    });

    test('it should allow the internal _isOpen to override @isOpen=true', async function (assert) {
      this.set('isOpen', true);
      await render(<template>
      <DisclosurePrimitive @isOpen={{this.isOpen}} id="test-disclosure-primitive">
        <:toggle as |t|>
          <button type="button" id="test-toggle-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-primitive-link" href="#">test</a>
        </:content>
      </DisclosurePrimitive>
    </template>);
      assert.dom('a#test-disclosure-primitive-link').exists();

      await click('button#test-toggle-button');
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();
    });

    test('it should allow the internal _isOpen to override @isOpen=false', async function (assert) {
      this.set('isOpen', false);
      await render(<template>
      <DisclosurePrimitive @isOpen={{this.isOpen}} id="test-disclosure-primitive">
        <:toggle as |t|>
          <button type="button" id="test-toggle-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-primitive-link" href="#">test</a>
        </:content>
      </DisclosurePrimitive>
    </template>);
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();

      await click('button#test-toggle-button');
      assert.dom('a#test-disclosure-primitive-link').exists();
    });

    // contentId

    test('it should set the contentId on the content block', async function (assert) {
      await render(<template>
      <DisclosurePrimitive>
        <:toggle>
          <button type="button" id="test-disclosure-primitive-button" />
        </:toggle>
        <:content>
          <a id="test-disclosure-primitive-link" href="#">test</a>
        </:content>
      </DisclosurePrimitive>
    </template>);
      assert.dom('.hds-disclosure-primitive__content').hasAttribute('id');
    });

    // CLOSE DISCLOSED CONTENT ON CLICK

    test('it should hide the "content" when an interactive element triggers `close`', async function (assert) {
      await render(<template>
      <DisclosurePrimitive id="test-disclosure-primitive">
        <:toggle as |t|>
          <button type="button" id="test-toggle-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content as |c|>
          <button id="test-content-button" {{on "click" c.close}}>test</button>
        </:content>
      </DisclosurePrimitive>
    </template>);
      await click('button#test-toggle-button');
      assert.dom('button#test-content-button').exists();
      await click('button#test-content-button');
      assert.dom('button#test-content-button').doesNotExist();
    });

    // CALLBACK

    test('it should invoke the `onClickToggle` callback', async function (assert) {
      let opened = false;
      this.set('onClickToggle', () => (opened = !opened));
      await render(<template>
        <DisclosurePrimitive @onClickToggle={{this.onClickToggle}} id="test-disclosure-primitive">
          <:toggle as |t|>
            <button type="button" id="test-toggle-button" {{on "click" t.onClickToggle}} />
          </:toggle>
          <:content>
            <a id="test-disclosure-primitive-link" href="#">test</a>
          </:content>
        </DisclosurePrimitive>
      </template>);
      // toggle to open
      await click('button#test-toggle-button');
      assert.true(opened);
      assert.dom('a#test-disclosure-primitive-link').exists();
      // toggle to close
      await click('button#test-toggle-button');
      assert.false(opened);
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();
    });
  },
);
