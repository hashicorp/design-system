/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  click,
  render,
  find,
  findAll,
  fillIn,
  resetOnerror,
} from '@ember/test-helpers';
import { modifier } from 'ember-modifier';
import { TrackedObject } from 'tracked-built-ins';
import sinon from 'sinon';
import style from 'ember-style-modifier';

import hdsClipboard, {
  getTextToCopy,
  getTargetElement,
  getTextToCopyFromTargetElement,
  writeTextToClipboard,
} from '@hashicorp/design-system-components/modifiers/hds-clipboard';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Unit | Modifier | hds-clipboard - getTextToCopy()', function () {
  test('returns the string that is passed as argument', function (assert) {
    assert.deepEqual(getTextToCopy('test'), 'test');
  });

  test('returns the number that is passed as argument as a string', function (assert) {
    assert.deepEqual(getTextToCopy(1234), '1234');
  });

  test('it should throw an assertion if the argument provided is not a string/number', function (assert) {
    const arg = {};
    assert.throws(function () {
      // @ts-expect-error - testing invalid usage
      getTextToCopy(arg);
    });
  });
});

module(
  'Unit | Modifier | hds-clipboard - getTargetElement()',
  function (hooks) {
    setupRenderingTest(hooks);
    test('returns the DOM element identified by a CSS selector string passed as argument', async function (assert) {
      await render(
        <template>
          <pre id="test-target">Test</pre>
        </template>,
      );
      const target = getTargetElement('#test-target');
      assert.deepEqual(target, find('#test-target'));
    });
    test('returns the same DOM element passed as argument', async function (assert) {
      await render(
        <template>
          <pre id="test-target">Test</pre>
        </template>,
      );

      const node = find('#test-target');

      if (node) {
        const target = getTargetElement(node);
        assert.deepEqual(target, node);
      }
    });
    test('it should throw an assertion if the argument provided is a list of DOM nodes', async function (assert) {
      await render(
        <template>
          <pre class="test-target">Test 1</pre><pre
            class="test-target"
          >Test 2</pre>
        </template>,
      );
      const arg = findAll('.test-target');
      assert.throws(function () {
        // @ts-expect-error - testing invalid usage
        getTargetElement(arg);
      });
    });
    test('it should throw an assertion if the argument provided is not a string/node', async function (assert) {
      await render(
        <template>
          <pre class="test-target">Test 1</pre><pre
            class="test-target"
          >Test 2</pre>
        </template>,
      );
      const arg = {};
      assert.throws(function () {
        // @ts-expect-error - testing invalid usage
        getTargetElement(arg);
      });
    });
  },
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
        await render(
          <template>
            <input id="test-target" type={{type}} value={{value}} />
          </template>,
        );

        const target = find('#test-target') as HTMLElement;

        assert.equal(
          value,
          getTextToCopyFromTargetElement(target),
          `input type="${type}"`,
        );
      },
    );

    test('returns the value of a <textarea> passed as `target` argument', async function (assert) {
      const value = `hello\nworld<br>!`;
      await render(
        <template>
          <textarea id="test-target">{{value}}</textarea>
        </template>,
      );

      const target = find('#test-target') as HTMLElement;
      assert.deepEqual(value, getTextToCopyFromTargetElement(target));
    });

    test('returns the value of a <select> element passed as `target` argument', async function (assert) {
      await render(
        <template>
          <select id="test-target">
            <option>option1</option>
            <option>option2</option>
            <option>option3</option>
          </select>
        </template>,
      );
      const target = find('#test-target') as HTMLElement;
      assert.deepEqual('option1', getTextToCopyFromTargetElement(target));
    });

    test('returns the value of the selected option of a <select> element passed as `target` argument', async function (assert) {
      await render(
        <template>
          <select id="test-target">
            <option>option1</option>
            <option selected>option2</option>
            <option>option3</option>
          </select>
        </template>,
      );
      const target = find('#test-target') as HTMLElement;
      assert.deepEqual('option2', getTextToCopyFromTargetElement(target));
      await fillIn(target, 'option3');
      assert.deepEqual('option3', getTextToCopyFromTargetElement(target));
    });

    test('returns the innerText of DOM element passed as `target` argument', async function (assert) {
      await render(
        <template>
          <ul id="test-target">
            <li><p>Lorem
                <span><strong>Ipsum</strong> <em>dolor</em></span></p></li>
            <li><p><code>Sit</code> <a href="#">Amet</a></p><pre>Some<br
                />Code</pre></li>
          </ul>
        </template>,
      );

      const target = find('#test-target') as HTMLElement;
      assert.deepEqual(
        getTextToCopyFromTargetElement(target),
        `Lorem Ipsum dolor\n\nSit Amet\n\nSome\nCode`,
      );
    });

    test('returns the innerText of DOM element passed as `target` argument without including hidden elements', async function (assert) {
      await render(
        <template>
          <p id="test-target">Lorem
            <span {{style display="none"}}>Ipsum</span>
            <span {{style visibility="hidden"}}>Dolor</span>
          </p>
        </template>,
      );
      const target = find('#test-target') as HTMLElement;
      assert.deepEqual(getTextToCopyFromTargetElement(target), 'Lorem ');
    });

    test('returns the innerText of DOM element passed as `target` argument without including sr only text', async function (assert) {
      await render(
        <template>
          <p id="test-target">
            <span>Lorem ipsum</span>
            <span class="sr-only">Text not to copy</span>
          </p>
        </template>,
      );
      const target = find('#test-target') as HTMLElement;
      assert.deepEqual(getTextToCopyFromTargetElement(target), 'Lorem ipsum');
    });
  },
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
        .throws('Sinon throws (syntethic error)');
      const success = await writeTextToClipboard('test');
      assert.false(success);
    });
  },
);

