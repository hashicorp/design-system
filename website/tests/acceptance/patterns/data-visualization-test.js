/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | patterns/data-visualization', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /patterns/data-visualization', async function (assert) {
    await visit('/patterns/data-visualization');

    assert.strictEqual(currentURL(), '/patterns/data-visualization');
  });

  test('patterns/data-visualization page passes automated a11y checks', async function (assert) {
    await visit('/patterns/data-visualization');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
