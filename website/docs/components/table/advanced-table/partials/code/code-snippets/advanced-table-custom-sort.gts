import Component from '@glimmer/component';
import { array, hash, get } from '@ember/helper';
import { tracked } from '@glimmer/tracking';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableThSortOrder } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

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

  get customSortingFunction(): <T>(s1: T, s2: T) => number {
    return (s1, s2) => {
      // check that s1 and s2 are objects and have the 'status' property
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
          return this.customSortOrder === 'asc' ? -1 : 1;
        } else if (index1 > index2) {
          return this.customSortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      }
      return 0;
    };
  }

  customOnSort = (_sortBy: string, sortOrder: HdsAdvancedTableThSortOrder) => {
    this.customSortOrder = sortOrder;
  };

  <template>
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.myDemoData}}
      @columns={{array
        (hash label="Peer name" isSortable=true key="peer-name")
        (hash
          label="Status"
          isSortable=true
          key="status"
          sortingFunction=this.customSortingFunction
        )
        (hash label="Cluster partition")
      }}
      @sortBy="status"
      @sortOrder="asc"
      @onSort={{this.customOnSort}}
    >
      <:body as |B|>
        <B.Tr>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{get B.data "peer-name"}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{get B.data "status"}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{get B.data "cluster-partition"}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
