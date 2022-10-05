import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ButtonGlimmerComponent extends Component {
  thingy = 'face';

  @tracked count = 0;

  @action
  clickButton() {
    this.count++;
  }
}
