/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'showcase/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/form/super-select', function (hooks) {
  setupApplicationTest(hooks);

  test('components/form/super-select page passes automated a11y checks', async function (assert) {
    let axeOptions = {
      rules: {
        // ARIA attribute is not allowed: aria-activedescendant
        'aria-allowed-attr': {
          enabled: false,
          selectors: [['.ember-power-select-multiple-options']],
        },
        // Invalid ARIA attribute value: aria-activedescendant
        'aria-valid-attr-value': {
          enabled: false,
          selectors: [['.ember-power-select-trigger']],
        },
        // ARIA role group is not allowed for given element
        'aria-allowed-role': {
          enabled: false,
          selectors: [['.hds-form-super-select__option-group']],
        },
      },
    };
    await visit('/components/form/super-select');
    await a11yAudit(axeOptions);
    assert.ok(true, 'a11y automation audit passed');
  });
});
