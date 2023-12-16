/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/disclosure-primitive/index',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::DisclosurePrimitive id="test-disclosure-primitive" />`
      );
      assert
        .dom('div#test-disclosure-primitive')
        .hasClass('hds-disclosure-primitive');
    });

    // TOGGLE + CONTENT

    test('it should render the "toggle" block but not the "content', async function (assert) {
      await render(hbs`
      <Hds::DisclosurePrimitive>
        <:toggle>
          <button type="button" id="test-disclosure-primitive-button" />
        </:toggle>
      </Hds::DisclosurePrimitive>
    `);
      assert.dom('.hds-disclosure-primitive__toggle').exists();
      assert.dom('button#test-disclosure-primitive-button').exists();
      assert.dom('.hds-disclosure-primitive__content').doesNotExist();
    });
    test('it should render the "content" when the "toggle" is clicked', async function (assert) {
      await render(hbs`
      <Hds::DisclosurePrimitive>
        <:toggle as |t|>
          <button type="button" id="test-disclosure-primitive-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-primitive-link" href="#">test</a>
        </:content>
      </Hds::DisclosurePrimitive>
    `);
      await click('button#test-disclosure-primitive-button');
      assert.dom('.hds-disclosure-primitive__content').exists();
      assert.dom('a#test-disclosure-primitive-link').exists();
    });

    // CLOSE DISCLOSED CONTENT ON CLICK

    test('it should hide the "content" when an interactive element triggers `close`', async function (assert) {
      await render(hbs`
      <Hds::DisclosurePrimitive id="test-disclosure-primitive">
        <:toggle as |t|>
          <button type="button" id="test-toggle-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content as |c|>
          <button id="test-content-button" {{on "click" c.close}}>test</button>
        </:content>
      </Hds::DisclosurePrimitive>
    `);
      await click('button#test-toggle-button');
      assert.dom('.hds-disclosure-primitive__content').exists();
      assert.dom('button#test-content-button').exists();
      await click('button#test-content-button');
      assert.dom('.hds-disclosure-primitive__content').doesNotExist();
      assert.dom('button#test-content-button').doesNotExist();
    });
  }
);
