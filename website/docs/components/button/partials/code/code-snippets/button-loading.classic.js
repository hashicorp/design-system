import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ButtonLoading extends Component {
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
}
