/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

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
      .dom('#test-theme-switcher .hds-button')
      .hasClass('hds-button--size-small');
  });

  test('it should render the correct CSS size class if @toggleSize is declared', async function (assert) {
    await render(
      hbs`<Hds::ThemeSwitcher @toggleSize="medium" id="test-theme-switcher" />`,
    );
    assert
      .dom('#test-theme-switcher .hds-button')
      .hasClass('hds-button--size-medium');
  });

  // TOGGLE IS FULL WIDTH

  test('it should not be full width by default', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert
      .dom('#test-theme-switcher .hds-button')
      .doesNotHaveClass('hds-button--width-full');
  });

  test('it should render full width if @toggleIsFullWidth is true', async function (assert) {
    await render(
      hbs`<Hds::ThemeSwitcher @toggleIsFullWidth={{true}} id="test-theme-switcher" />`,
    );
    assert
      .dom('#test-theme-switcher .hds-button')
      .hasClass('hds-button--width-full');
  });

  // THEME DISPLAY

  test('it should display "Theme" label when no theme is set', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert.dom('#test-theme-switcher .hds-button').containsText('Theme');
  });

  test('it should display "System" label when system theme is set', async function (assert) {
    this.themingService.setTheme({ theme: 'system' });
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert.dom('#test-theme-switcher .hds-button').containsText('System');
  });

  test('it should display "Light" label when light theme is set', async function (assert) {
    this.themingService.setTheme({ theme: 'light' });
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert.dom('#test-theme-switcher .hds-button').containsText('Light');
  });

  test('it should display "Dark" label when dark theme is set', async function (assert) {
    this.themingService.setTheme({ theme: 'dark' });
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert.dom('#test-theme-switcher .hds-button').containsText('Dark');
  });

  test('it should display "Default" label when default theme is set and hasDefaultOption is true', async function (assert) {
    this.themingService.setTheme({ theme: 'default' });
    await render(
      hbs`<Hds::ThemeSwitcher @hasDefaultOption={{true}} id="test-theme-switcher" />`,
    );
    assert.dom('#test-theme-switcher .hds-button').containsText('Default');
  });

  // HAS DEFAULT OPTION

  test('it should not include default option by default', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').exists({ count: 3 });
    assert.dom('.hds-dropdown-list-item').doesNotContainText('Default');
  });

  test('it should include default option when @hasDefaultOption is true', async function (assert) {
    await render(
      hbs`<Hds::ThemeSwitcher @hasDefaultOption={{true}} id="test-theme-switcher" />`,
    );
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').exists({ count: 4 });
    assert.dom('.hds-dropdown-list-item').containsText('Default');
  });

  // HAS SYSTEM OPTION

  test('it should include system option by default', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').containsText('System');
  });

  test('it should not include system option when @hasSystemOption is false', async function (assert) {
    await render(
      hbs`<Hds::ThemeSwitcher @hasSystemOption={{false}} id="test-theme-switcher" />`,
    );
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').exists({ count: 2 });
    assert.dom('.hds-dropdown-list-item').doesNotContainText('System');
  });

  // DROPDOWN INTERACTION

  test('it should open the dropdown when toggle button is clicked', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert.dom('.hds-dropdown-list-item').doesNotExist();
    await click('#test-theme-switcher button');
    assert.dom('.hds-dropdown-list-item').exists();
  });

  // THEME SELECTION

  test('it should update the theme when a theme option is clicked', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    await click('#test-theme-switcher button');

    // Click on Light theme
    const lightOption = [
      ...this.element.querySelectorAll('.hds-dropdown-list-item'),
    ].find((el) => el.textContent.trim() === 'Light');
    await click(lightOption);

    assert.strictEqual(
      this.themingService.currentTheme,
      'light',
      'theme service should be updated to light',
    );
  });

  test('it should update the theme when dark option is clicked', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    await click('#test-theme-switcher button');

    // Click on Dark theme
    const darkOption = [
      ...this.element.querySelectorAll('.hds-dropdown-list-item'),
    ].find((el) => el.textContent.trim() === 'Dark');
    await click(darkOption);

    assert.strictEqual(
      this.themingService.currentTheme,
      'dark',
      'theme service should be updated to dark',
    );
  });

  test('it should call @onSetTheme callback when provided', async function (assert) {
    assert.expect(2);

    this.onSetTheme = (theme) => {
      assert.strictEqual(
        theme,
        'light',
        'callback receives the selected theme',
      );
      assert.step('onSetTheme-called');
    };

    await render(
      hbs`<Hds::ThemeSwitcher @onSetTheme={{this.onSetTheme}} id="test-theme-switcher" />`,
    );
    await click('#test-theme-switcher button');

    // Click on Light theme
    const lightOption = [
      ...this.element.querySelectorAll('.hds-dropdown-list-item'),
    ].find((el) => el.textContent.trim() === 'Light');
    await click(lightOption);

    assert.verifySteps(['onSetTheme-called']);
  });

  // ICONS

  test('it should render the correct icon for system theme', async function (assert) {
    this.themingService.setTheme({ theme: 'system' });
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert.dom('#test-theme-switcher .hds-icon-monitor').exists();
  });

  test('it should render the correct icon for light theme', async function (assert) {
    this.themingService.setTheme({ theme: 'light' });
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert.dom('#test-theme-switcher .hds-icon-sun').exists();
  });

  test('it should render the correct icon for dark theme', async function (assert) {
    this.themingService.setTheme({ theme: 'dark' });
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    assert.dom('#test-theme-switcher .hds-icon-moon').exists();
  });

  test('it should render the correct icon for default theme when enabled', async function (assert) {
    this.themingService.setTheme({ theme: 'default' });
    await render(
      hbs`<Hds::ThemeSwitcher @hasDefaultOption={{true}} id="test-theme-switcher" />`,
    );
    assert.dom('#test-theme-switcher .hds-icon-hashicorp').exists();
  });

  test('it should render icons for all theme options in the dropdown', async function (assert) {
    await render(hbs`<Hds::ThemeSwitcher id="test-theme-switcher" />`);
    await click('#test-theme-switcher button');

    assert.dom('.hds-dropdown-list-item .hds-icon-monitor').exists();
    assert.dom('.hds-dropdown-list-item .hds-icon-sun').exists();
    assert.dom('.hds-dropdown-list-item .hds-icon-moon').exists();
  });
});
