/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'showcase/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | Component | hds/dropdown', function (hooks) {
  setupApplicationTest(hooks);

  test('Components/dropdown passes a11y automated checks', async function (assert) {
    const axeOptions = {
      rules: {
        // The Inheritance showcase intentionally mixes Checkmark (role="option") items with
        // other item types in a single dropdown, which causes the list to be promoted to
        // role="listbox" while containing non-option children. This is a showcase-only
        // pattern and not a real-world usage concern.
        'aria-required-children': {
          enabled: false,
          selectors: [
            [
              '.shw-component-dropdown-inheritance-container .hds-dropdown__list',
            ],
          ],
        },
        listitem: {
          enabled: false,
          selectors: [
            [
              '.shw-component-dropdown-inheritance-container .hds-dropdown__list li',
            ],
          ],
        },
      },
    };

    await visit('/components/dropdown');
    await a11yAudit(axeOptions);

    assert.ok(true, 'a11y automation audit passed');
  });
});
