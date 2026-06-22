/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/form/key-value-inputs', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/form/key-value-inputs', async function (assert) {
    await visit('/components/form/key-value-inputs');

    assert.strictEqual(currentURL(), '/components/form/key-value-inputs');
  });

  test('Components/form/key-value-inputs page passes automated a11y checks', async function (assert) {
    await visit('/components/form/key-value-inputs');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
