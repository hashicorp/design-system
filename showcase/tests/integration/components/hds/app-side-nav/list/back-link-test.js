/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module /* , test */ } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
// import { render } from '@ember/test-helpers';
// import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/app-side-nav/list/back-link',
  function (hooks) {
    setupRenderingTest(hooks);

    // Basic

    // DISABLEtest('it should render the component with a CSS class that matches the component name', async function (assert) {
    //   await render(
    //     hbs`<Hds::AppSideNav::List::BackLink id="test-app-side-nav-list-item-link-back-link" />`
    //   );
    //   assert
    //     .dom('#test-app-side-nav-list-item-link-back-link')
    //     .hasClass('hds-app-side-nav__list-item-link--back-link');
    // });

    // Test Content / Args

    // DISABLEtest('it renders the passed in args', async function (assert) {
    //   await render(
    //     hbs`<Hds::AppSideNav::List::BackLink @text="Back to parent page" @href="#" />`
    //   );
    //   assert.dom('.hds-icon-chevron-left').exists();
    //   assert
    //     .dom('.hds-app-side-nav__list-item-text')
    //     .hasText('Back to parent page');
    // });

    // GENERATED ELEMENTS

    // DISABLEtest('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
    //   await render(hbs`<Hds::AppSideNav::List::BackLink />`);
    //   assert
    //     .dom('.hds-app-side-nav__list-item-link--back-link')
    //     .hasTagName('button');
    // });

    // DISABLEtest('it should render a <a> link if @href is passed', async function (assert) {
    //   await render(
    //     hbs`<Hds::AppSideNav::List::BackLink @href="https://www.hashicorp.com/" />`
    //   );
    //   assert
    //     .dom('.hds-app-side-nav__list-item-link--back-link')
    //     .hasTagName('a')
    //     .hasAttribute('href', 'https://www.hashicorp.com/');
    // });

    //   DISABLEtest('it should render a <a> link if @route is passed', async function (assert) {
    //     await render(
    //       hbs`<Hds::AppSideNav::List::BackLink @route="utilities.interactive" />`
    //     );
    //     assert
    //       .dom('.hds-app-side-nav__list-item-link--back-link')
    //       .hasTagName('a')
    //       .hasAttribute('href', '/utilities/interactive');
    //   });
  }
);
