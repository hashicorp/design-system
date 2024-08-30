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
  selectableRowsStates
) => {
  const modelDataMap = new Map(
    modelData.map((modelRow) => [modelRow.id, modelRow])
  );
  selectableRowsStates.forEach((row) => {
    // safe to assume that there is always a record for the "selectionKey" since it's coming from the model (the selectable "rows" are a subset of the model dataset)
    modelDataMap.get(row.selectionKey).isSelected = row.isSelected;
  });
};

export default class ComponentsTableController extends Controller {
  // new stuff
  get shortSpaceships() {
    return this.spaceships.slice(0, 10);
  }

  @tracked currentSpaceshipPage = 1;
  @tracked currentSpaceshipPageSize = 10;

  get paginatedSpaceships() {
    const start =
      (this.currentSpaceshipPage - 1) * this.currentSpaceshipPageSize;
    const end = this.currentSpaceshipPage * this.currentSpaceshipPageSize;
    return this.spaceships.slice(start, end);
  }

  spaceships = [
    {
      id: 1,
      name: 'Millennium Falcon',
      speed: 'Fast',
      crew: 4,
      passengers: 6,
      isSelected: false,
    },
    {
      id: 2,
      name: 'X-Wing',
      speed: 'Fast',
      crew: 1,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 3,
      name: 'TIE Fighter',
      speed: 'Fast',
      crew: 1,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 4,
      name: 'Star Destroyer',
      speed: 'Moderate',
      crew: 47000,
      passengers: 7200,
      isSelected: false,
    },
    {
      id: 5,
      name: 'Death Star',
      speed: 'Slow',
      crew: 342,
      passengers: 843,
      isSelected: false,
    },
    {
      id: 6,
      name: 'Slave I',
      speed: 'Fast',
      crew: 1,
      passengers: 6,
      isSelected: false,
    },
    {
      id: 7,
      name: 'Y-Wing',
      speed: 'Moderate',
      crew: 2,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 8,
      name: 'A-Wing',
      speed: 'Fast',
      crew: 1,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 9,
      name: 'B-Wing',
      speed: 'Moderate',
      crew: 1,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 10,
      name: 'Nebulon-B Frigate',
      speed: 'Slow',
      crew: 920,
      passengers: 3000,
      isSelected: false,
    },
    {
      id: 11,
      name: 'Imperial Shuttle',
      speed: 'Moderate',
      crew: 5,
      passengers: 20,
      isSelected: false,
    },
    {
      id: 12,
      name: 'TIE Interceptor',
      speed: 'Fast',
      crew: 1,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 13,
      name: 'TIE Bomber',
      speed: 'Moderate',
      crew: 2,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 14,
      name: 'Super Star Destroyer',
      speed: 'Slow',
      crew: 280000,
      passengers: 38000,
      isSelected: false,
    },
    {
      id: 15,
      name: 'Mon Calamari Cruiser',
      speed: 'Moderate',
      crew: 5400,
      passengers: 1200,
      isSelected: false,
    },
    {
      id: 16,
      name: 'Republic Cruiser',
      speed: 'Moderate',
      crew: 2,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 17,
      name: 'Vulture Droid',
      speed: 'Fast',
      crew: 0,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 18,
      name: 'Droid Control Ship',
      speed: 'Slow',
      crew: 6000,
      passengers: 139000,
      isSelected: false,
    },
    {
      id: 19,
      name: 'Pod Racer',
      speed: 'Very Fast',
      crew: 1,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 20,
      name: 'Solar Sailer',
      speed: 'Moderate',
      crew: 2,
      passengers: 6,
      isSelected: false,
    },
    {
      id: 21,
      name: 'Naboo Starfighter',
      speed: 'Fast',
      crew: 1,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 22,
      name: 'ARC-170',
      speed: 'Moderate',
      crew: 3,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 23,
      name: 'Droid Gunship',
      speed: 'Slow',
      crew: 2,
      passengers: 40,
      isSelected: false,
    },
    {
      id: 24,
      name: 'Venator-class Star Destroyer',
      speed: 'Moderate',
      crew: 7400,
      passengers: 2000,
      isSelected: false,
    },
    {
      id: 25,
      name: 'Invisible Hand',
      speed: 'Slow',
      crew: 7000,
      passengers: 6000,
      isSelected: false,
    },
    {
      id: 26,
      name: 'Ghost',
      speed: 'Fast',
      crew: 4,
      passengers: 14,
      isSelected: false,
    },
    {
      id: 27,
      name: 'Phantom',
      speed: 'Fast',
      crew: 2,
      passengers: 2,
      isSelected: false,
    },
    {
      id: 28,
      name: 'Hammerhead Corvette',
      speed: 'Moderate',
      crew: 6,
      passengers: 100,
      isSelected: false,
    },
    {
      id: 29,
      name: 'U-Wing',
      speed: 'Fast',
      crew: 2,
      passengers: 8,
      isSelected: false,
    },
    {
      id: 30,
      name: 'Imperial Star Destroyer',
      speed: 'Slow',
      crew: 37000,
      passengers: 9200,
      isSelected: false,
    },
    {
      id: 31,
      name: 'Scimitar',
      speed: 'Fast',
      crew: 1,
      passengers: 6,
      isSelected: false,
    },
    {
      id: 32,
      name: 'Gozanti-class Cruiser',
      speed: 'Moderate',
      crew: 12,
      passengers: 75,
      isSelected: false,
    },
    {
      id: 33,
      name: 'Tantive IV',
      speed: 'Moderate',
      crew: 46,
      passengers: 30,
      isSelected: false,
    },
    {
      id: 34,
      name: 'Rebel Transport',
      speed: 'Slow',
      crew: 20,
      passengers: 90,
      isSelected: false,
    },
    {
      id: 35,
      name: 'Sandcrawler',
      speed: 'Very Slow',
      crew: 46,
      passengers: 50,
      isSelected: false,
    },
    {
      id: 36,
      name: 'AT-AT',
      speed: 'Very Slow',
      crew: 5,
      passengers: 40,
      isSelected: false,
    },
    {
      id: 37,
      name: 'AT-ST',
      speed: 'Moderate',
      crew: 2,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 38,
      name: 'Speeder Bike',
      speed: 'Very Fast',
      crew: 1,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 39,
      name: 'Hoth Snowspeeder',
      speed: 'Fast',
      crew: 2,
      passengers: 0,
      isSelected: false,
    },
    {
      id: 40,
      name: 'T-16 Skyhopper',
      speed: 'Moderate',
      crew: 1,
      passengers: 1,
      isSelected: false,
    },
    {
      id: 41,
      name: 'Slave II',
      speed: 'Fast',
      crew: 1,
      passengers: 2,
      isSelected: false,
    },
    {
      id: 42,
      name: 'Outrider',
      speed: 'Fast',
      crew: 2,
      passengers: 8,
      isSelected: false,
    },
    {
      id: 43,
      name: 'Razor Crest',
      speed: 'Moderate',
      crew: 2,
      passengers: 8,
      isSelected: false,
    },
    {
      id: 44,
      name: 'The Ghost',
      speed: 'Fast',
      crew: 4,
      passengers: 10,
      isSelected: false,
    },
    {
      id: 45,
      name: 'Pelta-class Frigate',
      speed: 'Slow',
      crew: 900,
      passengers: 600,
      isSelected: false,
    },
    {
      id: 46,
      name: 'Consular-class Cruiser',
      speed: 'Moderate',
      crew: 9,
      passengers: 16,
      isSelected: false,
    },
    {
      id: 47,
      name: 'J-Type 327 Nubian',
      speed: 'Moderate',
      crew: 3,
      passengers: 20,
      isSelected: false,
    },
    {
      id: 48,
      name: 'Naboo Royal Starship',
      speed: 'Fast',
      crew: 8,
      passengers: 20,
      isSelected: false,
    },
    {
      id: 49,
      name: 'Malevolence',
      speed: 'Slow',
      crew: 21000,
      passengers: 6000,
      isSelected: false,
    },
    {
      id: 50,
      name: 'V-Wing',
      speed: 'Fast',
      crew: 1,
      passengers: 0,
      isSelected: false,
    },
  ];

