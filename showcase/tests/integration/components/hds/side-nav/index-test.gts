/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  click,
  render,
  resetOnerror,
  settled,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { TrackedArray, TrackedObject } from 'tracked-built-ins';

import { HdsSideNav } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

class MockMediaQueryList extends EventTarget {
  matches: boolean;
  media: string;
  onchange: ((ev: MediaQueryListEvent) => unknown) | null = null;

  constructor(matches: boolean, media: string = '') {
    super();
    this.matches = matches;
    this.media = media;
  }

  addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    super.addEventListener(type, listener);
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
  ) {
    super.removeEventListener(type, listener);
  }

  addListener(): void {}
  removeListener(): void {}

  dispatchEvent(event: Event): boolean {
    if (event.type === 'change' && this.onchange) {
      this.onchange(event as MediaQueryListEvent);
    }
    return super.dispatchEvent(event);
  }
}

interface SideNavTestContext {
  __matchMedia: typeof window.matchMedia;
}

module('Integration | Component | hds/side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: SideNavTestContext) {
    this.__matchMedia = window.matchMedia;
  });

  hooks.afterEach(function (this: SideNavTestContext) {
    resetOnerror();

    window.matchMedia = this.__matchMedia;
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsSideNav id="test-side-nav" @hasA11yRefocus={{false}} />
      </template>,
    );
    assert.dom('#test-side-nav').hasClass('hds-side-nav');
  });

  // CONTENT

  test('it renders content passed to the named blocks', async function (assert) {
    await render(
      <template>
        <HdsSideNav @hasA11yRefocus={{false}}>
          <:header>
            <span id="test-side-nav-header" />
          </:header>
          <:body>
            <span id="test-side-nav-body" />
          </:body>
          <:footer>
            <span id="test-side-nav-footer" />
          </:footer>
        </HdsSideNav>
      </template>,
    );
    assert.dom('#test-side-nav-header').exists();
    assert.dom('#test-side-nav-body').exists();
    assert.dom('#test-side-nav-footer').exists();
  });

  // A11Y

  test('it renders the `a11y-refocus` elements by default with a default skip link href value of "#hds-main', async function (assert) {
    await render(<template><HdsSideNav /></template>);
    assert.dom('#ember-a11y-refocus-nav-message').exists();
    assert
      .dom('#ember-a11y-refocus-skip-link')
      .exists()
      .hasAttribute('href', '#hds-main');
  });

  test('it renders the `a11y-refocus` elements with the right properties provided as arguments', async function (assert) {
    await render(
      <template>
        <HdsSideNav
          @a11yRefocusSkipTo="test-skip-to"
          @a11yRefocusSkipText="test-skip-text"
          @a11yRefocusNavigationText="test-navigation-text"
        />
      </template>,
    );
    assert
      .dom('#ember-a11y-refocus-nav-message')
      .hasText('test-navigation-text');
    assert.dom('#ember-a11y-refocus-skip-link').hasText('test-skip-text');
    assert
      .dom('#ember-a11y-refocus-skip-link')
      .hasAttribute('href', '#test-skip-to');
  });

  test('it does not render the `a11y-refocus` elements if `hasA11yRefocus` is false', async function (assert) {
    await render(<template><HdsSideNav @hasA11yRefocus={{false}} /></template>);
    assert.dom('#ember-a11y-refocus-nav-message').doesNotExist();
    assert.dom('#ember-a11y-refocus-skip-link').doesNotExist();
  });

  // RESPONSIVENESS

  test('it is "desktop" by default', async function (assert) {
    await render(<template><HdsSideNav id="test-side-nav" /></template>);
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-desktop');
  });

  test('it is "responsive" by default', async function (assert) {
    await render(<template><HdsSideNav id="test-side-nav" /></template>);
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-responsive');
  });

  test('it is not "responsive" if `isResponsive` is false', async function (assert) {
    await render(
      <template>
        <HdsSideNav id="test-side-nav" @isResponsive={{false}} />
      </template>,
    );
    assert
      .dom('#test-side-nav')
      .doesNotHaveClass('hds-side-nav--is-responsive');
  });

  // MOBILE

  test('it is "mobile" on narrow viewports', async function (assert) {
    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          :root {
            --hds-app-desktop-breakpoint: 10088px;
          }
        </style>
        <HdsSideNav id="test-side-nav" />
      </template>,
    );
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-mobile');
  });

  test('it is minimized/collapsed on narrow viewports by default', async function (assert) {
    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          :root {
            --hds-app-desktop-breakpoint: 10088px;
          }
        </style>
        <HdsSideNav id="test-side-nav" />
      </template>,
    );
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');
  });

  test('it is not minimized/collapsed on narrow viewports if `isResponsive` is false', async function (assert) {
    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          :root {
            --hds-app-desktop-breakpoint: 10088px;
          }
        </style>
        <HdsSideNav id="test-side-nav" @isResponsive={{false}} />
      </template>,
    );
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-not-minimized');
  });

  test('it shows a toggle button on narrow viewports by default', async function (assert) {
    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          :root {
            --hds-app-desktop-breakpoint: 10088px;
          }
        </style>
        <HdsSideNav id="test-side-nav" />
      </template>,
    );
    assert.dom('.hds-side-nav__toggle-button').exists();
  });

  test('it does not show a toggle button on narrow viewports if `isResponsive` is false', async function (assert) {
    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          :root {
            --hds-app-desktop-breakpoint: 10088px;
          }
        </style>
        <HdsSideNav id="test-side-nav" @isResponsive={{false}} />
      </template>,
    );
    assert.dom('.hds-side-nav__toggle-button').doesNotExist();
  });

  test('it expands/collapses when the toggle button is pressed on narrow viewports', async function (assert) {
    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          :root {
            --hds-app-desktop-breakpoint: 10088px;
          }
        </style>
        <HdsSideNav id="test-side-nav" />
      </template>,
    );
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');

    await click('.hds-side-nav__toggle-button');
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-not-minimized');
    await click('.hds-side-nav__toggle-button');
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');
  });

  test('it collapses when the ESC key is pressed on narrow viewports', async function (assert) {
    await render(
      <template>
        {{! template-lint-disable no-forbidden-elements }}
        <style>
          :root {
            --hds-app-desktop-breakpoint: 10088px;
          }
        </style>
        <HdsSideNav id="test-side-nav">
          <:header as |H|>
            <span
              id="test-side-nav-header"
              data-test-minimized={{H.isMinimized}}
            />
          </:header>
          <:body as |B|>
            <span
              id="test-side-nav-body"
              data-test-minimized={{B.isMinimized}}
            />
            <span class="hds-side-nav-hide-when-minimized" />
          </:body>
          <:footer as |F|>
            <span
              id="test-side-nav-footer"
              data-test-minimized={{F.isMinimized}}
            />
          </:footer>
        </HdsSideNav>
      </template>,
    );
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
      <template>
        <HdsSideNav @isCollapsible={{true}} id="test-side-nav" />
      </template>,
    );
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-not-minimized');

    await click('.hds-side-nav__toggle-button');
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-minimized');

    await click('.hds-side-nav__toggle-button');
    assert.dom('#test-side-nav').hasClass('hds-side-nav--is-not-minimized');
  });

  test('the "non-minimized" and "minimized" states have impact on its internal properties', async function (assert) {
    await render(
      <template>
        <HdsSideNav @isCollapsible={{true}} id="test-side-nav">
          <:header as |H|>
            <span
              id="test-side-nav-header"
              data-test-minimized={{H.isMinimized}}
            />
          </:header>
          <:body as |B|>
            <span
              id="test-side-nav-body"
              data-test-minimized={{B.isMinimized}}
            />
            <span class="hds-side-nav-hide-when-minimized" />
          </:body>
          <:footer as |F|>
            <span
              id="test-side-nav-footer"
              data-test-minimized={{F.isMinimized}}
            />
          </:footer>
        </HdsSideNav>
      </template>,
    );
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
    const mockMedia = new MockMediaQueryList(true);

    window.matchMedia = () => mockMedia;

    const changeBrowserSize = async (isDesktop: boolean) => {
      mockMedia.matches = isDesktop;
      mockMedia.dispatchEvent(
        new MediaQueryListEvent('change', {
          matches: isDesktop,
        }),
      );
      await settled();
    };

    const calls = new TrackedArray();
    const onDesktopViewportChange = (args: boolean) => {
      calls.push(args);
    };

    await render(
      <template>
        <HdsSideNav
          @isCollapsible={{true}}
          @onDesktopViewportChange={{onDesktopViewportChange}}
        >
          <:header as |H|>
            <span
              id="test-side-nav-header"
              data-test-minimized={{H.isMinimized}}
            />
          </:header>
          <:body as |B|>
            <span
              id="test-side-nav-body"
              data-test-minimized={{B.isMinimized}}
            />
            <span class="hds-side-nav-hide-when-minimized" />
          </:body>
          <:footer as |F|>
            <span
              id="test-side-nav-footer"
              data-test-minimized={{F.isMinimized}}
            />
          </:footer>
        </HdsSideNav>
      </template>,
    );

    assert.strictEqual(calls.length, 1, 'called with initial viewport');

    await changeBrowserSize(false);
    assert.deepEqual(
      calls[1],
      false,
      'resizing to mobile triggers a false event',
    );

    assert.dom('.hds-side-nav-hide-when-minimized').hasAttribute('inert');
  });

  test('when collapsed and the viewport changes from mobile to desktop, it automatically expands and is no longer inert', async function (assert) {
    const mockMedia = new MockMediaQueryList(true);

    window.matchMedia = () => mockMedia;

    const changeBrowserSize = async (isDesktop: boolean) => {
      mockMedia.matches = isDesktop;
      mockMedia.dispatchEvent(
        new MediaQueryListEvent('change', {
          matches: isDesktop,
        }),
      );
      await settled();
    };

    const calls = new TrackedArray();
    const onDesktopViewportChange = (args: boolean) => {
      calls.push(args);
    };

    await render(
      <template>
        <HdsSideNav
          @isCollapsible={{true}}
          @onDesktopViewportChange={{onDesktopViewportChange}}
        >
          <:header as |H|>
            <span
              id="test-side-nav-header"
              data-test-minimized={{H.isMinimized}}
            />
          </:header>
          <:body as |B|>
            <span
              id="test-side-nav-body"
              data-test-minimized={{B.isMinimized}}
            />
            <span class="hds-side-nav-hide-when-minimized" />
          </:body>
          <:footer as |F|>
            <span
              id="test-side-nav-footer"
              data-test-minimized={{F.isMinimized}}
            />
          </:footer>
        </HdsSideNav>
      </template>,
    );

    await click('.hds-side-nav__toggle-button');
    assert.dom('.hds-side-nav-hide-when-minimized').hasAttribute('inert');

    await changeBrowserSize(false);
    assert.deepEqual(
      calls[1],
      false,
      'resizing to mobile triggers a false event',
    );
    assert.dom('.hds-side-nav-hide-when-minimized').hasAttribute('inert');

    await changeBrowserSize(true);
    assert.deepEqual(
      calls[2],
      true,
      'resizing to desktop triggers a true event',
    );
    assert
      .dom('.hds-side-nav-hide-when-minimized')
      .doesNotHaveAttribute('inert');
  });

  // CALLBACKS

  test('it should call `onToggleMinimizedStatus` function if provided', async function (assert) {
    const context = new TrackedObject({
      isToggled: false,
    });
    const onToggleMinimizedStatus = () => {
      context.isToggled = true;
    };

    await render(
      <template>
        <HdsSideNav
          @isCollapsible={{true}}
          @onToggleMinimizedStatus={{onToggleMinimizedStatus}}
        />
      </template>,
    );
    await click('.hds-side-nav__toggle-button');
    assert.ok(context.isToggled);
  });
});
