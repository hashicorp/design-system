/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/form/layout', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/form/layout', async function (assert) {
    await visit('/components/form/layout');

    assert.strictEqual(currentURL(), '/components/form/layout');
  });

  test('Components/form/layout page passes automated a11y checks', async function (assert) {
    await visit('/components/form/layout');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
