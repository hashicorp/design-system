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

  allIcons = catalog.assets.map(
    ({ iconName, fileName, size, description, category }) => {
      category = category.toLowerCase(); // category names in json begin with uppercase letter

      return {
        iconName: `${iconName}`,
        name: `${fileName}`,
        size: `${size}`,
        description: `${description}`,
        category: `${category}`,
        searchable: `${iconName}, ${description}, ${category}`,
      };
    }
  );

  get searchQuery() {
    return this.router.currentRoute.queryParams['searchQuery'];
  }

  get selectedGroupType() {
    return (
      this.router.currentRoute.queryParams['selectedGroupType'] ||
      'alphabetical'
    );
  }

  get selectedIconSize() {
    return this.router.currentRoute.queryParams['selectedIconSize'] || '24';
  }

  get filteredGroupedIcons() {
    let filteredIcons = []; // icons filtered in the search
    const filteredGroupedIcons = {}; // icons grouped by category (after being filtered in the search)

    // 1) Filter icons by search &/or size:
    // Filters all icons based on the search query
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

        if (icon) {
          filteredIcons.push(icon);
        }
      } else {
        filteredIcons = this.allIcons.filter(
          (i) =>
            i.size === this.selectedIconSize &&
            i.searchable.indexOf(this.searchQuery.toLowerCase()) !== -1
        );
      }
    } else {
      filteredIcons = this.allIcons.filter(
        (i) => i.size === this.selectedIconSize
      );
    }

    // 2) Sort icons by Group Type:
    // Sort alphabetically by iconName:
    if (this.selectedGroupType === 'alphabetical') {
      filteredIcons.sort((a, b) => {
        return a.iconName.localeCompare(b.iconName);
      });

      // Sort icons by category, then iconName:
    } else if (this.selectedGroupType === 'category') {
      filteredIcons
        .sort((a, b) => {
          return a.category.localeCompare(b.category);
        })
        .sort((a, b) => {
          if (a.category === b.category) {
            a.iconName.localeCompare(b.iconName);
          }
          return 0;
        });
    }

    // Group icons by category if category type is selected, otherwise group all icons under same "category"
    filteredIcons.forEach((icon) => {
      const category =
        this.selectedGroupType === 'category' ? icon.category : '';
      if (!filteredGroupedIcons[category]) {
        filteredGroupedIcons[category] = [];
      }
      filteredGroupedIcons[category].push(icon);
    });

    // 3) Return icons filtered by search, size &, group type
    return filteredGroupedIcons;
  }

  @action
  selectGroupType(event) {
    this.router.transitionTo({
      queryParams: {
        searchQuery: this.searchQuery,
        selectedIconSize: this.selectedIconSize,
        selectedGroupType: event.target.value,
      },
    });
  }

  @action
  selectIconSize(event) {
    this.router.transitionTo({
      queryParams: {
        searchQuery: this.searchQuery,
        selectedGroupType: this.selectedGroupType,
        selectedIconSize: event.target.value,
      },
    });
  }

  @restartableTask *searchIcons(searchQuery) {
    yield timeout(DEBOUNCE_MS);

    this.router.transitionTo({
      queryParams: {
        searchQuery: searchQuery !== '' ? searchQuery : null,
        selectedGroupType: this.selectedGroupType,
        selectedIconSize: this.selectedIconSize,
      },
    });
  }
}
