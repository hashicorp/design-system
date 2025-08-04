/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { later } from '@ember/runloop';

import type { PageComponentsTableModel } from '../../routes/page-components/table';
import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';

import type {
  MockDataCluster,
  MockDataSelectable,
  MockDataUser,
} from '../../routes/page-components/table';

type MultiSelectNoModel = {
  row1: boolean;
  row2: boolean;
  row3: boolean;
  row4: boolean;
};

// we use an array to declare the custom sorting order for the clusters' status
const customSortingCriteriaArray = [
  'failing',
  'active',
  'establishing',
  'pending',
];

const updateModelWithSelectAllState = (
  modelData: MockDataSelectable[] | MockDataUser[],
  selectAllState: boolean,
) => {
  modelData.forEach((modelRow) => {
    modelRow.isSelected = selectAllState;
  });
};

const updateModelWithSelectableRowsStates = (
  modelData: MockDataSelectable[] | MockDataUser[],
  selectableRowsStates: HdsTableOnSelectionChangeSignature['selectableRowsStates'],
) => {
  const modelDataMap = new Map(
    modelData.map((modelRow) => [modelRow.id, modelRow]),
  );
  selectableRowsStates.forEach((row) => {
    // safe to assume that there is always a record for the "selectionKey" since it's coming from the model (the selectable "rows" are a subset of the model dataset)
    modelDataMap.get(Number(row.selectionKey))!.isSelected = row.isSelected
      ? true
      : false;
  });
};

export default class PageComponentsTableController extends Controller {
  declare model: PageComponentsTableModel;

  // custom sorting
  @tracked customSortOrder_demo2 = 'asc';
  @tracked customSortBy_demo3: string | undefined = undefined;
  @tracked customSortOrder_demo3 = 'asc';

  // multi-select
  @tracked multiSelectFilterRows__demo1 = 'all';
  @tracked multiSelectToggleScope__demo1 = false;
  @tracked multiSelectToggleDebug__demo1 = false;
  @deepTracked multiSelectSelectableData__demo1 = [
    // @ts-expect-error - we need to reevaluate how we get the data for the table demos when we break up the template files into sub components
    ...this.model.selectableDataDemo1,
  ];
  @deepTracked multiSelectNoModelState__demo1: MultiSelectNoModel = {
    row1: false,
    row2: true,
    row3: false,
    row4: false,
  };
  @deepTracked multiSelectSelectableData__demo2 = [
    // @ts-expect-error - we need to reevaluate how we get the data for the table demos when we break up the template files into sub components
    ...this.model.selectableDataDemo2,
  ];
  @tracked multiSelectToggleScope__demo2 = false;
  @tracked multiSelectToggleDebug__demo2 = false;
  @tracked multiSelectPaginatedCurrentPage_demo2 = 1;
  @tracked multiSelectPaginatedCurrentPageSize_demo2 = 2;
  @tracked multiSelectToggleScope__demo3 = false;
  @tracked multiSelectToggleDebug__demo3 = false;
  @deepTracked multiSelectUserData__demo3 = [
    // @ts-expect-error - we need to reevaluate how we get the data for the table demos when we break up the template files into sub components
    ...this.model.userDataDemo3,
  ];
  @tracked multiSelectUsersCurrentPage_demo3 = 1;
  @tracked multiSelectUsersCurrentPageSize_demo3 = 4;
  @deepTracked multiSelectUserData__demo4 = [
    // @ts-expect-error - we need to reevaluate how we get the data for the table demos when we break up the template files into sub components
    ...this.model.userDataDemo4,
  ];
  @deepTracked multiSelectSelectableData__demo5 = [
    // @ts-expect-error - we need to reevaluate how we get the data for the table demos when we break up the template files into sub components
    ...this.model.selectableDataDemo5,
  ];
  @tracked customSortBy_demo6: keyof MockDataSelectable | undefined = undefined;
  @tracked customSortOrder_demo6 = 'asc';
  @deepTracked multiSelectSelectableData__demo6 = [
    // @ts-expect-error - we need to reevaluate how we get the data for the table demos when we break up the template files into sub components
    ...this.model.selectableDataDemo6,
  ];

  // CUSTOM SORTING DEMO #1
  // Sortable table with custom sorting done via extra key added to the data model

  get clustersWithExtraData_demo1(): Record<string, unknown>[] {
    return this.model.clusters.map((record: MockDataCluster) => {
      return {
        ...record,
        'status-sort-order': customSortingCriteriaArray.indexOf(
          record['status'],
        ),
      };
    });
  }

