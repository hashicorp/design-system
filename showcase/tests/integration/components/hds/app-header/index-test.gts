/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { on } from '@ember/modifier';
import { render, click, triggerKeyEvent, find } from '@ember/test-helpers';

import {
  HdsAppHeader,
  HdsAppHeaderHomeLink,
  HdsButton,
} from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/app-header/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsAppHeader id="test-app-header" /></template>);
    assert.dom('#test-app-header').hasClass('hds-app-header');
  });

  // CONTENT

  test('it renders content passed into the globalActions and utilityActions named blocks', async function (assert) {
    await render(
      <template>
        <HdsAppHeader>
          <:logo>
            <span id="test-global-item-before">Global Item Before</span>
          </:logo>
          <:globalActions>
            <span id="test-global-item-after">Global Item After</span>
          </:globalActions>
          <:utilityActions>
            <span id="test-utility-item">Utility Item</span>
          </:utilityActions>
        </HdsAppHeader>
      </template>,
    );
    assert.dom('#test-global-item-before').hasText('Global Item Before');
    assert.dom('#test-global-item-after').hasText('Global Item After');
    assert.dom('#test-utility-item').hasText('Utility Item');
  });

  // RESPONSIVENESS

  test('it is "desktop" by default', async function (assert) {
    await render(<template><HdsAppHeader id="test-app-header" /></template>);
    assert.dom('#test-app-header').hasClass('hds-app-header--is-desktop');
  });

  test('it does not show a menu button on wide viewports', async function (assert) {
    await render(<template><HdsAppHeader /></template>);
    assert.dom('.hds-app-header__menu-button').doesNotExist();
  });

  // MOBILE

  // Note: We set a high breakpoint to force the component to render as "mobile"

  test('it is "mobile" on narrow viewports', async function (assert) {
    await render(
      <template>
        <HdsAppHeader id="test-app-header" @breakpoint="10000px" />
      </template>,
    );
    assert.dom('#test-app-header').hasClass('hds-app-header--is-mobile');
  });

  test('it shows a menu button on narrow viewports', async function (assert) {
    await render(<template><HdsAppHeader @breakpoint="10000px" /></template>);
    assert.dom('.hds-app-header__menu-button').exists();
  });

  // Mobile menu functionality
  test(`the actions do not display by default on narrow viewports`, async function (assert) {
    await render(
      <template>
        <HdsAppHeader id="test-app-header" @breakpoint="10000px" />
      </template>,
    );
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');
  });

  test(`the actions show/hide when the menu button is pressed on narrow viewports`, async function (assert) {
    await render(
      <template>
        <HdsAppHeader id="test-app-header" @breakpoint="10000px" />
      </template>,
    );
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');

    await click('.hds-app-header__menu-button');
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-open');

    await click('.hds-app-header__menu-button');
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');
  });

  // Close callback
  test('it should hide the actions when the "close" function is called in mobile view', async function (assert) {
    await render(
      <template>
        <HdsAppHeader id="test-app-header" @breakpoint="10000px">
          <:logo as |actions|>
            <HdsAppHeaderHomeLink
              @icon="hashicorp"
              @text="HashiCorp"
              id="test-home-link"
              {{on "click" actions.close}}
            />
          </:logo>
          <:globalActions as |actions|>
            <HdsButton
              id="test-global-action"
              {{on "click" actions.close}}
              @text="Global action"
            />
          </:globalActions>
          <:utilityActions as |actions|>
            <HdsButton
              id="test-utility-action"
              {{on "click" actions.close}}
              @text="Utility action"
            />
          </:utilityActions>
        </HdsAppHeader>
      </template>,
    );

    // test logo actions close
    await click('.hds-app-header__menu-button');
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-open');
    await click('#test-home-link');
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');

    // test global actions close
    await click('.hds-app-header__menu-button');
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-open');
    await click('#test-global-action');
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');

    // test utility actions close
    await click('.hds-app-header__menu-button');
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-open');
    await click('#test-utility-action');
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');
  });

  test('it should not do anything when the "close" function is called in desktop view', async function (assert) {
    await render(
      <template>
        <HdsAppHeader id="test-app-header">
          <:globalActions as |actions|>
            <HdsButton
              id="test-global-action"
              {{on "click" actions.close}}
              @text="Global action"
            />
          </:globalActions>
          <:utilityActions as |actions|>
            <HdsButton
              id="test-utility-action"
              {{on "click" actions.close}}
              @text="Utility action"
            />
          </:utilityActions>
        </HdsAppHeader>
      </template>,
    );
    assert.dom('#test-app-header').hasClass('hds-app-header--is-desktop');
    assert
      .dom('#test-app-header')
      .doesNotHaveClass('hds-app-header--menu-is-open');
    assert
      .dom('#test-app-header')
      .doesNotHaveClass('hds-app-header--menu-is-closed');

    // test global actions close
    await click('#test-global-action');
    assert.dom('#test-app-header').hasClass('hds-app-header--is-desktop');
    assert
      .dom('#test-app-header')
      .doesNotHaveClass('hds-app-header--menu-is-open');
    assert
      .dom('#test-app-header')
      .doesNotHaveClass('hds-app-header--menu-is-closed');

    // test utility actions close
    await click('#test-utility-action');
    assert.dom('#test-app-header').hasClass('hds-app-header--is-desktop');
    assert
      .dom('#test-app-header')
      .doesNotHaveClass('hds-app-header--menu-is-open');
    assert
      .dom('#test-app-header')
      .doesNotHaveClass('hds-app-header--menu-is-closed');
  });

  // OPTIONS

  // Breakpoint
  // Note: We pass in a high custom breakpoint to force the component to render as "mobile"

  test('it uses the custom passed in breakpoint to control menu display', async function (assert) {
    await render(<template><HdsAppHeader @breakpoint="20000px" /></template>);
    assert.dom('.hds-app-header__menu-button').exists();
  });

  // A11Y

  test(`it displays the correct value for aria-expanded when actions are displayed vs hidden`, async function (assert) {
    await render(<template><HdsAppHeader @breakpoint="10000px" /></template>);
    await click('.hds-app-header__menu-button');
    assert
      .dom('.hds-app-header__menu-button')
      .hasAttribute('aria-expanded', 'true');

    await click('.hds-app-header__menu-button');
    assert
      .dom('.hds-app-header__menu-button')
      .hasAttribute('aria-expanded', 'false');
  });

  test('the actions menu collapses when the ESC key is pressed on narrow viewports', async function (assert) {
    await render(
      <template>
        <HdsAppHeader id="test-app-header" @breakpoint="10000px" />
      </template>,
    );
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');

    await click('.hds-app-header__menu-button');
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-open');

    await triggerKeyEvent('.hds-app-header__actions', 'keydown', 'Escape');
    assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');
  });

  test('the menu button has an aria-controls attribute with a value matching the menu id', async function (assert) {
    await render(<template><HdsAppHeader @breakpoint="10000px" /></template>);
    await click('.hds-app-header__menu-button');
    assert.dom('.hds-app-header__menu-button').hasAttribute('aria-controls');
    assert.dom('.hds-app-header__actions').hasAttribute('id');

    const menuButton = find('.hds-app-header__menu-button');
    const actions = find('.hds-app-header__actions');

    assert.strictEqual(
      menuButton?.getAttribute('aria-controls'),
      actions?.getAttribute('id'),
    );
    // Toggle the menu back to close to avoid interfering with other tests
    await click('.hds-app-header__menu-button');
  });

  // A11Y Refocus

  test('it renders the `a11y-refocus` elements by default with a default skip link href value of "#hds-main', async function (assert) {
    await render(<template><HdsAppHeader /></template>);
    assert.dom('#ember-a11y-refocus-nav-message').exists();
    assert
      .dom('#ember-a11y-refocus-skip-link')
      .exists()
      .hasAttribute('href', '#hds-main');
  });

  test('it renders the `a11y-refocus` elements with the right properties provided as arguments', async function (assert) {
    await render(
      <template>
        <HdsAppHeader
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
    await render(
      <template><HdsAppHeader @hasA11yRefocus={{false}} /></template>,
    );
    assert.dom('#ember-a11y-refocus-nav-message').doesNotExist();
    assert.dom('#ember-a11y-refocus-skip-link').doesNotExist();
  });
});
