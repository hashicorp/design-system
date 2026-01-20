import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {
  HdsModesBaseValues,
  HdsModesDarkValues,
  HdsModesLightValues,
  HdsThemeValues,
} from './hds-theming-types.ts';

import type {
  HdsModes,
  HdsModesDark,
  HdsModesLight,
  HdsThemes,
  HdsThemingOptions,
  HdsOnSetThemeCallback,
} from './hds-theming-types';

type SetThemeArgs = {
  theme: HdsThemes | undefined;
  options?: HdsThemingOptions;
  onSetTheme?: HdsOnSetThemeCallback;
};

export const THEMES: HdsThemes[] = Object.values(HdsThemeValues);
export const CARBON_THEMES = [
  HdsThemeValues.System,
  HdsThemeValues.Light,
  HdsThemeValues.Dark,
];
export const MODES_LIGHT: HdsModesLight[] = Object.values(HdsModesLightValues);
export const MODES_DARK: HdsModesDark[] = Object.values(HdsModesDarkValues);
export const MODES: HdsModes[] = [
  ...Object.values(HdsModesBaseValues),
  ...MODES_LIGHT,
  ...MODES_DARK,
];

export const HDS_THEMING_LOCALSTORAGE_DATA = 'hds-theming-data';

export const DEFAULT_THEMING_OPTION_LIGHT_THEME = HdsModesLightValues.CdsG0;
export const DEFAULT_THEMING_OPTION_DARK_THEME = HdsModesDarkValues.CdsG100;

type StoredThemingData = {
  theme: HdsThemes | undefined;
  options: HdsThemingOptions;
};

// We use this guard function to check if the data parsed from `localStorage` conforms to the `StoredThemingData` type and so is safe to use.
// This prevents the application from using corrupted, malformed or malicious data, by validating the object structure, theme, and mode values.

function isSafeStoredThemingData(data: unknown): data is StoredThemingData {
  if (typeof data !== 'object' || data === null) return false;

  const d = data as Record<string, unknown>;

  const isSafeThemeData =
    // there is no stored `theme` key in the object (eg. the `default` theme was selected)
    !('theme' in d) ||
    // there is a `theme` value and is one of the valid `HdsThemes`
    d['theme'] === undefined ||
    THEMES.includes(d['theme'] as HdsThemes);

  const options = d['options'] as Record<string, unknown> | undefined;

  const isSafeOptionsData =
    // there is no stored `options` key in the object (eg. it's the first run of the application)
    !('options' in d) ||
    // there is an `options` value and has valid entries
    (typeof options === 'object' &&
      options !== null &&
      'lightTheme' in options &&
      MODES_LIGHT.includes(options['lightTheme'] as HdsModesLight) &&
      'darkTheme' in options &&
      MODES_DARK.includes(options['darkTheme'] as HdsModesDark));

  return isSafeThemeData && isSafeOptionsData;
}

export default class HdsThemingService extends Service {
  @tracked _currentTheme: HdsThemes | undefined = undefined;
  @tracked _currentMode: HdsModes | undefined = undefined;
  @tracked _currentLightTheme: HdsModesLight =
    DEFAULT_THEMING_OPTION_LIGHT_THEME;
  @tracked _currentDarkTheme: HdsModesDark = DEFAULT_THEMING_OPTION_DARK_THEME;
  @tracked globalOnSetTheme: HdsOnSetThemeCallback | undefined;

  initializeTheme() {
    const rawStoredThemingData = localStorage.getItem(
      HDS_THEMING_LOCALSTORAGE_DATA
    );

    if (rawStoredThemingData !== null) {
      let storedThemingData: unknown;
      try {
        storedThemingData = JSON.parse(rawStoredThemingData);
      } catch (error) {
        // malformed JSON in localStorage, ignore and proceed with defaults
        console.error(
          `Error while reading local storage '${HDS_THEMING_LOCALSTORAGE_DATA}' for theming`,
          error
        );
      }

      if (isSafeStoredThemingData(storedThemingData)) {
        this.setTheme({
          theme: storedThemingData.theme,
          options: storedThemingData.options,
        });
      } else {
        // if data is not safe or malformed, reset theming to its defaults
        this.setTheme({
          theme: undefined,
          options: undefined,
        });
      }
    }
  }