// commented out this test because it does not work and it has linting errors
// module(
//   'Unit | Modifier | hds-clipboard - copyToClipboard()', // for this one we test only the assertion (the functionality is tested in the integration tests below)
//   function (hooks) {
//     setupRenderingTest(hooks);
//     skip('it should throw an assertion if no `text` or `target` argument is provided', async function (assert) {
//       assert.throws(async function () {
//         await copyToClipboard();
//       });
//     });
//   },
// );

module('Integration | Modifier | hds-clipboard', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(() => {
    sinon.stub(window.navigator.clipboard, 'writeText').resolves();
  });

  hooks.afterEach(() => {
    resetOnerror();
    // we need to restore the "window.navigator" methods
    sinon.restore();
  });

  // @TEXT ARGUMENT

  test('it should allow to copy a `string` provided as `@text` argument', async function (assert) {
    const context = new TrackedObject<{
      success?: boolean;
    }>({
      success: undefined,
    });

    const onSuccess = () => {
      context.success = true;
    };

    const onError = () => {
      context.success = false;
    };

    await render(
      <template>
        <button
          type="button"
          id="test-button"
          {{hdsClipboard
            text="Hello world!"
            onSuccess=onSuccess
            onError=onError
          }}
        >Test</button>
      </template>,
    );
    await click('button#test-button');
    assert.true(context.success);
  });

  test('it should copy an empty string provided as a `@text` argument', async function (assert) {
    const context = new TrackedObject<{
      success?: boolean;
    }>({
      success: undefined,
    });

    const onSuccess = () => {
      context.success = true;
    };

    const onError = () => {
      context.success = false;
    };

    await render(
      <template>
        <button
          type="button"
          id="test-button"
          {{hdsClipboard text="" onSuccess=onSuccess onError=onError}}
        >Test</button>
      </template>,
    );
    await click('button#test-button');
    assert.true(context.success);
  });

  // context: https://github.com/hashicorp/design-system/pull/1564
  test('it should allow to copy an `integer` provided as `@text` argument', async function (assert) {
    const context = new TrackedObject<{
      success?: boolean;
    }>({
      success: undefined,
    });

    const onSuccess = () => {
      context.success = true;
    };

    const onError = () => {
      context.success = false;
    };

    await render(
      <template>
        <button
          type="button"
          id="test-button"
          {{hdsClipboard text=1234 onSuccess=onSuccess onError=onError}}
        >Test</button>
      </template>,
    );
    await click('button#test-button');
    assert.true(context.success);
  });

  test('it should copy a zero number value provided as a `@text` argument', async function (assert) {
    const context = new TrackedObject<{
      success?: boolean;
    }>({
      success: undefined,
    });

    const onSuccess = () => {
      context.success = true;
    };

    const onError = () => {
      context.success = false;
    };

    await render(
      <template>
        <button
          type="button"
          id="test-button"
          {{hdsClipboard text=0 onSuccess=onSuccess onError=onError}}
        >Test</button>
      </template>,
    );
    await click('button#test-button');
    assert.true(context.success);
  });

  // @TARGET ARGUMENT

  test('it should allow to target an element using a `string` selector for the `@target` argument', async function (assert) {
    const context = new TrackedObject<{
      success?: boolean;
    }>({
      success: undefined,
    });

    const onSuccess = () => {
      context.success = true;
    };

    const onError = () => {
      context.success = false;
    };

    await render(
      <template>
        <p id="test-target">Hello world!</p>
        <button
          type="button"
          id="test-button"
          {{hdsClipboard
            target="#test-target"
            onSuccess=onSuccess
            onError=onError
          }}
        >Test</button>
      </template>,
    );
    await click('button#test-button');
    assert.true(context.success);
  });

  test('it should allow to target an element using a DOM node', async function (assert) {
    const context = new TrackedObject<{
      success?: boolean;
      target?: HTMLElement;
    }>({
      success: undefined,
      target: undefined,
    });

    const onSuccess = () => {
      context.success = true;
    };

    const onError = () => {
      context.success = false;
    };

    // need to use a modifier to set the target DOM node to make sure that it is defined
    const registerTarget = modifier((element) => {
      context.target = element as HTMLElement;
    });

    await render(
      <template>
        <p {{registerTarget}}>Hello world!</p>
        <button
          type="button"
          id="test-button"
          {{hdsClipboard
            target=context.target
            onSuccess=onSuccess
            onError=onError
          }}
        >Test</button>
      </template>,
    );

    await click('button#test-button');
    assert.true(context.success);
  });

  // ONSUCCESS/ONERROR CALLBACKS

  test('it should invoke the `onSuccess` callback on a successful "copy" action', async function (assert) {
    const context = new TrackedObject<{
      success?: boolean;
    }>({
      success: undefined,
    });

    const onSuccess = () => {
      context.success = true;
    };

    const onError = () => {
      context.success = false;
    };

    await render(
      <template>
        <button
          type="button"
          id="test-button"
          {{hdsClipboard
            text="Hello world!"
            onSuccess=onSuccess
            onError=onError
          }}
        >Test</button>
      </template>,
    );
    await click('button#test-button');
    assert.true(context.success);
  });

  test('it should invoke the `onError` callback on a failed "copy" action', async function (assert) {
    const context = new TrackedObject<{
      success?: boolean;
    }>({
      success: undefined,
    });

    const onSuccess = () => {
      context.success = true;
    };

    const onError = () => {
      context.success = false;
    };

    sinon.restore();
    sinon
      .stub(window.navigator.clipboard, 'writeText')
      .throws('Sinon throws (syntethic error)');

    await render(
      <template>
        <button
          type="button"
          id="test-button"
          {{hdsClipboard
            text="Hello world!"
            onSuccess=onSuccess
            onError=onError
          }}
        >Test</button>
      </template>,
    );
    await click('button#test-button');
    assert.false(context.success);
  });
});
