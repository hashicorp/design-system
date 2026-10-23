import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class LocalComponent extends Component {
  @service hdsTheming;

  @action
  setTheme(theme) {
    this.hdsTheming.setTheme({ theme });
  }
}
