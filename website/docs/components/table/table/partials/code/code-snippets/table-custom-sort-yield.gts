import Component from '@glimmer/component';
import { get, fn } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { call } from '@nullvoxpopuli/ember-composable-helpers';

import { HdsTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableThSortOrder } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

import CLUSTER_DATA from 'website/mocks/cluster-data';

export default class LocalComponent extends Component {
  myDemoCustomSortingFunction(
    sortBy?: string,
    sortOrder?: HdsAdvancedTableThSortOrder,
  ) {
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
  }

  <template>
    <HdsTable>
      <:head as |H|>
        <H.Tr>
          {{#if H.setSortBy}}
            <H.ThSort
              @onClickSort={{fn H.setSortBy "peer-name"}}
              @sortOrder={{if (eq "peer-name" H.sortBy) H.sortOrder}}
            >Peer Name</H.ThSort>
          {{/if}}
          {{#if H.setSortBy}}
            <H.ThSort
              @onClickSort={{fn H.setSortBy "status"}}
              @sortOrder={{if (eq "status" H.sortBy) H.sortOrder}}
            >Status</H.ThSort>
          {{/if}}
          <H.Th>Partition</H.Th>
        </H.Tr>
      </:head>
      <:body as |B|>
        {{#each
          (call (fn this.myDemoCustomSortingFunction B.sortBy B.sortOrder))
          as |cluster|
        }}
          <B.Tr>
            <B.Td>{{get cluster "peer-name"}}</B.Td>
            <B.Td>{{get cluster "status"}}</B.Td>
            <B.Td>{{get cluster "cluster-partition"}}</B.Td>
          </B.Tr>
        {{/each}}
      </:body>
    </HdsTable>
  </template>
}
