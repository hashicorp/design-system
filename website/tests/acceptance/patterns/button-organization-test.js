/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | patterns/button-organization', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /patterns/button-organization', async function (assert) {
    await visit('/patterns/button-organization');

    assert.strictEqual(currentURL(), '/patterns/button-organization');
  });

  test('patterns/button-organization page passes automated a11y checks', async function (assert) {
    await visit('/patterns/button-organization');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
