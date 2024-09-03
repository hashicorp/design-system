/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/app-side-nav/header', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::AppSideNav::Header id="test-app-side-nav-header"/>`);
    assert.dom('#test-app-side-nav-header').hasClass('hds-app-side-nav-header');
  });

  // CONTENT

  test('it renders passed in content', async function (assert) {
    await render(hbs`
      <Hds::AppSideNav::Header>
        <:logo>
          <div id="test-app-side-nav-logo"></div>
        </:logo>
        <:actions>
          <div id="test-app-side-nav-actions"></div>
        </:actions>
      </Hds::AppSideNav::Header>
    `);
    assert.dom('#test-app-side-nav-logo').exists();
    assert.dom('#test-app-side-nav-actions').exists();
  });
});
