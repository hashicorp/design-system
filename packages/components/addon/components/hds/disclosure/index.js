import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HdsDisclosureComponent extends Component {
  // @tracked isExpanded = true;
  @tracked isExpanded = this.args.isExpanded;

  @action
  toggle() {
    console.log('toggle', this.isExpanded);
    this.isExpanded = !this.isExpanded;
  }

  @action
  onDeactivate() {
    console.log('onDeactivate', this.isExpanded);
    this.isExpanded = false;
  }

  @action
  onTrigger() {
    console.log('onTrigger');
    this.toggle();
  }

  @action
  onTestItWorks() {
    console.log('it works!');
  }
}
