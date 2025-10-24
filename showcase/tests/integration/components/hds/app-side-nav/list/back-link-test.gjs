/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import BackLink from "@hashicorp/design-system-components/components/hds/app-side-nav/list/back-link";

module(
  'Integration | Component | hds/app-side-nav/list/back-link',
  function (hooks) {
    setupRenderingTest(hooks);

    // Basic

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><BackLink id="test-app-side-nav-list-item-link-back-link" /></template>,
      );
      assert
        .dom('#test-app-side-nav-list-item-link-back-link')
        .hasClass('hds-app-side-nav__list-item-link--back-link');
    });

    // Test Content / Args

    test('it renders the passed in args', async function (assert) {
      await render(
        <template><BackLink @text="Back to parent page" @href="#" /></template>,
      );
      assert.dom('.hds-icon-chevron-left').exists();
      assert
        .dom('.hds-app-side-nav__list-item-text')
        .hasText('Back to parent page');
    });

    // GENERATED ELEMENTS

    test('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
      await render(<template><BackLink /></template>);
      assert
        .dom('.hds-app-side-nav__list-item-link--back-link')
        .hasTagName('button');
    });

    test('it should render a <a> link if @href is passed', async function (assert) {
      await render(
        <template><BackLink @href="https://www.hashicorp.com/" /></template>,
      );
      assert
        .dom('.hds-app-side-nav__list-item-link--back-link')
        .hasTagName('a')
        .hasAttribute('href', 'https://www.hashicorp.com/');
    });

    test('it should render a <a> link if @route is passed', async function (assert) {
      await render(
        <template><BackLink @route="page-utilities.interactive" /></template>,
      );
      assert
        .dom('.hds-app-side-nav__list-item-link--back-link')
        .hasTagName('a')
        .hasAttribute('href', '/utilities/interactive');
    });
  },
);
