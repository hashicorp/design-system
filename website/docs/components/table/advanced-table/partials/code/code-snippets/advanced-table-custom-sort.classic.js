import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import CLUSTER_DATA from 'website/mocks/cluster-data';

// we use an array to declare the custom sorting order for the clusters' status
const customSortingCriteriaArray = [
  'failing',
  'active',
  'establishing',
  'pending',
];

export default class LocalComponent extends Component {
  @tracked customSortOrder = 'asc';

  get myDemoData() {
    return CLUSTER_DATA;
  }

  get customSortingFunction() {
    return (s1, s2) => {
      const index1 = customSortingCriteriaArray.indexOf(s1['status']);
      const index2 = customSortingCriteriaArray.indexOf(s2['status']);
      if (index1 < index2) {
        return this.customSortOrder === 'asc' ? -1 : 1;
      } else if (index1 > index2) {
        return this.customSortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    };
  }

  @action
  customOnSort(_sortBy, sortOrder) {
    this.customSortOrder = sortOrder;
  };
}
