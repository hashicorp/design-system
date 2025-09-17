/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { array, hash, get } from '@ember/helper';
import { eq, or } from 'ember-truth-helpers';
import { formatDate } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { later } from '@ember/runloop';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import MUSIC from 'showcase/mocks/folk-music-data';
import CLUSTERS from 'showcase/mocks/cluster-data';
import SELECTABLE_ITEMS from 'showcase/mocks/selectable-item-data';
import USERS from 'showcase/mocks/user-data';
import INFRASTRUCTURE_RESOURCES from 'showcase/mocks/infrastructure-data';

// import type { PageComponentsAdvancedTableModel } from 'showcase/routes/page-components/advanced-table';
import type { SelectableItem } from 'showcase/mocks/selectable-item-data';
import type { User } from 'showcase/mocks/user-data';

import SubSectionBaseElements from 'showcase/components/page-components/advanced-table/sub-sections/base-elements';
import SubSectionBasic from 'showcase/components/page-components/advanced-table/sub-sections/basic';
import SubSectionDemos from 'showcase/components/page-components/advanced-table/sub-sections/demos';
import SubSectionLayout from 'showcase/components/page-components/advanced-table/sub-sections/layout';
import SubSectionNestedRows from 'showcase/components/page-components/advanced-table/sub-sections/nested-rows';
import SubSectionCustomization from 'showcase/components/page-components/advanced-table/sub-sections/customization';
import SubSectionFunctionalExamples from 'showcase/components/page-components/advanced-table/sub-sections/functional-examples';

import CodeFragmentWithSimpleData from 'showcase/components/page-components/advanced-table/code-fragments/with-simple-data';

