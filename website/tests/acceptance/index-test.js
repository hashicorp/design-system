/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit, setRunOptions } from 'ember-a11y-testing/test-support';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('Homepage (index) exists', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
  });

  test('Homepage (index) passes a11y automated checks', async function (assert) {
    setRunOptions({
      rules: {
        list: { enabled: false },
      },
    });

    await visit('/');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
