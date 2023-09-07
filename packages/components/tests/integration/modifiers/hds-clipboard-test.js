/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  render,
  find,
  findAll,
  fillIn,
  resetOnerror,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

import {
  getTextToCopy,
  getTargetElement,
  getTextToCopyFromTargetElement,
  writeTextToClipboard,
  copyToClipboard,
} from '@hashicorp/design-system-components/modifiers/hds-clipboard';

//
// ================================================================
//
// NOTICE:
// we're collecting both _unit_ and _integration_ tests
// in a single file for simplicity / ease of maintainance
//
// ================================================================
//

module('Unit | Modifier | hds-clipboard - getTextToCopy()', function () {
  test('returns the string that is passed as argument', async function (assert) {
    assert.deepEqual(getTextToCopy('test'), 'test');
  });
  test('returns the number that is passed as argument as a string', async function (assert) {
    assert.deepEqual(getTextToCopy(1234), '1234');
  });
  test('it should throw an assertion if the argument provided is not a string/number', async function (assert) {
    const arg = {};
    assert.throws(function () {
      getTextToCopy(arg);
    });
  });
});

module(
  'Unit | Modifier | hds-clipboard - getTargetElement()',
  function (hooks) {
    setupRenderingTest(hooks);
    test('returns the DOM element identified by a CSS selector string passed as argument', async function (assert) {
      await render(hbs`<pre id="test-target">Test</pre>`);
      this.target = find('#test-target');
      assert.deepEqual(await this.target, await find('#test-target'));
    });
    test('returns the same DOM element passed as argument', async function (assert) {
      await render(hbs`<pre id="test-target">Test</pre>`);
      this.node = await find('#test-target');
      this.target = find('#test-target');
      assert.deepEqual(await this.target, this.node);
    });
    test('it should throw an assertion if the argument provided is a list of DOM nodes', async function (assert) {
      await render(
        hbs`<pre class="test-target">Test 1</pre><pre class="test-target">Test 2</pre>`
      );
      const arg = await findAll('.test-target');
      assert.throws(function () {
        getTargetElement(arg);
      });
    });
    test('it should throw an assertion if the argument provided is not a string/node', async function (assert) {
      await render(
        hbs`<pre class="test-target">Test 1</pre><pre class="test-target">Test 2</pre>`
      );
      const arg = {};
      assert.throws(function () {
        getTargetElement(arg);
      });
    });
  }
);

module(
  'Unit | Modifier | hds-clipboard - getTextToCopyFromTargetElement()',
  function (hooks) {
    setupRenderingTest(hooks);

    const cases = [
      ['text', 'test'],
      ['number', 1234],
      ['date', '2022-12-08'], // you can't pass a Date() object to the <input type="date">, it will not work
      ['time', '23:59'], // same for the date
      ['range', 6],
      ['color', '#e66465'],
    ];

    test.each(
      'returns the value of an <input> element (with "type") passed as `target` argument',
      cases,
      async function (assert, [type, value]) {
        this.set('type', type);
        this.set('value', value);
        await render(
          hbs`<input id="test-target" type={{this.type}} value={{this.value}} />`
        );
        this.target = find('#test-target');
        assert.equal(
          this.value,
          getTextToCopyFromTargetElement(this.target),
          `input type="${type}"`
        );
      }
    );

    test('returns the value of a <textarea> passed as `target` argument', async function (assert) {
      this.set('value', `hello\nworld<br>!`);
      await render(hbs`<textarea id="test-target">{{this.value}}</textarea>`);
      this.target = find('#test-target');
      assert.deepEqual(this.value, getTextToCopyFromTargetElement(this.target));
    });

    test('returns the value of a <select> element passed as `target` argument', async function (assert) {
      this.set('option1', `option1`);
      this.set('option2', `option2`);
      this.set('option3', `option3`);
      await render(hbs`<select id="test-target">
        <option>{{this.option1}}</option>
        <option>{{this.option2}}</option>
        <option>{{this.option3}}</option>
      </select>`);
      this.target = find('#test-target');
      assert.deepEqual(
        this.option1,
        getTextToCopyFromTargetElement(this.target)
      );
    });

    test('returns the value of the selected option of a <select> element passed as `target` argument', async function (assert) {
      this.set('option1', `option1`);
      this.set('option2', `option2`);
      this.set('option3', `option3`);
      await render(hbs`<select id="test-target">
        <option>{{this.option1}}</option>
        <option selected>{{this.option2}}</option>
        <option>{{this.option3}}</option>
      </select>`);
      this.target = find('#test-target');
      assert.deepEqual(
        this.option2,
        getTextToCopyFromTargetElement(this.target)
      );
      await fillIn(this.target, this.option3);
      assert.deepEqual(
        this.option3,
        getTextToCopyFromTargetElement(this.target)
      );
    });

    test('returns the innerText of DOM element passed as `target` argument', async function (assert) {
      await render(hbs`<ul id="test-target">
        <li><p>Lorem <span><strong>Ipsum</strong> <em>dolor</em></span></p></li>
        <li><p><code>Sit</code> <a href="#">Amet</a></p><pre>Some<br/>Code</pre></li>
      </ul>`);
      this.target = find('#test-target');
      assert.deepEqual(
        getTextToCopyFromTargetElement(this.target),
        `Lorem Ipsum dolor\n\nSit Amet\n\nSome\nCode`
      );
    });

    test('returns the innerText of DOM element passed as `target` argument without including hidden elements', async function (assert) {
      await render(hbs`<p id="test-target">Lorem
      <span style="display: none">Ipsum</span>
      <span style="visibility: hidden">Dolor</span>
    </p>`);
      this.target = find('#test-target');
      assert.deepEqual(getTextToCopyFromTargetElement(this.target), 'Lorem ');
    });
  }
);

module(
  'Unit | Modifier | hds-clipboard - writeTextToClipboard()',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      // we need to restore the "window.navigator" methods
      sinon.restore();
    });

    test('returns `true` as response if the `navigator.writeText` operation succeeds', async function (assert) {
      // we need to mock this call, otherwise it will fail in a testing environment (with error: DOMException: Document is not focused)
      // this is because the "Document is not"
      // see: https://github.com/cypress-io/cypress/issues/18198
      // see: https://stackoverflow.com/questions/69425289/javascript-prompt-cause-document-is-not-focused
      sinon.stub(window.navigator.clipboard, 'writeText').resolves();
      const success = await writeTextToClipboard('test');
      assert.true(success);
    });
    test('returns `false` as response if the `navigator.writeText` operation fails', async function (assert) {
      // we need to mock the "catch" in the `try/catch`
      sinon
        .stub(window.navigator.clipboard, 'writeText')
        .throws(
          'Sinon throws (syntethic error)',
          'this is a fake error message provided to the sinon.stub().throws() method'
        );
      const success = await writeTextToClipboard('test');
      assert.false(success);
    });
    test('returns `false` as response if no `textToCopy` argument is provided', async function (assert) {
      assert.false(await writeTextToClipboard());
    });
  }
);

module(
  'Unit | Modifier | hds-clipboard - copyToClipboard()', // for this one we test only the assertion (the functionality is tested in the integration tests below)
  function (hooks) {
    setupRenderingTest(hooks);
    // not sure why it's not working...
    skip('it should throw an assertion if no `text` or `target` argument is provided', async function (assert) {
      assert.throws(async function () {
        await copyToClipboard();
      });
    });
  }
);

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
