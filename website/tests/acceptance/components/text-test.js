/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

import { merge } from 'lodash';

module('Acceptance | components/text', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/text', async function (assert) {
    await visit('/components/text');

    assert.strictEqual(currentURL(), '/components/text');
  });
  test('Components/text page passes automated a11y checks', async function (assert) {
    let axeOptions = merge({
      rules: {
        'heading-order': {
          enabled: false,
        },
      },
    });

    console.log(axeOptions);

    await visit('/components/text');

    await a11yAudit(axeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });
});
