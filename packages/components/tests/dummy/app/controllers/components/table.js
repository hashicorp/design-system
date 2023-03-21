/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// we use an array to declare the custom sorting order for the clusters' status
const customSortingCriteriaArray = [
  'failing',
  'active',
  'establishing',
  'pending',
];

export default class ComponentsTableController extends Controller {
  @tracked customSortOrderForClusterStatus = 'asc';

  get clustersWithExtraData() {
    return this.model.clusters.map((record) => {
      return {
        ...record,
        'status-sort-order': customSortingCriteriaArray.indexOf(
          record['status']
        ),
      };
    });
  }

  get customSortingMethodForClusterStatus() {
    return (s1, s2) => {
      const index1 = customSortingCriteriaArray.indexOf(s1['status']);
      const index2 = customSortingCriteriaArray.indexOf(s2['status']);
      if (index1 < index2) {
        return this.customSortOrderForClusterStatus === 'asc' ? -1 : 1;
      } else if (index1 > index2) {
        return this.customSortOrderForClusterStatus === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    };
  }

  @action
  customOnSort(_sortBy, sortOrder) {
    this.customSortOrderForClusterStatus = sortOrder;
  }
}
