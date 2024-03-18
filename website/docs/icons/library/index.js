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

  get selectedIconSize() {
    return this.router.currentRoute.queryParams['selectedIconSize'] || '24';
  }

  get filteredGroupedIcons() {
    let filteredIcons = [];
    const filteredGroupedIcons = {};

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
            i.searchable.indexOf(this.searchQuery) !== -1
        );
      }
    } else {
      filteredIcons = this.allIcons.filter(
        (i) => i.size === this.selectedIconSize
      );
    }

    // alphabetize the filtered icons by category and then by name
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

    // Group all filtered icons by category
    filteredIcons.forEach((icon) => {
      const category = icon.category;
      if (!filteredGroupedIcons[category]) {
        filteredGroupedIcons[category] = [];
      }
      filteredGroupedIcons[category].push(icon);
    });

    return filteredGroupedIcons;
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
