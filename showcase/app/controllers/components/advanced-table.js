/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { later } from '@ember/runloop';

// we use an array to declare the custom sorting order for the clusters' status
const customSortingCriteriaArray = [
  'failing',
  'active',
  'establishing',
  'pending',
];

const updateModelWithSelectAllState = (modelData, selectAllState) => {
  modelData.forEach((modelRow) => {
    modelRow.isSelected = selectAllState;
  });
};

const updateModelWithSelectableRowsStates = (
  modelData,
  selectableRowsStates,
) => {
  const modelDataMap = new Map(
    modelData.map((modelRow) => [modelRow.id, modelRow]),
  );
  selectableRowsStates.forEach((row) => {
    // safe to assume that there is always a record for the "selectionKey" since it's coming from the model (the selectable "rows" are a subset of the model dataset)
    modelDataMap.get(row.selectionKey).isSelected = row.isSelected;
  });
};

export default class ComponentsTableController extends Controller {
  @tracked customSortOrder = 'asc';
  @deepTracked multiSelectSelectableData = [...this.model.selectableData];
  @tracked multiSelectFilterRows__demo1 = 'all';
  @tracked multiSelectToggleScope__demo1 = false;
  @tracked multiSelectToggleDebug__demo1 = false;
  @deepTracked multiSelectModelData__demo1 = [
    ...this.model.selectableDataDemo1,
  ];
  @deepTracked multiSelectModelData__demo2 = [
    ...this.model.selectableDataDemo2,
  ];
  @tracked multiSelectToggleScope__demo2 = false;
  @tracked multiSelectToggleDebug__demo2 = false;
  @tracked multiSelectPaginatedCurrentPage_demo2 = 1;
  @tracked multiSelectPaginatedCurrentPageSize_demo2 = 2;
  @tracked multiSelectToggleScope__demo3 = false;
  @tracked multiSelectToggleDebug__demo3 = false;
  @deepTracked multiSelectModelData__demo3 = [...this.model.userDataDemo3];
  @tracked multiSelectUsersCurrentPage_demo3 = 1;
  @tracked multiSelectUsersCurrentPageSize_demo3 = 4;
  @deepTracked multiSelectUserData__demo4 = [...this.model.userDataDemo4];
  @tracked focusableElementsVisible = false;

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

