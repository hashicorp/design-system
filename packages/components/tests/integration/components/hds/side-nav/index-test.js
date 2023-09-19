/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
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

  test('it renders the `a11y-refocus` elements by default', async function (assert) {
    await render(
      hbs`<Hds::SideNav @hasA11yRefocus={{true}} @a11yRefocusSkipTo="foo" />`
    );
    assert.dom('#ember-a11y-refocus-nav-message').exists();
    assert.dom('#ember-a11y-refocus-skip-link').exists();
  });

  test('it renders the `a11y-refocus` elements with the right properties provided as arguments', async function (assert) {
    await render(hbs`
      <Hds::SideNav
        @hasA11yRefocus={{true}}
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
  // unfortunately it doesn't seems to exist a way to test using a "mobile" viewport
  // so we have to test bits and bobs of the whole responsiveness implementation ¯\_(ツ)_/¯

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

  // COLLAPSIBLE

  test('it responds to different events to toggle between "non-minimized" (by default) and "mimimized" states', async function (assert) {
    await render(
      hbs`<Hds::SideNav @isCollapsible={{true}} id="test-side-nav" />`
    );
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-not-minimized');

    await click('.hds-side-nav__menu-toggle-button');
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');

    await click('.hds-side-nav__menu-toggle-button');
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
        </:body>
        <:footer as |F|>
          <span id="test-side-nav-footer" data-test-minimized={{F.isMinimized}} />
        </:footer>
      </Hds::SideNav>
    `);
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-not-minimized');
    assert
      .dom('.hds-side-nav__menu-toggle-button')
      .hasAttribute('aria-label', 'Close menu');
    assert
      .dom('.hds-side-nav__menu-toggle-button .flight-icon')
      .hasClass('flight-icon-chevrons-left');
    assert
      .dom('#test-side-nav-header')
      .doesNotHaveAttribute('data-test-minimized');
    assert
      .dom('#test-side-nav-body')
      .doesNotHaveAttribute('data-test-minimized');
    assert
      .dom('#test-side-nav-footer')
      .doesNotHaveAttribute('data-test-minimized');

    await click('.hds-side-nav__menu-toggle-button');

    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');
    assert
      .dom('.hds-side-nav__menu-toggle-button')
      .hasAttribute('aria-label', 'Open menu');
    assert
      .dom('.hds-side-nav__menu-toggle-button .flight-icon')
      .hasClass('flight-icon-chevrons-right');
    assert.dom('#test-side-nav-header').hasAttribute('data-test-minimized');
    assert.dom('#test-side-nav-body').hasAttribute('data-test-minimized');
    assert.dom('#test-side-nav-footer').hasAttribute('data-test-minimized');
  });

  // CALLBACKS

  test('it should call `onToggleMinimizedStatus` function if provided', async function (assert) {
    let toggled = false;
    this.set('onToggleMinimizedStatus', () => (toggled = true));
    await render(
      hbs`<Hds::SideNav @isCollapsible={{true}} @onToggleMinimizedStatus={{this.onToggleMinimizedStatus}} />`
    );
    await click('.hds-side-nav__menu-toggle-button');
    assert.ok(toggled);
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @type is provided', async function (assert) {
    const errorMessage =
      '@a11yRefocusSkipTo for NavigatorNarrator (a11y-refocus) in "Hds::SideNav" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::SideNav @hasA11yRefocus={{true}} />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});
