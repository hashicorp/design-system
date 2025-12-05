/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | patterns/table-multi-select', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /patterns/table-multi-select', async function (assert) {
    await visit('/patterns/table-multi-select');

    assert.strictEqual(currentURL(), '/patterns/table-multi-select');
  });

  test('patterns/table-multi-select page passes automated a11y checks', async function (assert) {
    await visit('/patterns/table-multi-select');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
