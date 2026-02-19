import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import { get } from '@ember/helper';

import { HdsTable } from '@hashicorp/design-system-components/components';
import type { HdsTableThSortOrder } from '@hashicorp/design-system-components/components/hds/table/types';

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
  @tracked customSortOrderForStatus: HdsTableThSortOrder = 'asc';

  // we define a "getter" that returns a custom sorting function ("s1" and "s2" are data records)
  get customSortingMethodForStatus(): <T>(s1: T, s2: T) => number {
    return (s1, s2) => {
      if (
        s1 instanceof Object &&
        s2 instanceof Object &&
        'status' in s1 &&
        'status' in s2 &&
        typeof s1['status'] === 'string' &&
        typeof s2['status'] === 'string'
      ) {
        const index1 = customSortingCriteriaArray.indexOf(s1['status']);
        const index2 = customSortingCriteriaArray.indexOf(s2['status']);
        if (index1 < index2) {
          return this.customSortOrderForStatus === 'asc' ? -1 : 1;
        } else if (index1 > index2) {
          return this.customSortOrderForStatus === 'asc' ? 1 : -1;
        }
      }

      return 0;
    };
  }

  get model() {
    return { myDemoData: CLUSTER_DATA };
  }

  // we define a callback function that listens to the `onSort` event in the table, and updates the tracked sort order values accordingly
  customOnSort = (_sortBy: string, sortOrder: HdsTableThSortOrder) => {
    this.customSortOrderForStatus = sortOrder;
  };

  <template>
    <HdsTable
      @model={{this.model.myDemoData}}
      @columns={{array
        (hash key="peer-name" label="Peer Name")
        (hash
          key="status"
          label="Status"
          isSortable=true
          sortingFunction=this.customSortingMethodForStatus
        )
        (hash key="cluster-partition" label="Cluster / Partition")
      }}
      @sortOrder={{this.customSortOrderForStatus}}
      @onSort={{this.customOnSort}}
    >
      <:body as |B|>
        <B.Tr>
          <B.Td>{{get B.data "peer-name"}}</B.Td>
          <B.Td>{{get B.data "status"}}</B.Td>
          <B.Td>{{get B.data "cluster-partition"}}</B.Td>
        </B.Tr>
      </:body>
    </HdsTable>
  </template>
}
