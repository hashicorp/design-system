/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsAdvancedTableRow from './row.ts';
import { action } from '@ember/object';
import { isEmberDataModel } from '../utils.ts';

import type Model from '@ember-data/model';
import type {
  HdsAdvancedTableExpandState,
  HdsAdvancedTableModel,
  HdsAdvancedTableModelItem,
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
  rows: HdsAdvancedTableRow[] = [];

  constructor(args: HdsAdvancedTableTableArgs) {
    const { model, childrenKey } = args;

    this.rows = model.map((row) => {
      let rowData = row;

      if (isEmberDataModel(row)) {
        const attrs: Record<string, unknown> = {};
        const modelClass = row.constructor as typeof Model;

        modelClass.eachAttribute((key: string) => {
          attrs[key] = (row as Model).get(key);
        });

        attrs['id'] = row.id;

        rowData = attrs;
      }

      return new HdsAdvancedTableRow({
        ...rowData,
        childrenKey,
      });
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
