/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/stepper/indicator', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/stepper/indicator', async function (assert) {
    await visit('/components/stepper/indicator');

    assert.strictEqual(currentURL(), '/components/stepper/indicator');
  });

  test('components/stepper/indicator passes a11y automated checks', async function (assert) {
    await visit('/components/stepper/indicator');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
