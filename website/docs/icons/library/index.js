/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { restartableTask, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

import catalog from '@hashicorp/flight-icons/catalog.json';

const DEBOUNCE_MS = 250;

export default class Index extends Component {
  @service router;

  allIcons = catalog.assets.map(({ iconName, fileName, size, description }) => {
    return {
      iconName: `${iconName}`,
      name: `${fileName}`,
      size: `${size}`,
      description: `${description}`,
      searchable: `${iconName}, ${description}`,
    };
  });

  get searchQuery() {
    return this.router.currentRoute.queryParams['searchQuery'];
  }

  get selectedIconSize() {
    return this.router.currentRoute.queryParams['selectedIconSize'] || '24';
  }

  get filteredIcons() {
    if (this.searchQuery) {
      // check if the query is for an exact match (prefixed with `icon:`)
      if (this.searchQuery.match(/^icon:/)) {
        const exactIconName = this.searchQuery
          .replace(/^icon:/, '')
          .replace(/(-16|-24)$/, '');
        const icon = this.allIcons.find((i) => {
          return (
            i.iconName === exactIconName && i.size === this.selectedIconSize
          );
        });
        return icon ? [icon] : [];
      } else {
        return this.allIcons.filter(
          (i) =>
            i.size === this.selectedIconSize &&
            i.searchable.indexOf(this.searchQuery) !== -1
        );
      }
    } else {
      return this.allIcons.filter((i) => i.size === this.selectedIconSize);
    }
  }

  @action
  selectIconSize(event) {
    this.router.transitionTo({
      queryParams: {
        searchQuery: this.searchQuery,
        selectedIconSize: event.target.value,
      },
    });
  }

  @restartableTask *searchIcons(searchQuery) {
    yield timeout(DEBOUNCE_MS);

    this.router.transitionTo({
      queryParams: {
        searchQuery: searchQuery !== '' ? searchQuery : null,
        selectedIconSize: this.selectedIconSize,
      },
    });
  }
}
