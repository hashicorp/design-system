/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsAdvancedTableRow from './row.ts';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

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

function getChildrenCount(rows: HdsAdvancedTableRow[]): number {
  return rows.reduce((acc, row) => acc + 1 + getChildrenCount(row.children), 0);
}

export default class HdsAdvancedTableTableModel {
  @tracked rows: HdsAdvancedTableRow[] = [];

  childrenKey?: string;

  constructor(args: HdsAdvancedTableTableArgs) {
    const { model, childrenKey } = args;

    this.childrenKey = childrenKey;

    this.rows = model.map((row) => {
      return new HdsAdvancedTableRow({ ...row, childrenKey });
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
