/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/link/standalone', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/link/standalone', async function (assert) {
    await visit('/components/link/standalone');

    assert.strictEqual(currentURL(), '/components/link/standalone');
  });

  test('components/link/standalone passes a11y automated checks', async function (assert) {
    await visit('/components/link/standalone');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
