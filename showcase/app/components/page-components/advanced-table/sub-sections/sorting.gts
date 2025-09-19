/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { array, hash, get } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { tracked } from '@glimmer/tracking';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import CLUSTERS from 'showcase/mocks/cluster-data';

import {
  HdsAdvancedTable,
  HdsBadge,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableThSortOrder } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

import CodeFragmentWithSorting from 'showcase/components/page-components/advanced-table/code-fragments/with-sorting';

// we use an array to declare the custom sorting order for the clusters' status
const customSortingCriteriaArray = [
  'failing',
  'active',
  'establishing',
  'pending',
];

export default class SubSectionSorting extends Component {
  @tracked customSortOrder = 'asc';

  get clustersWithExtraData() {
    return CLUSTERS.map((record) => {
      return {
        ...record,
        'status-sort-order': customSortingCriteriaArray.indexOf(
          record['status'],
        ),
      };
    });
  }

  // CUSTOM SORTING DEMO
  // Sortable table with custom `sortingFunction` declared in the column hash

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
    <ShwTextH2>Sorting</ShwTextH2>

    <ShwTextH3>Basic sorting</ShwTextH3>

    <ShwTextH4>Sortable table (all columns sortable)</ShwTextH4>

    <CodeFragmentWithSorting
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash key="year" label="Release Year" isSortable=true)
      }}
    />

    <ShwTextH4>Sortable table (only some columns sortable)</ShwTextH4>

    <CodeFragmentWithSorting
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash key="year" label="Release Year")
      }}
    />

    <ShwTextH4>Sortable table, one column right-aligned</ShwTextH4>

    <CodeFragmentWithSorting
      @hasRightAlignedLastColumn={{true}}
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash key="year" label="Release Year" isSortable=true align="right")
      }}
    />

    <ShwTextH4>Sortable table, some columns sortable, artist column pre-sorted.</ShwTextH4>

    <CodeFragmentWithSorting
      @sortBy="artist"
      @hasRightAlignedLastColumn={{true}}
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash key="year" label="Release Year" isSortable=true align="right")
      }}
    />

    <ShwDivider @level={{2}} />

    <ShwTextH3>Custom sorting</ShwTextH3>

    <ShwTextH4>Sortable table with custom sorting done via extra key added to
      the data model</ShwTextH4>

    <HdsAdvancedTable
      @model={{this.clustersWithExtraData}}
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
    >
      <:body as |B|>
        <B.Tr>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.peer-name}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.cluster-partition}}</B.Td>
          <B.Td>
            {{#if (eq (get B.data "status") "failing")}}
              <HdsBadge
                @text="Failing"
                @color="critical"
                @icon="x"
                @type="outlined"
              />
            {{else if (eq (get B.data "status") "active")}}
              <HdsBadge
                @text="Active"
                @color="success"
                @icon="check"
                @type="outlined"
              />
            {{else if (eq (get B.data "status") "pending")}}
              <HdsBadge
                @text="Pending"
                @color="neutral"
                @icon="loading"
                @type="outlined"
              />
            {{else if (eq (get B.data "status") "establishing")}}
              <HdsBadge
                @text="Establishing"
                @color="highlight"
                @icon="loading"
                @type="outlined"
              />
            {{/if}}
          </B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.services.imported}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.services.exported}}</B.Td>
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
      </:body>
    </HdsAdvancedTable>

    <ShwTextH4>Sortable table with custom
      <code>sortingFunction</code>
      declared in the column hash</ShwTextH4>

    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{CLUSTERS}}
      @columns={{array
        (hash label="Peer name" isSortable=true key="peer-name")
        (hash label="Cluster partition")
        (hash
          label="Status"
          isSortable=true
          key="status"
          sortingFunction=this.customSortingFunction
        )
        (hash label="Imported services")
        (hash label="Exported services")
        (hash label="Actions" align="right")
      }}
      @sortBy="status"
      @sortOrder="asc"
      @onSort={{this.customOnSort}}
    >
      <:body as |B|>
        <B.Tr>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.peer-name}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.cluster-partition}}</B.Td>
          <B.Td>
            {{#if (eq (get B.data "status") "failing")}}
              <HdsBadge
                @text="Failing"
                @color="critical"
                @icon="x"
                @type="outlined"
              />
            {{else if (eq (get B.data "status") "active")}}
              <HdsBadge
                @text="Active"
                @color="success"
                @icon="check"
                @type="outlined"
              />
            {{else if (eq (get B.data "status") "pending")}}
              <HdsBadge
                @text="Pending"
                @color="neutral"
                @icon="loading"
                @type="outlined"
              />
            {{else if (eq (get B.data "status") "establishing")}}
              <HdsBadge
                @text="Establishing"
                @color="highlight"
                @icon="loading"
                @type="outlined"
              />
            {{/if}}
          </B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.services.imported}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.services.exported}}</B.Td>
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
      </:body>
    </HdsAdvancedTable>

    <ShwDivider />
  </template>
}
