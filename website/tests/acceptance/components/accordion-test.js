/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/accordion', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/accordion', async function (assert) {
    await visit('/components/accordion');

    assert.strictEqual(currentURL(), '/components/accordion');
  });
  test('Components/accordion page passes automated a11y checks', async function (assert) {
    await visit('/components/accordion');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
