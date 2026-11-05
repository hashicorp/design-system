/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { findAll, render } from '@ember/test-helpers';

import { HdsAppSideNavList } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/app-side-nav/list/index',
  function (hooks) {
    setupRenderingTest(hooks);

    // Basic

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsAppSideNavList id="test-app-side-nav-list-wrapper" />
        </template>,
      );
      assert
        .dom('#test-app-side-nav-list-wrapper')
        .hasClass('hds-app-side-nav__list-wrapper');
    });

    // Test Content / Args

    test('it renders passed in yielded content', async function (assert) {
      await render(
        <template>
          <HdsAppSideNavList as |L|>
            <L.Item id="test-app-side-nav-list-content-item" />
            <L.BackLink
              @text="Back to parent page"
              id="test-app-side-nav-list-content-backlink"
            />
            <L.Title id="test-app-side-nav-list-content-title" />
            <L.Link id="test-app-side-nav-list-content-link" />
          </HdsAppSideNavList>
        </template>,
      );
      assert.dom('#test-app-side-nav-list-content-item').exists();
      assert.dom('#test-app-side-nav-list-content-backlink').exists();
      assert.dom('#test-app-side-nav-list-content-title').exists();
      assert.dom('#test-app-side-nav-list-content-link').exists();
    });

    test('it labels the list with the IDs of the yielded titles', async function (assert) {
      await render(
        <template>
          <HdsAppSideNavList as |L|>
            <L.Title>First title</L.Title>
            <L.Link @text="Link" />
            <L.Title>Second title</L.Title>
          </HdsAppSideNavList>
        </template>,
      );

      const titleIds = findAll('.hds-app-side-nav__list-title').map(
        (title) => title.id,
      );

      assert.strictEqual(titleIds.length, 2);
      assert
        .dom('.hds-app-side-nav__list')
        .hasAttribute('aria-labelledby', titleIds.join(' '));
    });

    // Accessibilty feature
    test('it has the role of "list" role so Safari will identify it correctly as a list since the list-style is changed in the CSS', async function (assert) {
      await render(<template><HdsAppSideNavList /></template>);
      assert.dom('.hds-app-side-nav__list').hasAttribute('role', 'list');
    });
  },
);
