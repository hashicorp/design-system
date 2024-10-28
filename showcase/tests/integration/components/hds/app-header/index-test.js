/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module /* , test */ } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
// import { render, click, triggerKeyEvent } from '@ember/test-helpers';
// import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/app-header/index', function (hooks) {
  setupRenderingTest(hooks);

  // DISABLEtest('it should render the component with a CSS class that matches the component name', async function (assert) {
  //   await render(hbs`<Hds::AppHeader id="test-app-header" />`);
  //   assert.dom('#test-app-header').hasClass('hds-app-header');
  // });

  // CONTENT

  // DISABLEtest('it renders content passed into the globalActions and utilityActions named blocks', async function (assert) {
  //   await render(hbs`
  //     <Hds::AppHeader>
  //       <:logo>
  //         <span id="test-global-item-before">Global Item Before</span>
  //       </:logo>
  //       <:globalActions>
  //         <span id="test-global-item-after">Global Item After</span>
  //       </:globalActions>
  //       <:utilityActions>
  //         <span id="test-utility-item">Utility Item</span>
  //       </:utilityActions>
  //     </Hds::AppHeader>
  //   `);
  //   assert.dom('#test-global-item-before').hasText('Global Item Before');
  //   assert.dom('#test-global-item-after').hasText('Global Item After');
  //   assert.dom('#test-utility-item').hasText('Utility Item');
  // });

  // RESPONSIVENESS

  // DISABLEtest('it is "desktop" by default', async function (assert) {
  //   await render(hbs`<Hds::AppHeader id="test-app-header" />`);
  //   assert.dom('#test-app-header').hasClass('hds-app-header--is-desktop');
  // });

  // DISABLEtest('it does not show a menu button on wide viewports', async function (assert) {
  //   await render(hbs`
  //     <Hds::AppHeader />
  //   `);
  //   assert.dom('.hds-app-header__menu-button').doesNotExist();
  // });

  // MOBILE

  // Note: We set a high breakpoint to force the component to render as "mobile"

  // DISABLEtest('it is "mobile" on narrow viewports', async function (assert) {
  //   await render(hbs`
  //     <style>:root {--hds-app-desktop-breakpoint: 10000px}</style>
  //     <Hds::AppHeader id="test-app-header" />
  //   `);
  //   assert.dom('#test-app-header').hasClass('hds-app-header--is-mobile');
  // });

  // DISABLEtest('it shows a menu button on narrow viewports', async function (assert) {
  //   await render(hbs`
  //     <style>:root {--hds-app-desktop-breakpoint: 10000px}</style>
  //     <Hds::AppHeader />
  //   `);
  //   assert.dom('.hds-app-header__menu-button').exists();
  // });

  // Mobile menu functionality
  // DISABLEtest(`the actions do not display by default on narrow viewports`, async function (assert) {
  //   await render(hbs`
  //     <style>:root {--hds-app-desktop-breakpoint: 10000px}</style>
  //     <Hds::AppHeader id="test-app-header" />
  //   `);
  //   assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');
  // });

  // DISABLEtest(`the actions show/hide when the menu button is pressed on narrow viewports`, async function (assert) {
  //   await render(hbs`
  //     <style>:root {--hds-app-desktop-breakpoint: 10000px}</style>
  //     <Hds::AppHeader id="test-app-header" />
  //   `);
  //   assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');

  //   await click('.hds-app-header__menu-button');
  //   assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-open');

  //   await click('.hds-app-header__menu-button');
  //   assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');
  // });

  // OPTIONS

  // Breakpoint
  // Note: We pass in a high custom breakpoint to force the component to render as "mobile"

  // DISABLEtest('it uses the custom passed in breakpoint to control menu display', async function (assert) {
  //   await render(hbs`
  //     <Hds::AppHeader @breakpoint="20000px" />
  //   `);
  //   assert.dom('.hds-app-header__menu-button').exists();
  // });

  // A11Y

  // DISABLEtest(`it displays the correct value for aria-expanded when actions are displayed vs hidden`, async function (assert) {
  //   await render(hbs`
  //     <style>:root {--hds-app-desktop-breakpoint: 10000px}</style>
  //     <Hds::AppHeader />
  //   `);
  //   await click('.hds-app-header__menu-button');
  //   assert
  //     .dom('.hds-app-header__menu-button')
  //     .hasAttribute('aria-expanded', 'true');

  //   await click('.hds-app-header__menu-button');
  //   assert
  //     .dom('.hds-app-header__menu-button')
  //     .hasAttribute('aria-expanded', 'false');
  // });

  // DISABLEtest('the actions menu collapses when the ESC key is pressed on narrow viewports', async function (assert) {
  //   await render(hbs`
  //     <style>:root {--hds-app-desktop-breakpoint: 10000px}</style>
  //     <Hds::AppHeader id="test-app-header" />
  //   `);
  //   assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');

  //   await click('.hds-app-header__menu-button');
  //   assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-open');

  //   await triggerKeyEvent('.hds-app-header__actions', 'keydown', 'Escape');
  //   assert.dom('#test-app-header').hasClass('hds-app-header--menu-is-closed');
  // });

  // DISABLEtest('the menu button has an aria-controls attribute with a value matching the menu id', async function (assert) {
  //   await render(hbs`
  //     <style>:root {--hds-app-desktop-breakpoint: 10000px}</style>
  //     <Hds::AppHeader />
  //   `);
  //   await click('.hds-app-header__menu-button');
  //   assert.dom('.hds-app-header__menu-button').hasAttribute('aria-controls');
  //   assert.dom('.hds-app-header__actions').hasAttribute('id');

  //   assert.strictEqual(
  //     this.element
  //       .querySelector('.hds-app-header__menu-button')
  //       .getAttribute('aria-controls'),
  //     this.element.querySelector('.hds-app-header__actions').getAttribute('id')
  //   );
  // });

  // A11Y Refocus

  // DISABLEtest('it renders the `a11y-refocus` elements by default with a default skip link href value of "#hds-main', async function (assert) {
  //   await render(hbs`<Hds::AppHeader />`);
  //   assert.dom('#ember-a11y-refocus-nav-message').exists();
  //   assert
  //     .dom('#ember-a11y-refocus-skip-link')
  //     .exists()
  //     .hasAttribute('href', '#hds-main');
  // });

  // DISABLEtest('it renders the `a11y-refocus` elements with the right properties provided as arguments', async function (assert) {
  //   await render(hbs`
  //     <Hds::AppHeader
  //       @a11yRefocusSkipTo="test-skip-to"
  //       @a11yRefocusSkipText="test-skip-text"
  //       @a11yRefocusNavigationText="test-navigation-text"
  //     />
  //   `);
  //   assert
  //     .dom('#ember-a11y-refocus-nav-message')
  //     .hasText('test-navigation-text');
  //   assert.dom('#ember-a11y-refocus-skip-link').hasText('test-skip-text');
  //   assert
  //     .dom('#ember-a11y-refocus-skip-link')
  //     .hasAttribute('href', '#test-skip-to');
  // });

  // DISABLEtest('it does not render the `a11y-refocus` elements if `hasA11yRefocus` is false', async function (assert) {
  //   await render(hbs`<Hds::AppHeader @hasA11yRefocus={{false}} />`);
  //   assert.dom('#ember-a11y-refocus-nav-message').doesNotExist();
  //   assert.dom('#ember-a11y-refocus-skip-link').doesNotExist();
  // });
});
