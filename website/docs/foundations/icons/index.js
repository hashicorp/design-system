import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

import catalog from '@hashicorp/flight-icons/catalog.json';

const DEBOUNCE_MS = 250;

export default class Index extends Component {
  @service router;

  @tracked searchQuery = null;
  @tracked selectedIconSize = '16';

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
    if (this.searchQuery) {
      return this.allIcons.filter(
        (i) =>
          i.size === this.selectedIconSize &&
          i.searchable.indexOf(this.searchQuery) !== -1
      );
    } else {
      return this.allIcons.filter((i) => i.size === this.selectedIconSize);
    }
  }

  updateQueryParams() {
    // TODO later when we will have the tabs and sidecar parameters too, we have to preserve them
    const newQueryParams = { queryParams: {} };
    if (this.searchQuery) {
      newQueryParams.queryParams.searchQuery = this.searchQuery;
    }
    if (this.selectedIconSize) {
      newQueryParams.queryParams.selectedIconSize = this.selectedIconSize;
    }
    console.log('updateQueryParams', this.router, newQueryParams);
    // TODO this should work but it doesn't
    // https://api.emberjs.com/ember/4.4/classes/RouterService/methods/transitionTo?anchor=transitionTo
    // maybe related to this? https://github.com/emberjs/ember.js/issues/18282
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
