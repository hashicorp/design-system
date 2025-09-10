/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | content/components/tables', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /content/components/tables', async function (assert) {
    await visit('/content/components/tables');

    assert.strictEqual(currentURL(), '/content/components/tables');
  });

  test('content/components/tables page passes automated a11y checks', async function (assert) {
    await visit('/content/components/tables');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
