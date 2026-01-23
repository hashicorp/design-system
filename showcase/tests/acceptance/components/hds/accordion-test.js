/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'showcase/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/accordion', function (hooks) {
  setupApplicationTest(hooks);

  test('Components/hds/accordion page passes automated a11y checks', async function (assert) {
    const axeOptions = {
      rules: {
        'target-size': {
          enabled: false,
          selectors: [['.hds-accordion-item__button--size-small']],
        },
        // TODO: Carbon Web Components have known accessibility issues that need to be addressed upstream
        // See: https://github.com/carbon-design-system/carbon/issues
        // - cds-accordion-item uses role="listitem" without a proper list parent
        'aria-required-parent': {
          enabled: false,
        },
        // - Carbon's internal button structure creates nested interactive elements
        'nested-interactive': {
          enabled: false,
        },
      },
    };

    await visit('/components/accordion');

    await a11yAudit(axeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });
});
