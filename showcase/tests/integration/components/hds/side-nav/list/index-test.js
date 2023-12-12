/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/list/index', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::SideNav::List id="test-side-nav-list-wrapper" />`);
    assert
      .dom('#test-side-nav-list-wrapper')
      .hasClass('hds-side-nav__list-wrapper');
  });

  // Test Content / Args

  test('it renders passed in yielded content', async function (assert) {
    await render(hbs`
      <Hds::SideNav::List as |L|>
        <L.Item id="test-side-nav-list-content-item" />
        <L.BackLink id="test-side-nav-list-content-backlink" />
        <L.Title id="test-side-nav-list-content-title" />
        <L.Link id="test-side-nav-list-content-link" />
      </Hds::SideNav::List>
    `);
    assert.dom('#test-side-nav-list-content-item').exists();
    assert.dom('#test-side-nav-list-content-backlink').exists();
    assert.dom('#test-side-nav-list-content-title').exists();
    assert.dom('#test-side-nav-list-content-link').exists();
  });

  // Accessibilty feature
  test('it has the role of "list" role so Safari will identify it correctly as a list since the list-style is changed in the CSS', async function (assert) {
    await render(hbs`
      <Hds::SideNav::List />
    `);
    assert.dom('.hds-side-nav__list').hasAttribute('role', 'list');
  });
});
