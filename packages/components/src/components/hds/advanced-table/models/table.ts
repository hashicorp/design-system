/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsAdvancedTableRow from './row.ts';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import HdsAdvancedTableColumn from './column.ts';
import {
  HdsAdvancedTableColumnReorderSideValues,
  HdsAdvancedTableThSortOrderValues,
} from '../types.ts';

import type { HdsAdvancedTableSignature } from '../index.ts';
import type {
  HdsAdvancedTableExpandState,
  HdsAdvancedTableCell,
  HdsAdvancedTableColumnReorderCallback,
  HdsAdvancedTableSortingFunction,
} from '../types';

enum HdsAdvancedTableColumnReorderSideValues {
  Left = 'left',
  Right = 'right',
}

type HdsAdvancedTableColumnReorderSide =
  `${HdsAdvancedTableColumnReorderSideValues}`;

type HdsAdvancedTableTableArgs = Pick<
  HdsAdvancedTableSignature['Args'],
  | 'model'
  | 'columns'
  | 'columnOrder'
  | 'childrenKey'
  | 'hasResizableColumns'
  | 'sortBy'
  | 'sortOrder'
  | 'onSort'
  | 'onColumnReorder'
  | 'onColumnResize'
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
  return rows.reduce(
    (acc, row) => acc + 1 + getChildrenCount(row.children ?? []),
    0
  );
}

export default class HdsAdvancedTableTableModel {
  @tracked columns: HdsAdvancedTableColumn[] = [];
  @tracked columnOrder: string[] = [];
  @tracked reorderDraggedColumn: HdsAdvancedTableColumn | null = null;
  @tracked rows: HdsAdvancedTableRow[] = [];
  @tracked sortBy: HdsAdvancedTableTableArgs['sortBy'] = undefined;
  @tracked sortOrder: HdsAdvancedTableTableArgs['sortOrder'] =
    HdsAdvancedTableThSortOrderValues.Asc;
  @tracked gridElement?: HTMLDivElement = undefined;

  childrenKey?: HdsAdvancedTableTableArgs['childrenKey'];
  hasResizableColumns?: HdsAdvancedTableTableArgs['hasResizableColumns'];
  onColumnReorder?: HdsAdvancedTableColumnReorderCallback;
  onSort?: HdsAdvancedTableSignature['Args']['onSort'];

  constructor(args: HdsAdvancedTableTableArgs) {
    const {
      model,
      columns,
      columnOrder,
      childrenKey,
      hasResizableColumns,
      sortBy,
      sortOrder,
      onColumnReorder,
      onSort,
    } = args;

    this.childrenKey = childrenKey;
    this.hasResizableColumns = hasResizableColumns;
    this.onSort = onSort;

    this.setupData({ model, columns, sortBy, sortOrder });

    this.columnOrder = columnOrder ?? this.columns.map((column) => column.key);

    this.onColumnReorder = onColumnReorder;
  }

  get hasColumnBeingDragged(): boolean {
    return this.reorderDraggedColumn !== null;
  }

  get reorderDraggedColumnCells(): HdsAdvancedTableCell[] {
    if (this.reorderDraggedColumn === null) {
      return [];
    }

    const { key } = this.reorderDraggedColumn;

    return this.flattenedVisibleRows.map((row) => {
      const cell = row.cells.find((cell) => cell.columnKey === key);

      return cell!;
    });
  }

  get orderedColumns(): HdsAdvancedTableColumn[] {
    return this.columnOrder.map((key) => {
      const column = this.columns.find((column) => column.key === key);

      if (!column) {
        throw new Error(`Column with key ${key} not found`);
      }

      return column;
    });
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

  @action
  stepColumn(column: HdsAdvancedTableColumn, step: number): void {
    const { table } = column;
    const oldIndex = table.orderedColumns.indexOf(column);
    const newIndex = oldIndex + step;

    // Check if the new position is within the array bounds.
    if (newIndex < 0 || newIndex >= table.orderedColumns.length) {
      return;
    }

    const targetColumn = table.orderedColumns[newIndex];

    if (targetColumn === undefined) {
      return;
    }

    // Determine the side based on the step direction.
    const side: HdsAdvancedTableColumnReorderSide =
      step > 0
        ? HdsAdvancedTableColumnReorderSideValues.Right
        : HdsAdvancedTableColumnReorderSideValues.Left;

    table.moveColumnToTarget(column, targetColumn, side);
  }

  @action
  moveColumnToTerminalPosition(
    column: HdsAdvancedTableColumn,
    position: 'start' | 'end'
  ): void {
    const {
      targetColumn,
      side,
    }: {
      targetColumn?: HdsAdvancedTableColumn;
      side: HdsAdvancedTableColumnReorderSide;
    } =
      position === 'start'
        ? {
            targetColumn: this.orderedColumns[0],
            side: HdsAdvancedTableColumnReorderSideValues.Left,
          }
        : {
            targetColumn: this.orderedColumns[this.orderedColumns.length - 1],
            side: HdsAdvancedTableColumnReorderSideValues.Right,
          };

    if (targetColumn === undefined) {
      return;
    }

    // Move the column to the target position
    this.moveColumnToTarget(column, targetColumn, side);
  }

  @action
  moveColumnToTarget(
    sourceColumn: HdsAdvancedTableColumn,
    targetColumn: HdsAdvancedTableColumn,
    side: HdsAdvancedTableColumnReorderSide
  ): void {
    const oldIndex = this.orderedColumns.indexOf(sourceColumn);
    const newIndex = this.orderedColumns.indexOf(targetColumn);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updated = [...this.columnOrder];

      updated.splice(oldIndex, 1); // Remove from old position

      // Calculate the insertion index based on the side
      // If dropping to the right of the target, insert after the target
      // If dropping to the left of the target, insert before the target
      // Adjust for the shift in indices caused by removing the source column
      const adjustedIndex =
        side === HdsAdvancedTableColumnReorderSideValues.Right
          ? newIndex > oldIndex
            ? newIndex
            : newIndex + 1
          : newIndex > oldIndex
            ? newIndex - 1
            : newIndex;

      updated.splice(adjustedIndex, 0, sourceColumn.key); // Insert at new position

      this.columnOrder = updated;

      for (const row of this.rows) {
        row.updateColumnOrder(updated);
      }

      sourceColumn.isBeingDragged = false;
      // when a column is moved, reset the imposed width delta
      // TODO: this should be handled in a more robust way
      sourceColumn.imposedWidthDelta = 0;

      this.onColumnReorder?.(updated);
    }
  }

  @action
  moveColumnToDropTarget(
    targetColumn: HdsAdvancedTableColumn,
    side: HdsAdvancedTableColumnReorderSide
  ) {
    const sourceColumn = this.reorderDraggedColumn;

    if (sourceColumn == null || sourceColumn === targetColumn) {
      return;
    }

    this.moveColumnToTarget(sourceColumn, targetColumn, side);
  }
}
