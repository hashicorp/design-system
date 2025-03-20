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

  constructor(args: HdsAdvancedTableTableArgs) {
    const { model, childrenKey } = args;

    this.rows = model.map((row) => {
      return new HdsAdvancedTableRow({ ...row, childrenKey });
    });
  }

  get totalRowCount(): number {
    function getChildrenCount(rows: HdsAdvancedTableRow[]): number {
      return rows.reduce((acc, row) => {
        return acc + 1 + getChildrenCount(row.children);
      }, 0);
    }

    return this.rows.reduce((acc, row) => {
      return acc + 1 + getChildrenCount(row.children);
    }, 0);
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
    } else if (this.rows.some((row) => row.isOpen)) {
      return 'mixed';
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
