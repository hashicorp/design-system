import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

export default class HdsDisclosureComponent extends Component {
  // @tracked isActive = true;
  @tracked isActive = this.args.isActive;
  @tracked isDeactivating = false;

  toggleId = guidFor(this);

  @action
  onToggle() {
    console.log('onToggle', this.isActive);
    this.isActive = !this.isActive;
  }

  // THESE ARE USED FOR DEBUGGING, WILL BE REMOVED
  @action
  onTestItWorks() {
    console.log('it works!');
  }

  @action
  onActivate() {
    console.log(
      'onActivate',
      `isActive=${this.isActive}`,
      `isDeactivating=${this.isDeactivating}`
    );
  }

  @action
  onPostActivate() {
    console.log(
      'onPostActivate',
      `isActive=${this.isActive}`,
      `isDeactivating=${this.isDeactivating}`
    );
  }

  @action
  onDeactivate() {
    console.log(
      'onDeactivate',
      `isActive=${this.isActive}`,
      `isDeactivating=${this.isDeactivating}`
    );
    this.isActive = false;
    this.isDeactivating = true;
  }

  @action
  onPostDeactivate() {
    console.log(
      'onPostDeactivate',
      `isActive=${this.isActive}`,
      `isDeactivating=${this.isDeactivating}`
    );
  }
}
