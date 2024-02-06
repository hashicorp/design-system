/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

// NOTICE: we combine the tests for `PortalTarget` and `Portal` in a single file, because the two components are strictly interconnected

module('Integration | Component | hds/side-nav/portal', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::SideNav::Portal::Target id="test-side-nav-portal-target" />`
    );
    assert
      .dom('#test-side-nav-portal-target')
      .hasClass('hds-side-nav__content');
  });

  // CONTENT

  test('it renders the content provided via portal', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Portal::Target />
      <Hds::SideNav::Portal>
        <div id="test-side-nav-content-portaled" />
      </Hds::SideNav::Portal>
    `);
    assert.dom('#test-side-nav-content-portaled').exists();
  });

  test('we can use custom a custom name for the target portal', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Portal::Target @targetName="test-side-nav-portal-target" />
      <Hds::SideNav::Portal @targetName="test-side-nav-portal-target">
        <div id="test-side-nav-content-portaled" />
      </Hds::SideNav::Portal>
    `);
    assert.dom('#test-side-nav-content-portaled').exists();
  });

  test('it renders the panel items provided via portal, in the right DOM location', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Portal::Target id="test-side-nav-content" />
      <Hds::SideNav::Portal as |Nav|>
        <Nav.BackLink @text="Back-link" @href="#" id="test-side-nav-list-backlink" />
        <Nav.Title id="test-side-nav-list-title">Title</Nav.Title>
        <Nav.Item id="test-side-nav-list-item">Item</Nav.Item>
        <Nav.Link @icon="hexagon" @text="Link" @href="#" id="test-side-nav-list-link" />
      </Hds::SideNav::Portal>
    `);
    assert
      .dom(
        '#test-side-nav-content .hds-side-nav__content-panels .hds-side-nav__content-panel'
      )
      .exists();
    assert
      .dom('#test-side-nav-list-backlink')
      .hasClass('hds-side-nav__list-item-link--back-link');
    assert.dom('#test-side-nav-list-backlink').hasText('Back-link');
    assert
      .dom('#test-side-nav-list-title')
      .hasClass('hds-side-nav__list-title');
    assert.dom('#test-side-nav-list-title').hasText('Title');
    assert.dom('#test-side-nav-list-item').hasClass('hds-side-nav__list-item');
    assert.dom('#test-side-nav-list-item').hasText('Item');
    assert
      .dom('#test-side-nav-list-link')
      .hasClass('hds-side-nav__list-item-link');
    assert.dom('#test-side-nav-list-link').hasText('Link');
  });

  // A11Y

  test('it should render with the correct aria-label attribute passed down to the "list" parent', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Portal::Target />
      <Hds::SideNav::Portal @ariaLabel="test">
        <div/>
      </Hds::SideNav::Portal>
    `);
    assert
      .dom('.hds-side-nav__list-wrapper')
      .hasAttribute('aria-label', 'test');
  });

  // DOM MANIPULATION

  test('it marks inactive subnavs', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Portal::Target />
      <Hds::SideNav::Portal data-test-side-nav-panel as |Nav|>
        <Nav.Link @text="Some link content" @href="#" />
      </Hds::SideNav::Portal>
      <Hds::SideNav::Portal data-test-side-nav-panel as |Nav|>
        <Nav.Link @text="Some other link content" @href="#" />
      </Hds::SideNav::Portal>
      <Hds::SideNav::Portal data-test-side-nav-panel as |Nav|>
        <Nav.Link @text="The last link content" @href="#" />
      </Hds::SideNav::Portal>
    `);

    assert.dom('[data-test-side-nav-panel]').exists({ count: 3 });
    assert
      .dom('[data-test-side-nav-panel]:nth-child(1)')
      .hasStyle({ visibility: 'hidden' });
    assert
      .dom('[data-test-side-nav-panel]:nth-child(2)')
      .hasStyle({ visibility: 'hidden' });
    assert
      .dom('[data-test-side-nav-panel]:nth-child(3)')
      .hasStyle({ visibility: 'visible' });
  });

  test('it sets transform on the container', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Portal::Target id="test-side-nav-content" />
      <Hds::SideNav::Portal as |Nav|>
        <Nav.Link @text="Some link content" @href="#" id="test-side-nav-list-link-1" data-test-side-nav-link-2 />
      </Hds::SideNav::Portal>
      <Hds::SideNav::Portal as |Nav|>
        <Nav.Link @text="Some other link content" @href="#" id="test-side-nav-list-link-2" data-test-side-nav-link-2 />
      </Hds::SideNav::Portal>
      <Hds::SideNav::Portal as |Nav|>
        <Nav.Link @text="The last link content" @href="#" id="test-side-nav-list-link-3" data-test-side-nav-link-3 />
      </Hds::SideNav::Portal>
    `);

    // we need to wait for
    let animationDone = false;
    await waitUntil(function () {
      setTimeout(() => {
        animationDone = true;
      }, 1000);
      return animationDone;
    });

    // element.animate() API, converts transforms into matricies so
    // 'matrix(1, 0, 0, 1, -560, 0)' is the same as translateX('-560px')
    assert
      .dom('.hds-side-nav__content-panels')
      .hasStyle({ transform: 'matrix(1, 0, 0, 1, -560, 0)' });
  });
});
