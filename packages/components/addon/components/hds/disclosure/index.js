import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

export default class HdsDisclosureComponent extends Component {
  // @tracked isExpanded = true;
  @tracked isExpanded = this.args.isExpanded;
  @tracked isDeactivating = false;

  toggleId = guidFor(this);

  @action
  onToggle() {
    console.log('onToggle', this.isExpanded);
    this.isExpanded = !this.isExpanded;
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
      `isExpanded=${this.isExpanded}`,
      `isDeactivating=${this.isDeactivating}`
    );
  }

  @action
  onPostActivate() {
    console.log(
      'onPostActivate',
      `isExpanded=${this.isExpanded}`,
      `isDeactivating=${this.isDeactivating}`
    );
  }

  @action
  onDeactivate() {
    console.log(
      'onDeactivate',
      `isExpanded=${this.isExpanded}`,
      `isDeactivating=${this.isDeactivating}`
    );
    this.isExpanded = false;
    this.isDeactivating = true;
  }

  @action
  onPostDeactivate() {
    console.log(
      'onPostDeactivate',
      `isExpanded=${this.isExpanded}`,
      `isDeactivating=${this.isDeactivating}`
    );
  }
}
