/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { globalAxeOptions } from 'website/tests/a11y-helper';

module('Acceptance | components/dialog-primitive', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/dialog-primitive', async function (assert) {
    await visit('/components/dialog-primitive');

    assert.strictEqual(currentURL(), '/components/dialog-primitive');
  });

  test('Components/dialog-primitive page passes automated a11y checks', async function (assert) {
    await visit('/components/dialog-primitive');

    await a11yAudit(globalAxeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });
});
