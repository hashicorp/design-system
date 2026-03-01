import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { TrackedMap } from 'tracked-built-ins';
import { hash } from '@ember/helper';
import { isPixelSize, pixelToNumber } from '../utils.ts';

import type {
  HdsAdvancedTableNormalizedColumn,
  HdsAdvancedTablePixelString,
} from '../types.ts';
import type { ModifierLike } from '@glint/template';

export const DEFAULT_WIDTH = '1fr'; // default to '1fr' to allow flexible width
export const DEFAULT_MIN_WIDTH = '150px';
export const DEFAULT_MAX_WIDTH = '800px';

type HdsAdvancedTableColumnWidth = HdsAdvancedTableNormalizedColumn['width'];

export interface HdsAdvancedTableSyncWidthValuesSignature {
  Element: HTMLDivElement;
}

interface HdsAdvancedTableColumnManagerWidthSignature {
  Args: {
    columnOrder: string[];
    columns: HdsAdvancedTableNormalizedColumn[];
    orderedColumns: HdsAdvancedTableNormalizedColumn[];
    thElements: TrackedMap<string, HTMLDivElement>;
    isSelectable?: boolean;
    getColumnByKey: (
      key: string
    ) => HdsAdvancedTableNormalizedColumn | undefined;
  };
  Blocks: {
    default: [
      {
        gridTemplateColumns: string;
        syncWidthValues: ModifierLike<HdsAdvancedTableSyncWidthValuesSignature>;
        applyTransientWidth: (
          columnKey: HdsAdvancedTableNormalizedColumn['key']
        ) => void;
        getAppliedWidth: (
          columnKey: HdsAdvancedTableNormalizedColumn['key']
        ) => HdsAdvancedTableNormalizedColumn['width'];
        getSiblingColumnKeys: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'] | null
        ) => {
          previous?: HdsAdvancedTableNormalizedColumn['key'];
          next?: HdsAdvancedTableNormalizedColumn['key'];
        };
        resetTransientColumnWidths: () => void;
        restoreColumnWidth: (
          columnKey: HdsAdvancedTableNormalizedColumn['key']
        ) => void;
        setTransientColumnWidth: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'],
          width: `${number}px`,
          clamped?: boolean
        ) => void;
        setTransientColumnWidths: (options: { roundValues?: boolean }) => void;
        updateResizeDebt: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'],
          delta: number
        ) => void;
      },
    ];
  };
}

export default class HdsAdvancedTableColumnManagerWidth extends Component<HdsAdvancedTableColumnManagerWidthSignature> {
  columnWidths = new TrackedMap<string, HdsAdvancedTableColumnWidth>();
  originalColumnWidths = new TrackedMap<string, HdsAdvancedTableColumnWidth>();
  transientColumnWidths = new TrackedMap<string, HdsAdvancedTablePixelString>();
  columnDebts = new TrackedMap<string, Record<string, number>>(); // key -> { lenderKey -> amount }

  get gridTemplateColumns(): string {
    const { isSelectable, orderedColumns } = this.args;

    let style = isSelectable ? 'min-content ' : '';

    for (const col of orderedColumns) {
      const appliedWidth = this.getAppliedWidth(col.key);

      style += ` ${appliedWidth}`;
    }

    return style;
  }

  getAppliedWidth = (
    columnKey: HdsAdvancedTableNormalizedColumn['key']
  ): HdsAdvancedTableNormalizedColumn['width'] => {
    const width = this.columnWidths.get(columnKey);
    const transientWidth = this.transientColumnWidths.get(columnKey);

    return (
      transientWidth ??
      width ??
      `${this.args.thElements.get(columnKey)?.offsetWidth ?? 0}px`
    );
  };

  getSiblingColumnKeys = (
    columnKey: HdsAdvancedTableNormalizedColumn['key'] | null
  ): {
    previous?: HdsAdvancedTableNormalizedColumn['key'];
    next?: HdsAdvancedTableNormalizedColumn['key'];
  } => {
    if (columnKey === null) {
      return {};
    }

    const columnIndex = this.args.columnOrder.indexOf(columnKey);

    if (columnIndex === -1) {
      return {};
    }

    return {
      previous:
        columnIndex === 0 ? undefined : this.args.columnOrder[columnIndex - 1],
      next:
        columnIndex === this.args.columnOrder.length - 1
          ? undefined
          : this.args.columnOrder[columnIndex + 1],
    };
  };

  private _getPxWidth(key: string): number {
    const width = this.columnWidths.get(key);

    if (width !== undefined && isPixelSize(width)) {
      return pixelToNumber(width as `${number}px`);
    } else {
      return this.args.thElements.get(key)?.offsetWidth ?? 0;
    }
  }