  get customSortingFunction() {
    return (s1, s2) => {
      const index1 = customSortingCriteriaArray.indexOf(s1['status']);
      const index2 = customSortingCriteriaArray.indexOf(s2['status']);
      if (index1 < index2) {
        return this.customSortOrder === 'asc' ? -1 : 1;
      } else if (index1 > index2) {
        return this.customSortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    };
  }

  @action
  customOnSort(_sortBy, sortOrder) {
    this.customSortOrder = sortOrder;
  }

  // GENERIC MULTI-SELECT FUNCTIONALITIES

  @action
  onSelectionChangeLogArguments() {
    console.log(...arguments);
  }

  // Sortable table with model and sorting by selected row

  @action
  onMultiSelectSelectionChange({ selectionKey, selectionCheckboxElement }) {
    if (selectionKey === 'all') {
      this.multiSelectSelectableData.forEach((modelRow) => {
        modelRow.isSelected = selectionCheckboxElement.checked;
      });
    } else {
      const recordToUpdate = this.multiSelectSelectableData.find(
        (modelRow) => modelRow.id === selectionKey,
      );

      if (recordToUpdate) {
        recordToUpdate.isSelected = !recordToUpdate.isSelected;
      }
    }
  }

  @action
  mockIndeterminateState(checkbox) {
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
  toggleMultiSelectToggleScope__demo1(event) {
    this.multiSelectToggleScope__demo1 = event.target.checked;
  }

  @action
  toggleMultiSelectToggleDebug__demo1(event) {
    this.multiSelectToggleDebug__demo1 = event.target.checked;
  }

  @action
  onChangeMultiSelectFilter__demo1(event) {
    this.multiSelectFilterRows__demo1 = event.target.value;
  }

  @action
  onSelectionChangeWithModel__demo1({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }) {
    console.log(...arguments);
    if (selectionKey === 'all' && this.multiSelectToggleScope__demo1) {
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

  @action
  onSelectionChangeWithoutModel__demo1({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }) {
    console.log(...arguments);
    // notice: the shape of the "model" is slightly different, it's not an array of objects but an object with keys so
    // we can't use the `updateModelWithSelectAllsState` and `updateModelWithSelectableRowsStates` functions
    if (selectionKey === 'all' && this.multiSelectToggleScope__demo1) {
      const selectAllState = selectionCheckboxElement.checked;
      Object.keys(this.multiSelectNoModelState__demo1).forEach((rowKey) => {
        this.multiSelectNoModelState__demo1[rowKey] = selectAllState;
      });
    } else {
      selectableRowsStates.forEach((row) => {
        this.multiSelectNoModelState__demo1[row.selectionKey] = row.isSelected;
      });
    }
  }

  // MULTI-SELECT DEMO #2
  // Multi-select table with pagination

  @action
  toggleMultiSelectPaginatedToggleScope__demo2(event) {
    this.multiSelectToggleScope__demo2 = event.target.checked;
  }

  @action
  toggleMultiSelectPaginatedToggleDebug__demo2(event) {
    this.multiSelectToggleDebug__demo2 = event.target.checked;
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
  onMultiSelectPaginatedPageChange_demo2(page) {
    this.multiSelectPaginatedCurrentPage_demo2 = page;
  }

  @action
  onMultiSelectPaginatedPageSizeChange_demo2(pageSize) {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.multiSelectPaginatedCurrentPage_demo2 = 1;
    this.multiSelectPaginatedCurrentPageSize_demo2 = pageSize;
  }

  @action
  onMultiSelectPaginatedSelectionChange__demo2({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }) {
    console.log(...arguments);
    if (selectionKey === 'all' && this.multiSelectToggleScope__demo2) {
      updateModelWithSelectAllState(
        this.multiSelectModelData__demo2,
        selectionCheckboxElement.checked,
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
  toggleMultiSelectPaginatedToggleScope__demo3(event) {
    this.multiSelectToggleScope__demo3 = event.target.checked;
  }

  @action
  toggleMultiSelectPaginatedToggleDebug__demo3(event) {
    this.multiSelectToggleDebug__demo3 = event.target.checked;
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
  onMultiSelectUsersPageChange_demo3(page) {
    this.multiSelectUsersCurrentPage_demo3 = page;
  }

  @action
  onMultiSelectUsersPageSizeChange_demo3(pageSize) {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.multiSelectUsersCurrentPage_demo3 = 1;
    this.multiSelectUsersCurrentPageSize_demo3 = pageSize;
  }

  @action
  onMultiSelectUsersSelectionChange__demo3({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }) {
    console.log(...arguments);
    if (selectionKey === 'all' && this.multiSelectToggleScope__demo3) {
      updateModelWithSelectAllState(
        this.multiSelectModelData__demo3,
        selectionCheckboxElement.checked,
      );
    } else {
      selectableRowsStates.forEach((row) => {
        const recordToUpdate = this.multiSelectModelData__demo3.find(
          (modelRow) => modelRow.id === row.selectionKey,
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
  onMultiSelectSelectionChange__demo4({ selectedRowsKeys }) {
    console.log(...arguments);
    this.multiSelectUserData__demo4.forEach((user) => {
      user.isSelected = selectedRowsKeys.includes(user.id);
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

  // Example where dynamically add more focusable elements to a cell
  @action toggleElementsVisibility() {
    this.focusableElementsVisible = !this.focusableElementsVisible;
  }

  @action
  noop() {
    // no-op
  }
}
