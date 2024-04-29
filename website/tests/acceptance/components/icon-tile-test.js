/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/icon tile', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/icon-tile', async function (assert) {
    await visit('/components/icon-tile');

    assert.strictEqual(currentURL(), '/components/icon-tile');
  });

  test('components/icon-tile passes a11y automated checks', async function (assert) {
    await visit('/components/icon-tile');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
