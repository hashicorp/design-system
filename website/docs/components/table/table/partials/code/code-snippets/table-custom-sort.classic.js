import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import CLUSTER_DATA from 'website/mocks/cluster-data';

// we use an array to declare the custom sorting order for the "status" column
const customSortingCriteriaArray = [
  'failing',
  'active',
  'establishing',
  'pending',
];

export default class LocalComponent extends Component {
  // we track the sorting order, so it can be used in the custom sorting function
  @tracked customSortOrderForStatus = 'asc';

  // we define a "getter" that returns a custom sorting function ("s1" and "s2" are data records)
  get customSortingMethodForStatus() {
    return (s1, s2) => {
      const index1 = customSortingCriteriaArray.indexOf(s1['status']);
      const index2 = customSortingCriteriaArray.indexOf(s2['status']);
      if (index1 < index2) {
        return this.customSortOrderForStatus === 'asc' ? -1 : 1;
      } else if (index1 > index2) {
        return this.customSortOrderForStatus === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    };
  }

  get model() {
    return { myDemoData: CLUSTER_DATA };
  }

  // we define a callback function that listens to the `onSort` event in the table, and updates the tracked sort order values accordingly
  @action
  customOnSort(_sortBy, sortOrder) {
    this.customSortOrderForStatus = sortOrder;
  }
}
