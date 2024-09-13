/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';

module('Acceptance | Component Tabs', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting a tabbed component page and interacting with tabs by default', async function (assert) {
    await visit('/components/alert');

    assert.strictEqual(currentURL(), '/components/alert');

    assert.dom('.doc-page-tabs__tab--is-current').exists({ count: 1 });
    assert
      .dom('.doc-page-tabs__tab:nth-child(1)')
      .hasClass('doc-page-tabs__tab--is-current');

    // Sidebar should show this component as the active "link"

    const activeLink = document.getElementsByClassName(
      'doc-table-of-contents__link active'
    );

    assert.ok(activeLink[0].textContent.includes('Alert'));
    assert.dom('.doc-table-of-contents__link.active').exists({ count: 1 });

    await click('#tab-code');

    assert
      .dom('.doc-page-tabs__tab:nth-child(1)')
      .doesNotHaveClass('doc-page-tabs__tab--is-current');

    assert.strictEqual(currentURL(), '/components/alert?tab=code');

    // Sidebar should show this component as the active "link"
    assert.ok(activeLink[0].textContent.includes('Alert'));
    assert.dom('.doc-table-of-contents__link.active').exists({ count: 1 });
  });

  test('visiting a tabbed component page and interacting with tabs by specific tab', async function (assert) {
    await visit('/components/alert?tab=code');

    assert.strictEqual(currentURL(), '/components/alert?tab=code');

    assert.dom('.doc-page-tabs__tab--is-current').exists({ count: 1 });
    assert
      .dom('.doc-page-tabs__tab:nth-child(2)')
      .hasClass('doc-page-tabs__tab--is-current');
  });

  test('specifying a component tab that does not exist defaults to the first tab', async function (assert) {
    await visit('/components/alert?tab=wubalubadubdub');

    assert.strictEqual(currentURL(), '/components/alert');

    assert.dom('.doc-page-tabs__tab--is-current').exists({ count: 1 });
    assert
      .dom('.doc-page-tabs__tab:nth-child(1)')
      .hasClass('doc-page-tabs__tab--is-current');
  });
});
