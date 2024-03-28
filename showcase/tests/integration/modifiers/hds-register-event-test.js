/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | hds-register-event', function (hooks) {
  setupRenderingTest(hooks);

  test('it calls the callback associated with the `click` event assigned via the modifier', async function (assert) {
    let clicked;
    this.set('onClick', () => (clicked = true));
    await render(
      hbs`<button id="test-button" {{hds-register-event 'click' this.onClick}}>Test</button>`
    );
    await click('button#test-button');
    assert.true(clicked);
  });
});