  private _getPxMinWidth(key: string): number {
    const column = this.args.getColumnByKey(key);
    const minWidth = column?.minWidth ?? DEFAULT_MIN_WIDTH;

    return isPixelSize(minWidth) ? pixelToNumber(minWidth) : 0;
  }

  applyTransientWidth = (
    columnKey: HdsAdvancedTableNormalizedColumn['key']
  ) => {
    if (columnKey == undefined) {
      return;
    }

    const transientWidth = this.transientColumnWidths.get(columnKey);

    this.columnWidths.set(columnKey, transientWidth);
  };

  setTransientColumnWidths = (
    options: { roundValues?: boolean } = {}
  ): void => {
    const roundValues = options.roundValues ?? false;

    this.columnWidths.forEach((width, key) => {
      let _width: number;

      if (width !== undefined && isPixelSize(width)) {
        _width = pixelToNumber(width as `${number}px`);
      } else {
        _width = this.args.thElements.get(key)?.offsetWidth ?? 0;
      }

      this.transientColumnWidths.set(
        key,
        `${roundValues ? Math.round(_width) : _width}px`
      );
    });
  };

  resetTransientColumnWidths = (): void => {
    this.transientColumnWidths.clear();
  };

  setTransientColumnWidth = (
    columnKey: HdsAdvancedTableNormalizedColumn['key'],
    width: `${number}px`,
    clamped: boolean = true
  ): void => {
    const column = this.args.getColumnByKey(columnKey);

    if (column === undefined) {
      return;
    }

    if (clamped) {
      const { minWidth, maxWidth } = column;

      const minWidthInPixels =
        minWidth === undefined ? 1 : pixelToNumber(minWidth);
      const maxWidthInPixels =
        maxWidth === undefined ? Infinity : pixelToNumber(maxWidth);

      const transientColumnWidthInPixels = Math.min(
        Math.max(pixelToNumber(width), minWidthInPixels),
        maxWidthInPixels
      );

      this.transientColumnWidths.set(
        columnKey,
        `${transientColumnWidthInPixels}px`
      );
    } else {
      this.transientColumnWidths.set(columnKey, width);
    }
  };

  updateResizeDebt = (
    columnKey: HdsAdvancedTableNormalizedColumn['key'],
    delta: number
  ): void => {
    if (delta === 0) {
      return;
    }

    const { next: nextColumnKey } = this.getSiblingColumnKeys(columnKey);

    if (nextColumnKey === undefined) {
      return;
    }

    // determine borrower and lender
    const borrowerKey = delta > 0 ? columnKey : nextColumnKey;
    const lenderKey = delta > 0 ? nextColumnKey : columnKey;
    let amount = Math.abs(delta);

    // check if lender has existing debt to borrower
    const lenderDebts = this.columnDebts.get(lenderKey) ?? {};
    const existingDebt = lenderDebts[borrowerKey] ?? 0;

    if (existingDebt > 0) {
      const paymentAmount = Math.min(amount, existingDebt);
      const newDebt = existingDebt - paymentAmount;

      const updatedDebts = { ...lenderDebts };

      if (newDebt <= 0) {
        delete updatedDebts[borrowerKey];
      } else {
        updatedDebts[borrowerKey] = newDebt;
      }

      this.columnDebts.set(lenderKey, updatedDebts);

      amount = amount - paymentAmount;
    }

    // if amount remains, create new debt
    if (amount > 0) {
      const borrowerDebts = this.columnDebts.get(borrowerKey) ?? {};

      this.columnDebts.set(borrowerKey, {
        ...borrowerDebts,
        [lenderKey]: (borrowerDebts[lenderKey] ?? 0) + amount,
      });
    }
  };

  // restores a column to its original width, settling all debts first
  restoreColumnWidth = (
    columnKey: HdsAdvancedTableNormalizedColumn['key']
  ): void => {
    // settle debts (collect from debtors, pay lenders)
    this._settleWidthDebts(columnKey);

    // restore original width
    const originalWidth = this.originalColumnWidths.get(columnKey);

    if (originalWidth) {
      this.columnWidths.set(columnKey, originalWidth);
      this.transientColumnWidths.delete(columnKey);
    }
  };

  private _settleWidthDebts(key: string): void {
    this._collectWidthDebts(key);
    this._payWidthDebts(key);
  }

