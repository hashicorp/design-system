/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/form/textarea', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/form/textarea', async function (assert) {
    await visit('/components/form/textarea');

    assert.strictEqual(currentURL(), '/components/form/textarea');
  });

  test('components/form/textarea passes a11y automated checks', async function (assert) {
    await visit('/components/form/textarea');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
