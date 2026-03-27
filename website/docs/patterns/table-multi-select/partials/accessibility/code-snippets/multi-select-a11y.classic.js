import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LocalComponent extends Component {
  @tracked selectedCount = 10;
  @tracked totalCount = 100;

  @action
  updateSelectedCount() {
    this.selectedCount = this.selectedCount + 1;
  }
}
