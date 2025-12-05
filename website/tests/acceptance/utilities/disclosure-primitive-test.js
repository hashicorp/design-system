/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | utilities/disclosure-primitive', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /utilities/disclosure-primitive', async function (assert) {
    await visit('/utilities/disclosure-primitive');

    assert.strictEqual(currentURL(), '/utilities/disclosure-primitive');
  });

  test('utilities/disclosure-primitive page passes automated a11y checks', async function (assert) {
    await visit('/utilities/disclosure-primitive');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
