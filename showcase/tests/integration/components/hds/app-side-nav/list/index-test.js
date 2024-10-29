/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/app-side-nav/list/index',
  function (hooks) {
    setupRenderingTest(hooks);

    // Basic

    skip('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::AppSideNav::List id="test-app-side-nav-list-wrapper" />`
      );
      assert
        .dom('#test-app-side-nav-list-wrapper')
        .hasClass('hds-app-side-nav__list-wrapper');
    });

    // Test Content / Args

    skip('it renders passed in yielded content', async function (assert) {
      await render(hbs`
      <Hds::AppSideNav::List as |L|>
        <L.Item id="test-app-side-nav-list-content-item" />
        <L.BackLink id="test-app-side-nav-list-content-backlink" />
        <L.Title id="test-app-side-nav-list-content-title" />
        <L.Link id="test-app-side-nav-list-content-link" />
      </Hds::AppSideNav::List>
    `);
      assert.dom('#test-app-side-nav-list-content-item').exists();
      assert.dom('#test-app-side-nav-list-content-backlink').exists();
      assert.dom('#test-app-side-nav-list-content-title').exists();
      assert.dom('#test-app-side-nav-list-content-link').exists();
    });

    // Accessibilty feature
    skip('it has the role of "list" role so Safari will identify it correctly as a list since the list-style is changed in the CSS', async function (assert) {
      await render(hbs`
        <Hds::AppSideNav::List />
      `);
      assert.dom('.hds-app-side-nav__list').hasAttribute('role', 'list');
    });
  }
);
