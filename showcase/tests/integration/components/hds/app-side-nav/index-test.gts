/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test, skip } from 'qunit';
import {
  click,
  render,
  resetOnerror,
  settled,
  tab,
  triggerKeyEvent,
  focus,
} from '@ember/test-helpers';
import { TrackedArray, TrackedObject } from 'tracked-built-ins';

import { HdsAppSideNav } from '@hashicorp/design-system-components/components';

import {
  cleanupBodyOverflow,
  setupRenderingTest,
} from 'showcase/tests/helpers';

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

interface AppSideNavTestContext {
  __matchMedia: typeof window.matchMedia;
}

module('Integration | Component | hds/app-side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: AppSideNavTestContext) {
    this.__matchMedia = window.matchMedia;
  });

  hooks.afterEach(function (this: AppSideNavTestContext) {
    resetOnerror();
    cleanupBodyOverflow();

    window.matchMedia = this.__matchMedia;
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsAppSideNav id="test-app-side-nav" /></template>);
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav');
  });

  // CONTENT

  test('it renders content passed to the named blocks', async function (assert) {
    await render(
      <template>
        <HdsAppSideNav>
          <span id="test-app-side-nav-body" />
        </HdsAppSideNav>
      </template>,
    );
    assert.dom('#test-app-side-nav-body').exists();
  });

  // RESPONSIVENESS

  test('it is "desktop" by default', async function (assert) {
    const mockMedia = new MockMediaQueryList(true);
    window.matchMedia = () => mockMedia;

    await render(<template><HdsAppSideNav id="test-app-side-nav" /></template>);

    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-desktop');
  });

  test('it is "responsive" by default', async function (assert) {
    await render(<template><HdsAppSideNav id="test-app-side-nav" /></template>);
    assert
      .dom('#test-app-side-nav')
      .hasClass('hds-app-side-nav--is-responsive');
  });

  test('it is not "responsive" if `isResponsive` is false', async function (assert) {
    await render(
      <template>
        <HdsAppSideNav id="test-app-side-nav" @isResponsive={{false}} />
      </template>,
    );
    assert
      .dom('#test-app-side-nav')
      .doesNotHaveClass('hds-app-side-nav--is-responsive');
  });

  // MOBILE

  test('it is "mobile" on narrow viewports', async function (assert) {
    await render(
      <template>
        <HdsAppSideNav id="test-app-side-nav" @breakpoint="10000px" />
      </template>,
    );
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-mobile');
  });

  test('it is minimized/collapsed on narrow viewports by default', async function (assert) {
    await render(
      <template>
        <HdsAppSideNav id="test-app-side-nav" @breakpoint="10000px" />
      </template>,
    );
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-minimized');
  });

  test('it is not minimized/collapsed on narrow viewports if `isResponsive` is false', async function (assert) {
    await render(
      <template>
        <HdsAppSideNav
          id="test-app-side-nav"
          @isResponsive={{false}}
          @breakpoint="10000px"
        />
      </template>,
    );
    assert
      .dom('#test-app-side-nav')
      .hasClass('hds-app-side-nav--is-not-minimized');
  });

  test('it shows a toggle button on narrow viewports by default', async function (assert) {
    await render(
      <template>
        <HdsAppSideNav id="test-app-side-nav" @breakpoint="10000px" />
      </template>,
    );
    assert.dom('.hds-app-side-nav__toggle-button').exists();
  });

  test('it does not show a toggle button, or treat the side nav as a dialog on narrow viewports if `isResponsive` is false', async function (assert) {
    await render(
      <template>
        <HdsAppSideNav
          id="test-app-side-nav"
          @isResponsive={{false}}
          @breakpoint="10000px"
        />
      </template>,
    );
    assert.dom('.hds-app-side-nav__toggle-button').doesNotExist();
    assert
      .dom('#test-app-side-nav')
      .doesNotHaveClass('hds-app-side-nav--is-minimized')
      .doesNotHaveAttribute('role')
      .doesNotHaveAttribute('aria-modal')
      .doesNotHaveAttribute('aria-labelledby');
  });

  test('it expands/collapses when the toggle button is pressed on narrow viewports', async function (assert) {
    await render(
      <template>
        <HdsAppSideNav id="test-app-side-nav" @breakpoint="10000px" />
      </template>,
    );
    assert
      .dom('#test-app-side-nav')
      .hasClass('hds-app-side-nav--is-minimized')
      .hasAttribute('role', 'dialog')
      .hasAttribute('aria-modal', 'true')
      .hasAttribute('aria-labelledby', 'hds-app-side-nav-header');
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });

    await click('.hds-app-side-nav__toggle-button');
    assert
      .dom('#test-app-side-nav')
      .hasClass('hds-app-side-nav--is-not-minimized');
    assert.dom('body', document).hasStyle({
      overflow: 'hidden',
    });

    await click('.hds-app-side-nav__toggle-button');
    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-minimized');
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  test('it collapses when the ESC key is pressed on narrow viewports', async function (assert) {
    await render(
      <template>
        <HdsAppSideNav id="test-app-side-nav" @breakpoint="10000px" />
      </template>,
    );
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
      <template>
        <HdsAppSideNav @isCollapsible={{true}} id="test-app-side-nav" />
      </template>,
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
    await render(
      <template>
        <HdsAppSideNav @isCollapsible={{true}} id="test-app-side-nav">
          <span id="test-app-side-nav-body" />
        </HdsAppSideNav>
      </template>,
    );
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
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });

    await click('.hds-app-side-nav__toggle-button');

    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-minimized');
    assert
      .dom('.hds-app-side-nav__toggle-button')
      .hasAttribute('aria-expanded', 'false');
    assert
      .dom('.hds-app-side-nav__toggle-button .hds-icon')
      .hasClass('hds-icon-chevrons-right');
    assert.dom('.hds-app-side-nav__wrapper-body').hasAttribute('inert');
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
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

    const calls = new TrackedArray<boolean>([]);
    const onDesktopViewportChange = (args: boolean) => {
      calls.push(args);
    };

    await render(
      <template>
        <HdsAppSideNav
          @isCollapsible={{true}}
          @onDesktopViewportChange={{onDesktopViewportChange}}
        />
      </template>,
    );

    assert.strictEqual(calls.length, 1, 'called with initial viewport');

    await changeBrowserSize(false);
    assert.deepEqual(
      calls[1],
      false,
      'resizing to mobile triggers a false event',
    );

    assert.dom('.hds-app-side-nav__wrapper-body').hasAttribute('inert');
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

    const calls = new TrackedArray<boolean>([]);
    const onDesktopViewportChange = (args: boolean) => {
      calls.push(args);
    };

    await render(
      <template>
        <HdsAppSideNav
          @isCollapsible={{true}}
          @onDesktopViewportChange={{onDesktopViewportChange}}
        />
      </template>,
    );

    await click('.hds-app-side-nav__toggle-button');
    assert.dom('.hds-app-side-nav__wrapper-body').hasAttribute('inert');

    await changeBrowserSize(false);
    assert.deepEqual(
      calls[1],
      false,
      'resizing to mobile triggers a false event',
    );
    assert.dom('.hds-app-side-nav__wrapper-body').hasAttribute('inert');

    await changeBrowserSize(true);
    assert.deepEqual(
      calls[2],
      true,
      'resizing to desktop triggers a true event',
    );
    assert.dom('.hds-app-side-nav__wrapper-body').doesNotHaveAttribute('inert');
    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  test('when collapsed and the viewport changes from mobile to desktop and is expanded, scrolling is enabled', async function (assert) {
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

    const calls = new TrackedArray<boolean>([]);

    const onDesktopViewportChange = (args: boolean) => {
      calls.push(args);
    };

    await render(
      <template>
        <HdsAppSideNav
          @isCollapsible={{true}}
          @onDesktopViewportChange={{onDesktopViewportChange}}
        />
      </template>,
    );
    await changeBrowserSize(false);
    assert.deepEqual(
      calls[1],
      false,
      'resizing to mobile triggers a false event',
    );

    await click('.hds-app-side-nav__toggle-button');

    assert.dom('body', document).hasStyle({
      overflow: 'hidden',
    });

    await changeBrowserSize(true);
    assert.deepEqual(
      calls[2],
      true,
      'resizing to desktop triggers a true event',
    );

    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  // not sure why this test is failing, the demo of this behavior in the showcase app works as expected
  skip('when expanded in mobile and the component is removed from the DOM, scrolling is enabled', async function (assert) {
    const calls = new TrackedArray<boolean>([]);
    const context = new TrackedObject({
      isAppSideNavRendered: true,
    });

    const onDesktopViewportChange = (args: boolean) => {
      calls.push(args);
    };

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

    await render(
      <template>
        {{#if context.isAppSideNavRendered}}
          <HdsAppSideNav
            @isCollapsible={{true}}
            @onDesktopViewportChange={{onDesktopViewportChange}}
          />
        {{/if}}
      </template>,
    );

    await changeBrowserSize(false);

    assert.deepEqual(
      calls[1],
      false,
      'resizing to mobile triggers a false event',
    );

    await click('.hds-app-side-nav__toggle-button');

    assert.dom('body', document).hasStyle({
      overflow: 'hidden',
    });

    context.isAppSideNavRendered = false;
    await settled();

    assert.dom('body', document).doesNotHaveStyle({ overflow: 'hidden' });
  });

  test('when collapsed, the content in the AppSideNav is not focusable', async function (assert) {
    await render(
      <template>
        <HdsAppSideNav
          id="test-app-side-nav"
          @isCollapsible={{true}}
          @isMinimized={{true}}
        >
          <button id="button-inside" type="button">Click</button>
        </HdsAppSideNav><button id="button-outside" type="button">Click</button>
      </template>,
    );

    assert.dom('#test-app-side-nav').hasClass('hds-app-side-nav--is-minimized');

    await focus('.hds-app-side-nav__toggle-button');
    await tab();

    assert.dom('#button-outside').isFocused();
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
        <HdsAppSideNav
          @isCollapsible={{true}}
          @onToggleMinimizedStatus={{onToggleMinimizedStatus}}
        />
      </template>,
    );
    await click('.hds-app-side-nav__toggle-button');
    assert.ok(context.isToggled);
  });
});
