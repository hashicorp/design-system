/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

import type { HdsAdvancedTableThReorderHandleSignature } from '../th-reorder-handle.ts';
import type HdsAdvancedTableModel from './table.ts';
import type { HdsDropdownToggleButtonSignature } from '../../dropdown/toggle/button.ts';
import type {
  HdsAdvancedTableCell,
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableColumn as HdsAdvancedTableColumnType,
} from '../types';

export const DEFAULT_WIDTH = '1fr'; // default to '1fr' to allow flexible width
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
  @tracked isBeingDragged: boolean = false;
  @tracked isExpandable?: boolean = false;
  @tracked isSortable?: boolean = false;
  @tracked isVisuallyHidden?: boolean = false;
  @tracked key: string;
  @tracked tooltip?: string = undefined;
  @tracked sortingFunction?: (a: unknown, b: unknown) => number = undefined;

  // elements
  @tracked thElement?: HTMLDivElement = undefined;
  @tracked
  reorderHandleElement?: HdsAdvancedTableThReorderHandleSignature['Element'] =
    undefined;
  @tracked
  thContextMenuToggleElement?: HdsDropdownToggleButtonSignature['Element'] =
    undefined;

  // width properties
  @tracked transientWidth?: `${number}px` = undefined; // used for transient width changes
  @tracked width: string = DEFAULT_WIDTH;
  @tracked minWidth: `${number}px` = DEFAULT_MIN_WIDTH;
  @tracked maxWidth: `${number}px` = DEFAULT_MAX_WIDTH;
  @tracked originalWidth: string = this.width; // used to restore the width when resetting
  @tracked widthDebts: Record<string, number> = {}; // used to track width changes imposed by other columns

  table: HdsAdvancedTableModel;

  get cells(): HdsAdvancedTableCell[] {
    return this.table.flattenedVisibleRows.map((row) => {
      const cell = row.cells.find((cell) => cell.columnKey === this.key);

      return cell!;
    });
  }

  get appliedWidth(): string {
    return this.transientWidth ?? this.width;
  }
  get pxAppliedWidth(): number | undefined {
    if (isPxSize(this.appliedWidth)) {
      return pxToNumber(this.appliedWidth);
    }
  }

  get pxTransientWidth(): number | undefined {
    if (this.transientWidth !== undefined) {
      return pxToNumber(this.transientWidth);
    }
  }
  set pxTransientWidth(value: number | undefined) {
    if (value !== undefined && value >= 0) {
      this.transientWidth = `${value}px`;
    } else {
      this.transientWidth = undefined;
    }
  }

  get pxWidth(): number {
    if (isPxSize(this.width)) {
      return pxToNumber(this.width);
    } else {
      return this.thElement?.offsetWidth ?? 0;
    }
  }
  set pxWidth(value: number) {
    this.width = `${value}px`;
  }

  get pxMinWidth(): number {
    return isPxSize(this.minWidth) ? pxToNumber(this.minWidth) : 0;
  }

  get pxMaxWidth(): number {
    return isPxSize(this.maxWidth) ? pxToNumber(this.maxWidth) : Infinity;
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

  // main collection function
  private collectWidthDebts(): void {
    this.table.columns.forEach((debtor) => {
      const debtToCollect = debtor.widthDebts[this.key] ?? 0;

      if (debtToCollect <= 0) {
        return;
      }

      const amountPaid = debtor._sourceFundsForPayment(debtToCollect);

      if (amountPaid > 0) {
        this.pxWidth = (this.pxWidth ?? 0) + amountPaid;

        const remainingDebt = debtToCollect - amountPaid;

        if (remainingDebt > 0) {
          debtor.widthDebts[this.key] = remainingDebt;
        } else {
          delete debtor.widthDebts[this.key];
        }
      }
    });
  }

  // function for recursively recovering width debts without ending up in a deficit
  private _sourceFundsForPayment(amountNeeded: number): number {
    let fundsSourced = 0;

    // preferentially source width from our own surplus first
    const surplus = Math.max(0, (this.pxWidth ?? 0) - this.pxMinWidth);
    const paymentFromSurplus = Math.min(amountNeeded, surplus);

    if (paymentFromSurplus > 0) {
      this.pxWidth = (this.pxWidth ?? 0) - paymentFromSurplus;

      fundsSourced = fundsSourced + paymentFromSurplus;
    }

    // if we dont have enough to cover, source from debtors recursively
    const shortfall = amountNeeded - fundsSourced;

    if (shortfall > 0) {
      const ourDebtors = this.table.columns.filter(
        (column) => column.widthDebts[this.key]
      );

      for (const subDebtor of ourDebtors) {
        const amountStillNeeded = amountNeeded - fundsSourced;

        if (amountStillNeeded <= 0) {
          break;
        }

        const subDebtOwed = subDebtor.widthDebts[this.key] ?? 0;
        const amountToRequest = Math.min(amountStillNeeded, subDebtOwed);

        const collectedFromSubDebtor =
          subDebtor._sourceFundsForPayment(amountToRequest);

        if (collectedFromSubDebtor > 0) {
          fundsSourced = fundsSourced + collectedFromSubDebtor;

          // Update the sub-debtor's ledger.
          const remainingSubDebt = subDebtOwed - collectedFromSubDebtor;

          if (remainingSubDebt > 0) {
            subDebtor.widthDebts[this.key] = remainingSubDebt;
          } else {
            delete subDebtor.widthDebts[this.key];
          }
        }
      }
    }

    return fundsSourced;
  }

  private payWidthDebts(): void {
    Object.entries(this.widthDebts).forEach(([lenderKey, amount]) => {
      const lender = this.table.getColumnByKey(lenderKey);

      if (lender !== undefined) {
        // Give the width back to the column that lent it to us
        lender.pxWidth = (lender.pxWidth ?? 0) + amount;
      }
    });

    // Clear our own debt ledger, as we've paid everyone back
    this.widthDebts = {};
  }

  private settleWidthDebts(): void {
    this.collectWidthDebts();
    this.payWidthDebts();
  }

  // set initial width values
  private _setWidthValues({
    width,
    minWidth,
    maxWidth,
  }: HdsAdvancedTableColumnType): void {
    this.width = width ?? DEFAULT_WIDTH;

    // capture the width at the time of instantiation so it can be restored
    this.originalWidth = this.width;

    this.minWidth = minWidth ?? DEFAULT_MIN_WIDTH;
    this.maxWidth = maxWidth ?? DEFAULT_MAX_WIDTH;
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
  setPxTransientWidth(newPxWidth: number): void {
    const pxMinWidth = this.pxMinWidth ?? 1;
    const minLimitedPxWidth = Math.max(newPxWidth, pxMinWidth);

    this.pxTransientWidth =
      this.pxMaxWidth !== undefined
        ? Math.min(minLimitedPxWidth, this.pxMaxWidth)
        : minLimitedPxWidth;

    if (this.key === undefined) {
      return;
    }
  }

  @action
  restoreWidth(): void {
    this.settleWidthDebts();

    this.width = this.originalWidth;
  }
}
