import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class LocalComponent extends Component {
  @service hdsTheming;

  get themingOptions() {
    return [
      { theme: 'system', label: 'System' },
      { theme: 'light', label: 'Light' },
      { theme: 'dark', label: 'Dark' },
    ];
  }

  @action
  onClickThemeSwitcherOption(currentTheme) {
    // ...
    this.hdsTheming.setTheme({
      theme: currentTheme,
      onSetTheme: ({ currentTheme }) => {
        localStorage.setItem('hds-theme', currentTheme);
      },
    });
  }
}
