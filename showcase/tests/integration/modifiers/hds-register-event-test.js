/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, triggerEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | hds-register-event', function (hooks) {
  setupRenderingTest(hooks);

  test('it adds an event listener to the element', async function (assert) {
    assert.expect(1);

    this.set('eventHandler', () => {
      assert.ok(true, 'event handler was called');
    });

    await render(
      hbs`<button id="test-button" {{hds-register-event 'click' this.eventHandler}}>Test</button>`
    );

    await click('button');
  });

  test('it passes the `useCapture` option to the event listener', async function (assert) {
    assert.expect(1);

    this.set('eventHandler', (event) => {
      assert.strictEqual(
        event.eventPhase,
        Event.CAPTURING_PHASE,
        'event was captured'
      );
    });

    await render(
      hbs`<button id="test-button" {{hds-register-event 'click' this.eventHandler useCapture=true}}><span>Test</span></button>`
    );

    await triggerEvent('span', 'click', { bubbles: true });
  });
});
