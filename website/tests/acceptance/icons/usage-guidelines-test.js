/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | icons/usage guidelines', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /icons/usage-guidelines', async function (assert) {
    await visit('/icons/usage-guidelines');

    assert.strictEqual(currentURL(), '/icons/usage-guidelines');
  });

  test('icons/usage-guidelines page passes automated a11y checks', async function (assert) {
    await visit('/icons/usage-guidelines');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
