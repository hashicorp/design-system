/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { globalAxeOptions } from 'website/tests/a11y-helper';

module('Acceptance | components/accordion', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/accordion', async function (assert) {
    await visit('/components/accordion');

    assert.strictEqual(currentURL(), '/components/accordion');
  });
  test('visiting the a11y tab on the page', async function (assert) {
    await visit('/components/accordion?tab=accessibility');
    assert.strictEqual(currentURL(), '/components/accordion?tab=accessibility');
  });
  test('I can find the element that purposefully fails color contrast', async function (assert) {
    await visit('/components/accordion?tab=accessibility');
    assert.strictEqual(
      this.element.querySelector('[data-test-a11y-element]').textContent.trim(),
      'I should cause test failures.'
    );
  });
  test('Components/accordion a11y tab passes automated a11y checks', async function (assert) {
    // await visit('/components/accordion');
    await visit('/components/accordion?tab=accessibility');
    await a11yAudit(globalAxeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });
});
