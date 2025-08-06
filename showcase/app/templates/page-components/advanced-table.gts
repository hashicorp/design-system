// Copyright (c) HashiCorp, Inc.
// SPDX-License-Identifier: MPL-2.0

import Component from '@glimmer/component';
import { array, fn, hash } from '@ember/helper';
import { capitalize } from '@ember/string';
import { deepTracked } from 'ember-deep-tracked';
import { eq } from 'ember-truth-helpers';
import { get } from '@ember/object';
import { later } from '@ember/runloop';
import { on } from '@ember/modifier';
import { pageTitle } from 'ember-page-title';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier';

import {
  HdsAdvancedTable,
  HdsAdvancedTableTh,
  HdsAdvancedTableThButtonExpand,
  HdsAdvancedTableThButtonSort,
  HdsAdvancedTableThButtonTooltip,
  HdsBadge,
  HdsButton,
  HdsButtonSet,
  HdsDropdown,
  HdsDropdownToggleIcon,
  HdsFormSelectBase,
  HdsIcon,
  HdsLayoutFlex,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

import { DENSITIES } from '@hashicorp/design-system-components/components/hds/advanced-table/index';
import HdsAdvancedTableModel from '@hashicorp/design-system-components/components/hds/advanced-table/models/table';
import HdsAdvancedTableThResizeHandle from '@hashicorp/design-system-components/components/hds/advanced-table/th-resize-handle';
import type { HdsAdvancedTableThSortOrder } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwFrame from 'showcase/components/shw/frame';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import clusterData from 'showcase/mocks/cluster-data';
import folkMusic from 'showcase/mocks/folk-music-data';
import policyData from 'showcase/mocks/policy-data';
import userData from 'showcase/mocks/user-data';
import type { User } from 'showcase/mocks/user-data';

import { INTERACTION_STATES } from 'showcase/utils/component-states';

import AdvancedTableNested from 'showcase/components/page-components/advanced-table/advanced-table-nested';
import AdvancedTableResizable from 'showcase/components/page-components/advanced-table/advanced-table-resizable';
import AdvancedTableSelectable from 'showcase/components/page-components/advanced-table/advanced-table-selectable';
import AdvancedTableSimple from 'showcase/components/page-components/advanced-table/advanced-table-simple';
import AdvancedTableSortable from 'showcase/components/page-components/advanced-table/advanced-table-sortable';
import AdvancedTableSticky from 'showcase/components/page-components/advanced-table/advanced-table-sticky';
import AdvancedTableTdMatrix from 'showcase/components/page-components/advanced-table/advanced-table-td-matrix';
import AdvancedTableThMatrix from 'showcase/components/page-components/advanced-table/advanced-table-th-matrix';
import AdvancedTableThSelectableMatrix from 'showcase/components/page-components/advanced-table/advanced-table-th-selectable-matrix';
import AdvancedTableThSortMatrix from 'showcase/components/page-components/advanced-table/advanced-table-th-sort-matrix';
import AdvancedTableTrMatrix from 'showcase/components/page-components/advanced-table/advanced-table-tr-matrix';
import AdvancedTableWithDebugSelect from 'showcase/components/page-components/advanced-table/advanced-table-with-debug-select';
import AdvancedTableWithDynamicCell from 'showcase/components/page-components/advanced-table/advanced-table-dynamic-cell';
import AdvancedTableWithLongCell from 'showcase/components/page-components/advanced-table/advanced-table-with-long-cell';
import AdvancedTableWithSpanningCells from 'showcase/components/page-components/advanced-table/advanced-table-with-spanning-cells';

// we use an array to declare the custom sorting order for the clusters' status
const customSortingCriteriaArray = [
  'failing',
  'active',
  'establishing',
  'pending',
];

export interface PageComponentAdvancedTableSignature {
  Element: HTMLElement;
}

export default class PageComponentAdvancedTable extends Component<PageComponentAdvancedTableSignature> {
  userDataShort = userData.slice(0, 5);
  policyCustomData = policyData.map((record) => {
    const { children, ...rest } = record;
    return {
      ...rest,
      data: children,
    };
  });

  @tracked customSortOrder = 'asc';

  @deepTracked thResizeHandleTable = new HdsAdvancedTableModel({
    // @ts-expect-error - this will be fixed in HDS-5090
    model: this.userDataShort,
    columns: [
      {
        label: 'Label',
      },
    ],
  });

  folkMusicColumns = [
    {
      key: 'artist',
      label: 'Artist',
      tooltip: 'More information.',
      isSortable: true,
    },
    {
      key: 'album',
      label: 'Album',
      tooltip: 'More information.',
      isSortable: true,
    },
    {
      key: 'year',
      label: 'Release Year',
      tooltip: 'More information.',
      isSortable: true,
    },
    {
      key: 'other',
      label: 'Additional Actions',
    },
  ];

  get clustersWithExtraData() {
    return clusterData.map((record) => {
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

  customSortingFunction = (s1: unknown, s2: unknown): number => {
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

  customOnSort = (_sortBy: string, sortOrder: HdsAdvancedTableThSortOrder) => {
    this.customSortOrder = sortOrder;
  };

  // INLINE FILTER EXAMPLE
  // filters the advanced table to show all, even, or odd rows based an external filter

  onChangeInlineFilter = (
    setModel: (newModel: User[]) => void,
    event: Event,
  ) => {
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'all') {
      setModel(userData.slice(0, 4));
    } else {
      const remainder = value === 'even' ? 0 : 1;
      setModel(
        userData.slice(0, 4).filter((item) => item.id % 2 === remainder),
      );
    }
  };

  // DELETE EXAMPLE
  // Delete selected rows

  deleteUsers = (setModel: (newModel: User[]) => void, model: User[]) => {
    const newData = model.filter((user) => !user.isSelected);
    setModel([...newData]);
  };

  // ANIMATE EXAMPLE
  // Execute action on selected rows

  animateUsers = (setModel: (newModel: User[]) => void, model: User[]) => {
    const newModel = model.map((user) => ({
      ...user,
      isAnimated: user.isSelected,
    }));

    setModel([...newModel]);

    // eslint-disable-next-line ember/no-runloop
    later(() => {
      this.resetUserAnimation(setModel, model);
    }, 5000);
  };

  resetUserAnimation = (
    setModel: (newModel: User[]) => void,
    model: User[],
  ) => {
    const newModel = model.map((user) => ({
      ...user,
      isAnimated: false,
    }));

    setModel([...newModel]);
  };

  <template>
    {{pageTitle "AdvancedTable Component"}}

    <ShwTextH1>AdvancedTable</ShwTextH1>

    <section data-test-percy>
      <ShwTextBody>
        <a
          class="shw-frame__open-link"
          href="/layouts/app-frame/frameless/demo-full-app-frame-with-advanced-table"
          target="_blank"
          rel="noopener noreferrer"
        >
          See an Advanced Table in the context of a full App Frame
          <span class="sr-only">open the frame in a new window</span>
        </a>
      </ShwTextBody>
      <ShwTextH2>Basic AdvancedTable</ShwTextH2>
      <ShwTextH3>Keyboard interaction</ShwTextH3>

      <ShwTextBody>To navigate the AdvancedTable with a keyboard</ShwTextBody>
      <ul class="shw-component-advanced-table-instruction-list">
        <li><strong>Arrow Keys</strong>: Move between the cells</li>
        <li><strong>Enter</strong>: Focuses the first interactive element in the
          cell. After press enter, you can tab to all focusable elements in the
          cell. Focus is trapped within the cell.</li>
        <li><strong>Escape</strong>: If focused on an interactive element within
          a cell, it moves the focus back to the cell. After press escape, you
          can arrow key between the cells again.</li>
        <li><strong>Home (fn + left)</strong>: Move to first cell in the row</li>
        <li><strong>End (fn + right)</strong>: Move to last cell in the row</li>
        <li><strong>PageUp (fn + up)</strong>: Move to first cell in the column</li>
        <li><strong>PageDown (fn + down)</strong>: Move to last cell in the
          column</li>
      </ul>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{folkMusic}}
        @columns={{this.folkMusicColumns}}
      >
        <:body as |B|>
          {{! @glint-expect-error - this argument shouldn't be required, will be fixed by https://hashicorp.atlassian.net/browse/HDS-5167}}
          <B.Tr @selectionKey="{{B.data.id}}">

            <B.Th @scope="row">
              <HdsLinkInline @href="#showcase">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.artist}}
              </HdsLinkInline>
            </B.Th>
            <B.Td>
              <div class="shw-component-advanced-table-cell-content-div">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.album}}
              </div>
            </B.Td>
            <B.Td>

              <HdsBadge
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                @text={{B.data.year}}
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                @type={{B.data.badge-type}}
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                @color={{B.data.badge-color.name}}
              />
            </B.Td>
            <B.Td>
              <HdsButtonSet>
                <HdsButton
                  @text="Add"
                  @isIconOnly={{true}}
                  @icon="plus"
                  @size="small"
                />
                <HdsButton
                  @text="Edit"
                  @isIconOnly={{true}}
                  @icon="edit"
                  @size="small"
                  @color="secondary"
                />
                <HdsButton
                  @text="Delete"
                  @isIconOnly={{true}}
                  @icon="trash"
                  @size="small"
                  @color="critical"
                />
              </HdsButtonSet>
            </B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

      <ShwDivider />

      <ShwTextH2>Nested rows</ShwTextH2>

      <ShwTextH3>With default expanded rows</ShwTextH3>
      <AdvancedTableNested @model={{policyData}} />

      <ShwTextH3>With nested rows and custom children key</ShwTextH3>
      <AdvancedTableNested
        @model={{this.policyCustomData}}
        @childrenKey="data"
      />

      <ShwDivider />

      <ShwTextH2>Horizontal scrolling indicators</ShwTextH2>

      <div class="shw-component-advanced-table-fixed-width-wrapper">
        <HdsAdvancedTable
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @model={{folkMusic}}
          @isStriped={{true}}
          @maxHeight="400px"
          @columns={{this.folkMusicColumns}}
        >
          <:body as |B|>
            {{! @glint-expect-error - this argument shouldn't be required, will be fixed by https://hashicorp.atlassian.net/browse/HDS-5167}}
            <B.Tr @selectionKey="{{B.data.id}}">
              <B.Th @scope="row">
                <HdsLinkInline @href="#showcase">
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  {{B.data.artist}}
                </HdsLinkInline>
              </B.Th>
              <B.Td>
                <div class="shw-component-advanced-table-cell-content-div">
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  {{B.data.album}}
                </div>
              </B.Td>
              <B.Td>
                <HdsBadge
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  @text={{B.data.year}}
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  @type={{B.data.badge-type}}
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  @color={{B.data.badge-color.name}}
                />
              </B.Td>
              <B.Td>
                <HdsButtonSet>
                  <HdsButton
                    @text="Add"
                    @isIconOnly={{true}}
                    @icon="plus"
                    @size="small"
                  />
                  <HdsButton
                    @text="Edit"
                    @isIconOnly={{true}}
                    @icon="edit"
                    @size="small"
                    @color="secondary"
                  />
                  <HdsButton
                    @text="Delete"
                    @isIconOnly={{true}}
                    @icon="trash"
                    @size="small"
                    @color="critical"
                  />
                </HdsButtonSet>
              </B.Td>
            </B.Tr>
          </:body>
        </HdsAdvancedTable>
      </div>

      <ShwDivider />

      <ShwTextH2>Stickiness</ShwTextH2>

      <ShwTextH3>Sticky header</ShwTextH3>

      <AdvancedTableSticky @isSelectable={{true}} @hasStickyHeader={{true}} />

      <ShwTextH3>Sticky column</ShwTextH3>

      <AdvancedTableSticky
        @isSelectable={{true}}
        @hasStickyFirstColumn={{true}}
      />

      <ShwTextH3>Sticky column not selectable</ShwTextH3>

      <AdvancedTableSticky @hasStickyFirstColumn={{true}} />

      <ShwTextH3>Sticky header and sticky column</ShwTextH3>

      <AdvancedTableSticky
        @isSelectable={{true}}
        @hasStickyFirstColumn={{true}}
        @hasStickyHeader={{true}}
      />

      <ShwDivider />

      <ShwTextH2>Sorting</ShwTextH2>

      <ShwTextH3>Basic sorting</ShwTextH3>

      <ShwTextH4>Sortable table (all columns sortable)</ShwTextH4>

      <AdvancedTableSortable
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year" isSortable=true)
        }}
      />

      <ShwTextH4>Sortable table (only some columns sortable)</ShwTextH4>

      <AdvancedTableSortable
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year")
        }}
      />

      <ShwTextH4>Sortable table, one column right-aligned</ShwTextH4>

      <AdvancedTableSortable
        @alignColumnRight={{true}}
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year" isSortable=true align="right")
        }}
      />

      <ShwTextH4>Sortable table, some columns sortable, artist column
        pre-sorted.</ShwTextH4>

      <AdvancedTableSortable
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year")
        }}
        @sortBy="artist"
        @sortOrder="desc"
      />

      <ShwDivider @level={{2}} />

      <ShwTextH3>Custom sorting</ShwTextH3>

      <ShwTextH4>
        Sortable table with custom
        <code>sortingFunction</code>
        declared in the column hash
      </ShwTextH4>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{clusterData}}
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
          (hash
            label="Actions" width="auto" isVisuallyHidden=true align="right"
          )
        }}
        @sortBy="status"
        @sortOrder="asc"
        @onSort={{this.customOnSort}}
      >
        <:body as |B|>
          {{! @glint-expect-error - this argument shouldn't be required, will be fixed by https://hashicorp.atlassian.net/browse/HDS-5167}}
          <B.Tr @selectionKey="{{B.data.id}}">
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

      <ShwTextH2>Tooltip</ShwTextH2>

      <AdvancedTableSimple @hasTooltips={{true}} />

      <ShwDivider />

      <ShwTextH2>Multi-select</ShwTextH2>

      <AdvancedTableSelectable />

      <ShwTextH3>Sortable table with sorting by selected item</ShwTextH3>

      {{! TODO: is this broken?  }}
      <AdvancedTableSelectable @hasSortBySelected={{true}} />

      <ShwDivider @level={{2}} />

      <ShwTextH2>Resizable columns</ShwTextH2>

      <AdvancedTableResizable />

      <ShwTextH3>Resizable columns with sorting</ShwTextH3>

      <AdvancedTableResizable @hasSorting={{true}} />

      <ShwTextH3>Resizable columns with truncated cell content</ShwTextH3>

      <AdvancedTableResizable @hasCellTruncation={{true}} />

      <ShwDivider />

      <ShwTextH3>Functional examples</ShwTextH3>

      <ShwTextH4>With dynamic focusable content in cells</ShwTextH4>

      <AdvancedTableWithDynamicCell />

      <ShwTextH4>With inline filter</ShwTextH4>

      {{! INLINE FILTER EXAMPLE }}
      <AdvancedTableWithDebugSelect>
        <:topbarAction as |T|>
          <label for="inline-filter-example">Filter:</label>
          <HdsFormSelectBase
            id="inline-filter-example"
            {{on "change" (fn this.onChangeInlineFilter T.setVisibleModel)}}
            as |C|
          >
            <C.Options>
              <option value="all">Show all rows</option>
              <option value="even">Show even rows</option>
              <option value="odd">Show odd rows</option>
            </C.Options>
          </HdsFormSelectBase>
        </:topbarAction>
      </AdvancedTableWithDebugSelect>

      <ShwTextH4>With pagination</ShwTextH4>

      <AdvancedTableWithDebugSelect @hasPagination={{true}} />

      <ShwTextH4>Delete selected rows</ShwTextH4>

      <ShwTextBody>
        This demo emulates, for example, when a user needs to delete the
        selected users.
      </ShwTextBody>

      {{! DELETE  EXAMPLE }}

      <AdvancedTableWithDebugSelect @hasPagination={{true}}>
        <:topbarAction as |T|>
          <HdsButton
            @text="Delete users"
            @icon="trash"
            {{on "click" (fn this.deleteUsers T.setModel T.model)}}
          />
        </:topbarAction>
      </AdvancedTableWithDebugSelect>

      <ShwTextH4>Execute action on selected rows</ShwTextH4>

      <ShwTextBody>
        This demo emulates, for example, when a user needs to download the
        selected files.
      </ShwTextBody>

      {{! ANIMATE  EXAMPLE }}

      <AdvancedTableWithDebugSelect>
        <:topbarAction as |T|>
          <HdsButton
            @text="Animate users"
            @icon="play"
            {{on "click" (fn this.animateUsers T.setVisibleModel T.model)}}
          />
        </:topbarAction>
      </AdvancedTableWithDebugSelect>

      <ShwDivider />

      <ShwTextH2>Table customization</ShwTextH2>

      <ShwTextH3>Density</ShwTextH3>

      <ShwFlex @direction="column" @gap="2rem" as |SF|>
        {{#each DENSITIES as |density|}}
          <SF.Item @label={{capitalize density}}>
            <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
              {{#let (array false true) as |booleans|}}
                {{#each booleans as |bool|}}
                  <SG.Item>
                    <AdvancedTableSimple
                      @isSelectable={{bool}}
                      @density={{density}}
                    />
                  </SG.Item>
                {{/each}}
              {{/let}}
            </ShwGrid>
          </SF.Item>
        {{/each}}
      </ShwFlex>

      <ShwDivider @level={{2}} />

      <ShwTextH3>Striping</ShwTextH3>

      <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
        {{#let (array false true) as |booleans|}}
          {{#each booleans as |bool|}}
            <SG.Item>
              <AdvancedTableSimple @isStriped={{bool}} />
            </SG.Item>
          {{/each}}
        {{/let}}
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3>Table where last column has right-aligned text</ShwTextH3>

      <AdvancedTableSortable
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year" isSortable=true align="right")
        }}
      />

      <ShwTextH3>Table with multi-line content</ShwTextH3>

      <AdvancedTableWithLongCell
        @columns={{array
          (hash key="artist" label="Artist")
          (hash key="album" label="Album")
          (hash key="quote" label="Quote" width="50%")
        }}
      />

      <ShwDivider />

      <ShwTextH2>Layout</ShwTextH2>

      <ShwTextH3>AdvancedTable with custom column widths</ShwTextH3>

      <AdvancedTableWithLongCell
        @columns={{array
          (hash key="artist" label="Artist (120px)" width="120px")
          (hash key="album" label="Album (1fr)")
          (hash key="quote" label="Quote (2fr)" width="2fr")
        }}
      />

      <ShwTextH3>Selectable AdvancedTable with custom column widths</ShwTextH3>

      <AdvancedTableWithLongCell
        @columns={{array
          (hash key="artist" label="Artist (120px)" width="120px")
          (hash key="album" label="Album (1fr)")
          (hash key="quote" label="Quote (2fr)" width="2fr")
        }}
        @isSelectable={{true}}
      />

      <ShwDivider @level={{2}} />

      <ShwTextH3>Wide container with a narrow AdvancedTable</ShwTextH3>

      <div class="shw-component-advanced-table-full-width-wrapper">
        <HdsAdvancedTable
          @isSelectable={{true}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @model={{this.userDataShort}}
          @columns={{array
            (hash key="id" label="ID" width="150px")
            (hash key="name" label="Name" width="150px")
          }}
        >
          <:body as |B|>
            <B.Tr
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @selectionKey="{{B.data.id}}"
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @isSelected={{B.data.isSelected}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @selectionAriaLabelSuffix="row #{{B.data.id}}"
            >
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.id}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.name}}</B.Td>
            </B.Tr>
          </:body>
        </HdsAdvancedTable>
      </div>

      <ShwDivider @level={{2}} />

      <ShwTextH3>
        AdvancedTable with
        <code>colspan/rowspan</code>
        attributes
      </ShwTextH3>

      <AdvancedTableWithSpanningCells />

      <ShwDivider />

      <ShwTextH2>Demo</ShwTextH2>

      <ShwFrame
        @id="demo-full-app-frame-with-advanced-table"
        @src="/layouts/app-frame/frameless/demo-full-app-frame-with-advanced-table"
        @height="780"
        @label="Advanced Table in the context of a full App Frame"
      />

      <ShwDivider />

      <ShwTextH2>Base elements</ShwTextH2>

      <ShwTextH3>Tr</ShwTextH3>

      <ShwTextBody>
        These examples are for display only, clicking the expand button will not
        toggle the rows.
      </ShwTextBody>

      <AdvancedTableTrMatrix />

      <ShwTextH3>ThSort</ShwTextH3>
      <AdvancedTableThSortMatrix />

      <ShwDivider @level={{2}} />

      <ShwTextH3>Th</ShwTextH3>
      <AdvancedTableThMatrix />

      <ShwDivider @level={{2}} />

      <ShwTextH3>ThSelectable</ShwTextH3>
      <AdvancedTableThSelectableMatrix />

      <ShwDivider @level={{2}} />

      <ShwTextH3>Td</ShwTextH3>
      <AdvancedTableTdMatrix />
      <ShwTextH3>ThButtonTooltip</ShwTextH3>

      <ShwGrid @label="Interactive states" @columns={{4}} as |SG|>
        {{#each INTERACTION_STATES as |state|}}
          <SG.Item @label={{capitalize state}}>
            <HdsAdvancedTableThButtonTooltip
              @tooltip="Here is more information"
              mock-state-value={{state}}
            />
          </SG.Item>
        {{/each}}
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3>ThButtonSort</ShwTextH3>

      <ShwGrid
        @label="Interactive states + Sorting order"
        @columns={{4}}
        as |SG|
      >
        {{#each INTERACTION_STATES as |state|}}
          <SG.Item @label={{capitalize state}}>
            <ShwFlex @direction="row" as |SF|>
              <SF.Item>
                <HdsAdvancedTableThButtonSort mock-state-value={{state}} />
              </SF.Item>
              <SF.Item>
                <HdsAdvancedTableThButtonSort
                  @sortOrder="asc"
                  mock-state-value={{state}}
                />
              </SF.Item>
              <SF.Item>
                <HdsAdvancedTableThButtonSort
                  @sortOrder="desc"
                  mock-state-value={{state}}
                />
              </SF.Item>
            </ShwFlex>
          </SG.Item>
        {{/each}}
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3>ThButtonExpand</ShwTextH3>

      <ShwGrid
        @label="Interactive states + Expand state"
        @columns={{4}}
        as |SG|
      >
        {{#each INTERACTION_STATES as |state|}}
          <SG.Item @label={{capitalize state}}>
            <ShwFlex @direction="row" as |SF|>
              <SF.Item>
                <HdsAdvancedTableThButtonExpand mock-state-value={{state}} />
              </SF.Item>
              <SF.Item>
                <HdsAdvancedTableThButtonExpand
                  @isExpanded={{true}}
                  mock-state-value={{state}}
                />
              </SF.Item>
            </ShwFlex>
          </SG.Item>
        {{/each}}
      </ShwGrid>

      <ShwGrid
        @label="Expand all interactive states + Expand state"
        @columns={{4}}
        as |SG|
      >
        {{#each INTERACTION_STATES as |state|}}
          <SG.Item @label={{capitalize state}}>
            <ShwFlex @direction="row" as |SF|>
              <SF.Item>
                <HdsAdvancedTableThButtonExpand
                  mock-state-value={{state}}
                  @isExpandAll={{true}}
                />
              </SF.Item>
              <SF.Item>
                <HdsAdvancedTableThButtonExpand
                  @isExpanded={{true}}
                  mock-state-value={{state}}
                  @isExpandAll={{true}}
                />
              </SF.Item>
            </ShwFlex>
          </SG.Item>
        {{/each}}
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3>ThContextMenu</ShwTextH3>

      <ShwGrid
        @label="Context menu all interactive states"
        @columns={{4}}
        as |SG|
      >
        {{#each INTERACTION_STATES as |state|}}
          <SG.Item @label={{capitalize state}}>
            <div class="hds-advanced-table__th-context-menu">
              <HdsDropdownToggleIcon
                @icon="more-vertical"
                @text="Context menu"
                @hasChevron={{false}}
                @size="small"
                mock-state-value={{state}}
              />
            </div>
          </SG.Item>
        {{/each}}
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3>ThResizeHandle</ShwTextH3>

      <ShwFlex @direction="row" @gap="2rem" as |SF|>
        <SF.Item @grow={{true}}>
          <div
            class="hds-advanced-table hds-advanced-table--density-medium"
            role="grid"
            {{style gridTemplateColumns="200px 200px 200px 200px 1fr"}}
          >
            <div class="hds-advanced-table__thead" role="rowgroup">
              <div class="hds-advanced-table__tr" role="row">
                {{#each INTERACTION_STATES as |state|}}
                  <div
                    class="hds-advanced-table__th hds-advanced-table__th--is-resizable"
                    role="columnheader"
                  >
                    <HdsLayoutFlex
                      @justify="space-between"
                      @align="center"
                      @gap="8"
                    >
                      <div class="hds-advanced-table__th-content">
                        <span
                          class="hds-advanced-table__th-content-text hds-typography-body-200 hds-font-weight-semibold"
                        >
                          {{capitalize state}}
                        </span>
                      </div>
                      <HdsAdvancedTableThResizeHandle
                        mock-state-value={{state}}
                        @column={{get this.thResizeHandleTable.columns 0}}
                        @hasResizableColumns={{true}}
                        aria-valuenow="200"
                      />
                    </HdsLayoutFlex>
                  </div>
                {{/each}}
                <HdsAdvancedTableTh>
                  Actions
                </HdsAdvancedTableTh>
              </div>
            </div>
          </div>
        </SF.Item>
      </ShwFlex>
    </section>
  </template>
}
