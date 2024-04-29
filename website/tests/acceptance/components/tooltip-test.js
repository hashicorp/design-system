/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/tooltip', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/tooltip', async function (assert) {
    await visit('/components/tooltip');

    assert.strictEqual(currentURL(), '/components/tooltip');
  });
  test('Components/tooltip page passes automated a11y checks', async function (assert) {
    await visit('/components/tooltip');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
