/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { array, hash, fn, get } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { call } from '@nullvoxpopuli/ember-composable-helpers';
import { tracked } from '@glimmer/tracking';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import CLUSTERS from 'showcase/mocks/cluster-data';

import CodeFragmentWithMusicData from 'showcase/components/page-components/table/code-fragments/with-music-data';
import CodeFragmentWithClusterData from 'showcase/components/page-components/table/code-fragments/with-cluster-data';

// HDS Components
import {
  HdsBadge,
  HdsDropdown,
  HdsTable,
} from '@hashicorp/design-system-components/components';

import type { HdsTableThSortOrder } from '@hashicorp/design-system-components/components/hds/table/types';

const customSortingCriteriaArray = [
  'failing',
  'active',
  'establishing',
  'pending',
];

export interface SubSectionSortingSignature {
  Element: HTMLElement;
}

export default class SubSectionSorting extends Component<SubSectionSortingSignature> {
  @tracked demoCustomSort_sortOrder: HdsTableThSortOrder = 'asc';
  @tracked demoCustonSortYieldHead_sortBy: string | undefined = undefined;
  @tracked demoCustonSortYieldHead_sortOrder: HdsTableThSortOrder = 'asc';

  // CUSTOM SORTING DEMO
  // Sortable table with custom `sortingFunction` declared in the column hash

