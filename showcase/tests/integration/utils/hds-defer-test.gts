/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { destroy } from '@ember/destroyable';
import { tracked } from '@glimmer/tracking';
import {
  render,
  resetOnerror,
  settled,
  setupOnerror,
} from '@ember/test-helpers';

import {
  deferAfterRender,
  deferAfterRenderOnce,
  deferToNextTask,
} from '@hashicorp/design-system-components/utils/hds-defer';

import { setupRenderingTest } from 'showcase/tests/helpers';

class State {
  @tracked label = 'before';
}

module('Integration | Utility | hds-defer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(function () {
    resetOnerror();
  });

  module('deferAfterRender', function () {
    test('it runs the callback after pending changes have been rendered', async function (assert) {
      const state = new State();

      await render(
        <template>
          <span id="label">{{state.label}}</span>
        </template>,
      );

      let observedLabel: string | null | undefined;

      state.label = 'after';
      deferAfterRender(() => {
        observedLabel = document.querySelector('#label')?.textContent;
      });

      await settled();

      assert.strictEqual(observedLabel, 'after');
    });

    test('it does not run the callback synchronously', async function (assert) {
      let calls = 0;

      deferAfterRender(() => calls++);

      assert.strictEqual(calls, 0);

      await settled();

      assert.strictEqual(calls, 1);
    });

    test('it skips the callback if the destroyable is torn down before it runs', async function (assert) {
      const destroyable = {};
      let calls = 0;

      deferAfterRender(() => calls++, destroyable);
      destroy(destroyable);

      await settled();

      assert.strictEqual(calls, 0);
    });

    // relies on `renderSettled` returning an RSVP promise, revisit if RSVP is deprecated (emberjs/rfcs#1220)
    test('it reports errors thrown by the callback to `Ember.onerror`', async function (assert) {
      const errors: unknown[] = [];

      setupOnerror((error: unknown) => {
        errors.push(error);
      });

      deferAfterRender(() => {
        throw new Error('boom');
      });

      await settled();

      assert.strictEqual(errors.length, 1);
      assert.strictEqual((errors[0] as Error).message, 'boom');
    });
  });

  module('deferAfterRenderOnce', function () {
    test('it ignores repeated calls with the same callback and destroyable', async function (assert) {
      const destroyable = {};
      let calls = 0;
      const callback = () => calls++;

      deferAfterRenderOnce(callback, destroyable);
      deferAfterRenderOnce(callback, destroyable);
      deferAfterRenderOnce(callback, destroyable);

      await settled();

      assert.strictEqual(calls, 1);
    });

    test('it schedules the callback again once the previous run has completed', async function (assert) {
      const destroyable = {};
      let calls = 0;
      const callback = () => calls++;

      deferAfterRenderOnce(callback, destroyable);
      await settled();
      deferAfterRenderOnce(callback, destroyable);
      await settled();

      assert.strictEqual(calls, 2);
    });

    test('it runs the same callback once per destroyable', async function (assert) {
      let calls = 0;
      const callback = () => calls++;

      deferAfterRenderOnce(callback, {});
      deferAfterRenderOnce(callback, {});

      await settled();

      assert.strictEqual(calls, 2);
    });

    test('it skips the callback if the destroyable is torn down before it runs', async function (assert) {
      const destroyable = {};
      let calls = 0;

      deferAfterRenderOnce(() => calls++, destroyable);
      destroy(destroyable);

      await settled();

      assert.strictEqual(calls, 0);
    });
  });

  module('deferToNextTask', function () {
    test('it runs the callback after `deferAfterRender` callbacks', async function (assert) {
      const calls: string[] = [];

      deferToNextTask(() => calls.push('next-task'));
      deferAfterRender(() => calls.push('after-render'));

      assert.deepEqual(calls, []);

      await settled();

      assert.deepEqual(calls, ['after-render', 'next-task']);
    });

    test('it skips the callback if the destroyable is torn down before it runs', async function (assert) {
      const destroyable = {};
      let calls = 0;

      deferToNextTask(() => calls++, destroyable);
      destroy(destroyable);

      await settled();

      assert.strictEqual(calls, 0);
    });
  });
});
