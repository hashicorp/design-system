/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  render,
  resetOnerror,
  setupOnerror,
  waitFor,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/copy/button/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="copy" @targetToCopy="#targetToCopy" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-copy-button');
  });

  test('it should render the correct default component variation: secondary color, medium size, idle status', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="copy" @targetToCopy="#targetToCopy" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-copy-button');
    assert.dom('#test-copy-button').hasClass('hds-button--size-medium');
    assert.dom('#test-copy-button').hasClass('hds-button--color-secondary');
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
  });

  test('it should only render an icon and also render an aria-label if isIconOnly is set to true', async function (assert) {
    await render(
      hbs`<p id="clipboardTarget2">
      The button will copy the text in this paragraph element.
    </p>
    <Hds::Copy::Button @text="Copy" @isIconOnly={{true}}
    @targetToCopy="#clipboardTarget2" id="test-copy-button" />`
    );
    assert.dom('#test-copy-button').doesNotIncludeText('Copy');
    assert.dom('#test-copy-button').hasAria('label', 'Copy');
  });

  test('it should render the small size if @size small is defined', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="copy" @targetToCopy="#targetToCopy" @size="small" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-button--size-small');
  });

  test('it always renders the text value', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy your secret key"
      @textToCopy="someSecretThingGoesHere" />`
    );
    assert.dom('#test-copy-button').hasText('Copy your secret key');
  });

  test('it should have the correct CSS class to support full-width size if @isFullWidth prop is true', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="copy" @targetToCopy="#targetToCopy" @isFullWidth={{true}} />`
    );
    assert.dom('#test-copy-button').hasClass('hds-button--width-full');
  });

  test('it should update the status to success if the copy operation was successful using targetToCopy', async function (assert) {
    await render(
      hbs`<p id="clipboardTarget2">
      The button will copy the text in this paragraph element.
    </p>
    <Hds::Copy::Button @text="Copy" @isIconOnly={{true}}
    @targetToCopy="#clipboardTarget2" id="test-copy-button" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
    await click('button#test-copy-button');
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-success');
  });

  test('it should update the status to success if the copy operation was successful using textToCopy', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy your secret key"
      @textToCopy="someSecretThingGoesHere" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
    await click('button#test-copy-button');
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-success');
  });

  test('it should update the status back to idle after success while using targetToCopy', async function (assert) {
    await render(
      hbs`<p id="clipboardTarget2">
      The button will copy the text in this paragraph element.
    </p>
    <Hds::Copy::Button @text="Copy" @isIconOnly={{true}}
    @targetToCopy="#clipboardTarget2" id="test-copy-button" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
    await click('button#test-copy-button');
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-success');
    await waitFor('.hds-copy-button--status-idle', { timeout: 2000 });
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
  });

  test('it should update the status back to idle after success while using textToCopy', async function (assert) {
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy your secret key"
      @textToCopy="someSecretThingGoesHere" />`
    );
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
    await click('button#test-copy-button');
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-success');
    await waitFor('.hds-copy-button--status-idle', { timeout: 2000 });
    assert.dom('#test-copy-button').hasClass('hds-copy-button--status-idle');
  });

  test('it should be able to copy a number', async function (assert) {
    // context: https://github.com/hashicorp/design-system/pull/1564
    await render(
      hbs`<Hds::Copy::Button id="test-copy-button" @text="Copy a number" textToCopy={{123456789}} />`
    );
    // if the `ember-cli-clipboard` addon fails it triggers a JS error
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
