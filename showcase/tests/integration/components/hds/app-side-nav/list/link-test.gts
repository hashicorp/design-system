/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Link from "@hashicorp/design-system-components/components/hds/app-side-nav/list/link";

module(
  'Integration | Component | hds/app-side-nav/list/link',
  function (hooks) {
    setupRenderingTest(hooks);

    // Basic

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><Link id="test-app-side-nav-list-item-link" /></template>,
      );
      assert
        .dom('#test-app-side-nav-list-item-link')
        .hasClass('hds-app-side-nav__list-item-link');
    });

    // Test Content / Args

    test('it renders the passed in args', async function (assert) {
      await render(
        <template><Link @icon="boundary" @text="Boundary" @count="3" @badge="Alpha" @hasSubItems={{true}} @isHrefExternal={{true}} /></template>,
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
        <template><Link @isActive={{true}} id="test-app-side-nav-link" /></template>,
      );
      assert
        .dom('#test-app-side-nav-link')
        .hasAttribute('aria-current', 'page')
        .hasClass('active');
    });

    test('it renders the passed in custom content', async function (assert) {
      await render(<template><Link>
  <span id="test-custom-content" />
</Link></template>);
      assert.dom('#test-custom-content').exists();
    });

    // GENERATED ELEMENTS

    test('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
      await render(<template><Link /></template>);
      assert.dom('.hds-app-side-nav__list-item-link').hasTagName('button');
    });

    test('it should render a <a> link if @href is passed', async function (assert) {
      await render(
        <template><Link @href="https://www.hashicorp.com/" /></template>,
      );
      assert
        .dom('.hds-app-side-nav__list-item-link')
        .hasTagName('a')
        .hasAttribute('href', 'https://www.hashicorp.com/');
    });

    test('it should render a <a> link if @route is passed', async function (assert) {
      await render(
        <template><Link @route="page-utilities.interactive" /></template>,
      );
      assert
        .dom('.hds-app-side-nav__list-item-link')
        .hasTagName('a')
        .hasAttribute('href', '/utilities/interactive');
    });
  },
);
