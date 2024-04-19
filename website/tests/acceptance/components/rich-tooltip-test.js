/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { globalAxeOptions } from 'website/tests/a11y-helper';

module('Acceptance | components/rich-tooltip', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/rich-tooltip', async function (assert) {
    await visit('/components/rich-tooltip');

    assert.strictEqual(currentURL(), '/components/rich-tooltip');
  });
  test('Components/rich-tooltip page passes automated a11y checks', async function (assert) {
    await visit('/components/rich-tooltip');

    await a11yAudit(globalAxeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });
});
