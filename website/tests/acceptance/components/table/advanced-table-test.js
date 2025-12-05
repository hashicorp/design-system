/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/table/advanced-table', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/table/advanced-table', async function (assert) {
    await visit('/components/table/advanced-table');

    assert.strictEqual(currentURL(), '/components/table/advanced-table');
  });

  test('components/table/advanced-table passes a11y automated checks', async function (assert) {
    await visit('/components/table/advanced-table');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
