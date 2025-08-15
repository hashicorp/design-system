/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

import type { HdsAdvancedTableColumn, HdsAdvancedTableCell } from '../types';

interface HdsAdvancedTableRowArgs {
  [key: string]: unknown;
  columns: HdsAdvancedTableColumn[];
  id?: string;
  childrenKey?: string;
  columnOrder?: string[];
}

export default class HdsAdvancedTableRow {
  id = guidFor(this);

  // row data
  [key: string]: unknown;

  @tracked isOpen: boolean = false;
  @tracked cells: HdsAdvancedTableCell[] = [];
  @tracked columnOrder: string[] = [];

  children: HdsAdvancedTableRow[] = [];
  childrenKey: string;

  get hasChildren(): boolean {
    return this.children.length > 0;
  }

  get showChildren(): boolean {
    return this.isOpen && this.hasChildren;
  }

  get orderedCells(): HdsAdvancedTableCell[] {
    return this.columnOrder.map((key) => {
      const cell = this.cells.find((cell) => cell.columnKey === key);

      if (cell === undefined) {
        throw new Error(`Column with key ${key} not found`);
      }

      return cell;
    });
  }

  constructor(args: HdsAdvancedTableRowArgs) {
    const { columns } = args;

    this.cells = columns.map((column) => {
      const cell = args[column.key ?? ''];

      return {
        columnKey: column.key ?? '',
        content: cell,
      };
    });

    this.columnOrder =
      args.columnOrder ?? this.cells.map((cell) => cell.columnKey);

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
  updateColumnOrder(columnOrder: string[]) {
    this.columnOrder = columnOrder;
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
