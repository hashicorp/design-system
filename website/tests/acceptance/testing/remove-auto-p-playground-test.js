/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';

module(
  'Acceptance | testing/markdown/remove-auto-p-playground',
  function (hooks) {
    setupApplicationTest(hooks);

    test('it renders the tokens list demo', async function (assert) {
      await visit('/testing/markdown/remove-auto-p-playground');

      assert.dom('.doc-tokens-list__item').exists({ count: 1 });
    });
  },
);
