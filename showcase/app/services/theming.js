import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ShwThemingService extends Service {
  // undefined means to use the default in the browser, which is "prefers-color-scheme"
  @tracked currentTheme = 'auto';

  getTheme() {
    return this.currentTheme;
    // return localStorage.getItem('shwCurrentTheme');
  }

  setTheme(theme, type, target) {
    // const fullKey = this.#buildKey(key, appName);
    this.currentTheme = theme;
    // localStorage.setItem('shwCurrentTheme', theme);
    console.log('setting theme', theme, type, target);

    const bodyElement = document.querySelector('body');
    bodyElement.removeAttribute('data-shw-theme');
    bodyElement.classList.remove('shw-theme-dark');
    bodyElement.classList.remove('shw-theme-light');

    if (type === 'data-attribute') {
      bodyElement.setAttribute('data-shw-theme', theme);
    } else if (type === 'css-class') {
      bodyElement.classList.add(`shw-theme-${theme}`);
    }
    // }
  }
}
