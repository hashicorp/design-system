/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/code-editor', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/code-editor', async function (assert) {
    await visit('/components/code-editor');

    assert.strictEqual(currentURL(), '/components/code-editor');
  });

  test('components/code-editor page passes automated a11y checks', async function (assert) {
    await visit('/components/code-editor');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
