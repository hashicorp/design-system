/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::SideNav::Base id="test-side-nav" />`);
    assert.dom('#test-side-nav').hasClass('hds-side-nav');
  });

  // CONTENT

  test('it renders content passed to the named blocks', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Base>
        <:root>
          <span id="test-side-nav-root" />
        </:root>
        <:header>
          <span id="test-side-nav-header" />
        </:header>
        <:body>
          <span id="test-side-nav-body" />
        </:body>
        <:footer>
          <span id="test-side-nav-footer" />
        </:footer>
      </Hds::SideNav::Base>
    `);
    assert.dom('#test-side-nav-root').exists();
    assert.dom('#test-side-nav-header').exists();
    assert.dom('#test-side-nav-body').exists();
    assert.dom('#test-side-nav-footer').exists();
  });
});
