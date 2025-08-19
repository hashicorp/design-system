/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

import type HdsAdvancedTableModel from './table.ts';
import type {
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
  @tracked isExpandable?: boolean = false;
  @tracked isSortable?: boolean = false;
  @tracked isVisuallyHidden?: boolean = false;
  @tracked key: string;
  @tracked tooltip?: string = undefined;
  @tracked thElement?: HTMLDivElement = undefined;

  // width properties
  @tracked transientWidth?: `${number}px` = undefined; // used for transient width changes
  @tracked width: string = DEFAULT_WIDTH;
  @tracked minWidth: `${number}px` = DEFAULT_MIN_WIDTH;
  @tracked maxWidth: `${number}px` = DEFAULT_MAX_WIDTH;
  @tracked originalWidth: string = this.width; // used to restore the width when resetting
  @tracked widthDebts: Record<string, number> = {}; // used to track width changes imposed by other columns

  @tracked sortingFunction?: (a: unknown, b: unknown) => number = undefined;

  table: HdsAdvancedTableModel;

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

  get pxWidth(): number | undefined {
    if (isPxSize(this.width)) {
      return pxToNumber(this.width);
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
    const { columns } = this.table;

    if (columns.length === 0) {
      return -1;
    }

    return columns.findIndex((column) => column.key === this.key);
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
    const { columns } = table;

    if (index === -1) {
      return {};
    }

    return {
      previous: this.isFirst ? undefined : columns[index - 1],
      next: this.isLast ? undefined : columns[index + 1],
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

  // Collects debt from a debtor's surplus width
  private _collectFromSurplus(
    debtor: HdsAdvancedTableColumn,
    debtToCollect: number
  ): number {
    // Calculate the debtor's available width above its minimum constraint
    const surplus = Math.max(0, (debtor.pxWidth ?? 0) - debtor.pxMinWidth);
    // The amount we can actually take is the smaller of the debt or the surplus
    const paymentAmount = Math.min(debtToCollect, surplus);

    if (paymentAmount > 0) {
      debtor.pxWidth = (debtor.pxWidth ?? 0) - paymentAmount;

      this.pxWidth = (this.pxWidth ?? 0) + paymentAmount;
    }

    return paymentAmount;
  }

  // Updates the ledger for a sub-debtor after it has made a payment
  private _updateSubDebtLedger(
    subDebtor: HdsAdvancedTableColumn,
    creditorKey: string,
    amountPaid: number
  ) {
    const originalDebt = subDebtor.widthDebts[creditorKey] ?? 0;
    const remainingDebt = originalDebt - amountPaid;

    if (remainingDebt > 0) {
      subDebtor.widthDebts[creditorKey] = remainingDebt;
    } else {
      delete subDebtor.widthDebts[creditorKey];
    }
  }

  // Facilitates a cascading collection from a debtor's own debtors if the debtor has a shortfall
  private _collectFromSubDebtors(
    debtor: HdsAdvancedTableColumn,
    shortfall: number
  ): number {
    if (shortfall <= 0) {
      return 0;
    }

    let totalCollected = 0;

    const subDebtors = this.table.columns.filter(
      (column) => column.widthDebts[debtor.key]
    );

    for (const subDebtor of subDebtors) {
      const amountStillNeeded = shortfall - totalCollected;

      if (amountStillNeeded <= 0) {
        break;
      }

      const subDebtOwed = subDebtor.widthDebts[debtor.key] ?? 0;
      const amountToRequest = Math.min(amountStillNeeded, subDebtOwed);

      // The sub-debtor pays from its own surplus in a direct transfer to the original collector (`this`)
      const paymentAmount = this._collectFromSurplus(
        subDebtor,
        amountToRequest
      );

      if (paymentAmount > 0) {
        totalCollected = totalCollected + paymentAmount;
        // Update the sub-debtor's ledger
        this._updateSubDebtLedger(subDebtor, debtor.key, paymentAmount);
      }
    }

    return totalCollected;
  }

  // Updates the primary debt ledger after all collection attempts are complete
  private _updatePrimaryDebtLedger(
    debtor: HdsAdvancedTableColumn,
    remainingDebt: number
  ) {
    const originalDebt = debtor.widthDebts[this.key] ?? 0;

    if (remainingDebt <= 0) {
      delete debtor.widthDebts[this.key];
    } else if (remainingDebt < originalDebt) {
      debtor.widthDebts[this.key] = remainingDebt;
    }
  }

  /*
   * Collects all debts owed to this column. For each debtor, it first attempts a
   * direct payment from the debtor's available surplus width (width above its
   * minimum). If a shortfall remains, it triggers a cascading collection where
   * the debtor facilitates a direct payment from its own sub-debtors to the
   * original collector.
   */
  private collectWidthDebts(): void {
    const { key: thisKey, table } = this;

    table.columns.forEach((debtor) => {
      let debtToCollect = debtor.widthDebts[thisKey] ?? 0;

      if (debtToCollect <= 0) {
        return;
      }

      // Attempt a direct payment from the debtor's surplus
      const paymentFromSurplus = this._collectFromSurplus(
        debtor,
        debtToCollect
      );

      // Reduce the amount we still need to collect
      debtToCollect = debtToCollect - paymentFromSurplus;

      // If a shortfall remains, trigger the cascading collection
      if (debtToCollect > 0) {
        const paymentFromCascade = this._collectFromSubDebtors(
          debtor,
          debtToCollect
        );

        debtToCollect = debtToCollect - paymentFromCascade;
      }

      this._updatePrimaryDebtLedger(debtor, debtToCollect);
    });
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

    this.width = this.originalWidth ?? this.width;
  }
}
