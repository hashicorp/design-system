import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const CUSTOM_FILTER = {
  type: 'generic',
  dismissTagText: 'equals lorem ipsum',
  data: {
    value: 'lorem ipsum',
  },
}

export default class LocalComponent extends Component {
  @tracked demoGenericFilters = {
    'demo-generic': {
      type: 'generic',
      text: 'Generic',
      dismissTagText: 'equals lorem ipsum',
      data: {
        value: 'lorem ipsum',
      },
    }
  };

  @action
  demoUpdateGenericFilters(newFilters) {
    this.demoGenericFilters = newFilters;
  }

  @action
  onGenericFilterUpdate(updateFilter) {
    updateFilter(CUSTOM_FILTER);
  }
}
