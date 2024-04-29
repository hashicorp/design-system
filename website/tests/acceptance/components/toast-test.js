/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/toast', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/toast', async function (assert) {
    await visit('/components/toast');

    assert.strictEqual(currentURL(), '/components/toast');
  });

  test('components/toast passes a11y automated checks', async function (assert) {
    await visit('/components/toast');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
