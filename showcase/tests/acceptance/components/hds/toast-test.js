/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'showcase/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/toast', function (hooks) {
  setupApplicationTest(hooks);

  test('Components/hds/toast page passes automated a11y checks', async function (assert) {
    await visit('/components/toast');
    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
