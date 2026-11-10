/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

// loose-mode templates resolve helpers by name, the same way markdown docs and classic templates do
module('Integration | Helper | string helpers', function (hooks) {
  setupRenderingTest(hooks);

  test('capitalize resolves by name and capitalizes the first letter', async function (assert) {
    await render(
      hbs`<span id="test-capitalize">{{capitalize "neutral palette"}}</span>`,
    );

    assert.dom('#test-capitalize').hasText('Neutral palette');
  });

  test('humanize resolves by name and humanizes the value', async function (assert) {
    await render(
      hbs`<span id="test-humanize">{{humanize "getting-started"}}</span>`,
    );

    assert.dom('#test-humanize').hasText('Getting started');
  });
});
