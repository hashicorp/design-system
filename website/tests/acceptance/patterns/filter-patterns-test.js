/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | patterns/filter-patterns', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /patterns/filter-patterns', async function (assert) {
    await visit('/patterns/filter-patterns');

    assert.strictEqual(currentURL(), '/patterns/filter-patterns');
  });

  test('patterns/filter-patterns page passes automated a11y checks', async function (assert) {
    await visit('/patterns/filter-patterns');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
