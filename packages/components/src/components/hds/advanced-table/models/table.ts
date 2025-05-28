/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsAdvancedTableRow from './row.ts';
import { action } from '@ember/object';

import HdsAdvancedTableColumn from './column.ts';

import type {
  HdsAdvancedTableColumn as HdsAdvancedTableColumnType,
  HdsAdvancedTableExpandState,
  HdsAdvancedTableModel,
} from '../types';

export type HdsAdvancedTableTableColumnResizeCallback = (
  columnKey: string,
  newWidth: string
) => void;

interface HdsAdvancedTableTableArgs {
  model: HdsAdvancedTableModel;
  columns: HdsAdvancedTableColumnType[];
  childrenKey?: string;
  onColumnResize?: HdsAdvancedTableTableColumnResizeCallback;
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

  rows: HdsAdvancedTableRow[] = [];

  constructor(args: HdsAdvancedTableTableArgs) {
    const { model, columns, childrenKey, onColumnResize } = args;

    this._setupColumns({ columns, onColumnResize });
    this._setupRows({ model, columns, childrenKey });
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

  private _setupColumns({
    columns,
    onColumnResize,
  }: Pick<HdsAdvancedTableTableArgs, 'columns'> & {
    onColumnResize?: HdsAdvancedTableTableColumnResizeCallback;
  }) {
    this.columns = columns.map(
      (column) => new HdsAdvancedTableColumn({ column, onColumnResize })
    );
  }

  private _setupRows({
    model,
    columns,
    childrenKey,
  }: Pick<HdsAdvancedTableTableArgs, 'model' | 'columns' | 'childrenKey'>) {
    this.rows = model.map((row) => {
      return new HdsAdvancedTableRow({ ...row, childrenKey, columns });
    });
  }

  @action
  updateModel(model: HdsAdvancedTableModel) {
    this.rows = model.map((row) => {
      return new HdsAdvancedTableRow({ ...row, childrenKey: this.childrenKey });
    });
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
