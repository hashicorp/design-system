/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { later } from '@ember/runloop';
import type Owner from '@ember/owner';

import type { PageComponentsAdvancedTableModel } from 'showcase/routes/page-components/advanced-table';
import type { SelectableItem } from 'showcase/mocks/selectable-item-data';
import type { User } from 'showcase/mocks/user-data';

import type {
  HdsAdvancedTableOnSelectionChangeSignature,
  HdsAdvancedTableThSortOrder,
} from '@hashicorp/design-system-components/components/hds/advanced-table/types';
import HdsAdvancedTableModel from '@hashicorp/design-system-components/components/hds/advanced-table/models/table';

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

export default class PageComponentsAdvancedTableController extends Controller {
  declare model: PageComponentsAdvancedTableModel;

  @tracked customSortOrder = 'asc';
  // @ts-expect-error - we need to reevaluate how we get the data for the table demos when we break up the template files into sub components
  @deepTracked multiSelectSelectableData = [...this.model.selectableData];
  @tracked multiSelectFilterRows__demo1 = 'all';
  @tracked multiSelectToggleScope__demo1 = false;
  @tracked multiSelectToggleDebug__demo1 = false;
  @deepTracked multiSelectModelData__demo1 = [
    // @ts-expect-error - we need to reevaluate how we get the data for the table demos when we break up the template files into sub components
    ...this.model.selectableDataDemo1,
  ];
  @deepTracked multiSelectModelData__demo2 = [
    // @ts-expect-error - we need to reevaluate how we get the data for the table demos when we break up the template files into sub components
    ...this.model.selectableDataDemo2,
  ];
  @tracked multiSelectToggleScope__demo2 = false;
  @tracked multiSelectToggleDebug__demo2 = false;
  @tracked multiSelectPaginatedCurrentPage_demo2 = 1;
  @tracked multiSelectPaginatedCurrentPageSize_demo2 = 2;
  @tracked multiSelectToggleScope__demo3 = false;
  @tracked multiSelectToggleDebug__demo3 = false;
  // @ts-expect-error - we need to reevaluate how we get the data for the table demos when we break up the template files into sub components
  @deepTracked multiSelectModelData__demo3 = [...this.model.userDataDemo3];
  @tracked multiSelectUsersCurrentPage_demo3 = 1;
  @tracked multiSelectUsersCurrentPageSize_demo3 = 4;
  // @ts-expect-error - we need to reevaluate how we get the data for the table demos when we break up the template files into sub components
  @deepTracked multiSelectUserData__demo4 = [...this.model.userDataDemo4];
  @tracked focusableElementsVisible = false;

  sampleTableModel!: HdsAdvancedTableModel;

  constructor(owner: Owner) {
    super(owner);

    this.sampleTableModel = new HdsAdvancedTableModel({
      model: [
        {
          value: 'lorem',
        },
        {
          value: 'ipsum',
        },
      ],
      hasResizableColumns: true,
      columns: [
        {
          label: 'Label',
          isVisuallyHidden: true,
        },
      ],
    });
  }

