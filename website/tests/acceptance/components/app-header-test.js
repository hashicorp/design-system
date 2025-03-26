/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/app-header', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/app-header', async function (assert) {
    await visit('/components/app-header');

    assert.strictEqual(currentURL(), '/components/app-header');
  });

  test('Components/app-header page passes automated a11y checks', async function (assert) {
    await visit('/components/app-header');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
