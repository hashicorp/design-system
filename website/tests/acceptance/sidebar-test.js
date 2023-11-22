/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';

module('Acceptance | Sidebar filter', function (hooks) {
  setupApplicationTest(hooks);

  // QUERY PARAMS

  test('all "folder" containers should be closed by default if the "current route" link is not inside any of them', async function (assert) {
    await visit('/components/alert');
    assert.dom('.doc-table-of-contents__folder[open]').exists({ count: 0 });
  });

  test('the "folder" container of the "current route" link should be opened by default', async function (assert) {
    await visit('/components/form/radio-card');
    assert.dom('.doc-table-of-contents__folder[open]').exists({ count: 1 });
  });
});
