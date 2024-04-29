/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/copy/snippet', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/copy/snippet', async function (assert) {
    await visit('/components/copy/snippet');

    assert.strictEqual(currentURL(), '/components/copy/snippet');
  });
  test('Components/copy/snippet page passes automated a11y checks', async function (assert) {
    await visit('/components/copy/snippet');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
