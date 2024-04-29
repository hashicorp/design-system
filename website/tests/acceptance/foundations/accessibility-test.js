/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | foundations/accessibility', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /foundations/accessibility', async function (assert) {
    await visit('/foundations/accessibility');

    assert.strictEqual(currentURL(), '/foundations/accessibility');
  });

  test('foundations/accessibility page passes automated a11y checks', async function (assert) {
    await visit('/foundations/accessibility');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
