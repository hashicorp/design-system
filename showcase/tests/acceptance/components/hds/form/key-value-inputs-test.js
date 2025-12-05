/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'showcase/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/form/key-value-inputs', function (hooks) {
  setupApplicationTest(hooks);

  test('components/form/key-value-inputs passes a11y automated checks', async function (assert) {
    const axeOptions = {
      rules: {
        'color-contrast': {
          enabled: false,
          selectors: [['.shw-placeholder']],
        },
      },
    };

    await visit('/components/form/key-value-inputs');
    await a11yAudit(axeOptions);
    assert.ok(true, 'a11y automation audit passed');
  });
});
