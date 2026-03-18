import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked isOpen = false;

  @action
  activateModal() {
    this.isOpen = true;
  }

  @action
  deactivateModal() {
    this.isOpen = false;
  }

  @action
  submitForm() {
    this.isOpen = false;
  }
}
