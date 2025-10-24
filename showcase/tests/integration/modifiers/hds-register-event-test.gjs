/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { click, render, triggerEvent } from '@ember/test-helpers';
import hdsRegisterEvent from "@hashicorp/design-system-components/modifiers/hds-register-event";

module('Integration | Modifier | hds-register-event', function (hooks) {
  setupRenderingTest(hooks);

  test('it adds an event listener to the element', async function (assert) {
    assert.expect(1);

    this.set('eventHandler', () => {
      assert.ok(true, 'event handler was called');
    });

    await render(
      <template><button id="test-button" {{hdsRegisterEvent "click" this.eventHandler}}>Test</button></template>,
    );

    await click('button');
  });

  test('it passes the `useCapture` option to the event listener', async function (assert) {
    assert.expect(1);

    this.set('eventHandler', (event) => {
      assert.strictEqual(
        event.eventPhase,
        Event.CAPTURING_PHASE,
        'event was captured',
      );
    });

    await render(
      <template><button id="test-button" {{hdsRegisterEvent "click" this.eventHandler useCapture=true}}><span>Test</span></button></template>,
    );

    await triggerEvent('span', 'click', { bubbles: true });
  });
});
