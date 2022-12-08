import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';

import catalog from '@hashicorp/flight-icons/catalog.json';

const DEBOUNCE_MS = 250;

export default class Index extends Component {
  // TODO fix issue with query param not being added to the page URL
  // probably because technically this is a component, while "show" is the actual controller
  queryParams = ['searchQuery', 'selectedIconSize'];

  @tracked searchQuery = null;
  @tracked selectedIconSize = '16';

  get icons() {
    const icons = catalog.assets.map(
      ({ iconName, fileName, size, description }) => {
        return {
          iconName: `${iconName}`,
          name: `${fileName}`,
          size: `${size}`,
          description: `${description}`,
          searchable: `${iconName}, ${description}`,
        };
      }
    );
    return icons;
  }

  get filteredIcons() {
    if (this.searchQuery) {
      return this.icons.filter(
        (i) =>
          i.size === this.selectedIconSize &&
          i.searchable.indexOf(this.searchQuery) !== -1
      );
    } else {
      return this.icons.filter((i) => i.size === this.selectedIconSize);
    }
  }

  @action
  selectIconSize(event) {
    this.selectedIconSize = event.target.value;
  }

  @restartableTask *searchIcons(searchQuery) {
    yield timeout(DEBOUNCE_MS);

    this.searchQuery = searchQuery;
  }
}
