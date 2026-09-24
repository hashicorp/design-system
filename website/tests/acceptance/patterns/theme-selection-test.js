/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | patterns/theme-selection', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /patterns/theme-selection', async function (assert) {
    await visit('/patterns/theme-selection');

    assert.strictEqual(currentURL(), '/patterns/theme-selection');
  });

  test('patterns/theme-selection page passes automated a11y checks', async function (assert) {
    await visit('/patterns/theme-selection');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });

  test('leaving patterns/theme-selection removes theme classes from root html element', async function (assert) {
    await visit('/patterns/theme-selection');

    document.documentElement.classList.add('hds-theme-dark');
    document.documentElement.classList.add('hds-mode-cds-g100');
    document.documentElement.classList.add('should-remain');

    await visit('/patterns');

    assert.false(
      document.documentElement.classList.contains('hds-theme-dark'),
      'theme class is removed from html',
    );
    assert.false(
      document.documentElement.classList.contains('hds-mode-cds-g100'),
      'mode class is removed from html',
    );
    assert.true(
      document.documentElement.classList.contains('should-remain'),
      'non-theme class remains on html',
    );

    document.documentElement.classList.remove('should-remain');
  });
});
