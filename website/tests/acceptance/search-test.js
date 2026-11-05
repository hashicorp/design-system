/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, click, triggerEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';

module('Acceptance | search', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function (assert) {
    // the search's overlay is added to <body>, outside the app; an app that's
    // torn down has to remove it
    assert
      .dom('.aa-DetachedOverlay', document.body)
      .doesNotExist('no search overlay is left from a previous app');
  });

  test('the search opens with its button', async function (assert) {
    await visit('/');
    await click('#search-button');

    assert.dom('.aa-DetachedOverlay', document.body).exists();
  });

  test('the search opens with cmd+K', async function (assert) {
    await visit('/');
    // browsers report cmd+K as a lowercase `k`, which `triggerKeyEvent` doesn't allow
    await triggerEvent(document, 'keydown', { key: 'k', metaKey: true });

    assert.dom('.aa-DetachedOverlay', document.body).exists();
  });
});
