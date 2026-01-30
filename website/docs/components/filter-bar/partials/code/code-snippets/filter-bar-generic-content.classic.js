import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked demoEmptyFilters = {};

  @action
  demoUpdateEmptyFilters(newFilters) {
    this.demoEmptyFilters = newFilters;
  }
}
