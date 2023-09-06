/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, find, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Modifier | hds-clipboard', function (hooks) {
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

  // @TEXT ARGUMENT

  test('it should allow to copy a `string` provided as `@text` argument', async function (assert) {
    await render(
      hbs`<button id="test-button" {{hds-clipboard
        text="Hello world!"
        onSuccess=this.onSuccess
        onError=this.onError
      }}>Test</button>`
    );
    await click('button#test-button');
    assert.true(this.success);
  });

  // context: https://github.com/hashicorp/design-system/pull/1564
  test('it should allow to copy an `integer` provided as `@text` argument', async function (assert) {
    await render(
      hbs`<button id="test-button" {{hds-clipboard
        text=1234
        onSuccess=this.onSuccess
        onError=this.onError
      }}>Test</button>`
    );
    await click('button#test-button');
    assert.true(this.success);
  });

  // @TARGET ARGUMENT

  test('it should allow to target an element using a `string` selector for the `@target` argument', async function (assert) {
    await render(
      hbs`<p id="test-target">Hello world!</p><button id="test-button" {{hds-clipboard
        target="#test-target"
        onSuccess=this.onSuccess
        onError=this.onError
      }}>Test</button>`
    );
    await click('button#test-button');
    assert.true(this.success);
  });

  test('it should allow to target an element using a DOM node', async function (assert) {
    await render(hbs`<p id="test-target">Hello world!</p><button id="test-button" {{hds-clipboard
        target=this.target
        onSuccess=this.onSuccess
        onError=this.onError
      }}>Test</button>`);
    this.set('target', find('#test-target'));
    await click('button#test-button');
    assert.true(this.success);
  });

  // ONSUCCESS/ONERROR CALLBACKS

  test('it should invoke the `onSuccess` callback on a successful "copy" action', async function (assert) {
    await render(
      hbs`<button id="test-button" {{hds-clipboard
        text="Hello world!"
        onSuccess=this.onSuccess
        onError=this.onError
      }}>Test</button>`
    );
    await click('button#test-button');
    assert.true(this.success);
  });

  test('it should invoke the `onError` callback on a failed "copy" action', async function (assert) {
    sinon.restore();
    sinon
      .stub(window.navigator.clipboard, 'writeText')
      .throws(
        'Sinon throws (syntethic error)',
        'this is a fake error message provided to the sinon.stub().throws() method'
      );
    await render(
      hbs`<button id="test-button" {{hds-clipboard
        text="Hello world!"
        onSuccess=this.onSuccess
        onError=this.onError
      }}>Test</button>`
    );
    await click('button#test-button');
    assert.false(this.success);
  });
});
