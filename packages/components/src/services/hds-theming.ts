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
  themeMap: {
    [HdsThemeValues.Light]: HdsModesLight | undefined;
    [HdsThemeValues.Dark]: HdsModesDark | undefined;
  };
  cssSelector: HdsCssSelectors | undefined;
};

export const DEFAULT_THEMING_OPTIONS: HdsThemingServiceOptions = {
  themeMap: {
    [HdsThemeValues.Light]: HdsModesLightValues.CdsG0,
    [HdsThemeValues.Dark]: HdsModesDarkValues.CdsG100,
  },
  cssSelector: 'data',
};
export default class HdsThemingService extends Service {
  @tracked isInitialized: boolean = false;
  @tracked currentTheme: HdsThemes = undefined;
  @tracked currentMode: HdsModes = undefined;
  @tracked currentThemingServiceOptions: HdsThemingServiceOptions =
    DEFAULT_THEMING_OPTIONS;

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

  getTheme(): HdsThemes {
    return this.currentTheme;
  }

  setTheme(theme: HdsThemes) {
    console.log('setTheme invoked', `theme=${theme}`);

    // IMPORTANT: for this to work, it needs to be the HTML tag (it's the `:root` in CSS)
    const rootElement = document.querySelector('html');

    if (!rootElement) {
      return;
    }

    // set `currentTheme` and `currentMode`
    if (
      theme === undefined || // standard (no theming)
      theme === HdsThemeValues.System || // system (prefers-color-scheme)
      !THEMES.includes(theme) // handle possible errors
    ) {
      this.currentTheme = undefined;
      this.currentMode = undefined;
    } else {
      this.currentTheme = theme;
      this.currentMode =
        this.currentThemingServiceOptions.themeMap[this.currentTheme];
    }

    // remove or update the CSS selectors applied to the root element (depending on the `theme` argument)
    rootElement.removeAttribute(HDS_THEMING_DATA_SELECTOR);
    rootElement.classList.remove(...HDS_THEMING_CLASS_SELECTORS_LIST);
    if (this.currentMode !== undefined) {
      if (this.currentThemingServiceOptions.cssSelector === 'data') {
        rootElement.setAttribute(HDS_THEMING_DATA_SELECTOR, this.currentMode);
      } else if (this.currentThemingServiceOptions.cssSelector === 'class') {
        rootElement.classList.add(
          `${HDS_THEMING_CLASS_SELECTOR_PREFIX}-${this.currentMode}`
        );
      }
    }

    // store the current theme in local storage (unless undefined)
    if (this.currentTheme) {
      localStorage.setItem(HDS_THEMING_LOCALSTORAGE_KEY, this.currentTheme);
    } else {
      localStorage.removeItem(HDS_THEMING_LOCALSTORAGE_KEY);
    }
  }

  // this is used for the HDS Showcase and for consumers that want to customize how they apply theming
  setThemingServiceOptions(customOptions: HdsThemingServiceOptions) {
    this.currentThemingServiceOptions = customOptions;
  }
}
