import HdsAdvancedTableRow from './row.js';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import HdsAdvancedTableColumn from './column.js';
import { HdsAdvancedTableThSortOrderValues } from '../types.js';
import { g, i, n } from 'decorator-transforms/runtime';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

function getVisibleRows(rows) {
  return rows.reduce((acc, row) => {
    acc.push(row);
    if (row.isOpen && row.children) {
      acc.push(...getVisibleRows(row.children));
    }
    return acc;
  }, []);
}
function getChildrenCount(rows) {
  return rows.reduce((acc, row) => acc + 1 + getChildrenCount(row.children), 0);
}
class HdsAdvancedTableTableModel {
  static {
    g(this.prototype, "columns", [tracked], function () {
      return [];
    });
  }
  #columns = (i(this, "columns"), void 0);
  static {
    g(this.prototype, "rows", [tracked], function () {
      return [];
    });
  }
  #rows = (i(this, "rows"), void 0);
  static {
    g(this.prototype, "sortBy", [tracked], function () {
      return undefined;
    });
  }
  #sortBy = (i(this, "sortBy"), void 0);
  static {
    g(this.prototype, "sortOrder", [tracked], function () {
      return HdsAdvancedTableThSortOrderValues.Asc;
    });
  }
  #sortOrder = (i(this, "sortOrder"), void 0);
  childrenKey;
  hasResizableColumns;
  onSort;
  constructor(args) {
    const {
      model,
      columns,
      childrenKey,
      hasResizableColumns,
      sortBy,
      sortOrder,
      onSort
    } = args;
    this.childrenKey = childrenKey;
    this.hasResizableColumns = hasResizableColumns;
    this.onSort = onSort;
    this.setupData({
      model,
      columns,
      sortBy,
      sortOrder
    });
  }
  get sortCriteria() {
    // get the current column
    const currentColumn = this.columns.find(column => column.key === this.sortBy);
    if (
    // check if there is a custom sorting function associated with the current `sortBy` column (we assume the column has `isSortable`)
    currentColumn?.sortingFunction && typeof currentColumn.sortingFunction === 'function') {
      return currentColumn.sortingFunction;
    } else {
      // otherwise fallback to the default format "sortBy:sortOrder"
      return `${this.sortBy}:${this.sortOrder}`;
    }
  }
  get sortedRows() {
    const criteria = this.sortCriteria;
    const rows = this.rows;
    if (rows.length <= 1 || criteria === undefined) {
      return rows;
    }
    if (typeof criteria === 'function') {
      // Use custom sort function
      return [...rows].sort(criteria);
    } else {
      // Parse the criteria string format "sortBy:sortOrder"
      const [sortBy, sortOrder] = criteria.split(':');
      if (!sortBy) {
        return rows;
      }
      return [...rows].sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];
        if (valueA < valueB) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  }
  get totalRowCount() {
    return getChildrenCount(this.sortedRows);
  }
  get flattenedVisibleRows() {
    return getVisibleRows(this.sortedRows);
  }
  get lastVisibleRow() {
    return this.flattenedVisibleRows[this.flattenedVisibleRows.length - 1];
  }
  get hasRowsWithChildren() {
    return this.rows.some(row => row.hasChildren);
  }
  get allRowsAreOpen() {
    return this.flattenedVisibleRows.length === this.totalRowCount;
  }
  get expandState() {
    if (this.allRowsAreOpen) {
      return true;
    } else {
      return false;
    }
  }
  setupData(args) {
    const {
      model,
      columns,
      sortBy,
      sortOrder
    } = args;
    this.sortBy = sortBy;
    this.sortOrder = sortOrder ?? HdsAdvancedTableThSortOrderValues.Asc;
    this.columns = columns.map(column => new HdsAdvancedTableColumn({
      column,
      table: this
    }));
    this.rows = model.map(row => {
      return new HdsAdvancedTableRow({
        ...row,
        childrenKey: this.childrenKey,
        columns
      });
    });
  }
  static {
    n(this.prototype, "setupData", [action]);
  }
  restoreColumnWidths() {
    this.columns.forEach(column => {
      column.width = column.originalWidth;
    });
  }
  static {
    n(this.prototype, "restoreColumnWidths", [action]);
  }
  setSortBy(column) {
    if (this.sortBy === column) {
      // check to see if the column is already sorted and invert the sort order if so
      this.sortOrder = this.sortOrder === HdsAdvancedTableThSortOrderValues.Asc ? HdsAdvancedTableThSortOrderValues.Desc : HdsAdvancedTableThSortOrderValues.Asc;
    } else {
      // otherwise, set the sort order to ascending
      this.sortBy = column;
      this.sortOrder = HdsAdvancedTableThSortOrderValues.Asc;
    }
    if (typeof this.onSort === 'function') {
      this.onSort(this.sortBy, this.sortOrder);
    }
  }
  static {
    n(this.prototype, "setSortBy", [action]);
  }
  openAll() {
    this.rows.forEach(row => row.openAll());
  }
  static {
    n(this.prototype, "openAll", [action]);
  }
  collapseAll() {
    this.rows.forEach(row => row.collapseAll());
  }
  static {
    n(this.prototype, "collapseAll", [action]);
  }
  toggleAll() {
    if (this.allRowsAreOpen) {
      this.collapseAll();
    } else {
      this.openAll();
    }
  }
  static {
    n(this.prototype, "toggleAll", [action]);
  }
}

export { HdsAdvancedTableTableModel as default };
//# sourceMappingURL=table.js.map
