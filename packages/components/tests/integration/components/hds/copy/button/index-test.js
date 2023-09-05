/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

function wait(timeout = 2000) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

module('Integration | Component | hds/copy/button/index', function (hooks) {
  setupRenderingTest(hooks);

  // IMPORTANT: don't use an arrow function here or "this.set" will not be recognized
  hooks.beforeEach(function () {
    sinon.stub(window.navigator.clipboard, 'writeText').resolves();
    this.success = undefined;
    this.set('onSuccess', () => (this.success = true));
    this.set('onError', () => (this.success = false));
  });

  hooks.afterEach(() => {
    resetOnerror();
    // we need to restore the "window.navigator" methods
    sinon.restore();
    this.success = undefined;
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy your secret key" @textToCopy="someSecretThingGoesHere" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-copy-button');
  });

  // @TEXT ARGUMENT

  test('it should allow to copy a `string` provided as `@text` argument', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy your secret key" @textToCopy="someSecretThingGoesHere" @onSuccess={{this.onSuccess}} @onError={{this.onError}} />`
    );
    await click('button#test-copy-button');
    assert.true(this.success);
  });

  // @TARGET ARGUMENT

  test('it should allow to target an element using a `string` selector for the `@target` argument', async function (assert) {
    await render(
      hbs`<p id="test-copy-button-target">Hello world!</p><Hds::Copy::Button id="test-copy-button" @text="Copy your secret key" @targetToCopy="#test-copy-button-target" @onSuccess={{this.onSuccess}} @onError={{this.onError}} />`
    );
    await click('button#test-copy-button');
    assert.true(this.success);
  });

  // VARIANTS

  test('it should render the correct default component variation: secondary color, medium size, idle status', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy your secret key" @textToCopy="someSecretThingGoesHere" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-copy-button');
    assert.dom('#test-copy-button').hasClass('hds-button--size-medium');
    assert.dom('#test-copy-button').hasClass('hds-button--color-secondary');
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
  });

  test('it should only render an icon and also render an aria-label if isIconOnly is set to true', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button @text="Copy" @isIconOnly={{true}} @textToCopy="someSecretThingGoesHere" id="test-copy-button" />`
    );
    assert.dom('#test-copy-button').doesNotIncludeText('Copy');
    assert.dom('#test-copy-button').hasAria('label', 'Copy');
  });

  test('it should render the small size if @size small is defined', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="copy" @textToCopy="someSecretThingGoesHere" @size="small" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-button--size-small');
  });

  test('it always renders the text value, not the text to copy', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy your secret key"
      @textToCopy="someSecretThingGoesHere" />`
    );
    assert.dom('#test-copy-button').hasText('Copy your secret key');
    assert
      .dom('#test-copy-button')
      .doesNotIncludeText('someSecretThingGoesHere');
  });

  test('it should have the correct CSS class to support full-width size if @isFullWidth prop is true', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="copy" @textToCopy="someSecretThingGoesHere" @isFullWidth={{true}} />`
    );
    assert.dom('#test-copy-button').hasClass('hds-button--width-full');
  });

  // COPY STATES

  test('it should update the status to success if the copy operation was successful', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy your secret key" @textToCopy="someSecretThingGoesHere" @onSuccess={{this.onSuccess}} @onError={{this.onError}} />`
    );
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
    await click('button#test-copy-button');
    assert.true(this.success);
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-success');
  });

  test('it should update the status back to idle after success', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy your secret key"
      @textToCopy="someSecretThingGoesHere" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
    await click('button#test-copy-button');
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-success');
    await wait(); // wait for the status to revert to "idle" automatically
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
  });

  test('it should update the status to an error after a failed "copy" operation', async function (assert) {
    sinon.restore();
    sinon
      .stub(window.navigator.clipboard, 'writeText')
      .throws(
        'Sinon throws (syntethic error)',
        'this is a fake error message provided to the sinon.stub().throws() method'
      );
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy your secret key" @textToCopy="someSecretThingGoesHere" @onSuccess={{this.onSuccess}} @onError={{this.onError}} />`
    );
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
    await click('button#test-copy-button');
    assert.false(this.success);
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-error');
    await wait(); // wait for the status to revert to "idle" automatically
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
  });

  // ASSERTIONS

  test('it should throw an assertion if @text is missing/has no value', async function (assert) {
    const errorMessage = '@text for "Hds::Button" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Copy::Button id="test-copy-button"
    @textToCopy="someSecretThingGoesHere" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it should throw an assertion if an incorrect value for @size is provided', async function (assert) {
    const errorMessage =
      '@size for "Hds::Copy::Button" must be one of the following: small, medium; received: tiny';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy your secret key" @size="tiny"
    @textToCopy="someSecretThingGoesHere" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
