/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'showcase/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/form/layout', function (hooks) {
  setupApplicationTest(hooks);

  test('components/form/layout page passes automated a11y checks', async function (assert) {
    await visit('/components/form/layout');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
