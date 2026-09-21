import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class LocalComponent extends Component {
  @service hdsTheming;

  //...

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
