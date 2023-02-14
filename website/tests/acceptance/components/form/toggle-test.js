/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/form/toggle', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/form/toggle', async function (assert) {
    await visit('/components/form/toggle');

    assert.strictEqual(currentURL(), '/components/form/toggle');
  });

  test('components/form/toggle passes a11y automated checks', async function (assert) {
    await visit('/components/form/toggle');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
