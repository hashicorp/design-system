/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'showcase/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | layouts/grid', function (hooks) {
  setupApplicationTest(hooks);

  test('Layout/grid page passes automated a11y checks', async function (assert) {
    let axeOptions = {
      rules: {
        'color-contrast': {
          enabled: false,
          selectors: [['.shw-placeholder']],
        },
      },
    };

    await visit('/layouts/grid');

    await a11yAudit(axeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });
});
