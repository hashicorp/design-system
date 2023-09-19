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

module('Integration | Component | hds/copy/snippet/index', function (hooks) {
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
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="someSecretThingGoesHere" />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet');
  });

  // VARIANTS

  test('it should render the correct default component variation: primary color, idle status', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="someSecretThingGoesHere" />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet');
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--color-primary');
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
  });

  test('it should render the secondary color if defined', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="someSecretThingGoesHere" @color="secondary" />`
    );
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--color-secondary');
  });

  test('it should support truncation if @isTruncated is set to true', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="someSecretThingGoesHere" @isTruncated={{true}} />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--is-truncated');
  });

  test('it should have the correct CSS class to support full-width size if @isFullWidth prop is true', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="someSecretThingGoesHere" @isFullWidth={{true}} />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--width-full');
  });

  // COPY STATES

  test('it should update the status to success if the copy operation was successful', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="someSecretThingGoesHere" @onSuccess={{this.onSuccess}} @onError={{this.onError}} />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
    await click('button#test-copy-snippet');
    assert.true(this.success);
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--status-success');
  });

  test('it should update the status back to idle after success', async function (assert) {
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="someSecretThingGoesHere" />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
    await click('button#test-copy-snippet');
    assert
      .dom('#test-copy-snippet')
      .hasClass('hds-copy-snippet--status-success');
    await wait(); // wait for the status to revert to "idle" automatically
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
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
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="someSecretThingGoesHere" @onSuccess={{this.onSuccess}} @onError={{this.onError}} />`
    );
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
    await click('button#test-copy-snippet');
    assert.false(this.success);
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-error');
    await wait(); // wait for the status to revert to "idle" automatically
    assert.dom('#test-copy-snippet').hasClass('hds-copy-snippet--status-idle');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @color is provided', async function (assert) {
    const errorMessage =
      '@color for "Hds::Copy::Snippet" must be one of the following: primary, secondary; received: tertiary';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      hbs`<Hds::Copy::Snippet id="test-copy-snippet" @textToCopy="someSecretThingGoesHere" @color="tertiary" />`
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
