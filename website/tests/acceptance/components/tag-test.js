/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/tag', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/tag', async function (assert) {
    await visit('/components/tag');

    assert.strictEqual(currentURL(), '/components/tag');
  });

  test('components/tag passes a11y automated checks', async function (assert) {
    await visit('/components/tag');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
