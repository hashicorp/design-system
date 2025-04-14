/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

interface HdsAdvancedTableCell {
  columnKey: string;
  value: unknown;
}

interface HdsAdvancedTableRowArgs {
  [key: string]: unknown;
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

  get orderedCells() {
    return this.columnOrder.map((key) => {
      const cell = this.cells.find((cell) => cell.columnKey === key);
      return cell ? { ...cell } : null;
    });
  }

  children: HdsAdvancedTableRow[] = [];
  childrenKey: string;

  get hasChildren(): boolean {
    return this.children.length > 0;
  }

  get showChildren(): boolean {
    return this.isOpen && this.hasChildren;
  }

  constructor(args: HdsAdvancedTableRowArgs) {
    this.cells = Object.entries(args).map(([key, value]) => {
      return {
        columnKey: key,
        value,
      };
    });
    this.columnOrder = args.columnOrder ?? this.cells.map((cell) => cell.columnKey);

    // set row data
    Object.assign(this, args);

    this.childrenKey = args.childrenKey ?? 'children';

    const childModels = args[this.childrenKey];

    if (Array.isArray(childModels)) {
      this.children = childModels.map(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        (child) => new HdsAdvancedTableRow(child)
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
