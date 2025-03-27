/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | content/writing-guidelines', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /content/writing-guidelines', async function (assert) {
    await visit('/content/writing-guidelines');

    assert.strictEqual(currentURL(), '/content/writing-guidelines');
  });

  test('content/writing-guidelines page passes automated a11y checks', async function (assert) {
    await visit('/content/writing-guidelines');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