import {
  HdsAdvancedTable,
  HdsBadge,
  HdsButton,
  HdsButtonSet,
  HdsDropdown,
  HdsIcon,
  HdsLayoutFlex,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';
import type {
  HdsAdvancedTableOnSelectionChangeSignature,
  HdsAdvancedTableThSortOrder,
} from '@hashicorp/design-system-components/components/hds/advanced-table/types';

// we use an array to declare the custom sorting order for the clusters' status
const customSortingCriteriaArray = [
  'failing',
  'active',
  'establishing',
  'pending',
];

const musicColumns = [
  {
    key: 'artist',
    label: 'Artist',
    tooltip: 'More information.',
  },
  {
    key: 'album',
    label: 'Album',
    tooltip: 'More information.',
    width: '350px',
  },
  {
    key: 'year',
    label: 'Release Year',
    tooltip: 'More information.',
  },
  {
    key: 'other',
    label: 'Additional Actions',
  },
];

const updateModelWithSelectAllState = (
  modelData: SelectableItem[] | User[],
  selectAllState: boolean,
) => {
  modelData.forEach((modelRow) => {
    if (modelRow instanceof Object) {
      modelRow.isSelected = selectAllState;
    }
  });
};

function updateModelWithSelectableRowsStates<
  T extends { id: number; isSelected?: boolean },
>(
  modelData: T[],
  selectableRowsStates: HdsAdvancedTableOnSelectionChangeSignature['selectableRowsStates'],
): void {
  // Create a map from id to row for quick lookup
  const modelDataMap: Map<string, T> = new Map(
    modelData.map((modelRow) => [String(modelRow.id), modelRow]),
  );

  selectableRowsStates.forEach((row) => {
    const record = modelDataMap.get(row.selectionKey);
    if (record) {
      record.isSelected = row.isSelected;
    }
  });
}

const USER_DATA_SHORT = structuredClone(USERS.slice(0, 5));

export default class AdvancedTableIndex extends Component {
  @tracked customSortOrder = 'asc';
  @deepTracked multiSelectSelectableData = [...SELECTABLE_ITEMS];
  @tracked multiSelectFilterRows__demo1 = 'all';
  @tracked multiSelectToggleScope__demo1 = false;
  @tracked multiSelectToggleDebug__demo1 = false;
  @deepTracked multiSelectModelData__demo1 = structuredClone(SELECTABLE_ITEMS);
  @deepTracked multiSelectModelData__demo2 = structuredClone(SELECTABLE_ITEMS);
  @tracked multiSelectToggleScope__demo2 = false;
  @tracked multiSelectToggleDebug__demo2 = false;
  @tracked multiSelectPaginatedCurrentPage_demo2 = 1;
  @tracked multiSelectPaginatedCurrentPageSize_demo2 = 2;
  @tracked multiSelectToggleScope__demo3 = false;
  @tracked multiSelectToggleDebug__demo3 = false;
  @deepTracked multiSelectModelData__demo3 = structuredClone(
    USERS.slice(0, 16),
  );
  @tracked multiSelectUsersCurrentPage_demo3 = 1;
  @tracked multiSelectUsersCurrentPageSize_demo3 = 4;
  @deepTracked multiSelectUserData__demo4 = structuredClone(
    USERS.slice(0, 4).map((user) => ({ ...user, isAnimated: false })),
  );

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

  // GENERIC MULTI-SELECT FUNCTIONALITIES

  onSelectionChangeLogArguments = (
    args: HdsAdvancedTableOnSelectionChangeSignature,
  ) => {
    console.group('onSelectionChangeLogArguments');
    console.log('Selection Key:', args.selectionKey);
    console.log('Checkbox Element:', args.selectionCheckboxElement);
    console.log('Selectable Rows Keys:', args.selectedRowsKeys);
    console.log('Selectable Rows States:', args.selectableRowsStates);
    console.groupEnd();
  };

  // Sortable table with model and sorting by selected row
  onMultiSelectSelectionChange = ({
    selectionKey,
    selectionCheckboxElement,
  }: HdsAdvancedTableOnSelectionChangeSignature) => {
    if (selectionKey === 'all' && selectionCheckboxElement) {
      this.multiSelectSelectableData.forEach((modelRow) => {
        modelRow.isSelected = selectionCheckboxElement.checked;
      });
    } else {
      const recordToUpdate = this.multiSelectSelectableData.find(
        (modelRow) => modelRow.id === Number(selectionKey),
      );

      if (recordToUpdate) {
        recordToUpdate.isSelected = !recordToUpdate.isSelected;
      }
    }
  };

  // MULTI-SELECT DEMO #1
  // Multi-select table with external filter for odd/even rows

  get multiSelectFilteredData__demo1() {
    if (this.multiSelectFilterRows__demo1 === 'all') {
      return this.multiSelectModelData__demo1;
    } else {
      const remainder = this.multiSelectFilterRows__demo1 === 'even' ? 0 : 1;
      return this.multiSelectModelData__demo1.filter(
        (item) => item.id % 2 === remainder,
      );
    }
  }

  toggleMultiSelectToggleScope__demo1 = (event: Event) => {
    this.multiSelectToggleScope__demo1 = (
      event.target as HTMLInputElement
    ).checked;
  };

  toggleMultiSelectToggleDebug__demo1 = (event: Event) => {
    this.multiSelectToggleDebug__demo1 = (
      event.target as HTMLInputElement
    ).checked;
  };

  onChangeMultiSelectFilter__demo1 = (event: Event) => {
    this.multiSelectFilterRows__demo1 = (
      event.target as HTMLInputElement
    ).value;
  };

  onSelectionChangeWithModel__demo1 = ({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsAdvancedTableOnSelectionChangeSignature) => {
    console.group('onSelectionChangeWithModel__demo1');
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.groupEnd();
    if (
      selectionKey === 'all' &&
      this.multiSelectToggleScope__demo1 &&
      selectionCheckboxElement
    ) {
      updateModelWithSelectAllState(
        this.multiSelectModelData__demo1,
        selectionCheckboxElement.checked,
      );
    } else {
      updateModelWithSelectableRowsStates(
        this.multiSelectModelData__demo1,
        selectableRowsStates,
      );
    }
  };

  // MULTI-SELECT DEMO #2
  // Multi-select table with pagination
  toggleMultiSelectPaginatedToggleScope__demo2 = (event: Event) => {
    this.multiSelectToggleScope__demo2 = (
      event.target as HTMLInputElement
    ).checked;
  };

  toggleMultiSelectPaginatedToggleDebug__demo2 = (event: Event) => {
    this.multiSelectToggleDebug__demo2 = (
      event.target as HTMLInputElement
    ).checked;
  };

  get multiSelectPaginatedTotalItems_demo2() {
    return this.multiSelectModelData__demo2.length;
  }

  get multiSelectPaginatedData_demo2() {
    const start =
      (this.multiSelectPaginatedCurrentPage_demo2 - 1) *
      this.multiSelectPaginatedCurrentPageSize_demo2;
    const end =
      this.multiSelectPaginatedCurrentPage_demo2 *
      this.multiSelectPaginatedCurrentPageSize_demo2;
    return this.multiSelectModelData__demo2.slice(start, end);
  }

  onMultiSelectPaginatedPageChange_demo2 = (page: number) => {
    this.multiSelectPaginatedCurrentPage_demo2 = page;
  };

  onMultiSelectPaginatedPageSizeChange_demo2 = (pageSize: number) => {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.multiSelectPaginatedCurrentPage_demo2 = 1;
    this.multiSelectPaginatedCurrentPageSize_demo2 = pageSize;
  };

  onMultiSelectPaginatedSelectionChange__demo2 = ({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsAdvancedTableOnSelectionChangeSignature) => {
    console.group('onMultiSelectPaginatedSelectionChange__demo2');
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.groupEnd();
    if (selectionKey === 'all' && this.multiSelectToggleScope__demo2) {
      updateModelWithSelectAllState(
        this.multiSelectModelData__demo2,
        selectionCheckboxElement ? selectionCheckboxElement.checked : false,
      );
    } else {
      updateModelWithSelectableRowsStates(
        this.multiSelectModelData__demo2,
        selectableRowsStates,
      );
    }
  };

  // MULTI-SELECT DEMO #3
  // Delete selected rows

  toggleMultiSelectPaginatedToggleScope__demo3 = (event: Event) => {
    this.multiSelectToggleScope__demo3 = (
      event.target as HTMLInputElement
    ).checked;
  };

  toggleMultiSelectPaginatedToggleDebug__demo3 = (event: Event) => {
    this.multiSelectToggleDebug__demo3 = (
      event.target as HTMLInputElement
    ).checked;
  };

  get multiSelectUsersTotalItems_demo3() {
    return this.multiSelectModelData__demo3.length;
  }

  get multiSelectUsersData_demo3() {
    const start =
      (this.multiSelectUsersCurrentPage_demo3 - 1) *
      this.multiSelectUsersCurrentPageSize_demo3;
    const end =
      this.multiSelectUsersCurrentPage_demo3 *
      this.multiSelectUsersCurrentPageSize_demo3;
    return this.multiSelectModelData__demo3.slice(start, end);
  }

  onMultiSelectUsersPageChange_demo3 = (page: number) => {
    this.multiSelectUsersCurrentPage_demo3 = page;
  };

  onMultiSelectUsersPageSizeChange_demo3 = (pageSize: number) => {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.multiSelectUsersCurrentPage_demo3 = 1;
    this.multiSelectUsersCurrentPageSize_demo3 = pageSize;
  };

  onMultiSelectUsersSelectionChange__demo3 = ({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsAdvancedTableOnSelectionChangeSignature) => {
    console.group('onMultiSelectUsersSelectionChange__demo3');
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.groupEnd();
    if (selectionKey === 'all' && this.multiSelectToggleScope__demo3) {
      updateModelWithSelectAllState(
        this.multiSelectModelData__demo3,
        selectionCheckboxElement ? selectionCheckboxElement.checked : false,
      );
    } else {
      selectableRowsStates.forEach((row) => {
        const recordToUpdate = this.multiSelectModelData__demo3.find(
          (modelRow) => String(modelRow.id) === row.selectionKey,
        );
        if (recordToUpdate) {
          recordToUpdate.isSelected = row.isSelected;
        }
      });
    }
  };

  multiSelectDeleteSelectedUsers_demo3 = () => {
    const newData = this.multiSelectModelData__demo3.filter(
      (user) => !user.isSelected,
    );
    this.multiSelectModelData__demo3 = [...newData];
  };

  // MULTI-SELECT DEMO #4
  // Execute action on selected rows

  onMultiSelectSelectionChange__demo4 = ({
    selectedRowsKeys,
  }: HdsAdvancedTableOnSelectionChangeSignature) => {
    console.group('onMultiSelectSelectionChange__demo4');
    console.log('Selected Rows Keys:', selectedRowsKeys);
    console.groupEnd();
    this.multiSelectUserData__demo4 = this.multiSelectUserData__demo4.map(
      (user) => {
        user.isSelected = selectedRowsKeys.includes(String(user.id));
        return user;
      },
    );
  };

  multiSelectAnimateSelectedUsers_demo4 = () => {
    this.multiSelectUserData__demo4 = this.multiSelectUserData__demo4.map(
      (user) => {
        user.isAnimated = user.isSelected ? user.isSelected : false;

        return user;
      },
    );

    // eslint-disable-next-line ember/no-runloop
    later(() => {
      this.multiSelectResetUserAnimation_demo4();
    }, 5000);
  };

  multiSelectResetUserAnimation_demo4 = () => {
    this.multiSelectUserData__demo4 = this.multiSelectUserData__demo4.map(
      (user) => {
        user.isAnimated = false;
        return user;
      },
    );
  };

  // COLUMN RESIZING DEMO
  columnResizeColumns = musicColumns;

  columnResizeColumnsWithSorting = this.columnResizeColumns.map(
    (column, index) => {
      return {
        ...column,
        isSortable: index !== this.columnResizeColumns.length - 1, // last column is not sortable
      };
    },
  );

  // COLUMN REORDERING DEMO
  columnReorderColumns = musicColumns;

  columnReorderColumnsWithSorting = this.columnReorderColumns.map(
    (column, index) => {
      return {
        ...column,
        isSortable: index !== this.columnReorderColumns.length - 1, // last column is not sortable
      };
    },
  );

  <template>
    {{pageTitle "AdvancedTable Component"}}

    <ShwTextH1>AdvancedTable</ShwTextH1>

    <section data-test-percy>
      <SubSectionBasic />
      <SubSectionNestedRows />

      <ShwTextH2>Horizontal scrolling indicators</ShwTextH2>
      <div class="shw-component-advanced-table-fixed-width-wrapper">
        <HdsAdvancedTable
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @model={{MUSIC}}
          @isStriped={{true}}
          @maxHeight="400px"
          @hasStickyHeader={{false}}
          @columns={{array
            (hash
              key="artist"
              label="Artist"
              tooltip="More information."
              isSortable=true
            )
            (hash
              key="album"
              label="Album"
              tooltip="More information."
              isSortable=true
            )
            (hash
              key="year"
              label="Release Year"
              tooltip="More information."
              isSortable=true
            )
            (hash key="other" label="Additional Actions")
          }}
        >
          <:body as |B|>
            <B.Tr>
              <B.Th @scope="row"><HdsLinkInline @href="#showcase">
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  {{B.data.artist}}
                </HdsLinkInline></B.Th>
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
                  @type="outlined"
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  @color={{B.data.badge-color}}
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

      <HdsAdvancedTable
        @isSelectable={{true}}
        @onSelectionChange={{this.onMultiSelectUsersSelectionChange__demo3}}
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{USERS}}
        @columns={{array
          (hash key="id" label="ID" width="auto")
          (hash key="name" label="Name")
          (hash key="email" label="Email")
          (hash key="role" label="Role")
        }}
        @maxHeight="400px"
        @isStriped={{true}}
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
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.email}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.role}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

      <ShwTextH3>Sticky column</ShwTextH3>

      <div class="shw-component-advanced-table-fixed-width-wrapper">
        <HdsAdvancedTable
          @isSelectable={{true}}
          @onSelectionChange={{this.onMultiSelectUsersSelectionChange__demo3}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @model={{USERS}}
          @maxHeight="400px"
          @hasStickyHeader={{false}}
          @columns={{array
            (hash key="id" label="ID" width="auto")
            (hash key="name" label="Name" width="max-content")
            (hash key="email" label="Email" width="max-content")
            (hash key="role" label="Role" width="max-content")
          }}
          @hasStickyFirstColumn={{true}}
          @isStriped={{true}}
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
              <B.Th>{{B.data.id}}</B.Th>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.name}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.email}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.role}}</B.Td>
            </B.Tr>
          </:body>
        </HdsAdvancedTable>
      </div>

      <ShwTextH3>Sticky column not selectable</ShwTextH3>

      <div class="shw-component-advanced-table-fixed-width-wrapper">
        <HdsAdvancedTable
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @model={{USERS}}
          @columns={{array
            (hash key="id" label="ID" width="auto")
            (hash key="name" label="Name" width="max-content")
            (hash key="email" label="Email" width="max-content")
            (hash key="role" label="Role" width="max-content")
          }}
          @hasStickyFirstColumn={{true}}
          @isStriped={{true}}
          @maxHeight="400px"
          @hasStickyHeader={{false}}
        >
          <:body as |B|>
            <B.Tr>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Th>{{B.data.id}}</B.Th>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.name}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.email}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.role}}</B.Td>
            </B.Tr>
          </:body>
        </HdsAdvancedTable>
      </div>

      <ShwTextH3>Sticky header and sticky column</ShwTextH3>

      <div class="shw-component-advanced-table-fixed-width-wrapper">
        <HdsAdvancedTable
          @isSelectable={{true}}
          @onSelectionChange={{this.onMultiSelectUsersSelectionChange__demo3}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @model={{USERS}}
          @columns={{array
            (hash key="id" label="ID" width="auto")
            (hash key="name" label="Name" width="max-content")
            (hash key="email" label="Email" width="max-content")
            (hash key="role" label="Role" width="max-content")
          }}
          @maxHeight="400px"
          @hasStickyFirstColumn={{true}}
          @isStriped={{true}}
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
              <B.Th>{{B.data.id}}</B.Th>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.name}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.email}}</B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <B.Td>{{B.data.role}}</B.Td>
            </B.Tr>
          </:body>
        </HdsAdvancedTable>
      </div>

      <ShwDivider />

      <ShwTextH2>Sorting</ShwTextH2>

      <ShwTextH3>Basic sorting</ShwTextH3>

      <ShwTextH4>Sortable table (all columns sortable)</ShwTextH4>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{MUSIC}}
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year" isSortable=true)
        }}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

      <ShwTextH4>Sortable table (only some columns sortable)</ShwTextH4>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{MUSIC}}
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year")
        }}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

      <ShwTextH4>Sortable table, one column right-aligned</ShwTextH4>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{MUSIC}}
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year" isSortable=true align="right")
        }}
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

      <ShwTextH4>Sortable table, some columns sortable, artist column
        pre-sorted.</ShwTextH4>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{MUSIC}}
        @columns={{array
          (hash key="artist" label="Artist" isSortable=true)
          (hash key="album" label="Album" isSortable=true)
          (hash key="year" label="Release Year" align="right")
        }}
        @sortBy="artist"
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

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

      <ShwTextH2>Tooltip</ShwTextH2>

      <CodeFragmentWithSimpleData @hasTooltips={{true}} />

      <ShwDivider />

      <ShwTextH2>Multi-select</ShwTextH2>

      <HdsAdvancedTable
        @isSelectable={{true}}
        @onSelectionChange={{this.onSelectionChangeLogArguments}}
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{this.model.selectableData}}
        @columns={{array
          (hash key="lorem" label="Row #")
          (hash key="ipsum" label="Ipsum")
          (hash key="dolor" label="Dolor")
        }}
      >
        <:body as |B|>
          <B.Tr
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @selectionKey="{{B.data.id}}"
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @isSelected={{B.data.isSelected}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @selectionAriaLabelSuffix="row #{{B.data.lorem}}"
          >
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.lorem}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.ipsum}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.dolor}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

      <ShwTextH4 @tag="h3">Sortable table with sorting by selected item</ShwTextH4>

      <HdsAdvancedTable
        @isSelectable={{true}}
        @onSelectionChange={{this.onMultiSelectSelectionChange}}
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{this.multiSelectSelectableData}}
        @columns={{array
          (hash key="lorem" label="Row #" isSortable=true)
          (hash key="ipsum" label="Ipsum")
          (hash key="dolor" label="Dolor")
        }}
      >
        <:body as |B|>
          <B.Tr
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @selectionKey="{{B.data.id}}"
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @isSelected={{B.data.isSelected}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @selectionAriaLabelSuffix="row #{{B.data.lorem}}"
          >
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.lorem}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.ipsum}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.dolor}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Reorderable columns</ShwTextH2>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{MUSIC}}
        @columns={{this.columnReorderColumns}}
        @hasReorderableColumns={{true}}
      >
        <:body as |B|>
          {{! @glint-expect-error - this argument shouldn't be required, will be fixed by https://hashicorp.atlassian.net/browse/HDS-5167}}
          <B.Tr @selectionKey="{{B.data.id}}" as |R|>
            {{#each R.orderedCells as |C|}}
              {{#if (eq C.columnKey "artist")}}
                <B.Th @scope="row"><HdsLinkInline @href="#showcase">
                    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                    {{B.data.artist}}
                  </HdsLinkInline></B.Th>
              {{else}}
                <B.Td>
                  {{#if (eq C.columnKey "album")}}
                    <div class="shw-component-advanced-table-cell-content-div">
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      {{B.data.album}}
                    </div>
                  {{else if (eq C.columnKey "year")}}
                    <HdsBadge
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      @text={{B.data.year}}
                      @type="outlined"
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      @color={{B.data.badge-color}}
                    />
                  {{else}}
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
                  {{/if}}
                </B.Td>
              {{/if}}
            {{/each}}
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

      <ShwTextH4 @tag="h3">Reorderable columns with sorting</ShwTextH4>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{MUSIC}}
        @columns={{this.columnReorderColumnsWithSorting}}
        @hasReorderableColumns={{true}}
      >
        <:body as |B|>
          <B.Tr as |R|>
            {{#each R.orderedCells as |C|}}
              {{#if (eq C.columnKey "artist")}}
                <B.Th @scope="row"><HdsLinkInline @href="#showcase">
                    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                    {{B.data.artist}}
                  </HdsLinkInline></B.Th>
              {{else}}
                <B.Td>
                  {{#if (eq C.columnKey "album")}}
                    <div class="shw-component-advanced-table-cell-content-div">
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      {{B.data.album}}
                    </div>
                  {{else if (eq C.columnKey "year")}}
                    <HdsBadge
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      @text={{B.data.year}}
                      @type="outlined"
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      @color={{B.data.badge-color}}
                    />
                  {{else}}
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
                  {{/if}}
                </B.Td>
              {{/if}}
            {{/each}}
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

      <ShwTextH4 @tag="h3">Reorderable columns with sticky header</ShwTextH4>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{MUSIC}}
        @columns={{this.columnReorderColumnsWithSorting}}
        @hasReorderableColumns={{true}}
        @hasStickyHeader={{true}}
        @maxHeight="200px"
      >
        <:body as |B|>
          <B.Tr as |R|>
            {{#each R.orderedCells as |C|}}
              {{#if (eq C.columnKey "artist")}}
                <B.Th @scope="row"><HdsLinkInline @href="#showcase">
                    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                    {{B.data.artist}}
                  </HdsLinkInline></B.Th>
              {{else}}
                <B.Td>
                  {{#if (eq C.columnKey "album")}}
                    <div class="shw-component-advanced-table-cell-content-div">
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      {{B.data.album}}
                    </div>
                  {{else if (eq C.columnKey "year")}}
                    <HdsBadge
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      @text={{B.data.year}}
                      @type="outlined"
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      @color={{B.data.badge-color}}
                    />
                  {{else}}
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
                  {{/if}}
                </B.Td>
              {{/if}}
            {{/each}}
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

      <ShwTextH4 @tag="h3">Reorderable columns with horizontal overflow</ShwTextH4>

      <div>
        <HdsAdvancedTable
          @isSelectable={{true}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @model={{INFRASTRUCTURE_RESOURCES}}
          @columns={{array
            (hash key="resource_id" label="Resource ID" width="350px")
            (hash key="status" label="Current Status" width="175px")
            (hash key="namespace" label="Namespace")
            (hash key="provider_name" label="Provider Name" width="175px")
            (hash key="created_at" label="Created At" width="175px")
            (hash key="last_run_time" label="Last Run" width="175px")
            (hash key="lease_duration" label="Lease Duration" width="175px")
            (hash key="workspace" label="Workspace")
            (hash key="datacenter" label="Datacenter")
            (hash key="job_spec_version" label="Job Spec Version" width="200px")
            (hash
              key="attached_policies" label="Attached Policies" width="200px"
            )
            (hash key="target_endpoint" label="Target Endpoint")
            (hash key="audit_device_path" label="Audit Device Path")
            (hash key="tags" label="Tags")
          }}
          @hasReorderableColumns={{true}}
        >
          <:body as |B|>
            <B.Tr
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @selectionKey="{{B.data.id}}"
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @isSelected={{B.data.isSelected}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @selectionAriaLabelSuffix="row #{{B.data.lorem}}"
              as |R|
            >
              {{#each R.orderedCells as |C|}}
                <B.Td>
                  {{#if (eq C.columnKey "status")}}
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
                  {{else if
                    (or
                      (eq C.columnKey "created_at")
                      (eq C.columnKey "last_run_time")
                    )
                  }}
                    {{#if (eq C.columnKey "created_at")}}
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      {{formatDate (get B.data "created_at")}}
                    {{else}}
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      {{formatDate (get B.data "last_run_time")}}
                    {{/if}}
                  {{else if
                    (or
                      (eq C.columnKey "attached_policies")
                      (eq C.columnKey "tags")
                    )
                  }}
                    <HdsLayoutFlex @align="center" @gap="4">
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      {{#each C.content as |content|}}
                        <HdsBadge
                          @text={{content}}
                          @type="outlined"
                          @color="neutral"
                        />
                      {{/each}}
                    </HdsLayoutFlex>
                  {{else}}
                    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                    {{C.content}}
                  {{/if}}
                </B.Td>
              {{/each}}
            </B.Tr>
          </:body>
        </HdsAdvancedTable>
      </div>

      <ShwTextH4 @tag="h3">Reorderable columns with selectable rows</ShwTextH4>

      <div>
        <HdsAdvancedTable
          @isSelectable={{true}}
          @onSelectionChange={{this.onSelectionChangeLogArguments}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @model={{this.model.selectableData}}
          @columns={{array
            (hash key="lorem" label="Row #" isSortable=true)
            (hash key="ipsum" label="Ipsum")
            (hash key="dolor" label="Dolor")
          }}
          @hasReorderableColumns={{true}}
        >
          <:body as |B|>
            <B.Tr
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @selectionKey="{{B.data.id}}"
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @isSelected={{B.data.isSelected}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @selectionAriaLabelSuffix="row #{{B.data.lorem}}"
              as |R|
            >
              {{#each R.orderedCells as |C|}}
                <B.Td>
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  {{C.content}}
                </B.Td>
              {{/each}}
            </B.Tr>
          </:body>
        </HdsAdvancedTable>
      </div>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Resizable columns</ShwTextH2>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{MUSIC}}
        @columns={{this.columnResizeColumns}}
        @hasResizableColumns={{true}}
      >
        <:body as |B|>
          <B.Tr>
            <B.Th @scope="row"><HdsLinkInline @href="#showcase">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.artist}}
              </HdsLinkInline></B.Th>
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
                @type="outlined"
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                @color={{B.data.badge-color}}
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

      <ShwTextH4 @tag="h3">Resizable columns with sorting</ShwTextH4>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{MUSIC}}
        @columns={{this.columnResizeColumnsWithSorting}}
        @hasResizableColumns={{true}}
      >
        <:body as |B|>
          <B.Tr>
            <B.Th @scope="row"><HdsLinkInline @href="#showcase">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.artist}}
              </HdsLinkInline></B.Th>
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
                @type="outlined"
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                @color={{B.data.badge-color}}
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

      <ShwTextH4 @tag="h3">Resizable columns with truncated cell content</ShwTextH4>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{MUSIC}}
        @columns={{array
          (hash key="artist" label="Artist")
          (hash key="album" label="Album")
          (hash key="quote" label="Quote" width="400px")
        }}
        @hasResizableColumns={{true}}
      >
        <:body as |B|>
          <B.Tr>
            <B.Th @scope="row"><HdsLinkInline @href="#showcase">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.artist}}
              </HdsLinkInline></B.Th>
            <B.Td>
              <div class="shw-component-advanced-table-cell-content-div">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
                <span class="shw-component-advanced-table-text-truncate">
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  {{B.data.album}}
                </span>
              </div>
            </B.Td>
            <B.Td>
              <span class="shw-component-advanced-table-text-truncate">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.quote}}
              </span>
            </B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

      <ShwTextH4 @tag="h3">Resizable and reorderable columns</ShwTextH4>

      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{MUSIC}}
        @columns={{this.columnResizeColumns}}
        @hasResizableColumns={{true}}
        @hasReorderableColumns={{true}}
      >
        <:body as |B|>
          {{! @glint-expect-error - this argument shouldn't be required, will be fixed by https://hashicorp.atlassian.net/browse/HDS-5167}}
          <B.Tr @selectionKey="{{B.data.id}}" as |R|>
            {{#each R.orderedCells as |C|}}
              {{#if (eq C.columnKey "artist")}}
                <B.Th @scope="row"><HdsLinkInline @href="#showcase">
                    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                    {{B.data.artist}}
                  </HdsLinkInline></B.Th>
              {{else}}
                <B.Td>
                  {{#if (eq C.columnKey "album")}}
                    <div class="shw-component-advanced-table-cell-content-div">
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      {{B.data.album}}
                    </div>
                  {{else if (eq C.columnKey "year")}}
                    <HdsBadge
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      @text={{B.data.year}}
                      @type="outlined"
                      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                      @color={{B.data.badge-color}}
                    />
                  {{else}}
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
                  {{/if}}
                </B.Td>
              {{/if}}
            {{/each}}
          </B.Tr>
        </:body>
      </HdsAdvancedTable>

      <ShwDivider />

      <ShwTextH2>Pinnable first column</ShwTextH2>

      <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
        {{#let (array false true) as |stickyBools|}}
          {{#each stickyBools as |stickyBool|}}
            {{#let (array false true) as |selectableBools|}}
              {{#each selectableBools as |selectableBool|}}
                {{#let (array false true) as |sortableBools|}}
                  {{#each sortableBools as |sortableBool|}}
                    <SG.Item
                      @label="hasStickyFirstColumn={{stickyBool}}, isSelectable={{selectableBool}}, isSortable={{sortableBool}}"
                    >
                      <HdsAdvancedTable
                        @isSelectable={{selectableBool}}
                        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                        @model={{USER_DATA_SHORT}}
                        @columns={{array
                          (hash key="id" label="ID" isSortable=sortableBool)
                          (hash key="name" label="Name")
                          (hash key="email" label="Email")
                          (hash key="role" label="Role")
                        }}
                        @hasStickyFirstColumn={{stickyBool}}
                      >
                        <:body as |B|>
                          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                          <B.Tr @selectionKey="{{B.data.id}}">
                            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                            <B.Th>{{B.data.id}}</B.Th>
                            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                            <B.Td>{{B.data.name}}</B.Td>
                            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                            <B.Td>{{B.data.email}}</B.Td>
                            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                            <B.Td>{{B.data.role}}</B.Td>
                          </B.Tr>
                        </:body>
                      </HdsAdvancedTable>
                    </SG.Item>
                  {{/each}}
                {{/let}}
              {{/each}}
            {{/let}}
          {{/each}}
        {{/let}}
      </ShwGrid>

      <ShwDivider />

      <SubSectionFunctionalExamples />
      <SubSectionCustomization />
      <SubSectionLayout />
      <SubSectionDemos />
      <SubSectionBaseElements />
    </section>
  </template>
}
