import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export enum HdsThemeValues {
  // default (original HDS)
  Default = 'default',
  // system settings (prefers-color-scheme)
  System = 'system',
  // user settings for dark/light
  Light = 'light',
  Dark = 'dark',
}

// TODO! understand if we really need this - see: https://hashicorp.atlassian.net/browse/HDS-5681
export enum HdsModesBaseValues {
  Default = 'default',
}

export enum HdsModesLightValues {
  CdsG0 = 'cds-g0',
  CdsG10 = 'cds-g10',
}

export enum HdsModesDarkValues {
  CdsG90 = 'cds-g90',
  CdsG100 = 'cds-g100',
}

export type HdsThemes = `${HdsThemeValues}`;
export type HdsModes =
  | `${HdsModesBaseValues}`
  | `${HdsModesLightValues}`
  | `${HdsModesDarkValues}`;
export type HdsModesLight = `${HdsModesLightValues}`;
export type HdsModesDark = `${HdsModesDarkValues}`;

type HdsThemingOptions = {
  lightTheme: HdsModesLight;
  darkTheme: HdsModesDark;
};

type SetThemeArgs = {
  theme: HdsThemes | undefined;
  options?: HdsThemingOptions;
  onSetTheme?: HdsOnSetThemeCallback;
};

export type HdsOnSetThemeCallbackArgs = {
  currentTheme: HdsThemes | undefined;
  currentMode: HdsModes | undefined;
};

export type HdsOnSetThemeCallback = (args: HdsOnSetThemeCallbackArgs) => void;

export const THEMES: HdsThemes[] = Object.values(HdsThemeValues);
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
        storedThemingData = undefined;
      }
      if (storedThemingData) {
        const { theme, options } = storedThemingData as {
          theme: HdsThemes | undefined;
          options: HdsThemingOptions;
        };
        this.setTheme({
          theme,
          options,
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
