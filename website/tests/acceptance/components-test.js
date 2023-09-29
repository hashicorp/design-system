/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components', async function (assert) {
    await visit('/components');

    assert.strictEqual(currentURL(), '/components');
  });
  test('components page passes automated a11y checks', async function (assert) {
    await visit('/components');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
