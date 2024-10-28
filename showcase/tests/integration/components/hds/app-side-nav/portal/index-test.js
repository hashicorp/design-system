/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module /* , test */ } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
// import { render, waitUntil } from '@ember/test-helpers';
// import { hbs } from 'ember-cli-htmlbars';

// NOTICE: we combine the tests for `PortalTarget` and `Portal` in a single file, because the two components are strictly interconnected

module('Integration | Component | hds/app-side-nav/portal', function (hooks) {
  setupRenderingTest(hooks);

  // DISABLEtest('it should render the component with a CSS class that matches the component name', async function (assert) {
  //   await render(
  //     hbs`<Hds::AppSideNav::Portal::Target id="test-app-side-nav-portal-target" />`
  //   );
  //   assert
  //     .dom('#test-app-side-nav-portal-target')
  //     .hasClass('hds-app-side-nav__content');
  // });

  // CONTENT

  // DISABLEtest('it renders the content provided via portal', async function (assert) {
  //   await render(hbs`
  //     <Hds::AppSideNav::Portal::Target />
  //     <Hds::AppSideNav::Portal>
  //       <div id="test-app-side-nav-content-portaled" />
  //     </Hds::AppSideNav::Portal>
  //   `);
  //   assert.dom('#test-app-side-nav-content-portaled').exists();
  // });

  // DISABLEtest('we can use custom a custom name for the target portal', async function (assert) {
  //   await render(hbs`
  //     <Hds::AppSideNav::Portal::Target @targetName="test-app-side-nav-portal-target" />
  //     <Hds::AppSideNav::Portal @targetName="test-app-side-nav-portal-target">
  //       <div id="test-app-side-nav-content-portaled" />
  //     </Hds::AppSideNav::Portal>
  //   `);
  //   assert.dom('#test-app-side-nav-content-portaled').exists();
  // });

  // DISABLEtest('it renders the panel items provided via portal, in the right DOM location', async function (assert) {
  //   await render(hbs`
  //     <Hds::AppSideNav::Portal::Target id="test-app-side-nav-content" />
  //     <Hds::AppSideNav::Portal as |Nav|>
  //       <Nav.BackLink @text="Back-link" @href="#" id="test-app-side-nav-list-backlink" />
  //       <Nav.Title id="test-app-side-nav-list-title">Title</Nav.Title>
  //       <Nav.Item id="test-app-side-nav-list-item">Item</Nav.Item>
  //       <Nav.Link @icon="hexagon" @text="Link" @href="#" id="test-app-side-nav-list-link" />
  //     </Hds::AppSideNav::Portal>
  //   `);
  //   assert
  //     .dom(
  //       '#test-app-side-nav-content .hds-app-side-nav__content-panels .hds-app-side-nav__content-panel'
  //     )
  //     .exists();
  //   assert
  //     .dom('#test-app-side-nav-list-backlink')
  //     .hasClass('hds-app-side-nav__list-item-link--back-link');
  //   assert.dom('#test-app-side-nav-list-backlink').hasText('Back-link');
  //   assert
  //     .dom('#test-app-side-nav-list-title')
  //     .hasClass('hds-app-side-nav__list-title');
  //   assert.dom('#test-app-side-nav-list-title').hasText('Title');
  //   assert
  //     .dom('#test-app-side-nav-list-item')
  //     .hasClass('hds-app-side-nav__list-item');
  //   assert.dom('#test-app-side-nav-list-item').hasText('Item');
  //   assert
  //     .dom('#test-app-side-nav-list-link')
  //     .hasClass('hds-app-side-nav__list-item-link');
  //   assert.dom('#test-app-side-nav-list-link').hasText('Link');
  // });

  // A11Y

  // DISABLEtest('it should render with the correct aria-label attribute passed down to the "list" parent', async function (assert) {
  //   await render(hbs`
  //     <Hds::AppSideNav::Portal::Target />
  //     <Hds::AppSideNav::Portal @ariaLabel="test">
  //       <div/>
  //     </Hds::AppSideNav::Portal>
  //   `);
  //   assert
  //     .dom('.hds-app-side-nav__list-wrapper')
  //     .hasAttribute('aria-label', 'test');
  // });

  // DOM MANIPULATION

  // DISABLEtest('it marks inactive subnavs', async function (assert) {
  //   await render(hbs`
  //     <Hds::AppSideNav::Portal::Target />
  //     <Hds::AppSideNav::Portal data-test-app-side-nav-panel as |Nav|>
  //       <Nav.Link @text="Some link content" @href="#" />
  //     </Hds::AppSideNav::Portal>
  //     <Hds::AppSideNav::Portal data-test-app-side-nav-panel as |Nav|>
  //       <Nav.Link @text="Some other link content" @href="#" />
  //     </Hds::AppSideNav::Portal>
  //     <Hds::AppSideNav::Portal data-test-app-side-nav-panel as |Nav|>
  //       <Nav.Link @text="The last link content" @href="#" />
  //     </Hds::AppSideNav::Portal>
  //   `);

  //   assert.dom('[data-test-app-side-nav-panel]').exists({ count: 3 });
  //   assert
  //     .dom('[data-test-app-side-nav-panel]:nth-child(1)')
  //     .hasStyle({ visibility: 'hidden' });
  //   assert
  //     .dom('[data-test-app-side-nav-panel]:nth-child(2)')
  //     .hasStyle({ visibility: 'hidden' });
  //   assert
  //     .dom('[data-test-app-side-nav-panel]:nth-child(3)')
  //     .hasStyle({ visibility: 'visible' });
  // });

  // DISABLEtest('it sets transform on the container', async function (assert) {
  //   await render(hbs`
  //     <Hds::AppSideNav::Portal::Target id="test-app-side-nav-content" />
  //     <Hds::AppSideNav::Portal as |Nav|>
  //       <Nav.Link @text="Some link content" @href="#" id="test-app-side-nav-list-link-1" data-test-app-side-nav-link-2 />
  //     </Hds::AppSideNav::Portal>
  //     <Hds::AppSideNav::Portal as |Nav|>
  //       <Nav.Link @text="Some other link content" @href="#" id="test-app-side-nav-list-link-2" data-test-app-side-nav-link-2 />
  //     </Hds::AppSideNav::Portal>
  //     <Hds::AppSideNav::Portal as |Nav|>
  //       <Nav.Link @text="The last link content" @href="#" id="test-app-side-nav-list-link-3" data-test-app-side-nav-link-3 />
  //     </Hds::AppSideNav::Portal>
  //   `);

  //   // we need to wait for
  //   let animationDone = false;
  //   await waitUntil(function () {
  //     setTimeout(() => {
  //       animationDone = true;
  //     }, 1000);
  //     return animationDone;
  //   });

  //   // element.animate() API, converts transforms into matricies so
  //   // 'matrix(1, 0, 0, 1, -560, 0)' is the same as translateX('-560px')
  //   assert
  //     .dom('.hds-app-side-nav__content-panels')
  //     .hasStyle({ transform: 'matrix(1, 0, 0, 1, -560, 0)' });
  // });
});
