/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | content/writing-style', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /content/writing-style', async function (assert) {
    await visit('/content/writing-style');

    assert.strictEqual(currentURL(), '/content/writing-style');
  });

  test('content/writing-style page passes automated a11y checks', async function (assert) {
    await visit('/content/writing-style');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
