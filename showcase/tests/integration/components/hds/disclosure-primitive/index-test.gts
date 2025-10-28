/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, render, resetOnerror, settled } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import { TrackedObject } from 'tracked-built-ins';

import { HdsDisclosurePrimitive } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/disclosure-primitive/index',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsDisclosurePrimitive id="test-disclosure-primitive" />
        </template>,
      );
      assert
        .dom('div#test-disclosure-primitive')
        .hasClass('hds-disclosure-primitive');
    });

    // TOGGLE + CONTENT

    test('it should render the "toggle" block but not the "content', async function (assert) {
      await render(
        <template>
          <HdsDisclosurePrimitive>
            <:toggle>
              <button type="button" id="test-disclosure-primitive-button" />
            </:toggle>
            <:content>
              <a id="test-disclosure-primitive-link" href="#">test</a>
            </:content>
          </HdsDisclosurePrimitive>
        </template>,
      );
      assert.dom('.hds-disclosure-primitive__toggle').exists();
      assert.dom('button#test-disclosure-primitive-button').exists();
      assert.dom('.hds-disclosure-primitive__content').exists();
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();
    });
    test('it should render the "content" when the "toggle" is clicked', async function (assert) {
      await render(
        <template>
          <HdsDisclosurePrimitive>
            <:toggle as |t|>
              <button
                type="button"
                id="test-disclosure-primitive-button"
                {{on "click" t.onClickToggle}}
              />
            </:toggle>
            <:content>
              <a id="test-disclosure-primitive-link" href="#">test</a>
            </:content>
          </HdsDisclosurePrimitive>
        </template>,
      );
      await click('button#test-disclosure-primitive-button');
      assert.dom('a#test-disclosure-primitive-link').exists();
    });

    // isOpen

    test('it should toggle the "content" when @isOpen is set', async function (assert) {
      const context = new TrackedObject({
        isOpen: true,
      });

      await render(
        <template>
          <HdsDisclosurePrimitive
            @isOpen={{context.isOpen}}
            id="test-disclosure-primitive"
          >
            <:toggle as |t|>
              <button
                type="button"
                id="test-toggle-button"
                {{on "click" t.onClickToggle}}
              />
            </:toggle>
            <:content>
              <a id="test-disclosure-primitive-link" href="#">test</a>
            </:content>
          </HdsDisclosurePrimitive>
        </template>,
      );
      assert.dom('a#test-disclosure-primitive-link').exists();

      context.isOpen = false;
      await settled();

      assert.dom('a#test-disclosure-primitive-link').doesNotExist();
    });

    test('it should allow @isOpen to override an internal _isOpen=true', async function (assert) {
      const context = new TrackedObject<Record<'isOpen', boolean | undefined>>({
        isOpen: undefined,
      });

      await render(
        <template>
          <HdsDisclosurePrimitive
            @isOpen={{context.isOpen}}
            id="test-disclosure-primitive"
          >
            <:toggle as |t|>
              <button
                type="button"
                id="test-toggle-button"
                {{on "click" t.onClickToggle}}
              />
            </:toggle>
            <:content>
              <a id="test-disclosure-primitive-link" href="#">test</a>
            </:content>
          </HdsDisclosurePrimitive>
        </template>,
      );
      await click('button#test-toggle-button');
      assert.dom('a#test-disclosure-primitive-link').exists();

      context.isOpen = false;
      await settled();
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();
    });

    test('it should allow @isOpen to override an internal _isOpen=false', async function (assert) {
      const context = new TrackedObject<Record<'isOpen', boolean | undefined>>({
        isOpen: undefined,
      });

      await render(
        <template>
          <HdsDisclosurePrimitive
            @isOpen={{context.isOpen}}
            id="test-disclosure-primitive"
          >
            <:toggle as |t|>
              <button
                type="button"
                id="test-toggle-button"
                {{on "click" t.onClickToggle}}
              />
            </:toggle>
            <:content>
              <a id="test-disclosure-primitive-link" href="#">test</a>
            </:content>
          </HdsDisclosurePrimitive>
        </template>,
      );
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();

      context.isOpen = true;
      await settled();

      assert.dom('a#test-disclosure-primitive-link').exists();
    });

    test('it should allow the internal _isOpen to override @isOpen=true', async function (assert) {
      await render(
        <template>
          <HdsDisclosurePrimitive
            @isOpen={{true}}
            id="test-disclosure-primitive"
          >
            <:toggle as |t|>
              <button
                type="button"
                id="test-toggle-button"
                {{on "click" t.onClickToggle}}
              />
            </:toggle>
            <:content>
              <a id="test-disclosure-primitive-link" href="#">test</a>
            </:content>
          </HdsDisclosurePrimitive>
        </template>,
      );
      assert.dom('a#test-disclosure-primitive-link').exists();

      await click('button#test-toggle-button');
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();
    });

    test('it should allow the internal _isOpen to override @isOpen=false', async function (assert) {
      await render(
        <template>
          <HdsDisclosurePrimitive
            @isOpen={{false}}
            id="test-disclosure-primitive"
          >
            <:toggle as |t|>
              <button
                type="button"
                id="test-toggle-button"
                {{on "click" t.onClickToggle}}
              />
            </:toggle>
            <:content>
              <a id="test-disclosure-primitive-link" href="#">test</a>
            </:content>
          </HdsDisclosurePrimitive>
        </template>,
      );
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();

      await click('button#test-toggle-button');
      assert.dom('a#test-disclosure-primitive-link').exists();
    });

    // contentId

    test('it should set the contentId on the content block', async function (assert) {
      await render(
        <template>
          <HdsDisclosurePrimitive>
            <:toggle>
              <button type="button" id="test-disclosure-primitive-button" />
            </:toggle>
            <:content>
              <a id="test-disclosure-primitive-link" href="#">test</a>
            </:content>
          </HdsDisclosurePrimitive>
        </template>,
      );
      assert.dom('.hds-disclosure-primitive__content').hasAttribute('id');
    });

    // CLOSE DISCLOSED CONTENT ON CLICK

    test('it should hide the "content" when an interactive element triggers `close`', async function (assert) {
      await render(
        <template>
          <HdsDisclosurePrimitive id="test-disclosure-primitive">
            <:toggle as |t|>
              <button
                type="button"
                id="test-toggle-button"
                {{on "click" t.onClickToggle}}
              />
            </:toggle>
            <:content as |c|>
              <button
                id="test-content-button"
                type="button"
                {{on "click" c.close}}
              >test</button>
            </:content>
          </HdsDisclosurePrimitive>
        </template>,
      );
      await click('button#test-toggle-button');
      assert.dom('button#test-content-button').exists();
      await click('button#test-content-button');
      assert.dom('button#test-content-button').doesNotExist();
    });

    // CALLBACK

    test('it should invoke the `onClickToggle` callback', async function (assert) {
      const context = new TrackedObject({
        isOpen: false,
      });

      const onClickToggle = () => {
        context.isOpen = !context.isOpen;
      };

      await render(
        <template>
          <HdsDisclosurePrimitive
            @onClickToggle={{onClickToggle}}
            id="test-disclosure-primitive"
          >
            <:toggle as |t|>
              <button
                type="button"
                id="test-toggle-button"
                {{on "click" t.onClickToggle}}
              />
            </:toggle>
            <:content>
              <a id="test-disclosure-primitive-link" href="#">test</a>
            </:content>
          </HdsDisclosurePrimitive>
        </template>,
      );
      // toggle to open
      await click('button#test-toggle-button');
      assert.true(context.isOpen);
      assert.dom('a#test-disclosure-primitive-link').exists();
      // toggle to close
      await click('button#test-toggle-button');
      assert.false(context.isOpen);
      assert.dom('a#test-disclosure-primitive-link').doesNotExist();
    });
  },
);
