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
  HDS_THEMING_LOCALSTORAGE_DATA,
} from '@hashicorp/design-system-components/services/hds-theming';

module('Unit | Service | hds-theming', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.service = this.owner.lookup('service:hds-theming');
  });

  hooks.afterEach(function () {
    // clean up local storage and classes on root element
    window.localStorage.removeItem(HDS_THEMING_LOCALSTORAGE_DATA);
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

  test('initializeTheme() does nothing when localStorage is empty', function (assert) {
    this.service.initializeTheme();
    assert.strictEqual(
      this.service.currentTheme,
      undefined,
      'currentTheme remains undefined',
    );
    assert.strictEqual(
      this.service.currentMode,
      undefined,
      'currentMode remains undefined',
    );
    assert.notOk(
      /hds-theme-/.test(document.documentElement.className),
      'does not add any theme class',
    );
  });

  test('initializeTheme() sets theme from valid localStorage data', function (assert) {
    const storedData = {
      theme: HdsThemeValues.Light,
      options: {
        lightTheme: HdsModesLightValues.CdsG10,
        darkTheme: HdsModesDarkValues.CdsG90,
      },
    };
    window.localStorage.setItem(
      HDS_THEMING_LOCALSTORAGE_DATA,
      JSON.stringify(storedData),
    );

    this.service.initializeTheme();

    assert.strictEqual(
      this.service.currentTheme,
      HdsThemeValues.Light,
      'currentTheme is set from localStorage',
    );
    assert.strictEqual(
      this.service.currentMode,
      HdsModesLightValues.CdsG10,
      'currentMode is set from localStorage',
    );
    assert.strictEqual(
      this.service.currentLightTheme,
      HdsModesLightValues.CdsG10,
      'currentLightTheme is set from localStorage',
    );
    assert.strictEqual(
      this.service.currentDarkTheme,
      HdsModesDarkValues.CdsG90,
      'currentDarkTheme is set from localStorage',
    );
  });

  test('initializeTheme() handles malformed JSON in localStorage', function (assert) {
    window.localStorage.setItem(HDS_THEMING_LOCALSTORAGE_DATA, 'not-json');
    const consoleErrorStub = sinon.stub(console, 'error');

    this.service.initializeTheme();

    assert.strictEqual(
      this.service.currentTheme,
      undefined,
      'currentTheme remains undefined with malformed JSON',
    );
    assert.ok(
      consoleErrorStub.calledOnce,
      'console.error was called for malformed JSON',
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

  test('setTheme() updates localStorage', function (assert) {
    this.service.setTheme({ theme: HdsThemeValues.Dark });
    const storedData = JSON.parse(
      window.localStorage.getItem(HDS_THEMING_LOCALSTORAGE_DATA),
    );
    assert.deepEqual(
      storedData,
      {
        theme: HdsThemeValues.Dark,
        options: {
          lightTheme: DEFAULT_THEMING_OPTION_LIGHT_THEME,
          darkTheme: DEFAULT_THEMING_OPTION_DARK_THEME,
        },
      },
      'localStorage is updated correctly',
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

    // Check localStorage after setting light theme with custom options
    let storedData = JSON.parse(
      window.localStorage.getItem(HDS_THEMING_LOCALSTORAGE_DATA),
    );
    assert.deepEqual(
      storedData,
      {
        theme: HdsThemeValues.Light,
        options: {
          lightTheme: HdsModesLightValues.CdsG10,
          darkTheme: HdsModesDarkValues.CdsG90,
        },
      },
      'localStorage is updated correctly with custom options',
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

    // Check localStorage after switching to dark theme
    storedData = JSON.parse(
      window.localStorage.getItem(HDS_THEMING_LOCALSTORAGE_DATA),
    );
    assert.deepEqual(
      storedData,
      {
        theme: HdsThemeValues.Dark,
        options: {
          lightTheme: HdsModesLightValues.CdsG10,
          darkTheme: HdsModesDarkValues.CdsG90,
        },
      },
      'localStorage preserves custom options when switching themes',
    );
  });

  test('setTheme() triggers local onSetTheme callback', function (assert) {
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