  // CUSTOM SORTING DEMO #2
  // Sortable table with custom `sortingFunction` declared in the column hash

  get customSortingFunction_demo2(): <T>(s1: T, s2: T) => number {
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
          return this.customSortOrder_demo2 === 'asc' ? -1 : 1;
        } else if (index1 > index2) {
          return this.customSortOrder_demo2 === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      }
      return 0;
    };
  }

  @action
  customOnSort_demo2(_sortBy: string, sortOrder: string) {
    this.customSortOrder_demo2 = sortOrder;
  }

  // CUSTOM SORTING DEMO #3
  // Sortable table with custom sorting using yielded `<ThSort>` + `sortBy/sortOrder/setSortBy` properties

  @action
  onClickThSort__demo3(column: string, setSortBy?: (column: string) => void) {
    // NOTICE: this code is a direct clone of the internal code of `Hds::Table` backing class
    // we need to keep an internal state of the sorting
    if (this.customSortBy_demo3 === column) {
      // check to see if the column is already sorted and invert the sort order if so
      this.customSortOrder_demo3 =
        this.customSortOrder_demo3 === 'asc' ? 'desc' : 'asc';
    } else {
      // otherwise, set the sort order to ascending
      this.customSortBy_demo3 = column;
      this.customSortOrder_demo3 = 'asc';
    }
    // update the sorting icons for the table
    if (setSortBy && typeof setSortBy === 'function') {
      setSortBy(column);
    }
  }

  get sortedModelClusters__demo3() {
    const clonedModelClusters = Array.from(this.model.clusters);
    if (this.customSortBy_demo3 === 'peer-name') {
      clonedModelClusters.sort((s1, s2) => {
        const name1 = s1['peer-name'].toLowerCase();
        const name2 = s2['peer-name'].toLowerCase();
        if (name1 < name2) {
          return this.customSortOrder_demo3 === 'asc' ? -1 : 1;
        }
        if (name1 > name2) {
          return this.customSortOrder_demo3 === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else if (this.customSortBy_demo3 === 'status') {
      clonedModelClusters.sort((s1, s2) => {
        const index1 = customSortingCriteriaArray.indexOf(s1['status']);
        const index2 = customSortingCriteriaArray.indexOf(s2['status']);
        if (index1 < index2) {
          return this.customSortOrder_demo3 === 'asc' ? -1 : 1;
        } else if (index1 > index2) {
          return this.customSortOrder_demo3 === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    return clonedModelClusters;
  }

  @action
  extraOnSortCallback_demo3() {
    console.group('extraOnSortCallback called with:');
    console.log('customSortBy:', this.customSortBy_demo3);
    console.log('customSortOrder:', this.customSortOrder_demo3);
    console.groupEnd();
  }

  // CUSTOM SORTING DEMO #4
  // Sortable table with custom sorting using yielded `<ThSort>` + `sortBy/sortOrder/setSortBy` properties

  sortModelClusters__demo4 = (sortBy?: string, sortOrder?: string) => {
    // here goes the logic for the custom sorting of the `model` array based on `sortBy/sortOrder`
    const clonedModelClusters = Array.from(this.model.clusters);
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

  // CUSTOM SORTING DEMO #5
  // Sortable table with model and sorting by selected row

  @action
  onMultiSelectSelectionChange__demo5({
    selectionKey,
    selectionCheckboxElement,
  }: HdsTableOnSelectionChangeSignature) {
    if (selectionKey) {
      if (selectionKey === 'all' && selectionCheckboxElement) {
        this.multiSelectSelectableData__demo5.forEach(
          (modelRow: MockDataSelectable) => {
            modelRow.isSelected = selectionCheckboxElement.checked;
          },
        );
      } else {
        const recordToUpdate = this.multiSelectSelectableData__demo5.find(
          (modelRow: MockDataSelectable) =>
            modelRow.id === Number(selectionKey),
        );

        if (recordToUpdate) {
          recordToUpdate.isSelected = !recordToUpdate.isSelected;
        }
      }
    }
  }

  // CUSTOM SORTING DEMO #6
  // Sortable table with sorting by selected using yielded `<Tr>/<ThSort>`

  get sortedMultiSelect__demo6() {
    const clonedMultiSelect = Array.from(this.multiSelectSelectableData__demo6);
    clonedMultiSelect.sort((s1: MockDataSelectable, s2: MockDataSelectable) => {
      if (this.customSortBy_demo6) {
        const v1 = s1[this.customSortBy_demo6];
        const v2 = s2[this.customSortBy_demo6];
        if (v1 < v2) {
          return this.customSortOrder_demo6 === 'asc' ? -1 : 1;
        }
        if (v1 > v2) {
          return this.customSortOrder_demo6 === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
    return clonedMultiSelect;
  }

  @action
  customOnSort_demo6(sortBy: string, sortOrder: string) {
    this.customSortBy_demo6 = sortBy as keyof MockDataSelectable;
    this.customSortOrder_demo6 = sortOrder;
  }

  @action
  onMultiSelectSelectionChange__demo6({
    selectionKey,
    selectionCheckboxElement,
  }: HdsTableOnSelectionChangeSignature) {
    if (selectionKey) {
      if (selectionKey === 'all' && selectionCheckboxElement) {
        this.multiSelectSelectableData__demo5.forEach(
          (modelRow: MockDataSelectable) => {
            modelRow.isSelected = selectionCheckboxElement.checked;
          },
        );
      } else {
        const recordToUpdate = this.multiSelectSelectableData__demo5.find(
          (modelRow: MockDataSelectable) =>
            modelRow.id === Number(selectionKey),
        );

        if (recordToUpdate) {
          recordToUpdate.isSelected = !recordToUpdate.isSelected;
        }
      }
    }
  }

  // // GENERIC MULTI-SELECT FUNCTIONALITIES

  @action
  onSelectionChangeLogArguments({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
    selectedRowsKeys,
  }: HdsTableOnSelectionChangeSignature) {
    console.group('Selection Change with Model Arguments');
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.log('Selected Rows Keys:', selectedRowsKeys);
    console.groupEnd();
  }

  @action
  mockIndeterminateState(checkbox: HTMLInputElement) {
    checkbox.indeterminate = true;
  }

  // MULTI-SELECT DEMO #1
  // Multi-select table with external filter for odd/even rows

  get multiSelectFilteredData__demo1() {
    if (this.multiSelectFilterRows__demo1 === 'all') {
      return this.multiSelectSelectableData__demo1;
    } else {
      const remainder = this.multiSelectFilterRows__demo1 === 'even' ? 0 : 1;
      return this.multiSelectSelectableData__demo1.filter(
        (item) => item.id % 2 === remainder,
      );
    }
  }

  @action
  toggleMultiSelectToggleScope__demo1(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.multiSelectToggleScope__demo1 = checkbox.checked;
  }

  @action
  toggleMultiSelectToggleDebug__demo1(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.multiSelectToggleDebug__demo1 = checkbox.checked;
  }

  @action
  onChangeMultiSelectFilter__demo1(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.multiSelectFilterRows__demo1 = checkbox.value;
  }

  @action
  onSelectionChangeWithModel__demo1({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsTableOnSelectionChangeSignature) {
    console.group('Selection Change with Model Arguments');
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.groupEnd();
    if (selectionKey) {
      if (
        selectionKey === 'all' &&
        selectionCheckboxElement &&
        this.multiSelectToggleScope__demo1
      ) {
        updateModelWithSelectAllState(
          this.multiSelectSelectableData__demo1,
          selectionCheckboxElement.checked,
        );
      } else {
        updateModelWithSelectableRowsStates(
          this.multiSelectSelectableData__demo1,
          selectableRowsStates,
        );
      }
    }
  }

  @action
  onSelectionChangeWithoutModel__demo1({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsTableOnSelectionChangeSignature) {
    console.group('Selection Change with Model Arguments');
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.groupEnd();
    // notice: the shape of the "model" is slightly different, it's not an array of objects but an object with keys so
    // we can't use the `updateModelWithSelectAllsState` and `updateModelWithSelectableRowsStates` functions
    if (selectionKey) {
      if (
        selectionKey === 'all' &&
        selectionCheckboxElement &&
        this.multiSelectToggleScope__demo1
      ) {
        const selectAllState = selectionCheckboxElement.checked;
        Object.keys(this.multiSelectNoModelState__demo1).forEach((rowKey) => {
          this.multiSelectNoModelState__demo1[
            rowKey as keyof MultiSelectNoModel
          ] = selectAllState;
        });
      } else {
        const mapSelectionKeyToRowKey = (
          key: string | number,
        ): keyof MultiSelectNoModel => {
          return key as keyof MultiSelectNoModel;
        };
        selectableRowsStates.forEach((row) => {
          const rowKey = mapSelectionKeyToRowKey(row.selectionKey);
          this.multiSelectNoModelState__demo1[rowKey] = row.isSelected
            ? true
            : false;
        });
      }
    }
  }

  // // MULTI-SELECT DEMO #2
  // // Multi-select table with pagination

  @action
  toggleMultiSelectPaginatedToggleScope__demo2(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.multiSelectToggleScope__demo2 = checkbox.checked;
  }

  @action
  toggleMultiSelectPaginatedToggleDebug__demo2(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.multiSelectToggleDebug__demo2 = checkbox.checked;
  }

  get multiSelectPaginatedTotalItems_demo2() {
    return this.multiSelectSelectableData__demo2.length;
  }

  get multiSelectPaginatedData_demo2() {
    const start =
      (this.multiSelectPaginatedCurrentPage_demo2 - 1) *
      this.multiSelectPaginatedCurrentPageSize_demo2;
    const end =
      this.multiSelectPaginatedCurrentPage_demo2 *
      this.multiSelectPaginatedCurrentPageSize_demo2;
    return this.multiSelectSelectableData__demo2.slice(start, end);
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
  }: HdsTableOnSelectionChangeSignature) {
    console.group('Selection Change with Model Arguments');
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.groupEnd();
    if (selectionKey) {
      if (
        selectionKey === 'all' &&
        selectionCheckboxElement &&
        this.multiSelectToggleScope__demo2
      ) {
        updateModelWithSelectAllState(
          this.multiSelectSelectableData__demo2,
          selectionCheckboxElement.checked,
        );
      } else {
        updateModelWithSelectableRowsStates(
          this.multiSelectSelectableData__demo2,
          selectableRowsStates,
        );
      }
    }
  }

  // // MULTI-SELECT DEMO #3
  // // Delete selected rows

  @action
  toggleMultiSelectPaginatedToggleScope__demo3(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.multiSelectToggleScope__demo3 = checkbox.checked;
  }

  @action
  toggleMultiSelectPaginatedToggleDebug__demo3(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.multiSelectToggleDebug__demo3 = checkbox.checked;
  }

  get multiSelectUsersTotalItems_demo3() {
    return this.multiSelectUserData__demo3.length;
  }

  get multiSelectUsersData_demo3() {
    const start =
      (this.multiSelectUsersCurrentPage_demo3 - 1) *
      this.multiSelectUsersCurrentPageSize_demo3;
    const end =
      this.multiSelectUsersCurrentPage_demo3 *
      this.multiSelectUsersCurrentPageSize_demo3;
    return this.multiSelectUserData__demo3.slice(start, end);
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
  }: HdsTableOnSelectionChangeSignature) {
    console.group('Selection Change with Model Arguments');
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.groupEnd();
    if (selectionKey) {
      if (
        selectionKey === 'all' &&
        selectionCheckboxElement &&
        this.multiSelectToggleScope__demo3
      ) {
        updateModelWithSelectAllState(
          this.multiSelectUserData__demo3,
          selectionCheckboxElement.checked,
        );
      } else {
        selectableRowsStates.forEach((row) => {
          const recordToUpdate = this.multiSelectUserData__demo3.find(
            (modelRow) => modelRow.id === Number(row.selectionKey),
          );
          if (recordToUpdate) {
            recordToUpdate.isSelected = row.isSelected;
          }
        });
      }
    }
  }

  @action
  multiSelectDeleteSelectedUsers_demo3() {
    const newData = this.multiSelectUserData__demo3.filter(
      (user) => !user.isSelected,
    );
    this.multiSelectUserData__demo3 = [...newData];
  }

  // // MULTI-SELECT DEMO #4
  // // Execute action on selected rows

  @action
  onMultiSelectSelectionChange__demo4({
    selectedRowsKeys,
  }: HdsTableOnSelectionChangeSignature) {
    console.group('Selection Change with Model Arguments');
    console.log('Selected Row Keys:', selectedRowsKeys);
    console.groupEnd();
    this.multiSelectUserData__demo4.forEach((user) => {
      user.isSelected = selectedRowsKeys.includes(String(user.id));
    });
  }

  @action
  multiSelectAnimateSelectedUsers_demo4() {
    this.multiSelectUserData__demo4.forEach((user) => {
      user.isAnimated = user.isSelected;
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

  @action
  noop() {
    // no-op
  }
}
