/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | layouts/app-frame', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /layouts/app-frame', async function (assert) {
    await visit('/layouts/app-frame');

    assert.strictEqual(currentURL(), '/layouts/app-frame');
  });

  test('layouts/app-frame page passes automated a11y checks', async function (assert) {
    let axeOptions = {
      rules: {
        'landmark-unique': {
          enabled: false,
        },
        'landmark-no-duplicate-main': {
          enabled: false,
        },
        'landmark-main-is-top-level': {
          enabled: false,
        },
      },
    };
    await visit('/layouts/app-frame');
    await a11yAudit(axeOptions);
    assert.ok(true, 'a11y automation audit passed');
  });
});
