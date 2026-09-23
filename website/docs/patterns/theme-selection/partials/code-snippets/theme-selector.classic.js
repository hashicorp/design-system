import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

const STORAGE_KEY = 'selected-theme-demo';

const THEMING_OPTIONS = {
  system: { icon: 'monitor', label: 'System' },
  light: { icon: 'sun', label: 'Light' },
  dark: { icon: 'moon', label: 'Dark' },
};

export default class LocalComponent extends Component {
  @service hdsTheming;

  constructor(owner, args) {
    super(owner, args);

    const savedTheme = this.readThemeFromStorage();

    if (savedTheme) {
      this.deferApplyTheme(savedTheme);
    }
  }

  applyTheme(theme) {
    this.hdsTheming.setTheme({ theme });
  }

  deferApplyTheme(theme) {
    setTimeout(() => {
      this.applyTheme(theme);
    });
  }

  get themingOptions() {
    return THEMING_OPTIONS;
  }

  get hasLocalStorage() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  readThemeFromStorage() {
    if (!this.hasLocalStorage) {
      return;
    }

    const storedTheme = window.localStorage.getItem(STORAGE_KEY);

    if (storedTheme === 'system' || storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  }

  storeTheme(theme) {
    if (!this.hasLocalStorage) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, theme);
  }

  @action
  selectTheme(newTheme, close) {
    this.hdsTheming.setTheme({
      theme: newTheme,
      onSetTheme: () => {
        this.storeTheme(newTheme);
      },
    });

    close();
  }
}
