/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsAdvancedTableColumn from './column.ts';
import HdsAdvancedTableRow from './row.ts';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

import type {
  HdsAdvancedTableColumn as HdsAdvancedTableColumnType,
  HdsAdvancedTableExpandState,
  HdsAdvancedTableModel,
} from '../types';

interface HdsAdvancedTableTableArgs {
  model: HdsAdvancedTableModel;
  columns: HdsAdvancedTableColumnType[];
  isSelectable?: boolean;
  childrenKey?: string;
  columnOrder?: string[];
  hasStickyFirstColumn?: boolean;
}

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
  @tracked columnOrder: string[] = [];

  isSelectable: boolean = false;
  rows: HdsAdvancedTableRow[] = [];

  constructor(args: HdsAdvancedTableTableArgs) {
    const { model, childrenKey, isSelectable, columns, columnOrder, hasStickyFirstColumn } = args;

    this.isSelectable = isSelectable ?? false;

    this.columns = columns.map((column) => new HdsAdvancedTableColumn(column));
    this.columnOrder = columnOrder ?? this.columns.map((column) => {
      // todo: make this work without column keys correctly
      return column.key ?? '';
    });

    this.rows = model.map((row) => {
      return new HdsAdvancedTableRow({
        ...row,
        childrenKey,
        columns,
        columnOrder: this.columnOrder
      });
    });

    if (this.hasRowsWithChildren) {
      const sortableColumns = columns.filter((column) => column.isSortable);
      const sortableColumnLabels = sortableColumns.map(
        (column) => column.label
      );

      assert(
        `Cannot have sortable columns if there are nested rows. Sortable columns are ${sortableColumnLabels.toString()}`,
        sortableColumns.length === 0
      );

      assert(
        'Cannot have a sticky first column if there are nested rows.',
        !hasStickyFirstColumn
      );
    }
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

  get totalRowCount(): number {
    return getChildrenCount(this.rows);
  }

  get flattenedVisibleRows(): HdsAdvancedTableRow[] {
    return getVisibleRows(this.rows);
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
