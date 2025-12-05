/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | content/voice-tone', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /content/voice-tone', async function (assert) {
    await visit('/content/voice-tone');

    assert.strictEqual(currentURL(), '/content/voice-tone');
  });

  test('content/voice-tone page passes automated a11y checks', async function (assert) {
    await visit('/content/voice-tone');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
