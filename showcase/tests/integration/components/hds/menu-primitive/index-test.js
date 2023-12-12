/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  triggerEvent,
  triggerKeyEvent,
  render,
  resetOnerror,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/menu-primitive/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::MenuPrimitive id="test-menu-primitive" />`);
    assert.dom('div#test-menu-primitive').hasClass('hds-menu-primitive');
  });

  // TOGGLE + CONTENT

  test('it should render the "toggle" block but not the "content', async function (assert) {
    await render(hbs`
      <Hds::MenuPrimitive>
        <:toggle>
          <button type="button" id="test-menu-primitive-button" />
        </:toggle>
      </Hds::MenuPrimitive>
    `);
    assert.dom('.hds-menu-primitive__toggle').exists();
    assert.dom('button#test-menu-primitive-button').exists();
    assert.dom('.hds-menu-primitive__content').doesNotExist();
  });
  test('it should render the "content" when the "toggle" is clicked', async function (assert) {
    await render(hbs`
      <Hds::MenuPrimitive>
        <:toggle as |t|>
          <button type="button" id="test-menu-primitive-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-menu-primitive-link" href="#">test</a>
        </:content>
      </Hds::MenuPrimitive>
    `);
    await click('button#test-menu-primitive-button');
    assert.dom('.hds-menu-primitive__content').exists();
    assert.dom('a#test-menu-primitive-link').exists();
  });

  // ESCAPE KEY

  test('it should hide the "content" when the "toggle" is deactivated via "Escape"', async function (assert) {
    await render(hbs`
      <Hds::MenuPrimitive id="test-menu-primitive">
        <:toggle as |t|>
          <button type="button" id="test-menu-primitive-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-menu-primitive-link" href="#">test</a>
        </:content>
      </Hds::MenuPrimitive>
    `);
    await click('button#test-menu-primitive-button');
    assert.dom('.hds-menu-primitive__content').exists();
    assert.dom('a#test-menu-primitive-link').exists();
    await triggerKeyEvent('#test-menu-primitive', 'keyup', 'Escape');
    assert.dom('.hds-menu-primitive__content').doesNotExist();
    assert.dom('a#test-menu-primitive-link').doesNotExist();
  });

  // FOCUS OUT

  test('it should hide the "content" when the focus is moved outside', async function (assert) {
    await render(hbs`
      <Hds::MenuPrimitive id="test-menu-primitive">
        <:toggle as |t|>
          <button type="button" id="test-menu-primitive-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-menu-primitive-link" href="#">test</a>
        </:content>
      </Hds::MenuPrimitive>
    `);
    await click('button#test-menu-primitive-button');
    assert.dom('.hds-menu-primitive__content').exists();
    assert.dom('a#test-menu-primitive-link').exists();
    // simulating the focus moves to the body element
    await triggerEvent('#test-menu-primitive', 'focusout', {
      relatedTarget: document.body,
    });
    assert.dom('.hds-menu-primitive__content').doesNotExist();
    assert.dom('a#test-menu-primitive-link').doesNotExist();
  });

  // CLOSE DISCLOSED CONTENT ON CLICK

  test('it should hide the "content" when an interactive element triggers `close`', async function (assert) {
    await render(hbs`
      <Hds::MenuPrimitive id="test-menu-primitive">
        <:toggle as |t|>
          <button type="button" id="test-toggle-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content as |c|>
          <button id="test-content-button" {{on "click" c.close}}>test</button>
        </:content>
      </Hds::MenuPrimitive>
    `);
    await click('button#test-toggle-button');
    assert.dom('.hds-menu-primitive__content').exists();
    assert.dom('button#test-content-button').exists();
    await click('button#test-content-button');
    assert.dom('.hds-menu-primitive__content').doesNotExist();
    assert.dom('button#test-content-button').doesNotExist();
  });
});
