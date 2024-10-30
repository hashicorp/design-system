/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit, setRunOptions } from 'ember-a11y-testing/test-support';

module('Acceptance | components/app-side-nav', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/app-side-nav', async function (assert) {
    await visit('/components/app-side-nav');

    assert.strictEqual(currentURL(), '/components/app-side-nav');
  });

  test('Components/app-side-nav page passes automated a11y checks', async function (assert) {
    setRunOptions({
      rules: {
        'duplicate-id-aria': { enabled: false },
        'duplicate-id-active': { enabled: false },
      },
    });

    await visit('/components/app-side-nav');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
