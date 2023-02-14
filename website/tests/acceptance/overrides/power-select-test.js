/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | overrides/power select', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /overrides/power-select', async function (assert) {
    await visit('/overrides/power-select');

    assert.strictEqual(currentURL(), '/overrides/power-select');
  });

  test('overrides/power-select passes a11y automated checks', async function (assert) {
    await visit('/overrides/power-select');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
