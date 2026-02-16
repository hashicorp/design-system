import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked isActive = false;

  @action
  activateFlyout() {
    this.isActive = true;
  }

  @action
  deactivateFlyout() {
    this.isActive = false;
  }
}
