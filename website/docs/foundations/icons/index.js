import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

import catalog from '@hashicorp/flight-icons/catalog.json';

const DEBOUNCE_MS = 250;

export default class Index extends Component {
  @service router;

  // query params come from `controllers/show.js` and we access them here because there
  // is no "controller" for individual component documentation routes
  @tracked selectedIconSize =
    this.router.currentRoute.queryParams['selectedIconSize'] || '24';
  @tracked searchQuery = this.router.currentRoute.queryParams['searchQuery'];

  allIcons = catalog.assets.map(({ iconName, fileName, size, description }) => {
    return {
      iconName: `${iconName}`,
      name: `${fileName}`,
      size: `${size}`,
      description: `${description}`,
      searchable: `${iconName}, ${description}`,
    };
  });

  get filteredIcons() {
    const selectedIconSize = this.selectedIconSize;
    if (this.searchQuery) {
      return this.allIcons.filter(
        (i) =>
          i.size === selectedIconSize &&
          i.searchable.indexOf(this.searchQuery) !== -1
      );
    } else {
      return this.allIcons.filter((i) => i.size === selectedIconSize);
    }
  }

  updateQueryParams() {
    const newQueryParams = { queryParams: {} };
    if (this.searchQuery) {
      newQueryParams.queryParams.searchQuery = this.searchQuery;
    } else {
      newQueryParams.queryParams.searchQuery = null;
    }

    if (this.selectedIconSize) {
      newQueryParams.queryParams.selectedIconSize = this.selectedIconSize;
    }
    this.router.transitionTo(newQueryParams);
  }

  @action
  selectIconSize(event) {
    this.selectedIconSize = event.target.value;
    this.updateQueryParams();
  }

  @restartableTask *searchIcons(searchQuery) {
    yield timeout(DEBOUNCE_MS);

    this.searchQuery = searchQuery;
    this.updateQueryParams();
  }
}
