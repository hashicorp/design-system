import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked demoSearchFilters = {
    'search': {
      type: 'search',
      text: 'Search',
      data: {
        value: 'Lorem ipsum',
      },
    }
  };

  @action
  demoUpdateSearchFilters(newFilters) {
    this.demoSearchFilters = newFilters;
  }
}
