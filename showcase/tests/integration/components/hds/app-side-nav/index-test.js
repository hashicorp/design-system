/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  setupRenderingTest,
  cleanupBodyOverflow,
} from 'showcase/tests/helpers';
import {
  render,
  click,
  resetOnerror,
  settled,
  triggerKeyEvent,
  tab,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

class MockEventTarget extends EventTarget {}

module('Integration | Component | hds/app-side-nav/index', function (hooks) {
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
        }),
      );
      await settled();
    };
  });

  hooks.afterEach(function () {
    resetOnerror();
    cleanupBodyOverflow();
    window.matchMedia = this.__matchMedia;
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::AppSideNav id='test-app-side-nav' @hasA11yRefocus={{false}} />`,
    );
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav');
  });

  // CONTENT

  test('it renders content passed to the named blocks', async function (assert) {
    await render(hbs`<Hds::AppSideNav @hasA11yRefocus={{false}}>
  <span id='test-app-side-nav-body' />
</Hds::AppSideNav>`);
    assert.dom('#test-app-side-nav-body').exists();
  });

  // RESPONSIVENESS

  test('it is "desktop" by default', async function (assert) {
    await render(hbs`<Hds::AppSideNav id='test-app-side-nav' />`);
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-desktop');
  });

  test('it is "responsive" by default', async function (assert) {
    await render(hbs`<Hds::AppSideNav id='test-app-side-nav' />`);
    assert
      .dom('#test-app-side-nav')
      .hasClass('hds-app-side-nav--is-responsive');
  });

  test('it is not "responsive" if `isResponsive` is false', async function (assert) {
    await render(
      hbs`<Hds::AppSideNav id='test-app-side-nav' @isResponsive={{false}} />`,
    );
    assert
      .dom('#test-app-side-nav')
      .doesNotHaveClass('hds-app-side-nav--is-responsive');
  });

  // MOBILE

  test('it is "mobile" on narrow viewports', async function (assert) {
    await render(
      hbs`<Hds::AppSideNav id='test-app-side-nav' @breakpoint='10000px' />`,
    );
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-mobile');
  });

  test('it is minimized/collapsed on narrow viewports by default', async function (assert) {
    await render(
      hbs`<Hds::AppSideNav id='test-app-side-nav' @breakpoint='10000px' />`,
    );
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-minimized');
  });

  test('it is not minimized/collapsed on narrow viewports if `isResponsive` is false', async function (assert) {
    await render(
      hbs`<Hds::AppSideNav
  id='test-app-side-nav'
  @isResponsive={{false}}
  @breakpoint='10000px'
/>`,
    );
    assert
      .dom('#test-app-side-nav')
      .hasClass('hds-app-side-nav--is-not-minimized');
  });

  test('it shows a toggle button on narrow viewports by default', async function (assert) {
    await render(
      hbs`<Hds::AppSideNav id='test-app-side-nav' @breakpoint='10000px' />`,
    );
    assert.dom('.hds-app-side-nav__toggle-button').exists();
  });

  test('it does not show a toggle button on narrow viewports if `isResponsive` is false', async function (assert) {
    await render(
      hbs`<Hds::AppSideNav
  id='test-app-side-nav'
  @isResponsive={{false}}
  @breakpoint='10000px'
/>`,
    );
    assert.dom('.hds-app-side-nav__toggle-button').doesNotExist();
  });

  test('it expands/collapses when the toggle button is pressed on narrow viewports', async function (assert) {
    await render(
      hbs`<Hds::AppSideNav id='test-app-side-nav' @breakpoint='10000px' />`,
    );
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-minimized');
    assert.dom('body', document).doesNotHaveStyle('overflow');

    await click('.hds-app-side-nav__toggle-button');
    assert
      .dom('#test-app-side-nav')
      .hasClass('hds-app-side-nav--is-not-minimized');
    assert.dom('body', document).hasStyle({
      overflow: 'hidden',
    });

    await click('.hds-app-side-nav__toggle-button');
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-minimized');
    assert.dom('body', document).doesNotHaveStyle('overflow');
  });

  test('it collapses when the ESC key is pressed on narrow viewports', async function (assert) {
    await render(hbs`<Hds::AppSideNav id='test-app-side-nav' @breakpoint='10000px'
/>`);
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-minimized');
    await click('.hds-app-side-nav__toggle-button');
    assert
      .dom('#test-app-side-nav')
      .hasClass('hds-app-side-nav--is-not-minimized');

    await triggerKeyEvent('#test-app-side-nav', 'keydown', 'Escape');
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-minimized');
    assert.dom('.hds-app-side-nav__wrapper-body').hasAttribute('inert');
  });

  // COLLAPSIBLE

  test('it responds to different events to toggle between "non-minimized" (by default) and "mimimized" states', async function (assert) {
    await render(
      hbs`<Hds::AppSideNav @isCollapsible={{true}} id='test-app-side-nav' />`,
    );
    assert
      .dom('#test-app-side-nav')
      .hasClass('hds-app-side-nav--is-not-minimized');

    await click('.hds-app-side-nav__toggle-button');
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-minimized');

    await click('.hds-app-side-nav__toggle-button');
    assert
      .dom('#test-app-side-nav')
      .hasClass('hds-app-side-nav--is-not-minimized');
  });

  test('the "non-minimized" and "minimized" states have impact on its internal properties', async function (assert) {
    await render(hbs`<Hds::AppSideNav @isCollapsible={{true}} id='test-app-side-nav'>
  <span id='test-app-side-nav-body' />
</Hds::AppSideNav>`);
    assert
      .dom('#test-app-side-nav')
      .hasClass('hds-app-side-nav--is-not-minimized');
    assert
      .dom('.hds-app-side-nav__toggle-button')
      .hasAttribute('aria-expanded', 'true');
    assert
      .dom('.hds-app-side-nav__toggle-button .hds-icon')
      .hasClass('hds-icon-chevrons-left');
    assert.dom('.hds-app-side-nav__wrapper-body').doesNotHaveAttribute('inert');
    assert.dom('#test-app-side-nav-body').doesNotHaveAttribute('inert');
    assert.dom('body', document).doesNotHaveStyle('overflow');

    await click('.hds-app-side-nav__toggle-button');

    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-minimized');
    assert
      .dom('.hds-app-side-nav__toggle-button')
      .hasAttribute('aria-expanded', 'false');
    assert
      .dom('.hds-app-side-nav__toggle-button .hds-icon')
      .hasClass('hds-icon-chevrons-right');
    assert.dom('.hds-app-side-nav__wrapper-body').hasAttribute('inert');
    assert.dom('body', document).doesNotHaveStyle('overflow');
  });

  test('when the viewport changes from desktop to mobile, it automatically collapses and becomes inert', async function (assert) {
    this.mockMedia();

    let calls = [];
    this.setProperties({
      onDesktopViewportChange: (...args) => calls.push(args),
    });

    await render(hbs`<Hds::AppSideNav
  @isCollapsible={{true}}
  @onDesktopViewportChange={{this.onDesktopViewportChange}}
/>`);

    assert.strictEqual(calls.length, 1, 'called with initial viewport');

    await this.changeBrowserSize(false);
    assert.deepEqual(
      calls[1],
      [false],
      'resizing to mobile triggers a false event',
    );

    assert.dom('.hds-app-side-nav__wrapper-body').hasAttribute('inert');
  });

  test('when collapsed and the viewport changes from mobile to desktop, it automatically expands and is no longer inert', async function (assert) {
    this.mockMedia();

    let calls = [];
    this.setProperties({
      onDesktopViewportChange: (...args) => calls.push(args),
    });

    await render(hbs`<Hds::AppSideNav
  @isCollapsible={{true}}
  @onDesktopViewportChange={{this.onDesktopViewportChange}}
/>`);

    await click('.hds-app-side-nav__toggle-button');
    assert.dom('.hds-app-side-nav__wrapper-body').hasAttribute('inert');

    await this.changeBrowserSize(false);
    assert.deepEqual(
      calls[1],
      [false],
      'resizing to mobile triggers a false event',
    );
    assert.dom('.hds-app-side-nav__wrapper-body').hasAttribute('inert');

    await this.changeBrowserSize(true);
    assert.deepEqual(
      calls[2],
      [true],
      'resizing to desktop triggers a true event',
    );
    assert.dom('.hds-app-side-nav__wrapper-body').doesNotHaveAttribute('inert');
    assert.dom('body', document).doesNotHaveStyle('overflow');
  });

  test('when collapsed and the viewport changes from mobile to desktop and is expanded, scrolling is enabled', async function (assert) {
    this.mockMedia();

    let calls = [];
    this.setProperties({
      onDesktopViewportChange: (...args) => calls.push(args),
    });

    await render(hbs`<Hds::AppSideNav
  @isCollapsible={{true}}
  @onDesktopViewportChange={{this.onDesktopViewportChange}}
/>`);
    await this.changeBrowserSize(false);
    assert.deepEqual(
      calls[1],
      [false],
      'resizing to mobile triggers a false event',
    );

    await click('.hds-app-side-nav__toggle-button');

    assert.dom('body', document).hasStyle({
      overflow: 'hidden',
    });

    await this.changeBrowserSize(true);
    assert.deepEqual(
      calls[2],
      [true],
      'resizing to desktop triggers a true event',
    );

    assert.dom('body', document).doesNotHaveStyle('overflow');
  });

  test('when expanded in mobile and the component is removed from the DOM, scrolling is enabled', async function (assert) {
    this.mockMedia();

    let calls = [];
    this.setProperties({
      onDesktopViewportChange: (...args) => calls.push(args),
    });

    this.set('isAppSideNavRendered', true);

    await render(hbs`{{#if this.isAppSideNavRendered}}
  <Hds::AppSideNav
    @isCollapsible={{true}}
    @onDesktopViewportChange={{this.onDesktopViewportChange}}
  />
{{/if}}`);

    await this.changeBrowserSize(false);

    assert.deepEqual(
      calls[1],
      [false],
      'resizing to mobile triggers a false event',
    );

    await click('.hds-app-side-nav__toggle-button');

    assert.dom('body', document).hasStyle({
      overflow: 'hidden',
    });

    this.set('isAppSideNavRendered', false);

    assert.dom('body', document).doesNotHaveStyle('overflow');
  });

  test('when collapsed, the content in the AppSideNav is not focusable', async function (assert) {
    await render(hbs`<Hds::AppSideNav
    id='test-app-side-nav'
  @isCollapsible={{true}}
>
  <button id='button-inside' type="button">Click</button>
</Hds::AppSideNav><button id='button-outside' type="button">Click</button>`);

    await click('.hds-app-side-nav__toggle-button');
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-minimized');
    assert.dom('.hds-app-side-nav__toggle-button').isFocused();

    await tab();
    assert.dom('#button-outside').isFocused();
  });

  // CALLBACKS

  test('it should call `onToggleMinimizedStatus` function if provided', async function (assert) {
    let toggled = false;
    this.set('onToggleMinimizedStatus', () => (toggled = true));
    await render(hbs`<Hds::AppSideNav
  @isCollapsible={{true}}
  @onToggleMinimizedStatus={{this.onToggleMinimizedStatus}}
/>`);
    await click('.hds-app-side-nav__toggle-button');
    assert.ok(toggled);
  });
});
