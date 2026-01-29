/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsAdvancedTableRow from './row.ts';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { HdsAdvancedTableSignature } from '../index.ts';
import type { HdsAdvancedTableExpandState } from '../types';

type HdsAdvancedTableTableArgs = Pick<
  HdsAdvancedTableSignature['Args'],
  'model' | 'columns' | 'childrenKey'
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
  @tracked rows: HdsAdvancedTableRow[] = [];

  childrenKey?: HdsAdvancedTableTableArgs['childrenKey'];
  onSort?: HdsAdvancedTableSignature['Args']['onSort'];

  constructor(args: HdsAdvancedTableTableArgs) {
    const { model, columns, childrenKey } = args;

    this.childrenKey = childrenKey;

    this.setupData({ model, columns });
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
  setupData(args: Pick<HdsAdvancedTableTableArgs, 'model' | 'columns'>) {
    const { model, columns } = args;

    this.rows = model.map((row) => {
      return new HdsAdvancedTableRow({
        ...row,
        childrenKey: this.childrenKey,
        columns,
        table: this,
      });
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
