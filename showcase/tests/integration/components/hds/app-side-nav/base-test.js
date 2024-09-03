/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/app-side-nav/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::AppSideNav::Base id="test-app-side-nav" />`);
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav');
  });

  // CONTENT

  test('it renders content passed to the named blocks', async function (assert) {
    await render(hbs`
      <Hds::AppSideNav::Base>
        <:root>
          <span id="test-app-side-nav-root" />
        </:root>
        <:header>
          <span id="test-app-side-nav-header" />
        </:header>
        <:body>
          <span id="test-app-side-nav-body" />
        </:body>
        <:footer>
          <span id="test-app-side-nav-footer" />
        </:footer>
      </Hds::AppSideNav::Base>
    `);
    assert.dom('#test-app-side-nav-root').exists();
    assert.dom('#test-app-side-nav-header').exists();
    assert.dom('#test-app-side-nav-body').exists();
    assert.dom('#test-app-side-nav-footer').exists();
  });
});
