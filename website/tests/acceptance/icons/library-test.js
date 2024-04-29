/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test, skip } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | icons/library', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /icons/library', async function (assert) {
    await visit('/icons/library');

    assert.strictEqual(currentURL(), '/icons/library');
  });

  skip('icons/library page passes automated a11y checks', async function (assert) {
    await visit('/icons/library');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
