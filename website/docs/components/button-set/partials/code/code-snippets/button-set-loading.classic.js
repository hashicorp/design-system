import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked isLoading = false;
  @tracked timer;

  @action
  toggleIsLoading() {
    this.isLoading = !this.isLoading;

    clearTimeout(this.timer);
    // make it go back to the idle state
    this.timer = setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }

  @action
  cancelLoading() {
    this.isLoading = false;
  }
}
