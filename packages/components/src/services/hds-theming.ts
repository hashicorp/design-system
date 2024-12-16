import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export const LOCALSTORAGE_KEY = 'hds-current-theme';

export enum HdsThemeValues {
  // `auto` means to use the default in the browser (which depends on what the consumer imports as CSS)
  Auto = 'auto',
  Light = 'light',
  Dark = 'dark',
}

export type HdsThemes = `${HdsThemeValues}` | undefined;

export const THEMES: string[] = Object.values(HdsThemeValues);

export default class HdsThemingService extends Service {
  @tracked _currentTheme: HdsThemes = undefined;

  constructor(owner: object | undefined) {
    super(owner);
    this.initializeTheme();
  }

  initializeTheme() {
    const _initialTheme = localStorage.getItem(LOCALSTORAGE_KEY);
    if (
      _initialTheme === 'auto' ||
      _initialTheme === 'light' ||
      _initialTheme === 'dark'
    ) {
      this.setTheme(_initialTheme);
    }
  }

  getTheme(): HdsThemes {
    return this._currentTheme;
  }

  setTheme(theme: HdsThemes) {
    // console.log('setting HDS theme', theme);

    if (theme === undefined) {
      localStorage.removeItem(LOCALSTORAGE_KEY);
    } else {
      localStorage.setItem(LOCALSTORAGE_KEY, theme);
    }

    // IMPORTANT: for this to work, it needs to be the HTML tag (it's the `:root` in CSS)
    const rootElement = document.querySelector('html');

    if (rootElement) {
      if (theme === undefined) {
        rootElement.removeAttribute('data-hds-theme');
        this._currentTheme = undefined;
      } else {
        rootElement.setAttribute('data-hds-theme', theme);
        this._currentTheme = theme;
      }
    }
  }
}
