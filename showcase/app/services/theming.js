import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

const LOCALSTORAGE_KEY = 'shw-current-theme';

export default class ShwThemingService extends Service {
  @tracked _currentTheme = 'none';

  // import the hds-theming service from the `@hashicorp/design-system-components` Ember addon
  @service hdsTheming;

  constructor() {
    super(...arguments);
    this.initializeTheme();
  }

  initializeTheme() {
    const _initialTheme = localStorage.getItem(LOCALSTORAGE_KEY);
    if (_initialTheme) {
      this.setTheme(_initialTheme);
    }
  }

  getTheme() {
    return this._currentTheme;
  }

  setTheme(theme) {
    // console.log('setting SHW theme', theme, this._currentTheme);
    this._currentTheme = theme;
    localStorage.setItem(LOCALSTORAGE_KEY, theme);

    const rootElement = document.querySelector('html');

    if (theme === 'none') {
      this.hdsTheming.setTheme(undefined);
      rootElement.removeAttribute('data-shw-theme');
      this._currentTheme = undefined;
    } else {
      this.hdsTheming.setTheme(theme);
      rootElement.setAttribute('data-shw-theme', theme);
      this._currentTheme = theme;
    }
  }
}
