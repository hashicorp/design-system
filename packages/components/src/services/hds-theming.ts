import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

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

  getTheme(): HdsThemes {
    // return localStorage.getItem('hdsCurrentTheme');
    return this._currentTheme;
  }

  setTheme(theme: HdsThemes) {
    console.log('setting HDS theme', theme);

    // IMPORTANT: for this to work, it needs to be the HTML tag (it's the `:root` in CSS)
    const rootElement = document.querySelector('html');

    if (rootElement) {
      if (theme === undefined) {
        rootElement.removeAttribute('data-hds-theme');
      } else {
        rootElement.setAttribute('data-hds-theme', theme);
      }

      // localStorage.setItem('hdsCurrentTheme', theme);
      this._currentTheme = theme;
    }
  }
}
