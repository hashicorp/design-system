/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'showcase/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/layout/grid', function (hooks) {
  setupApplicationTest(hooks);

  test('Layouts/grid page passes automated a11y checks', async function (assert) {
    await visit('/layouts/grid');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
