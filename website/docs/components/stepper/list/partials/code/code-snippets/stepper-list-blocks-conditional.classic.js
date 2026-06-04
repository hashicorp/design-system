import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked showBlocks = true;

  @action
  toggleBlocks() {
    this.showBlocks = !this.showBlocks;
  }
}
