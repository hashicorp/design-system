/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  resetOnerror,
  settled,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

class MockEventTarget extends EventTarget {}

module('Integration | Component | hds/side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    // Mock window.matchMedia to control media query events
    let mockMedia = new MockEventTarget();
    mockMedia.matches = true;

    this.__matchMedia = window.matchMedia;

    this.mockMedia = () => {
      window.matchMedia = () => mockMedia;
    };

    this.changeBrowserSize = async (isDesktop) => {
      mockMedia.matches = isDesktop;
      mockMedia.dispatchEvent(
        new MediaQueryListEvent('change', {
          matches: isDesktop,
        })
      );
      await settled();
    };
  });

  hooks.afterEach(function () {
    resetOnerror();
    window.matchMedia = this.__matchMedia;
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::SideNav id="test-side-nav" @hasA11yRefocus={{false}} />`
    );
    assert.dom('#test-side-nav').hasClass('hds-side-nav');
  });

  // CONTENT

  test('it renders content passed to the named blocks', async function (assert) {
    await render(hbs`
      <Hds::SideNav @hasA11yRefocus={{false}}>
        <:header>
          <span id="test-side-nav-header" />
        </:header>
        <:body>
          <span id="test-side-nav-body" />
        </:body>
        <:footer>
          <span id="test-side-nav-footer" />
        </:footer>
      </Hds::SideNav>
    `);
    assert.dom('#test-side-nav-header').exists();
    assert.dom('#test-side-nav-body').exists();
    assert.dom('#test-side-nav-footer').exists();
  });

  // A11Y

  test('it renders the `a11y-refocus` elements by default with a default skip link href value of "#hds-main', async function (assert) {
    await render(hbs`<Hds::SideNav />`);
    assert.dom('#ember-a11y-refocus-nav-message').exists();
    assert
      .dom('#ember-a11y-refocus-skip-link')
      .exists()
      .hasAttribute('href', '#hds-main');
  });

  test('it renders the `a11y-refocus` elements with the right properties provided as arguments', async function (assert) {
    await render(hbs`
      <Hds::SideNav
        @a11yRefocusSkipTo="test-skip-to"
        @a11yRefocusSkipText="test-skip-text"
        @a11yRefocusNavigationText="test-navigation-text"
      />
    `);
    assert
      .dom('#ember-a11y-refocus-nav-message')
      .hasText('test-navigation-text');
    assert.dom('#ember-a11y-refocus-skip-link').hasText('test-skip-text');
    assert
      .dom('#ember-a11y-refocus-skip-link')
      .hasAttribute('href', '#test-skip-to');
  });

  test('it does not render the `a11y-refocus` elements if `hasA11yRefocus` is false', async function (assert) {
    await render(hbs`<Hds::SideNav @hasA11yRefocus={{false}} />`);
    assert.dom('#ember-a11y-refocus-nav-message').doesNotExist();
    assert.dom('#ember-a11y-refocus-skip-link').doesNotExist();
  });

  // RESPONSIVENESS

  test('it is "desktop" by default', async function (assert) {
    await render(hbs`<Hds::SideNav id="test-side-nav" />`);
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-desktop');
  });

  test('it is "responsive" by default', async function (assert) {
    await render(hbs`<Hds::SideNav id="test-side-nav" />`);
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-responsive');
  });

  test('it is not "responsive" if `isResponsive` is false', async function (assert) {
    await render(
      hbs`<Hds::SideNav id="test-side-nav" @isResponsive={{false}} />`
    );
    assert
      .dom('#test-side-nav')
      .doesNotHaveClass('hds-side-nav--is-responsive');
  });

  // MOBILE

  test('it is "mobile" on narrow viewports', async function (assert) {
    await render(hbs`
      <style>:root {--hds-app-desktop-breakpoint: 10088px}</style>
      <Hds::SideNav id="test-side-nav" />
    `);
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-mobile');
  });

  test('it is minimized/collapsed on narrow viewports by default', async function (assert) {
    await render(hbs`
      <style>:root {--hds-app-desktop-breakpoint: 10088px}</style>
      <Hds::SideNav id="test-side-nav" />
    `);
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');
  });

  test('it is not minimized/collapsed on narrow viewports if `isResponsive` is false', async function (assert) {
    await render(hbs`
      <style>:root {--hds-app-desktop-breakpoint: 10088px}</style>
      <Hds::SideNav id="test-side-nav" @isResponsive={{false}} />
    `);
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-not-minimized');
  });

  test('it shows a toggle button on narrow viewports by default', async function (assert) {
    await render(hbs`
      <style>:root {--hds-app-desktop-breakpoint: 10088px}</style>
      <Hds::SideNav id="test-side-nav" />
    `);
    assert.dom('.hds-side-nav__toggle-button').exists();
  });

  test('it does not show a toggle button on narrow viewports if `isResponsive` is false', async function (assert) {
    await render(hbs`
      <style>:root {--hds-app-desktop-breakpoint: 10088px}</style>
      <Hds::SideNav id="test-side-nav" @isResponsive={{false}} />
    `);
    assert.dom('.hds-side-nav__toggle-button').doesNotExist();
  });

  test('it expands/collapses when the toggle button is pressed on narrow viewports', async function (assert) {
    await render(hbs`
      <style>:root {--hds-app-desktop-breakpoint: 10088px}</style>
      <Hds::SideNav id="test-side-nav" />
    `);
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');

    await click('.hds-side-nav__toggle-button');
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-not-minimized');
    await click('.hds-side-nav__toggle-button');
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');
  });

  test('it collapses when the ESC key is pressed on narrow viewports', async function (assert) {
    await render(hbs`
      <style>:root {--hds-app-desktop-breakpoint: 10088px}</style>
      <Hds::SideNav id="test-side-nav">
        <:header as |H|>
          <span id="test-side-nav-header" data-test-minimized={{H.isMinimized}} />
        </:header>
        <:body as |B|>
          <span id="test-side-nav-body" data-test-minimized={{B.isMinimized}} />
          <span class="hds-side-nav-hide-when-minimized" />
        </:body>
        <:footer as |F|>
          <span id="test-side-nav-footer" data-test-minimized={{F.isMinimized}} />
        </:footer>
      </Hds::SideNav>
    `);
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');
    await click('.hds-side-nav__toggle-button');
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-not-minimized');

    await triggerKeyEvent('#test-side-nav', 'keydown', 'Escape');
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');
    assert.dom('.hds-side-nav-hide-when-minimized').hasAttribute('inert');
  });

  // COLLAPSIBLE

  test('it responds to different events to toggle between "non-minimized" (by default) and "mimimized" states', async function (assert) {
    await render(
      hbs`<Hds::SideNav @isCollapsible={{true}} id="test-side-nav" />`
    );
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-not-minimized');

    await click('.hds-side-nav__toggle-button');
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');

    await click('.hds-side-nav__toggle-button');
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-not-minimized');
  });

  test('the "non-minimized" and "minimized" states have impact on its internal properties', async function (assert) {
    await render(hbs`
      <Hds::SideNav @isCollapsible={{true}} id="test-side-nav">
        <:header as |H|>
          <span id="test-side-nav-header" data-test-minimized={{H.isMinimized}} />
        </:header>
        <:body as |B|>
          <span id="test-side-nav-body" data-test-minimized={{B.isMinimized}} />
          <span class="hds-side-nav-hide-when-minimized" />
        </:body>
        <:footer as |F|>
          <span id="test-side-nav-footer" data-test-minimized={{F.isMinimized}} />
        </:footer>
      </Hds::SideNav>
    `);
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-not-minimized');
    assert
      .dom('.hds-side-nav__toggle-button')
      .hasAttribute('aria-expanded', 'true');
    assert
      .dom('.hds-side-nav__toggle-button .hds-icon')
      .hasClass('hds-icon-chevrons-left');
    assert
      .dom('#test-side-nav-header')
      .doesNotHaveAttribute('data-test-minimized');
    assert
      .dom('#test-side-nav-body')
      .doesNotHaveAttribute('data-test-minimized');
    assert
      .dom('#test-side-nav-footer')
      .doesNotHaveAttribute('data-test-minimized');
    assert
      .dom('.hds-side-nav-hide-when-minimized')
      .doesNotHaveAttribute('inert');
    assert.dom('#test-side-nav-body').doesNotHaveAttribute('inert');

    await click('.hds-side-nav__toggle-button');

    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');
    assert
      .dom('.hds-side-nav__toggle-button')
      .hasAttribute('aria-expanded', 'false');
    assert
      .dom('.hds-side-nav__toggle-button .hds-icon')
      .hasClass('hds-icon-chevrons-right');
    assert.dom('#test-side-nav-header').hasAttribute('data-test-minimized');
    assert.dom('#test-side-nav-body').hasAttribute('data-test-minimized');
    assert.dom('#test-side-nav-footer').hasAttribute('data-test-minimized');
    assert.dom('.hds-side-nav-hide-when-minimized').hasAttribute('inert');
    assert.dom('#test-side-nav-body').doesNotHaveAttribute('inert');
  });

  test('when the viewport changes from desktop to mobile, it automatically collapses and becomes inert', async function (assert) {
    this.mockMedia();

    let calls = [];
    this.setProperties({
      onDesktopViewportChange: (...args) => calls.push(args),
    });

    await render(hbs`
      <Hds::SideNav @isCollapsible={{true}} @onDesktopViewportChange={{this.onDesktopViewportChange}}>
        <:header as |H|>
          <span id="test-side-nav-header" data-test-minimized={{H.isMinimized}} />
        </:header>
        <:body as |B|>
          <span id="test-side-nav-body" data-test-minimized={{B.isMinimized}} />
          <span class="hds-side-nav-hide-when-minimized" />
        </:body>
        <:footer as |F|>
          <span id="test-side-nav-footer" data-test-minimized={{F.isMinimized}} />
        </:footer>
      </Hds::SideNav>
    `);

    assert.strictEqual(calls.length, 1, 'called with initial viewport');

    await this.changeBrowserSize(false);
    assert.deepEqual(
      calls[1],
      [false],
      'resizing to mobile triggers a false event'
    );

    assert.dom('.hds-side-nav-hide-when-minimized').hasAttribute('inert');
  });

  test('when collapsed and the viewport changes from mobile to desktop, it automatically expands and is no longer inert', async function (assert) {
    this.mockMedia();

    let calls = [];
    this.setProperties({
      onDesktopViewportChange: (...args) => calls.push(args),
    });

    await render(hbs`
      <Hds::SideNav @isCollapsible={{true}} @onDesktopViewportChange={{this.onDesktopViewportChange}}>
        <:header as |H|>
          <span id="test-side-nav-header" data-test-minimized={{H.isMinimized}} />
        </:header>
        <:body as |B|>
          <span id="test-side-nav-body" data-test-minimized={{B.isMinimized}} />
          <span class="hds-side-nav-hide-when-minimized" />
        </:body>
        <:footer as |F|>
          <span id="test-side-nav-footer" data-test-minimized={{F.isMinimized}} />
        </:footer>
      </Hds::SideNav>
    `);

    await click('.hds-side-nav__toggle-button');
    assert.dom('.hds-side-nav-hide-when-minimized').hasAttribute('inert');

    await this.changeBrowserSize(false);
    assert.deepEqual(
      calls[1],
      [false],
      'resizing to mobile triggers a false event'
    );
    assert.dom('.hds-side-nav-hide-when-minimized').hasAttribute('inert');

    await this.changeBrowserSize(true);
    assert.deepEqual(
      calls[2],
      [true],
      'resizing to desktop triggers a true event'
    );
    assert
      .dom('.hds-side-nav-hide-when-minimized')
      .doesNotHaveAttribute('inert');
  });

  // CALLBACKS

  test('it should call `onToggleMinimizedStatus` function if provided', async function (assert) {
    let toggled = false;
    this.set('onToggleMinimizedStatus', () => (toggled = true));
    await render(
      hbs`<Hds::SideNav @isCollapsible={{true}} @onToggleMinimizedStatus={{this.onToggleMinimizedStatus}} />`
    );
    await click('.hds-side-nav__toggle-button');
    assert.ok(toggled);
  });
});
