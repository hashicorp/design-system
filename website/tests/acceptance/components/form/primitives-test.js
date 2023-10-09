/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/form/primitives', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/form/primitives', async function (assert) {
    await visit('/components/form/primitives');

    assert.strictEqual(currentURL(), '/components/form/primitives');
  });

  test('components/form/primitives page passes automated a11y checks', async function (assert) {
    await visit('/components/form/primitives');
    await a11yAudit();
    assert.ok(true, 'a11y automation audit passed');
  });
});
