import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ShwThemingService extends Service {
  @tracked _currentTheme = 'none';

  // import the hds-theming service from the `@hashicorp/design-system-components` Ember addon
  @service('hds-theming') hdsTheming;
  // @service hdsTheming;

  getTheme() {
    return this._currentThemecurrentTheme;
    // return localStorage.getItem('shwCurrentTheme');
  }

  setTheme(theme, method) {
    this._currentTheme = theme;
    // localStorage.setItem('shwCurrentTheme', theme);
    console.log('setting SHW theme', theme, method);

    const rootElement = document.querySelector('html');

    rootElement.removeAttribute('data-shw-theme');
    rootElement.classList.remove('shw-theme-dark', 'shw-theme-light');

    if (theme === 'none') {
      this.hdsTheming.setTheme(undefined);
      rootElement.classList.remove('shw-theme-dark', 'shw-theme-light');
    }
    if (theme === 'auto') {
      this.hdsTheming.setTheme('auto');
      rootElement.setAttribute('data-shw-theme', 'auto');
      rootElement.classList.remove('shw-theme-dark', 'shw-theme-light');
    }
    if (theme === 'light' || theme === 'dark') {
      this.hdsTheming.setTheme(theme);
      if (method === 'data-attribute') {
        rootElement.setAttribute('data-shw-theme', theme);
        rootElement.classList.remove('shw-theme-dark', 'shw-theme-light');
      } else if (method === 'css-class') {
        rootElement.classList.add(`shw-theme-${theme}`);
        rootElement.removeAttribute('data-shw-theme');
      }
    }
  }
}
