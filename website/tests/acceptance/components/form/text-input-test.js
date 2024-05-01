/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/form/text input', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/form/text-input', async function (assert) {
    await visit('/components/form/text-input');

    assert.strictEqual(currentURL(), '/components/form/text-input');
  });

  test('components/form/text-input passes a11y automated checks', async function (assert) {
    await visit('/components/form/text-input');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
