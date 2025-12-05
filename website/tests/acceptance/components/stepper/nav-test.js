/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/stepper/nav', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/stepper/nav', async function (assert) {
    await visit('/components/stepper/nav');

    assert.strictEqual(currentURL(), '/components/stepper/nav');
  });

  test('components/stepper/nav passes a11y automated checks', async function (assert) {
    await visit('/components/stepper/nav');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
