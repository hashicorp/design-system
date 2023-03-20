/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/list/item', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::SideNav::List::Item />`);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::SideNav::List::Item />`);
    assert.dom('.hds-side-nav__list-item').exists();
  });

  // Test Content

  test('it renders the passed in custom content', async function (assert) {
    await render(hbs`
      <Hds::SideNav::List::Item>
        <span id="test-custom-content" />
      </Hds::SideNav::List::Item>
    `);
    assert.dom('#test-custom-content').exists();
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::Item id="test-sidenav-item" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-sidenav-item').hasClass('my-class');
    assert.dom('#test-sidenav-item').hasAttribute('data-test1');
    assert.dom('#test-sidenav-item').hasAttribute('data-test2', 'test');
  });
});
