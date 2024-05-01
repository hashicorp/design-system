/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | foundations/border', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /foundations/border', async function (assert) {
    await visit('/foundations/border');

    assert.strictEqual(currentURL(), '/foundations/border');
  });

  test('foundations/border page passes automated a11y checks', async function (assert) {
    await visit('/foundations/border');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
