/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'dummy/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/side-nav', function (hooks) {
  setupApplicationTest(hooks);

  test('Components/side-nav page passes a11y automated checks', async function (assert) {
    let axeOptions = {
      rules: {
        listitem: {
          enabled: false,
        },
        'color-contrast': {
          enabled: false,
          selectors: [['.shw-placeholder']],
        },
      },
    };

    await visit('/components/side-nav');

    await a11yAudit(axeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });
});
