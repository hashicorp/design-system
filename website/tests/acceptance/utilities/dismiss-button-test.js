/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | utilities/dismiss button', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /utilities/dismiss-button', async function (assert) {
    await visit('/utilities/dismiss-button');

    assert.strictEqual(currentURL(), '/utilities/dismiss-button');
  });

  test('utilities/dismiss-button passes a11y automated checks', async function (assert) {
    await visit('/utilities/dismiss-button');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
