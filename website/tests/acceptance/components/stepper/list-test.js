/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/stepper/list', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/stepper/list', async function (assert) {
    await visit('/components/stepper/list');

    assert.strictEqual(currentURL(), '/components/stepper/list');
  });

  test('components/stepper/list passes a11y automated checks', async function (assert) {
    await visit('/components/stepper/list');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
