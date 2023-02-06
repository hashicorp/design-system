/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test, skip } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/tabs', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/tabs', async function (assert) {
    await visit('/components/tabs');

    assert.strictEqual(currentURL(), '/components/tabs');
  });

  skip('components/tabs passes a11y automated checks', async function (assert) {
    await visit('/components/tabs');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
