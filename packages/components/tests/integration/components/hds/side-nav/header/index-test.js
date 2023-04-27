/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/header', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::SideNav::Header id="test-side-nav-header"/>`);
    assert.dom('#test-side-nav-header').hasClass('hds-side-nav-header');
  });

  // CONTENT

  test('it renders passed in content', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Header>
        <:logo>
          <div id="test-side-nav-logo"></div>
        </:logo>
        <:actions>
          <div id="test-side-nav-actions"></div>
        </:actions>
      </Hds::SideNav::Header>
    `);
    assert.dom('#test-side-nav-logo').exists();
    assert.dom('#test-side-nav-actions').exists();
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`<Hds::SideNav::Header id="test-side-nav-header" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-side-nav-header').hasClass('my-class');
    assert.dom('#test-side-nav-header').hasAttribute('data-test1');
    assert.dom('#test-side-nav-header').hasAttribute('data-test2', 'test');
  });
});
