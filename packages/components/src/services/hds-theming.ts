import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

import type Owner from '@ember/owner';

export enum HdsThemeValues {
  // system settings (prefers-color-scheme)
  System = 'system',
  // user settings for dark/light
  Light = 'light',
  Dark = 'dark',
}

enum HdsModesBaseValues {
  Hds = 'hds', // TODO understand if it should be `default`
}

export enum HdsModesLightValues {
  CdsG0 = 'cds-g0',
  CdsG10 = 'cds-g10',
}

export enum HdsModesDarkValues {
  CdsG90 = 'cds-g90',
  CdsG100 = 'cds-g100',
}

export type HdsModeValues =
  | HdsModesBaseValues
  | HdsModesLightValues
  | HdsModesDarkValues;

export enum HdsCssSelectorsValues {
  Data = 'data',
  Class = 'class',
}

export type HdsThemes = `${HdsThemeValues}` | undefined;
export type HdsModes = `${HdsModeValues}` | undefined;
export type HdsModesLight = `${HdsModesLightValues}`;
export type HdsModesDark = `${HdsModesDarkValues}`;
export type HdsCssSelectors = `${HdsCssSelectorsValues}`;

export const THEMES: HdsThemes[] = Object.values(HdsThemeValues);
export const MODES_LIGHT: HdsModesLight[] = Object.values(HdsModesLightValues);
export const MODES_DARK: HdsModesDark[] = Object.values(HdsModesDarkValues);
export const MODES: HdsModes[] = [
  ...Object.values(HdsModesBaseValues),
  ...MODES_LIGHT,
  ...MODES_DARK,
];

export const CSS_SELECTORS: HdsCssSelectors[] = Object.values(
  HdsCssSelectorsValues
);

export const HDS_THEMING_DATA_SELECTOR = 'data-hds-theme';
export const HDS_THEMING_CLASS_SELECTOR_PREFIX = 'hds-theme';
export const HDS_THEMING_CLASS_SELECTORS_LIST = [
  ...MODES_LIGHT,
  ...MODES_DARK,
].map((mode) => `${HDS_THEMING_CLASS_SELECTOR_PREFIX}-${mode}`);
export const HDS_THEMING_LOCALSTORAGE_KEY = 'hds-current-theming-preferences';

export type HdsThemingServiceOptions = {
  // TODO! should we consider `undefined` here, for when the consumers are s
  lightTheme: HdsModesLight; //  | undefined
  darkTheme: HdsModesDark; //  | undefined
  cssSelector: HdsCssSelectors; //  | undefined
};

export type OnSetThemeCallbackOptions = {
  currentTheme: HdsThemes;
  currentMode: HdsModes;
};

export type OnSetThemeCallback = (options: OnSetThemeCallbackOptions) => void;

export const DEFAULT_THEMING_OPTION_LIGHT_THEME = HdsModesLightValues.CdsG0;
export const DEFAULT_THEMING_OPTION_DARK_THEME = HdsModesDarkValues.CdsG100;
export const DEFAULT_THEMING_OPTION_CSS_SELECTOR = 'data';

export default class HdsThemingService extends Service {
  @tracked isInitialized: boolean = false;
  @tracked _currentTheme: HdsThemes = undefined;
  @tracked _currentMode: HdsModes = undefined;
  @tracked _currentLightTheme: HdsModesLight =
    DEFAULT_THEMING_OPTION_LIGHT_THEME;
  @tracked _currentDarkTheme: HdsModesDark = DEFAULT_THEMING_OPTION_DARK_THEME;
  @tracked _currentCssSelector: HdsCssSelectors =
    DEFAULT_THEMING_OPTION_CSS_SELECTOR;
  @tracked globalOnSetTheme: OnSetThemeCallback | undefined;

  constructor(owner: Owner) {
    super(owner);
    console.log('HdsThemingService constructor');
    this.initializeTheme();
  }

  initializeTheme() {
    if (this.isInitialized) {
      return;
    }
    console.log('HdsThemingService > initializeTheme');
    const storedTheme = localStorage.getItem(
      HDS_THEMING_LOCALSTORAGE_KEY
    ) as HdsThemes;
    if (storedTheme) {
      this.setTheme(storedTheme);
    }
    this.isInitialized = true;
  }

  setTheme(theme: HdsThemes, onSetTheme?: OnSetThemeCallback) {
    console.group('🌞 setTheme');

    console.log('🌞 setTheme invoked', `theme=${theme}`);

    // IMPORTANT: for this to work, it needs to be the HTML tag (it's the `:root` in CSS)
    const rootElement = document.querySelector('html');

    if (!rootElement) {
      return;
    }

    // set `currentTheme` and `currentMode`
    if (
      theme === undefined || // standard (no theming)
      !THEMES.includes(theme) // handle possible errors
    ) {
      this._currentTheme = undefined;
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

    // remove or update the CSS selectors applied to the root element (depending on the `theme` argument)
    rootElement.removeAttribute(HDS_THEMING_DATA_SELECTOR);
    rootElement.classList.remove(...HDS_THEMING_CLASS_SELECTORS_LIST);
    if (this._currentMode !== undefined) {
      if (this._currentCssSelector === 'data') {
        rootElement.setAttribute(HDS_THEMING_DATA_SELECTOR, this._currentMode);
      } else if (this._currentCssSelector === 'class') {
        rootElement.classList.add(
          `${HDS_THEMING_CLASS_SELECTOR_PREFIX}-${this._currentMode}`
        );
      }
    }

    // store the current theme in local storage (unless undefined)
    if (this._currentTheme) {
      localStorage.setItem(HDS_THEMING_LOCALSTORAGE_KEY, this._currentTheme);
    } else {
      localStorage.removeItem(HDS_THEMING_LOCALSTORAGE_KEY);
    }

    // this is a general callback that can be defined globally (by extending the service)
    if (this.globalOnSetTheme) {
      console.log('🌞 globalOnSetTheme callback provided');
      this.globalOnSetTheme({
        currentTheme: this._currentTheme,
        currentMode: this._currentMode,
      });
    }

    // this is a "local" callback that can be defined "locally" (eg. in a theme switcher)
    if (onSetTheme) {
      console.log('🌞 onSetTheme callback provided');
      onSetTheme({
        currentTheme: this._currentTheme,
        currentMode: this._currentMode,
      });
    }
    console.groupEnd();
  }

  // this is used for the HDS Showcase and for consumers that want to customize how they apply theming
  setThemingServiceOptions(options: HdsThemingServiceOptions) {
    const { lightTheme, darkTheme, cssSelector } = options;

    console.log(
      '🌞 setThemingServiceOptions invoked',
      `lightTheme=${lightTheme}`,
      `darkTheme=${darkTheme}`,
      `cssSelector=${cssSelector}`
    );

    this._currentLightTheme = lightTheme;
    this._currentDarkTheme = darkTheme;
    this._currentCssSelector = cssSelector;
  }

  // getters used for reactivity in the components/services using this service

  get currentTheme(): HdsThemes {
    return this._currentTheme;
  }

  get currentMode(): HdsModes {
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
