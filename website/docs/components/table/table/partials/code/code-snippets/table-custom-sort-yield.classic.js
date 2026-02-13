import Component from '@glimmer/component';
import { action } from '@ember/object';

import CLUSTER_DATA from 'website/mocks/cluster-data';

export default class Index extends Component {
  @action
  myDemoCustomSortingFunction(sortBy, sortOrder) {
    const myDemoDataArray = [...CLUSTER_DATA];

  // here goes the logic for the custom sorting of the `model` or `data` array
  // based on the `sortBy/sortOrder` arguments
  if (sortBy === 'peer-name') {
    myDemoDataArray.sort((s1, s2) => {
      const name1 = s1['peer-name'].toLowerCase();
        const name2 = s2['peer-name'].toLowerCase();
        if (name1 < name2) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (name1 > name2) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });
  } else if (sortBy === 'status') {
    myDemoDataArray.sort((s1, s2) => {
      const name1 = s1['status'].toLowerCase();
        const name2 = s2['status'].toLowerCase();
        if (name1 < name2) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (name1 > name2) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });
  }
  return myDemoDataArray;
};
}
