/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | error', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /error', async function (assert) {
    await visit('/error');

    assert.strictEqual(currentURL(), '/error');
  });

  test('visiting a known bad route', async function (assert) {
    await visit('/wubalubadubdub');

    assert.strictEqual(currentURL(), '/error');
  });

  test('error page passes automated a11y checks', async function (assert) {
    await visit('/error');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
