/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';

module('Acceptance | layouts/flex', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /layouts/flex', async function (assert) {
    await visit('/layouts/flex');

    assert.strictEqual(currentURL(), '/layouts/flex');
  });
});
