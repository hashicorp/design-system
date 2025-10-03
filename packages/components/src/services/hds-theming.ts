import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

import type Owner from '@ember/owner';

export const HDS_THEMING_DATA_SELECTOR = 'data-hds-theme';
export const HDS_THEMING_CLASS_SELECTOR = 'hds-theme';
export const HDS_THEMING_LOCALSTORAGE_KEY = 'hds-current-theming-preferences';

export enum HdsThemeValues {
  // system settings (prefers-color-scheme)
  System = 'system',
  // user settings for dark/light
  Light = 'light',
  Dark = 'dark',
}

export enum HdsModeValues {
  Hds = 'hds', // TODO understand if it should be `default`
  CdsG0 = 'cds-g0',
  CdsG10 = 'cds-g10',
  CdsG90 = 'cds-g90',
  CdsG100 = 'cds-g100',
}

export type HdsThemes = `${HdsThemeValues}` | undefined;
export type HdsModes = `${HdsModeValues}` | undefined;

export const THEMES: HdsThemes[] = Object.values(HdsThemeValues);
export const MODES: HdsModes[] = Object.values(HdsModeValues);

export type ThemeSelector = 'data' | 'class';

export type HdsThemingServiceOptions = {
  themeMap: {
    [HdsThemeValues.Light]: HdsModeValues.CdsG0 | HdsModeValues.CdsG10;
    [HdsThemeValues.Dark]: HdsModeValues.CdsG90 | HdsModeValues.CdsG100;
  };
  themeSelector: ThemeSelector;
};

export default class HdsThemingService extends Service {
  @tracked currentTheme: HdsThemes = undefined;
  @tracked currentMode: HdsModes = undefined;
  @tracked currentThemingServiceOptions: HdsThemingServiceOptions = {
    themeMap: {
      [HdsThemeValues.Light]: HdsModeValues.CdsG0,
      [HdsThemeValues.Dark]: HdsModeValues.CdsG100,
    },
    themeSelector: 'data',
  };

  constructor(owner: Owner) {
    super(owner);
    console.log('HdsThemingService constructor');
    this.initializeTheme();
  }

  initializeTheme() {
    console.log('HdsThemingService > initializeTheme');
    const storedTheme = localStorage.getItem(
      HDS_THEMING_LOCALSTORAGE_KEY
    ) as HdsThemes;
    if (storedTheme) {
      this.setTheme(storedTheme);
    }
  }

  getTheme(): HdsThemes {
    return this.currentTheme;
  }

  setTheme(theme: HdsThemes) {
    // IMPORTANT: for this to work, it needs to be the HTML tag (it's the `:root` in CSS)
    const rootElement = document.querySelector('html');

    if (!rootElement) {
      return;
    }

    if (theme === undefined || !THEMES.includes(theme)) {
      this.currentTheme = undefined;
      this.currentMode = undefined;
      if (this.currentThemingServiceOptions.themeSelector === 'data') {
        rootElement.removeAttribute(HDS_THEMING_DATA_SELECTOR);
      } else if (this.currentThemingServiceOptions.themeSelector === 'class') {
        rootElement.classList.remove(HDS_THEMING_CLASS_SELECTOR);
      }
      localStorage.removeItem(HDS_THEMING_LOCALSTORAGE_KEY);
    } else {
      this.currentTheme = theme;
      if (theme === HdsThemeValues.System) {
        this.currentMode = undefined;
      } else {
        this.currentMode = this.currentThemingServiceOptions.themeMap[theme];
      }
      if (this.currentThemingServiceOptions.themeSelector === 'data') {
        rootElement.setAttribute(HDS_THEMING_DATA_SELECTOR, this.currentMode);
      } else if (this.currentThemingServiceOptions.themeSelector === 'class') {
        rootElement.classList.add(
          `${HDS_THEMING_CLASS_SELECTOR}-${this.currentMode}`
        );
      }
      localStorage.setItem(HDS_THEMING_LOCALSTORAGE_KEY, theme);
    }
  }

  // this is used for the HDS Showcase and for consumers that want to customize how they apply theming
  setThemingServiceOptions(customOptions: HdsThemingServiceOptions) {
    this.currentThemingServiceOptions = customOptions;
  }
}
