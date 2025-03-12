import HdsAdvancedTableRow from './row.ts';
import { action } from '@ember/object';

import type {
  HdsAdvancedTableExpandState,
  HdsAdvancedTableModel,
} from '../types';

interface HdsAdvancedTableTableArgs {
  model: HdsAdvancedTableModel;
  childrenKey?: string;
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

export default class HdsAdvancedTableTableModel {
  rows: HdsAdvancedTableRow[] = [];

  get flattenedVisibleRows(): HdsAdvancedTableRow[] {
    return getVisibleRows(this.rows);
  }

  get lastVisibleRow(): HdsAdvancedTableRow | undefined {
    return this.flattenedVisibleRows[this.flattenedVisibleRows.length - 1];
  }

  get openState(): HdsAdvancedTableExpandState {
    if (this.rows.length === 0) {
      return false;
    }

    return this.rows.every((row) => row.openState) ? true : 'mixed';
  }

  get hasRowsWithChildren(): boolean {
    return this.rows.some((row) => row.hasChildren);
  }

  constructor(args: HdsAdvancedTableTableArgs) {
    const { model, childrenKey } = args;

    this.rows = model.map((row) => {
      return new HdsAdvancedTableRow({ ...row, childrenKey });
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
}
