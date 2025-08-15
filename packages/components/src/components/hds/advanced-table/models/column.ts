/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

import type { HdsAdvancedTableThReorderHandleSignature } from '../th-reorder-handle.ts';
import type HdsAdvancedTableModel from './table.ts';
import type {
  HdsAdvancedTableCell,
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableColumn as HdsAdvancedTableColumnType,
} from '../types';

export const DEFAULT_MIN_WIDTH = '150px';
export const DEFAULT_MAX_WIDTH = '800px';

function isPxSize(value?: string): boolean {
  if (value === undefined) {
    return false;
  }

  return /^-?\d+(\.\d+)?px$/.test(value);
}

function pxToNumber(pxString: string): number {
  return parseFloat(pxString.slice(0, -2));
}

export default class HdsAdvancedTableColumn {
  @tracked label: string = '';
  @tracked align?: HdsAdvancedTableHorizontalAlignment = 'left';
  @tracked isExpandable?: boolean = false;
  @tracked isSortable?: boolean = false;
  @tracked isVisuallyHidden?: boolean = false;
  @tracked key: string;
  @tracked minWidth?: `${number}px` = DEFAULT_MIN_WIDTH;
  @tracked maxWidth?: `${number}px` = DEFAULT_MAX_WIDTH;
  @tracked tooltip?: string = undefined;
  @tracked width?: string = undefined;
  @tracked originalWidth?: string = undefined; // used to restore the width when resetting
  @tracked widthDebts: Record<string, number> = {}; // used to track width changes imposed by other columns

  @tracked isBeingDragged: boolean = false;
  @tracked thElement?: HTMLDivElement = undefined;
  @tracked
  reorderHandleElement?: HdsAdvancedTableThReorderHandleSignature['Element'] =
    undefined;
  @tracked sortingFunction?: (a: unknown, b: unknown) => number = undefined;

  table: HdsAdvancedTableModel;

  get cells(): HdsAdvancedTableCell[] {
    return this.table.flattenedVisibleRows.map((row) => {
      const cell = row.cells.find((cell) => cell.columnKey === this.key);

      return cell!;
    });
  }

  get pxWidth(): number | undefined {
    if (isPxSize(this.width)) {
      return pxToNumber(this.width!);
    }
  }
  set pxWidth(value: number) {
    this.width = `${value}px`;
  }

  get pxMinWidth(): number | undefined {
    if (isPxSize(this.minWidth)) {
      return pxToNumber(this.minWidth!);
    }
  }

  get pxMaxWidth(): number | undefined {
    if (isPxSize(this.maxWidth)) {
      return pxToNumber(this.maxWidth!);
    }
  }

  get index(): number {
    const { orderedColumns } = this.table;

    if (orderedColumns.length === 0) {
      return -1;
    }

    return orderedColumns.findIndex((column) => column.key === this.key);
  }

  get isFirst(): boolean {
    return this.index === 0;
  }

  get isFirstNonSticky(): boolean {
    return this.table.hasStickyFirstColumn ? this.index === 1 : this.isFirst;
  }

  get isLast(): boolean {
    return this.index !== -1 && this.index === this.table.columns.length - 1;
  }

  get siblings(): {
    previous?: HdsAdvancedTableColumn;
    next?: HdsAdvancedTableColumn;
  } {
    const { index, table } = this;
    const { orderedColumns } = table;

    if (index === -1) {
      return {};
    }

    return {
      previous: this.isFirst ? undefined : orderedColumns[index - 1],
      next: this.isLast ? undefined : orderedColumns[index + 1],
    };
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
    this._setWidthValues(column);
    this.sortingFunction = column.sortingFunction;
  }

  private _setWidthValues({
    width,
    minWidth,
    maxWidth,
  }: HdsAdvancedTableColumnType): void {
    if (width === undefined) {
      return;
    }

    this.width = width;

    // capture the width at the time of instantiation so it can be restored
    this.originalWidth = width;

    this.minWidth = minWidth ?? DEFAULT_MIN_WIDTH;
    this.maxWidth = maxWidth ?? DEFAULT_MAX_WIDTH;
  }

  private payWidthDebts(): void {
    Object.entries(this.widthDebts).forEach(([lenderKey, amount]) => {
      const lender = this.table.getColumnByKey(lenderKey);

      if (lender) {
        // Give the width back to the column that lent it to us
        lender.setPxWidth((lender.pxWidth ?? 0) + amount);
      }
    });

    // Clear our own debt ledger, as we've paid everyone back
    this.widthDebts = {};
  }

  private collectWidthDebts(): void {
    const { key: thisKey, table } = this;

    if (thisKey === undefined) {
      return;
    }

    table.columns.forEach((otherColumn) => {
      const debtToCollect = otherColumn.widthDebts[thisKey] ?? 0;

      if (debtToCollect > 0) {
        // Take the width back from the column that owes us
        otherColumn.setPxWidth((otherColumn.pxWidth ?? 0) - debtToCollect);
        // Clear the debt from their ledger
        delete otherColumn.widthDebts[thisKey];
      }
    });
  }

  private settleWidthDebts(): void {
    this.payWidthDebts();
    this.collectWidthDebts();
  }

  @action focusReorderHandle(): void {
    if (this.thElement === undefined) {
      return;
    }

    // focus the th element first (parent) to ensure the handle is visible
    this.thElement.focus({ preventScroll: true });

    if (this.reorderHandleElement === undefined) {
      return;
    }

    // then focus the reorder handle element
    this.reorderHandleElement.focus();
  }

  // Sets the column width in pixels, ensuring it respects the min and max width constraints.
  @action
  setPxWidth(newPxWidth: number): void {
    const pxMinWidth = this.pxMinWidth ?? 1;
    const minLimitedPxWidth = Math.max(newPxWidth, pxMinWidth);

    this.pxWidth =
      this.pxMaxWidth !== undefined
        ? Math.min(minLimitedPxWidth, this.pxMaxWidth)
        : minLimitedPxWidth;

    if (this.key === undefined) {
      return;
    }
  }

  @action
  restoreWidth(): void {
    this.width = this.originalWidth;

    this.settleWidthDebts();
  }
}