  setTheme({ theme, options, onSetTheme }: SetThemeArgs) {
    if (options !== undefined) {
      // if we have new options, we override the current ones (`lightTheme` / `darkTheme`)
      // these options can be used by consumers that want to customize how they apply theming
      // (and used by the showcase for the custom theming / theme switching logic)
      if (
        Object.hasOwn(options, 'lightTheme') &&
        Object.hasOwn(options, 'darkTheme')
      ) {
        const { lightTheme, darkTheme } = options;

        this._currentLightTheme = lightTheme;
        this._currentDarkTheme = darkTheme;
      } else {
        // fallback if something goes wrong
        this._currentLightTheme = DEFAULT_THEMING_OPTION_LIGHT_THEME;
        this._currentDarkTheme = DEFAULT_THEMING_OPTION_DARK_THEME;
      }
    }

    // set the current theme/mode (`currentTheme` / `currentMode`)
    if (
      theme === undefined || // standard (no theming)
      !THEMES.includes(theme) // handle possible errors
    ) {
      this._currentTheme = undefined;
      this._currentMode = undefined;
    } else if (
      theme === HdsThemeValues.Default // default (original HDS)
    ) {
      this._currentTheme = HdsThemeValues.Default;
      this._currentMode = undefined;
    } else if (
      theme === HdsThemeValues.System // system (prefers-color-scheme)
    ) {
      this._currentTheme = HdsThemeValues.System;
      this._currentMode = undefined;
    } else {
      this._currentTheme = theme;
      if (this._currentTheme === HdsThemeValues.Light) {
        this._currentMode = this._currentLightTheme;
      }
      if (this._currentTheme === HdsThemeValues.Dark) {
        this._currentMode = this._currentDarkTheme;
      }
    }

    // IMPORTANT: for this to work, it needs to be the `<html>` tag (it's the `:root` in CSS)
    const rootElement = document.querySelector('html');

    if (!rootElement) {
      return;
    }
    // remove or update the CSS selectors applied to the root element (depending on the `theme`/`mode` arguments)
    const hdsThemingClassesToRemove = Array.from(rootElement.classList).filter(
      (className) => className.match(/^hds-(theme|mode)/)
    );
    rootElement.classList.remove(...hdsThemingClassesToRemove);
    if (this._currentTheme !== undefined) {
      rootElement.classList.add(`hds-theme-${this._currentTheme}`);
    }
    if (this._currentMode !== undefined) {
      rootElement.classList.add(`hds-mode-${this._currentMode}`);
    }

    // store the current theme and theming options in local storage
    localStorage.setItem(
      HDS_THEMING_LOCALSTORAGE_DATA,
      JSON.stringify({
        theme: this._currentTheme,
        options: {
          lightTheme: this._currentLightTheme,
          darkTheme: this._currentDarkTheme,
        },
      })
    );

    // this is a general callback that can be defined globally (by extending the service)
    if (this.globalOnSetTheme) {
      this.globalOnSetTheme({
        currentTheme: this._currentTheme,
        currentMode: this._currentMode,
      });
    }

    // this is a "local" callback that can be defined "locally" (eg. in a theme switcher)
    if (onSetTheme) {
      onSetTheme({
        currentTheme: this._currentTheme,
        currentMode: this._currentMode,
      });
    }
  }

  // getters used for reactivity in the components/services using this service

  get currentTheme(): HdsThemes | undefined {
    return this._currentTheme;
  }

  get carbonThemeEnabled(): boolean {
    return CARBON_THEMES.includes(this._currentTheme as HdsThemeValues);
  }

  get currentMode(): HdsModes | undefined {
    return this._currentMode;
  }

  get currentLightTheme(): HdsModesLight {
    return this._currentLightTheme;
  }

  get currentDarkTheme(): HdsModesDark {
    return this._currentDarkTheme;
  }
}