  private _collectWidthDebts(collectorKey: string): void {
    // iterate over all known columns to see if they owe the collector
    this.args.columnOrder.forEach((debtorKey) => {
      if (debtorKey === collectorKey) {
        return;
      }

      const debtorDebts = this.columnDebts.get(debtorKey);
      const debtToCollect = debtorDebts?.[collectorKey] ?? 0;

      if (debtToCollect <= 0) {
        return;
      }

      // attempt to source funds from the debtor
      const amountPaid = this._sourceFundsForPayment(debtorKey, debtToCollect);

      if (amountPaid > 0) {
        // add funds to collector
        const currentCollectorWidth = this._getPxWidth(collectorKey);

        this.columnWidths.set(
          collectorKey,
          `${currentCollectorWidth + amountPaid}px`
        );
        this.transientColumnWidths.delete(collectorKey);

        // update debtors ledger
        const remainingDebt = debtToCollect - amountPaid;
        const currentDebts = this.columnDebts.get(debtorKey) ?? {};
        const updatedDebts = { ...currentDebts };

        if (remainingDebt > 0) {
          updatedDebts[collectorKey] = remainingDebt;
        } else {
          delete updatedDebts[collectorKey];
        }

        this.columnDebts.set(debtorKey, updatedDebts);
      }
    });
  }

  private _payWidthDebts(payerKey: string): void {
    const debts = this.columnDebts.get(payerKey);

    if (debts === undefined) {
      return;
    }

    Object.entries(debts).forEach(([lenderKey, amount]) => {
      // give width back to lender
      const currentLenderWidth = this._getPxWidth(lenderKey);

      this.columnWidths.set(lenderKey, `${currentLenderWidth + amount}px`);
      this.transientColumnWidths.delete(lenderKey);
    });

    // lear payers debts
    this.columnDebts.delete(payerKey);
  }

  private _sourceFundsForPayment(key: string, amountNeeded: number): number {
    let fundsSourced = 0;

    // preferentially source width from our own surplus first
    const currentWidth = this._getPxWidth(key);
    const minWidth = this._getPxMinWidth(key);
    const surplus = Math.max(0, currentWidth - minWidth);
    const paymentFromSurplus = Math.min(amountNeeded, surplus);

    if (paymentFromSurplus > 0) {
      this.columnWidths.set(key, `${currentWidth - paymentFromSurplus}px`);
      this.transientColumnWidths.delete(key);

      fundsSourced = fundsSourced + paymentFromSurplus;
    }

    // if shortfall, source from our debtors (recursive)
    const shortfall = amountNeeded - fundsSourced;

    if (shortfall > 0) {
      // find who owes this column (key)
      const ourDebtors = this.args.columnOrder.filter((debtorKey) => {
        const debtorDebts = this.columnDebts.get(debtorKey);

        return debtorDebts && debtorDebts[key] && debtorDebts[key] > 0;
      });

      for (const subDebtorKey of ourDebtors) {
        const amountStillNeeded = amountNeeded - fundsSourced;

        if (amountStillNeeded <= 0) {
          break;
        }

        const subDebtorDebts = this.columnDebts.get(subDebtorKey)!;
        const subDebtOwed = subDebtorDebts[key] ?? 0;
        const amountToRequest = Math.min(amountStillNeeded, subDebtOwed);

        const collectedFromSubDebtor = this._sourceFundsForPayment(
          subDebtorKey,
          amountToRequest
        );

        if (collectedFromSubDebtor > 0) {
          fundsSourced = fundsSourced + collectedFromSubDebtor;

          // update sub-debtor ledger
          const remaining = subDebtOwed - collectedFromSubDebtor;
          const updatedSubDebts = { ...subDebtorDebts };

          if (remaining > 0) {
            updatedSubDebts[key] = remaining;
          } else {
            delete updatedSubDebts[key];
          }

          this.columnDebts.set(subDebtorKey, updatedSubDebts);
        }
      }
    }

    return fundsSourced;
  }

  syncWidthValues = modifier<HdsAdvancedTableSyncWidthValuesSignature>(() => {
    const { columns } = this.args;

    for (const column of columns) {
      this.columnWidths.set(column.key, column.width ?? DEFAULT_WIDTH);
      this.originalColumnWidths.set(column.key, column.width);
    }
  });

  <template>
    {{yield
      (hash
        gridTemplateColumns=this.gridTemplateColumns
        syncWidthValues=this.syncWidthValues
        applyTransientWidth=this.applyTransientWidth
        getAppliedWidth=this.getAppliedWidth
        getSiblingColumnKeys=this.getSiblingColumnKeys
        restoreColumnWidth=this.restoreColumnWidth
        setTransientColumnWidths=this.setTransientColumnWidths
        setTransientColumnWidth=this.setTransientColumnWidth
        resetTransientColumnWidths=this.resetTransientColumnWidths
        updateResizeDebt=this.updateResizeDebt
      )
    }}
  </template>
}
