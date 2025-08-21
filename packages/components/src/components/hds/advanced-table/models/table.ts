/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsAdvancedTableRow from './row.ts';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import HdsAdvancedTableColumn from './column.ts';
import { HdsAdvancedTableThSortOrderValues } from '../types.ts';

import type { HdsAdvancedTableSignature } from '../index.ts';
import type {
  HdsAdvancedTableExpandState,
  HdsAdvancedTableSortingFunction,
} from '../types';

type HdsAdvancedTableTableArgs = Pick<
  HdsAdvancedTableSignature['Args'],
  | 'model'
  | 'columns'
  | 'childrenKey'
  | 'hasResizableColumns'
  | 'sortBy'
  | 'sortOrder'
  | 'onSort'
>;

function getVisibleRows(rows: HdsAdvancedTableRow[]): HdsAdvancedTableRow[] {
  return rows.reduce((acc, row) => {
    acc.push(row);

    if (row.isOpen && row.children) {
      acc.push(...getVisibleRows(row.children));
    }

    return acc;
  }, [] as HdsAdvancedTableRow[]);
}

function getChildrenCount(rows: HdsAdvancedTableRow[]): number {
  return rows.reduce((acc, row) => acc + 1 + getChildrenCount(row.children), 0);
}

export default class HdsAdvancedTableTableModel {
  @tracked columns: HdsAdvancedTableColumn[] = [];
  @tracked rows: HdsAdvancedTableRow[] = [];
  @tracked sortBy: HdsAdvancedTableTableArgs['sortBy'] = undefined;
  @tracked sortOrder: HdsAdvancedTableTableArgs['sortOrder'] =
    HdsAdvancedTableThSortOrderValues.Asc;

  childrenKey?: HdsAdvancedTableTableArgs['childrenKey'];
  hasResizableColumns?: HdsAdvancedTableTableArgs['hasResizableColumns'];
  onSort?: HdsAdvancedTableSignature['Args']['onSort'];

  constructor(args: HdsAdvancedTableTableArgs) {
    const {
      model,
      columns,
      childrenKey,
      hasResizableColumns,
      sortBy,
      sortOrder,
      onSort,
    } = args;

    this.childrenKey = childrenKey;
    this.hasResizableColumns = hasResizableColumns;
    this.onSort = onSort;

    this.setupData({ model, columns, sortBy, sortOrder });
  }

  get debug() {
    return this.columns.map((column) => ({
      key: column.key,
      label: column.label,
      appliedWidth: column.appliedWidth,
      widthDebts: column.widthDebts,
    }));
  }

  get sortCriteria(): string | HdsAdvancedTableSortingFunction<unknown> {
    // get the current column
    const currentColumn = this.columns.find(
      (column) => column.key === this.sortBy
    );

    if (
      // check if there is a custom sorting function associated with the current `sortBy` column (we assume the column has `isSortable`)
      currentColumn?.sortingFunction &&
      typeof currentColumn.sortingFunction === 'function'
    ) {
      return currentColumn.sortingFunction;
    } else {
      // otherwise fallback to the default format "sortBy:sortOrder"
      return `${this.sortBy}:${this.sortOrder}`;
    }
  }

  get sortedRows(): HdsAdvancedTableRow[] {
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
        const valueA = a[sortBy] as string | number | boolean;
        const valueB = b[sortBy] as string | number | boolean;

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

  get totalRowCount(): number {
    return getChildrenCount(this.sortedRows);
  }

  get flattenedVisibleRows(): HdsAdvancedTableRow[] {
    return getVisibleRows(this.sortedRows);
  }

  get lastVisibleRow(): HdsAdvancedTableRow | undefined {
    return this.flattenedVisibleRows[this.flattenedVisibleRows.length - 1];
  }

  get hasRowsWithChildren(): boolean {
    return this.rows.some((row) => row.hasChildren);
  }

  get allRowsAreOpen(): boolean {
    return this.flattenedVisibleRows.length === this.totalRowCount;
  }

  get expandState(): HdsAdvancedTableExpandState {
    if (this.allRowsAreOpen) {
      return true;
    } else {
      return false;
    }
  }

  setTransientColumnWidths(): void {
    this.columns.forEach((column) => {
      column.pxTransientWidth =
        column.thElement?.getBoundingClientRect().width ?? 0;
    });
  }

  resetTransientColumnWidths(): void {
    this.columns.forEach((column) => {
      column.pxTransientWidth = undefined;
    });
  }

  getColumnByKey(key: string): HdsAdvancedTableColumn | undefined {
    return this.columns.find((column) => column.key === key);
  }

  @action
  setupData(
    args: Pick<
      HdsAdvancedTableTableArgs,
      'model' | 'columns' | 'sortBy' | 'sortOrder'
    >
  ) {
    const { model, columns, sortBy, sortOrder } = args;

    this.sortBy = sortBy;
    this.sortOrder = sortOrder ?? HdsAdvancedTableThSortOrderValues.Asc;

    this.columns = columns.map(
      (column) =>
        new HdsAdvancedTableColumn({
          column,
          table: this,
        })
    );

    this.rows = model.map((row) => {
      return new HdsAdvancedTableRow({
        ...row,
        childrenKey: this.childrenKey,
        columns,
      });
    });
  }

  @action
  restoreColumnWidths(): void {
    this.columns.forEach((column) => {
      column.width = column.originalWidth;
    });
  }

  @action
  setSortBy(column: string): void {
    if (this.sortBy === column) {
      // check to see if the column is already sorted and invert the sort order if so
      this.sortOrder =
        this.sortOrder === HdsAdvancedTableThSortOrderValues.Asc
          ? HdsAdvancedTableThSortOrderValues.Desc
          : HdsAdvancedTableThSortOrderValues.Asc;
    } else {
      // otherwise, set the sort order to ascending
      this.sortBy = column;
      this.sortOrder = HdsAdvancedTableThSortOrderValues.Asc;
    }

    if (typeof this.onSort === 'function') {
      this.onSort(this.sortBy, this.sortOrder);
    }
  }

  @action
  openAll() {
    this.rows.forEach((row) => row.openAll());
  }

  @action
  collapseAll() {
    this.rows.forEach((row) => row.collapseAll());
  }

  @action
  toggleAll() {
    if (this.allRowsAreOpen) {
      this.collapseAll();
    } else {
      this.openAll();
    }
  }
}
