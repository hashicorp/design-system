/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { globalAxeOptions } from 'website/tests/a11y-helper';

module('Acceptance | utilities/popover-primitive', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /utilities/popover-primitive', async function (assert) {
    await visit('/utilities/popover-primitive');

    assert.strictEqual(currentURL(), '/utilities/popover-primitive');
  });

  test('utilities/popover-primitive passes a11y automated checks', async function (assert) {
    await visit('/utilities/popover-primitive');
    await a11yAudit(globalAxeOptions);
    assert.ok(true, 'a11y automation audit passed');
  });
});
