/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/app-side-nav/list/link',
  function (hooks) {
    setupRenderingTest(hooks);

    // Basic

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::AppSideNav::List::Link id="test-app-side-nav-list-item-link" />`
      );
      assert
        .dom('#test-app-side-nav-list-item-link')
        .hasClass('hds-app-side-nav__list-item-link');
    });

    // Test Content / Args

    test('it renders the passed in args', async function (assert) {
      await render(
        hbs`<Hds::AppSideNav::List::Link @icon="boundary" @text="Boundary" @count="3" @badge="Alpha" @hasSubItems={{true}} @isHrefExternal={{true}} />`
      );
      assert.dom('.hds-icon-boundary').exists();
      assert.dom('.hds-app-side-nav__list-item-text').hasText('Boundary');
      assert.dom('.hds-badge-count').hasText('3');
      assert.dom('.hds-badge').hasText('Alpha');
      assert.dom('.hds-icon-chevron-right').exists();
      assert.dom('.hds-icon-external-link').exists();
    });

    test('it renders the link as "active" if @isActive is true', async function (assert) {
      await render(
        hbs`<Hds::AppSideNav::List::Link @isActive={{true}} id="test-app-side-nav-link" />`
      );
      assert
        .dom('#test-app-side-nav-link')
        .hasAttribute('aria-current', 'page')
        .hasClass('active');
    });

    test('it renders the passed in custom content', async function (assert) {
      await render(hbs`
      <Hds::AppSideNav::List::Link>
        <span id="test-custom-content" />
      </Hds::AppSideNav::List::Link>
    `);
      assert.dom('#test-custom-content').exists();
    });

    test('it renders the passed in custom iconColor value', async function (assert) {
      await render(
        hbs`
        <Hds::AppSideNav::List::Link
          @icon="boundary"
          @iconColor="var(--token-color-boundary-brand)"
        />`
      );
      assert
        .dom('.hds-icon-boundary')
        .exists()
        .hasAttribute('fill', 'var(--token-color-boundary-brand)');
    });

    // GENERATED ELEMENTS

    test('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
      await render(hbs`<Hds::AppSideNav::List::Link />`);
      assert.dom('.hds-app-side-nav__list-item-link').hasTagName('button');
    });

    test('it should render a <a> link if @href is passed', async function (assert) {
      await render(
        hbs`<Hds::AppSideNav::List::Link @href="https://www.hashicorp.com/" />`
      );
      assert
        .dom('.hds-app-side-nav__list-item-link')
        .hasTagName('a')
        .hasAttribute('href', 'https://www.hashicorp.com/');
    });

    test('it should render a <a> link if @route is passed', async function (assert) {
      await render(
        hbs`<Hds::AppSideNav::List::Link @route="utilities.interactive" />`
      );
      assert
        .dom('.hds-app-side-nav__list-item-link')
        .hasTagName('a')
        .hasAttribute('href', '/utilities/interactive');
    });
  }
);
