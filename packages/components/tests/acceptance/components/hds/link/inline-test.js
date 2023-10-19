/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'dummy/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/link/inline', function (hooks) {
  setupApplicationTest(hooks);

  test('Components/hds/link/inline page passes automated a11y checks', async function (assert) {
    await visit('/components/link/inline');
    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