  get demoCustomSortSortingFunction(): <T>(s1: T, s2: T) => number {
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
          return this.demoCustomSort_sortOrder === 'asc' ? -1 : 1;
        } else if (index1 > index2) {
          return this.demoCustomSort_sortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      }
      return 0;
    };
  }

  demoCustomSortOnSort = (_sortBy: string, sortOrder: HdsTableThSortOrder) => {
    this.demoCustomSort_sortOrder = sortOrder;
  };

  // CUSTOM SORTING DEMO - YIELDED PROPS TO HEAD
  // Sortable table with custom sorting using yielded `<ThSort>`

  onClickThSort = (column: string, setSortBy?: (column: string) => void) => {
    // NOTICE: this code is a direct clone of the internal code of `Hds::Table` backing class
    // we need to keep an internal state of the sorting
    if (this.demoCustonSortYieldHead_sortBy === column) {
      // check to see if the column is already sorted and invert the sort order if so
      this.demoCustonSortYieldHead_sortOrder =
        this.demoCustonSortYieldHead_sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // otherwise, set the sort order to ascending
      this.demoCustonSortYieldHead_sortBy = column;
      this.demoCustonSortYieldHead_sortOrder = 'asc';
    }
    // update the sorting icons for the table
    if (setSortBy && typeof setSortBy === 'function') {
      setSortBy(column);
    }
  };

  get demoCustomSortYieldHead_sortedData() {
    const clonedModelClusters = Array.from(CLUSTERS);
    if (this.demoCustonSortYieldHead_sortBy === 'peer-name') {
      clonedModelClusters.sort((s1, s2) => {
        const name1 = s1['peer-name'].toLowerCase();
        const name2 = s2['peer-name'].toLowerCase();
        if (name1 < name2) {
          return this.demoCustonSortYieldHead_sortOrder === 'asc' ? -1 : 1;
        }
        if (name1 > name2) {
          return this.demoCustonSortYieldHead_sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else if (this.demoCustonSortYieldHead_sortBy === 'status') {
      clonedModelClusters.sort((s1, s2) => {
        const index1 = customSortingCriteriaArray.indexOf(s1['status']);
        const index2 = customSortingCriteriaArray.indexOf(s2['status']);
        if (index1 < index2) {
          return this.demoCustonSortYieldHead_sortOrder === 'asc' ? -1 : 1;
        } else if (index1 > index2) {
          return this.demoCustonSortYieldHead_sortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    return clonedModelClusters;
  }

  demoCustomSortYieldHead_extraOnSortCallback = () => {
    console.group(
      'demoCustomSortYieldHead_extraOnSortCallback invoked with arguments:',
    );
    console.log('customSortBy:', this.demoCustonSortYieldHead_sortBy);
    console.log('customSortOrder:', this.demoCustonSortYieldHead_sortOrder);
    console.groupEnd();
  };

  // CUSTOM SORTING DEMO - YIELDED PROPS TO HEAD + BODY
  // Sortable table with custom sorting using yielded `<ThSort>` + `sortBy/sortOrder/setSortBy` properties

  demoCustomSortYieldBody_onSort = (sortBy?: string, sortOrder?: string) => {
    // here goes the logic for the custom sorting of the `model` array based on `sortBy/sortOrder`
    const clonedModelClusters = Array.from(CLUSTERS);
    if (sortBy === 'peer-name') {
      clonedModelClusters.sort((s1, s2) => {
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
      clonedModelClusters.sort((s1, s2) => {
        const index1 = customSortingCriteriaArray.indexOf(s1['status']);
        const index2 = customSortingCriteriaArray.indexOf(s2['status']);
        if (index1 < index2) {
          return sortOrder === 'asc' ? -1 : 1;
        } else if (index1 > index2) {
          return sortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    return clonedModelClusters;
  };

  <template>
    <ShwTextH2>Sorting</ShwTextH2>

    <ShwTextH3>Basic sorting</ShwTextH3>

    <ShwTextH4>Sortable table (all columns sortable)</ShwTextH4>

    <CodeFragmentWithMusicData
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash key="year" label="Release Year" isSortable=true)
      }}
    />

    <ShwTextH4>Sortable table (only some columns sortable)</ShwTextH4>

    <CodeFragmentWithMusicData
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash key="year" label="Release Year")
      }}
    />

    <ShwTextH4>Sortable table, one column right-aligned</ShwTextH4>

    <CodeFragmentWithMusicData
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash key="year" label="Release Year" isSortable=true align="right")
      }}
      @rightAlignYear={{true}}
    />

    <ShwTextH4>Sortable table, some columns sortable, artist column pre-sorted.</ShwTextH4>

    <CodeFragmentWithMusicData
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash key="year" label="Release Year")
      }}
      @sortBy="artist"
    />

    <ShwDivider @level={{2}} />

    <ShwTextH3>Custom sorting</ShwTextH3>

    <ShwTextH4>Sortable table with custom sorting done via extra key added to
      the data model</ShwTextH4>

    <CodeFragmentWithClusterData
      @extraData={{true}}
      @columns={{array
        (hash label="Peer name" isSortable=true key="peer-name")
        (hash label="Cluster partition")
        (hash label="Status" isSortable=true key="status-sort-order")
        (hash label="Imported services")
        (hash label="Exported services")
        (hash label="Actions" align="right")
      }}
      @sortBy="status-sort-order"
      @sortOrder="asc"
    />

    <ShwTextH4>Sortable table with custom
      <code>sortingFunction</code>
      declared in the column hash</ShwTextH4>

    <CodeFragmentWithClusterData
      @columns={{array
        (hash label="Peer name" isSortable=true key="peer-name")
        (hash label="Cluster partition")
        (hash
          label="Status"
          isSortable=true
          key="status"
          sortingFunction=this.demoCustomSortSortingFunction
        )
        (hash label="Imported services")
        (hash label="Exported services")
        (hash label="Actions" align="right")
      }}
      @sortBy="status"
      @sortOrder={{this.demoCustomSort_sortOrder}}
      @onSort={{this.demoCustomSortOnSort}}
    />

    <ShwTextH4>Sortable table with custom sorting using yielded
      <code>&lt;ThSort&gt;</code>
      +
      <code>sortBy/sortOrder/setSortBy</code>
      properties (<code>&lt;:head&gt;</code>
      only)</ShwTextH4>

    <HdsTable @onSort={{this.demoCustomSortYieldHead_extraOnSortCallback}}>
      <:head as |H|>
        <H.Tr>
          <H.ThSort
            @onClickSort={{fn this.onClickThSort "peer-name" H.setSortBy}}
            @sortOrder={{if (eq "peer-name" H.sortBy) H.sortOrder}}
          >Peer name</H.ThSort>
          <H.Th>Cluster partition</H.Th>
          <H.ThSort
            @onClickSort={{fn this.onClickThSort "status" H.setSortBy}}
            @sortOrder={{if (eq "status" H.sortBy) H.sortOrder}}
          >Status</H.ThSort>
          <H.Th>Imported services</H.Th>
          <H.Th>Exported services</H.Th>
          <H.Th @align="right">Actions</H.Th>
        </H.Tr>
      </:head>
      <:body as |B|>
        {{#each this.demoCustomSortYieldHead_sortedData as |item|}}
          <B.Tr>
            <B.Td>{{item.peer-name}}</B.Td>
            <B.Td>{{item.cluster-partition}}</B.Td>
            <B.Td>
              {{#if (eq (get item "status") "failing")}}
                <HdsBadge
                  @text="Failing"
                  @color="critical"
                  @icon="x"
                  @type="outlined"
                />
              {{else if (eq (get item "status") "active")}}
                <HdsBadge
                  @text="Active"
                  @color="success"
                  @icon="check"
                  @type="outlined"
                />
              {{else if (eq (get item "status") "pending")}}
                <HdsBadge
                  @text="Pending"
                  @color="neutral"
                  @icon="loading"
                  @type="outlined"
                />
              {{else if (eq (get item "status") "establishing")}}
                <HdsBadge
                  @text="Establishing"
                  @color="highlight"
                  @icon="loading"
                  @type="outlined"
                />
              {{/if}}
            </B.Td>
            <B.Td>{{item.services.imported}}</B.Td>
            <B.Td>{{item.services.exported}}</B.Td>
            <B.Td @align="right">
              <HdsDropdown @isInline={{true}} as |dd|>
                <dd.ToggleIcon
                  @icon="more-horizontal"
                  @text="Overflow Options"
                  @hasChevron={{false}}
                  @size="small"
                />
                <dd.Interactive
                  @route="page-components.table"
                >Create</dd.Interactive>
                <dd.Interactive
                  @route="page-components.table"
                >Read</dd.Interactive>
                <dd.Interactive
                  @route="page-components.table"
                >Update</dd.Interactive>
                <dd.Separator />
                <dd.Interactive
                  @route="page-components.table"
                  @color="critical"
                  @icon="trash"
                >Delete</dd.Interactive>
              </HdsDropdown>
            </B.Td>
          </B.Tr>
        {{/each}}
      </:body>
    </HdsTable>

    <ShwTextH4>Sortable table with custom sorting using yielded
      <code>&lt;ThSort&gt;</code>
      +
      <code>sortBy/sortOrder/setSortBy</code>
      properties (<code>&lt;:head&gt;</code>
      +
      <code>&lt;:body&gt;</code>)</ShwTextH4>

    <HdsTable>
      <:head as |H|>
        <H.Tr>
          {{#if H.setSortBy}}
            <H.ThSort
              @onClickSort={{fn H.setSortBy "peer-name"}}
              @sortOrder={{if (eq "peer-name" H.sortBy) H.sortOrder}}
            >Peer name</H.ThSort>
          {{/if}}
          <H.Th>Cluster partition</H.Th>
          {{#if H.setSortBy}}
            <H.ThSort
              @onClickSort={{fn H.setSortBy "status"}}
              @sortOrder={{if (eq "status" H.sortBy) H.sortOrder}}
            >Status</H.ThSort>
          {{/if}}
          <H.Th>Imported services</H.Th>
          <H.Th>Exported services</H.Th>
          <H.Th @align="right">Actions</H.Th>
        </H.Tr>
      </:head>
      <:body as |B|>
        {{#each
          (call (fn this.demoCustomSortYieldBody_onSort B.sortBy B.sortOrder))
          as |item|
        }}
          <B.Tr>
            <B.Td>{{item.peer-name}}</B.Td>
            <B.Td>{{item.cluster-partition}}</B.Td>
            <B.Td>
              {{#if (eq (get item "status") "failing")}}
                <HdsBadge
                  @text="Failing"
                  @color="critical"
                  @icon="x"
                  @type="outlined"
                />
              {{else if (eq (get item "status") "active")}}
                <HdsBadge
                  @text="Active"
                  @color="success"
                  @icon="check"
                  @type="outlined"
                />
              {{else if (eq (get item "status") "pending")}}
                <HdsBadge
                  @text="Pending"
                  @color="neutral"
                  @icon="loading"
                  @type="outlined"
                />
              {{else if (eq (get item "status") "establishing")}}
                <HdsBadge
                  @text="Establishing"
                  @color="highlight"
                  @icon="loading"
                  @type="outlined"
                />
              {{/if}}
            </B.Td>
            <B.Td>{{item.services.imported}}</B.Td>
            <B.Td>{{item.services.exported}}</B.Td>
            <B.Td @align="right">
              <HdsDropdown @isInline={{true}} as |dd|>
                <dd.ToggleIcon
                  @icon="more-horizontal"
                  @text="Overflow Options"
                  @hasChevron={{false}}
                  @size="small"
                />
                <dd.Interactive
                  @route="page-components.table"
                >Create</dd.Interactive>
                <dd.Interactive
                  @route="page-components.table"
                >Read</dd.Interactive>
                <dd.Interactive
                  @route="page-components.table"
                >Update</dd.Interactive>
                <dd.Separator />
                <dd.Interactive
                  @route="page-components.table"
                  @color="critical"
                  @icon="trash"
                >Delete</dd.Interactive>
              </HdsDropdown>
            </B.Td>
          </B.Tr>
        {{/each}}
      </:body>
    </HdsTable>

    <ShwDivider />
  </template>
}
