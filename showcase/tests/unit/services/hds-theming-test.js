/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import {
  HdsThemeValues,
  HdsModesLightValues,
  HdsModesDarkValues,
  DEFAULT_THEMING_OPTION_LIGHT_THEME,
  DEFAULT_THEMING_OPTION_DARK_THEME,
} from '@hashicorp/design-system-components/services/hds-theming';

module('Unit | Service | hds-theming', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.service = this.owner.lookup('service:hds-theming');
  });

  hooks.afterEach(function () {
    // clean up classes on root element
    document.documentElement.className = '';
    // restores all sinon spies/stubs/mocks to their original state
    sinon.restore();
  });

  test('it initializes with correct default values', function (assert) {
    assert.strictEqual(
      this.service.currentTheme,
      undefined,
      'currentTheme is initially undefined',
    );
    assert.strictEqual(
      this.service.currentMode,
      undefined,
      'currentMode is initially undefined',
    );
    assert.strictEqual(
      this.service.currentLightTheme,
      DEFAULT_THEMING_OPTION_LIGHT_THEME,
      'currentLightTheme has the correct default value',
    );
    assert.strictEqual(
      this.service.currentDarkTheme,
      DEFAULT_THEMING_OPTION_DARK_THEME,
      'currentDarkTheme has the correct default value',
    );
  });

  test('setTheme() with undefined theme', function (assert) {
    this.service.setTheme({ theme: undefined });
    assert.strictEqual(
      this.service.currentTheme,
      undefined,
      'currentTheme is undefined',
    );
    assert.strictEqual(
      this.service.currentMode,
      undefined,
      'currentMode is undefined',
    );
    assert.notOk(
      /hds-theme-/.test(document.documentElement.className),
      'no theme classes are applied',
    );
  });

  test('setTheme() with Default theme', function (assert) {
    this.service.setTheme({ theme: HdsThemeValues.Default });
    assert.strictEqual(
      this.service.currentTheme,
      HdsThemeValues.Default,
      'currentTheme is Default',
    );
    assert.strictEqual(
      this.service.currentMode,
      undefined,
      'currentMode is undefined',
    );
    assert.ok(
      document.documentElement.classList.contains('hds-theme-default'),
      'hds-theme-default class is applied',
    );
  });

  test('setTheme() with System theme', function (assert) {
    this.service.setTheme({ theme: HdsThemeValues.System });
    assert.strictEqual(
      this.service.currentTheme,
      HdsThemeValues.System,
      'currentTheme is System',
    );
    assert.strictEqual(
      this.service.currentMode,
      undefined,
      'currentMode is undefined',
    );
    assert.ok(
      document.documentElement.classList.contains('hds-theme-system'),
      'hds-theme-system class is applied',
    );
  });

  test('setTheme() with Light theme', function (assert) {
    this.service.setTheme({ theme: HdsThemeValues.Light });
    assert.strictEqual(
      this.service.currentTheme,
      HdsThemeValues.Light,
      'currentTheme is Light',
    );
    assert.strictEqual(
      this.service.currentMode,
      DEFAULT_THEMING_OPTION_LIGHT_THEME,
      'currentMode is the default light mode (cds-g0)',
    );
    assert.ok(
      document.documentElement.classList.contains('hds-theme-light'),
      'hds-theme-light class is applied',
    );
    assert.ok(
      document.documentElement.classList.contains(
        `hds-mode-${DEFAULT_THEMING_OPTION_LIGHT_THEME}`,
      ),
      'hds-mode-cds-g0 class is applied',
    );
  });

  test('setTheme() with Dark theme', function (assert) {
    this.service.setTheme({ theme: HdsThemeValues.Dark });
    assert.strictEqual(
      this.service.currentTheme,
      HdsThemeValues.Dark,
      'currentTheme is Dark',
    );
    assert.strictEqual(
      this.service.currentMode,
      DEFAULT_THEMING_OPTION_DARK_THEME,
      'currentMode is the default dark mode (cds-g100)',
    );
    assert.ok(
      document.documentElement.classList.contains('hds-theme-dark'),
      'hds-theme-dark class is applied',
    );
    assert.ok(
      document.documentElement.classList.contains(
        `hds-mode-${DEFAULT_THEMING_OPTION_DARK_THEME}`,
      ),
      'hds-mode-cds-g100 class is applied',
    );
  });

  test('setTheme() with custom light and dark theme options', function (assert) {
    const options = {
      lightTheme: HdsModesLightValues.CdsG10,
      darkTheme: HdsModesDarkValues.CdsG90,
    };
    this.service.setTheme({ theme: HdsThemeValues.Light, options });
    assert.strictEqual(
      this.service.currentLightTheme,
      HdsModesLightValues.CdsG10,
      'currentLightTheme is updated',
    );
    assert.strictEqual(
      this.service.currentDarkTheme,
      HdsModesDarkValues.CdsG90,
      'currentDarkTheme is updated',
    );
    assert.strictEqual(
      this.service.currentMode,
      HdsModesLightValues.CdsG10,
      'currentMode reflects new light theme',
    );

    assert.ok(
      document.documentElement.classList.contains('hds-theme-light'),
      'hds-theme-light class is applied',
    );
    assert.ok(
      document.documentElement.classList.contains(`hds-mode-cds-g10`),
      'hds-mode-cds-g10 class is applied',
    );

    this.service.setTheme({ theme: HdsThemeValues.Dark });
    assert.strictEqual(
      this.service.currentMode,
      HdsModesDarkValues.CdsG90,
      'currentMode reflects new dark theme',
    );

    assert.ok(
      document.documentElement.classList.contains('hds-theme-dark'),
      'hds-theme-dark class is applied',
    );
    assert.ok(
      document.documentElement.classList.contains(`hds-mode-cds-g90`),
      'hds-mode-cds-g90 class is applied',
    );
  });

  test('setTheme() triggers onSetTheme callback', function (assert) {
    const onSetThemeSpy = sinon.spy();
    this.service.setTheme({
      theme: HdsThemeValues.Light,
      onSetTheme: onSetThemeSpy,
    });
    assert.ok(onSetThemeSpy.calledOnce, 'onSetTheme callback was called');
    assert.ok(
      onSetThemeSpy.calledWith({
        currentTheme: HdsThemeValues.Light,
        currentMode: DEFAULT_THEMING_OPTION_LIGHT_THEME,
      }),
      'onSetTheme callback received correct arguments',
    );
  });

  test('setTheme() triggers global globalOnSetTheme callback', function (assert) {
    const globalOnSetThemeSpy = sinon.spy();
    this.service.globalOnSetTheme = globalOnSetThemeSpy;
    this.service.setTheme({ theme: HdsThemeValues.Dark });
    assert.ok(
      globalOnSetThemeSpy.calledOnce,
      'globalOnSetTheme callback was called',
    );
    assert.ok(
      globalOnSetThemeSpy.calledWith({
        currentTheme: HdsThemeValues.Dark,
        currentMode: DEFAULT_THEMING_OPTION_DARK_THEME,
      }),
      'globalOnSetTheme callback received correct arguments',
    );
  });

  test('getters return correct values', function (assert) {
    assert.expect(4);
    this.service.setTheme({ theme: HdsThemeValues.Light });
    assert.strictEqual(
      this.service.currentTheme,
      HdsThemeValues.Light,
      'currentTheme getter is correct',
    );
    assert.strictEqual(
      this.service.currentMode,
      DEFAULT_THEMING_OPTION_LIGHT_THEME,
      'currentMode getter is correct',
    );
    assert.strictEqual(
      this.service.currentLightTheme,
      DEFAULT_THEMING_OPTION_LIGHT_THEME,
      'currentLightTheme getter is correct',
    );
    assert.strictEqual(
      this.service.currentDarkTheme,
      DEFAULT_THEMING_OPTION_DARK_THEME,
      'currentDarkTheme getter is correct',
    );
  });
});
