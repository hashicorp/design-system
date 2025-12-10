/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | hds/theme-switcher/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.themingService = this.owner.lookup('service:hds-theming');
  });

  hooks.afterEach(function () {
    // Reset the theme after each test
    this.themingService.setTheme({ theme: undefined });
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert.dom('#test-theme-switcher').hasClass('hds-theme-switcher-control');
  });

  // TOGGLE SIZE

  test('it should render with small size by default', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .hasClass('hds-dropdown-toggle-button--size-small');
  });

  test('it should render the correct CSS size class if @toggleSize is declared', async function (assert) {
    await render(
      hbs`<Hds::ThemeSwitcher @toggleSize="medium" id="test-theme-switcher" />`,
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .hasClass('hds-dropdown-toggle-button--size-medium');
  });

  // TOGGLE IS FULL WIDTH

  test('it should not be full width by default', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .doesNotHaveClass('hds-button--width-full');
  });

  test('it should render full width if @toggleIsFullWidth is true', async function (assert) {
    await render(
      hbs`<Hds::ThemeSwitcher @toggleIsFullWidth={{true}} id="test-theme-switcher" />`,
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .hasClass('hds-dropdown-toggle-button--width-full');
  });

  // THEME DISPLAY

  test('it should display "Theme" label when no theme is set', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Theme');
  });

  test('it should display "System" label when system theme is set', async function (assert) {
    this.themingService.setTheme({ theme: 'system' });
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('System');
  });

  test('it should display "Light" label when light theme is set', async function (assert) {
    this.themingService.setTheme({ theme: 'light' });
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Light');
  });

  test('it should display "Dark" label when dark theme is set', async function (assert) {
    this.themingService.setTheme({ theme: 'dark' });
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Dark');
  });

  test('it should display "Default" label when default theme is set and hasDefaultOption is true', async function (assert) {
    this.themingService.setTheme({ theme: 'default' });
    await render(
      hbs`<Hds::ThemeSwitcher @hasDefaultOption={{true}} id="test-theme-switcher" />`,
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Default');
  });

  // HAS DEFAULT OPTION

  test('it should not include the "Default" option by default', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').exists({ count: 3 });
    assert.dom('.hds-dropdown-list-item').doesNotContainText('Default');
  });

  test('it should include the "Default" option when `@hasDefaultOption` is `true`', async function (assert) {
    await render(
      hbs`<Hds::ThemeSwitcher @hasDefaultOption={{true}} id="test-theme-switcher" />`,
    );
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').exists({ count: 4 });
    assert.dom('.hds-dropdown-list-item').containsText('Default');
  });

  // HAS SYSTEM OPTION

  test('it should include the "System" option by default', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').containsText('System');
  });

  test('it should not include the "System" option when `@hasSystemOption` is `false`', async function (assert) {
    await render(
      hbs`<Hds::ThemeSwitcher @hasSystemOption={{false}} id="test-theme-switcher" />`,
    );
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').exists({ count: 2 });
    assert.dom('.hds-dropdown-list-item').doesNotContainText('System');
  });

  // THEME SELECTION

  test('it should update the theme in the service and the label in the toggle when a dropdown option is selected', async function (assert) {
    await render(
      hbs`<Hds::ThemeSwitcher @hasDefaultOption={{true}} @hasSystemOption={{true}} id="test-theme-switcher" />`,
    );

    // open the dropdown
    await click('#test-theme-switcher button');

    // click on `Light` theme
    await click('.hds-dropdown-list-item:nth-of-type(3) button');
    assert.strictEqual(
      this.themingService.currentTheme,
      'light',
      'theme service should be updated to `light`',
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Light');

    // click on `Dark` theme
    await click('.hds-dropdown-list-item:nth-of-type(4) button');
    assert.strictEqual(
      this.themingService.currentTheme,
      'dark',
      'theme service should be updated to `dark`',
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Dark');

    // click on `System` theme
    await click('.hds-dropdown-list-item:nth-of-type(2) button');
    assert.strictEqual(
      this.themingService.currentTheme,
      'system',
      'theme service should be updated to `system`',
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('System');

    // click on `Default` theme
    await click('.hds-dropdown-list-item:nth-of-type(1) button');
    assert.strictEqual(
      this.themingService.currentTheme,
      'default',
      'theme service should be updated to `undefined` (default)',
    );
    assert
      .dom('#test-theme-switcher .hds-dropdown-toggle-button')
      .containsText('Default');
  });

  // CALLBACKS

  test('it should call @onSetTheme callback when provided', async function (assert) {
    const onSetTheme = sinon.spy();

    this.set('onSetTheme', onSetTheme);

    await render(
      hbs`<Hds::ThemeSwitcher @onSetTheme={{this.onSetTheme}} id="test-theme-switcher" />`,
    );
    await click('#test-theme-switcher button');

    // change theme
    const lightOptionButton = this.element.querySelector(
      '.hds-dropdown-list-item:nth-of-type(3) button',
    );
    await click(lightOptionButton);

    assert.true(onSetTheme.calledOnce);
  });
});
