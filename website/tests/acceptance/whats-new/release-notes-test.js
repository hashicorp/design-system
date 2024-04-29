/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | whats-new/release-notes', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /whats-new/release-notes', async function (assert) {
    await visit('/whats-new/release-notes');

    assert.strictEqual(currentURL(), '/whats-new/release-notes');
  });

  test('whats-new/release-notes page passes automated a11y checks', async function (assert) {
    await visit('/whats-new/release-notes');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
