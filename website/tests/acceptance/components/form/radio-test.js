/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/form/radio', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/form/radio', async function (assert) {
    await visit('/components/form/radio');

    assert.strictEqual(currentURL(), '/components/form/radio');
  });

  test('components/form/radio passes a11y automated checks', async function (assert) {
    await visit('/components/form/radio');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
