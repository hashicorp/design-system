/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | utilities/interactive', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /utilities/interactive', async function (assert) {
    await visit('/utilities/interactive');

    assert.strictEqual(currentURL(), '/utilities/interactive');
  });

  test('utilities/interactive passes a11y automated checks', async function (assert) {
    await visit('/utilities/interactive');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
