/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsAppSideNavListLink } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/app-side-nav/list/link',
  function (hooks) {
    setupRenderingTest(hooks);

    // Basic

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsAppSideNavListLink id="test-app-side-nav-list-item-link" />
        </template>,
      );
      assert
        .dom('#test-app-side-nav-list-item-link')
        .hasClass('hds-app-side-nav__list-item-link');
    });

    // Test Content / Args

    test('it renders the passed in args', async function (assert) {
      await render(
        <template>
          <HdsAppSideNavListLink
            @icon="boundary"
            @text="Boundary"
            @count="3"
            @badge="Alpha"
            @hasSubItems={{true}}
            @isHrefExternal={{true}}
          />
        </template>,
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
        <template>
          <HdsAppSideNavListLink
            @isActive={{true}}
            id="test-app-side-nav-link"
          />
        </template>,
      );
      assert
        .dom('#test-app-side-nav-link')
        .hasAttribute('aria-current', 'page')
        .hasClass('active');
    });

    test('it renders the passed in custom content', async function (assert) {
      await render(
        <template>
          <HdsAppSideNavListLink>
            <span id="test-custom-content" />
          </HdsAppSideNavListLink>
        </template>,
      );
      assert.dom('#test-custom-content').exists();
    });

    // GENERATED ELEMENTS

    test('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
      await render(<template><HdsAppSideNavListLink /></template>);
      assert.dom('.hds-app-side-nav__list-item-link').hasTagName('button');
    });

    test('it should render a <a> link if @href is passed', async function (assert) {
      await render(
        <template>
          <HdsAppSideNavListLink @href="https://www.hashicorp.com/" />
        </template>,
      );
      assert
        .dom('.hds-app-side-nav__list-item-link')
        .hasTagName('a')
        .hasAttribute('href', 'https://www.hashicorp.com/');
    });

    test('it should render a <a> link if @route is passed', async function (assert) {
      await render(
        <template>
          <HdsAppSideNavListLink @route="page-utilities.interactive" />
        </template>,
      );
      assert
        .dom('.hds-app-side-nav__list-item-link')
        .hasTagName('a')
        .hasAttribute('href', '/utilities/interactive');
    });
  },
);
