/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | about/overview', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /about/overview', async function (assert) {
    await visit('/about/overview');

    assert.strictEqual(currentURL(), '/about/overview');
  });

  test('about/overview page passes automated a11y checks', async function (assert) {
    await visit('/about/overview');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
