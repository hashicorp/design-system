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

// TODO! understand if we really need this
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

export enum HdsCssSelectorsValues {
  Data = 'data',
  Class = 'class',
}

export type HdsThemes = `${HdsThemeValues}`;
export type HdsModes =
  | `${HdsModesBaseValues}`
  | `${HdsModesLightValues}`
  | `${HdsModesDarkValues}`;
export type HdsModesLight = `${HdsModesLightValues}`;
export type HdsModesDark = `${HdsModesDarkValues}`;
export type HdsCssSelectors = `${HdsCssSelectorsValues}`;

type HdsThemingOptions = {
  lightTheme: HdsModesLight;
  darkTheme: HdsModesDark;
  cssSelector: HdsCssSelectors;
  isComplex: boolean;
};

type SetThemeArgs = {
  theme: HdsThemes | undefined;
  options?: HdsThemingOptions;
  onSetTheme?: OnSetThemeCallback;
};

export type OnSetThemeCallbackArgs = {
  currentTheme: HdsThemes | undefined;
  currentMode: HdsModes | undefined;
};

export type OnSetThemeCallback = (args: OnSetThemeCallbackArgs) => void;

export const THEMES: HdsThemes[] = Object.values(HdsThemeValues);
export const MODES_LIGHT: HdsModesLight[] = Object.values(HdsModesLightValues);
export const MODES_DARK: HdsModesDark[] = Object.values(HdsModesDarkValues);
export const MODES: HdsModes[] = [
  ...Object.values(HdsModesBaseValues),
  ...MODES_LIGHT,
  ...MODES_DARK,
];

export const HDS_THEMING_DATA_SELECTOR = 'data-hds-theme';
export const HDS_THEMING_CLASS_SELECTOR_PREFIX = 'hds-theme';

export const HDS_THEMING_LOCALSTORAGE_DATA = 'hds-theming-data';

export const DEFAULT_THEMING_OPTION_LIGHT_THEME = HdsModesLightValues.CdsG0;
export const DEFAULT_THEMING_OPTION_DARK_THEME = HdsModesDarkValues.CdsG100;
export const DEFAULT_THEMING_OPTION_CSS_SELECTOR = 'data';

export default class HdsThemingService extends Service {
  @tracked _currentTheme: HdsThemes | undefined = undefined;
  @tracked _currentMode: HdsModes | undefined = undefined;
  @tracked _currentLightTheme: HdsModesLight =
    DEFAULT_THEMING_OPTION_LIGHT_THEME;
  @tracked _currentDarkTheme: HdsModesDark = DEFAULT_THEMING_OPTION_DARK_THEME;
  @tracked _currentCssSelector: HdsCssSelectors =
    DEFAULT_THEMING_OPTION_CSS_SELECTOR;
  @tracked globalOnSetTheme: OnSetThemeCallback | undefined;

  initializeTheme() {
    const rawStoredThemingData = localStorage.getItem(
      HDS_THEMING_LOCALSTORAGE_DATA
    );
    if (rawStoredThemingData !== null) {
      const storedThemingData: unknown = JSON.parse(rawStoredThemingData);
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
      // if we have new options, we override the current ones (`lightTheme` / `darkTheme` / `cssSelector`)
      // these options can be used by consumers that want to customize how they apply theming
      // (and used by the showcase for the custom theming / theme switching logic)
      if (
        Object.hasOwn(options, 'lightTheme') &&
        Object.hasOwn(options, 'darkTheme') &&
        Object.hasOwn(options, 'cssSelector')
      ) {
        const { lightTheme, darkTheme, cssSelector } = options;

        this._currentLightTheme = lightTheme;
        this._currentDarkTheme = darkTheme;
        this._currentCssSelector = cssSelector;
      } else {
        // fallback if something goes wrong
        this._currentLightTheme = DEFAULT_THEMING_OPTION_LIGHT_THEME;
        this._currentDarkTheme = DEFAULT_THEMING_OPTION_DARK_THEME;
        this._currentCssSelector = DEFAULT_THEMING_OPTION_CSS_SELECTOR;
      }
    }

    // set the current theme/mode (`currentTheme` / `currentMode`)
    let cssSelectorPartial;
    if (
      theme === undefined || // standard (no theming)
      !THEMES.includes(theme) // handle possible errors
    ) {
      this._currentTheme = undefined;
      this._currentMode = undefined;
      cssSelectorPartial = undefined;
    } else if (
      theme === HdsThemeValues.Default // default (original HDS)
    ) {
      this._currentTheme = HdsThemeValues.Default;
      this._currentMode = undefined;
      cssSelectorPartial = HdsThemeValues.Default;
    } else if (
      theme === HdsThemeValues.System // system (prefers-color-scheme)
    ) {
      this._currentTheme = HdsThemeValues.System;
      this._currentMode = undefined;
      cssSelectorPartial = HdsThemeValues.System;
    } else {
      this._currentTheme = theme;
      if (this._currentTheme === HdsThemeValues.Light) {
        this._currentMode = this._currentLightTheme;
      }
      if (this._currentTheme === HdsThemeValues.Dark) {
        this._currentMode = this._currentDarkTheme;
      }
      cssSelectorPartial = options?.isComplex
        ? this._currentMode
        : this._currentTheme;
    }

    // IMPORTANT: for this to work, it needs to be the HTML tag (it's the `:root` in CSS)
    const rootElement = document.querySelector('html');

    if (!rootElement) {
      return;
    }
    // remove or update the CSS selectors applied to the root element (depending on the `theme` argument)
    rootElement.removeAttribute(HDS_THEMING_DATA_SELECTOR);
    const hdsThemingClassesToRemove = Array.from(rootElement.classList).filter(
      (className) =>
        className.startsWith(`${HDS_THEMING_CLASS_SELECTOR_PREFIX}-`)
    );
    rootElement.classList.remove(...hdsThemingClassesToRemove);
    if (cssSelectorPartial !== undefined) {
      if (this._currentCssSelector === 'data') {
        rootElement.setAttribute(HDS_THEMING_DATA_SELECTOR, cssSelectorPartial);
      } else if (this._currentCssSelector === 'class') {
        rootElement.classList.add(
          `${HDS_THEMING_CLASS_SELECTOR_PREFIX}-${cssSelectorPartial}`
        );
      }
    }

    // store the current theme and theming options in local storage (unless undefined)
    localStorage.setItem(
      HDS_THEMING_LOCALSTORAGE_DATA,
      JSON.stringify({
        theme: this._currentTheme,
        options: {
          lightTheme: this._currentLightTheme,
          darkTheme: this._currentDarkTheme,
          cssSelector: this._currentCssSelector,
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
    return this._currentLightTheme ?? DEFAULT_THEMING_OPTION_LIGHT_THEME;
  }

  get currentDarkTheme(): HdsModesDark {
    return this._currentDarkTheme ?? DEFAULT_THEMING_OPTION_DARK_THEME;
  }

  get currentCssSelector(): HdsCssSelectors {
    return this._currentCssSelector ?? DEFAULT_THEMING_OPTION_CSS_SELECTOR;
  }
}
