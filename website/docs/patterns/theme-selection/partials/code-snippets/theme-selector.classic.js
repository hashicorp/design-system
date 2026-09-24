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

  get themingOptions() {
    return THEMING_OPTIONS;
  }

  get hasLocalStorage() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  get hasDOM() {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  storeTheme(theme) {
    if (!this.hasLocalStorage) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, theme);
  }

  @action
  selectTheme(newTheme, close) {
    if (!this.hasDOM) {
      return;
    }

    this.hdsTheming.setTheme({
      theme: newTheme,
      onSetTheme: () => {
        this.storeTheme(newTheme);
      },
    });

    close();
  }
}
