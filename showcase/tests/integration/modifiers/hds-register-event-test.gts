/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { click, render, triggerEvent } from '@ember/test-helpers';
import hdsRegisterEvent from '@hashicorp/design-system-components/modifiers/hds-register-event';

module('Integration | Modifier | hds-register-event', function (hooks) {
  setupRenderingTest(hooks);

  test('it adds an event listener to the element', async function (assert) {
    assert.expect(1);

    const eventHandler = () => {
      assert.ok(true, 'event handler was called');
    };

    // note: this workaround is needed because something is weird about how we're defining the type for the modifier
    const eventName = 'click' as keyof ElementEventMap;

    await render(
      <template>
        <button
          type="button"
          id="test-button"
          {{hdsRegisterEvent eventName eventHandler}}
        >Test</button>
      </template>,
    );

    await click('button');
  });

  test('it passes the `useCapture` option to the event listener', async function (assert) {
    assert.expect(1);

    const eventHandler = (event: Event) => {
      assert.strictEqual(
        event.eventPhase,
        Event.CAPTURING_PHASE,
        'event was captured',
      );
    };

    // note: this workaround is needed because something is weird about how we're defining the type for the modifier
    const eventName = 'click' as keyof ElementEventMap;

    await render(
      <template>
        <button
          type="button"
          id="test-button"
          {{hdsRegisterEvent eventName eventHandler useCapture=true}}
        ><span>Test</span></button>
      </template>,
    );

    await triggerEvent('span', 'click', { bubbles: true });
  });
});
