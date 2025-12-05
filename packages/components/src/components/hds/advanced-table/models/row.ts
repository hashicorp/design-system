/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

import type { HdsAdvancedTableColumn, HdsAdvancedTableCell } from '../types';
import type HdsAdvancedTableTableModel from './table';

interface HdsAdvancedTableRowArgs {
  [key: string]: unknown;
  columns: HdsAdvancedTableColumn[];
  table: HdsAdvancedTableTableModel;
  id?: string;
  childrenKey?: string;
}

export default class HdsAdvancedTableRow {
  id = guidFor(this);

  // row data
  [key: string]: unknown;

  @tracked isOpen: boolean = false;
  @tracked cells: HdsAdvancedTableCell[] = [];

  children: HdsAdvancedTableRow[] = [];
  childrenKey: string;
  table: HdsAdvancedTableTableModel;

  get hasChildren(): boolean {
    return this.children.length > 0;
  }

  get showChildren(): boolean {
    return this.isOpen && this.hasChildren;
  }

  get orderedCells(): HdsAdvancedTableCell[] {
    const { columnOrder, hasReorderableColumns } = this.table;

    if (hasReorderableColumns) {
      return columnOrder.reduce<HdsAdvancedTableCell[]>((acc, key) => {
        const cell = this.cells.find((cell) => cell.columnKey === key);

        if (cell !== undefined) {
          acc.push(cell);
        }

        return acc;
      }, []);
    } else {
      return this.cells;
    }
  }

  constructor(args: HdsAdvancedTableRowArgs) {
    const { columns, table } = args;

    this.table = table;

    this.cells = columns.map((column) => {
      const cell = args[column.key ?? ''];

      return {
        columnKey: column.key ?? '',
        content: cell,
      };
    });

    // set row data
    Object.assign(this, args);

    this.childrenKey = args.childrenKey ?? 'children';

    const childModels = args[this.childrenKey];

    if (Array.isArray(childModels)) {
      this.children = childModels.map(
        (child) =>
          new HdsAdvancedTableRow({
            ...(child as HdsAdvancedTableRowArgs),
            columns: args.columns,
            childrenKey: this.childrenKey,
          })
      );
    }
  }

  @action
  openAll() {
    this.isOpen = true;
    this.children.forEach((child) => child.openAll());
  }

  @action
  collapseAll() {
    this.isOpen = false;
    this.children.forEach((child) => child.collapseAll());
  }

  @action
  onClickToggle() {
    this.isOpen = !this.isOpen;
  }
}