  get clustersWithExtraData() {
    return this.model.clusters.map((record) => {
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

  @action
  customOnSort(_sortBy: string, sortOrder: HdsAdvancedTableThSortOrder) {
    this.customSortOrder = sortOrder;
  }

  // GENERIC MULTI-SELECT FUNCTIONALITIES

  @action
  onSelectionChangeLogArguments(
    args: HdsAdvancedTableOnSelectionChangeSignature,
  ) {
    console.group('onSelectionChangeLogArguments');
    console.log('Selection Key:', args.selectionKey);
    console.log('Checkbox Element:', args.selectionCheckboxElement);
    console.log('Selectable Rows Keys:', args.selectedRowsKeys);
    console.log('Selectable Rows States:', args.selectableRowsStates);
    console.groupEnd();
  }

  // Sortable table with model and sorting by selected row

  @action
  onMultiSelectSelectionChange({
    selectionKey,
    selectionCheckboxElement,
  }: HdsAdvancedTableOnSelectionChangeSignature) {
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
  }

  @action
  mockIndeterminateState(checkbox: HTMLInputElement) {
    checkbox.indeterminate = true;
  }

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

  @action
  toggleMultiSelectToggleScope__demo1(event: Event) {
    this.multiSelectToggleScope__demo1 = (
      event.target as HTMLInputElement
    ).checked;
  }

  @action
  toggleMultiSelectToggleDebug__demo1(event: Event) {
    this.multiSelectToggleDebug__demo1 = (
      event.target as HTMLInputElement
    ).checked;
  }

  @action
  onChangeMultiSelectFilter__demo1(event: Event) {
    this.multiSelectFilterRows__demo1 = (
      event.target as HTMLInputElement
    ).value;
  }

  @action
  onSelectionChangeWithModel__demo1({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsAdvancedTableOnSelectionChangeSignature) {
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
  }

  // MULTI-SELECT DEMO #2
  // Multi-select table with pagination

  @action
  toggleMultiSelectPaginatedToggleScope__demo2(event: Event) {
    this.multiSelectToggleScope__demo2 = (
      event.target as HTMLInputElement
    ).checked;
  }

  @action
  toggleMultiSelectPaginatedToggleDebug__demo2(event: Event) {
    this.multiSelectToggleDebug__demo2 = (
      event.target as HTMLInputElement
    ).checked;
  }

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

  @action
  onMultiSelectPaginatedPageChange_demo2(page: number) {
    this.multiSelectPaginatedCurrentPage_demo2 = page;
  }

  @action
  onMultiSelectPaginatedPageSizeChange_demo2(pageSize: number) {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.multiSelectPaginatedCurrentPage_demo2 = 1;
    this.multiSelectPaginatedCurrentPageSize_demo2 = pageSize;
  }

  @action
  onMultiSelectPaginatedSelectionChange__demo2({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsAdvancedTableOnSelectionChangeSignature) {
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
  }

  // MULTI-SELECT DEMO #3
  // Delete selected rows

  @action
  toggleMultiSelectPaginatedToggleScope__demo3(event: Event) {
    this.multiSelectToggleScope__demo3 = (
      event.target as HTMLInputElement
    ).checked;
  }

  @action
  toggleMultiSelectPaginatedToggleDebug__demo3(event: Event) {
    this.multiSelectToggleDebug__demo3 = (
      event.target as HTMLInputElement
    ).checked;
  }

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

  @action
  onMultiSelectUsersPageChange_demo3(page: number) {
    this.multiSelectUsersCurrentPage_demo3 = page;
  }

  @action
  onMultiSelectUsersPageSizeChange_demo3(pageSize: number) {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.multiSelectUsersCurrentPage_demo3 = 1;
    this.multiSelectUsersCurrentPageSize_demo3 = pageSize;
  }

  @action
  onMultiSelectUsersSelectionChange__demo3({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsAdvancedTableOnSelectionChangeSignature) {
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
  }

  @action
  multiSelectDeleteSelectedUsers_demo3() {
    const newData = this.multiSelectModelData__demo3.filter(
      (user) => !user.isSelected,
    );
    this.multiSelectModelData__demo3 = [...newData];
  }

  // MULTI-SELECT DEMO #4
  // Execute action on selected rows

  @action
  onMultiSelectSelectionChange__demo4({
    selectedRowsKeys,
  }: HdsAdvancedTableOnSelectionChangeSignature) {
    console.group('onMultiSelectSelectionChange__demo4');
    console.log('Selected Rows Keys:', selectedRowsKeys);
    console.groupEnd();
    this.multiSelectUserData__demo4.forEach((user) => {
      user.isSelected = selectedRowsKeys.includes(String(user.id));
    });
  }

  @action
  multiSelectAnimateSelectedUsers_demo4() {
    this.multiSelectUserData__demo4.forEach((user) => {
      user.isAnimated = user.isSelected ? user.isSelected : false;
    });

    // eslint-disable-next-line ember/no-runloop
    later(() => {
      this.multiSelectResetUserAnimation_demo4();
    }, 5000);
  }

  @action
  multiSelectResetUserAnimation_demo4() {
    this.multiSelectUserData__demo4.forEach((user) => {
      user.isAnimated = false;
    });
  }

  // Example where dynamically add more focusable elements to a cell
  @action toggleElementsVisibility() {
    this.focusableElementsVisible = !this.focusableElementsVisible;
  }

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

  @action
  noop() {
    // no-op
  }
}
