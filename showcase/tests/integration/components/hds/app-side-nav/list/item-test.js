/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/app-side-nav/list/item',
  function (hooks) {
    setupRenderingTest(hooks);

    // Basic

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::AppSideNav::List::Item id='test-app-side-nav-list-item' />`,
      );
      assert
        .dom('#test-app-side-nav-list-item')
        .hasClass('hds-app-side-nav__list-item');
    });

    // Test Content

    test('it renders the passed in custom content', async function (assert) {
      await render(hbs`
        <Hds::AppSideNav::List::Item><span id='test-custom-content' /></Hds::AppSideNav::List::Item>
      `);
      assert.dom('#test-custom-content').exists();
    });
  },
);
