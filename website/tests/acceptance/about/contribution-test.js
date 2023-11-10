/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | about/contribution', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /about/contribution', async function (assert) {
    await visit('/about/contribution');

    assert.strictEqual(currentURL(), '/about/contribution');
  });

  test('about/contribution page passes automated a11y checks', async function (assert) {
    await visit('/about/contribution');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
