/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | foundations/tokens', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /foundations/tokens', async function (assert) {
    await visit('/foundations/tokens');

    assert.strictEqual(currentURL(), '/foundations/tokens');
  });

  test('foundations/accessibility page passes automated a11y checks', async function (assert) {
    await visit('/foundations/tokens');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