  @action
  handleSpaceshipSelectionChange({ selectedRowsKeys }) {
    console.log(...arguments);
    this.spaceships.forEach((spaceship) => {
      spaceship.isSelected = selectedRowsKeys.includes(spaceship.id);
    });
  }

  @action
  sortSpaceships(_sortBy, sortOrder) {
    const { spaceships } = this;
    const { selectedRows, unselectedRows } = spaceships.reduce(
      (acc, row) => {
        if (row.isSelected) {
          acc.selectedRows.push(row);
        } else {
          acc.unselectedRows.push(row);
        }
        return acc;
      },
      { selectedRows: [], unselectedRows: [] }
    );

    return sortOrder === 'asc'
      ? [...selectedRows, ...unselectedRows]
      : [...unselectedRows, ...selectedRows];
  }

  // end new stuff

  // custom sorting
  @tracked customSortOrder_demo2 = 'asc';
  @tracked customSortBy_demo3 = undefined;
  @tracked customSortOrder_demo3 = 'asc';
  // multi-select
  @tracked multiSelectFilterRows__demo1 = 'all';
  @tracked multiSelectToggleScope__demo1 = false;
  @tracked multiSelectToggleDebug__demo1 = false;
  @deepTracked multiSelectModelData__demo1 = [
    ...this.model.selectableDataDemo1,
  ];
  @deepTracked multiSelectNoModelState__demo1 = {
    row1: false,
    row2: true,
    row3: false,
    row4: false,
  };
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

