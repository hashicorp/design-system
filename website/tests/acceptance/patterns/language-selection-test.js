/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | patterns/language-selection', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /patterns/language-selection', async function (assert) {
    await visit('/patterns/language-selection');

    assert.strictEqual(currentURL(), '/patterns/language-selection');
  });

  test('patterns/language-selection page passes automated a11y checks', async function (assert) {
    await visit('/patterns/language-selection');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });

  test('leaving the language-selection page resets locale to english', async function (assert) {
    const intl = this.owner.lookup('service:intl');

    await visit('/patterns/language-selection');

    intl.setLocale(['es-es']);
    assert.strictEqual(intl.primaryLocale, 'es-es');

    await visit('/about');

    assert.strictEqual(intl.primaryLocale, 'en-us');
  });
});
