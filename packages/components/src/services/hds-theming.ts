import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

import type Owner from '@ember/owner';

export const LOCALSTORAGE_KEY = 'hds-current-theme';

export enum HdsThemeValues {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

export type HdsThemes = `${HdsThemeValues}` | undefined;

export const THEMES: string[] = Object.values(HdsThemeValues);

export default class HdsThemingService extends Service {
  @tracked currentTheme: HdsThemes = undefined;

  constructor(owner: Owner) {
    super(owner);
    this.initializeTheme();
  }

  initializeTheme() {
    const _initialTheme = localStorage.getItem(LOCALSTORAGE_KEY);
    if (
      _initialTheme === 'system' ||
      _initialTheme === 'light' ||
      _initialTheme === 'dark'
    ) {
      this.setTheme(_initialTheme);
    }
  }

  getTheme(): HdsThemes {
    return this.currentTheme;
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
        this.currentTheme = undefined;
      } else {
        rootElement.setAttribute('data-hds-theme', theme);
        this.currentTheme = theme;
      }
    }
  }
}