  debugger;

  // CUSTOM SORTING DEMO #1
  // Sortable table with custom sorting done via extra key added to the data model

  get clustersWithExtraData_demo1() {
    return this.model.clusters.map((record) => {
      return {
        ...record,
        'status-sort-order': customSortingCriteriaArray.indexOf(
          record['status']
        ),
      };
    });
  }

  // CUSTOM SORTING DEMO #2
  // Sortable table with custom `sortingFunction` declared in the column hash

  get customSortingFunction_demo2() {
    return (s1, s2) => {
      const index1 = customSortingCriteriaArray.indexOf(s1['status']);
      const index2 = customSortingCriteriaArray.indexOf(s2['status']);
      if (index1 < index2) {
        return this.customSortOrder_demo2 === 'asc' ? -1 : 1;
      } else if (index1 > index2) {
        return this.customSortOrder_demo2 === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    };
  }

  @action
  customOnSort_demo2(_sortBy, sortOrder) {
    this.customSortOrder_demo2 = sortOrder;
  }

  // CUSTOM SORTING DEMO #3
  // Sortable table with custom sorting using yielded `<ThSort>` + `sortBy/sortOrder/setSortBy` properties

  @action
  onClickThSort__demo3(column, setSortBy) {
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
    if (setSortBy) {
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
    console.log(
      `extraOnSortCallback called with customSortBy='${this.customSortBy_demo3}' and customSortOrder='${this.customSortOrder_demo3}'`
    );
  }

  // CUSTOM SORTING DEMO #4
  // Sortable table with custom sorting using yielded `<ThSort>` + `sortBy/sortOrder/setSortBy` properties

  sortModelClusters__demo4 = (sortBy, sortOrder) => {
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

  // GENERIC MULTI-SELECT FUNCTIONALITIES

  @action
  onSelectionChangeLogArguments() {
    console.log(...arguments);
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
        (item) => item.id % 2 === remainder
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
  onSelectionChangeSortSelected({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }) {
    if (selectionKey === 'all' && this.model.music) {
      updateModelWithSelectAllState(
        this.model.music,
        selectionCheckboxElement.checked
      );
    } else {
      updateModelWithSelectableRowsStates(
        this.model.music,
        selectableRowsStates
      );
    }
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
        selectionCheckboxElement.checked
      );
    } else {
      updateModelWithSelectableRowsStates(
        this.multiSelectModelData__demo1,
        selectableRowsStates
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
        selectionCheckboxElement.checked
      );
    } else {
      updateModelWithSelectableRowsStates(
        this.multiSelectModelData__demo2,
        selectableRowsStates
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
        selectionCheckboxElement.checked
      );
    } else {
      selectableRowsStates.forEach((row) => {
        const recordToUpdate = this.multiSelectModelData__demo3.find(
          (modelRow) => modelRow.id === row.selectionKey
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
      (user) => !user.isSelected
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
}
