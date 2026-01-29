/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

import type HdsAdvancedTableModel from './table.ts';
import type {
  HdsAdvancedTableCell,
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableColumn as HdsAdvancedTableColumnType,
} from '../types';

export default class HdsAdvancedTableColumn {
  @tracked label: string = '';
  @tracked align?: HdsAdvancedTableHorizontalAlignment = 'left';
  @tracked isExpandable?: boolean = false;
  @tracked isSortable?: boolean = false;
  @tracked isVisuallyHidden?: boolean = false;
  @tracked key: string;
  @tracked tooltip?: string = undefined;
  @tracked sortingFunction?: (a: unknown, b: unknown) => number = undefined;

  table: HdsAdvancedTableModel;

  get cells(): HdsAdvancedTableCell[] {
    return this.table.flattenedVisibleRows.map((row) => {
      const cell = row.cells.find((cell) => cell.columnKey === this.key);

      return cell!;
    });
  }

  get index(): number {
    const { orderedColumns } = this.table;

    if (orderedColumns.length === 0) {
      return -1;
    }

    return orderedColumns.findIndex((column) => column.key === this.key);
  }

  constructor(args: {
    column: HdsAdvancedTableColumnType;
    table: HdsAdvancedTableModel;
  }) {
    const { column, table } = args;

    // set reference to table model
    this.table = table;

    // set column properties
    this.label = column.label;
    this.align = column.align ?? 'left';
    this.isExpandable = 'isExpandable' in column ? column.isExpandable : false;
    this.isSortable = column.isSortable ?? false;
    this.isVisuallyHidden = column.isVisuallyHidden ?? false;
    this.key = column.key ?? guidFor(this);
    this.tooltip = column.tooltip;
    this.sortingFunction = column.sortingFunction;
  }
}
